'use client';

import MuiButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import type { ButtonGroupProps } from '@mui/material/ButtonGroup';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface AppButtonGroupProps {
  style?: 'connected' | 'spaced';
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'contained' | 'text';
  gap?: number;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export default function AppButtonGroup({
  style = 'connected',
  orientation = 'horizontal',
  size = 'medium',
  variant = 'outlined',
  gap = 1,
  children,
  sx,
}: AppButtonGroupProps) {
  if (style === 'spaced') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          gap,
          flexWrap: 'wrap',
          ...sx,
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <MuiButtonGroup
      orientation={orientation}
      size={size}
      variant={variant}
      disableElevation
      sx={{ ...sx } as ButtonGroupProps['sx']}
    >
      {children}
    </MuiButtonGroup>
  );
}
