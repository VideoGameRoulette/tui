'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TableChartIcon from '@mui/icons-material/TableChart';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import TailwindLogoIcon from '@/components/icons/TailwindLogoIcon';
import AppleLogoIcon from '@/components/icons/AppleLogoIcon';
import { buildMuiPageTheme, COLORS } from '@/lib/theme';

// ─── Nav data ────────────────────────────────────────────────────────────────

const navSections = [
  {
    id: 'mui',
    label: 'MUI',
    heading: 'Material UI',
    accentColor: COLORS.secondary.main,
    accentLight: COLORS.secondary.light,
    items: [
      { label: 'Home',      href: '/mui',               desc: 'Landing page with Tailwind-inspired MUI theme',                      icon: HomeIcon       },
      { label: 'Data Grid', href: '/mui/demo/datagrid', desc: 'Premium DataGrid with sorting, filtering, grouping and CSV/XLS export', icon: TableChartIcon },
    ],
  },
  {
    id: 'tui',
    label: 'Tailwind',
    heading: 'Tailwind CSS',
    accentColor: COLORS.primary.main,
    accentLight: COLORS.primary.light,
    items: [
      { label: 'Home', href: '/tui', desc: 'Landing page built with pure Tailwind v4 utility classes', icon: HomeIcon },
    ],
  },
  {
    id: 'apple',
    label: 'Glass',
    heading: 'Apple Liquid Glass',
    accentColor: '#007AFF',
    accentLight: '#409CFF',
    items: [
      { label: 'Home', href: '/apple', desc: 'Apple-inspired liquid glass design system with MUI v9', icon: HomeIcon },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface MuiShellProps {
  colorMode: 'light' | 'dark';
  onToggleMode: () => void;
  children: React.ReactNode;
  bottomNavValue?: number;
}

export default function MuiShell({ colorMode, onToggleMode, children, bottomNavValue = 1 }: MuiShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchors, setAnchors]       = useState<Record<string, HTMLElement | null>>({ mui: null, tui: null, apple: null });

  const theme  = buildMuiPageTheme(colorMode);
  const isDark = colorMode === 'dark';

  const openMenu  = (id: string, el: HTMLElement) => setAnchors((p) => ({ ...p, [id]: el }));
  const closeMenu = (id: string) => setAnchors((p) => ({ ...p, [id]: null }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ── Fixed header ── */}
      <Box
        component="header"
        sx={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.surface,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 } }}>
          <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>

            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MuiLogoIcon sx={{ fontSize: 18, color: 'white' }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: 'text.primary', letterSpacing: '-0.01em' }}>
                Material UI
              </Typography>
            </Box>

            {/* Centre — dropdown nav (desktop) */}
            <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navSections.map((section) => (
                <Box key={section.id}>
                  <Button
                    id={`nav-msh-${section.id}`}
                    aria-controls={anchors[section.id] ? `menu-msh-${section.id}` : undefined}
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
                    id={`menu-msh-${section.id}`}
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

            {/* Right side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              <IconButton
                onClick={onToggleMode}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
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

      {/* ── Mobile nav drawer ── */}
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
              boxSizing: 'border-box',
              bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.surface,
            },
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            height: 60,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MuiLogoIcon sx={{ fontSize: 16, color: 'white' }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>Material UI</Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} size="small" aria-label="Close menu" sx={{ color: 'text.secondary' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Drawer nav sections */}
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

        {/* Drawer footer — theme toggle */}
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            onClick={() => { onToggleMode(); setDrawerOpen(false); }}
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

      {/* ── Page content ── */}
      <Box
        sx={{
          minHeight: '100vh',
          pt: '60px',
          pb: { xs: '56px', md: 0 },
          bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.page,
        }}
      >
        {children}
      </Box>

      {/* ── Mobile bottom navigation ── */}
      <BottomNavigation
        value={bottomNavValue}
        showLabels
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200,
          height: 56, borderTop: '1px solid', borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.3)' : '0 -4px 20px rgba(0,0,0,0.06)',
        }}
      >
        <BottomNavigationAction label="Home"     icon={<HomeIcon />}         component={Link} href="/"      />
        <BottomNavigationAction label="MUI"      icon={<MuiLogoIcon />}      component={Link} href="/mui"   />
        <BottomNavigationAction label="Tailwind" icon={<TailwindLogoIcon />} component={Link} href="/tui"   />
        <BottomNavigationAction label="Glass"    icon={<AppleLogoIcon />}    component={Link} href="/apple" />
      </BottomNavigation>
    </ThemeProvider>
  );
}
