'use client';

import MuiDivider from '@mui/material/Divider';
import type { DividerProps as MuiDividerProps } from '@mui/material/Divider';
import Box from '@mui/material/Box';

export interface DividerProps extends Omit<MuiDividerProps, 'style'> {
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  spacing?: number;
}

export default function Divider({
  lineStyle = 'solid',
  spacing,
  sx,
  children,
  ...props
}: DividerProps) {
  if (lineStyle !== 'solid') {
    return (
      <Box
        component="hr"
        role="separator"
        sx={{
          border: 'none',
          borderTop: `1px ${lineStyle}`,
          borderColor: 'divider',
          my: spacing ?? 2,
          mx: props.variant === 'middle' ? 4 : 0,
          ...sx,
        }}
      />
    );
  }

  return (
    <MuiDivider
      sx={{
        ...(spacing !== undefined ? { my: spacing } : {}),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiDivider>
  );
}
