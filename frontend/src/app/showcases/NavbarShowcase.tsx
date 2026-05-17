'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  NavbarSimple,
  NavbarWithQuickAction,
  NavbarWithSearch,
  NavbarWithMenuButton,
  NavbarWithCenteredSearch,
  NavbarWithSearchColumnLayout,
} from '@/components/navbars';

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

export default function NavbarShowcase() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <div><Label>Simple</Label><NavbarSimple /></div>
      <div><Label>With quick action</Label><NavbarWithQuickAction /></div>
      <div><Label>With search</Label><NavbarWithSearch /></div>
      <div><Label>Menu button on left</Label><NavbarWithMenuButton /></div>
      <div><Label>Centered search + secondary nav</Label><NavbarWithCenteredSearch /></div>
      <div><Label>Search in column layout</Label><NavbarWithSearchColumnLayout /></div>
    </Box>
  );
}
