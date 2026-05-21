'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CampaignIcon from '@mui/icons-material/Campaign';
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import TvIcon from '@mui/icons-material/Tv';
import { NAV_SECTIONS, USER_NAV } from '@/lib/nav';
import { touchSafeTooltipProps } from '@/lib/mui-touch-tooltip';

// ─── constants ────────────────────────────────────────────────────────────────

const SIDEBAR_W = 280;
const LOGO_LIGHT = 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600';
const LOGO_DARK  = 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500';
const USER_IMG   = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

// Maps every route href → its sidebar icon
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
  '/ads':                  TvIcon,
};

const navSections = NAV_SECTIONS.map((s) => ({
  ...s,
  items: s.items.map((item) => ({ ...item, icon: ITEM_ICON_MAP[item.href] ?? HomeIcon })),
}));

// ─── Sidebar (proper component — avoids reusing the same JSX object in two
//     positions of the tree, which React 19 can mis-reconcile) ─────────────────

interface SidebarProps {
  isDark: boolean;
  /** Pass onClose + showClose only inside the mobile drawer */
  onClose?: () => void;
  showClose?: boolean;
}

function Sidebar({ isDark, onClose, showClose = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Box
      sx={(t) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        px: 2,
        pb: 3,
        ...(t.palette.mode === 'dark' && { backgroundImage: 'none' }),
      })}
    >
      {/* ── Logo row ── */}
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          px: 1,
        }}
      >
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Box
            component="img"
            src={isDark ? LOGO_DARK : LOGO_LIGHT}
            alt="Mission Control"
            sx={{ height: 28, width: 'auto' }}
          />
          <Typography
            sx={{ fontWeight: 700, fontSize: '0.9375rem', color: 'text.primary', letterSpacing: '-0.01em' }}
          >
            Mission Control
          </Typography>
        </Link>

        {showClose && (
          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Close menu"
            sx={{ color: 'text.secondary', ml: 1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {/* ── Nav sections ── */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {navSections.map((section, idx) => (
          <Box key={section.id}>
            <Typography
              sx={{
                px: 1.5,
                pt: idx === 0 ? 0.5 : 2,
                pb: 0.5,
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'text.disabled',
              }}
            >
              {section.heading}
            </Typography>

            <List dense disablePadding>
              {section.items.map((item) => {
                const active = pathname === item.href;
                const ItemIcon = item.icon;
                return (
                  <ListItemButton
                    key={item.href}
                    component="a"
                    href={item.href}
                    selected={active}
                    onClick={onClose}
                    sx={(t) => ({
                      borderRadius: 1.5,
                      mx: 0.5,
                      mb: 0.25,
                      py: 0.75,
                      '&.Mui-selected': {
                        bgcolor: t.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(79,70,229,0.08)',
                        '&:hover': {
                          bgcolor: t.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.12)'
                            : 'rgba(79,70,229,0.12)',
                        },
                      },
                    })}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <ItemIcon
                        sx={{
                          fontSize: 17,
                          color: active ? 'primary.main' : 'text.disabled',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          style: {
                            fontSize: '0.875rem',
                            fontWeight: active ? 700 : 500,
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>

            {idx < navSections.length - 1 && <Divider sx={{ mt: 1.5, mb: 0.5 }} />}
          </Box>
        ))}
      </Box>

      {/* ── Settings ── */}
      <Divider sx={{ mb: 1.5 }} />
      <Box
        component="a"
        href="#"
        sx={(t) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderRadius: 1.5,
          px: 1.5,
          py: 0.875,
          fontSize: '0.875rem',
          fontWeight: 600,
          lineHeight: 1.5,
          textDecoration: 'none',
          color: t.palette.mode === 'dark' ? '#9ca3af' : '#374151',
          transition: 'background-color 0.15s, color 0.15s',
          '&:hover': {
            bgcolor: t.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            color: t.palette.mode === 'dark' ? '#ffffff' : '#4f46e5',
          },
        })}
      >
        <SettingsIcon sx={{ fontSize: 18, flexShrink: 0, color: 'text.disabled' }} />
        Settings
      </Box>
    </Box>
  );
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [mode, setMode]                   = useState<'light' | 'dark'>('light');
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const theme  = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  const isDark = mode === 'dark';

  // Keep CSS custom-property tokens in sync with MUI theme
  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', mode);
  }, [mode]);

  const openDrawer  = useCallback(() => setDrawerOpen(true),  []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleMode  = useCallback(() => setMode((m) => (m === 'light' ? 'dark' : 'light')), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: 'flex', minHeight: '100vh' }}>

        {/* ── Mobile drawer ────────────────────────────────────────────────────
            keepMounted={false} is explicit: the MUI v9 Modal must be fully
            unmounted when closed, otherwise an invisible fixed overlay with
            pointer-events remains in the DOM and swallows all subsequent taps.
        ── */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={closeDrawer}
          keepMounted={false}
          slotProps={{ root: { keepMounted: false } }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { width: SIDEBAR_W, boxSizing: 'border-box' },
          }}
        >
          <Sidebar isDark={isDark} onClose={closeDrawer} showClose />
        </Drawer>

        {/* ── Desktop sidebar ── */}
        <Box
          component="aside"
          sx={{
            display:       { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            position:      'fixed',
            top: 0, left: 0, bottom: 0,
            width:   SIDEBAR_W,
            zIndex:  (t) => t.zIndex.appBar - 1,
          }}
        >
          <Sidebar isDark={isDark} />
        </Box>

        {/* ── Main column ── */}
        <Box
          sx={{
            flex:          1,
            minWidth:      0,
            display:       'flex',
            flexDirection: 'column',
            pl:            { xs: 0, lg: `${SIDEBAR_W}px` },
          }}
        >
          {/* ── Sticky nav bar ── */}
          <Box
            component="header"
            sx={(t) => ({
              position:    'sticky',
              top:         0,
              zIndex:      t.zIndex.appBar,
              height:      64,
              flexShrink:  0,
              display:     'flex',
              alignItems:  'center',
              gap:         { xs: 1, sm: 2 },
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor:     'background.paper',
              px:          { xs: 2, sm: 3, lg: 4 },
              boxShadow:   t.palette.mode === 'light' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            })}
          >
            {/* Hamburger — mobile only */}
            <Tooltip title="Open menu" {...touchSafeTooltipProps}>
              <IconButton
                onClick={openDrawer}
                aria-label="Open navigation menu"
                sx={{
                  display: { lg: 'none' },
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>

            {/* Mobile visual separator */}
            <Box
              aria-hidden
              sx={{
                display:    { xs: 'block', lg: 'none' },
                width:      '1px',
                height:     24,
                bgcolor:    'divider',
                flexShrink: 0,
              }}
            />

            {/* Search */}
            <Box
              component="form"
              onSubmit={(e: React.FormEvent) => e.preventDefault()}
              sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}
            >
              <SearchIcon sx={{ fontSize: 18, color: 'text.disabled', flexShrink: 0 }} />
              <InputBase
                name="search"
                placeholder="Search…"
                slotProps={{ input: { 'aria-label': 'Search' } }}
                sx={{ flex: 1, minWidth: 0, fontSize: '0.875rem', color: 'text.primary' }}
              />
            </Box>

            {/* Right-side actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>

              {/* Theme toggle */}
              <Tooltip title={isDark ? 'Light mode' : 'Dark mode'} {...touchSafeTooltipProps}>
                <IconButton
                  onClick={toggleMode}
                  size="small"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                  }}
                >
                  {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </IconButton>
              </Tooltip>

              {/* Notifications */}
              <Tooltip title="Notifications" {...touchSafeTooltipProps}>
                <IconButton
                  size="small"
                  aria-label="Notifications"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                  }}
                >
                  <NotificationsNoneIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Desktop separator */}
              <Box
                aria-hidden
                sx={{
                  display:    { xs: 'none', lg: 'block' },
                  width:      '1px',
                  height:     24,
                  bgcolor:    'divider',
                  mx:         0.5,
                  flexShrink: 0,
                }}
              />

              {/* Profile button */}
              <Tooltip title="Your account" {...touchSafeTooltipProps}>
                <IconButton
                  onClick={(e) => setProfileAnchor(e.currentTarget)}
                  aria-label="Open account menu"
                  aria-haspopup="true"
                  aria-expanded={Boolean(profileAnchor)}
                  sx={{
                    p:           0.5,
                    borderRadius: 1.5,
                    display:     'flex',
                    alignItems:  'center',
                    gap:         0.75,
                  }}
                >
                  <Avatar src={USER_IMG} alt="Tom Cook" sx={{ width: 32, height: 32 }} />
                  <Box
                    component="span"
                    sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.25 }}
                  >
                    <Typography
                      component="span"
                      sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.5 }}
                    >
                      Tom Cook
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  </Box>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={() => setProfileAnchor(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                  paper: {
                    elevation: 2,
                    sx: {
                      mt:          1,
                      minWidth:    152,
                      borderRadius: 1.5,
                      border:      '1px solid',
                      borderColor: 'divider',
                    },
                  },
                }}
              >
                {USER_NAV.map((item) => (
                  <MenuItem
                    key={item.name}
                    component="a"
                    href={item.href}
                    onClick={() => setProfileAnchor(null)}
                    sx={{ fontSize: '0.875rem', py: 1 }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>

            </Box>
          </Box>

          {/* ── Page content ── */}
          <Box
            component="main"
            sx={{
              flex:    1,
              py:      5,
              px:      { xs: 2, sm: 3, lg: 4 },
              bgcolor: 'background.default',
            }}
          >
            {children}
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
