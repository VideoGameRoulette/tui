'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface PageHeaderProps {
  breadcrumbs?: Array<{ label: string; href?: string }>;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  divider?: boolean;
}

export default function PageHeader({
  breadcrumbs,
  title,
  description,
  actions,
  divider = true,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: { xs: 6, sm: 8 },
        pb: { xs: 4, sm: 6 },
        ...(divider && { borderBottom: '1px solid', borderColor: 'divider' }),
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 3, sm: 6, lg: 8 } }}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <MuiBreadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
            aria-label="breadcrumb"
            sx={{ mb: 2 }}
          >
            {breadcrumbs.map((crumb, index) =>
              crumb.href ? (
                <Link
                  key={index}
                  href={crumb.href}
                  underline="hover"
                  sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <Typography
                  key={index}
                  sx={{ fontSize: '0.875rem', color: 'text.primary' }}
                >
                  {crumb.label}
                </Typography>
              )
            )}
          </MuiBreadcrumbs>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'flex-start' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                sx={{ mt: 1.5, fontSize: '1rem', color: 'text.secondary', lineHeight: 1.65 }}
              >
                {description}
              </Typography>
            )}
          </Box>

          {actions && (
            <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0, alignSelf: { sm: 'flex-start' } }}>
              {actions}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
