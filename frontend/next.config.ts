import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['app.inhousecloudsolutions.com', 'ai.ihcs.local'],
  transpilePackages: [
    '@mui/material',
    '@mui/system',
    '@mui/styles',
    '@mui/icons-material',
    '@mui/x-data-grid',
    '@mui/x-data-grid-pro',
    '@mui/x-data-grid-premium',
    '@mui/x-license',
    '@mui/x-date-pickers',
    '@mui/x-date-pickers-pro',
    '@mui/x-date-pickers-premium',
    '@mui/lab',
    '@mui/utils',
  ],
};

export default nextConfig;
