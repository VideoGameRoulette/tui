# E-Commerce Components

Location: `frontend/src/components/mui-tui/ecommerce/`

---

## ProductGrid

Responsive product listing grid with optional filter/sort/search bar.

```tsx
import { ProductGrid } from '@/components/mui-tui/ecommerce';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `products` | `ProductCardProps[]` | 8 defaults | Array of product card data |
| `cols` | `2 \| 3 \| 4` | `4` | Max columns at lg+ breakpoint |
| `filters` | `FilterOption[]` | `[]` | Filter chips for FilterSortBar |
| `filterValue` | `string \| null` | — | Controlled filter selection |
| `onFilterChange` | `(value: string \| null) => void` | — | Filter change callback |
| `sortOptions` | `SortOption[]` | `[]` | Sort dropdown options |
| `sortValue` | `string` | — | Controlled sort value |
| `onSortChange` | `(value: string) => void` | — | Sort change callback |
| `onSearch` | `(value: string) => void` | — | Search callback |
| `searchPlaceholder` | `string` | `'Search products…'` | Search input placeholder |
| `showFilterBar` | `boolean` | `true` | Show/hide the filter bar |
| `loading` | `boolean` | `false` | Loading state |
| `emptyMessage` | `string` | `'No products found.'` | Message when list is empty |
| `sx` | `SxProps<Theme>` | — | MUI sx override |

### Column Breakpoints

| Breakpoint | Columns |
|-----------|---------|
| xs | 2 |
| sm | min(cols, 2) |
| md | min(cols, 3) |
| lg | cols |

### Example

```tsx
<ProductGrid
  products={myProducts}
  cols={3}
  filters={[
    { label: 'All', value: null },
    { label: 'Sale', value: 'sale' },
  ]}
  filterValue={activeFilter}
  onFilterChange={setActiveFilter}
  sortOptions={[
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Newest', value: 'newest' },
  ]}
  sortValue={sortBy}
  onSortChange={setSortBy}
/>
```

---

## ProductDetail

Full product detail view with image gallery, variant pickers, quantity control, and add-to-cart.

```tsx
import { ProductDetail } from '@/components/mui-tui/ecommerce';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Product name |
| `price` | `string` | required | Formatted price string (e.g. `'$49.99'`) |
| `originalPrice` | `string` | — | Strike-through original price |
| `description` | `string` | — | Product description text |
| `images` | `ProductImage[]` | `[]` | Array of images for gallery |
| `variants` | `ProductVariant[]` | `[]` | Variant option groups (e.g. Size, Color) |
| `badge` | `string` | — | Badge label overlaid on main image (e.g. `'Sale'`) |
| `inStock` | `boolean` | `true` | Controls ATC button disabled state |
| `rating` | `number` | — | Star rating value (0–5) |
| `reviewCount` | `number` | — | Number of reviews |
| `onAddToCart` | `(selections: Record<string, string>, quantity: number) => void` | — | Add-to-cart callback |
| `sx` | `SxProps<Theme>` | — | MUI sx override |

### Types

```ts
interface ProductImage {
  src: string;
  alt?: string;
}

interface ProductVariant {
  label: string;    // e.g. 'Size'
  options: string[]; // e.g. ['S', 'M', 'L', 'XL']
}
```

### Example

```tsx
<ProductDetail
  name="Classic Leather Wallet"
  price="$49"
  originalPrice="$65"
  description="Full-grain leather, slim profile, RFID blocking."
  images={[
    { src: '/images/wallet-1.jpg', alt: 'Front' },
    { src: '/images/wallet-2.jpg', alt: 'Back' },
  ]}
  variants={[
    { label: 'Color', options: ['Black', 'Brown', 'Tan'] },
  ]}
  badge="Sale"
  rating={4.5}
  reviewCount={128}
  onAddToCart={(selections, qty) => addToCart({ ...selections, qty })}
/>
```

---

## CartDrawer

Slide-in cart drawer with item list, quantity controls, subtotal, and checkout CTA.

