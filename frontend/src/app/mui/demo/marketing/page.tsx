'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useStoredColorMode } from '@/lib/stored-color-mode';
import Link from 'next/link';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MuiShell from '@/components/MuiShell';
import { TrustedPartnersMarqueeMui } from '@/components/marketing/TrustedPartnersMarqueeMui';
import { COLORS } from '@/lib/theme';

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&w=1600&q=80',
    badge: 'New · Material UI v2.0',
    headline: ['Build your next', 'project faster.'],
    sub: 'Ship production-ready interfaces with the most complete React component library — accessibility and performance included.',
    cta: { label: 'Get started free', href: '#' },
    secondary: { label: 'View docs →', href: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    badge: 'Design System',
    headline: ['Design systems', 'for every team.'],
    sub: 'From startups to Fortune 500 — beautiful, accessible components that scale with your product and your team.',
    cta: { label: 'Explore components', href: '#' },
    secondary: { label: 'See examples →', href: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    badge: 'Open Source · MIT',
    headline: ['Trusted by', 'millions of devs.'],
    sub: 'Community-driven and battle-tested across thousands of production apps. No vendor lock-in, ever.',
    cta: { label: 'Join the community', href: '#' },
    secondary: { label: 'Star on GitHub →', href: '#' },
  },
] as const;

const INTERVAL = 5000;

const HERO_MIN_HEIGHT = { xs: 'calc(100dvh - 60px - 56px)', md: 'calc(100dvh - 60px)' } as const;

