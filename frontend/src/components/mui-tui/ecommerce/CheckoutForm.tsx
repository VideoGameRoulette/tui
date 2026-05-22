'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import type { SxProps, Theme } from '@mui/material/styles';
import type { CartItem } from './CartDrawer';

export interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface CheckoutFormData {
  shipping: ShippingData;
  payment: PaymentData;
}

export interface CheckoutFormProps {
  onComplete?: (data: CheckoutFormData) => void | Promise<void>;
  items?: CartItem[];
  currency?: string;
  sx?: SxProps<Theme>;
}

const STEPS = ['Shipping', 'Payment', 'Review'];

const EMPTY_SHIPPING: ShippingData = {
  firstName: '', lastName: '', email: '',
  address: '', city: '', state: '', zip: '', country: 'US',
};

const EMPTY_PAYMENT: PaymentData = {
  nameOnCard: '', cardNumber: '', expiry: '', cvv: '',
};

const COUNTRIES = ['US', 'CA', 'GB', 'AU', 'DE', 'FR'];

export default function CheckoutForm({
  onComplete,
  items = [],
  currency = '$',
  sx,
}: CheckoutFormProps) {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<ShippingData>(EMPTY_SHIPPING);
  const [payment, setPayment] = useState<PaymentData>(EMPTY_PAYMENT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function sf(key: keyof ShippingData) {
    return {
      value: shipping[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setShipping(p => ({ ...p, [key]: e.target.value })),
      error: !!errors[key],
      helperText: errors[key],
    };
  }

  function pf(key: keyof PaymentData) {
    return {
      value: payment[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPayment(p => ({ ...p, [key]: e.target.value })),
      error: !!errors[key],
      helperText: errors[key],
    };
  }

  function validateShipping() {
    const next: Record<string, string> = {};
    if (!shipping.firstName.trim()) next.firstName = 'Required';
    if (!shipping.lastName.trim()) next.lastName = 'Required';
    if (!shipping.email.trim()) next.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) next.email = 'Invalid email';
    if (!shipping.address.trim()) next.address = 'Required';
    if (!shipping.city.trim()) next.city = 'Required';
    if (!shipping.zip.trim()) next.zip = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validatePayment() {
    const next: Record<string, string> = {};
    if (!payment.nameOnCard.trim()) next.nameOnCard = 'Required';
    if (!payment.cardNumber.trim()) next.cardNumber = 'Required';
    else if (payment.cardNumber.replace(/\s/g, '').length < 12) next.cardNumber = 'Invalid card number';
    if (!payment.expiry.trim()) next.expiry = 'Required';
    if (!payment.cvv.trim()) next.cvv = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    setErrors({});
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !validatePayment()) return;
    setStep(s => s + 1);
  }

  async function handlePlace() {
    setLoading(true);
    try {
      await onComplete?.({ shipping, payment });
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (done) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, ...sx }}>
        <Typography variant="h5" fontWeight={700} color="success.main" gutterBottom>
          Order placed!
        </Typography>
        <Typography color="text.secondary">
          Thank you, {shipping.firstName}. You&apos;ll receive a confirmation at {shipping.email}.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, ...sx }}>
      <Stepper activeStep={step} alternativeLabel>
        {STEPS.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 0: Shipping */}
      {step === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography variant="h6" fontWeight={700}>Shipping Information</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField label="First Name" required size="small" {...sf('firstName')} />
            <TextField label="Last Name" required size="small" {...sf('lastName')} />
          </Box>
          <TextField label="Email" type="email" required size="small" {...sf('email')} />
          <TextField label="Street Address" required size="small" {...sf('address')} />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr' }, gap: 2 }}>
            <TextField label="City" required size="small" {...sf('city')} />
            <TextField label="State / Province" size="small" {...sf('state')} />
            <TextField label="ZIP / Postal" required size="small" {...sf('zip')} />
          </Box>
          <FormControl size="small" fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              label="Country"
              value={shipping.country}
              onChange={e => setShipping(p => ({ ...p, country: e.target.value }))}
            >
              {COUNTRIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Step 1: Payment */}
      {step === 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography variant="h6" fontWeight={700}>Payment Details</Typography>
          <TextField label="Name on Card" required size="small" {...pf('nameOnCard')} />
          <TextField
            label="Card Number"
            required
            size="small"
            placeholder="1234 5678 9012 3456"
            inputProps={{ maxLength: 19 }}
            {...pf('cardNumber')}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField label="Expiry (MM/YY)" required size="small" placeholder="MM/YY" {...pf('expiry')} />
            <TextField label="CVV" required size="small" placeholder="123" inputProps={{ maxLength: 4 }} {...pf('cvv')} />
          </Box>
        </Box>
      )}

      {/* Step 2: Review */}
      {step === 2 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" fontWeight={700}>Review Your Order</Typography>

          {items.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {items.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
                    {item.variant && <Typography variant="caption" color="text.secondary">{item.variant}</Typography>}
                  </Box>
                  <Typography variant="body2">
                    {item.quantity} × {currency}{item.price.toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontWeight={700}>Total</Typography>
                <Typography fontWeight={800}>{currency}{subtotal.toFixed(2)}</Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 2.5 }}>
            <Typography variant="body2" fontWeight={700} mb={0.5}>Ship to</Typography>
            <Typography variant="body2" color="text.secondary">
              {shipping.firstName} {shipping.lastName} · {shipping.address}, {shipping.city} {shipping.zip} · {shipping.country}
            </Typography>
            <Typography variant="body2" fontWeight={700} mt={1.5} mb={0.5}>Payment</Typography>
            <Typography variant="body2" color="text.secondary">
              Card ending in {payment.cardNumber.slice(-4) || '****'}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Navigation */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        {step > 0 ? (
          <Button variant="outlined" onClick={() => setStep(s => s - 1)}>Back</Button>
        ) : (
          <Box />
        )}
        {step < 2 ? (
          <Button variant="contained" disableElevation onClick={handleNext}>
            Continue
          </Button>
        ) : (
          <Button variant="contained" disableElevation disabled={loading} onClick={handlePlace}>
            {loading ? 'Placing Order…' : 'Place Order'}
          </Button>
        )}
      </Box>
    </Box>
  );
}
