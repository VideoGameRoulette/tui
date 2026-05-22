'use client';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import type { RatingProps } from '@mui/material/Rating';
import type { SxProps, Theme } from '@mui/material/styles';

export interface ReviewStarsProps {
  value?: number;
  onChange?: (value: number | null) => void;
  readOnly?: boolean;
  precision?: number;
  max?: number;
  size?: RatingProps['size'];
  showValue?: boolean;
  count?: number;
  label?: string;
  sx?: SxProps<Theme>;
}

export default function ReviewStars({
  value = 0,
  onChange,
  readOnly = true,
  precision = 0.5,
  max = 5,
  size = 'medium',
  showValue = false,
  count,
  label,
  sx,
}: ReviewStarsProps) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, ...sx }}>
      <Rating
        value={value}
        onChange={readOnly ? undefined : (_, v) => onChange?.(v)}
        readOnly={readOnly}
        precision={precision}
        max={max}
        size={size}
      />
      {(showValue || count != null || label) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {showValue && (
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {value.toFixed(1)}
            </Typography>
          )}
          {count != null && (
            <Typography variant="body2" color="text.secondary">
              ({count.toLocaleString()}{label ? '' : ' reviews'})
            </Typography>
          )}
          {label && (
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
