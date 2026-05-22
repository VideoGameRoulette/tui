'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppProgressBarProps {
  value?: number;
  variant?: LinearProgressProps['variant'];
  color?: LinearProgressProps['color'];
  height?: number;
  showLabel?: boolean;
  label?: string;
  sx?: SxProps<Theme>;
}

export default function AppProgressBar({
  value = 0,
  variant = 'determinate',
  color = 'primary',
  height = 6,
  showLabel = false,
  label,
  sx,
}: AppProgressBarProps) {
  const displayLabel = label ?? (variant === 'determinate' ? `${Math.round(value)}%` : '');

  return (
    <Box sx={{ width: '100%', ...sx }}>
      {(showLabel && displayLabel) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            {displayLabel}
          </Typography>
          {variant === 'determinate' && !label && (
            <Typography variant="caption" color="text.secondary">
              {Math.round(value)}%
            </Typography>
          )}
        </Box>
      )}
      <LinearProgress
        variant={variant}
        value={variant === 'determinate' ? value : undefined}
        color={color}
        sx={{ height, borderRadius: height }}
      />
    </Box>
  );
}
