'use client';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { SxProps, Theme } from '@mui/material/styles';

export interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  label?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export default function SearchInput({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search…',
  label,
  size = 'small',
  fullWidth = false,
  disabled,
  sx,
}: SearchInputProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') onSearch?.(value);
  }

  function handleClear() {
    if (!isControlled) setInternal('');
    onChange?.('');
    onClear?.();
  }

  return (
    <TextField
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      label={label}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={sx}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                fontSize="small"
                sx={{ color: 'text.secondary', cursor: onSearch ? 'pointer' : 'default' }}
                onClick={() => onSearch?.(value)}
              />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear} aria-label="clear search" edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
}
