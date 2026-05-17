'use client';

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
import { userNavItems } from './shared';

// xl: 12-col grid: [logo col-2] [search col-6] [bell+avatar+CTA col-4]
// Uses its own user/nav data since Tailwind's example has a different persona.

const colLayoutNav = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
  { name: 'Directory', href: '#', current: false },
];

const colUser = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export default function NavbarWithSearchColumnLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: 'background.paper',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box
          sx={{
            position: 'relative',
            display: { xs: 'flex', xl: 'grid' },
            gridTemplateColumns: { xl: 'repeat(12, 1fr)' },
            justifyContent: 'space-between',
            gap: { lg: 2, xl: 0 },
            minHeight: 64,
          }}
        >
          {/* Logo — md:absolute left-0, lg:static, xl:col-span-2 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              gridColumn: { xl: 'span 2' },
              position: { md: 'absolute', lg: 'static' },
              top: { md: 0 }, bottom: { md: 0 }, left: { md: 0 },
              zIndex: { md: 10, lg: 'auto' },
            }}
          >
            <Box component="a" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
                sx={{ height: 32, width: 'auto' }}
              />
            </Box>
          </Box>

          {/* Search — flex:1, xl:col-span-6
              md px-8 creates clearance for the abs-positioned logo + hamburger */}
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              gridColumn: { xl: 'span 6' },
              px: { md: 4, lg: 0 },
              py: '14px',
            }}
          >
            <Box sx={{ position: 'relative', width: '100%' }}>
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
                  bgcolor: 'background.paper',
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

          {/* Mobile hamburger — md:absolute right-0, hidden at lg */}
          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              alignItems: 'center',
              position: { md: 'absolute', lg: 'static' },
              top: { md: 0 }, bottom: { md: 0 }, right: { md: 0 },
              zIndex: { md: 10 },
              mx: -1,
            }}
          >
            <IconButton
              onClick={() => setMobileOpen((o) => !o)}
              sx={{ color: 'text.disabled', borderRadius: 1, '&:hover': { bgcolor: 'action.hover', color: 'text.secondary' } }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          {/* Desktop actions — lg:flex, xl:col-span-4 */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              justifyContent: 'flex-end',
              gridColumn: { xl: 'span 4' },
              gap: 0.5,
            }}
          >
            <IconButton size="small" sx={{ color: 'text.disabled', borderRadius: '50%', ml: 1, '&:hover': { color: 'text.secondary' } }}>
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={(e) => setProfileAnchor(e.currentTarget)} sx={{ p: 0, ml: 1 }}>
              <Avatar
                src={colUser.imageUrl}
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
            <Button
              variant="contained"
              size="small"
              disableElevation
              href="#"
              sx={{
                ml: 1.5,
                bgcolor: 'primary.main',
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                '&:hover': { bgcolor: 'primary.light' },
              }}
            >
              New Project
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Mobile panel */}
      <Collapse in={mobileOpen}>
        <Box component="nav" aria-label="Global" sx={{ display: { lg: 'none' } }}>
          <Box sx={{ mx: 'auto', maxWidth: 768, px: { xs: 1, sm: 2 }, pt: 1, pb: 1.5 }}>
            {colLayoutNav.map((item) => (
              <Box
                key={item.name}
                component="a"
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={item.current ? 'page' : undefined}
                sx={{
                  display: 'block', borderRadius: 1, px: 1.5, py: 1,
                  fontSize: '1rem', fontWeight: 500, textDecoration: 'none',
                  color: 'text.primary',
                  bgcolor: item.current ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                {item.name}
              </Box>
            ))}
          </Box>

          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2, pb: 1.5 }}>
            <Box sx={{ mx: 'auto', maxWidth: 768, display: 'flex', alignItems: 'center', px: { xs: 2, sm: 3 } }}>
              <Avatar
                src={colUser.imageUrl}
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
                  {colUser.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.4 }}>
                  {colUser.email}
                </Typography>
              </Box>
              <IconButton size="small" sx={{ ml: 'auto', color: 'text.disabled', borderRadius: '50%', '&:hover': { color: 'text.secondary' } }}>
                <NotificationsNoneIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ mx: 'auto', maxWidth: 768, mt: 1.5, px: { xs: 1, sm: 2 } }}>
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
