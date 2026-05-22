'use client';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { userNavItems } from './shared';

export default function ProfileMenu({
  anchorEl,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      slotProps={{
        paper: {
          elevation: 4,
          sx: {
            mt: 0.5,
            minWidth: 192,
            borderRadius: 1,
            outline: '1px solid rgba(0,0,0,0.05)',
            '& .MuiMenuItem-root': {
              fontSize: '0.875rem',
              color: '#374151',
              py: '6px',
              px: 2,
              '&:hover': { bgcolor: '#f3f4f6' },
            },
          },
        },
      }}
    >
      {userNavItems.map((item) => (
        <MenuItem key={item.name} onClick={onClose}>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
}
