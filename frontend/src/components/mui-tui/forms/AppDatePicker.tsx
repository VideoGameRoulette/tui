'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export interface AppDatePickerProps {
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  label?: string;
  format?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
}

export default function AppDatePicker({
  value,
  onChange,
  label = 'Date',
  format = 'MM/DD/YYYY',
  minDate,
  maxDate,
  disabled,
  readOnly,
  required,
  error,
  helperText,
  fullWidth = false,
  size = 'medium',
  sx,
}: AppDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ ...(fullWidth && { width: '100%' }), ...sx }}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          readOnly={readOnly}
          slotProps={{
            textField: {
              required,
              error,
              helperText,
              fullWidth,
              size,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
