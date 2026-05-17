'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
];

const dark = "[data-color-scheme='dark'] &";

const homeLinkSx = {
  display: 'flex',
  alignItems: 'center',
  color: '#9ca3af',
  '&:hover': { color: '#6b7280' },
  [dark]: { color: '#9ca3af', '&:hover': { color: '#d1d5db' } },
};

const pageLinkSx = {
  ml: 2,
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#6b7280',
  '&:hover': { color: '#374151' },
  [dark]: { color: '#9ca3af', '&:hover': { color: '#e5e7eb' } },
};

function SlashSeparator() {
  return (
    <Box
      component="svg"
      fill="currentColor"
      viewBox="0 0 24 44"
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{
        height: '100%',
        width: 24,
        flexShrink: 0,
        color: 'grey.200',
        "[data-color-scheme='dark'] &": { color: 'rgba(255,255,255,0.1)' },
      }}
    >
      <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
    </Box>
  );
}

export default function ContainedBreadcrumb() {
  return (
    <Box component="nav" aria-label="Breadcrumb" sx={{ display: 'flex' }}>
      <Box
        component="ol"
        role="list"
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 2,
          borderRadius: '6px',
          bgcolor: 'background.paper',
          px: 3,
          boxShadow: 1,
          listStyle: 'none',
          "[data-color-scheme='dark'] &": {
            bgcolor: 'rgba(31,41,55,0.5)',
            boxShadow: 'none',
            outline: '1px solid rgba(255,255,255,0.1)',
            outlineOffset: '-1px',
          },
        }}
      >
        {/* Home */}
        <Box component="li" sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="#"
              underline="none"
              sx={homeLinkSx}
            >
              <HomeIcon sx={{ fontSize: 20, flexShrink: 0 }} />
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  p: 0,
                  m: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0,0,0,0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                }}
              >
                Home
              </Box>
            </Link>
          </Box>
        </Box>

        {/* Pages */}
        {pages.map((page) => (
          <Box component="li" key={page.name} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SlashSeparator />
              <Link
                href={page.href}
                underline="none"
                aria-current={page.current ? 'page' : undefined}
                sx={pageLinkSx}
              >
                {page.name}
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
