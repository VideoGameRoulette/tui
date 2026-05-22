'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import type { AlertColor } from '@mui/material/Alert';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppAlertProps {
  severity?: AlertColor;
  variant?: 'filled' | 'outlined' | 'standard';
  title?: string;
  closeable?: boolean;
  onClose?: () => void;
  action?: ReactNode;
  icon?: ReactNode | false;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export default function AppAlert({
  severity = 'info',
  variant = 'standard',
  title,
  closeable,
  onClose,
  action,
  icon,
  children,
  sx,
}: AppAlertProps) {
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    onClose?.();
  }

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        variant={variant}
        onClose={closeable ? handleClose : onClose}
        action={action}
        icon={icon}
        sx={sx}
      >
        {title && <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>}
        {children}
      </Alert>
    </Collapse>
  );
}
