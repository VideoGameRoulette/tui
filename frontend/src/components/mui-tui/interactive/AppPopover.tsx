'use client';

import { useState, cloneElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppPopoverProps {
  trigger: ReactElement;
  content: ReactNode;
  title?: string;
  maxWidth?: number | string;
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  sx?: SxProps<Theme>;
}

export default function AppPopover({
  trigger,
  content,
  title,
  maxWidth = 320,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  sx,
}: AppPopoverProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);
  const id = open ? 'app-popover' : undefined;

  const triggerEl = cloneElement(trigger, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      setAnchor(prev => (prev ? null : e.currentTarget));
      (trigger.props as { onClick?: React.MouseEventHandler<HTMLElement> }).onClick?.(e);
    },
    'aria-describedby': id,
  });

  return (
    <>
      {triggerEl}
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        slotProps={{
          paper: {
            sx: {
              maxWidth,
              borderRadius: 2,
              boxShadow: 4,
              mt: 0.5,
            },
          },
        }}
        sx={sx}
      >
        <Box sx={{ p: 2.5 }}>
          {title && (
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              {title}
            </Typography>
          )}
          {typeof content === 'string' ? (
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          ) : (
            content
          )}
        </Box>
      </Popover>
    </>
  );
}
