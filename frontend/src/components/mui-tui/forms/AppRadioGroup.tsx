'use client';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { SxProps, Theme } from '@mui/material/styles';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AppRadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  row?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
}

export default function AppRadioGroup({
  options,
  value,
  onChange,
  label,
  row = false,
  error,
  helperText,
  disabled,
  required,
  color = 'primary',
  size = 'medium',
  sx,
}: AppRadioGroupProps) {
  return (
    <FormControl
      component="fieldset"
      error={error}
      disabled={disabled}
      required={required}
      sx={sx}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value)}
        row={row}
      >
        {options.map(opt => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            label={opt.label}
            disabled={opt.disabled}
            control={<Radio color={color} size={size} />}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
