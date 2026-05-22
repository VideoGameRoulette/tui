'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import type { SxProps, Theme } from '@mui/material/styles';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface AppSelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
}

export default function AppSelect({
  options,
  value = '',
  onChange,
  label,
  placeholder,
  error,
  helperText,
  disabled,
  required,
  fullWidth = true,
  size = 'medium',
  sx,
}: AppSelectProps) {
  const labelId = label ? `${label.toLowerCase().replace(/\s+/g, '-')}-label` : undefined;

  function handleChange(e: SelectChangeEvent<string | number>) {
    onChange?.(e.target.value);
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      required={required}
      size={size}
      sx={sx}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        value={value}
        onChange={handleChange}
        label={label}
        displayEmpty={!!placeholder}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <span style={{ opacity: 0.6 }}>{placeholder}</span>
          </MenuItem>
        )}
        {options.map(opt => (
          <MenuItem key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
