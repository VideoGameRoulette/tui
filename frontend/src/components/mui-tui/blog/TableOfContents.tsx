'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface TOCItem {
  id: string;
  label: string;
  level?: 1 | 2 | 3;
}

export interface TableOfContentsProps {
  items: TOCItem[];
  title?: string;
  sticky?: boolean;
  stickyTop?: number;
  trackScroll?: boolean;
  sx?: SxProps<Theme>;
}

export default function TableOfContents({
  items,
  title = 'On this page',
  sticky = true,
  stickyTop = 80,
  trackScroll = true,
  sx,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!trackScroll || items.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        // Find the topmost intersecting heading
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, trackScroll]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      // Update URL hash without jump
      history.pushState(null, '', `#${id}`);
    }
  }

  return (
    <Box
      component="nav"
      aria-label="Table of contents"
      sx={{
        ...(sticky && { position: 'sticky', top: stickyTop }),
        ...sx,
      }}
    >
      {title && (
        <Typography variant="overline" color="text.disabled" fontWeight={600} display="block" mb={1.5}>
          {title}
        </Typography>
      )}

      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {items.map(item => {
          const isActive = activeId === item.id;
          const indent = ((item.level ?? 1) - 1) * 12;

          return (
            <Box component="li" key={item.id} sx={{ pl: `${indent}px` }}>
              <Box
                component="a"
                href={`#${item.id}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, item.id)}
                sx={{
                  display: 'block',
                  py: 0.5,
                  px: 1.5,
                  borderLeft: '2px solid',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  textDecoration: 'none',
                  fontSize: '0.8125rem',
                  lineHeight: 1.5,
                  fontWeight: isActive ? 600 : 400,
                  transition: 'color 0.15s, border-color 0.15s',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {item.label}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
