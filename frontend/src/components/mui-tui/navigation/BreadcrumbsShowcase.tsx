'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BreadcrumbSimpleSlash from './BreadcrumbSimpleSlash';
import BreadcrumbSimpleChevron from './BreadcrumbSimpleChevron';
import BreadcrumbFullWidthBar from './BreadcrumbFullWidthBar';
import ContainedBreadcrumb from './ContainedBreadcrumb';

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
        <BreadcrumbSimpleSlash />
      </Box>
      <Box>
        <Label>Simple with chevrons</Label>
        <BreadcrumbSimpleChevron />
      </Box>
      <Box>
        <Label>Contained</Label>
        <ContainedBreadcrumb />
      </Box>
      <Box>
        <Label>Full-width bar</Label>
        <BreadcrumbFullWidthBar />
      </Box>
    </Box>
  );
}
