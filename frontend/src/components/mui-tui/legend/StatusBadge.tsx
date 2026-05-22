'use client';

import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';
import type { SxProps, Theme } from '@mui/material/styles';

export type StatusValue =
  | 'not-started'
  | 'in-progress'
  | 'complete'
  | 'deprecated'
  | 'error'
  | 'warning';

const STATUS_CONFIG: Record<
  StatusValue,
  { label: string; color: ChipProps['color']; variant: ChipProps['variant'] }
> = {
  'not-started': { label: 'Not Started', color: 'default',  variant: 'outlined' },
  'in-progress':  { label: 'In Progress', color: 'warning',  variant: 'filled'   },
  'complete':     { label: 'Complete',    color: 'success',  variant: 'filled'   },
  'deprecated':   { label: 'Deprecated', color: 'default',  variant: 'filled'   },
  'error':        { label: 'Error',       color: 'error',    variant: 'filled'   },
  'warning':      { label: 'Warning',     color: 'warning',  variant: 'outlined' },
};

export interface StatusBadgeProps {
  status: StatusValue;
  label?: string;
  size?: ChipProps['size'];
  variant?: ChipProps['variant'];
  sx?: SxProps<Theme>;
}

export default function StatusBadge({
  status,
  label,
  size = 'small',
  variant,
  sx,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <Chip
      label={label ?? config.label}
      color={config.color}
      variant={variant ?? config.variant}
      size={size}
      sx={{ fontWeight: 600, ...sx }}
    />
  );
}
