'use client';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SocialIcons from './SocialIcons';
import { company, navigation, CURRENT_YEAR } from './shared';

const navColumns = [
  { title: 'Solutions', links: navigation.solutions },
  { title: 'Support', links: navigation.support },
  { title: 'Company', links: navigation.company },
  { title: 'Legal', links: navigation.legal },
];

export default function FooterFourColCTA() {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, lg: 8 } }}>
        {/* CTA section */}
        <Box
          sx={{
            py: { xs: 8, sm: 10 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 4, sm: 8 },
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
              Boost your productivity.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Start using our app today. Free forever. No credit card required.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
            <Button
              variant="outlined"
              color="inherit"
              size="medium"
              sx={{ borderColor: 'divider', whiteSpace: 'nowrap' }}
            >
              Learn more
            </Button>
            <Button variant="contained" color="primary" size="medium" sx={{ whiteSpace: 'nowrap' }}>
              Get started
            </Button>
          </Box>
        </Box>

        {/* Nav columns */}
        <Box
          sx={{
            py: { xs: 8, sm: 10 },
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: { xs: 8, sm: 4 },
            borderBottom: '1px solid',
            borderColor: 'divider',
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

        {/* Bottom bar */}
        <Box
          sx={{
            py: 6,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box
            component="img"
            src={dark ? company.logoSrcDark : company.logoSrc}
            alt={company.name}
            sx={{ height: 28, width: 'auto' }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &copy; {CURRENT_YEAR} {company.name}. All rights reserved.
          </Typography>
          <SocialIcons />
        </Box>
      </Container>
    </Box>
  );
}
