'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import type { SxProps, Theme } from '@mui/material/styles';

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface StatBlockProps {
  stats: Stat[];
  variant?: 'simple' | 'divided' | 'card';
  eyebrow?: string;
  headline?: string;
  sx?: SxProps<Theme>;
}

const DEFAULT_STATS: Stat[] = [
  { value: '8K+', label: 'Customers', description: 'Across 40 countries worldwide' },
  { value: '99.9%', label: 'Uptime SLA', description: 'Industry-leading reliability' },
  { value: '3.5×', label: 'Faster delivery', description: 'Compared to the competition' },
  { value: '$2.8B', label: 'Transactions', description: 'Processed last quarter alone' },
];

function StatItem({ stat, textAlign }: { stat: Stat; textAlign?: 'center' | 'left' }) {
  return (
    <Box sx={{ textAlign: textAlign ?? 'left' }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'primary.main',
          lineHeight: 1,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        }}
      >
        {stat.value}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: 600, color: 'text.primary', mt: 1 }}
      >
        {stat.label}
      </Typography>
      {stat.description && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, lineHeight: 1.6 }}>
          {stat.description}
        </Typography>
      )}
    </Box>
  );
}

export default function StatBlock({
  stats = DEFAULT_STATS,
  variant = 'simple',
  eyebrow,
  headline,
  sx,
}: StatBlockProps) {
  const header = (eyebrow || headline) && (
    <Box sx={{ mb: 6, textAlign: 'center' }}>
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
  );

  if (variant === 'card') {
    return (
      <Box sx={sx}>
        {header}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: stats.length <= 2 ? `repeat(${stats.length}, 1fr)` : 'repeat(2, 1fr)',
              md: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
            },
            gap: 2,
          }}
        >
          {stats.map((stat) => (
            <Paper
              key={stat.label}
              variant="outlined"
              sx={{ p: 3, borderRadius: 2 }}
            >
              <StatItem stat={stat} />
            </Paper>
          ))}
        </Box>
      </Box>
    );
  }

  if (variant === 'divided') {
    return (
      <Box sx={sx}>
        {header}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: stats.length <= 2 ? `repeat(${stats.length}, 1fr)` : 'repeat(2, 1fr)',
              md: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
            },
          }}
        >
          {stats.map((stat, i) => (
            <Box
              key={stat.label}
              sx={{
                p: { xs: 3, md: 4 },
                borderLeft: { md: i > 0 ? '1px solid' : 'none' },
                borderTop: { xs: i > 0 ? '1px solid' : 'none', md: 'none' },
                borderColor: 'divider',
                textAlign: 'center',
              }}
            >
              <StatItem stat={stat} textAlign="center" />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  // simple
  return (
    <Box sx={sx}>
      {header}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr 1fr',
            md: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
          },
          gap: { xs: 4, md: 8 },
        }}
      >
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </Box>
    </Box>
  );
}
