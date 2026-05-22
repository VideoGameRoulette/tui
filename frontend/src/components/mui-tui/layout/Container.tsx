'use client';

import MuiContainer from '@mui/material/Container';
import type { ContainerProps as MuiContainerProps } from '@mui/material/Container';

export interface ContainerProps extends Omit<MuiContainerProps, 'maxWidth'> {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  padded?: boolean;
}

export default function Container({
  maxWidth = 'xl',
  padded = true,
  sx,
  children,
  ...props
}: ContainerProps) {
  return (
    <MuiContainer
      maxWidth={maxWidth}
      disableGutters
      sx={{
        px: padded ? { xs: 3, sm: 6, lg: 8 } : 0,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
}
