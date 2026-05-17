'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ProfileMenu from './ProfileMenu';
import { navItems, user, LOGO_SRC } from './shared';

// Hamburger sits absolute-left on mobile, logo is centered on mobile then left-aligned on sm+.
// Bell + avatar are absolute-right on mobile, static on sm+.
export default function NavbarWithMenuButton() {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="static"
      elevation={dark ? 0 : 1}
      sx={{
        bgcolor: 'background.paper',
        boxShadow: dark ? 'none' : '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 1, sm: 3, lg: 4 } }}>
        <Toolbar disableGutters sx={{ height: 64, position: 'relative', justifyContent: 'space-between' }}>
          {/* Mobile: hamburger — absolute left */}
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => setMobileOpen((o) => !o)}
              sx={{
                color: 'text.disabled',
                borderRadius: 1,
                p: '6px',
                '&:hover': { bgcolor: 'action.hover', color: 'text.secondary' },
              }}
            >
              {mobileOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
            </IconButton>
          </Box>

          {/* Logo + desktop nav — centered on mobile, left on sm+ */}
          <Box sx={{ display: 'flex', flex: 1, alignItems: 'stretch', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <Box
                component="img"
                src={dark ? LOGO_SRC : 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'}
                alt="Your Company"
                sx={{ height: 32, width: 'auto' }}
              />
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 3, gap: dark ? 0.5 : 2, alignItems: 'stretch' }}>
              {navItems.map((item) => (
                dark ? (
                  <Button
                    key={item.name}
                    href={item.href}
                    size="small"
                    sx={{
                      color: item.current ? 'text.primary' : 'text.secondary',
                      bgcolor: item.current ? 'action.selected' : 'transparent',
                      borderRadius: 1,
                      px: 1.5,
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      textTransform: 'none',
                      minWidth: 0,
                      '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
                    }}
                  >
                    {item.name}
                  </Button>
                ) : (
                  <Box
                    key={item.name}
                    component="a"
                    href={item.href}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 0.5,
                      pt: '2px',
                      borderBottom: '2px solid',
                      borderColor: item.current ? 'primary.main' : 'transparent',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: item.current ? 'text.primary' : 'text.secondary',
                      transition: 'border-color 0.15s, color 0.15s',
                      '&:hover': { borderColor: item.current ? 'primary.main' : 'divider', color: 'text.primary' },
                    }}
                  >
                    {item.name}
                  </Box>
                )
              ))}
            </Box>
          </Box>

          {/* Bell + avatar — absolute right on mobile, static on sm+ */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              position: { xs: 'absolute', sm: 'static' },
              right: { xs: 0, sm: 'auto' },
            }}
          >
            <IconButton size="small" sx={{ color: 'text.disabled', borderRadius: '50%', '&:hover': { color: 'text.secondary' } }}>
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>

            <IconButton size="small" onClick={(e) => setProfileAnchor(e.currentTarget)} sx={{ p: 0 }}>
              <Avatar
                src={user.imageUrl}
                sx={{
                  width: 32, height: 32,
                  bgcolor: 'action.selected',
                  outline: '1px solid',
                  outlineColor: 'divider',
                  outlineOffset: -1,
                }}
              />
            </IconButton>

            <ProfileMenu anchorEl={profileAnchor} onClose={() => setProfileAnchor(null)} />
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile panel */}
      <Collapse in={mobileOpen}>
        <Box sx={{ display: { sm: 'none' }, px: dark ? 1 : 0, pt: 1, pb: 1.5 }}>
          {navItems.map((item) => (
            <Box
              key={item.name}
              component="a"
              href={item.href}
              onClick={() => setMobileOpen(false)}
              sx={dark ? {
                display: 'block',
                borderRadius: 1,
                px: 1.5, py: 1,
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
                color: item.current ? 'text.primary' : 'text.secondary',
                bgcolor: item.current ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              } : {
                display: 'block',
                borderLeft: '4px solid',
                borderColor: item.current ? 'primary.main' : 'transparent',
                bgcolor: item.current ? 'primary.50' : 'transparent',
                py: 1,
                pl: '12px',
                pr: 2,
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
                color: item.current ? 'primary.dark' : 'text.secondary',
                '&:hover': {
                  borderColor: item.current ? 'primary.main' : 'divider',
                  bgcolor: item.current ? 'primary.50' : 'action.hover',
                  color: 'text.primary',
                },
              }}
            >
              {item.name}
            </Box>
          ))}
        </Box>
      </Collapse>
    </AppBar>
  );
}
