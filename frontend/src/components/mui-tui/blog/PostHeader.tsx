'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps, Theme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export interface PostAuthor {
  name: string;
  avatarUrl?: string;
  href?: string;
}

export interface PostHeaderProps {
  title: string;
  author?: PostAuthor;
  date?: string;
  readTime?: string;
  category?: string;
  categoryHref?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  excerpt?: string;
  sx?: SxProps<Theme>;
}

export default function PostHeader({
  title,
  author,
  date,
  readTime,
  category,
  categoryHref,
  heroImageUrl,
  heroImageAlt,
  excerpt,
  sx,
}: PostHeaderProps) {
  return (
    <Box component="header" sx={{ display: 'flex', flexDirection: 'column', gap: 3, ...sx }}>
      {/* Category */}
      {category && (
        <Box>
          <Chip
            label={category}
            color="primary"
            size="small"
            component={categoryHref ? 'a' : 'div'}
            href={categoryHref}
            clickable={!!categoryHref}
            sx={{ fontWeight: 600, textDecoration: 'none' }}
          />
        </Box>
      )}

      {/* Title */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </Typography>

      {/* Excerpt */}
      {excerpt && (
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          sx={{ fontWeight: 400, lineHeight: 1.65, fontSize: { xs: '1rem', sm: '1.125rem' } }}
        >
          {excerpt}
        </Typography>
      )}

      {/* Author + meta row */}
      {(author || date || readTime) && (
        <>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            {author && (
              <Box
                component={author.href ? 'a' : 'div'}
                href={author.href}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', color: 'inherit' }}
              >
                <Avatar
                  src={author.avatarUrl}
                  alt={author.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="subtitle2" fontWeight={700}>
                  {author.name}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: author ? 'auto' : 0 }}>
              {date && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary">
                    {date}
                  </Typography>
                </Box>
              )}
              {readTime && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary">
                    {readTime}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Divider />
        </>
      )}

      {/* Hero image */}
      {heroImageUrl && (
        <Box
          component="figure"
          sx={{ m: 0, borderRadius: 3, overflow: 'hidden', aspectRatio: '16/9', bgcolor: 'action.hover' }}
        >
          <Box
            component="img"
            src={heroImageUrl}
            alt={heroImageAlt ?? title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      )}
    </Box>
  );
}
