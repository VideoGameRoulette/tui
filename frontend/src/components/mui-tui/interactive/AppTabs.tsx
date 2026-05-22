'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import type { SxProps, Theme } from '@mui/material/styles';

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface AppTabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'standard' | 'fullWidth' | 'scrollable';
  orientation?: 'horizontal' | 'vertical';
  sx?: SxProps<Theme>;
}

export default function AppTabs({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = 'standard',
  orientation = 'horizontal',
  sx,
}: AppTabsProps) {
  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value ?? '');
  const value = isControlled ? controlledValue : internal;

  function handleChange(_: React.SyntheticEvent, next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  const vertical = orientation === 'vertical';

  return (
    <Box
      sx={{
        display: vertical ? 'flex' : 'block',
        gap: vertical ? 0 : undefined,
        ...sx,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant={vertical ? 'standard' : variant}
        orientation={orientation}
        scrollButtons={variant === 'scrollable' ? 'auto' : undefined}
        allowScrollButtonsMobile
        sx={
          vertical
            ? {
                borderRight: 1,
                borderColor: 'divider',
                minWidth: 160,
                flexShrink: 0,
              }
            : {
                borderBottom: 1,
                borderColor: 'divider',
                mb: 0,
              }
        }
      >
        {items.map(item => (
          <Tab
            key={item.value}
            value={item.value}
            label={item.label}
            icon={item.icon as React.ReactElement}
            iconPosition="start"
            disabled={item.disabled}
          />
        ))}
      </Tabs>

      <Box sx={vertical ? { flex: 1, pl: 4 } : { pt: 3 }}>
        {items.map(item => (
          <Box
            key={item.value}
            role="tabpanel"
            hidden={value !== item.value}
            aria-label={item.label}
          >
            {value === item.value && item.content}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
