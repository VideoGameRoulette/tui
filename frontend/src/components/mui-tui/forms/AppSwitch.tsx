'use client';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  helperText?: string;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  sx?: SxProps<Theme>;
}

export default function AppSwitch({
  label,
  checked,
  onChange,
  disabled,
  helperText,
  size = 'medium',
  color = 'primary',
  labelPlacement = 'end',
  sx,
}: AppSwitchProps) {
  const control = (
    <Switch
      checked={checked}
      onChange={e => onChange?.(e.target.checked)}
      disabled={disabled}
      size={size}
      color={color}
    />
  );

  return (
    <FormControl disabled={disabled} sx={sx}>
      {label ? (
        <FormControlLabel
          label={label}
          labelPlacement={labelPlacement}
          control={control}
        />
      ) : (
        control
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
