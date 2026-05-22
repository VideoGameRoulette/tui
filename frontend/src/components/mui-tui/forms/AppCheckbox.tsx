'use client';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { SxProps, Theme } from '@mui/material/styles';

// ─── Single Checkbox ─────────────────────────────────────────────────────────

export interface AppCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
}

export function AppCheckbox({
  label,
  checked,
  onChange,
  disabled,
  indeterminate,
  color = 'primary',
  size = 'medium',
  sx,
}: AppCheckboxProps) {
  return (
    <FormControlLabel
      label={label}
      disabled={disabled}
      sx={sx}
      control={
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={e => onChange?.(e.target.checked)}
          color={color}
          size={size}
        />
      }
    />
  );
}

// ─── Checkbox Group ───────────────────────────────────────────────────────────

export interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AppCheckboxGroupProps {
  options: CheckboxGroupOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  label?: string;
  row?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export function AppCheckboxGroup({
  options,
  value = [],
  onChange,
  label,
  row = false,
  error,
  helperText,
  disabled,
  sx,
}: AppCheckboxGroupProps) {
  function toggle(optValue: string) {
    const next = value.includes(optValue)
      ? value.filter(v => v !== optValue)
      : [...value, optValue];
    onChange?.(next);
  }

  return (
    <FormControl component="fieldset" error={error} disabled={disabled} sx={sx}>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map(opt => (
          <FormControlLabel
            key={opt.value}
            label={opt.label}
            disabled={opt.disabled}
            control={
              <Checkbox
                checked={value.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                color="primary"
              />
            }
          />
        ))}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default AppCheckbox;
