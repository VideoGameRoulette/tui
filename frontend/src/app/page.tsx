'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LayersIcon from '@mui/icons-material/Layers';
import PaletteIcon from '@mui/icons-material/Palette';
import SpeedIcon from '@mui/icons-material/Speed';
import CodeIcon from '@mui/icons-material/Code';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import TailwindLogoIcon from '@/components/icons/TailwindLogoIcon';
import AppleLogoIcon from '@/components/icons/AppleLogoIcon';
import { buildHomeTheme, COLORS } from '@/lib/theme';
import { NAV_SECTIONS, BOTTOM_NAV_TABS } from '@/lib/nav';
import { useStoredColorMode } from '@/lib/stored-color-mode';
import { touchSafeTooltipProps } from '@/lib/mui-touch-tooltip';

// ─── Nav section data ─────────────────────────────────────────────────────────
// Route data lives in src/lib/nav.ts — add/rename routes there.

const SECTION_STYLES: Record<string, { accentColor: string; accentLight: string }> = {
  mui:   { accentColor: COLORS.secondary.main, accentLight: COLORS.secondary.light },
  tui:   { accentColor: COLORS.primary.main,   accentLight: COLORS.primary.light   },
  apple: { accentColor: '#007AFF',              accentLight: '#409CFF'              },
  ads:   { accentColor: '#f59e0b',              accentLight: '#fcd34d'              },
};

const ITEM_ICON_MAP: Record<string, typeof HomeIcon> = {
  '/mui':                 HomeIcon,
  '/mui/demo/datagrid':   TableChartIcon,
  '/tui':                 HomeIcon,
  '/tui/demo/datagrid':   TableChartIcon,
  '/apple':               HomeIcon,
  '/apple/demo/datagrid': TableChartIcon,
};

const navSections = NAV_SECTIONS.map((s) => ({
  ...s,
  ...SECTION_STYLES[s.id],
  items: s.items.map((item) => ({ ...item, icon: ITEM_ICON_MAP[item.href] ?? HomeIcon })),
}));

const BOTTOM_NAV_ICONS = [HomeIcon, MuiLogoIcon, TailwindLogoIcon, AppleLogoIcon] as const;

// ─── Static content ───────────────────────────────────────────────────────────

const pillars = [
  { icon: <LayersIcon sx={{ fontSize: 18 }} />, label: 'MUI v9' },
  { icon: <PaletteIcon sx={{ fontSize: 18 }} />, label: 'Tailwind v4' },
  { icon: <SpeedIcon sx={{ fontSize: 18 }} />, label: 'Next.js 16' },
  { icon: <CodeIcon sx={{ fontSize: 18 }} />, label: 'TypeScript' },
];

