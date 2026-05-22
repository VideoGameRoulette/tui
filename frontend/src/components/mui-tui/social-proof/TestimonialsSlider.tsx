'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface SlideTestimonial {
  quote: string;
  authorName: string;
  authorTitle?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
  accentColor?: string;
}

const DEFAULT_SLIDES: SlideTestimonial[] = [
  {
    quote: "This product has completely transformed how our team works. We've seen a 40% increase in productivity since switching.",
    authorName: 'Sarah Chen',
    authorTitle: 'Head of Engineering',
    company: 'Acme Corp',
    rating: 5,
    accentColor: 'rgba(79,70,229,0.15)',
  },
  {
    quote: 'The support team is incredible and the documentation is thorough. Highly recommended for any enterprise team.',
    authorName: 'Marcus Johnson',
    authorTitle: 'CTO',
    company: 'TechFlow Inc',
    rating: 5,
    accentColor: 'rgba(14,165,233,0.15)',
  },
  {
    quote: 'We evaluated 12 different solutions and this was the clear winner. Onboarding was smooth and ROI was immediate.',
    authorName: 'Emily Rodriguez',
    authorTitle: 'VP of Operations',
    company: 'Streamline Co',
    rating: 4.5,
    accentColor: 'rgba(16,185,129,0.15)',
  },
];

export interface TestimonialsSliderProps {
  slides?: SlideTestimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialsSlider({
  slides = DEFAULT_SLIDES,
  autoPlay = true,
  interval = 5000,
}: TestimonialsSliderProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!autoPlay || paused) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, next, interval]);

  return (
    <Box
      sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'background.default', py: { xs: 10, sm: 14 } }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
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
          {slide.accentColor && (
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                left: '50%',
                top: '-60%',
                transform: 'translateX(-50%)',
                width: '80%',
                maxWidth: 800,
                aspectRatio: '2 / 1',
                borderRadius: '50%',
                background: `radial-gradient(ellipse, ${slide.accentColor} 0%, transparent 70%)`,
                filter: 'blur(48px)',
                pointerEvents: 'none',
              }}
            />
          )}

          <Container maxWidth="md" disableGutters sx={{ px: { xs: 3, sm: 6, lg: 8 }, position: 'relative' }}>
            <Box sx={{ textAlign: 'center' }}>
              <FormatQuoteIcon
                sx={{ fontSize: 56, color: 'primary.main', opacity: 0.3, mb: 2 }}
              />

              {slide.rating != null && (
                <Box sx={{ mb: 3 }}>
                  <Rating value={slide.rating} readOnly precision={0.5} />
                </Box>
              )}

              <Typography
                variant="h5"
                component="blockquote"
                sx={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'text.primary',
                  mb: 5,
                  mx: 0,
                }}
              >
                &ldquo;{slide.quote}&rdquo;
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Avatar
                  src={slide.avatarUrl}
                  alt={slide.authorName}
                  sx={{ width: 52, height: 52 }}
                />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                    {slide.authorName}
                  </Typography>
                  {(slide.authorTitle || slide.company) && (
                    <Typography variant="body2" color="text.secondary">
                      {[slide.authorTitle, slide.company].filter(Boolean).join(', ')}
                    </Typography>
                  )}
                </Box>
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
          aria-label="Previous testimonial"
          size="small"
          sx={{ border: '1px solid', borderColor: 'divider', color: 'text.secondary', '&:hover': { bgcolor: 'action.hover', color: 'text.primary' } }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        {slides.map((_, index) => (
          <Box
            key={index}
            component="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            sx={{
              width: index === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              p: 0,
              transition: 'width 0.3s ease, background-color 0.3s ease',
              bgcolor: index === current
                ? 'primary.main'
                : dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
            }}
          />
        ))}

        <IconButton
          onClick={next}
          aria-label="Next testimonial"
          size="small"
          sx={{ border: '1px solid', borderColor: 'divider', color: 'text.secondary', '&:hover': { bgcolor: 'action.hover', color: 'text.primary' } }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
