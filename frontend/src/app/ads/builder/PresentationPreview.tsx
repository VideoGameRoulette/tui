'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import LoopIcon from '@mui/icons-material/Loop';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import { SlideCanvas } from './SlideCanvas';
import type { AdSlide, TransitionType } from './types';

// ── CSS keyframes for all 12 transition animations ────────────────────────────

const TRANSITION_CSS = `
@keyframes adPrFadeIn      { from { opacity: 0 } to { opacity: 1 } }
@keyframes adPrFadeOut     { from { opacity: 1 } to { opacity: 0 } }
@keyframes adPrEnterRight  { from { transform: translateX(100%) } to { transform: translateX(0) } }
@keyframes adPrEnterLeft   { from { transform: translateX(-100%) } to { transform: translateX(0) } }
@keyframes adPrExitLeft    { from { transform: translateX(0) } to { transform: translateX(-100%) } }
@keyframes adPrExitRight   { from { transform: translateX(0) } to { transform: translateX(100%) } }
@keyframes adPrEnterBottom { from { transform: translateY(100%) } to { transform: translateY(0) } }
@keyframes adPrEnterTop    { from { transform: translateY(-100%) } to { transform: translateY(0) } }
@keyframes adPrExitTop     { from { transform: translateY(0) } to { transform: translateY(-100%) } }
@keyframes adPrExitBottom  { from { transform: translateY(0) } to { transform: translateY(100%) } }
@keyframes adPrZoomIn      { from { transform: scale(0.88); opacity: 0 } to { transform: scale(1); opacity: 1 } }
@keyframes adPrZoomOut     { from { transform: scale(1); opacity: 1 } to { transform: scale(1.12); opacity: 0 } }
`;

