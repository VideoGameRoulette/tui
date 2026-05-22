'use client';

import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

type ColCount = 1 | 2 | 3 | 4 | 6 | 12;

type ResponsiveCols =
  | ColCount
  | { xs?: ColCount; sm?: ColCount; md?: ColCount; lg?: ColCount; xl?: ColCount };

export interface GridProps extends Omit<BoxProps, 'display'> {
  cols?: ResponsiveCols;
  gap?: number;
  rowGap?: number;
  colGap?: number;
}

function colsToTemplate(cols: ColCount) {
  return `repeat(${cols}, minmax(0, 1fr))`;
}

function resolveGridCols(cols: ResponsiveCols): string | object {
  if (typeof cols === 'number') return colsToTemplate(cols);
  return Object.fromEntries(
    Object.entries(cols)
      .filter(([, v]) => v !== undefined)
      .map(([bp, v]) => [bp, colsToTemplate(v as ColCount)])
  );
}

export default function Grid({
  cols = 12,
  gap,
  rowGap,
  colGap,
  sx,
  children,
  ...props
}: GridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: resolveGridCols(cols),
        ...(gap     !== undefined ? { gap }                  : {}),
        ...(rowGap  !== undefined ? { rowGap }               : {}),
        ...(colGap  !== undefined ? { columnGap: colGap }    : {}),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
