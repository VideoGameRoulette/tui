'use client';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SocialIcons from './SocialIcons';
import { company, navigation, CURRENT_YEAR } from './shared';

const navColumns = [
  { title: 'Solutions', links: navigation.solutions },
  { title: 'Support', links: navigation.support },
  { title: 'Company', links: navigation.company },
  { title: 'Legal', links: navigation.legal },
];

export default function FooterFourColSimple() {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, lg: 8 }, py: { xs: 10, sm: 12 } }}>
        {/* Logo */}
        <Box
          component="img"
          src={dark ? company.logoSrcDark : company.logoSrc}
          alt={company.name}
          sx={{ height: 32, width: 'auto', mb: 8 }}
        />

        {/* Nav columns */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: { xs: 8, sm: 4 },
          }}
        >
          {navColumns.map((col) => (
            <Box key={col.title}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem', mb: 2.5 }}
              >
                {col.title}
              </Typography>
              <Box
                component="ul"
                sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}
              >
                {col.links.map((link) => (
                  <Box component="li" key={link.name}>
                    <Box
                      component="a"
                      href={link.href}
                      sx={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': { color: 'text.primary' },
                      }}
                    >
                      {link.name}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom */}
        <Divider sx={{ mt: 8, mb: 4 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <SocialIcons />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &copy; {CURRENT_YEAR} {company.name}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
