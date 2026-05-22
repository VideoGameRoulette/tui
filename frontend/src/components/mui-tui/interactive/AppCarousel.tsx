'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppCarouselProps {
  items: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  sx?: SxProps<Theme>;
}

const SWIPE_THRESHOLD = 50;

export default function AppCarousel({
  items,
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = true,
  sx,
}: AppCarouselProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number>(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!autoPlay || paused || items.length < 2) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, next, interval, items.length]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) { next(); } else { prev(); }
    }
  }

  return (
    <Box
      sx={{ position: 'relative', ...sx }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={e => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); }}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
    >
      {/* Track */}
      <Box sx={{ overflow: 'hidden', borderRadius: 2 }}>
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.4s ease-in-out',
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {items.map((item, i) => (
            <Box
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${items.length}`}
              sx={{ flex: '0 0 100%', maxWidth: '100%' }}
            >
              {item}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <IconButton
            onClick={prev}
            aria-label="Previous slide"
            size="small"
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 2,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={next}
            aria-label="Next slide"
            size="small"
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 2,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </>
      )}

      {/* Dots */}
      {showDots && items.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            mt: 2,
          }}
        >
          {items.map((_, i) => (
            <Box
              key={i}
              component="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              sx={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                p: 0,
                transition: 'width 0.3s ease, background-color 0.3s ease',
                bgcolor: i === current
                  ? 'primary.main'
                  : dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
