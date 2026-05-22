'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';
import type { SxProps, Theme } from '@mui/material/styles';

export type TagColor = ChipProps['color'];

export interface TagBadgeProps {
  label: string;
  color?: TagColor;
  href?: string;
  onClick?: () => void;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  sx?: SxProps<Theme>;
}

export function TagBadge({
  label,
  color = 'default',
  href,
  onClick,
  size = 'small',
  variant = 'filled',
  sx,
}: TagBadgeProps) {
  const clickable = !!(href || onClick);

  return (
    <Chip
      label={label}
      color={color}
      size={size}
      variant={variant}
      clickable={clickable}
      component={href ? 'a' : 'div'}
      href={href}
      onClick={onClick}
      sx={{ fontWeight: 600, textDecoration: 'none', ...sx }}
    />
  );
}

// ─── Tag Group ────────────────────────────────────────────────────────────────

export interface TagBadgeGroupProps {
  tags: string[] | TagBadgeProps[];
  color?: TagColor;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  gap?: number;
  sx?: SxProps<Theme>;
}

export function TagBadgeGroup({
  tags,
  color = 'default',
  size = 'small',
  variant = 'filled',
  gap = 1,
  sx,
}: TagBadgeGroupProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap, ...sx }}>
      {tags.map((tag, i) => {
        const props: TagBadgeProps =
          typeof tag === 'string'
            ? { label: tag, color, size, variant }
            : { color, size, variant, ...tag };
        return <TagBadge key={i} {...props} />;
      })}
    </Box>
  );
}

export default TagBadge;
