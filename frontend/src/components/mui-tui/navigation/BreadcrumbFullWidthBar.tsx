'use client';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { crumbs } from './shared';

export default function BreadcrumbFullWidthBar() {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  return (
    <Box
      sx={{
        width: '100%',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: dark ? 'action.hover' : 'grey.50',
        px: 2,
        py: 1.5,
      }}
    >
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {crumbs.map((c, i) =>
          c.href ? (
            <Link key={i} href={c.href} underline="hover" color="inherit" sx={{ fontSize: '0.875rem' }}>
              {c.label}
            </Link>
          ) : (
            <Typography key={i} sx={{ fontSize: '0.875rem', color: 'text.primary' }}>
              {c.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
}
