'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import type { SxProps, Theme } from '@mui/material/styles';

export interface CommentReply {
  id: string;
  authorName: string;
  authorAvatarUrl?: string;
  content: string;
  date: string;
}

export interface Comment extends CommentReply {
  replies?: CommentReply[];
}

export interface CommentFormData {
  name: string;
  email: string;
  comment: string;
}

export interface CommentSectionProps {
  comments?: Comment[];
  onSubmit?: (data: CommentFormData) => void | Promise<void>;
  title?: string;
  sx?: SxProps<Theme>;
}

// ─── Single comment item ──────────────────────────────────────────────────────

function CommentItem({
  comment,
  depth = 0,
}: {
  comment: Comment | CommentReply;
  depth?: number;
}) {
  const [showReply, setShowReply] = useState(false);

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Avatar
        src={comment.authorAvatarUrl}
        alt={comment.authorName}
        sx={{ width: 36, height: 36, flexShrink: 0, mt: 0.5 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
          <Typography variant="subtitle2" fontWeight={700}>
            {comment.authorName}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {comment.date}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.7 }}>
          {comment.content}
        </Typography>

        {depth === 0 && (
          <>
            <IconButton
              size="small"
              onClick={() => setShowReply(v => !v)}
              sx={{ mt: 0.5, ml: -0.5, color: 'text.disabled', fontSize: '0.75rem', gap: 0.5 }}
            >
              <ReplyIcon fontSize="inherit" />
              <Typography variant="caption">{showReply ? 'Cancel' : 'Reply'}</Typography>
            </IconButton>
            {showReply && (
              <Box sx={{ mt: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  minRows={2}
                  placeholder="Write a reply…"
                  variant="outlined"
                  sx={{ fontSize: '0.875rem' }}
                />
              </Box>
            )}
          </>
        )}

        {/* Replies */}
        {'replies' in comment && comment.replies && comment.replies.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2, pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} depth={1} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ─── Submission form ──────────────────────────────────────────────────────────

function CommentForm({ onSubmit }: { onSubmit?: CommentSectionProps['onSubmit'] }) {
  const [form, setForm] = useState<CommentFormData>({ name: '', email: '', comment: '' });
  const [errors, setErrors] = useState<Partial<CommentFormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Required';
    if (!form.email.trim()) next.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Invalid email';
    if (!form.comment.trim()) next.comment = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit?.(form);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function field(key: keyof CommentFormData) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(p => ({ ...p, [key]: e.target.value })),
      error: !!errors[key],
      helperText: errors[key],
    };
  }

  if (submitted) {
    return (
      <Typography color="success.main" fontWeight={600} sx={{ py: 2 }}>
        Your comment has been submitted and is awaiting moderation.
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField label="Name" required size="small" fullWidth {...field('name')} />
        <TextField label="Email" type="email" required size="small" fullWidth {...field('email')} />
      </Box>
      <TextField label="Comment" multiline minRows={4} required fullWidth {...field('comment')} />
      <Box>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={loading}
          sx={{ px: 4 }}
        >
          {loading ? 'Submitting…' : 'Post Comment'}
        </Button>
      </Box>
    </Box>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CommentSection({
  comments = [],
  onSubmit,
  title = 'Comments',
  sx,
}: CommentSectionProps) {
  const count = comments.reduce((n, c) => n + 1 + (c.replies?.length ?? 0), 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, ...sx }}>
      {/* Comment list */}
      <Box>
        <Typography variant="h6" fontWeight={700} mb={3}>
          {title}
          {count > 0 && (
            <Typography component="span" variant="body2" color="text.secondary" ml={1}>
              ({count})
            </Typography>
          )}
        </Typography>

        {comments.length === 0 ? (
          <Typography variant="body2" color="text.disabled">
            No comments yet. Be the first to share your thoughts!
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {comments.map((comment, i) => (
              <Box key={comment.id}>
                <CommentItem comment={comment} />
                {i < comments.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Divider />

      {/* Submission form */}
      <Box>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Leave a Comment
        </Typography>
        <CommentForm onSubmit={onSubmit} />
      </Box>
    </Box>
  );
}
