'use client';

import type { ReactNode, ReactElement } from 'react';
import Tooltip from '@mui/material/Tooltip';
import type { TooltipProps } from '@mui/material/Tooltip';

export interface AppTooltipProps extends Omit<TooltipProps, 'title' | 'children'> {
  content: ReactNode;
  maxWidth?: number | string;
  children: ReactElement;
}

export default function AppTooltip({
  content,
  maxWidth = 220,
  arrow = true,
  placement = 'top',
  enterDelay = 200,
  children,
  componentsProps,
  ...props
}: AppTooltipProps) {
  return (
    <Tooltip
      title={content}
      arrow={arrow}
      placement={placement}
      enterDelay={enterDelay}
      componentsProps={{
        tooltip: {
          sx: { maxWidth, ...componentsProps?.tooltip?.sx },
        },
        ...componentsProps,
      }}
      {...props}
    >
      {children}
    </Tooltip>
  );
}
