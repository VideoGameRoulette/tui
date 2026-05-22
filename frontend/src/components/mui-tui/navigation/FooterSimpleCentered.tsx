'use client';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SocialIcons from './SocialIcons';
import { company, simpleNavLinks, CURRENT_YEAR } from './shared';

export default function FooterSimpleCentered() {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, lg: 8 }, py: { xs: 8, sm: 10 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          {/* Logo */}
          <Box
            component="img"
            src={dark ? company.logoSrcDark : company.logoSrc}
            alt={company.name}
            sx={{ height: 32, width: 'auto' }}
          />

          {/* Nav links */}
          <Box
            component="nav"
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 3, sm: 4 } }}
          >
            {simpleNavLinks.map((link) => (
              <Box
                key={link.name}
                component="a"
                href={link.href}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {link.name}
              </Box>
            ))}
          </Box>

          {/* Social icons */}
          <SocialIcons spacing={1} />

          {/* Copyright */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &copy; {CURRENT_YEAR} {company.name}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
