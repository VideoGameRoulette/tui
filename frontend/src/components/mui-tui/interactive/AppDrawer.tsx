'use client';

import type { ReactNode } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import type { DrawerProps } from '@mui/material/Drawer';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: DrawerProps['anchor'];
  width?: number | string;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppDrawer({
  open,
  onClose,
  anchor = 'right',
  width = 360,
  title,
  children,
  footer,
  showCloseButton = true,
  sx,
}: AppDrawerProps) {
  const isHorizontal = anchor === 'left' || anchor === 'right';

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={anchor}
      sx={sx}
      slotProps={{
        paper: {
          sx: {
            ...(isHorizontal ? { width } : { height: 'auto', maxHeight: '80vh' }),
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Header */}
      {(title || showCloseButton) && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
              flexShrink: 0,
            }}
          >
            {title && (
              <Typography variant="h6" fontWeight={700}>
                {title}
              </Typography>
            )}
            {showCloseButton && (
              <IconButton
                onClick={onClose}
                size="small"
                aria-label="close drawer"
                sx={{ ml: 'auto', color: 'text.secondary' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Divider />
        </>
      )}

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        {children}
      </Box>

      {/* Footer */}
      {footer && (
        <>
          <Divider />
          <Box sx={{ p: 2, flexShrink: 0 }}>
            {footer}
          </Box>
        </>
      )}
    </Drawer>
  );
}
