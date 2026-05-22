'use client';

import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

export interface AppTextareaProps extends Omit<TextFieldProps, 'multiline'> {
  minRows?: number;
  maxRows?: number;
}

export default function AppTextarea({
  minRows = 4,
  maxRows,
  ...props
}: AppTextareaProps) {
  return <TextField multiline minRows={minRows} maxRows={maxRows} {...props} />;
}
