'use client';

import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

const richTextSx: SxProps<Theme> = {
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    color: 'text.primary',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
    mt: 4,
    mb: 1.5,
    '&:first-of-type': { mt: 0 },
  },
  '& h1': { fontSize: { xs: '1.875rem', sm: '2.25rem' } },
  '& h2': { fontSize: { xs: '1.5rem',   sm: '1.75rem'  } },
  '& h3': { fontSize: { xs: '1.25rem',  sm: '1.375rem' } },
  '& h4': { fontSize: '1.125rem' },
  '& h5': { fontSize: '1rem',   fontWeight: 600 },
  '& h6': { fontSize: '0.875rem', fontWeight: 600 },
  '& p': {
    color: 'text.secondary',
    lineHeight: 1.8,
    mb: 2,
    '&:last-child': { mb: 0 },
  },
  '& ul, & ol': {
    pl: 3,
    mb: 2,
    color: 'text.secondary',
    lineHeight: 1.8,
  },
  '& li': { mb: 0.5 },
  '& li::marker': { color: 'text.disabled' },
  '& blockquote': {
    borderLeft: '4px solid',
    borderColor: 'primary.main',
    pl: 2.5,
    ml: 0,
    my: 3,
    '& p': {
      color: 'text.primary',
      fontStyle: 'italic',
      fontSize: '1.0625rem',
      mb: 0,
    },
  },
  '& code:not(pre code)': {
    fontFamily: '"Fira Code", "Cascadia Code", ui-monospace, monospace',
    fontSize: '0.875em',
    px: 0.75,
    py: 0.25,
    borderRadius: 0.75,
    bgcolor: 'action.hover',
    color: 'text.primary',
    border: '1px solid',
    borderColor: 'divider',
  },
  '& pre': {
    bgcolor: '#0f172a',
    color: '#e2e8f0',
    p: 2.5,
    borderRadius: 2,
    overflow: 'auto',
    my: 3,
    fontSize: '0.875rem',
    lineHeight: 1.75,
    fontFamily: '"Fira Code", "Cascadia Code", ui-monospace, monospace',
    '& code': { bgcolor: 'transparent', border: 'none', p: 0, fontSize: 'inherit' },
  },
  '& a': {
    color: 'primary.main',
    textUnderlineOffset: '3px',
    '&:hover': { color: 'primary.dark' },
  },
  '& hr': { borderColor: 'divider', my: 4, border: 'none', borderTop: '1px solid' },
  '& strong': { color: 'text.primary', fontWeight: 600 },
  '& em': { fontStyle: 'italic' },
  '& img': { maxWidth: '100%', borderRadius: 2, display: 'block', my: 2 },
  '& table': { width: '100%', borderCollapse: 'collapse', my: 2, fontSize: '0.9375rem' },
  '& th': {
    textAlign: 'left',
    fontWeight: 600,
    color: 'text.primary',
    pb: 1,
    borderBottom: '2px solid',
    borderColor: 'divider',
    pr: 3,
  },
  '& td': {
    color: 'text.secondary',
    py: 1,
    pr: 3,
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
};

export interface RichTextProps {
  /** Raw HTML string. Caller is responsible for sanitising before passing. */
  html?: string;
  children?: React.ReactNode;
  /** Cap prose width to a comfortable reading measure */
  constrained?: boolean;
  sx?: SxProps<Theme>;
}

export default function RichText({ html, children, constrained = false, sx }: RichTextProps) {
  return (
    <Box
      sx={{
        ...richTextSx,
        maxWidth: constrained ? 680 : undefined,
        ...sx,
      }}
      {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}
    >
      {!html ? children : null}
    </Box>
  );
}
