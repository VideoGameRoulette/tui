'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface CTASplitProps {
  headline: string;
  subtext?: string;
  eyebrow?: string;
  children: ReactNode;
  reverseOnMobile?: boolean;
  sx?: SxProps<Theme>;
}

export default function CTASplit({
  headline,
  subtext,
  eyebrow,
  children,
  reverseOnMobile = false,
  sx,
}: CTASplitProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 6, md: 12 },
        alignItems: 'center',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          order: { xs: reverseOnMobile ? 2 : 1, md: 1 },
        }}
      >
        {eyebrow && (
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1 }}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}
        >
          {headline}
        </Typography>
        {subtext && (
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {subtext}
          </Typography>
        )}
      </Box>
      <Box sx={{ order: { xs: reverseOnMobile ? 1 : 2, md: 2 } }}>
        {children}
      </Box>
    </Box>
  );
}
