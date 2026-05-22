'use client';

import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface TeamMemberCardProps {
  name: string;
  title: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: SocialLink[];
  sx?: SxProps<Theme>;
}

export default function TeamMemberCard({
  name,
  title,
  avatarUrl,
  bio,
  socialLinks,
  sx,
}: TeamMemberCardProps) {
  return (
    <MuiCard variant="outlined" sx={{ borderRadius: 3, height: '100%', ...sx }}>
      <CardContent
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 1.5,
        }}
      >
        <Avatar src={avatarUrl} alt={name} sx={{ width: 80, height: 80 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600, mt: 0.25 }}>
            {title}
          </Typography>
        </Box>
        {bio && (
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {bio}
          </Typography>
        )}
        {socialLinks && socialLinks.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {socialLinks.map((link, i) => (
              <IconButton
                key={i}
                href={link.href}
                component="a"
                aria-label={link.label}
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                {link.icon}
              </IconButton>
            ))}
          </Box>
        )}
      </CardContent>
    </MuiCard>
  );
}
