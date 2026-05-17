'use client';

import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewIcon from '@mui/icons-material/GridView';

import registry from '@/components/registry';
import type { ComponentEntry } from '@/components/registry';

// ─── constants ────────────────────────────────────────────────────────────────

const SIDEBAR_W = 288;

const LOGO_LIGHT = 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600';
const LOGO_DARK  = 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500';
const USER_IMG   = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const userNav = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

// ─── AppShell ─────────────────────────────────────────────────────────────────

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  const isDark = mode === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', mode);
  }, [mode]);

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  // ─── sidebar content (shared between mobile drawer + desktop) ───────────────

  const sidebarContent = (
    <Box
      sx={(t) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 5,
        overflowY: 'auto',
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        px: 3,
        pb: 2,
        ...(t.palette.mode === 'dark' && {
          backgroundImage: 'none',
          boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.1)',
          border: 'none',
        }),
      })}
    >
      {/* Logo */}
      <Box sx={{ height: 64, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Box
          component="img"
          src={isDark ? LOGO_DARK : LOGO_LIGHT}
          alt="Component Showcase"
          sx={{ height: 32, width: 'auto' }}
        />
      </Box>

      {/* Navigation */}
      <Box component="nav" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          component="ul"
          role="list"
          sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7, listStyle: 'none', p: 0, m: 0 }}
        >
          <Box component="li">
            <Box
              component="ul"
              role="list"
              sx={{ mx: -1, display: 'flex', flexDirection: 'column', gap: 0.5, listStyle: 'none', p: 0, m: 0 }}
            >
              {registry.map((item) => (
                <Box component="li" key={item.slug}>
                  <Box
                    component="a"
                    href={`#${item.slug}`}
                    onClick={() => setMobileOpen(false)}
                    sx={(t) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      borderRadius: 1,
                      px: 1,
                      py: 0.75,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem',
                      textDecoration: 'none',
                      color: t.palette.mode === 'dark' ? '#9ca3af' : '#374151',
                      '&:hover': {
                        bgcolor: t.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f9fafb',
                        color: t.palette.mode === 'dark' ? '#ffffff' : '#4f46e5',
                        '& .nav-icon': { color: t.palette.mode === 'dark' ? '#ffffff' : '#4f46e5' },
                      },
                    })}
                  >
                    <GridViewIcon
                      className="nav-icon"
                      sx={(t) => ({
                        fontSize: 20,
                        flexShrink: 0,
                        color: t.palette.mode === 'dark' ? '#6b7280' : '#9ca3af',
                      })}
                    />
                    {item.name}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Settings */}
          <Box component="li" sx={{ mt: 'auto' }}>
            <Box
              component="a"
              href="#"
              sx={(t) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mx: -1,
                borderRadius: 1,
                px: 1,
                py: 0.75,
                fontSize: '0.875rem',
                fontWeight: 600,
                lineHeight: '1.5rem',
                textDecoration: 'none',
                color: t.palette.mode === 'dark' ? '#d1d5db' : '#374151',
                '&:hover': {
                  bgcolor: t.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f9fafb',
                  color: t.palette.mode === 'dark' ? '#ffffff' : '#4f46e5',
                },
              })}
            >
              <SettingsIcon
                sx={(t) => ({
                  fontSize: 24,
                  flexShrink: 0,
                  color: t.palette.mode === 'dark' ? '#6b7280' : '#9ca3af',
                })}
              />
              Settings
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        {/* ── Mobile drawer ── */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            zIndex: 50,
            '& .MuiDrawer-paper': {
              width: SIDEBAR_W,
              boxSizing: 'border-box',
              overflow: 'visible',
            },
          }}
        >
          {/* Close button (floats outside the drawer panel) */}
          <Box
            sx={{
              position: 'absolute',
              left: '100%',
              top: 0,
              width: 64,
              display: 'flex',
              justifyContent: 'center',
              pt: 1.5,
            }}
          >
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'white', p: 1.25 }} aria-label="Close sidebar">
              <CloseIcon />
            </IconButton>
          </Box>
          {sidebarContent}
        </Drawer>

        {/* ── Desktop sidebar ── */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            position: 'fixed',
            inset: '0 auto 0 0',
            width: SIDEBAR_W,
            zIndex: 50,
          }}
        >
          {sidebarContent}
        </Box>

        {/* ── Main area ── */}
        <Box sx={{ pl: { xs: 0, lg: `${SIDEBAR_W}px` } }}>
          {/* Sticky header */}
          <Box
            component="header"
            sx={(t) => ({
              position: 'sticky',
              top: 0,
              zIndex: 40,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 2, sm: 3 },
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              px: { xs: 2, sm: 3, lg: 4 },
              boxShadow: t.palette.mode === 'light' ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none',
            })}
          >
            {/* Mobile hamburger */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={(t) => ({
                display: { lg: 'none' },
                color: t.palette.mode === 'dark' ? '#9ca3af' : '#374151',
                '&:hover': { color: t.palette.mode === 'dark' ? '#ffffff' : '#111827' },
                p: 1.25,
              })}
              aria-label="Open sidebar"
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile separator */}
            <Box
              aria-hidden="true"
              sx={{ width: 1, height: 24, bgcolor: 'divider', display: { xs: 'block', lg: 'none' } }}
            />

            {/* Search */}
            <Box
              component="form"
              action="#"
              method="GET"
              sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', alignItems: 'center' }}
            >
              <InputBase
                name="search"
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search' }}
                sx={(t) => ({
                  gridColumn: '1 / -1',
                  gridRow: '1 / -1',
                  pl: 4,
                  fontSize: { xs: '1rem', sm: '0.875rem' },
                  color: t.palette.mode === 'dark' ? '#ffffff' : '#111827',
                  '& .MuiInputBase-input::placeholder': {
                    color: t.palette.mode === 'dark' ? '#6b7280' : '#9ca3af',
                    opacity: 1,
                  },
                })}
              />
              <SearchIcon
                aria-hidden="true"
                sx={(t) => ({
                  pointerEvents: 'none',
                  gridColumn: '1 / -1',
                  gridRow: '1 / -1',
                  fontSize: 20,
                  alignSelf: 'center',
                  color: t.palette.mode === 'dark' ? '#6b7280' : '#9ca3af',
                })}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 } }}>
              {/* Mode toggle */}
              <IconButton
                onClick={toggleMode}
                size="small"
                aria-label="Toggle colour mode"
                sx={(t) => ({
                  color: t.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                  '&:hover': { color: t.palette.mode === 'dark' ? '#ffffff' : '#111827' },
                })}
              >
                {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>

              {/* Bell */}
              <IconButton
                size="small"
                aria-label="View notifications"
                sx={(t) => ({
                  color: t.palette.mode === 'dark' ? '#9ca3af' : '#9ca3af',
                  '&:hover': { color: t.palette.mode === 'dark' ? '#ffffff' : '#6b7280' },
                  p: 1.25,
                })}
              >
                <NotificationsNoneIcon sx={{ fontSize: 24 }} />
              </IconButton>

              {/* Desktop separator */}
              <Box
                aria-hidden="true"
                sx={{ display: { xs: 'none', lg: 'block' }, width: 1, height: 24, bgcolor: 'divider' }}
              />

              {/* Profile dropdown */}
              <Box>
                <IconButton
                  onClick={(e) => setProfileAnchor(e.currentTarget)}
                  sx={{ p: 0, display: 'flex', alignItems: 'center', gap: 1 }}
                  aria-label="Open user menu"
                >
                  <Avatar src={USER_IMG} alt="" sx={{ width: 32, height: 32 }} />
                  <Box
                    component="span"
                    aria-hidden="true"
                    sx={(t) => ({
                      display: { xs: 'none', lg: 'block' },
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem',
                      color: t.palette.mode === 'dark' ? '#ffffff' : '#111827',
                    })}
                  >
                    Tom Cook
                  </Box>
                  <KeyboardArrowDownIcon
                    aria-hidden="true"
                    sx={(t) => ({
                      display: { xs: 'none', lg: 'block' },
                      fontSize: 20,
                      color: t.palette.mode === 'dark' ? '#6b7280' : '#9ca3af',
                    })}
                  />
                </IconButton>

                <Menu
                  anchorEl={profileAnchor}
                  open={Boolean(profileAnchor)}
                  onClose={() => setProfileAnchor(null)}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  slotProps={{
                    paper: {
                      sx: (t) => ({
                        mt: 1.25,
                        width: 128,
                        borderRadius: 1,
                        bgcolor: t.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                        boxShadow: t.palette.mode === 'dark'
                          ? 'none'
                          : '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1)',
                        border: '1px solid',
                        borderColor: t.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.05)',
                      }),
                    },
                  }}
                >
                  {userNav.map((item) => (
                    <MenuItem
                      key={item.name}
                      component="a"
                      href={item.href}
                      onClick={() => setProfileAnchor(null)}
                      sx={(t) => ({
                        fontSize: '0.875rem',
                        lineHeight: '1.5rem',
                        color: t.palette.mode === 'dark' ? '#ffffff' : '#111827',
                        '&:hover': {
                          bgcolor: t.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f9fafb',
                        },
                      })}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Box>

          {/* Content */}
          <Box component="main" sx={{ py: 5, px: { xs: 2, sm: 3, lg: 4 }, bgcolor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
            {registry.map((c) => (
              <Section key={c.slug} entry={c} />
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({ entry }: { entry: ComponentEntry }) {
  const { name, slug, description, Preview } = entry;
  return (
    <Box id={slug} component="section" sx={{ mb: 7 }}>
      <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, letterSpacing: '-0.02em', color: 'text.primary' }}
        >
          {name}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '10px',
          p: 4,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          minHeight: 120,
        }}
      >
        <Preview />
      </Box>
    </Box>
  );
}