function getAnimName(
  transition: TransitionType,
  role: 'enter' | 'exit',
  dir: 'fwd' | 'bwd',
): string {
  if (transition === 'none') return role === 'enter' ? 'adPrFadeIn' : 'adPrFadeOut';
  if (transition === 'fade') return role === 'enter' ? 'adPrFadeIn' : 'adPrFadeOut';
  if (transition === 'zoom') return role === 'enter' ? 'adPrZoomIn' : 'adPrZoomOut';

  const fwd = dir === 'fwd';
  if (role === 'enter') {
    if (transition === 'slideLeft')  return fwd ? 'adPrEnterRight'  : 'adPrEnterLeft';
    if (transition === 'slideRight') return fwd ? 'adPrEnterLeft'   : 'adPrEnterRight';
    if (transition === 'slideUp')    return fwd ? 'adPrEnterBottom' : 'adPrEnterTop';
    if (transition === 'slideDown')  return fwd ? 'adPrEnterTop'    : 'adPrEnterBottom';
  } else {
    if (transition === 'slideLeft')  return fwd ? 'adPrExitLeft'    : 'adPrExitRight';
    if (transition === 'slideRight') return fwd ? 'adPrExitRight'   : 'adPrExitLeft';
    if (transition === 'slideUp')    return fwd ? 'adPrExitTop'     : 'adPrExitBottom';
    if (transition === 'slideDown')  return fwd ? 'adPrExitBottom'  : 'adPrExitTop';
  }
  return 'adPrFadeIn';
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface SlideState {
  cur: number;
  prev: number | null;
  dir: 'fwd' | 'bwd';
  pairKey: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  slides: AdSlide[];
  startIndex?: number;
  /** Increment this each time the dialog is opened to reset internal state */
  openKey: number;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PresentationPreview({ open, onClose, slides, startIndex = 0, openKey }: Props) {
  const [state, setState] = useState<SlideState>({ cur: startIndex, prev: null, dir: 'fwd', pairKey: 0 });
  const [animKey, setAnimKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loop, setLoop] = useState(true);
  const [showControls, setShowControls] = useState(true);

  // Reset internal state when the dialog is (re-)opened — using the "derive
  // state from props during render" pattern to avoid setState in an effect.
  const prevOpenKeyRef = useRef(openKey);
  if (openKey !== prevOpenKeyRef.current) {
    prevOpenKeyRef.current = openKey;
    setState({ cur: startIndex, prev: null, dir: 'fwd', pairKey: 0 });
    setAnimKey(0);
    setIsPaused(false);
    setShowControls(true);
  }

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Navigate to a specific index
  const goTo = useCallback((nextIdx: number) => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timerRef.current);
    if (progressRef.current) progressRef.current.style.width = '0%';

    setState((p) => ({
      cur: nextIdx,
      prev: p.cur,
      dir: nextIdx >= p.cur ? 'fwd' : 'bwd',
      pairKey: p.pairKey + 1,
    }));
    setAnimKey((k) => k + 1);
  }, []);

  const advance = useCallback(() => {
    setState((p) => {
      const nextIdx = p.cur + 1;
      if (nextIdx >= slides.length) {
        if (!loop) return p;
        if (progressRef.current) progressRef.current.style.width = '0%';
        cancelAnimationFrame(rafRef.current);
        return { cur: 0, prev: p.cur, dir: 'fwd', pairKey: p.pairKey + 1 };
      }
      if (progressRef.current) progressRef.current.style.width = '0%';
      cancelAnimationFrame(rafRef.current);
      return { cur: nextIdx, prev: p.cur, dir: 'fwd', pairKey: p.pairKey + 1 };
    });
    setAnimKey((k) => k + 1);
  }, [slides.length, loop]);

  // Slide timer
  useEffect(() => {
    clearTimeout(timerRef.current);
    if (!open || isPaused || slides.length === 0) return;
    const slide = slides[state.cur];
    if (!slide) return;
    if (!loop && state.cur === slides.length - 1) return;
    timerRef.current = setTimeout(advance, slide.durationMs);
    return () => clearTimeout(timerRef.current);
  }, [state.cur, advance, isPaused, open, slides, loop]);

  // Progress bar RAF
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!open || isPaused || slides.length === 0) return;
    const slide = slides[state.cur];
    if (!slide) return;
    if (!loop && state.cur === slides.length - 1) return;
    const duration = slide.durationMs;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [state.cur, isPaused, open, slides, loop]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goTo((state.cur + 1) % slides.length);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goTo((state.cur - 1 + slides.length) % slides.length);
      }
      if (e.key === ' ') {
        e.preventDefault();
        togglePause();
      }
      if (e.key === 'l' || e.key === 'L') {
        setLoop((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, state.cur, slides.length, goTo, onClose]);

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  // Toggle pause — centralised so controls-reveal logic lives in one place
  function togglePause() {
    if (!isPausedRef.current) {
      setShowControls(true);
      clearTimeout(hideTimerRef.current);
    }
    setIsPaused((prev) => !prev);
  }

  // Auto-hide controls
  const revealControls = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimerRef.current);
    if (!isPaused) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isPaused]);

  if (!open || slides.length === 0) return null;

  const currentSlide = slides[state.cur];
  const dur = currentSlide?.transitionDuration ?? 600;
  const trans = currentSlide?.transition ?? 'fade';
  const enterAnim = getAnimName(trans, 'enter', state.dir);
  const exitAnim  = getAnimName(trans, 'exit', state.dir);

  const atEnd = state.cur === slides.length - 1 && !loop;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      slotProps={{ paper: { sx: { bgcolor: '#000', overflow: 'hidden' } } }}
    >
      <GlobalStyles styles={TRANSITION_CSS} />

      <Box
        sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000', overflow: 'hidden' }}
        onMouseMove={revealControls}
        onClick={revealControls}
      >
        {/* Slide pair — only renders current + previous for transition */}
        {slides.map((s, i) => {
          const isCur  = i === state.cur;
          const isPrev = i === state.prev;
          if (!isCur && !isPrev) return null;

          const elemKey = isCur
            ? `cur-${state.pairKey}`
            : `prev-${state.pairKey}`;

          const animName = isCur ? enterAnim : exitAnim;
          const animDur  = trans === 'none' ? 0 : dur;

          return (
            <Box
              key={elemKey}
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: isCur ? 2 : 1,
                animation: `${animName} ${animDur}ms ease-in-out both`,
                pointerEvents: isCur ? 'auto' : 'none',
              }}
            >
              <Box sx={{ width: '100%', maxWidth: '100%', maxHeight: '100%', aspectRatio: '1920/1080' }}>
                <SlideCanvas
                  slide={s}
                  animKey={isCur ? animKey : 0}
                  selectedTextId={null}
                  onSelectText={() => {}}
                  editable={false}
                />
              </Box>
            </Box>
          );
        })}

        {/* Top progress bar */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, bgcolor: 'rgba(255,255,255,0.2)', zIndex: 10 }}>
          <Box
            ref={progressRef}
            sx={{ height: '100%', bgcolor: atEnd ? 'rgba(255,255,255,0.3)' : 'white', width: atEnd ? '100%' : '0%' }}
          />
        </Box>

        {/* Controls overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'none',
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          {/* Top bar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, pointerEvents: 'auto', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                {state.cur + 1} / {slides.length}
              </Typography>
              {currentSlide?.transition && currentSlide.transition !== 'none' && (
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', ml: 1 }}>
                  {currentSlide.transition} · {((currentSlide.transitionDuration ?? 600) / 1000).toFixed(1)}s
                </Typography>
              )}
            </Box>
            <Tooltip title="Close (Esc)">
              <IconButton onClick={onClose} sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Bottom controls */}
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, pointerEvents: 'auto', background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }}>
            {/* Slide dots */}
            <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 400 }}>
              {slides.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => goTo(i)}
                  sx={{
                    width: i === state.cur ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: i === state.cur ? 'white' : 'rgba(255,255,255,0.35)',
                    cursor: 'pointer',
                    transition: 'width 0.3s, background-color 0.3s',
                    '&:hover': { bgcolor: i === state.cur ? 'white' : 'rgba(255,255,255,0.65)' },
                  }}
                />
              ))}
            </Box>

            {/* Playback controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Previous (←)">
                <IconButton
                  size="small"
                  onClick={() => goTo((state.cur - 1 + slides.length) % slides.length)}
                  sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                >
                  <SkipPreviousIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={isPaused ? 'Resume (Space)' : 'Pause (Space)'}>
                <IconButton
                  onClick={togglePause}
                  sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)', width: 44, height: 44, '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
                >
                  {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Next (→)">
                <IconButton
                  size="small"
                  onClick={() => goTo((state.cur + 1) % slides.length)}
                  sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                >
                  <SkipNextIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={loop ? 'Loop on (L to toggle)' : 'Loop off (L to toggle)'}>
                <IconButton
                  size="small"
                  onClick={() => setLoop((v) => !v)}
                  sx={{
                    color: loop ? 'white' : 'rgba(255,255,255,0.35)',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                >
                  {loop ? <LoopIcon /> : <RepeatOneIcon />}
                </IconButton>
              </Tooltip>
            </Box>

            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontVariantNumeric: 'tabular-nums' }}>
              {(slides[state.cur]?.durationMs / 1000).toFixed(1)}s &nbsp;·&nbsp; ← → Space · Esc to close
              {atEnd && <span style={{ color: 'rgba(255,255,255,0.65)', marginLeft: 8 }}>End of presentation</span>}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
