'use client';

import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface FeatureCardProps {
  icon?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  heading: string;
  description: string;
  variant?: 'elevation' | 'outlined';
  sx?: SxProps<Theme>;
}

export default function FeatureCard({
  icon,
  imageUrl,
  imageAlt = '',
  heading,
  description,
  variant = 'outlined',
  sx,
}: FeatureCardProps) {
  return (
    <MuiCard variant={variant} sx={{ borderRadius: 3, height: '100%', ...sx }}>
      {imageUrl && (
        <Box sx={{ aspectRatio: '16/9', overflow: 'hidden', bgcolor: 'action.hover' }}>
          <Box
            component="img"
            src={imageUrl}
            alt={imageAlt}
            sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      )}
      <CardContent sx={{ p: 3 }}>
        {icon && (
          <Box sx={{ mb: 2, color: 'primary.main', '& svg': { fontSize: 36 } }}>
            {icon}
          </Box>
        )}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {description}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}
