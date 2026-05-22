'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AuthorSocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface AuthorBioBlockProps {
  name: string;
  avatarUrl?: string;
  role?: string;
  bio?: string;
  socialLinks?: AuthorSocialLink[];
  followHref?: string;
  followLabel?: string;
  variant?: 'card' | 'inline';
  sx?: SxProps<Theme>;
}

export default function AuthorBioBlock({
  name,
  avatarUrl,
  role,
  bio,
  socialLinks = [],
  followHref,
  followLabel = 'Follow',
  variant = 'card',
  sx,
}: AuthorBioBlockProps) {
  const isCard = variant === 'card';

  return (
    <Box
      sx={{
        ...(isCard && {
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: 3,
          bgcolor: 'background.paper',
        }),
        ...sx,
      }}
    >
      {isCard && (
        <Typography variant="overline" color="text.disabled" fontWeight={600} display="block" mb={2}>
          About the author
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{ width: isCard ? 64 : 48, height: isCard ? 64 : 48, flexShrink: 0 }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
              {name}
            </Typography>
            {followHref && (
              <Button
                component="a"
                href={followHref}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                variant="outlined"
                sx={{ ml: 'auto', flexShrink: 0 }}
              >
                {followLabel}
              </Button>
            )}
          </Box>

          {role && (
            <Typography variant="body2" color="primary.main" fontWeight={600} mb={bio ? 1 : 0}>
              {role}
            </Typography>
          )}

          {bio && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {bio}
            </Typography>
          )}

          {socialLinks.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5, ml: -0.5 }}>
              {socialLinks.map((link, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  size="small"
                  sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
