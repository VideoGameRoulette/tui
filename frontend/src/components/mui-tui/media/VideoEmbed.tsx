'use client';

import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

function getEmbedInfo(src: string): { type: 'youtube' | 'vimeo' | 'html5'; url: string } {
  const yt = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) return { type: 'youtube', url: `https://www.youtube.com/embed/${yt[1]}?rel=0` };

  const vm = src.match(/vimeo\.com\/(\d+)/);
  if (vm) return { type: 'vimeo', url: `https://player.vimeo.com/video/${vm[1]}` };

  return { type: 'html5', url: src };
}

export interface VideoEmbedProps {
  src: string;
  poster?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  title?: string;
  sx?: SxProps<Theme>;
}

export default function VideoEmbed({
  src,
  poster,
  aspectRatio = '16/9',
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  title = 'Video',
  sx,
}: VideoEmbedProps) {
  const embed = getEmbedInfo(src);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'common.black',
        ...sx,
      }}
    >
      {embed.type === 'html5' ? (
        <Box
          component="video"
          src={embed.url}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Box
          component="iframe"
          src={embed.url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      )}
    </Box>
  );
}
