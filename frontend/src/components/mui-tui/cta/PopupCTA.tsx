'use client';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface PopupCTAProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  ctaLabel?: string;
  onCTA?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  maxWidth?: 'xs' | 'sm' | 'md';
  sx?: SxProps<Theme>;
}

export default function PopupCTA({
  open,
  onClose,
  title,
  description,
  children,
  ctaLabel = 'Get started',
  onCTA,
  secondaryLabel,
  onSecondary,
  maxWidth = 'sm',
  sx,
}: PopupCTAProps) {
  function handleCTA() {
    onCTA?.();
    onClose();
  }

  function handleSecondary() {
    onSecondary?.();
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, ...sx } }}
    >
      <DialogTitle
        sx={{ pr: 6, fontWeight: 700, fontSize: '1.25rem' }}
      >
        {title}
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="close"
          sx={{ position: 'absolute', top: 12, right: 12, color: 'text.secondary' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={!!children}>
        {description && (
          <DialogContentText sx={{ mb: children ? 2 : 0 }}>
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        {secondaryLabel && (
          <Button variant="outlined" onClick={handleSecondary}>
            {secondaryLabel}
          </Button>
        )}
        <Button variant="contained" disableElevation onClick={handleCTA}>
          {ctaLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
