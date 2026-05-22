'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type { SvgIconComponent } from '@mui/icons-material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';

export interface IconTextItem {
  icon: SvgIconComponent;
  headline: string;
  body: string;
}

export interface IconTextProps {
  items: IconTextItem[];
  iconStyle?: 'bare' | 'chip' | 'circle';
  columns?: 1 | 2 | 3;
  eyebrow?: string;
  headline?: string;
  centered?: boolean;
  sx?: SxProps<Theme>;
}

const DEFAULT_ITEMS: IconTextItem[] = [
  { icon: BoltOutlinedIcon,      headline: 'Blazing Fast',     body: 'Optimised for speed at every layer of the stack so your users never wait.' },
  { icon: ShieldOutlinedIcon,    headline: 'Enterprise Security', body: 'SOC 2 Type II certified with end-to-end encryption and SSO out of the box.' },
  { icon: AutoGraphOutlinedIcon, headline: 'Insightful Analytics', body: 'Real-time dashboards that surface the metrics your team actually cares about.' },
  { icon: LightbulbOutlinedIcon, headline: 'Smart Defaults',   body: 'Sensible configuration that works on day one so you can ship without toil.' },
];

function IconWrapper({
  icon: Icon,
  iconStyle,
}: {
  icon: SvgIconComponent;
  iconStyle: NonNullable<IconTextProps['iconStyle']>;
}) {
  if (iconStyle === 'chip') {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: '#fff',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 24 }} />
      </Box>
    );
  }

  if (iconStyle === 'circle') {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: 'action.selected',
          color: 'primary.main',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 24 }} />
      </Box>
    );
  }

  // bare
  return <Icon sx={{ fontSize: 32, color: 'primary.main', flexShrink: 0 }} />;
}

export default function IconText({
  items = DEFAULT_ITEMS,
  iconStyle = 'chip',
  columns = 2,
  eyebrow,
  headline,
  centered = false,
  sx,
}: IconTextProps) {
  return (
    <Box sx={sx}>
      {(eyebrow || headline) && (
        <Box sx={{ mb: 6, textAlign: centered ? 'center' : 'left' }}>
          {eyebrow && (
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1, display: 'block', mb: 1 }}
            >
              {eyebrow}
            </Typography>
          )}
          {headline && (
            <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary' }}>
              {headline}
            </Typography>
          )}
        </Box>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: columns >= 2 ? 'repeat(2, 1fr)' : '1fr',
            md: `repeat(${columns}, 1fr)`,
          },
          gap: { xs: 4, md: 6 },
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Box
              key={item.headline}
              sx={{
                display: 'flex',
                flexDirection: centered ? 'column' : 'row',
                alignItems: centered ? 'center' : 'flex-start',
                gap: 2,
                textAlign: centered ? 'center' : 'left',
              }}
            >
              <IconWrapper icon={Icon} iconStyle={iconStyle} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  {item.headline}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                  {item.body}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
