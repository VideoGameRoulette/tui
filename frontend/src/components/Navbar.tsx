'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  brand?: React.ReactNode;
  links?: NavLink[];
  actions?: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'transparent';
}

export default function Navbar({
  brand = 'Brand',
  links = [],
  actions,
  variant = 'filled',
}: NavbarProps) {
  const isOutlined = variant === 'outlined';
  const isTransparent = variant === 'transparent';

  return (
    <AppBar
      position="static"
      elevation={isOutlined || isTransparent ? 0 : 1}
      sx={{
        bgcolor: isTransparent
          ? 'transparent'
          : isOutlined
          ? 'background.paper'
          : 'primary.main',
        border: isOutlined ? '1px solid' : 'none',
        borderColor: 'divider',
        color: isOutlined ? 'text.primary' : undefined,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 700, letterSpacing: '-0.02em', mr: 4 }}
        >
          {brand}
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, flexGrow: 1 }}>
          {links.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              color="inherit"
              size="small"
              sx={{ fontWeight: 500 }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {actions && <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>{actions}</Box>}
      </Toolbar>
    </AppBar>
  );
}
