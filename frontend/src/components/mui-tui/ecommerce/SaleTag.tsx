'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';
import type { SxProps, Theme } from '@mui/material/styles';

export type SaleTagPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type SaleTagVariant = 'chip' | 'banner' | 'ribbon';

const PLACEMENT_SX: Record<SaleTagPlacement, object> = {
  'top-left':     { top: 10, left: 10 },
  'top-right':    { top: 10, right: 10 },
  'bottom-left':  { bottom: 10, left: 10 },
  'bottom-right': { bottom: 10, right: 10 },
};

export interface SaleTagProps {
  label: string;
  color?: ChipProps['color'];
  placement?: SaleTagPlacement;
  variant?: SaleTagVariant;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

function RibbonTag({ label, color }: { label: string; color: ChipProps['color'] }) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    error:   { bg: '#ef4444', text: '#fff' },
    warning: { bg: '#f59e0b', text: '#fff' },
    success: { bg: '#22c55e', text: '#fff' },
    primary: { bg: 'primary.main', text: 'primary.contrastText' },
    default: { bg: '#64748b', text: '#fff' },
  };
  const c = colorMap[color as string] ?? colorMap.default;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 80,
        height: 80,
        overflow: 'hidden',
        pointerEvents: 'none',
        '&::before': {
          content: `"${label}"`,
          position: 'absolute',
          top: 18,
          right: -20,
          width: 90,
          textAlign: 'center',
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transform: 'rotate(45deg)',
          bgcolor: c.bg,
          color: c.text,
          py: 0.5,
          lineHeight: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        },
      }}
    />
  );
}

function BannerTag({ label, color, placement }: { label: string; color: ChipProps['color']; placement: SaleTagPlacement }) {
  const isLeft = placement.includes('left');
  const isTop = placement.includes('top');
  return (
    <Box
      sx={{
        position: 'absolute',
        ...( isTop ? { top: 0 } : { bottom: 0 }),
        left: 0,
        right: 0,
        bgcolor: `${color}.main`,
        color: `${color}.contrastText`,
        textAlign: isLeft ? 'left' : 'right',
        px: 1.5,
        py: 0.5,
        fontSize: '0.6875rem',
        fontWeight: 800,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
      }}
    >
      {label}
    </Box>
  );
}

export default function SaleTag({
  label,
  color = 'error',
  placement = 'top-left',
  variant = 'chip',
  children,
  sx,
}: SaleTagProps) {
  // Standalone — no children
  if (!children) {
    return (
      <Chip
        label={label}
        color={color}
        size="small"
        sx={{ fontWeight: 700, ...sx }}
      />
    );
  }

  // Overlay on children
  return (
    <Box sx={{ position: 'relative', display: 'inline-block', ...sx }}>
      {children}

      {variant === 'ribbon' ? (
        <RibbonTag label={label} color={color} />
      ) : variant === 'banner' ? (
        <BannerTag label={label} color={color} placement={placement} />
      ) : (
        <Chip
          label={label}
          color={color}
          size="small"
          sx={{
            position: 'absolute',
            fontWeight: 700,
            pointerEvents: 'none',
            ...PLACEMENT_SX[placement],
          }}
        />
      )}
    </Box>
  );
}
