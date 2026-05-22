'use client';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import type { SnackbarOrigin } from '@mui/material/Snackbar';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  variant?: 'filled' | 'outlined' | 'standard';
  duration?: number;
  position?: SnackbarOrigin;
  sx?: SxProps<Theme>;
}

export default function AppToast({
  open,
  onClose,
  message,
  severity = 'info',
  variant = 'filled',
  duration = 4000,
  position = { vertical: 'bottom', horizontal: 'left' },
  sx,
}: AppToastProps) {
  function handleClose(_: unknown, reason?: string) {
    if (reason === 'clickaway') return;
    onClose();
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={position}
      sx={sx}
    >
      <Alert severity={severity} variant={variant} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
