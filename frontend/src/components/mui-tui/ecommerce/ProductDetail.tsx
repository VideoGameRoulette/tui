'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { SxProps, Theme } from '@mui/material/styles';

export interface ProductImage {
  src: string;
  alt?: string;
}

export interface ProductVariant {
  label: string;
  options: string[];
}

export interface ProductDetailProps {
  name: string;
  price: string;
  originalPrice?: string;
  description?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  badge?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  onAddToCart?: (selections: Record<string, string>, quantity: number) => void;
  sx?: SxProps<Theme>;
}

export default function ProductDetail({
  name,
  price,
  originalPrice,
  description,
  images = [],
  variants = [],
  badge,
  inStock = true,
  rating,
  reviewCount,
  onAddToCart,
  sx,
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  function setVariant(label: string, value: string) {
    setSelections(prev => ({ ...prev, [label]: value }));
  }

  function adjustQty(delta: number) {
    setQuantity(q => Math.max(1, q + delta));
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 4, md: 8 },
        alignItems: 'flex-start',
        ...sx,
      }}
    >
      {/* Image gallery */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Main image */}
        <Box
          sx={{
            aspectRatio: '1/1',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: 'action.hover',
            position: 'relative',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {images[activeImage] ? (
            <Box
              component="img"
              src={images[activeImage].src}
              alt={images[activeImage].alt ?? name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <Box sx={{ width: '100%', height: '100%', bgcolor: 'action.hover' }} />
          )}
          {badge && (
            <Chip
              label={badge}
              size="small"
              color="error"
              sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 700 }}
            />
          )}
        </Box>

        {/* Thumbnails */}
        {images.length > 1 && (
          <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 0.5 }}>
            {images.map((img, i) => (
              <Box
                key={i}
                component="button"
                onClick={() => setActiveImage(i)}
                sx={{
                  flexShrink: 0,
                  width: 72,
                  height: 72,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '2px solid',
                  borderColor: i === activeImage ? 'primary.main' : 'divider',
                  cursor: 'pointer',
                  p: 0,
                  bgcolor: 'action.hover',
                  transition: 'border-color 0.15s',
                }}
                aria-label={`View image ${i + 1}`}
              >
                <Box
                  component="img"
                  src={img.src}
                  alt={img.alt ?? `${name} ${i + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Product info */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} lineHeight={1.2} gutterBottom>
            {name}
          </Typography>

          {(rating != null || reviewCount != null) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {rating != null && <Rating value={rating} readOnly precision={0.5} size="small" />}
              {reviewCount != null && (
                <Typography variant="body2" color="text.secondary">
                  ({reviewCount.toLocaleString()} reviews)
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
            <Typography variant="h5" fontWeight={800} color="text.primary">
              {price}
            </Typography>
            {originalPrice && (
              <Typography variant="body1" color="text.disabled" sx={{ textDecoration: 'line-through' }}>
                {originalPrice}
              </Typography>
            )}
            {!inStock && (
              <Chip label="Out of stock" size="small" variant="outlined" color="error" />
            )}
          </Box>
        </Box>

        {description && (
          <>
            <Divider />
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75 }}>
              {description}
            </Typography>
          </>
        )}

        {/* Variant pickers */}
        {variants.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {variants.map(variant => (
              <Box key={variant.label}>
                <Typography variant="body2" fontWeight={700} mb={1}>
                  {variant.label}
                  {selections[variant.label] && (
                    <Typography component="span" fontWeight={400} color="text.secondary" ml={1}>
                      {selections[variant.label]}
                    </Typography>
                  )}
                </Typography>
                <ToggleButtonGroup
                  value={selections[variant.label] ?? null}
                  exclusive
                  onChange={(_, v) => v !== null && setVariant(variant.label, v)}
                  size="small"
                >
                  {variant.options.map(opt => (
                    <ToggleButton key={opt} value={opt} sx={{ px: 2 }}>
                      {opt}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            ))}
          </Box>
        )}

        <Divider />

        {/* Quantity + ATC */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <IconButton size="small" onClick={() => adjustQty(-1)} disabled={quantity <= 1} aria-label="Decrease quantity">
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ px: 2, minWidth: 32, textAlign: 'center', fontWeight: 600 }}>
              {quantity}
            </Typography>
            <IconButton size="small" onClick={() => adjustQty(1)} aria-label="Increase quantity">
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            disableElevation
            size="large"
            disabled={!inStock}
            onClick={() => onAddToCart?.(selections, quantity)}
            sx={{ flex: 1, minWidth: 160 }}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
