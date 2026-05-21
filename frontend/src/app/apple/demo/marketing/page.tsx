'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import TableChartIcon from '@mui/icons-material/TableChart';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import TailwindLogoIcon from '@/components/icons/TailwindLogoIcon';
import AppleLogoIcon from '@/components/icons/AppleLogoIcon';
import { TrustedPartnersMarqueeMui } from '@/components/marketing/TrustedPartnersMarqueeMui';
import { buildAppleTheme, COLORS } from '@/lib/theme';
import { NAV_SECTIONS, BOTTOM_NAV_TABS } from '@/lib/nav';
import { useStoredColorMode } from '@/lib/stored-color-mode';

// ─── Constants ────────────────────────────────────────────────────────────────

const WALLPAPER_LIGHT = 'linear-gradient(140deg, #f0f2f5 0%, #e8eaef 30%, #f5f6f8 60%, #ebedf0 90%)';
const WALLPAPER_DARK  = 'linear-gradient(140deg, #08000f 0%, #0e0830 30%, #00111e 60%, #000000 100%)';

const SECTION_STYLES: Record<string, { accentColor: string; accentLight: string }> = {
  mui:   { accentColor: '#6366f1', accentLight: '#a5b4fc' },
  tui:   { accentColor: '#0ea5e9', accentLight: '#7dd3fc' },
  apple: { accentColor: '#007AFF', accentLight: '#409CFF' },
};

const ITEM_ICON_MAP: Record<string, typeof HomeIcon> = {
  '/mui':                  HomeIcon,
  '/mui/demo/datagrid':    TableChartIcon,
  '/mui/demo/marketing':   CampaignIcon,
  '/tui':                  HomeIcon,
  '/tui/demo/datagrid':    TableChartIcon,
  '/tui/demo/marketing':   CampaignIcon,
  '/apple':                HomeIcon,
  '/apple/demo/datagrid':  TableChartIcon,
  '/apple/demo/marketing': CampaignIcon,
};

const navSections = NAV_SECTIONS.map((s) => ({
  ...s,
  ...SECTION_STYLES[s.id],
  items: s.items.map((item) => ({ ...item, icon: ITEM_ICON_MAP[item.href] ?? HomeIcon })),
}));

const BOTTOM_NAV_ICONS = [HomeIcon, MuiLogoIcon, TailwindLogoIcon, AppleLogoIcon] as const;

// ─── Glass helper ─────────────────────────────────────────────────────────────

function glassSx(isDark: boolean, opacity = 0.68) {
  return {
    background: isDark ? `rgba(28,28,30,${opacity})` : `rgba(255,255,255,${opacity})`,
    backdropFilter: 'saturate(180%) blur(24px)',
    WebkitBackdropFilter: 'saturate(180%) blur(24px)',
    border: '1px solid',
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
    boxShadow: isDark
      ? '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)'
      : '0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
  } as const;
}

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&w=1600&q=80',
    badge: 'New · Liquid Glass UI',
    headline: ['Interfaces that', 'feel alive.'],
    sub: 'Glass surfaces that adapt, blur, and breathe with the content beneath them — bringing depth to every screen.',
    cta: { label: 'Explore the system', href: '#' },
    secondary: { label: 'View gallery →', href: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    badge: 'Design System',
    headline: ['Depth by', 'design.'],
    sub: 'Multiple translucent planes create natural visual hierarchy. Foreground panels float closer; background content gracefully recedes.',
    cta: { label: 'See components', href: '#' },
    secondary: { label: 'Read the docs →', href: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    badge: 'Open Source · MIT',
    headline: ['Built for', 'every context.'],
    sub: 'Opacity, saturation, and blur automatically calibrate across light and dark environments. Glass always looks right, wherever it lives.',
    cta: { label: 'Get started', href: '#' },
    secondary: { label: 'Join community →', href: '#' },
  },
] as const;

const INTERVAL = 5000;

