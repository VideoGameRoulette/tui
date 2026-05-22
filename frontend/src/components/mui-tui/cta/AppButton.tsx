'use client';

import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import type { SxProps, Theme } from '@mui/material/styles';

type AppVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

const variantMap: Record<
  AppVariant,
  { variant: 'contained' | 'outlined' | 'text'; color: 'primary' | 'secondary' | 'error' }
> = {
  primary:     { variant: 'contained', color: 'primary' },
  secondary:   { variant: 'contained', color: 'secondary' },
  ghost:       { variant: 'outlined',  color: 'primary' },
  destructive: { variant: 'contained', color: 'error' },
};

export interface AppButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'color'> {
  appVariant?: AppVariant;
  loading?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppButton({
  appVariant = 'primary',
  loading = false,
  disabled,
  children,
  sx,
  ...props
}: AppButtonProps) {
  const { variant, color } = variantMap[appVariant];

  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled || loading}
      disableElevation
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : props.startIcon}
      sx={sx}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
