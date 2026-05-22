'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';

type BannerVariant = 'default' | 'filled' | 'tinted';

export interface CTABannerButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'text';
}

export interface CTABannerProps {
  headline: string;
  subtext?: string;
  buttons?: CTABannerButton[];
  align?: 'left' | 'center';
  variant?: BannerVariant;
  sx?: SxProps<Theme>;
}

function getBtnSx(bannerVariant: BannerVariant, btnVariant: string = 'contained') {
  if (bannerVariant !== 'filled') return {};
  return btnVariant === 'contained'
    ? { bgcolor: 'common.white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }
    : { borderColor: 'rgba(255,255,255,0.6)', color: 'common.white', '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' } };
}

const bgMap: Record<BannerVariant, object> = {
  default: { bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' },
  filled:  { bgcolor: 'primary.main' },
  tinted:  { bgcolor: 'action.selected' },
};

export default function CTABanner({
  headline,
  subtext,
  buttons = [],
  align = 'center',
  variant = 'default',
  sx,
}: CTABannerProps) {
  const isFilled = variant === 'filled';

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 8, sm: 12 },
        px: { xs: 3, sm: 6, lg: 8 },
        ...bgMap[variant],
        ...sx,
      }}
    >
      <Box
        sx={{
          maxWidth: 720,
          mx: align === 'center' ? 'auto' : undefined,
          textAlign: align,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: isFilled ? 'common.white' : 'text.primary' }}
        >
          {headline}
        </Typography>
        {subtext && (
          <Typography
            variant="body1"
            sx={{ color: isFilled ? 'rgba(255,255,255,0.8)' : 'text.secondary', lineHeight: 1.8, fontSize: '1.125rem' }}
          >
            {subtext}
          </Typography>
        )}
        {buttons.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: align === 'center' ? 'center' : 'flex-start',
            }}
          >
            {buttons.map((btn, i) => (
              <Button
                key={i}
                variant={btn.variant ?? (i === 0 ? 'contained' : 'outlined')}
                href={btn.href}
                component={btn.href ? 'a' : 'button'}
                onClick={btn.onClick}
                disableElevation
                size="large"
                sx={getBtnSx(variant, btn.variant ?? (i === 0 ? 'contained' : 'outlined'))}
              >
                {btn.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
