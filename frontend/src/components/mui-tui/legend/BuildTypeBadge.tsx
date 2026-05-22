'use client';

import type { ElementType } from 'react';
import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';
import PaletteIcon from '@mui/icons-material/Palette';
import BuildIcon from '@mui/icons-material/Build';
import ConstructionIcon from '@mui/icons-material/Construction';
import type { SxProps, Theme } from '@mui/material/styles';

export type BuildType = 'theme-only' | 'composite' | 'custom';

const TYPE_CONFIG: Record<
  BuildType,
  { label: string; color: ChipProps['color']; Icon: ElementType }
> = {
  'theme-only': { label: 'Theme Only', color: 'primary',   Icon: PaletteIcon      },
  'composite':  { label: 'Composite',  color: 'secondary', Icon: BuildIcon        },
  'custom':     { label: 'Custom',     color: 'info',      Icon: ConstructionIcon },
};

export interface BuildTypeBadgeProps {
  type: BuildType;
  showIcon?: boolean;
  size?: ChipProps['size'];
  variant?: ChipProps['variant'];
  sx?: SxProps<Theme>;
}

export default function BuildTypeBadge({
  type,
  showIcon = true,
  size = 'small',
  variant = 'outlined',
  sx,
}: BuildTypeBadgeProps) {
  const { label, color, Icon } = TYPE_CONFIG[type];
  return (
    <Chip
      label={label}
      color={color}
      variant={variant}
      size={size}
      icon={showIcon ? <Icon /> : undefined}
      sx={{ fontWeight: 600, ...sx }}
    />
  );
}
