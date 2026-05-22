'use client';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { SxProps, Theme } from '@mui/material/styles';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  variant?: string;
}

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  checkoutLabel?: string;
  currency?: string;
  width?: number;
  sx?: SxProps<Theme>;
}

export default function CartDrawer({
  open,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemove,
  onCheckout,
  checkoutLabel = 'Checkout',
  currency = '$',
  width = 400,
  sx,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((n, item) => n + item.quantity, 0);

  function fmt(amount: number) {
    return `${currency}${amount.toFixed(2)}`;
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={sx}
      slotProps={{
        paper: {
          sx: {
            width,
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 3, py: 2, flexShrink: 0 }}>
        <ShoppingCartIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
        <Typography variant="h6" fontWeight={700} flex={1}>
          Cart
          {itemCount > 0 && (
            <Typography component="span" variant="body2" color="text.secondary" ml={1}>
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </Typography>
          )}
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="Close cart" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      {/* Item list */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2 }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography color="text.secondary">Your cart is empty.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {items.map(item => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Avatar
                  src={item.imageUrl}
                  alt={item.name}
                  variant="rounded"
                  sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: 'action.hover', flexShrink: 0 }}
                />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                    {item.name}
                  </Typography>
                  {item.variant && (
                    <Typography variant="caption" color="text.secondary">
                      {item.variant}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    {/* Quantity stepper */}
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          item.quantity > 1
                            ? onUpdateQuantity?.(item.id, item.quantity - 1)
                            : onRemove?.(item.id)
                        }
                        aria-label="Decrease"
                        sx={{ p: 0.5 }}
                      >
                        <RemoveIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Typography variant="body2" fontWeight={600} sx={{ px: 1.5, minWidth: 24, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                        aria-label="Increase"
                        sx={{ p: 0.5 }}
                      >
                        <AddIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" fontWeight={700}>
                        {fmt(item.price * item.quantity)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => onRemove?.(item.id)}
                        aria-label={`Remove ${item.name}`}
                        sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Footer */}
      {items.length > 0 && (
        <>
          <Divider />
          <Box sx={{ p: 3, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography fontWeight={800} fontSize="1.1rem">{fmt(subtotal)}</Typography>
            </Box>
            <Typography variant="caption" color="text.disabled" display="block" mb={2}>
              Shipping and taxes calculated at checkout.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              size="large"
              onClick={onCheckout}
            >
              {checkoutLabel}
            </Button>
            <Button
              variant="text"
              fullWidth
              size="small"
              onClick={onClose}
              sx={{ mt: 1, color: 'text.secondary' }}
            >
              Continue Shopping
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
}
