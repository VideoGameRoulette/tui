'use client';

import type { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import type { DialogProps } from '@mui/material/Dialog';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  maxWidth?: DialogProps['maxWidth'];
  fullWidth?: boolean;
  dividers?: boolean;
  showCloseButton?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  dividers = false,
  showCloseButton = true,
  sx,
}: AppDialogProps) {
  const hasTitle = title || showCloseButton;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{ sx: { borderRadius: 3 } }}
      sx={sx}
    >
      {hasTitle && (
        <DialogTitle sx={{ pr: showCloseButton ? 6 : undefined, fontWeight: 700 }}>
          {title}
          {showCloseButton && (
            <IconButton
              onClick={onClose}
              size="small"
              aria-label="close dialog"
              sx={{ position: 'absolute', top: 12, right: 12, color: 'text.secondary' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
      )}
      {children && (
        <DialogContent dividers={dividers}>{children}</DialogContent>
      )}
      {actions && (
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>{actions}</DialogActions>
      )}
    </Dialog>
  );
}
