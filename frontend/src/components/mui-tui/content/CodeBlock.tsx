'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import type { SxProps, Theme } from '@mui/material/styles';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  sx?: SxProps<Theme>;
}

export default function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  sx,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available in non-secure contexts
    }
  };

  const lines = code.split('\n');

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: '#0f172a',
        border: '1px solid rgba(255,255,255,0.06)',
        ...sx,
      }}
    >
      {/* header bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          bgcolor: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          minHeight: 40,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {filename ? (
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Fira Code", "Cascadia Code", ui-monospace, monospace', fontSize: '0.75rem' }}
            >
              {filename}
            </Typography>
          ) : language ? (
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontSize: '0.6875rem',
                fontWeight: 600,
              }}
            >
              {language}
            </Typography>
          ) : null}
        </Box>

        <Tooltip title={copied ? 'Copied!' : 'Copy code'} placement="left">
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              color: copied ? '#4ade80' : 'rgba(255,255,255,0.4)',
              '&:hover': { color: 'rgba(255,255,255,0.8)', bgcolor: 'rgba(255,255,255,0.06)' },
              transition: 'color 0.15s',
            }}
          >
            {copied ? <CheckIcon sx={{ fontSize: 16 }} /> : <ContentCopyIcon sx={{ fontSize: 16 }} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* code area */}
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2.5,
          overflow: 'auto',
          fontSize: '0.875rem',
          lineHeight: 1.75,
          fontFamily: '"Fira Code", "Cascadia Code", ui-monospace, monospace',
          color: '#e2e8f0',
        }}
      >
        {showLineNumbers ? (
          <Box sx={{ display: 'table', width: '100%' }}>
            {lines.map((line, i) => (
              <Box key={i} sx={{ display: 'table-row' }}>
                <Box
                  component="span"
                  sx={{
                    display: 'table-cell',
                    userSelect: 'none',
                    pr: 3,
                    color: 'rgba(255,255,255,0.25)',
                    textAlign: 'right',
                    minWidth: 32,
                    fontSize: '0.8125rem',
                  }}
                >
                  {i + 1}
                </Box>
                <Box component="span" sx={{ display: 'table-cell', whiteSpace: 'pre' }}>
                  {line}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <code style={{ fontFamily: 'inherit', fontSize: 'inherit' }}>{code}</code>
        )}
      </Box>
    </Box>
  );
}
