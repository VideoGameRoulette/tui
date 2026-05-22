'use client';

import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

export type ColumnVariant =
  | 'two-col'
  | 'three-col'
  | 'four-col'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'sidebar-left-wide'
  | 'sidebar-right-wide';

const variantCols: Record<ColumnVariant, object> = {
  'two-col':            { xs: '1fr',        md: '1fr 1fr'                },
  'three-col':          { xs: '1fr',        sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
  'four-col':           { xs: '1fr 1fr',   lg: '1fr 1fr 1fr 1fr'        },
  'sidebar-left':       { xs: '1fr',        md: '240px 1fr'              },
  'sidebar-right':      { xs: '1fr',        md: '1fr 240px'              },
  'sidebar-left-wide':  { xs: '1fr',        md: '320px 1fr'              },
  'sidebar-right-wide': { xs: '1fr',        md: '1fr 320px'              },
};

export interface ColumnsProps extends Omit<BoxProps, 'display'> {
  variant?: ColumnVariant;
  gap?: number;
}

export default function Columns({
  variant = 'two-col',
  gap = 4,
  sx,
  children,
  ...props
}: ColumnsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: variantCols[variant],
        gap,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
