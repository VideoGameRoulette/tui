'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface Logo {
  name: string;
  src?: string;
  href?: string;
  alt?: string;
}

const DEFAULT_LOGOS: Logo[] = [
  { name: 'Acme Corp' },
  { name: 'TechFlow' },
  { name: 'Streamline' },
  { name: 'Vertex Labs' },
  { name: 'CloudBridge' },
  { name: 'DataOps' },
  { name: 'Rapid Scale' },
  { name: 'Insight Systems' },
];

export interface LogoBarProps {
  logos?: Logo[];
  mode?: 'scroll' | 'static';
  label?: string;
  height?: number;
  grayscale?: boolean;
  speed?: number;
  sx?: SxProps<Theme>;
}

function LogoItem({ logo, height, grayscale }: { logo: Logo; height: number; grayscale: boolean }) {
  const content = logo.src ? (
    <Box
      component="img"
      src={logo.src}
      alt={logo.alt ?? logo.name}
      sx={{
        height,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        filter: grayscale ? 'grayscale(1)' : 'none',
        opacity: grayscale ? 0.6 : 1,
        transition: 'opacity 0.2s, filter 0.2s',
        '&:hover': grayscale ? { opacity: 1, filter: 'none' } : {},
      }}
    />
  ) : (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: grayscale ? 'text.disabled' : 'text.secondary',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        transition: 'color 0.2s',
        '&:hover': { color: 'text.primary' },
      }}
    >
      {logo.name}
    </Typography>
  );

  if (logo.href) {
    return (
      <Box
        component="a"
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={logo.name}
        sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {content}
    </Box>
  );
}

export default function LogoBar({
  logos = DEFAULT_LOGOS,
  mode = 'scroll',
  label,
  height = 32,
  grayscale = true,
  speed = 30,
  sx,
}: LogoBarProps) {
  if (mode === 'static') {
    return (
      <Box sx={sx}>
        {label && (
          <Typography
            variant="overline"
            display="block"
            textAlign="center"
            color="text.disabled"
            mb={3}
          >
            {label}
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 4, sm: 6, md: 8 },
          }}
        >
          {logos.map((logo, i) => (
            <LogoItem key={i} logo={logo} height={height} grayscale={grayscale} />
          ))}
        </Box>
      </Box>
    );
  }

  // Scroll mode — duplicate logos for seamless infinite loop
  const doubled = [...logos, ...logos];
  const duration = logos.length * speed;

  return (
    <Box sx={sx}>
      {label && (
        <Typography
          variant="overline"
          display="block"
          textAlign="center"
          color="text.disabled"
          mb={3}
        >
          {label}
        </Typography>
      )}
      <Box sx={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 6, md: 10 },
            width: 'max-content',
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
            animation: `marquee ${duration}s linear infinite`,
            '&:hover': { animationPlayState: 'paused' },
          }}
        >
          {doubled.map((logo, i) => (
            <LogoItem key={i} logo={logo} height={height} grayscale={grayscale} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
