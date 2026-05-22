'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const LOGO_SRC =
  'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600';
const LOGO_SRC_DARK =
  'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500';

interface NavItem {
  name: string;
  value: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { name: 'Dashboard', value: 'dashboard', icon: DashboardIcon, href: '#' },
      { name: 'Team', value: 'team', icon: GroupIcon, href: '#' },
      { name: 'Projects', value: 'projects', icon: FolderIcon, href: '#', badge: 3 },
      { name: 'Calendar', value: 'calendar', icon: CalendarMonthIcon, href: '#' },
      { name: 'Documents', value: 'documents', icon: DescriptionIcon, href: '#' },
      { name: 'Reports', value: 'reports', icon: BarChartIcon, href: '#' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { name: 'Settings', value: 'settings', icon: SettingsIcon, href: '#' },
      { name: 'Help & support', value: 'help', icon: HelpOutlineIcon, href: '#' },
    ],
  },
];

const USER = {
  name: 'Tom Cook',
  role: 'Admin',
  avatarSrc:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export interface SidebarNavProps {
  defaultActive?: string;
  width?: number;
}

export default function SidebarNav({ defaultActive = 'dashboard', width = 256 }: SidebarNavProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [active, setActive] = useState(defaultActive);

  return (
    <Box
      component="nav"
      aria-label="Sidebar navigation"
      sx={{
        width,
        flexShrink: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, py: 3, display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
        <Box
          component="img"
          src={dark ? LOGO_SRC_DARK : LOGO_SRC}
          alt="Logo"
          sx={{ height: 32, width: 'auto' }}
        />
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>
          Acme Inc.
        </Typography>
      </Box>

      <Divider />

      {/* Nav groups */}
      <Box sx={{ flexGrow: 1, py: 1.5, px: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {NAV_GROUPS.map((group, groupIndex) => (
          <Box key={groupIndex}>
            {group.title && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  px: 1.5,
                  py: 1,
                  fontWeight: 600,
                  color: 'text.disabled',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {group.title}
              </Typography>
            )}
            {groupIndex > 0 && !group.title && <Divider sx={{ my: 1 }} />}
            <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.value;
                return (
                  <ListItem key={item.value} disablePadding>
                    <ListItemButton
                      component="a"
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(item.value);
                      }}
                      sx={{
                        borderRadius: 1.5,
                        px: 1.5,
                        py: 1,
                        bgcolor: isActive ? 'action.selected' : 'transparent',
                        color: isActive ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                          bgcolor: isActive ? 'action.selected' : 'action.hover',
                          color: isActive ? 'primary.main' : 'text.primary',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                        <Icon sx={{ fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          fontSize: '0.9375rem',
                          fontWeight: isActive ? 600 : 500,
                          color: 'inherit',
                        }}
                      />
                      {item.badge !== undefined && (
                        <Box
                          sx={{
                            ml: 'auto',
                            minWidth: 20,
                            height: 20,
                            borderRadius: 10,
                            bgcolor: isActive ? 'primary.main' : (dark ? 'rgba(255,255,255,0.12)' : 'grey.200'),
                            color: isActive ? 'primary.contrastText' : 'text.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            px: 0.75,
                          }}
                        >
                          {item.badge}
                        </Box>
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* User footer */}
      <Divider />
      <Box
        sx={{
          px: 2,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexShrink: 0,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <Avatar
          src={USER.avatarSrc}
          sx={{ width: 36, height: 36, flexShrink: 0 }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'text.primary', lineHeight: 1.3 }}
            noWrap
          >
            {USER.name}
          </Typography>
          <Typography
            sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.3 }}
            noWrap
          >
            {USER.role}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
