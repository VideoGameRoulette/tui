'use client';

import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

export type AppInputProps = TextFieldProps;

export default function AppInput(props: AppInputProps) {
  return <TextField {...props} />;
}
