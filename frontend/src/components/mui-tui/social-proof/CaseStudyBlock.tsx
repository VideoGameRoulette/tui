'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { SxProps, Theme } from '@mui/material/styles';

export interface CaseStudyStep {
  label?: string;
  heading: string;
  body: string;
  icon?: ReactNode;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  description?: string;
}

const DEFAULT_STEPS: CaseStudyStep[] = [
  {
    label: 'The Problem',
    heading: 'Fragmented workflows slowing growth',
    body: 'Teams were spending hours per week on manual processes that created bottlenecks and errors across the organization.',
  },
  {
    label: 'Our Solution',
    heading: 'Unified platform with smart automation',
    body: 'We deployed an integrated solution that automated key workflows and gave teams real-time visibility into every process.',
  },
  {
    label: 'The Result',
    heading: 'Measurable impact from day one',
    body: 'Within 90 days the team had eliminated manual bottlenecks and was operating at full capacity with confidence.',
  },
];

const DEFAULT_METRICS: CaseStudyMetric[] = [
  { value: '47%', label: 'Faster deployment' },
  { value: '3×', label: 'More conversions' },
  { value: '90 days', label: 'To full ROI' },
  { value: '99.9%', label: 'Uptime SLA' },
];

export interface CaseStudyBlockProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: CaseStudyStep[];
  metrics?: CaseStudyMetric[];
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  quoteAvatarUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  sx?: SxProps<Theme>;
}

export default function CaseStudyBlock({
  eyebrow,
  title,
  description,
  steps = DEFAULT_STEPS,
  metrics = DEFAULT_METRICS,
  quote,
  quoteAuthor,
  quoteRole,
  quoteAvatarUrl,
  imageUrl,
  imageAlt,
  sx,
}: CaseStudyBlockProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8, ...sx }}>

      {/* Header */}
      {(eyebrow || title || description || imageUrl) && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: imageUrl ? { xs: '1fr', md: '1fr 1fr' } : '1fr',
            gap: 6,
            alignItems: 'center',
          }}
        >
          <Box>
            {eyebrow && (
              <Typography variant="overline" color="primary.main" fontWeight={600} display="block" mb={1}>
                {eyebrow}
              </Typography>
            )}
            {title && (
              <Typography variant="h3" fontWeight={800} gutterBottom sx={{ lineHeight: 1.2 }}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography color="text.secondary" sx={{ fontSize: '1.0625rem', lineHeight: 1.75 }}>
                {description}
              </Typography>
            )}
          </Box>
          {imageUrl && (
            <Box
              component="img"
              src={imageUrl}
              alt={imageAlt ?? title ?? ''}
              sx={{ width: '100%', borderRadius: 3, objectFit: 'cover', aspectRatio: '4/3' }}
            />
          )}
        </Box>
      )}

      {/* Steps: Problem → Solution → Result */}
      {steps.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: `repeat(${Math.min(steps.length, 2)}, 1fr)`, md: `repeat(${steps.length}, 1fr)` },
            gap: 4,
          }}
        >
          {steps.map((step, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {step.icon ?? (i + 1)}
                </Box>
                {step.label && (
                  <Typography variant="overline" color="primary.main" fontWeight={600} lineHeight={1}>
                    {step.label}
                  </Typography>
                )}
              </Box>
              <Typography variant="h6" fontWeight={700}>
                {step.heading}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {step.body}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Metrics row */}
      {metrics.length > 0 && (
        <>
          <Divider />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: `repeat(${Math.min(metrics.length, 4)}, 1fr)` },
              gap: 4,
              textAlign: 'center',
            }}
          >
            {metrics.map((m, i) => (
              <Box key={i}>
                <Typography
                  variant="h3"
                  fontWeight={800}
                  color="primary.main"
                  sx={{ lineHeight: 1, mb: 0.5 }}
                >
                  {m.value}
                </Typography>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  {m.label}
                </Typography>
                {m.description && (
                  <Typography variant="caption" color="text.secondary">
                    {m.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </>
      )}

      {/* Customer quote */}
      {quote && (
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 3,
            p: { xs: 4, sm: 6 },
            position: 'relative',
          }}
        >
          <FormatQuoteIcon
            sx={{ position: 'absolute', top: 24, left: 24, fontSize: 48, color: 'primary.main', opacity: 0.2 }}
          />
          <Typography
            variant="h6"
            component="blockquote"
            sx={{ fontStyle: 'italic', fontWeight: 400, lineHeight: 1.7, pl: { xs: 0, sm: 4 }, mx: 0, mb: 3 }}
          >
            &ldquo;{quote}&rdquo;
          </Typography>
          {(quoteAuthor || quoteRole) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {quoteAvatarUrl && (
                <Avatar src={quoteAvatarUrl} alt={quoteAuthor} sx={{ width: 44, height: 44 }} />
              )}
              <Box>
                {quoteAuthor && (
                  <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
                    {quoteAuthor}
                  </Typography>
                )}
                {quoteRole && (
                  <Typography variant="caption" color="text.secondary">
                    {quoteRole}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}

    </Box>
  );
}
