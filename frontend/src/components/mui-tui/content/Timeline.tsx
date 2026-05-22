'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

export interface TimelineItem {
  date?: string;
  title: string;
  body: string;
  tag?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: 'default' | 'compact' | 'alternating';
  sx?: SxProps<Theme>;
}

const DEFAULT_ITEMS: TimelineItem[] = [
  { date: 'Jan 2021', title: 'Company founded',        body: 'Three engineers and a whiteboard — that was the whole team on day one.',                      tag: 'Milestone' },
  { date: 'Jun 2021', title: 'Seed round closed',      body: '$2.4 M raised to grow the team and harden the core infrastructure.',                          tag: 'Funding'   },
  { date: 'Mar 2022', title: 'Public beta launched',   body: 'First 500 customers onboarded in a single weekend. Servers held up — barely.',                 tag: 'Launch'    },
  { date: 'Nov 2022', title: 'Series A — $18 M',       body: 'Expanded into the EU and hired our first dedicated security and compliance team.',             tag: 'Funding'   },
  { date: 'Q2 2024',  title: 'GA & enterprise tier',   body: '99.9% uptime SLA, SSO, and audit logs — enterprise customers finally came knocking.',          tag: 'Milestone' },
];

export default function Timeline({
  items = DEFAULT_ITEMS,
  variant = 'default',
  sx,
}: TimelineProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  const dotColor = palette.primary.main;
  const lineColor = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';

  if (variant === 'alternating') {
    return (
      <Box sx={{ position: 'relative', ...sx }}>
        {/* centre line */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: lineColor,
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Box
                key={item.title}
                sx={{
                  display: { xs: 'block', md: 'grid' },
                  gridTemplateColumns: '1fr 32px 1fr',
                  alignItems: 'flex-start',
                  gap: 0,
                }}
              >
                {/* left content */}
                <Box
                  sx={{
                    pr: { md: 4 },
                    textAlign: { md: 'right' },
                    display: { xs: 'none', md: isLeft ? 'block' : 'block' },
                    visibility: { md: isLeft ? 'visible' : 'hidden' },
                  }}
                >
                  {isLeft && <ItemContent item={item} />}
                </Box>

                {/* dot */}
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                    pt: 0.5,
                  }}
                >
                  <Dot color={dotColor} />
                </Box>

                {/* right content */}
                <Box
                  sx={{
                    pl: { md: 4 },
                    display: { xs: 'block', md: 'block' },
                    visibility: { md: isLeft ? 'hidden' : 'visible' },
                  }}
                >
                  {/* mobile: always show */}
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <ItemContent item={item} />
                  </Box>
                  {/* desktop: only right side items */}
                  {!isLeft && (
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                      <ItemContent item={item} />
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  // default + compact share the same left-rail layout
  const compact = variant === 'compact';

  return (
    <Box sx={{ position: 'relative', pl: compact ? 4 : 5, ...sx }}>
      {/* vertical rail */}
      <Box
        sx={{
          position: 'absolute',
          left: compact ? 7 : 9,
          top: 8,
          bottom: 8,
          width: 2,
          bgcolor: lineColor,
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 5 }}>
        {items.map((item) => (
          <Box key={item.title} sx={{ position: 'relative' }}>
            {/* dot on the rail */}
            <Box
              sx={{
                position: 'absolute',
                left: compact ? -25 : -29,
                top: compact ? 6 : 4,
              }}
            >
              <Dot color={dotColor} size={compact ? 10 : 14} />
            </Box>
            <ItemContent item={item} compact={compact} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function Dot({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: color,
        border: '2px solid',
        borderColor: 'background.paper',
        boxShadow: `0 0 0 2px ${color}`,
      }}
    />
  );
}

function ItemContent({ item, compact }: { item: TimelineItem; compact?: boolean }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.5 }}>
        {item.date && (
          <Typography
            variant="caption"
            sx={{ color: 'text.disabled', fontWeight: 600, letterSpacing: '0.04em', flexShrink: 0 }}
          >
            {item.date}
          </Typography>
        )}
        {item.tag && (
          <Chip label={item.tag} size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: '0.6875rem' }} />
        )}
      </Box>
      <Typography
        variant={compact ? 'body1' : 'h6'}
        sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3 }}
      >
        {item.title}
      </Typography>
      {!compact && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, lineHeight: 1.7 }}>
          {item.body}
        </Typography>
      )}
    </Box>
  );
}
