'use client';

import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

// lottie-react is loaded client-side only; install with: npm i lottie-react
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export interface LottieAnimationProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  width?: number | string;
  height?: number | string;
  sx?: SxProps<Theme>;
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  width = '100%',
  height = 'auto',
  sx,
}: LottieAnimationProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...sx }}>
      <Box sx={{ width, height }}>
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </Box>
  );
}
