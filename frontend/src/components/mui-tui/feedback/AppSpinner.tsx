'use client';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { CircularProgressProps } from '@mui/material/CircularProgress';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppSpinnerProps {
  size?: number | string;
  color?: CircularProgressProps['color'];
  thickness?: number;
  value?: number;
  variant?: CircularProgressProps['variant'];
  label?: string;
  center?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppSpinner({
  size = 40,
  color = 'primary',
  thickness = 3.6,
  value,
  variant = 'indeterminate',
  label,
  center = false,
  sx,
}: AppSpinnerProps) {
  const spinner = (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        ...(center && {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }),
        ...sx,
      }}
    >
      <CircularProgress
        size={size}
        color={color}
        thickness={thickness}
        value={value}
        variant={variant}
      />
      {label && (
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      )}
    </Box>
  );

  return spinner;
}
