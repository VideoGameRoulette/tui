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

export default function FooterFourColMission() {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, lg: 8 }, py: { xs: 10, sm: 12 } }}>
        {/* Main grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '240px 1fr', lg: '280px 1fr' },
            gap: { xs: 8, md: 12 },
          }}
        >
          {/* Company mission */}
          <Box>
            <Box
              component="img"
              src={dark ? company.logoSrcDark : company.logoSrc}
              alt={company.name}
              sx={{ height: 32, width: 'auto' }}
            />
            <Typography
              variant="body2"
              sx={{ mt: 2.5, color: 'text.secondary', lineHeight: 1.75, maxWidth: 240 }}
            >
              {company.description}
            </Typography>
          </Box>

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
        </Box>

        {/* Bottom bar */}
        <Divider sx={{ mt: 8, mb: 4 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &copy; {CURRENT_YEAR} {company.name}. All rights reserved.
          </Typography>
          <SocialIcons />
        </Box>
      </Container>
    </Box>
  );
}
