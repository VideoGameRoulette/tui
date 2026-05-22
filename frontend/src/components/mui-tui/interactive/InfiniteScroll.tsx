'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface InfiniteScrollProps {
  children: ReactNode;
  onLoadMore: () => void | Promise<void>;
  hasMore: boolean;
  loading?: boolean;
  loadingIndicator?: ReactNode;
  endMessage?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  sx?: SxProps<Theme>;
}

export default function InfiniteScroll({
  children,
  onLoadMore,
  hasMore,
  loading = false,
  loadingIndicator,
  endMessage,
  threshold = 0.1,
  rootMargin = '0px 0px 200px 0px',
  sx,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          onLoadMoreRef.current();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, threshold, rootMargin]);

  return (
    <Box sx={sx}>
      {children}

      {/* Sentinel element that triggers load when visible */}
      <div ref={sentinelRef} aria-hidden="true" />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          {loadingIndicator ?? <CircularProgress size={32} />}
        </Box>
      )}

      {!hasMore && !loading && endMessage && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          {typeof endMessage === 'string' ? (
            <Typography variant="body2" color="text.disabled">
              {endMessage}
            </Typography>
          ) : (
            endMessage
          )}
        </Box>
      )}
    </Box>
  );
}
