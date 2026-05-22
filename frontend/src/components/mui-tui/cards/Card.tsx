'use client';

import MuiCard from '@mui/material/Card';
import type { CardProps as MuiCardProps } from '@mui/material/Card';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: 'elevation' | 'outlined';
  hover?: boolean;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export default function Card({
  variant = 'outlined',
  hover = false,
  sx,
  children,
  ...props
}: CardProps) {
  return (
    <MuiCard
      variant={variant}
      sx={{
        borderRadius: 3,
        ...(hover
          ? {
              transition: 'box-shadow 0.2s, transform 0.2s',
              '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
            }
          : {}),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
}
