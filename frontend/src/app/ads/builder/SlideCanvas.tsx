'use client';

import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import type { AdSlide, AdTextElement } from './types';

export const CANVAS_W = 1920;
export const CANVAS_H = 1080;

const ANIM_CSS = `
@keyframes adFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes adSlideInLeft {
  from { opacity: 0; transform: translateX(-120px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes adSlideInRight {
  from { opacity: 0; transform: translateX(120px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes adSlideInUp {
  from { opacity: 0; transform: translateY(120px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes adSlideInDown {
  from { opacity: 0; transform: translateY(-120px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes adZoomIn {
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes adZoomOut {
  from { opacity: 0; transform: scale(1.5); }
  to   { opacity: 1; transform: scale(1); }
}
`;

const ANIM_NAMES: Record<string, string> = {
  fadeIn:       'adFadeIn',
  slideInLeft:  'adSlideInLeft',
  slideInRight: 'adSlideInRight',
  slideInUp:    'adSlideInUp',
  slideInDown:  'adSlideInDown',
  zoomIn:       'adZoomIn',
  zoomOut:      'adZoomOut',
};

interface Props {
  slide: AdSlide;
  animKey: number;
  selectedTextId: string | null;
  onSelectText: (id: string | null) => void;
  editable?: boolean;
}

export function SlideCanvas({ slide, animKey, selectedTextId, onSelectText, editable = true }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / CANVAS_W);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const overlayVisible = (slide.overlayOpacity ?? 0) > 0;

  return (
    <>
      <GlobalStyles styles={ANIM_CSS} />
      <Box
        ref={outerRef}
        onClick={() => onSelectText(null)}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
          overflow: 'hidden',
        }}
      >
        {/* Inner canvas lives at 1920×1080, scaled down to fit outer container */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: CANVAS_W,
            height: CANVAS_H,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            bgcolor: slide.backgroundColor,
          }}
        >
          {slide.backgroundImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.backgroundImage}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: slide.objectFit,
                objectPosition: `${slide.offsetX}% ${slide.offsetY}%`,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Color overlay (between background and text) */}
          {overlayVisible && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: slide.overlayColor ?? '#000000',
                opacity: slide.overlayOpacity ?? 0,
                pointerEvents: 'none',
              }}
            />
          )}

          {slide.textElements.map((el) => (
            <TextElement
              key={`${el.id}-${animKey}`}
              element={el}
              selected={editable && selectedTextId === el.id}
              onSelect={() => editable && onSelectText(el.id)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

// ── Tiny thumbnail used in the slide panel ────────────────────────────────────

export function SlideThumbnail({ slide }: { slide: AdSlide }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / CANVAS_W);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const overlayVisible = (slide.overlayOpacity ?? 0) > 0;

  return (
    <Box
      ref={outerRef}
      sx={{ position: 'relative', width: '100%', aspectRatio: `${CANVAS_W} / ${CANVAS_H}`, overflow: 'hidden', flexShrink: 0 }}
    >
      {/* Scaled inner canvas */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: CANVAS_W,
          height: CANVAS_H,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          bgcolor: slide.backgroundColor,
        }}
      >
        {slide.backgroundImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slide.backgroundImage}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: slide.objectFit,
              objectPosition: `${slide.offsetX}% ${slide.offsetY}%`,
              pointerEvents: 'none',
            }}
          />
        )}
        {overlayVisible && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: slide.overlayColor ?? '#000000',
              opacity: slide.overlayOpacity ?? 0,
              pointerEvents: 'none',
            }}
          />
        )}
      </Box>

      {/* Text element count badge */}
      {slide.textElements.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            zIndex: 2,
            bgcolor: 'rgba(0,0,0,0.65)',
            color: 'white',
            borderRadius: 0.75,
            px: 0.625,
            py: 0.25,
            fontSize: 10,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          {slide.textElements.length}T
        </Box>
      )}
    </Box>
  );
}

// ── Text element (inside canvas) ──────────────────────────────────────────────

function TextElement({
  element: el,
  selected,
  onSelect,
}: {
  element: AdTextElement;
  selected: boolean;
  onSelect: () => void;
}) {
  const animName = ANIM_NAMES[el.animation];
  const textShadowValue = el.textShadow
    ? '2px 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.6)'
    : undefined;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      style={{
        position: 'absolute',
        left: `${el.x}%`,
        top: `${el.y}%`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        outline: selected ? '4px solid #60a5fa' : 'none',
        outlineOffset: 8,
        borderRadius: 4,
        userSelect: 'none',
        opacity: el.opacity ?? 1,
      }}
    >
      <div
        style={{
          color: el.color,
          fontSize: el.fontSize,
          fontWeight: el.fontWeight,
          fontFamily: el.fontFamily ?? 'system-ui, sans-serif',
          textAlign: el.textAlign,
          whiteSpace: 'pre-wrap',
          lineHeight: el.lineHeight ?? 1.2,
          letterSpacing: el.letterSpacing ? `${el.letterSpacing}em` : undefined,
          textShadow: textShadowValue,
          padding: '4px 8px',
          animation: animName
            ? `${animName} ${el.animationDuration}ms ${el.easing} ${el.animationDelay}ms both`
            : undefined,
        }}
      >
        {el.text}
      </div>
    </div>
  );
}
