'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BlogPostCard from '../cards/BlogPostCard';
import type { BlogPostCardProps } from '../cards/BlogPostCard';
import type { SxProps, Theme } from '@mui/material/styles';

const DEFAULT_POSTS: BlogPostCardProps[] = [
  {
    title: 'Getting started with the new API',
    excerpt: 'A comprehensive introduction to the redesigned endpoint structure and authentication flow.',
    category: 'Developer',
    authorName: 'Alex Kim',
    date: 'May 10, 2026',
    href: '#',
  },
  {
    title: 'Design tokens: a practical guide',
    excerpt: 'How we moved from hardcoded values to a scalable token system across every product surface.',
    category: 'Design',
    authorName: 'Maria Santos',
    date: 'May 3, 2026',
    href: '#',
  },
  {
    title: 'Scaling to 10 million users',
    excerpt: 'The infrastructure decisions that kept our platform stable through unexpected growth.',
    category: 'Engineering',
    authorName: 'James Wu',
    date: 'Apr 28, 2026',
    href: '#',
  },
];

export interface RelatedPostsProps {
  posts?: BlogPostCardProps[];
  title?: string;
  layout?: 'row' | 'grid';
  cols?: 1 | 2 | 3;
  sx?: SxProps<Theme>;
}

export default function RelatedPosts({
  posts = DEFAULT_POSTS,
  title = 'Related Posts',
  layout = 'grid',
  cols = 3,
  sx,
}: RelatedPostsProps) {
  const smCols = Math.min(cols, 2);

  return (
    <Box sx={sx}>
      {title && (
        <Typography variant="h5" fontWeight={800} mb={3}>
          {title}
        </Typography>
      )}

      <Box
        sx={
          layout === 'row'
            ? {
                display: 'flex',
                gap: 3,
                overflowX: 'auto',
                pb: 1,
                '& > *': { flex: '0 0 280px', maxWidth: 320 },
              }
            : {
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: `repeat(${smCols}, 1fr)`,
                  md: `repeat(${cols}, 1fr)`,
                },
                gap: 3,
              }
        }
      >
        {posts.map((post, i) => (
          <BlogPostCard key={i} {...post} />
        ))}
      </Box>
    </Box>
  );
}
