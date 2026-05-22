# Content Block Components

All content-related display components. Designed for page body zones — articles, landing sections, feature lists, data tables.

---

## Folder Structure

```
content/
  RichText.tsx        ← HTML or React children with full typographic styling
  TextImage.tsx       ← Side-by-side text + image with imagePosition
  PullQuote.tsx       ← Styled blockquote; 3 variants
  StatBlock.tsx       ← Metric row; 3 variants, 2–4 stats
  IconText.tsx        ← Feature grid; 3 icon styles, 1–3 columns
  Timeline.tsx        ← Vertical timeline (custom — no @mui/lab)
  CodeBlock.tsx       ← Dark code block + copy button
  ContentTable.tsx    ← Striped MUI Table, sticky header, horizontal scroll
  index.ts            ← barrel export
  content.md          ← this file
```

---

## Component Summary

| Status | Component | Description |
|--------|-----------|-------------|
| [x] | RichText | Renders raw HTML or React children with full MUI-token typographic styles |
| [x] | TextImage | 50/50 grid; `imagePosition: 'left'\|'right'`; stacks on mobile |
| [x] | PullQuote | Variants: `left-border` (default), `centered`, `large` |
| [x] | StatBlock | Variants: `simple`, `divided`, `card`; `eyebrow` + `headline` header |
| [x] | IconText | Icon styles: `bare`, `chip` (default), `circle`; `columns: 1\|2\|3` |
| [x] | Timeline | Variants: `default`, `compact`, `alternating`; custom dot/connector |
| [x] | CodeBlock | `language`, `filename`, `showLineNumbers`; async clipboard copy |
| [x] | ContentTable | `striped`, `stickyHeader`, `maxHeight`, `outlined`; demo data included |

---

## API Quick Reference

### `RichText`
```tsx
<RichText html={sanitizedHtml} constrained />
<RichText constrained><h2>Hello</h2><p>World</p></RichText>
```
| Prop | Type | Default |
|------|------|---------|
| `html` | `string` | — |
| `children` | `ReactNode` | — |
| `constrained` | `boolean` | `false` — caps maxWidth to 680px |
| `sx` | `SxProps` | — |

---

### `TextImage`
```tsx
<TextImage
  eyebrow="Why us"
  headline="Built for scale"
  body="Paragraph text..."
  imageUrl="/hero.jpg"
  imagePosition="left"
  cta={{ label: 'Learn more', href: '/about' }}
/>
```
| Prop | Type | Default |
|------|------|---------|
| `imagePosition` | `'left'\|'right'` | `'right'` |
| `cta.variant` | `'contained'\|'outlined'\|'text'` | `'contained'` |

---

### `PullQuote`
```tsx
<PullQuote quote="..." attribution="Jane Doe" role="CEO" variant="large" />
```
| `variant` | Description |
|-----------|-------------|
| `left-border` | 4px primary-color left border, italic text |
| `centered` | Centered with CSS open/close quote chars |
| `large` | Top border rule, display-size type, dash separator |

---

### `StatBlock`
```tsx
<StatBlock
  stats={[{ value: '8K+', label: 'Customers', description: '...' }]}
  variant="card"
  headline="By the numbers"
/>
```
| `variant` | Description |
|-----------|-------------|
| `simple` | 2-col→4-col grid, no borders |
| `divided` | Full-width row with vertical dividers between cells |
| `card` | Each stat in an outlined Paper card |

---

### `IconText`
```tsx
<IconText
  items={[{ icon: BoltIcon, headline: 'Fast', body: '...' }]}
  iconStyle="circle"
  columns={3}
  centered
/>
```
| `iconStyle` | Description |
|-------------|-------------|
| `bare` | Icon only, `primary.main` colour, 32px |
| `chip` | Square rounded chip, `primary.main` bg, white icon |
| `circle` | Circle with `action.selected` bg, `primary.main` icon |

---

### `Timeline`
```tsx
<Timeline
  items={[{ date: 'Jan 2022', title: 'Founded', body: '...', tag: 'Milestone' }]}
  variant="alternating"
/>
```
| `variant` | Description |
|-----------|-------------|
| `default` | Left-rail dots + connector, full body text |
| `compact` | Left-rail, no body text — just date + title |
| `alternating` | Centre rail; items alternate left/right on md+ |

---

### `CodeBlock`
```tsx
<CodeBlock
  code={`const x = 1;`}
  language="javascript"
  filename="app.js"
  showLineNumbers
/>
```
- Always dark (`#0f172a` bg, `#e2e8f0` text) — does not respond to theme mode
- Copy button uses `navigator.clipboard.writeText`; silently no-ops on HTTP

---

### `ContentTable`
```tsx
<ContentTable
  columns={[{ key: 'name', label: 'Name', minWidth: 140 }]}
  rows={[{ name: 'Alex' }]}
  striped
  stickyHeader
  maxHeight={400}
/>
```
| Prop | Type | Default |
|------|------|---------|
| `striped` | `boolean` | `true` |
| `stickyHeader` | `boolean` | `false` |
| `maxHeight` | `number` | — |
| `outlined` | `boolean` | `true` |
| `caption` | `string` | — |

---

## Theme Awareness

| Component | Dark Mode Strategy |
|-----------|--------------------|
| `RichText` | All colours via MUI semantic tokens |
| `TextImage` | Image placeholder `action.hover`; text uses `text.*` tokens |
| `PullQuote` | `text.primary` / `primary.main` tokens throughout |
| `StatBlock` | Paper/divider tokens; chip header uses `action.selected` |
| `IconText` | Chip bg `primary.main`; circle bg `action.selected` |
| `Timeline` | Line colour: `rgba(0,0,0,0.1)` light / `rgba(255,255,255,0.12)` dark |
| `CodeBlock` | Always dark — intentionally theme-independent |
| `ContentTable` | Stripe: `rgba(0,0,0,0.025)` / `rgba(255,255,255,0.03)`; header bg switches |

---

## Import Paths

```ts
import {
  RichText, TextImage, PullQuote, StatBlock,
  IconText, Timeline, CodeBlock, ContentTable,
} from '@/components/mui-tui/content';
```