const routeCards = [
  {
    id: 'mui',
    href: '/mui',
    label: 'Material UI',
    badge: '/mui',
    color: COLORS.secondary.main,
    lightColor: COLORS.secondary.light,
    bg: (isDark: boolean) => isDark ? COLORS.secondary.bg.dark : COLORS.secondary.bg.light,
    border: (isDark: boolean) => isDark ? COLORS.secondary.border.dark : COLORS.secondary.border.light,
    description: "A Tailwind-inspired landing page built entirely with MUI v9 components and a custom theme that replicates Tailwind's design language.",
    cta: 'Explore MUI version',
    bullets: ['MUI v9 components', 'Tailwind-inspired theme', 'Emotion CSS-in-JS', 'Light & dark mode'],
  },
  {
    id: 'tui',
    href: '/tui',
    label: 'Tailwind CSS',
    badge: '/tui',
    color: COLORS.primary.main,
    lightColor: COLORS.primary.light,
    bg: (isDark: boolean) => isDark ? COLORS.primary.bg.dark : COLORS.primary.bg.light,
    border: (isDark: boolean) => isDark ? COLORS.primary.border.dark : COLORS.primary.border.light,
    description: 'The same landing page rebuilt with pure Tailwind CSS utility classes — no MUI, just the atomic CSS approach Tailwind UI uses.',
    cta: 'Explore Tailwind version',
    bullets: ['Tailwind v4 utilities', 'Zero runtime CSS', 'Utility-first classes', 'PostCSS pipeline'],
  },
  {
    id: 'apple',
    href: '/apple',
    label: 'Apple Liquid Glass',
    badge: '/apple',
    color: '#007AFF',
    lightColor: '#409CFF',
    bg: (isDark: boolean) => isDark ? 'rgba(0,122,255,0.12)' : 'rgba(0,122,255,0.06)',
    border: (isDark: boolean) => isDark ? 'rgba(0,122,255,0.35)' : 'rgba(0,122,255,0.2)',
    description: "MUI v9 components styled with Apple's liquid glass design language — frosted translucent surfaces, vibrancy, and layered depth in both light and dark mode.",
    cta: 'Explore Glass version',
    bullets: ['Apple liquid glass', 'MUI v9 + custom theme', 'Frosted blur surfaces', 'Light & dark adaptive'],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [mode, toggleMode] = useStoredColorMode();
  const theme = useMemo(() => buildHomeTheme(mode), [mode]);
  const isDark = mode === 'dark';

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Keyed by section id
  const [anchors, setAnchors] = useState<Record<string, HTMLElement | null>>({ mui: null, tui: null, apple: null });

  const openMenu  = (id: string, el: HTMLElement) => setAnchors((p) => ({ ...p, [id]: el }));
  const closeMenu = (id: string) => setAnchors((p) => ({ ...p, [id]: null }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Same shell pattern as MuiShell: header | scroll (footer inside) | bottom nav — no fixed overlap */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden', bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.page }}>

        {/* ── Nav ── */}
        <Box
          component="header"
          sx={{
            flexShrink: 0,
            position: 'relative', zIndex: 50,
            bgcolor: isDark ? alpha(COLORS.neutral.bg.dark.page, 0.92) : alpha(COLORS.neutral.bg.light.surface, 0.92),
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 } }}>
            <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>

              {/* Logo */}
              <Typography
                sx={{ fontWeight: 700, fontSize: '1.0625rem', color: 'text.primary', letterSpacing: '-0.01em', flexShrink: 0 }}
              >
                NextJS Template
              </Typography>

              {/* Centre — section dropdowns (desktop only) */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                {navSections.map((section) => (
                  <Box key={section.id}>
                    <Button
                      id={`nav-${section.id}`}
                      aria-controls={anchors[section.id] ? `menu-${section.id}` : undefined}
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
                        '&:hover': { color: isDark ? section.accentLight : section.accentColor, bgcolor: 'action.hover' },
                      }}
                    >
                      {section.label}
                    </Button>

                    <Menu
                      id={`menu-${section.id}`}
                      anchorEl={anchors[section.id]}
                      open={Boolean(anchors[section.id])}
                      onClose={() => closeMenu(section.id)}
                      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                      slotProps={{
                        paper: {
                          elevation: isDark ? 4 : 2,
                          sx: {
                            mt: 0.75,
                            minWidth: 240,
                            borderRadius: '12px !important',
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface,
                            overflow: 'visible',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: -5,
                              left: 20,
                              width: 10,
                              height: 10,
                              bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface,
                              transform: 'rotate(45deg)',
                              borderTop: '1px solid',
                              borderLeft: '1px solid',
                              borderColor: 'divider',
                            },
                          },
                        },
                      }}
                    >
                      {/* Section heading */}
                      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                        <Typography
                          sx={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: isDark ? section.accentLight : section.accentColor,
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
                              mx: 1,
                              mb: 0.5,
                              borderRadius: 1.5,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              gap: 0.25,
                              py: 1.25,
                              px: 1.5,
                              '&:hover': { bgcolor: isDark ? alpha(section.accentColor, 0.1) : alpha(section.accentColor, 0.06) },
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

                      {/* Coming soon */}
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
                <Tooltip title={isDark ? 'Light mode' : 'Dark mode'} {...touchSafeTooltipProps}>
                  <IconButton
                    onClick={toggleMode}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                  >
                    {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>

                {/* Hamburger — mobile only */}
                <Tooltip title="Menu" {...touchSafeTooltipProps}>
                  <IconButton
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Open navigation menu"
                    sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.page,
          }}
        >

        {/* ── Hero ── */}
        <Box
          sx={{
            background: isDark
              ? 'linear-gradient(160deg, #1e1b4b 0%, #0f172a 60%)'
              : 'linear-gradient(160deg, #eef2ff 0%, #f0f9ff 50%, #fafafa 100%)',
            borderBottom: '1px solid',
            borderColor: 'divider',
            py: { xs: 10, sm: 16, lg: 20 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md" sx={{ px: { xs: 2, sm: 4 } }}>
            <Chip
              label="Base Template · Open Source"
              size="small"
              sx={{
                mb: 4, px: 1,
                bgcolor: isDark ? COLORS.secondary.bg.dark : COLORS.secondary.bg.light,
                color: isDark ? COLORS.secondary.light : COLORS.secondary.main,
                border: `1px solid ${isDark ? COLORS.secondary.border.dark : COLORS.secondary.border.light}`,
                fontWeight: 600,
                fontSize: '0.8125rem',
              }}
            />

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.75rem', lg: '5rem' },
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'text.primary',
                mb: 3,
              }}
            >
              NextJS Frontend{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>Starter</Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 520, mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 6,
              }}
            >
              A production-ready base template demonstrating Material UI, Tailwind CSS, and Apple
              Liquid Glass approaches — same concept, three paradigms.
            </Typography>

            {/* Pillar chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mb: 2 }}>
              {pillars.map((p) => (
                <Box
                  key={p.label}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 0.75,
                    px: 2, py: 0.75,
                    bgcolor: isDark ? alpha('#ffffff', 0.06) : 'white',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 99,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'text.secondary',
                    boxShadow: isDark ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                >
                  {p.icon}
                  {p.label}
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── Route cards ── */}
        <Box sx={{ bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.page }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 8, sm: 12 } }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '0.8125rem', fontWeight: 700, color: 'text.secondary',
              textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1,
            }}
          >
            Choose your approach
          </Typography>
          <Typography
            component="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontWeight: 800, letterSpacing: '-0.03em',
              color: 'text.primary', mb: 8,
            }}
          >
            Three flavors, one codebase
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {routeCards.map((r) => (
              <Box
                key={r.id}
                sx={{
                  bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface,
                  border: '1px solid',
                  borderColor: isDark ? COLORS.neutral.border.dark : COLORS.neutral.border.light,
                  borderRadius: 3,
                  p: 4,
                  display: 'flex', flexDirection: 'column', gap: 3,
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.2s, border-color 0.2s',
                  '&:hover': {
                    boxShadow: isDark
                      ? `0 0 0 1px ${alpha(r.color, 0.35)}`
                      : '0 4px 16px rgba(0,0,0,0.08)',
                    borderColor: r.border(isDark),
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'inline-flex', alignItems: 'center',
                      px: 1.5, py: 0.375,
                      bgcolor: r.bg(isDark),
                      border: `1px solid ${r.border(isDark)}`,
                      borderRadius: 1, mb: 2,
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '0.8125rem', fontWeight: 700,
                      color: isDark ? r.lightColor : r.color,
                    }}
                  >
                    {r.badge}
                  </Box>
                  <Typography sx={{ fontSize: '1.375rem', fontWeight: 700, color: 'text.primary', mb: 1 }}>
                    {r.label}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'text.secondary' }}>
                    {r.description}
                  </Typography>
                </Box>

                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {r.bullets.map((b) => (
                    <Box component="li" key={b} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: r.color, flexShrink: 0 }} />
                      {b}
                    </Box>
                  ))}
                </Box>

                <Button
                  component={Link}
                  href={r.href}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    mt: 'auto', alignSelf: 'flex-start',
                    bgcolor: r.color,
                    '&:hover': { bgcolor: r.color, opacity: 0.88 },
                    px: 3, py: 1.25, fontSize: '0.9375rem',
                  }}
                >
                  {r.cta}
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
        </Box>

        {/* ── Footer (theme-aware; sits in scroll area above bottom nav row) ── */}
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
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  color: isDark ? COLORS.neutral.text.dark.primary : COLORS.neutral.text.light.primary,
                }}
              >
                NextJS Template
              </Typography>

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
                /
              </Box>
            </Box>
          </Container>
        </Box>

        </Box>{/* end scroll */}

        {/* ── Mobile bottom bar (toolbar row — same flex slot as MuiShell, not fixed over content) ── */}
        <BottomNavigation
          value={0}
          showLabels
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexShrink: 0,
            height: 56,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.3)' : '0 -4px 20px rgba(0,0,0,0.06)',
            '& .MuiBottomNavigationAction-label': { fontSize: '0.625rem', fontWeight: 500 },
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

      </Box>{/* end shell */}

      {/* ── Mobile nav drawer (portaled — outside flex shell, same as MuiShell) ── */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        keepMounted={false}
        slotProps={{
          root: { keepMounted: false },
          paper: {
            sx: {
              width: 288,
              boxSizing: 'border-box',
              bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.surface,
              borderRight: '1px solid',
              borderColor: 'divider',
              display: { md: 'none' },
            },
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary', letterSpacing: '-0.01em' }}>
            NextJS Template
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            aria-label="Close menu"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
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
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
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
                        mx: 1,
                        borderRadius: 1.5,
                        mb: 0.5,
                        py: 1,
                        '&:hover': { bgcolor: isDark ? alpha(section.accentColor, 0.1) : alpha(section.accentColor, 0.06) },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <ItemIcon sx={{ fontSize: 16, color: isDark ? section.accentLight : section.accentColor }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        secondary={item.desc}
                        slotProps={{
                          primary: { style: { fontSize: '0.9375rem', fontWeight: 600 } },
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

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <IconButton
            onClick={toggleMode}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
          <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            {isDark ? 'Light mode' : 'Dark mode'}
          </Typography>
        </Box>
      </Drawer>

    </ThemeProvider>
  );
}
