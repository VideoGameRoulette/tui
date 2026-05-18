'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import LayersIcon from '@mui/icons-material/Layers';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import PaletteIcon from '@mui/icons-material/Palette';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import TailwindLogoIcon from '@/components/icons/TailwindLogoIcon';
import AppleLogoIcon from '@/components/icons/AppleLogoIcon';
import { buildAppleTheme } from '@/lib/theme';

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'forma-color-scheme';

const WALLPAPER_LIGHT =
  'linear-gradient(140deg, #a8d8f0 0%, #c4a8e8 30%, #e8a8c8 60%, #f0c890 90%)';
const WALLPAPER_DARK =
  'linear-gradient(140deg, #08000f 0%, #0e0830 30%, #00111e 60%, #000000 100%)';

// ─── Glass helpers ────────────────────────────────────────────────────────────

function glassSx(isDark: boolean, opacity = 0.68) {
  return {
    background: isDark
      ? `rgba(28,28,30,${opacity})`
      : `rgba(255,255,255,${opacity})`,
    backdropFilter: 'saturate(180%) blur(24px)',
    WebkitBackdropFilter: 'saturate(180%) blur(24px)',
    border: '1px solid',
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
    boxShadow: isDark
      ? '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)'
      : '0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
  } as const;
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const navSections = [
  {
    id: 'mui',
    label: 'MUI',
    heading: 'Material UI',
    accentColor: '#6366f1',
    accentLight: '#a5b4fc',
    items: [
      { label: 'Home',      href: '/mui',               icon: HomeIcon,       desc: 'Landing page with Tailwind-inspired MUI theme' },
      { label: 'Data Grid', href: '/mui/demo/datagrid', icon: TableChartIcon, desc: 'DataGrid with sorting, filtering, grouping and CSV/XLS export' },
    ],
  },
  {
    id: 'tui',
    label: 'Tailwind',
    heading: 'Tailwind CSS',
    accentColor: '#0ea5e9',
    accentLight: '#7dd3fc',
    items: [
      { label: 'Home', href: '/tui', icon: HomeIcon, desc: 'Landing page built with pure Tailwind v4 utility classes' },
    ],
  },
  {
    id: 'apple',
    label: 'Glass',
    heading: 'Apple Liquid Glass',
    accentColor: '#007AFF',
    accentLight: '#409CFF',
    items: [
      { label: 'Home', href: '/apple', icon: HomeIcon, desc: 'Apple-inspired liquid glass design system with MUI v9' },
    ],
  },
];

// ─── Feature cards ────────────────────────────────────────────────────────────

const features = [
  {
    id: 'vibrancy',
    Icon: AutoAwesomeIcon,
    accent: '#007AFF',
    title: 'Vibrancy',
    desc: 'Glass surfaces dynamically sample and blend the colors of content behind them — creating a sense of depth and environmental awareness unique to each context.',
  },
  {
    id: 'depth',
    Icon: LayersIcon,
    accent: '#5856D6',
    title: 'Depth & Layers',
    desc: 'Multiple translucent planes create natural visual hierarchy. Foreground panels float closer; background content gracefully recedes. Glass makes layering feel effortless.',
  },
  {
    id: 'responsive',
    Icon: BlurOnIcon,
    accent: '#FF2D55',
    title: 'Responsive Glass',
    desc: 'Opacity, saturation, and blur automatically calibrate across light and dark environments. No manual tweaking — glass always looks right, wherever it lives.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AppleGlassPage() {
  const [mode, setMode]           = useState<'light' | 'dark'>('light');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchors, setAnchors]       = useState<Record<string, HTMLElement | null>>({ mui: null, tui: null, apple: null });
  const theme  = useMemo(() => buildAppleTheme(mode), [mode]);
  const isDark = mode === 'dark';

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null;
      if (saved === 'light' || saved === 'dark') setMode(saved);
    } catch {}
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  }, []);

  const openMenu  = (id: string, el: HTMLElement) => setAnchors((p) => ({ ...p, [id]: el }));
  const closeMenu = (id: string) => setAnchors((p) => ({ ...p, [id]: null }));

  // Precomputed glass variants
  const navbarGlass = {
    background: isDark ? 'rgba(20,20,22,0.78)' : 'rgba(255,255,255,0.82)',
    backdropFilter: 'saturate(180%) blur(24px)',
    WebkitBackdropFilter: 'saturate(180%) blur(24px)',
    borderBottom: '1px solid',
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
    boxShadow: isDark ? '0 2px 16px rgba(0,0,0,0.5)' : '0 2px 16px rgba(0,0,0,0.07)',
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Fixed wallpaper background */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, background: isDark ? WALLPAPER_DARK : WALLPAPER_LIGHT }} />

      {/* Content */}
      <Box sx={{ minHeight: '100vh', pt: '60px', pb: { xs: '56px', md: 0 } }}>

        {/* ── Glass navbar ── */}
        <Box
          component="header"
          sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, ...navbarGlass }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 } }}>
            <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>

              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
                <Box
                  sx={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <AppleLogoIcon sx={{ fontSize: 14, color: 'white' }} />
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: 'text.primary', letterSpacing: '-0.01em' }}>
                  Apple Liquid Glass
                </Typography>
              </Box>

              {/* Centre — section dropdowns (desktop only) */}
              <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                {navSections.map((section) => (
                  <Box key={section.id}>
                    <Button
                      id={`nav-ap-${section.id}`}
                      aria-controls={anchors[section.id] ? `menu-ap-${section.id}` : undefined}
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchors[section.id])}
                      onClick={(e) => openMenu(section.id, e.currentTarget)}
                      endIcon={
                        <KeyboardArrowDownIcon
                          sx={{
                            fontSize: '1rem !important',
                            transition: 'transform 0.2s',
                            transform: anchors[section.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      }
                      sx={{
                        color: anchors[section.id]
                          ? (isDark ? section.accentLight : section.accentColor)
                          : 'text.secondary',
                        fontSize: '0.9375rem',
                        px: 1.5,
                        '&:hover': {
                          color: isDark ? section.accentLight : section.accentColor,
                          bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                        },
                      }}
                    >
                      {section.label}
                    </Button>

                    <Menu
                      id={`menu-ap-${section.id}`}
                      anchorEl={anchors[section.id]}
                      open={Boolean(anchors[section.id])}
                      onClose={() => closeMenu(section.id)}
                      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            mt: 0.75,
                            minWidth: 240,
                            borderRadius: '12px !important',
                            border: '1px solid',
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            background: isDark ? 'rgba(28,28,30,0.96)' : 'rgba(255,255,255,0.96)',
                            backdropFilter: 'saturate(180%) blur(24px)',
                            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
                            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.12)',
                            overflow: 'visible',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: -5,
                              left: 20,
                              width: 10,
                              height: 10,
                              background: isDark ? 'rgba(28,28,30,0.96)' : 'rgba(255,255,255,0.96)',
                              transform: 'rotate(45deg)',
                              borderTop: '1px solid',
                              borderLeft: '1px solid',
                              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            },
                          },
                        },
                      }}
                    >
                      {/* Section heading */}
                      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                        <Typography
                          sx={{
                            fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: '0.1em', color: isDark ? section.accentLight : section.accentColor,
                          }}
                        >
                          {section.heading}
                        </Typography>
                      </Box>

                      {/* Pages */}
                      {section.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <MenuItem
                            key={item.href}
                            component={Link}
                            href={item.href}
                            onClick={() => closeMenu(section.id)}
                            sx={{
                              mx: 1, mb: 0.5, borderRadius: 1.5,
                              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                              gap: 0.25, py: 1.25, px: 1.5,
                              '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)' },
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ItemIcon sx={{ fontSize: 15, color: isDark ? section.accentLight : section.accentColor }} />
                              <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: 'text.primary' }}>
                                {item.label}
                              </Typography>
                            </Box>
                            <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.5, pl: '23px' }}>
                              {item.desc}
                            </Typography>
                          </MenuItem>
                        );
                      })}

                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ px: 2, pb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AddIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                        <Typography sx={{ fontSize: '0.8125rem', color: 'text.disabled', fontStyle: 'italic' }}>
                          More pages coming soon
                        </Typography>
                      </Box>
                    </Menu>
                  </Box>
                ))}
              </Box>

              {/* Right — theme toggle + mobile hamburger */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
                  <IconButton
                    onClick={toggleMode}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                  >
                    {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>

                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open navigation menu"
                  sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── Mobile drawer ── */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          keepMounted={false}
          sx={{ display: { md: 'none' } }}
          slotProps={{
            paper: {
              sx: {
                width: 280,
                background: isDark ? 'rgba(28,28,30,0.97)' : 'rgba(255,255,255,0.97)',
                backdropFilter: 'saturate(200%) blur(40px)',
                WebkitBackdropFilter: 'saturate(200%) blur(40px)',
                borderRight: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                boxShadow: isDark ? '4px 0 32px rgba(0,0,0,0.6)' : '4px 0 32px rgba(0,0,0,0.1)',
              },
            },
          }}
        >
          {/* Drawer header */}
          <Box
            sx={{
              height: 60,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              px: 2,
              borderBottom: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <AppleLogoIcon sx={{ fontSize: 12, color: 'white' }} />
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: 'text.primary' }}>
                Apple Liquid Glass
              </Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} size="small" aria-label="Close menu" sx={{ color: 'text.secondary' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Nav sections */}
          <Box sx={{ overflowY: 'auto', flex: 1, py: 1.5 }}>
            {navSections.map((section, idx) => (
              <Box key={section.id}>
                <Typography
                  sx={{
                    px: 2.5, pt: idx === 0 ? 1 : 2, pb: 0.75,
                    fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: isDark ? section.accentLight : section.accentColor,
                  }}
                >
                  {section.heading}
                </Typography>

                <List dense disablePadding>
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <ListItemButton
                        key={item.href}
                        component={Link}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          mx: 1, borderRadius: 1.5, mb: 0.5, py: 1,
                          '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)' },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <ItemIcon sx={{ fontSize: 16, color: isDark ? section.accentLight : section.accentColor }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          secondary={item.desc}
                          slotProps={{
                            primary:   { style: { fontSize: '0.9375rem', fontWeight: 600 } },
                            secondary: { style: { fontSize: '0.8125rem', lineHeight: 1.4, marginTop: 2 } },
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </List>

                {idx < navSections.length - 1 && <Divider sx={{ mt: 1.5 }} />}
              </Box>
            ))}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2.5, mt: 2 }}>
              <AddIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
              <Typography sx={{ fontSize: '0.8125rem', color: 'text.disabled', fontStyle: 'italic' }}>
                More pages coming soon
              </Typography>
            </Box>
          </Box>

          {/* Drawer footer */}
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              p: 2, display: 'flex', alignItems: 'center', gap: 1.5,
            }}
          >
            <IconButton
              onClick={() => { toggleMode(); setDrawerOpen(false); }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              sx={{ color: 'text.secondary' }}
            >
              {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              {isDark ? 'Light mode' : 'Dark mode'}
            </Typography>
          </Box>
        </Drawer>

        {/* ── Hero ── */}
        <Box
          sx={{
            minHeight: { xs: 'calc(100vh - 60px - 56px)', md: 'calc(100vh - 60px)' },
            ...glassSx(isDark, isDark ? 0.58 : 0.65),
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 4, sm: 7, lg: 10 },
            textAlign: 'center',
            }}
          >
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.75,
                px: 2, py: 0.625, mb: 4,
                borderRadius: 99,
                background: isDark ? 'rgba(0,122,255,0.18)' : 'rgba(0,122,255,0.1)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(0,122,255,0.35)' : 'rgba(0,122,255,0.22)',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#007AFF', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#007AFF' }}>
                New · Apple Liquid Glass Design System
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.75rem', sm: '4rem', lg: '5rem', xl: '5.5rem' },
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                color: 'text.primary',
                mb: 3,
              }}
            >
              Design that{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #007AFF 0%, #5856D6 50%, #FF2D55 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                feels alive.
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: { xs: 500, lg: 580 }, mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 6,
              }}
            >
              Liquid Glass brings a new material to your interface — translucent, adaptive, and
              deeply integrated with the environment it lives in.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
              <Button
                component="a"
                href="#features"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#007AFF',
                  '&:hover': { bgcolor: '#0062CC' },
                  px: 4, py: 1.5, fontSize: '1rem', borderRadius: 2,
                }}
              >
                Explore features
              </Button>
              <Button
                component="a"
                href="#gallery"
                size="large"
                sx={{
                  px: 4, py: 1.5, fontSize: '1rem', borderRadius: 2,
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.14)',
                  background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    borderColor: '#007AFF', color: '#007AFF',
                    background: isDark ? 'rgba(0,122,255,0.12)' : 'rgba(0,122,255,0.05)',
                  },
                }}
              >
                View gallery →
              </Button>
            </Box>
        </Box>

        {/* ── Features ── */}
        <Box id="features" sx={{ py: { xs: 8, sm: 14 } }}>
          <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, lg: 6 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 10 } }}>
              <Typography
                sx={{
                  fontSize: '0.8125rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: '#007AFF', mb: 2,
                }}
              >
                The material
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '3.25rem' },
                  fontWeight: 700, letterSpacing: '-0.025em',
                  color: 'text.primary', mb: 2.5,
                }}
              >
                Glass, reimagined.
              </Typography>
              <Typography sx={{ maxWidth: { xs: 440, lg: 560 }, mx: 'auto', fontSize: '1.0625rem', color: 'text.secondary', lineHeight: 1.75 }}>
                Three principles define how liquid glass behaves across every surface it touches.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
                gap: 3,
              }}
            >
              {features.map((f) => (
                <Box
                  key={f.id}
                  id={f.id}
                  sx={{
                    ...glassSx(isDark, isDark ? 0.6 : 0.68),
                    borderRadius: 3,
                    p: { xs: 3.5, sm: 4 },
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: isDark
                        ? `0 20px 56px rgba(0,0,0,0.55), 0 0 0 1px ${alpha(f.accent, 0.3)}`
                        : `0 20px 56px rgba(0,0,0,0.12), 0 0 0 1px ${alpha(f.accent, 0.2)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 48, height: 48, borderRadius: 2,
                      bgcolor: alpha(f.accent, isDark ? 0.2 : 0.1),
                      color: f.accent,
                      mb: 3,
                    }}
                  >
                    <f.Icon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: 'text.primary', mb: 1.5 }}>
                    {f.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9375rem', color: 'text.secondary', lineHeight: 1.75 }}>
                    {f.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── macOS Window Gallery ── */}
        <Box id="gallery" sx={{ py: { xs: 8, sm: 14 } }}>
          <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, lg: 6 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 10 } }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '3.25rem' },
                  fontWeight: 700, letterSpacing: '-0.025em',
                  color: 'text.primary', mb: 2,
                }}
              >
                Windows that breathe.
              </Typography>
              <Typography sx={{ fontSize: '1.0625rem', color: 'text.secondary', maxWidth: { xs: 420, lg: 540 }, mx: 'auto', lineHeight: 1.75 }}>
                Toggle dark mode in the navbar — watch every glass surface adapt to its new environment.
              </Typography>
            </Box>

            {/* macOS-style window mockup */}
            <Box
              sx={{
                ...glassSx(isDark, isDark ? 0.62 : 0.7),
                borderRadius: 3,
                overflow: 'hidden',
                mx: 'auto',
              }}
            >
              {/* Title bar */}
              <Box
                sx={{
                  height: 44,
                  display: 'flex', alignItems: 'center',
                  px: 2, gap: 2,
                  background: isDark ? 'rgba(40,40,42,0.85)' : 'rgba(240,240,240,0.85)',
                  backdropFilter: 'blur(12px)',
                  borderBottom: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  flexShrink: 0,
                }}
              >
                {/* Traffic lights */}
                <Box sx={{ display: 'flex', gap: 0.875, flexShrink: 0 }}>
                  {[
                    { color: '#FF5F57', shadow: '#E0443E' },
                    { color: '#FEBC2E', shadow: '#D4A017' },
                    { color: '#28C840', shadow: '#1FAD2F' },
                  ].map((dot) => (
                    <Box
                      key={dot.color}
                      sx={{
                        width: 12, height: 12, borderRadius: '50%',
                        bgcolor: dot.color, flexShrink: 0,
                        boxShadow: `0 0 0 0.5px ${alpha(dot.shadow, 0.6)}`,
                      }}
                    />
                  ))}
                </Box>
                <Typography
                  sx={{
                    flex: 1, textAlign: 'center',
                    fontSize: '0.8125rem', fontWeight: 600,
                    color: 'text.secondary',
                    mr: '60px',
                  }}
                >
                  Apple Liquid Glass — Settings
                </Typography>
              </Box>

              {/* Window body */}
              <Box sx={{ display: 'flex', height: { xs: 300, sm: 360 } }}>
                {/* Sidebar */}
                <Box
                  sx={{
                    width: { xs: 140, sm: 180 }, flexShrink: 0,
                    background: isDark ? 'rgba(28,28,30,0.6)' : 'rgba(248,248,248,0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    p: 1.5,
                    display: 'flex', flexDirection: 'column', gap: 0.5,
                  }}
                >
                  {['General', 'Appearance', 'Accessibility', 'Privacy', 'Displays'].map((item, i) => (
                    <Box
                      key={item}
                      sx={{
                        px: 1.5, py: 0.875,
                        borderRadius: 1.5,
                        fontSize: '0.875rem',
                        fontWeight: i === 1 ? 600 : 400,
                        color: i === 1 ? 'white' : 'text.secondary',
                        bgcolor: i === 1 ? '#007AFF' : 'transparent',
                        cursor: 'default',
                        transition: 'background-color 0.15s',
                        '&:hover': {
                          bgcolor: i === 1
                            ? '#007AFF'
                            : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
                        },
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>

                {/* Main content */}
                <Box sx={{ flex: 1, p: { xs: 2.5, sm: 3 }, overflowY: 'auto' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: 'text.primary', mb: 3 }}>
                    Appearance
                  </Typography>

                  {[
                    { label: 'Appearance',       value: isDark ? 'Dark' : 'Light' },
                    { label: 'Accent color',     value: 'Blue'                    },
                    { label: 'Sidebar icon size', value: 'Medium'                 },
                    { label: 'Transparency',     value: 'Enabled'                 },
                  ].map((row) => (
                    <Box
                      key={row.label}
                      sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.9375rem', color: 'text.primary' }}>
                        {row.label}
                      </Typography>
                      <Box
                        sx={{
                          px: 1.5, py: 0.375, borderRadius: 1,
                          bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          fontSize: '0.875rem', color: 'text.secondary',
                        }}
                      >
                        {row.value}
                      </Box>
                    </Box>
                  ))}

                  <Box
                    sx={{
                      mt: 3, p: 2, borderRadius: 2,
                      bgcolor: isDark ? 'rgba(0,122,255,0.12)' : 'rgba(0,122,255,0.06)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(0,122,255,0.3)' : 'rgba(0,122,255,0.15)',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.875rem', color: '#007AFF', lineHeight: 1.6 }}>
                      Toggle dark mode in the navbar to see every glass surface adapt in real time.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── CTA ── */}
        <Box sx={{ py: { xs: 12, sm: 20 }, px: { xs: 2, sm: 4, lg: 6 } }}>
          <Box
            sx={{
              ...glassSx(isDark, isDark ? 0.62 : 0.7),
              borderRadius: 4,
              mx: 'auto',
              textAlign: 'center',
              p: { xs: 5, sm: 8, lg: 12 },
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '3rem' },
                fontWeight: 700, letterSpacing: '-0.025em',
                color: 'text.primary', mb: 2,
              }}
            >
              Ready to build with glass?
            </Typography>
            <Typography sx={{ fontSize: '1.0625rem', color: 'text.secondary', mb: 6, lineHeight: 1.8 }}>
              Everything you need to craft stunning liquid glass interfaces — light and dark, ready
              to ship.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#007AFF', '&:hover': { bgcolor: '#0062CC' },
                  px: 4, py: 1.5, borderRadius: 2, fontSize: '1rem',
                }}
              >
                Get the kit
              </Button>
              <Button
                size="large"
                sx={{
                  px: 4, py: 1.5, borderRadius: 2, fontSize: '1rem',
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    color: '#007AFF', borderColor: '#007AFF',
                    background: isDark ? 'rgba(0,122,255,0.1)' : 'rgba(0,122,255,0.04)',
                  },
                }}
              >
                View docs →
              </Button>
            </Box>
          </Box>
        </Box>

        {/* ── Footer ── */}
        <Box
          sx={{
            background: isDark ? 'rgba(20,20,22,0.78)' : 'rgba(255,255,255,0.82)',
            backdropFilter: 'saturate(180%) blur(24px)',
            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            borderTop: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <AppleLogoIcon sx={{ fontSize: 11, color: 'white' }} />
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: 'text.primary' }}>
                  Apple Liquid Glass
                </Typography>
              </Box>

              <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>
                © 2019 - 2026 In House Cloud Solutions. All rights reserved.
              </Typography>

              <Box
                sx={{
                  display: 'inline-flex',
                  px: 1.5, py: 0.5,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '0.8125rem',
                  color: 'text.secondary',
                }}
              >
                /apple route
              </Box>
            </Box>
          </Container>
        </Box>

      {/* ── Mobile bottom navigation ── */}
      <BottomNavigation
        value={3}
        showLabels
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 1200,
          height: 56,
          background: isDark ? 'rgba(28,28,30,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderTop: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.4)' : '0 -4px 20px rgba(0,0,0,0.06)',
          '& .MuiBottomNavigationAction-root': { color: 'text.secondary' },
          '& .MuiBottomNavigationAction-root.Mui-selected': { color: '#007AFF' },
        }}
      >
        <BottomNavigationAction label="Home"     icon={<HomeIcon />}           component={Link} href="/"      />
        <BottomNavigationAction label="MUI"      icon={<MuiLogoIcon />}        component={Link} href="/mui"   />
        <BottomNavigationAction label="Tailwind" icon={<TailwindLogoIcon />}   component={Link} href="/tui"   />
        <BottomNavigationAction label="Glass"    icon={<AppleLogoIcon />}      component={Link} href="/apple" />
      </BottomNavigation>

      </Box>
    </ThemeProvider>
  );
}
