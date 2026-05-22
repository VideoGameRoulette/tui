'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import type { PaginationProps } from '@mui/material/Pagination';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AppPaginationProps {
  count: number;
  page?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  size?: PaginationProps['size'];
  variant?: PaginationProps['variant'];
  shape?: PaginationProps['shape'];
  color?: PaginationProps['color'];
  showFirstButton?: boolean;
  showLastButton?: boolean;
  align?: 'left' | 'center' | 'right';
  sx?: SxProps<Theme>;
}

export default function AppPagination({
  count,
  page: controlledPage,
  defaultPage = 1,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
  size = 'medium',
  variant = 'outlined',
  shape = 'rounded',
  color = 'primary',
  showFirstButton = false,
  showLastButton = false,
  align = 'center',
  sx,
}: AppPaginationProps) {
  const isControlled = controlledPage !== undefined;
  const [internal, setInternal] = useState(defaultPage);
  const page = isControlled ? controlledPage : internal;

  function handleChange(_: React.ChangeEvent<unknown>, next: number) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  const justifyMap = { left: 'flex-start', center: 'center', right: 'flex-end' };

  return (
    <Box sx={{ display: 'flex', justifyContent: justifyMap[align], ...sx }}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        size={size}
        variant={variant}
        shape={shape}
        color={color}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
      />
    </Box>
  );
}
