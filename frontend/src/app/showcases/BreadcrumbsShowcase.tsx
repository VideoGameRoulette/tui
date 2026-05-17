'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContainedBreadcrumb from '@/components/breadcrumbs/ContainedBreadcrumb';

// ─── shared data ──────────────────────────────────────────────────────────────

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
];

// ─── shared UI ────────────────────────────────────────────────────────────────

function Label({ children }: { children: string }) {
  return (
    <Typography
      variant="caption"
      sx={{ color: 'var(--text-secondary)', mb: 1.5, display: 'block', fontWeight: 500 }}
    >
      {children}
    </Typography>
  );
}

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

// Tall diagonal slash separator — same as Contained
function SlashSeparatorTall() {
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
        color: '#e5e7eb',
        [dark]: { color: 'rgba(255,255,255,0.1)' },
      }}
    >
      <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
    </Box>
  );
}

// ─── Full-width bar ───────────────────────────────────────────────────────────

function FullWidthBar() {
  return (
    <Box
      component="nav"
      aria-label="Breadcrumb"
      sx={{
        display: 'flex',
        borderBottom: '1px solid #e5e7eb',
        bgcolor: '#ffffff',
        width: '100%',
        [dark]: { borderColor: 'rgba(255,255,255,0.1)', bgcolor: 'rgba(31,41,55,0.5)' },
      }}
    >
      <Box
        component="ol"
        role="list"
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 2,
          width: '100%',
          maxWidth: '1280px',
          mx: 'auto',
          px: 2,
          listStyle: 'none',
        }}
      >
        <Box component="li" sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="#" aria-label="Home" underline="none" sx={homeLinkSx}>
              <HomeIcon sx={{ fontSize: 20, flexShrink: 0 }} aria-hidden="true" />
            </Link>
          </Box>
        </Box>

        {pages.map((page) => (
          <Box component="li" key={page.name} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SlashSeparatorTall />
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

// ─── Simple with chevrons ─────────────────────────────────────────────────────

function SimpleChevrons() {
  return (
    <Box component="nav" aria-label="Breadcrumb" sx={{ display: 'flex' }}>
      <Box
        component="ol"
        role="list"
        sx={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none' }}
      >
        <Box component="li">
          <Link
            href="#"
            aria-label="Home"
            underline="none"
            sx={{
              ...homeLinkSx,
              [dark]: { color: '#6b7280', '&:hover': { color: '#d1d5db' } },
            }}
          >
            <HomeIcon sx={{ fontSize: 20, flexShrink: 0 }} aria-hidden="true" />
          </Link>
        </Box>

        {pages.map((page) => (
          <Box component="li" key={page.name}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ChevronRightIcon
                aria-hidden="true"
                sx={{
                  fontSize: 20,
                  flexShrink: 0,
                  color: '#9ca3af',
                  [dark]: { color: '#6b7280' },
                }}
              />
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

// ─── Simple with slashes ──────────────────────────────────────────────────────

function SimpleSlashes() {
  return (
    <Box component="nav" aria-label="Breadcrumb" sx={{ display: 'flex' }}>
      <Box
        component="ol"
        role="list"
        sx={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none' }}
      >
        <Box component="li">
          <Link href="#" aria-label="Home" underline="none" sx={homeLinkSx}>
            <HomeIcon sx={{ fontSize: 20, flexShrink: 0 }} aria-hidden="true" />
          </Link>
        </Box>

        {pages.map((page) => (
          <Box component="li" key={page.name}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                sx={{
                  width: 20,
                  height: 20,
                  flexShrink: 0,
                  color: '#d1d5db',
                  [dark]: { color: '#4b5563' },
                }}
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </Box>
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

// ─── Showcase ─────────────────────────────────────────────────────────────────

export default function BreadcrumbsShowcase() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <div><Label>Contained</Label><ContainedBreadcrumb /></div>
      <div><Label>Full-width bar</Label><FullWidthBar /></div>
      <div><Label>Simple with chevrons</Label><SimpleChevrons /></div>
      <div><Label>Simple with slashes</Label><SimpleSlashes /></div>
    </Box>
  );
}
