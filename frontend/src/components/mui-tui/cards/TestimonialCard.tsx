'use client';

import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { SxProps, Theme } from '@mui/material/styles';

export interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
  sx?: SxProps<Theme>;
}

export default function TestimonialCard({
  quote,
  authorName,
  authorTitle,
  company,
  avatarUrl,
  rating,
  sx,
}: TestimonialCardProps) {
  return (
    <MuiCard variant="outlined" sx={{ borderRadius: 3, height: '100%', ...sx }}>
      <CardContent
        sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
      >
        {rating != null && (
          <Rating value={rating} readOnly precision={0.5} size="small" />
        )}
        <Box sx={{ position: 'relative', flex: 1 }}>
          <FormatQuoteIcon
            sx={{
              position: 'absolute',
              top: -8,
              left: -4,
              fontSize: 40,
              color: 'primary.main',
              opacity: 0.25,
            }}
          />
          <Typography
            variant="body1"
            sx={{ pl: 3, lineHeight: 1.8, fontStyle: 'italic', color: 'text.primary' }}
          >
            {quote}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar src={avatarUrl} alt={authorName} sx={{ width: 44, height: 44 }} />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {authorName}
            </Typography>
            {(authorTitle || company) && (
              <Typography variant="caption" color="text.secondary">
                {[authorTitle, company].filter(Boolean).join(', ')}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </MuiCard>
  );
}
