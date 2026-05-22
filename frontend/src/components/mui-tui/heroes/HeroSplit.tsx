'use client';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface HeroSplitProps {
  headline?: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1280&q=80';

export default function HeroSplit({
  headline = 'Deploy to the cloud\nwith confidence.',
  description = 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua ad ad non deserunt sunt.',
  primaryCTA = { label: 'Get started', href: '#' },
  secondaryCTA = { label: 'Live demo', href: '#' },
  imageSrc = FALLBACK_IMAGE,
  imageAlt = 'Hero illustration',
  imagePosition = 'right',
}: HeroSplitProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const imageRight = imagePosition === 'right';

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        py: { xs: 12, sm: 16, lg: 20 },
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ px: { xs: 3, sm: 6, lg: 8 } }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 8, lg: 12 },
            alignItems: 'center',
          }}
        >
          {/* Text block — reorder on mobile so text always comes first */}
          <Box sx={{ order: { xs: 1, lg: imageRight ? 1 : 2 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.25rem', sm: '3rem', lg: '3.75rem' },
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

          {/* Image block */}
          <Box
            sx={{
              order: { xs: 2, lg: imageRight ? 2 : 1 },
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: dark
                ? '0 20px 60px rgba(0,0,0,0.5)'
                : '0 20px 60px rgba(0,0,0,0.12)',
              aspectRatio: '4 / 3',
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={imageAlt}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
