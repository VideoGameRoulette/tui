'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface HeroVideoBGProps {
  videoSrc?: string;
  poster?: string;
  headline?: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  overlayOpacity?: number;
}

export default function HeroVideoBG({
  videoSrc = '',
  poster = '',
  headline = 'The future of work\nstarts here.',
  description = 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam.',
  primaryCTA = { label: 'Get started', href: '#' },
  secondaryCTA = { label: 'Learn more', href: '#' },
  overlayOpacity = 0.55,
}: HeroVideoBGProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '80vh', lg: '100vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: '#0f172a',
      }}
    >
      {/* Background video */}
      {videoSrc && (
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
          poster={poster || undefined}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Dark overlay */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: `rgba(0,0,0,${overlayOpacity})`,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ px: { xs: 3, sm: 6, lg: 8 }, position: 'relative', zIndex: 1 }}
      >
        <Box sx={{ maxWidth: 680 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4.5rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              whiteSpace: 'pre-line',
            }}
          >
            {headline}
          </Typography>

          <Typography
            sx={{
              mt: 3,
              fontSize: { xs: '1rem', sm: '1.125rem' },
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.75,
              maxWidth: 520,
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              mt: 6,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              component="a"
              href={primaryCTA.href}
              sx={{
                bgcolor: '#ffffff',
                color: '#0f172a',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              {primaryCTA.label}
            </Button>
            <Button
              variant="text"
              size="large"
              component="a"
              href={secondaryCTA.href}
              endIcon={<ArrowForwardIcon />}
              sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: '#ffffff', bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              {secondaryCTA.label}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
