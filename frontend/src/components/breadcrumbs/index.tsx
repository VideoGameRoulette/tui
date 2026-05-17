'use client';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ContainedBreadcrumb from './ContainedBreadcrumb';

const crumbs: Array<{ label: string; href?: string }> = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Project Alpha' },
];

function crumbItems() {
  return crumbs.map((c, i) =>
    c.href ? (
      <Link key={i} href={c.href} underline="hover" color="inherit" sx={{ fontSize: 14 }}>
        {c.label}
      </Link>
    ) : (
      <Typography key={i} color="text.primary" sx={{ fontSize: 14 }}>
        {c.label}
      </Typography>
    )
  );
}

function Label({ children }: { children: string }) {
  return (
    <Typography
      variant="caption"
      color="text.disabled"
      sx={{ mb: 0.75, display: 'block', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
    >
      {children}
    </Typography>
  );
}

export default function BreadcrumbsShowcase() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, width: '100%' }}>
      <Box>
        <Label>Simple with slashes</Label>
        <Breadcrumbs separator="/" aria-label="breadcrumb">
          {crumbItems()}
        </Breadcrumbs>
      </Box>

      <Box>
        <Label>Simple with chevrons</Label>
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
          aria-label="breadcrumb"
        >
          {crumbItems()}
        </Breadcrumbs>
      </Box>

      <Box>
        <Label>Contained</Label>
        <ContainedBreadcrumb />
      </Box>

      <Box>
        <Label>Full-width bar</Label>
        <Box
          sx={{
            width: '100%',
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'grey.50',
            px: 2,
            py: 1.5,
          }}
        >
          <Breadcrumbs separator="/" aria-label="breadcrumb">
            {crumbItems()}
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
}