```tsx
import { CartDrawer } from '@/components/mui-tui/ecommerce';
import type { CartItem } from '@/components/mui-tui/ecommerce';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controls drawer visibility |
| `onClose` | `() => void` | required | Called when drawer should close |
| `items` | `CartItem[]` | `[]` | Cart item list |
| `onUpdateQuantity` | `(id: string, quantity: number) => void` | — | Quantity change callback |
| `onRemove` | `(id: string) => void` | — | Remove item callback |
| `onCheckout` | `() => void` | — | Checkout button callback |
| `checkoutLabel` | `string` | `'Checkout'` | Label for checkout button |
| `currency` | `string` | `'$'` | Currency symbol |
| `width` | `number` | `400` | Drawer width in px |
| `sx` | `SxProps<Theme>` | — | MUI sx override |

### CartItem Type

```ts
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  variant?: string;
}
```

### Quantity Behavior

Tapping `-` when quantity is 1 calls `onRemove` instead of `onUpdateQuantity`.

### Example

```tsx
const [open, setOpen] = useState(false);
const [items, setItems] = useState<CartItem[]>([]);

<CartDrawer
  open={open}
  onClose={() => setOpen(false)}
  items={items}
  onUpdateQuantity={(id, qty) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }
  onRemove={(id) => setItems(prev => prev.filter(i => i.id !== id))}
  onCheckout={() => router.push('/checkout')}
/>
```

---

## CheckoutForm

Multi-step checkout form: Shipping → Payment → Review → Confirmation.

```tsx
import { CheckoutForm } from '@/components/mui-tui/ecommerce';
import type { CheckoutFormData } from '@/components/mui-tui/ecommerce';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onComplete` | `(data: CheckoutFormData) => void \| Promise<void>` | — | Called when order is placed |
| `items` | `CartItem[]` | `[]` | Items shown in Review step |
| `currency` | `string` | `'$'` | Currency symbol |
| `sx` | `SxProps<Theme>` | — | MUI sx override |

### Types

```ts
interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string; // default: 'US'
}

interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface CheckoutFormData {
  shipping: ShippingData;
  payment: PaymentData;
}
```

### Steps

1. **Shipping** — name, email, address, city, state, zip, country (select)
2. **Payment** — name on card, card number (max 19 chars), expiry, CVV
3. **Review** — order line items + subtotal, ship-to summary, card last 4
4. **Done** — success message (replaces form)

### Validation

- Shipping: firstName, lastName, email (format checked), address, city, zip all required
- Payment: nameOnCard, cardNumber (min 12 digits stripped), expiry, cvv all required

### Example

```tsx
<CheckoutForm
  items={cartItems}
  currency="$"
  onComplete={async ({ shipping, payment }) => {
    await placeOrder({ shipping, payment });
  }}
/>
```

---

## SaleTag

Sale/promo tag rendered as a chip, diagonal ribbon, or full-width banner. Supports overlay on any children or standalone use.

```tsx
import { SaleTag } from '@/components/mui-tui/ecommerce';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Tag text |
| `color` | `ChipProps['color']` | `'error'` | MUI color token |
| `placement` | `SaleTagPlacement` | `'top-left'` | Chip placement when overlaid |
| `variant` | `SaleTagVariant` | `'chip'` | Visual style |
| `children` | `ReactNode` | — | Element to overlay the tag on |
| `sx` | `SxProps<Theme>` | — | MUI sx override |

### Types

```ts
type SaleTagPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type SaleTagVariant = 'chip' | 'banner' | 'ribbon';
```

### Variants

| Variant | Description |
|---------|-------------|
| `chip` | Absolute-positioned MUI Chip at the chosen corner |
| `ribbon` | Diagonal corner ribbon using CSS `::before` pseudo-element (top-right only) |
| `banner` | Full-width color band at top or bottom of the element |

### Standalone (no children)

Without `children`, renders a plain inline `Chip` regardless of `variant`.

### Example

```tsx
{/* Overlay chip */}
<SaleTag label="20% OFF" color="error" placement="top-left">
  <ProductCard ... />
</SaleTag>

{/* Corner ribbon */}
<SaleTag label="NEW" color="success" variant="ribbon">
  <img src="/product.jpg" />
</SaleTag>

{/* Full-width banner */}
<SaleTag label="CLEARANCE" color="warning" variant="banner" placement="bottom-left">
  <ProductCard ... />
</SaleTag>

{/* Standalone chip */}
<SaleTag label="Sale" color="error" />
```
