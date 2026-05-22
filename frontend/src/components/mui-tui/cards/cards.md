# Material UI Cards & Lists Components

Card-based building blocks for content display. All use `borderRadius: 3` and MUI semantic tokens for theme awareness.

---

## File Structure

| File | Purpose |
|------|---------|
| `Card.tsx` | Base MUI Card wrapper with project-standard radius and optional hover lift |
| `CardGrid.tsx` | Responsive CSS grid container for any card type |
| `FeatureCard.tsx` | Icon or image + heading + description |
| `PricingCard.tsx` | Plan name, price, feature checklist, CTA; highlighted variant |
| `TeamMemberCard.tsx` | Avatar + name + title + bio + social icon buttons |
| `BlogPostCard.tsx` | Thumbnail + category chip + title + excerpt + author + date |
| `TestimonialCard.tsx` | Star rating + pull quote + author avatar + name + company |
| `ProductCard.tsx` | Square image + name + price (with strike-through) + add-to-cart |
| `index.ts` | Barrel export (components + prop types) |
| `cards.md` | This file |

---

## Component API

### `Card`
```tsx
<Card hover>
  <CardContent>...</CardContent>
</Card>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevation' \| 'outlined'` | `'outlined'` | MUI Card variant |
| `hover` | `boolean` | `false` | Adds translateY(-2px) + box-shadow on hover |
| `sx` | `SxProps` | — | MUI sx passthrough |

Passes all other MUI `CardProps` through.

---

### `CardGrid`
```tsx
<CardGrid cols={3} gap={4}>
  <FeatureCard ... />
  <FeatureCard ... />
</CardGrid>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `1 \| 2 \| 3 \| 4` | `3` | Columns on `md+`; 2-col on `sm`; 1-col on `xs` |
| `gap` | `number` | `3` | MUI spacing-unit gap |
| `children` | `ReactNode` | — | Card components |

---

### `FeatureCard`
```tsx
<FeatureCard
  icon={<StarIcon />}
  heading="Fast delivery"
  description="Ships in 24 hours worldwide."
/>
<FeatureCard
  imageUrl="/feature.jpg"
  heading="Premium quality"
  description="Crafted with care."
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | — | Icon shown above heading (36px, `primary.main`) |
| `imageUrl` | `string` | — | Optional 16/9 header image (takes precedence over icon position) |
| `imageAlt` | `string` | `''` | Alt text for the header image |
| `heading` | `string` | — | Card title |
| `description` | `string` | — | Body text |
| `variant` | `'elevation' \| 'outlined'` | `'outlined'` | MUI Card variant |

---

### `PricingCard`
```tsx
<PricingCard
  planName="Pro"
  price="$29"
  period="/month"
  description="For growing teams."
  features={['Unlimited projects', '10 GB storage', 'Priority support']}
  ctaLabel="Start free trial"
  highlighted
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `planName` | `string` | — | Plan display name |
| `price` | `string` | — | Price string (e.g. `"$29"`, `"Free"`) |
| `period` | `string` | `'/month'` | Period label next to price |
| `description` | `string` | — | Optional short description |
| `features` | `string[]` | — | Checklist items (CheckIcon + primary color) |
| `ctaLabel` | `string` | `'Get started'` | Button label |
| `ctaHref` | `string` | `'#'` | Button href |
| `highlighted` | `boolean` | `false` | Primary border + elevation + `contained` button + "Most popular" label |

---

### `TeamMemberCard`
```tsx
<TeamMemberCard
  name="Jane Smith"
  title="Lead Designer"
  avatarUrl="/jane.jpg"
  bio="10 years in product design."
  socialLinks={[{ icon: <TwitterIcon />, href: '#', label: 'Twitter' }]}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Full name |
| `title` | `string` | — | Job title (shown in `primary.main`) |
| `avatarUrl` | `string` | — | Avatar image URL |
| `bio` | `string` | — | Optional short bio |
| `socialLinks` | `SocialLink[]` | — | Array of `{ icon, href, label }` — renders as `IconButton` row |

---

### `BlogPostCard`
```tsx
<BlogPostCard
  title="Getting started with MUI v6"
  excerpt="A step-by-step guide..."
  thumbnailUrl="/blog/hero.jpg"
  category="Tutorial"
  authorName="Alex Kim"
  authorAvatarUrl="/authors/alex.jpg"
  date="May 15, 2026"
  href="/blog/mui-v6"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Post title |
| `excerpt` | `string` | — | Short preview text |
| `thumbnailUrl` | `string` | — | 16/9 header image |
| `category` | `string` | — | Category chip (primary color) |
| `authorName` | `string` | — | Author display name |
| `authorAvatarUrl` | `string` | — | Author avatar URL |
| `date` | `string` | — | Formatted date string |
| `href` | `string` | `'#'` | Link destination (full card is clickable via `CardActionArea`) |

---

### `TestimonialCard`
```tsx
<TestimonialCard
  quote="This product changed how our team works."
  authorName="Maria Lopez"
  authorTitle="VP Engineering"
  company="Acme Corp"
  avatarUrl="/avatars/maria.jpg"
  rating={5}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `string` | — | Testimonial text (italic) |
| `authorName` | `string` | — | Full name |
| `authorTitle` | `string` | — | Optional job title |
| `company` | `string` | — | Optional company name |
| `avatarUrl` | `string` | — | Author avatar URL |
| `rating` | `number` | — | Star rating 0–5; omit to hide (MUI `Rating`, `precision: 0.5`) |

---

### `ProductCard`
```tsx
<ProductCard
  name="Wireless Headphones"
  price="$79.99"
  originalPrice="$119.99"
  imageUrl="/products/headphones.jpg"
  badge="Sale"
  href="/products/headphones"
  onAddToCart={() => console.log('added')}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Product name |
| `price` | `string` | — | Current price |
| `originalPrice` | `string` | — | Strike-through original price (shown in `text.disabled`) |
| `imageUrl` | `string` | — | Square (1/1) product image |
| `imageAlt` | `string` | `''` | Alt text |
| `badge` | `string` | — | Overlay chip (e.g. "Sale", "New") in error color |
| `href` | `string` | `'#'` | Product page link |
| `onAddToCart` | `() => void` | — | Add-to-cart button click handler |

---

## Theme Awareness

- `borderRadius: 3` applied to all cards (24px with default MUI theme)
- `bgcolor: 'action.hover'` for image placeholders
- `borderColor: 'divider'` for outlined borders (auto light/dark)
- `color: 'primary.main'` for icons, ratings, categories, and titles
- `color: 'text.secondary'` for supporting text and metadata
