'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InboxIcon from '@mui/icons-material/Inbox';
import type { SxProps, Theme } from '@mui/material/styles';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
}

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  sx?: SxProps<Theme>;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  sx,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: { xs: 8, sm: 12 },
        px: 3,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          bgcolor: 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          color: 'text.secondary',
        }}
      >
        {icon ?? <InboxIcon sx={{ fontSize: 36 }} />}
      </Box>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 360, mb: action ? 4 : 0 }}
        >
          {description}
        </Typography>
      )}

      {(action || secondaryAction) && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: description ? 0 : 4 }}>
          {action && (
            <Button
              variant={action.variant ?? 'contained'}
              disableElevation
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant={secondaryAction.variant ?? 'outlined'}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
