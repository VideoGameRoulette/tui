'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import PersonIcon from '@mui/icons-material/Person';

interface TabItem {
  label: string;
  value: string;
  icon: React.ElementType;
  badge?: number;
  href?: string;
}

const DEFAULT_TABS: TabItem[] = [
  { label: 'Home',    value: 'home',    icon: HomeIcon   },
  { label: 'Search',  value: 'search',  icon: SearchIcon },
  { label: 'Inbox',   value: 'inbox',   icon: InboxIcon, badge: 4 },
  { label: 'Profile', value: 'profile', icon: PersonIcon },
];

export interface TabBarProps {
  tabs?: TabItem[];
  defaultValue?: string;
  showLabels?: boolean;
}

export default function TabBar({
  tabs = DEFAULT_TABS,
  defaultValue = 'home',
  showLabels = true,
}: TabBarProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [value, setValue] = useState(defaultValue);

  return (
    <Box
      sx={{
        boxShadow: dark
          ? '0 -1px 0 rgba(255,255,255,0.08)'
          : '0 -1px 0 rgba(0,0,0,0.06)',
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        showLabels={showLabels}
        sx={{
          bgcolor: 'background.paper',
          height: 60,
          '& .MuiBottomNavigationAction-root': {
            color: 'text.disabled',
            minWidth: 60,
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.6875rem',
            fontWeight: 500,
            '&.Mui-selected': {
              fontSize: '0.6875rem',
              fontWeight: 600,
            },
          },
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <BottomNavigationAction
              key={tab.value}
              label={tab.label}
              value={tab.value}
              component={tab.href ? 'a' : 'button'}
              href={tab.href}
              icon={
                tab.badge !== undefined ? (
                  <Badge
                    badgeContent={tab.badge}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.6rem',
                        height: 16,
                        minWidth: 16,
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 24 }} />
                  </Badge>
                ) : (
                  <Icon sx={{ fontSize: 24 }} />
                )
              }
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
}
