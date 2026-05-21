'use client';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BoltIcon from '@mui/icons-material/Bolt';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CodeIcon from '@mui/icons-material/Code';
import DevicesIcon from '@mui/icons-material/Devices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import MuiShell from '@/components/MuiShell';
import { COLORS } from '@/lib/theme';
import { useStoredColorMode } from '@/lib/stored-color-mode';

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: BoltIcon,
    color: '#f59e0b',
    title: 'Lightning Fast',
    desc: 'Server-first architecture with React Server Components. Pages load in under 100 ms right out of the box.',
  },
  {
    icon: AccessibilityNewIcon,
    color: '#10b981',
    title: 'Accessible by Default',
    desc: 'Every component meets WCAG 2.1 AA. Full keyboard navigation and screen-reader support included.',
  },
  {
    icon: DarkModeIcon,
    color: '#8b5cf6',
    title: 'Dark Mode Ready',
    desc: 'Built-in light and dark theme support. Switches instantly with zero flash of unstyled content.',
  },
  {
    icon: CodeIcon,
    color: COLORS.secondary.main,
    title: 'TypeScript First',
    desc: 'Full type safety from prop definitions to API responses. Catch errors at compile time, not in production.',
  },
  {
    icon: DevicesIcon,
    color: COLORS.primary.main,
    title: 'Responsive Design',
    desc: 'Mobile-first breakpoint system. Looks great on phones, tablets, laptops, and wide-format displays.',
  },
  {
    icon: FavoriteIcon,
    color: '#ef4444',
    title: 'Open Source',
    desc: 'MIT licensed, free forever. Contributions welcome. No vendor lock-in, ever.',
  },
];

