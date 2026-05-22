'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Slide {
  headline: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  accentColor: string;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    headline: 'Data to enrich your\nonline business',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.',
    primaryCTA: { label: 'Get started', href: '#' },
    secondaryCTA: { label: 'Learn more', href: '#' },
    accentColor: 'rgba(79,70,229,0.18)',
  },
  {
    headline: 'Build faster with\npowerful APIs',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    primaryCTA: { label: 'View docs', href: '#' },
    secondaryCTA: { label: 'See examples', href: '#' },
    accentColor: 'rgba(14,165,233,0.18)',
  },
  {
    headline: 'Scale to millions\nwithout the headache',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    primaryCTA: { label: 'Start free trial', href: '#' },
    secondaryCTA: { label: 'See pricing', href: '#' },
    accentColor: 'rgba(16,185,129,0.18)',
  },
];

const INTERVAL_MS = 5000;

export interface HeroCarouselProps {
  slides?: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

export default function HeroCarousel({
  slides = DEFAULT_SLIDES,
  autoPlay = true,
  interval = INTERVAL_MS,
}: HeroCarouselProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (!autoPlay || paused) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, next, interval]);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        py: { xs: 16, sm: 20, lg: 28 },
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <Box
          key={index}
          aria-hidden={index !== current}
          sx={{
            position: index === 0 ? 'relative' : 'absolute',
            inset: index === 0 ? 'auto' : 0,
            opacity: index === current ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
            pointerEvents: index === current ? 'auto' : 'none',
          }}
        >
          {/* Per-slide gradient */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '-40%',
              transform: 'translateX(-50%)',
              width: '120%',
              maxWidth: 1200,
              aspectRatio: '2 / 1',
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${slide.accentColor} 0%, transparent 70%)`,
              filter: 'blur(48px)',
              pointerEvents: 'none',
            }}
          />

          <Container
            maxWidth="xl"
            disableGutters
            sx={{ px: { xs: 3, sm: 6, lg: 8 }, position: 'relative' }}
          >
            <Box sx={{ maxWidth: 720, mx: 'auto', textAlign: 'center' }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: 'text.primary',
                  whiteSpace: 'pre-line',
                }}
              >
                {slide.headline}
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  color: 'text.secondary',
                  lineHeight: 1.75,
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                {slide.description}
              </Typography>

              <Box
                sx={{
                  mt: 6,
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component="a"
                  href={slide.primaryCTA.href}
                >
                  {slide.primaryCTA.label}
                </Button>
                {slide.secondaryCTA && (
                  <Button
                    variant="text"
                    size="large"
                    component="a"
                    href={slide.secondaryCTA.href}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'action.hover' } }}
                  >
                    {slide.secondaryCTA.label}
                  </Button>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      ))}

      {/* Controls */}
      <Box
        sx={{
          position: 'relative',
          mt: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconButton
          onClick={prev}
          aria-label="Previous slide"
          size="small"
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.secondary',
            '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        {/* Dots */}
        {slides.map((_, index) => (
          <Box
            key={index}
            component="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            sx={{
              width: index === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              p: 0,
              transition: 'width 0.3s ease, background-color 0.3s ease',
              bgcolor: index === current ? 'primary.main' : (dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'),
            }}
          />
        ))}

        <IconButton
          onClick={next}
          aria-label="Next slide"
          size="small"
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.secondary',
            '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
