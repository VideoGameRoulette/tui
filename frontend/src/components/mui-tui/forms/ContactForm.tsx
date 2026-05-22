'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import type { SxProps, Theme } from '@mui/material/styles';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  showSubject?: boolean;
  submitLabel?: string;
  successMessage?: string;
  sx?: SxProps<Theme>;
}

export default function ContactForm({
  onSubmit,
  showSubject = false,
  submitLabel = 'Send Message',
  successMessage = "Thanks! We'll be in touch soon.",
  sx,
}: ContactFormProps) {
  const [data, setData] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (!data.name.trim()) next.name = 'Name is required';
    if (!data.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Enter a valid email';
    if (!data.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit?.(data);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function field(key: keyof ContactFormData) {
    return {
      value: data[key] ?? '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setData(prev => ({ ...prev, [key]: e.target.value })),
      error: !!errors[key],
      helperText: errors[key],
    };
  }

  if (submitted) {
    return (
      <Box sx={{ textAlign: 'center', py: 6, ...sx }}>
        <Typography variant="h6" color="primary.main" fontWeight={700}>
          {successMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 3, ...sx }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
        <TextField label="Name" required fullWidth {...field('name')} />
        <TextField label="Email" type="email" required fullWidth {...field('email')} />
      </Box>
      {showSubject && (
        <TextField label="Subject" fullWidth {...field('subject')} />
      )}
      <TextField label="Message" multiline minRows={4} required fullWidth {...field('message')} />
      <Box>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
          sx={{ px: 4 }}
        >
          {loading ? 'Sending…' : submitLabel}
        </Button>
      </Box>
    </Box>
  );
}
