'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ProfileMenu from './ProfileMenu';
import { navItems, userNavItems, user, LOGO_SRC } from './shared';

// Two-row layout: header row (logo | abs-centered search | bell+avatar) +
// secondary nav row below a divider (lg+ only).
export default function NavbarWithCenteredSearch() {
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
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 1, sm: 2, lg: 4 } }}>
        {/* ── Row 1: h-16 ── */}
        <Box sx={{ position: 'relative', display: 'flex', height: 64, justifyContent: 'space-between' }}>
          {/* Logo — z-10 so it sits above the absolutely-positioned search */}
          <Box
            sx={{
              position: 'relative', zIndex: 10,
              display: 'flex', alignItems: 'center',
              px: { xs: 1, lg: 0 },
            }}
          >
            <Box
              component="img"
              src={dark ? LOGO_SRC : 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'}
              alt="Your Company"
              sx={{ height: 32, width: 'auto' }}
            />
          </Box>

          {/* Search — z-0, fills row absolutely on sm+ so it's visually centered */}
          <Box
            sx={{
              position: { xs: 'relative', sm: 'absolute' },
              top: { sm: 0 }, left: { sm: 0 }, right: { sm: 0 }, bottom: { sm: 0 },
              zIndex: 0,
              display: 'flex',
              flex: { xs: 1, sm: 'none' },
              alignItems: 'center',
              justifyContent: 'center',
              px: 1,
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', maxWidth: { sm: 256 } }}>
              <SearchIcon
                sx={{
                  position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                  color: 'text.disabled', fontSize: 20, pointerEvents: 'none',
                }}
              />
              <InputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search', name: 'search' }}
                sx={{
                  width: '100%',
                  bgcolor: dark ? 'action.hover' : 'background.paper',
                  borderRadius: 1,
                  pl: '36px', pr: 1.5, py: '6px',
                  color: 'text.primary',
                  fontSize: '0.875rem',
                  outline: '1px solid',
                  outlineColor: 'divider',
                  outlineOffset: -1,
                  '& input::placeholder': { color: 'text.disabled' },
                  '&:focus-within': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -2 },
                }}
              />
            </Box>
          </Box>

          {/* Right — z-10: hamburger (lg:hidden) + bell/avatar (hidden lg:flex) */}
          <Box sx={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
              <IconButton
                onClick={() => setMobileOpen((o) => !o)}
                sx={{ color: 'text.disabled', borderRadius: 1, '&:hover': { bgcolor: 'action.hover', color: 'text.secondary' } }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1, ml: 2 }}>
              <IconButton size="small" sx={{ color: 'text.disabled', borderRadius: '50%', '&:hover': { color: 'text.secondary' } }}>
                <NotificationsNoneIcon fontSize="small" />
              </IconButton>

              <IconButton size="small" onClick={(e) => setProfileAnchor(e.currentTarget)} sx={{ p: 0, ml: 0.5 }}>
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
          </Box>
        </Box>

        {/* ── Row 2: secondary nav (lg+ only), divided by a line ── */}
        <Box
          component="nav"
          aria-label="Global"
          sx={{
            display: { xs: 'none', lg: 'flex' },
            gap: 0.5, py: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {navItems.map((item) => (
            <Box
              key={item.name}
              component="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              sx={{
                display: 'inline-flex', alignItems: 'center', borderRadius: 1, px: 1.5, py: 1,
                fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none',
                color: item.current ? 'text.primary' : 'text.secondary',
                bgcolor: item.current ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              {item.name}
            </Box>
          ))}
        </Box>
      </Container>

      {/* Mobile panel */}
      <Collapse in={mobileOpen}>
        <Box component="nav" aria-label="Global" sx={{ display: { lg: 'none' } }}>
          <Box sx={{ px: 1, pt: 1, pb: 1.5 }}>
            {navItems.map((item) => (
              <Box
                key={item.name}
                component="a"
                href={item.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  display: 'block', borderRadius: 1, px: 1.5, py: 1,
                  fontSize: '1rem', fontWeight: 500, textDecoration: 'none',
                  color: item.current ? 'text.primary' : 'text.secondary',
                  bgcolor: item.current ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
                }}
              >
                {item.name}
              </Box>
            ))}
          </Box>

          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2, pb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
              <Avatar
                src={user.imageUrl}
                sx={{
                  width: 40, height: 40, flexShrink: 0,
                  bgcolor: 'action.selected',
                  outline: '1px solid',
                  outlineColor: 'divider',
                  outlineOffset: -1,
                }}
              />
              <Box sx={{ ml: 1.5 }}>
                <Typography sx={{ fontWeight: 500, color: 'text.primary', fontSize: '1rem', lineHeight: 1.4 }}>
                  {user.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.4 }}>
                  {user.email}
                </Typography>
              </Box>
              <IconButton size="small" sx={{ ml: 'auto', color: 'text.disabled', borderRadius: '50%', '&:hover': { color: 'text.secondary' } }}>
                <NotificationsNoneIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ mt: 1.5, px: 1 }}>
              {userNavItems.map((item) => (
                <Box
                  key={item.name}
                  component="a"
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    display: 'block', borderRadius: 1, px: 1.5, py: 1,
                    fontSize: '1rem', fontWeight: 500, textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
                  }}
                >
                  {item.name}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Collapse>
    </AppBar>
  );
}
