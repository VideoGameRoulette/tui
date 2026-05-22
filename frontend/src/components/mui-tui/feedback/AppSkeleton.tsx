'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import type { SkeletonProps } from '@mui/material/Skeleton';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppSkeletonProps {
  variant?: SkeletonProps['variant'];
  animation?: SkeletonProps['animation'];
  width?: number | string;
  height?: number | string;
  count?: number;
  gap?: number;
  sx?: SxProps<Theme>;
}

export default function AppSkeleton({
  variant = 'text',
  animation = 'wave',
  width,
  height,
  count = 1,
  gap = 1,
  sx,
}: AppSkeletonProps) {
  if (count === 1) {
    return (
      <Skeleton
        variant={variant}
        animation={animation}
        width={width}
        height={height}
        sx={sx}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap, ...sx }}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          animation={animation}
          width={i === count - 1 && variant === 'text' ? '60%' : width}
          height={height}
        />
      ))}
    </Box>
  );
}
