'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface PullQuoteProps {
  quote: string;
  attribution?: string;
  role?: string;
  variant?: 'left-border' | 'centered' | 'large';
  sx?: SxProps<Theme>;
}

export default function PullQuote({
  quote,
  attribution,
  role,
  variant = 'left-border',
  sx,
}: PullQuoteProps) {
  if (variant === 'centered') {
    return (
      <Box sx={{ textAlign: 'center', py: 2, ...sx }}>
        <Typography
          component="blockquote"
          sx={{
            fontSize: { xs: '1.125rem', sm: '1.25rem' },
            fontStyle: 'italic',
            color: 'text.primary',
            fontWeight: 500,
            lineHeight: 1.7,
            m: 0,
            '&::before': { content: '"\\201C"' },
            '&::after':  { content: '"\\201D"' },
          }}
        >
          {quote}
        </Typography>
        {(attribution || role) && (
          <Box sx={{ mt: 2 }}>
            {attribution && (
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {attribution}
              </Typography>
            )}
            {role && (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {role}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  }

  if (variant === 'large') {
    return (
      <Box
        sx={{
          borderTop: '4px solid',
          borderColor: 'primary.main',
          pt: 4,
          pb: 2,
          ...sx,
        }}
      >
        <Typography
          component="blockquote"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            color: 'text.primary',
            m: 0,
          }}
        >
          &ldquo;{quote}&rdquo;
        </Typography>
        {(attribution || role) && (
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 24, height: 2, bgcolor: 'primary.main', borderRadius: 1 }} />
            <Box>
              {attribution && (
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', display: 'inline' }}>
                  {attribution}
                </Typography>
              )}
              {attribution && role && (
                <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                  {' '}&mdash;{' '}{role}
                </Typography>
              )}
              {!attribution && role && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {role}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  // default: left-border
  return (
    <Box
      component="blockquote"
      sx={{
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        pl: 3,
        ml: 0,
        my: 0,
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.0625rem', sm: '1.125rem' },
          fontStyle: 'italic',
          color: 'text.primary',
          lineHeight: 1.75,
          fontWeight: 500,
        }}
      >
        &ldquo;{quote}&rdquo;
      </Typography>
      {(attribution || role) && (
        <Box sx={{ mt: 1.5 }}>
          {attribution && (
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {attribution}
            </Typography>
          )}
          {role && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {role}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