const stats = [
  { value: '10k+', label: 'Components' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<50ms', label: 'Response time' },
  { value: 'MIT', label: 'License' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MuiPage() {
  const [mode, toggleMode] = useStoredColorMode();
  const isDark = mode === 'dark';

  return (
    <MuiShell colorMode={mode} onToggleMode={toggleMode}>

        {/* ── Hero ── */}
        <Box
          sx={{
            background: isDark
              ? 'linear-gradient(160deg, #1e1b4b 0%, #0f172a 60%)'
              : 'linear-gradient(160deg, #eef2ff 0%, #f0f9ff 60%, #f8fafc 100%)',
            borderBottom: '1px solid',
            borderColor: 'divider',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            px: 2,
          }}
        >
          {/* Decorative circles */}
          <Box sx={{ position: 'absolute', top: -120, right: -120, width: 480, height: 480, borderRadius: '50%', background: alpha(COLORS.secondary.main, 0.07), pointerEvents: 'none' }} />
          <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: alpha(COLORS.primary.main, 0.06), pointerEvents: 'none' }} />

          <Container maxWidth="md" sx={{ px: { xs: 2, sm: 4 }, position: 'relative' }}>
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.75,
                px: 2, py: 0.75, mb: 2.5,
                borderRadius: 99,
                border: '1px solid',
                borderColor: isDark ? COLORS.secondary.border.dark : COLORS.secondary.border.light,
                bgcolor: isDark ? COLORS.secondary.bg.dark : COLORS.secondary.bg.light,
                fontSize: '0.8125rem', fontWeight: 600, color: 'primary.light',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: COLORS.secondary.light, animation: 'pulse 2s infinite' }} />
              New · Now in v2.0 — built with MUI v9
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.75rem', sm: '4rem', lg: '5.5rem' },
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                color: 'text.primary',
                mb: 2,
              }}
            >
              Ship your next<br />
              <Box component="span" sx={{ color: 'primary.main' }}>project faster.</Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 560,
                mx: 'auto',
                fontSize: { xs: '1.0625rem', sm: '1.1875rem' },
                lineHeight: 1.75,
                color: 'text.secondary',
                mb: 3.5,
              }}
            >
              Material UI gives you the UI components, design tokens, and developer experience to build
              exceptional web applications — all with Material UI&apos;s power and Tailwind&apos;s aesthetics.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' }, px: 4, py: 1.75, fontSize: '1rem' }}
              >
                Get started for free
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: isDark ? COLORS.neutral.border.dark : '#cbd5e1',
                  color: 'text.secondary',
                  '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' },
                  px: 4, py: 1.75, fontSize: '1rem',
                }}
              >
                View docs →
              </Button>
            </Box>
          </Container>
        </Box>

        {/* ── Stats strip ── */}
        <Box sx={{ bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface, borderBottom: '1px solid', borderColor: 'divider', py: 5 }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, lg: 6 } }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2,1fr)', sm: 'repeat(4,1fr)' },
                gap: { xs: 4, sm: 2 },
                textAlign: 'center',
              }}
            >
              {stats.map((s) => (
                <Box key={s.label}>
                  <Typography
                    sx={{
                      fontSize: { xs: '2rem', sm: '2.5rem' },
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: 'primary.main',
                      lineHeight: 1,
                      mb: 0.5,
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9375rem', color: 'text.secondary', fontWeight: 500 }}>
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── Features ── */}
        <Box id="features" sx={{ bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.page }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, lg: 6 }, py: { xs: 10, sm: 16 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 8, sm: 12 } }}>
            <Typography
              sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 2 }}
            >
              Everything you need
            </Typography>
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '2rem', sm: '3rem' }, fontWeight: 800, letterSpacing: '-0.03em', color: 'text.primary', mb: 3 }}
            >
              Built for the modern web
            </Typography>
            <Typography sx={{ maxWidth: 520, mx: 'auto', fontSize: '1.0625rem', color: 'text.secondary', lineHeight: 1.75 }}>
              Everything you need to build production-quality applications. No compromises.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
              gap: 3,
            }}
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Box
                  key={f.title}
                  sx={{
                    p: 3.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface,
                    boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                    '&:hover': {
                      boxShadow: isDark ? `0 0 0 1px ${alpha(f.color, 0.4)}` : '0 4px 16px rgba(0,0,0,0.08)',
                      borderColor: alpha(f.color, 0.5),
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 44, height: 44,
                      borderRadius: 2,
                      bgcolor: alpha(f.color, 0.1),
                      mb: 2.5,
                    }}
                  >
                    <Icon sx={{ fontSize: 22, color: f.color }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: 'text.primary', mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9375rem', color: 'text.secondary', lineHeight: 1.7 }}>
                    {f.desc}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Container>
        </Box>

        <Divider />

        {/* ── CTA ── */}
        <Box
          sx={{
            background: isDark
              ? `linear-gradient(135deg, #1e1b4b 0%, ${COLORS.neutral.bg.dark.page} 100%)`
              : `linear-gradient(135deg, ${COLORS.secondary.main} 0%, #7c3aed 100%)`,
            py: { xs: 14, sm: 20 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md" sx={{ px: { xs: 2, sm: 4 } }}>
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '2rem', sm: '3rem' }, fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', mb: 3 }}
            >
              Ready to dive in?
            </Typography>
            <Typography sx={{ fontSize: '1.125rem', color: alpha('#ffffff', 0.8), mb: 7, maxWidth: 480, mx: 'auto', lineHeight: 1.7 }}>
              Start building with Material UI today. Free plan available — no credit card required.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: 'white', color: COLORS.secondary.main,
                  '&:hover': { bgcolor: alpha('#ffffff', 0.92) },
                  px: 4, py: 1.75, fontSize: '1rem',
                }}
              >
                Get started for free
              </Button>
              <Button
                size="large"
                sx={{
                  color: alpha('#ffffff', 0.85),
                  border: `1px solid ${alpha('#ffffff', 0.3)}`,
                  '&:hover': { bgcolor: alpha('#ffffff', 0.08) },
                  px: 4, py: 1.75, fontSize: '1rem',
                }}
              >
                Learn more
              </Button>
            </Box>
          </Container>
        </Box>

        {/* ── Footer ── */}
        <Box
          component="footer"
          sx={{
            bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface,
            borderTop: '1px solid',
            borderColor: isDark ? COLORS.neutral.border.dark : COLORS.neutral.border.light,
            py: 4,
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
              {/* Brand */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: 1, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MuiLogoIcon sx={{ fontSize: 12, color: 'white' }} />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: isDark ? COLORS.neutral.text.dark.primary : COLORS.neutral.text.light.primary,
                  }}
                >
                  Material UI
                </Typography>
              </Box>

              <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: isDark ? COLORS.neutral.text.dark.secondary : COLORS.neutral.text.light.secondary,
                  }}
                >
                  © 2019 - 2026 In House Cloud Solutions. All rights reserved.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'inline-flex',
                  px: 1.5, py: 0.5,
                  border: '1px solid',
                  borderColor: isDark ? COLORS.neutral.border.dark : COLORS.neutral.border.light,
                  borderRadius: 1,
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '0.8125rem',
                  color: isDark ? COLORS.neutral.text.dark.secondary : COLORS.neutral.text.light.secondary,
                }}
              >
                /mui route
              </Box>
            </Box>
          </Container>
        </Box>

    </MuiShell>
  );
}
