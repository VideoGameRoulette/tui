'use client';

import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

export interface BlogPostCardProps {
  title: string;
  excerpt?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  category?: string;
  authorName: string;
  authorAvatarUrl?: string;
  date: string;
  href?: string;
  sx?: SxProps<Theme>;
}

export default function BlogPostCard({
  title,
  excerpt,
  thumbnailUrl,
  thumbnailAlt = '',
  category,
  authorName,
  authorAvatarUrl,
  date,
  href = '#',
  sx,
}: BlogPostCardProps) {
  return (
    <MuiCard
      variant="outlined"
      sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', ...sx }}
    >
      <CardActionArea
        component="a"
        href={href}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {thumbnailUrl && (
          <Box sx={{ aspectRatio: '16/9', overflow: 'hidden', bgcolor: 'action.hover' }}>
            <Box
              component="img"
              src={thumbnailUrl}
              alt={thumbnailAlt}
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s',
                'a:hover &': { transform: 'scale(1.04)' },
              }}
            />
          </Box>
        )}
        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {category && (
            <Chip
              label={category}
              size="small"
              color="primary"
              sx={{ alignSelf: 'flex-start', fontWeight: 600 }}
            />
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {title}
          </Typography>
          {excerpt && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7, flex: 1 }}
            >
              {excerpt}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Avatar
              src={authorAvatarUrl}
              alt={authorName}
              sx={{ width: 28, height: 28 }}
            />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {authorName}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
              {date}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
}
