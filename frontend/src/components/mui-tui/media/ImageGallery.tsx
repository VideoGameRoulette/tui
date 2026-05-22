'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import type { SxProps, Theme } from '@mui/material/styles';

export interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  variant?: 'grid' | 'masonry';
  cols?: 2 | 3 | 4;
  gap?: number;
  lightbox?: boolean;
  sx?: SxProps<Theme>;
}

export default function ImageGallery({
  images,
  variant = 'grid',
  cols = 3,
  gap = 2,
  lightbox = true,
  sx,
}: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  function handleOpen(idx: number) {
    if (!lightbox) return;
    setActiveIdx(idx);
    setOpen(true);
  }

  const active = images[activeIdx];

  if (variant === 'masonry') {
    return (
      <>
        <Box
          sx={{
            columnCount: { xs: 1, sm: Math.min(cols, 2), md: cols },
            columnGap: gap * 8,
            ...sx,
          }}
        >
          {images.map((img, i) => (
            <Box
              key={i}
              onClick={() => handleOpen(i)}
              sx={{
                display: 'block',
                mb: gap,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: lightbox ? 'pointer' : 'default',
                breakInside: 'avoid',
                '& img': { transition: 'transform 0.25s' },
                '&:hover img': lightbox ? { transform: 'scale(1.04)' } : {},
              }}
            >
              <Box
                component="img"
                src={img.src}
                alt={img.alt ?? ''}
                sx={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </Box>
          ))}
        </Box>
        {lightbox && (
          <LightboxDialog open={open} image={active} onClose={() => setOpen(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: `repeat(${Math.min(cols, 2)}, 1fr)`,
            md: `repeat(${cols}, 1fr)`,
          },
          gap,
          ...sx,
        }}
      >
        {images.map((img, i) => (
          <Box
            key={i}
            onClick={() => handleOpen(i)}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              aspectRatio: '4/3',
              cursor: lightbox ? 'pointer' : 'default',
              '& img': { transition: 'transform 0.3s' },
              '&:hover img': lightbox ? { transform: 'scale(1.05)' } : {},
            }}
          >
            <Box
              component="img"
              src={img.src}
              alt={img.alt ?? ''}
              sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>
      {lightbox && (
        <LightboxDialog open={open} image={active} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

function LightboxDialog({
  open,
  image,
  onClose,
}: {
  open: boolean;
  image: GalleryImage;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, bgcolor: 'background.paper' }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <DialogContent sx={{ p: 0, bgcolor: 'background.default' }}>
        <Box
          component="img"
          src={image?.src}
          alt={image?.alt ?? ''}
          sx={{ display: 'block', width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }}
        />
        {image?.caption && (
          <Typography
            variant="caption"
            sx={{ display: 'block', p: 1.5, textAlign: 'center', color: 'text.secondary' }}
          >
            {image.caption}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
