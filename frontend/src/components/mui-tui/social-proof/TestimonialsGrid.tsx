'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TestimonialCard from '../cards/TestimonialCard';
import type { TestimonialCardProps } from '../cards/TestimonialCard';
import type { SxProps, Theme } from '@mui/material/styles';

const DEFAULT_TESTIMONIALS: TestimonialCardProps[] = [
  {
    quote: 'Switching to this platform cut our deployment time in half. The team loves how intuitive it is.',
    authorName: 'Priya Nair',
    authorTitle: 'Lead Developer',
    company: 'CloudBridge',
    rating: 5,
  },
  {
    quote: "Exceptional customer support and a product that just works. We haven't looked back since day one.",
    authorName: "James O'Sullivan",
    authorTitle: 'Director of Product',
    company: 'Vertex Labs',
    rating: 5,
  },
  {
    quote: 'The analytics dashboards alone were worth the switch. Real-time data that actually makes sense.',
    authorName: 'Aisha Kamara',
    authorTitle: 'Data Lead',
    company: 'Insight Systems',
    rating: 4.5,
  },
  {
    quote: 'Our onboarding went from two weeks to three days. The ROI showed up in the first month.',
    authorName: 'Tom Bergmann',
    authorTitle: 'COO',
    company: 'Rapid Scale',
    rating: 5,
  },
  {
    quote: "I've implemented this at three different companies now. It's the first tool I recommend to every CTO.",
    authorName: 'Dana Park',
    authorTitle: 'Fractional CTO',
    company: 'Self-employed',
    rating: 5,
  },
  {
    quote: 'The migration support team held our hand through every step. Zero downtime, zero drama.',
    authorName: 'Lena Fischer',
    authorTitle: 'Infrastructure Lead',
    company: 'DataOps GmbH',
    rating: 4.5,
  },
];

export interface TestimonialsGridProps {
  testimonials?: TestimonialCardProps[];
  cols?: 1 | 2 | 3;
  masonry?: boolean;
  gap?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  sx?: SxProps<Theme>;
}

export default function TestimonialsGrid({
  testimonials = DEFAULT_TESTIMONIALS,
  cols = 3,
  masonry = false,
  gap = 3,
  eyebrow,
  title,
  description,
  sx,
}: TestimonialsGridProps) {
  const smCols = Math.min(cols, 2);

  return (
    <Box sx={sx}>
      {(eyebrow || title || description) && (
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          {eyebrow && (
            <Typography variant="overline" color="primary.main" fontWeight={600}>
              {eyebrow}
            </Typography>
          )}
          {title && (
            <Typography variant="h4" fontWeight={800} mt={eyebrow ? 0.5 : 0} gutterBottom>
              {title}
            </Typography>
          )}
          {description && (
            <Typography color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
              {description}
            </Typography>
          )}
        </Box>
      )}

      {masonry ? (
        <Box
          sx={{
            columnCount: { xs: 1, sm: smCols, md: cols },
            columnGap: gap,
            '& > *': { breakInside: 'avoid', mb: gap, display: 'block' },
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: `repeat(${smCols}, 1fr)`, md: `repeat(${cols}, 1fr)` },
            gap,
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </Box>
      )}
    </Box>
  );
}
