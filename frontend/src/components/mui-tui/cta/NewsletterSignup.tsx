'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';

export interface NewsletterSignupProps {
  headline?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  layout?: 'inline' | 'stacked';
  onSubmit?: (email: string) => void;
  sx?: SxProps<Theme>;
}

export default function NewsletterSignup({
  headline,
  description,
  placeholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  layout = 'inline',
  onSubmit,
  sx,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    onSubmit?.(email);
    setSubmitted(true);
    setEmail('');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ...sx }}>
      {(headline || description) && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {headline && (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {headline}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      )}
      {submitted ? (
        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
          Thanks for subscribing!
        </Typography>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: layout === 'stacked' ? 'column' : { xs: 'column', sm: 'row' },
            gap: 1.5,
          }}
        >
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            size="small"
            required
            fullWidth={layout === 'stacked'}
            sx={{ flex: layout === 'inline' ? 1 : undefined }}
          />
          <Button
            type="submit"
            variant="contained"
            disableElevation
            fullWidth={layout === 'stacked'}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {buttonLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
}
