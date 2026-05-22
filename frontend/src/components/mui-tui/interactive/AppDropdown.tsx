'use client';

import { useState, cloneElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import type { SxProps, Theme } from '@mui/material/styles';

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  dividerAfter?: boolean;
  href?: string;
}

export interface AppDropdownProps {
  trigger: ReactElement;
  items: DropdownItem[];
  minWidth?: number;
  sx?: SxProps<Theme>;
}

export default function AppDropdown({
  trigger,
  items,
  minWidth = 180,
  sx,
}: AppDropdownProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);

  const triggerEl = cloneElement(trigger, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      setAnchor(e.currentTarget);
      (trigger.props as { onClick?: React.MouseEventHandler<HTMLElement> }).onClick?.(e);
    },
    'aria-haspopup': 'true',
    'aria-expanded': open ? 'true' : undefined,
  });

  function close() {
    setAnchor(null);
  }

  return (
    <>
      {triggerEl}
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={close}
        slotProps={{ paper: { sx: { minWidth, borderRadius: 2, mt: 0.5 } } }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        sx={sx}
      >
        {items.map((item, i) => [
          item.href ? (
            <MenuItem
              key={i}
              component="a"
              href={item.href}
              disabled={item.disabled}
              onClick={close}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ) : (
            <MenuItem
              key={i}
              disabled={item.disabled}
              onClick={() => { item.onClick?.(); close(); }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ),
          item.dividerAfter && <Divider key={`d-${i}`} />,
        ])}
      </Menu>
    </>
  );
}
