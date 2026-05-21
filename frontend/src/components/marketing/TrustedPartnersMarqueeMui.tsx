'use client';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { ARCHITECTURE_PROVIDERS } from '@/lib/marketing-partners';

const LOGO_HEIGHT_PX = 28;
const MARQUEE_DURATION_S = 44;

function ProviderLogo({
  label,
  logoSrc,
  invertInDarkMode,
  maxWidthPx,
  isDark,
}: {
  label: string;
  logoSrc: string;
  invertInDarkMode?: boolean;
  maxWidthPx?: number;
  isDark: boolean;
}) {
  return (
    <Box
      component="span"
      title={label}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        height: LOGO_HEIGHT_PX + 8,
      }}
    >
      <Image
        src={logoSrc}
        alt=""
        width={maxWidthPx ?? 96}
        height={LOGO_HEIGHT_PX}
        unoptimized
        title={label}
        style={{
          height: LOGO_HEIGHT_PX,
          width: 'auto',
          maxWidth: maxWidthPx ?? 96,
          objectFit: 'contain',
          display: 'block',
          ...(invertInDarkMode && isDark
            ? { filter: 'invert(1) brightness(1.12)' }
            : {}),
        }}
      />
    </Box>
  );
}

export function TrustedPartnersMarqueeMui({ headingId }: { headingId?: string }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });

  const names = ARCHITECTURE_PROVIDERS.map((p) => p.label).join(', ');

  const tiles = ARCHITECTURE_PROVIDERS.map((p) => (
    <ProviderLogo
      key={p.id}
      label={p.label}
      logoSrc={p.logoSrc}
      invertInDarkMode={p.invertInDarkMode}
      maxWidthPx={p.maxWidthPx}
      isDark={isDark}
    />
  ));

  const loopedTiles = [0, 1].flatMap((dup) =>
    ARCHITECTURE_PROVIDERS.map((p) => (
      <ProviderLogo
        key={`${dup}-${p.id}`}
        label={p.label}
        logoSrc={p.logoSrc}
        invertInDarkMode={p.invertInDarkMode}
        maxWidthPx={p.maxWidthPx}
        isDark={isDark}
      />
    )),
  );

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      aria-label={headingId ? undefined : 'Frontend architecture providers'}
      sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}
    >
      <Box
        component="span"
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          p: 0,
          m: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Provider logos: {names}.
      </Box>

      <Box
        aria-hidden={!reduceMotion}
        sx={{
          display: 'flex',
          width: reduceMotion ? '100%' : 'max-content',
          maxWidth: reduceMotion ? 900 : undefined,
          mx: reduceMotion ? 'auto' : undefined,
          flexWrap: reduceMotion ? 'wrap' : 'nowrap',
          justifyContent: reduceMotion ? 'center' : 'flex-start',
          gap: { xs: 4, sm: 6 },
          alignItems: 'center',
          rowGap: reduceMotion ? 2 : undefined,
          ...(reduceMotion
            ? {}
            : {
                animation: `trustedPartnersMarquee ${MARQUEE_DURATION_S}s linear infinite`,
                '@keyframes trustedPartnersMarquee': {
                  from: { transform: 'translateX(0)' },
                  to: { transform: 'translateX(-50%)' },
                },
                '&:hover': {
                  '@media (hover: hover)': {
                    animationPlayState: 'paused',
                  },
                },
              }),
        }}
      >
        {reduceMotion ? tiles : loopedTiles}
      </Box>
    </Box>
  );
}
