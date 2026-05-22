'use client';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface HeroCenteredProps {
  badge?: string;
  headline?: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export default function HeroCentered({
  badge = 'Announcing our next round of funding',
  headline = 'Data to enrich your\nonline business',
  description = 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.',
  primaryCTA = { label: 'Get started', href: '#' },
  secondaryCTA = { label: 'Learn more', href: '#' },
}: HeroCenteredProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        py: { xs: 16, sm: 20, lg: 28 },
      }}
    >
      {/* Radial gradient blob */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '-40%',
          transform: 'translateX(-50%)',
          width: '140%',
          maxWidth: 1400,
          aspectRatio: '2 / 1',
          borderRadius: '50%',
          background: dark
            ? 'radial-gradient(ellipse, rgba(79,70,229,0.28) 0%, transparent 65%)'
            : 'radial-gradient(ellipse, rgba(79,70,229,0.09) 0%, transparent 65%)',
          filter: 'blur(48px)',
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth="xl"
        disableGutters
        sx={{ px: { xs: 3, sm: 6, lg: 8 }, position: 'relative' }}
      >
        <Box sx={{ maxWidth: 720, mx: 'auto', textAlign: 'center' }}>
          {badge && (
            <Box sx={{ mb: 3 }}>
              <Chip
                label={badge}
                variant="outlined"
                size="small"
                clickable
                component="a"
                href="#"
                sx={{
                  borderRadius: 2,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '& .MuiChip-label': { px: 1.5 },
                }}
              />
            </Box>
          )}

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4.5rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'text.primary',
              whiteSpace: 'pre-line',
            }}
          >
            {headline}
          </Typography>

          <Typography
            sx={{
              mt: 3,
              fontSize: { xs: '1rem', sm: '1.125rem' },
              color: 'text.secondary',
              lineHeight: 1.75,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              mt: 6,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component="a"
              href={primaryCTA.href}
            >
              {primaryCTA.label}
            </Button>
            <Button
              variant="text"
              size="large"
              component="a"
              href={secondaryCTA.href}
              endIcon={<ArrowForwardIcon />}
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'action.hover' } }}
            >
              {secondaryCTA.label}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
