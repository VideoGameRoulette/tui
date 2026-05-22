'use client';

import type { ReactNode } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { SxProps, Theme } from '@mui/material/styles';

export type FieldStatus = 'default' | 'error' | 'success' | 'warning';

const STATUS: Record<FieldStatus, { color?: string; Icon?: React.ElementType }> = {
  default: {},
  error:   { color: 'error.main',   Icon: ErrorOutlineIcon },
  success: { color: 'success.main', Icon: CheckCircleOutlineIcon },
  warning: { color: 'warning.main', Icon: WarningAmberIcon },
};

export interface FormFieldProps {
  label?: string;
  helperText?: string;
  status?: FieldStatus;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export default function FormField({
  label,
  helperText,
  status = 'default',
  required,
  disabled,
  fullWidth = true,
  children,
  sx,
}: FormFieldProps) {
  const { color, Icon } = STATUS[status];

  return (
    <FormControl
      fullWidth={fullWidth}
      error={status === 'error'}
      disabled={disabled}
      required={required}
      sx={sx}
    >
      {label && (
        <FormLabel
          sx={{
            mb: 1,
            fontWeight: 500,
            color: color ?? 'text.primary',
            '&.Mui-disabled': { color: 'text.disabled' },
          }}
        >
          {label}
        </FormLabel>
      )}
      {children}
      {helperText && (
        <FormHelperText
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: color ?? 'text.secondary',
            mt: 0.5,
          }}
        >
          {Icon && (
            <Box component={Icon} sx={{ fontSize: 14, flexShrink: 0 }} />
          )}
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
