'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';

export interface TextImageProps {
  eyebrow?: string;
  headline: string;
  body: string;
  imageUrl: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  cta?: { label: string; href: string; variant?: 'contained' | 'outlined' | 'text' };
  sx?: SxProps<Theme>;
}

export default function TextImage({
  eyebrow,
  headline,
  body,
  imageUrl,
  imageAlt = '',
  imagePosition = 'right',
  cta,
  sx,
}: TextImageProps) {
  const textCol = (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
      {eyebrow && (
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1 }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary' }}>
        {headline}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
        {body}
      </Typography>
      {cta && (
        <Box>
          <Button
            variant={cta.variant ?? 'contained'}
            href={cta.href}
            component="a"
            disableElevation
          >
            {cta.label}
          </Button>
        </Box>
      )}
    </Box>
  );

  const imageCol = (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        aspectRatio: '4/3',
        bgcolor: 'action.hover',
        flexShrink: 0,
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={imageAlt}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 4, md: 8 },
        alignItems: 'center',
        ...sx,
      }}
    >
      {imagePosition === 'left' ? (
        <>
          <Box sx={{ order: { xs: 2, md: 1 } }}>{imageCol}</Box>
          <Box sx={{ order: { xs: 1, md: 2 } }}>{textCol}</Box>
        </>
      ) : (
        <>
          {textCol}
          {imageCol}
        </>
      )}
    </Box>
  );
}
