'use client';

import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface CardGridProps {
  cols?: 1 | 2 | 3 | 4;
  gap?: number;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export default function CardGrid({ cols = 3, gap = 3, children, sx }: CardGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: cols >= 2 ? 'repeat(2, 1fr)' : '1fr',
          md: `repeat(${cols}, 1fr)`,
        },
        gap,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
