'use client';

import Box from '@mui/material/Box';

export interface SpacerProps {
  size?: number;
  axis?: 'vertical' | 'horizontal';
}

export default function Spacer({ size = 4, axis = 'vertical' }: SpacerProps) {
  return (
    <Box
      aria-hidden="true"
      sx={
        axis === 'vertical'
          ? { display: 'block', height: size, width: '100%', flexShrink: 0 }
          : { display: 'inline-block', width: size, height: 1, flexShrink: 0 }
      }
    />
  );
}
