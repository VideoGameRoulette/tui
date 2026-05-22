'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import SocialIcons from './SocialIcons';
import { company, navigation, CURRENT_YEAR } from './shared';

const navColumns = [
  { title: 'Solutions', links: navigation.solutions },
  { title: 'Support', links: navigation.support },
  { title: 'Company', links: navigation.company },
  { title: 'Legal', links: navigation.legal },
];

export default function FooterFourColNewsletterBelow() {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [email, setEmail] = useState('');

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, lg: 8 }, py: { xs: 10, sm: 12 } }}>
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

        {/* Newsletter section */}
        <Box
          sx={{
            mt: 8,
            pt: 8,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'flex-start' },
            justifyContent: { md: 'space-between' },
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: 420 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem', mb: 0.5 }}
            >
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              The latest news, articles, and resources, sent to your inbox weekly.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
            <OutlinedInput
              size="small"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ flexGrow: 1, minWidth: { md: 256 }, fontSize: '0.875rem' }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setEmail('')}
              sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
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
