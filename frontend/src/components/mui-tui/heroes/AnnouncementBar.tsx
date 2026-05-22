'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CelebrationIcon from '@mui/icons-material/Celebration';

type Severity = 'brand' | 'info' | 'success' | 'warning';

const SEVERITY_COLORS: Record<Severity, { bg: string; bgDark: string; text: string }> = {
  brand:   { bg: '#4f46e5', bgDark: '#3730a3', text: '#ffffff' },
  info:    { bg: '#0ea5e9', bgDark: '#0284c7', text: '#ffffff' },
  success: { bg: '#10b981', bgDark: '#059669', text: '#ffffff' },
  warning: { bg: '#f59e0b', bgDark: '#d97706', text: '#ffffff' },
};

export interface AnnouncementBarProps {
  message?: string;
  linkLabel?: string;
  linkHref?: string;
  severity?: Severity;
  icon?: React.ReactNode;
  dismissible?: boolean;
}

export default function AnnouncementBar({
  message = 'Big news! We just released a brand new feature.',
  linkLabel = 'Read more',
  linkHref = '#',
  severity = 'brand',
  icon = <CelebrationIcon sx={{ fontSize: 16 }} />,
  dismissible = true,
}: AnnouncementBarProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const colors = SEVERITY_COLORS[severity];
  const bg = dark ? colors.bgDark : colors.bg;

  return (
    <Box
      role="banner"
      sx={{
        bgcolor: bg,
        py: 1.5,
        px: { xs: 3, sm: 6, lg: 8 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        position: 'relative',
      }}
    >
      {/* Icon */}
      {icon && (
        <Box sx={{ color: colors.text, display: 'flex', flexShrink: 0 }}>
          {icon}
        </Box>
      )}

      {/* Message + link */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: { xs: 0.5, sm: 1 },
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: colors.text, fontWeight: 500, fontSize: '0.875rem' }}
        >
          {message}
        </Typography>

        {linkLabel && (
          <Box
            component="a"
            href={linkHref}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: colors.text,
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': { opacity: 0.85 },
            }}
          >
            {linkLabel}
            <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </Box>
        )}
      </Box>

      {/* Dismiss */}
      {dismissible && (
        <Box sx={{ position: 'absolute', right: { xs: 8, sm: 16 } }}>
          <IconButton
            size="small"
            aria-label="Dismiss announcement"
            onClick={() => setVisible(false)}
            sx={{ color: colors.text, opacity: 0.8, '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.15)' } }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
