'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export type LegendShape = 'square' | 'circle' | 'line';

export interface LegendEntry {
  color: string;
  label: string;
  shape?: LegendShape;
}

export interface LegendProps {
  items: LegendEntry[];
  title?: string;
  orientation?: 'horizontal' | 'vertical';
  swatchSize?: number;
  sx?: SxProps<Theme>;
}

function Swatch({ color, shape, size }: { color: string; shape: LegendShape; size: number }) {
  if (shape === 'line') {
    return (
      <Box sx={{ width: size * 1.5, height: 3, borderRadius: 2, bgcolor: color, flexShrink: 0 }} />
    );
  }
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: shape === 'circle' ? '50%' : 1,
        bgcolor: color,
        flexShrink: 0,
      }}
    />
  );
}

export default function Legend({
  items,
  title,
  orientation = 'horizontal',
  swatchSize = 12,
  sx,
}: LegendProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ...sx }}>
      {title && (
        <Typography
          variant="caption"
          fontWeight={700}
          color="text.secondary"
          textTransform="uppercase"
          letterSpacing="0.05em"
        >
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
          gap: 1.5,
          alignItems: orientation === 'horizontal' ? 'center' : 'flex-start',
        }}
      >
        {items.map((item, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Swatch color={item.color} shape={item.shape ?? 'square'} size={swatchSize} />
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
