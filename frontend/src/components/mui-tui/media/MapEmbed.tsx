'use client';

import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

export interface MapEmbedProps {
  src: string;
  title?: string;
  height?: number | string;
  borderRadius?: number;
  sx?: SxProps<Theme>;
}

export default function MapEmbed({
  src,
  title = 'Map',
  height = 400,
  borderRadius = 2,
  sx,
}: MapEmbedProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height,
        borderRadius,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
    >
      <Box
        component="iframe"
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        sx={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
      />
    </Box>
  );
}