const FEATURES = [
  {
    icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 28 }} />,
    title: 'Polished components',
    body: 'Pre-built layouts, typography, and motion patterns so your marketing pages feel cohesive from day one.',
  },
  {
    icon: <SpeedOutlinedIcon sx={{ fontSize: 28 }} />,
    title: 'Ship faster',
    body: 'Composable primitives and theme tokens mean less bespoke CSS and quicker iteration on campaigns.',
  },
  {
    icon: <GroupsOutlinedIcon sx={{ fontSize: 28 }} />,
    title: 'Built for teams',
    body: 'Designers and engineers share the same component language — review once, reuse everywhere.',
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MuiMarketingDemo() {
  const [mode, toggleMode] = useStoredColorMode();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tickKey, setTickKey] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const isDark = mode === 'dark';

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    setTickKey((k) => k + 1);
  }, []);
  const next = useCallback(() => {
    setActive((i) => (i + 1) % SLIDES.length);
    setTickKey((k) => k + 1);
  }, []);
  const goTo = useCallback((i: number) => {
    setActive(i);
    setTickKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, tickKey]);

  return (
    <MuiShell colorMode={mode} onToggleMode={toggleMode} bottomNavValue={1}>

      {/* ── Slider Hero — one viewport minus chrome; page scrolls below ── */}
      <Box
        sx={{
          position: 'relative',
          minHeight: HERO_MIN_HEIGHT,
          height: HERO_MIN_HEIGHT,
          overflow: 'hidden',
          bgcolor: '#0f172a',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) < 40) return;
          if (dx > 0) prev(); else next();
        }}
      >

        {/* ── Slides ── */}
        {SLIDES.map((slide, i) => (
          <Box
            key={i}
            aria-hidden={i !== active}
            sx={{
              position: 'absolute', inset: 0,
              opacity: i === active ? 1 : 0,
              transition: 'opacity 0.8s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              pointerEvents: i === active ? 'auto' : 'none',
            }}
          >
            {/* Background image */}
            <Box
              sx={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Gradient overlay */}
            <Box
              sx={{
                position: 'absolute', inset: 0,
                background: isDark
                  ? 'linear-gradient(160deg, rgba(30,27,75,0.88) 0%, rgba(15,23,42,0.93) 100%)'
                  : 'linear-gradient(160deg, rgba(238,242,255,0.86) 0%, rgba(240,249,255,0.91) 100%)',
              }}
            />

            {/* Content */}
            <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 3, sm: 4 }, maxWidth: 680, mx: 'auto', width: '100%' }}>
              {/* Badge */}
              <Box
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.75,
                  px: 2, py: 0.75, mb: 3,
                  borderRadius: 99,
                  border: '1px solid',
                  borderColor: isDark ? COLORS.secondary.border.dark : COLORS.secondary.border.light,
                  bgcolor: isDark ? COLORS.secondary.bg.dark : COLORS.secondary.bg.light,
                  fontSize: '0.8125rem', fontWeight: 600, color: 'primary.light',
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: COLORS.secondary.light }} />
                {slide.badge}
              </Box>

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.75rem', lg: '5rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.0,
                  color: 'text.primary',
                  mb: 2.5,
                }}
              >
                {slide.headline[0]}<br />
                <Box component="span" sx={{ color: 'primary.main' }}>{slide.headline[1]}</Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: 540, mx: 'auto',
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.75,
                  color: 'text.secondary',
                  mb: 4,
                }}
              >
                {slide.sub}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  component="a"
                  href={slide.cta.href}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                >
                  {slide.cta.label}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href={slide.secondary.href}
                  sx={{
                    borderColor: isDark ? COLORS.neutral.border.dark : '#cbd5e1',
                    color: 'text.secondary',
                    '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' },
                    px: 4, py: 1.5, fontSize: '1rem',
                  }}
                >
                  {slide.secondary.label}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}

        {/* ── Top-left: dots + counter chip ── */}
        <Box
          sx={{
            position: 'absolute', top: { xs: 16, sm: 20 }, left: { xs: 16, sm: 20 }, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: 1.5,
            px: 1.75, py: 1,
            borderRadius: 2,
            bgcolor: isDark ? alpha('#ffffff', 0.12) : alpha('#1e293b', 0.1),
            backdropFilter: 'blur(8px)',
            border: '1px solid',
            borderColor: isDark ? alpha('#ffffff', 0.25) : alpha('#1e293b', 0.2),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            {SLIDES.map((_, i) => (
              <Box
                key={i}
                component="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                sx={{
                  width: i === active ? 20 : 6, height: 6,
                  borderRadius: 99, border: 'none', cursor: 'pointer', p: 0,
                  bgcolor: i === active ? 'primary.main' : (isDark ? alpha('#ffffff', 0.45) : alpha('#1e293b', 0.35)),
                  transition: 'all 0.3s ease',
                  '&:hover': { bgcolor: i === active ? 'primary.main' : (isDark ? alpha('#ffffff', 0.7) : alpha('#1e293b', 0.55)) },
                }}
              />
            ))}
          </Box>
          <Box sx={{ width: '1px', height: 14, bgcolor: isDark ? alpha('#ffffff', 0.25) : alpha('#1e293b', 0.2), flexShrink: 0 }} />
          <Box component="span" sx={{ fontSize: '0.6875rem', fontWeight: 500, color: isDark ? alpha('#ffffff', 0.65) : alpha('#1e293b', 0.7), lineHeight: 1, whiteSpace: 'nowrap' }}>
            {active + 1} / {SLIDES.length}
          </Box>
        </Box>

        {/* ── Top-right: prev / next arrow chip ── */}
        <Box
          sx={{
            position: 'absolute', top: { xs: 16, sm: 20 }, right: { xs: 16, sm: 20 }, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: 0.25,
            p: 0.75,
            borderRadius: 2,
            bgcolor: isDark ? alpha('#ffffff', 0.12) : alpha('#1e293b', 0.1),
            backdropFilter: 'blur(8px)',
            border: '1px solid',
            borderColor: isDark ? alpha('#ffffff', 0.25) : alpha('#1e293b', 0.2),
          }}
        >
          <IconButton
            onClick={prev}
            aria-label="Previous slide"
            size="small"
            sx={{ color: isDark ? 'white' : '#1e293b', '&:hover': { bgcolor: isDark ? alpha('#ffffff', 0.2) : alpha('#1e293b', 0.1) } }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: '0.875rem' }} />
          </IconButton>
          <IconButton
            onClick={next}
            aria-label="Next slide"
            size="small"
            sx={{ color: isDark ? 'white' : '#1e293b', '&:hover': { bgcolor: isDark ? alpha('#ffffff', 0.2) : alpha('#1e293b', 0.1) } }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: '0.875rem' }} />
          </IconButton>
        </Box>

        {/* ── Auto-advance progress bar ── */}
        {!paused && (
          <Box
            key={`pb-${active}`}
            sx={{
              position: 'absolute', top: 0, left: 0, height: 3, zIndex: 10,
              bgcolor: 'primary.main',
              animation: `slideProgress ${INTERVAL}ms linear`,
              '@keyframes slideProgress': { from: { width: '0%' }, to: { width: '100%' } },
            }}
          />
        )}

      </Box>

      {/* ── Feature grid ── */}
      <Box sx={{ bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.page }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 8, sm: 10 } }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              mb: 1,
            }}
          >
            Why teams choose this stack
          </Typography>
          <Typography
            component="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'text.primary',
              mb: 1.5,
            }}
          >
            Marketing pages without the scramble
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              maxWidth: 560,
              mx: 'auto',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'text.secondary',
              mb: { xs: 6, sm: 8 },
            }}
          >
            This demo pairs a full-bleed hero carousel with sections you would reuse on a real launch —
            social proof, narrative, and a closing call to action.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {FEATURES.map((f) => (
              <Box
                key={f.title}
                sx={{
                  bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface,
                  border: '1px solid',
                  borderColor: isDark ? COLORS.neutral.border.dark : COLORS.neutral.border.light,
                  borderRadius: 3,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isDark ? alpha(COLORS.secondary.main, 0.2) : COLORS.secondary.bg.light,
                    color: isDark ? COLORS.secondary.light : COLORS.secondary.main,
                  }}
                >
                  {f.icon}
                </Box>
                <Typography sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary' }}>
                  {f.title}
                </Typography>
                <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'text.secondary' }}>
                  {f.body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Logo strip ── */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: isDark ? alpha(COLORS.neutral.bg.dark.surface, 0.5) : alpha(COLORS.neutral.bg.light.surface, 0.9),
          py: { xs: 5, sm: 6 },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 } }}>
          <Typography
            id="architecture-providers-heading"
            sx={{
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'text.secondary',
              mb: 3,
            }}
          >
            Trusted architecture providers
          </Typography>
          <TrustedPartnersMarqueeMui headingId="architecture-providers-heading" />
        </Container>
      </Box>

      {/* ── Narrative + CTA ── */}
      <Box sx={{ bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.page }}>
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 8, sm: 10 }, textAlign: 'center' }}>
          <Typography component="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, fontWeight: 800, letterSpacing: '-0.03em', color: 'text.primary', mb: 2 }}>
            Ready when your campaign is
          </Typography>
          <Typography sx={{ fontSize: '1rem', lineHeight: 1.8, color: 'text.secondary', mb: 4 }}>
            Swap slides, tune copy, and wire CTAs to your analytics — the shell navigation and theme toggle
            stay consistent with the rest of the template.
          </Typography>
          <Button
            component={Link}
            href="/mui"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 4 }}
          >
            Back to Material UI home
          </Button>
        </Container>
      </Box>

      {/* ── Footer (matches main site pattern, marketing branding) ── */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.surface,
          py: 5,
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: 'text.primary' }}>
              Material UI · Marketing
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', textAlign: { xs: 'center', sm: 'right' } }}>
              © 2019 - 2026 In House Cloud Solutions. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </MuiShell>
  );
}
