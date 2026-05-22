'use client';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { crumbs } from './shared';

export default function BreadcrumbSimpleSlash() {
  return (
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
  );
}
