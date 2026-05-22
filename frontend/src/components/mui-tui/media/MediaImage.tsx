'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

type AspectRatio = '1/1' | '4/3' | '3/2' | '16/9' | '21/9' | 'auto';
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none';

export interface MediaImageProps {
  src: string;
  alt?: string;
  caption?: string;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  borderRadius?: number;
  sx?: SxProps<Theme>;
}

export default function MediaImage({
  src,
  alt = '',
  caption,
  aspectRatio = '16/9',
  objectFit = 'cover',
  borderRadius = 2,
  sx,
}: MediaImageProps) {
  return (
    <Box component="figure" sx={{ m: 0, ...sx }}>
      <Box
        sx={{
          borderRadius,
          overflow: 'hidden',
          bgcolor: 'action.hover',
          ...(aspectRatio !== 'auto' ? { aspectRatio } : {}),
        }}
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            display: 'block',
            width: '100%',
            height: aspectRatio !== 'auto' ? '100%' : 'auto',
            objectFit,
          }}
        />
      </Box>
      {caption && (
        <Typography
          component="figcaption"
          variant="caption"
          sx={{ display: 'block', mt: 1, color: 'text.secondary', textAlign: 'center' }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}
