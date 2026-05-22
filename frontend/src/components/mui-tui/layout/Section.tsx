'use client';

import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

type PaddingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

const pyPresets: Record<PaddingSize, number | object> = {
  none: 0,
  sm:   { xs: 4,  sm: 6  },
  md:   { xs: 8,  sm: 12 },
  lg:   { xs: 12, sm: 16 },
  xl:   { xs: 16, sm: 24 },
};

export interface SectionProps extends Omit<BoxProps, 'component'> {
  as?: React.ElementType;
  py?: PaddingSize;
  topBorder?: boolean;
  bottomBorder?: boolean;
}

export default function Section({
  as = 'section',
  py = 'md',
  topBorder = false,
  bottomBorder = false,
  sx,
  children,
  ...props
}: SectionProps) {
  return (
    <Box
      component={as}
      sx={{
        width: '100%',
        py: pyPresets[py],
        ...(topBorder || bottomBorder ? { borderColor: 'divider' } : {}),
        ...(topBorder    ? { borderTop:    '1px solid' } : {}),
        ...(bottomBorder ? { borderBottom: '1px solid' } : {}),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
