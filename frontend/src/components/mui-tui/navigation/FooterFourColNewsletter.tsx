'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { company, navigation, CURRENT_YEAR } from './shared';

const navColumns = [
  { title: 'Solutions', links: navigation.solutions },
  { title: 'Support', links: navigation.support },
  { title: 'Company', links: navigation.company },
];

export default function FooterFourColNewsletter() {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [email, setEmail] = useState('');

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, lg: 8 }, py: { xs: 10, sm: 12 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' },
            gap: { xs: 8, lg: 16 },
          }}
        >
          {/* Left: logo + newsletter form */}
          <Box>
            <Box
              component="img"
              src={dark ? company.logoSrcDark : company.logoSrc}
              alt={company.name}
              sx={{ height: 32, width: 'auto', mb: 4 }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem', mb: 1 }}
            >
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              The latest news, articles, and resources, sent to your inbox weekly.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <OutlinedInput
                size="small"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ flexGrow: 1, fontSize: '0.875rem', minWidth: 0 }}
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

          {/* Right: nav columns */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
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
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &copy; {CURRENT_YEAR} {company.name}. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
            {navigation.legal.map((link) => (
              <Box
                key={link.name}
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
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
