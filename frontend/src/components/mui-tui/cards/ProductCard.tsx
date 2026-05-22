'use client';

import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

export interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl?: string;
  imageAlt?: string;
  badge?: string;
  href?: string;
  onAddToCart?: () => void;
  sx?: SxProps<Theme>;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  imageUrl,
  imageAlt = '',
  badge,
  href = '#',
  onAddToCart,
  sx,
}: ProductCardProps) {
  return (
    <MuiCard
      variant="outlined"
      sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', ...sx }}
    >
      <CardActionArea component="a" href={href}>
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '1/1',
            overflow: 'hidden',
            bgcolor: 'action.hover',
          }}
        >
          {imageUrl && (
            <Box
              component="img"
              src={imageUrl}
              alt={imageAlt}
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s',
                'a:hover &': { transform: 'scale(1.05)' },
              }}
            />
          )}
          {badge && (
            <Chip
              label={badge}
              size="small"
              color="error"
              sx={{ position: 'absolute', top: 10, left: 10, fontWeight: 700 }}
            />
          )}
        </Box>
      </CardActionArea>
      <CardContent sx={{ p: 2, pb: 0, flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            {price}
          </Typography>
          {originalPrice && (
            <Typography
              variant="body2"
              sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
            >
              {originalPrice}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 1.5 }}>
        <Button
          variant="contained"
          fullWidth
          disableElevation
          onClick={onAddToCart}
          size="small"
        >
          Add to cart
        </Button>
      </CardActions>
    </MuiCard>
  );
}
