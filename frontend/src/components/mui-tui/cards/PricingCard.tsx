'use client';

import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import type { SxProps, Theme } from '@mui/material/styles';

export interface PricingCardProps {
  planName: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
  sx?: SxProps<Theme>;
}

export default function PricingCard({
  planName,
  price,
  period = '/month',
  description,
  features,
  ctaLabel = 'Get started',
  ctaHref = '#',
  highlighted = false,
  sx,
}: PricingCardProps) {
  return (
    <MuiCard
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...(highlighted
          ? { borderColor: 'primary.main', borderWidth: 2, boxShadow: 6 }
          : {}),
        ...sx,
      }}
    >
      <CardContent
        sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {highlighted && (
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.1em' }}
          >
            Most popular
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {planName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {period}
          </Typography>
        </Box>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        <Divider />
        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {features.map((f, i) => (
            <Box
              component="li"
              key={i}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
            >
              <CheckIcon sx={{ fontSize: 18, color: 'primary.main', flexShrink: 0 }} />
              <Typography variant="body2">{f}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            variant={highlighted ? 'contained' : 'outlined'}
            fullWidth
            href={ctaHref}
            component="a"
            disableElevation
          >
            {ctaLabel}
          </Button>
        </Box>
      </CardContent>
    </MuiCard>
  );
}