const FEATURES = [
  {
    icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 26 }} />,
    title: 'Glass-native polish',
    body: 'Translucent surfaces, depth, and motion that feel at home on modern OS visuals — without fighting the stack.',
  },
  {
    icon: <SpeedOutlinedIcon sx={{ fontSize: 26 }} />,
    title: 'Ship campaigns faster',
    body: 'Compose hero, proof, and CTA sections from the same primitives your product UI already uses.',
  },
  {
    icon: <GroupsOutlinedIcon sx={{ fontSize: 26 }} />,
    title: 'Built for teams',
    body: 'Design and engineering align on tokens, blur, and contrast — fewer surprises when the brand evolves.',
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AppleMarketingDemo() {
  const [mode, toggleMode] = useStoredColorMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchors, setAnchors]       = useState<Record<string, HTMLElement | null>>({ mui: null, tui: null, apple: null });
  const [active, setActive]         = useState(0);
  const [paused, setPaused]         = useState(false);
  const [tickKey, setTickKey]       = useState(0);
  const touchStartX                 = useRef<number | null>(null);

  const theme  = useMemo(() => buildAppleTheme(mode), [mode]);
  const isDark = mode === 'dark';

  const openMenu  = (id: string, el: HTMLElement) => setAnchors((p) => ({ ...p, [id]: el }));
  const closeMenu = (id: string) => setAnchors((p) => ({ ...p, [id]: null }));

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

      {/* Fixed wallpaper */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, background: isDark ? WALLPAPER_DARK : WALLPAPER_LIGHT }}>
        <Box sx={{ position: 'absolute', top: -160, right: -160, width: 520, height: 520, borderRadius: '50%', background: alpha('#4f46e5', 0.07), pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -120, left: -100, width: 400, height: 400, borderRadius: '50%', background: alpha('#0ea5e9', 0.06), pointerEvents: 'none' }} />
      </Box>

      {/* Content wrapper */}
      <Box sx={{ minHeight: '100vh', pt: '60px' }}>

        {/* ── Glass navbar ── */}
        <Box component="header" sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, ...navbarGlass }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 } }}>
            <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>

              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AppleLogoIcon sx={{ fontSize: 14, color: 'white' }} />
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: 'text.primary', letterSpacing: '-0.01em' }}>
                  Apple Liquid Glass
                </Typography>
              </Box>

              {/* Centre — dropdown nav (desktop) */}
              <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                {navSections.map((section) => (
                  <Box key={section.id}>
                    <Button
                      id={`nav-ap-mkt-${section.id}`}
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchors[section.id])}
                      onClick={(e) => openMenu(section.id, e.currentTarget)}
                      endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1rem !important', transition: 'transform 0.2s', transform: anchors[section.id] ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
                      sx={{
                        color: anchors[section.id] ? (isDark ? section.accentLight : section.accentColor) : 'text.secondary',
                        fontSize: '0.9375rem', px: 1.5,
                        '&:hover': { color: isDark ? section.accentLight : section.accentColor, bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' },
                      }}
                    >
                      {section.label}
                    </Button>

                    <Menu
                      anchorEl={anchors[section.id]}
                      open={Boolean(anchors[section.id])}
                      onClose={() => closeMenu(section.id)}
                      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            mt: 0.75, minWidth: 240, borderRadius: '12px !important',
                            border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            background: isDark ? 'rgba(28,28,30,0.96)' : 'rgba(255,255,255,0.96)',
                            backdropFilter: 'saturate(180%) blur(24px)',
                            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
                            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.12)',
                            overflow: 'visible',
                            '&::before': {
                              content: '""', position: 'absolute', top: -5, left: 20, width: 10, height: 10,
                              background: isDark ? 'rgba(28,28,30,0.96)' : 'rgba(255,255,255,0.96)',
                              transform: 'rotate(45deg)',
                              borderTop: '1px solid', borderLeft: '1px solid',
                              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            },
                          },
                        },
                      }}
                    >
                      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                        <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: isDark ? section.accentLight : section.accentColor }}>
                          {section.heading}
                        </Typography>
                      </Box>
                      {section.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <MenuItem key={item.href} component={Link} href={item.href} onClick={() => closeMenu(section.id)}
                            sx={{ mx: 1, mb: 0.5, borderRadius: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.25, py: 1.25, px: 1.5, '&:hover': { bgcolor: isDark ? alpha(section.accentColor, 0.12) : alpha(section.accentColor, 0.07) } }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ItemIcon sx={{ fontSize: 15, color: isDark ? section.accentLight : section.accentColor }} />
                              <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: 'text.primary' }}>{item.label}</Typography>
                            </Box>
                            <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.5, pl: '23px' }}>{item.desc}</Typography>
                          </MenuItem>
                        );
                      })}
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ px: 2, pb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AddIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                        <Typography sx={{ fontSize: '0.8125rem', color: 'text.disabled', fontStyle: 'italic' }}>More pages coming soon</Typography>
                      </Box>
                    </Menu>
                  </Box>
                ))}
              </Box>

              {/* Right */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                <IconButton onClick={toggleMode} aria-label={isDark ? 'Light mode' : 'Dark mode'} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                  {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </IconButton>
                <IconButton onClick={() => setDrawerOpen(true)} aria-label="Open menu" sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary' }}>
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
            root: { keepMounted: false },
            paper: { sx: { width: 280, bgcolor: isDark ? 'rgba(20,20,22,0.96)' : 'rgba(255,255,255,0.96)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' } },
          }}
        >
          <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AppleLogoIcon sx={{ fontSize: 12, color: 'white' }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>Liquid Glass</Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{ color: 'text.secondary' }}><CloseIcon fontSize="small" /></IconButton>
          </Box>

          <Box sx={{ overflowY: 'auto', flex: 1, py: 1.5 }}>
            {navSections.map((section, idx) => (
              <Box key={section.id}>
                <Typography sx={{ px: 2.5, pt: idx === 0 ? 1 : 2, pb: 0.75, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: isDark ? section.accentLight : section.accentColor }}>
                  {section.heading}
                </Typography>
                <List dense disablePadding>
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <ListItemButton key={item.href} component={Link} href={item.href} onClick={() => setDrawerOpen(false)}
                        sx={{ mx: 1, borderRadius: 1.5, mb: 0.5, py: 1, '&:hover': { bgcolor: isDark ? alpha(section.accentColor, 0.12) : alpha(section.accentColor, 0.07) } }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}><ItemIcon sx={{ fontSize: 16, color: isDark ? section.accentLight : section.accentColor }} /></ListItemIcon>
                        <ListItemText primary={item.label} secondary={item.desc} slotProps={{ primary: { style: { fontSize: '0.9375rem', fontWeight: 600 } }, secondary: { style: { fontSize: '0.8125rem', lineHeight: 1.4, marginTop: 2 } } }} />
                      </ListItemButton>
                    );
                  })}
                </List>
                {idx < navSections.length - 1 && <Divider sx={{ mt: 1.5 }} />}
              </Box>
            ))}
          </Box>

          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton onClick={() => { toggleMode(); setDrawerOpen(false); }} sx={{ color: 'text.secondary' }}>
              {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{isDark ? 'Light mode' : 'Dark mode'}</Typography>
          </Box>
        </Drawer>

        {/* ── Glass Slider Hero ── */}
        <Box
          sx={{
            position: 'relative', overflow: 'hidden',
            height: { xs: 'calc(100dvh - 60px - 56px)', md: 'calc(100dvh - 60px)' },
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
              <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              {/* Overlay */}
              <Box sx={{ position: 'absolute', inset: 0, background: isDark ? 'rgba(8,0,15,0.72)' : 'rgba(240,242,245,0.62)', backdropFilter: 'saturate(140%) blur(4px)', WebkitBackdropFilter: 'saturate(140%) blur(4px)' }} />

              {/* Glass content panel */}
              <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
                <Box sx={{ ...glassSx(isDark, isDark ? 0.72 : 0.78), borderRadius: 4, p: { xs: 4, sm: 5, md: 6 } }}>
                  {/* Badge */}
                  <Box
                    sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 0.75,
                      px: 1.75, py: 0.625, mb: 3,
                      borderRadius: 99,
                      bgcolor: isDark ? 'rgba(0,122,255,0.15)' : 'rgba(0,122,255,0.08)',
                      border: '1px solid', borderColor: isDark ? 'rgba(0,122,255,0.35)' : 'rgba(0,122,255,0.2)',
                      fontSize: '0.8125rem', fontWeight: 600, color: isDark ? '#409CFF' : '#007AFF',
                    }}
                  >
                    <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#007AFF' }} />
                    {slide.badge}
                  </Box>

                  <Typography
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    {slide.headline[0]}<br />
                    <Box component="span" sx={{ color: '#007AFF' }}>{slide.headline[1]}</Box>
                  </Typography>

                  <Typography sx={{ fontSize: { xs: '0.9375rem', sm: '1rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3.5 }}>
                    {slide.sub}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                    <Button
                      variant="contained"
                      component="a"
                      href={slide.cta.href}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: '#007AFF', '&:hover': { bgcolor: '#0071e3' },
                        borderRadius: 2, px: 3.5, py: 1.25, fontSize: '0.9375rem',
                        boxShadow: '0 4px 16px rgba(0,122,255,0.35)',
                      }}
                    >
                      {slide.cta.label}
                    </Button>
                    <Button
                      variant="outlined"
                      component="a"
                      href={slide.secondary.href}
                      sx={{
                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                        color: 'text.secondary',
                        borderRadius: 2, px: 3.5, py: 1.25, fontSize: '0.9375rem',
                        '&:hover': { borderColor: '#007AFF', color: '#007AFF', bgcolor: 'transparent' },
                      }}
                    >
                      {slide.secondary.label}
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          ))}

          {/* ── Top-left: dots + counter chip ── */}
          <Box
            sx={{
              position: 'absolute', top: { xs: 16, sm: 20 }, left: { xs: 16, sm: 20 }, zIndex: 10,
              display: 'flex', alignItems: 'center', gap: 1.5,
              px: 1.75, py: 1,
              borderRadius: '14px',
              ...glassSx(isDark, 0.62),
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
                    bgcolor: i === active ? '#007AFF' : (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.2)'),
                    transition: 'all 0.3s ease',
                    '&:hover': { bgcolor: i === active ? '#007AFF' : (isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.38)') },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ width: '1px', height: 14, bgcolor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)', flexShrink: 0 }} />
            <Box component="span" sx={{ fontSize: '0.6875rem', fontWeight: 500, color: 'text.secondary', lineHeight: 1, whiteSpace: 'nowrap' }}>
              {active + 1} / {SLIDES.length}
            </Box>
          </Box>

          {/* ── Top-right: prev / next arrow chip ── */}
          <Box
            sx={{
              position: 'absolute', top: { xs: 16, sm: 20 }, right: { xs: 16, sm: 20 }, zIndex: 10,
              display: 'flex', alignItems: 'center', gap: 0.25,
              p: 0.75,
              borderRadius: '14px',
              ...glassSx(isDark, 0.62),
            }}
          >
            <IconButton
              onClick={prev}
              aria-label="Previous slide"
              size="small"
              sx={{
                color: 'text.primary',
                '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)' },
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: '0.875rem' }} />
            </IconButton>
            <IconButton
              onClick={next}
              aria-label="Next slide"
              size="small"
              sx={{
                color: 'text.primary',
                '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)' },
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: '0.875rem' }} />
            </IconButton>
          </Box>

          {/* Progress bar */}
          {!paused && (
            <Box
              key={`pb-${active}`}
              sx={{
                position: 'absolute', top: 0, left: 0, height: 3, zIndex: 10,
                bgcolor: '#007AFF',
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
                    ...glassSx(isDark, isDark ? 0.62 : 0.72),
                    borderRadius: 3,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
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
                      bgcolor: isDark ? alpha('#007AFF', 0.22) : alpha('#007AFF', 0.1),
                      color: isDark ? '#409CFF' : '#007AFF',
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
              href="/apple"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                bgcolor: '#007AFF',
                '&:hover': { bgcolor: '#0062CC' },
              }}
            >
              Back to Apple Liquid Glass home
            </Button>
          </Container>
        </Box>

        {/* ── Footer ── */}
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
                Apple Liquid Glass · Marketing
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', textAlign: { xs: 'center', sm: 'right' } }}>
                © 2019 - 2026 In House Cloud Solutions. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ── Bottom-nav spacer (mobile) ── */}
        <Toolbar sx={{ display: { xs: 'flex', md: 'none' } }} />

      </Box>

      {/* ── Mobile bottom navigation ── */}
      <BottomNavigation
        value={3}
        showLabels
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200,
          height: 56,
          background: isDark ? 'rgba(20,20,22,0.78)' : 'rgba(255,255,255,0.82)',
          backdropFilter: 'saturate(180%) blur(24px)',
          WebkitBackdropFilter: 'saturate(180%) blur(24px)',
          borderTop: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
          boxShadow: isDark ? '0 -2px 16px rgba(0,0,0,0.5)' : '0 -2px 16px rgba(0,0,0,0.07)',
          '& .MuiBottomNavigationAction-root': { color: 'text.secondary' },
          '& .MuiBottomNavigationAction-root.Mui-selected': { color: '#007AFF' },
          '& .MuiBottomNavigationAction-label': { fontSize: '0.625rem' },
          '& .MuiBottomNavigationAction-label.Mui-selected': { fontSize: '0.625rem' },
        }}
      >
        {BOTTOM_NAV_TABS.map((tab, i) => {
          const Icon = BOTTOM_NAV_ICONS[i];
          return (
            <BottomNavigationAction
              key={tab.href}
              label={tab.label}
              icon={<Icon />}
              component={Link}
              href={tab.href}
            />
          );
        })}
      </BottomNavigation>

    </ThemeProvider>
  );
}
