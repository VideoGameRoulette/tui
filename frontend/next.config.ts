import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['ai.ihcs.local'],
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};

export default nextConfig;
