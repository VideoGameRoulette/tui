'use client';

import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface BackgroundImageSectionProps {
  imageUrl?: string;
  gradient?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  minHeight?: string | number;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export default function BackgroundImageSection({
  imageUrl,
  gradient,
  overlayColor = '#000',
  overlayOpacity = 0.45,
  minHeight = 480,
  children,
  sx,
}: BackgroundImageSectionProps) {
  const bgStyles = imageUrl
    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : gradient
    ? { background: gradient }
    : {};

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight,
        display: 'flex',
        alignItems: 'center',
        ...bgStyles,
        ...sx,
      }}
    >
      {(imageUrl || gradient) && (
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: overlayColor,
            opacity: overlayOpacity,
            pointerEvents: 'none',
          }}
        />
      )}
      <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}
