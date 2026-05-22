# Material UI Layout & Structure Components

Primitive layout building blocks for composing page sections. All are thin wrappers or extensions of MUI components with project-standard defaults applied.

---

## File Structure

| File | Purpose |
|------|---------|
| `Section.tsx` | Semantic section wrapper with `py` size presets and optional top/bottom borders |
| `Container.tsx` | MUI Container wrapper with project-standard `px` gutters (`xs:3, sm:6, lg:8`) |
| `Grid.tsx` | CSS grid wrapper with responsive column count and gap controls |
| `Columns.tsx` | Preset column layouts (2-col, 3-col, 4-col, sidebar variants) via CSS grid |
| `Divider.tsx` | MUI Divider extension with `dashed` and `dotted` line style support |
| `Spacer.tsx` | Blank vertical/horizontal spacer block with MUI spacing-unit size prop |
| `index.ts` | Barrel export (components + prop types) |
| `layout.md` | This file |

---

## Component API

### `Section`
```tsx
<Section py="lg" topBorder as="article">
  ...
</Section>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `ElementType` | `'section'` | Rendered HTML element |
| `py` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Vertical padding preset |
| `topBorder` | `boolean` | `false` | Adds `1px solid divider` border on top |
| `bottomBorder` | `boolean` | `false` | Adds `1px solid divider` border on bottom |
| `sx` | `SxProps` | — | MUI sx passthrough |

Padding values (MUI units): `sm` → xs:4/sm:6 · `md` → xs:8/sm:12 · `lg` → xs:12/sm:16 · `xl` → xs:16/sm:24

---

### `Container`
```tsx
<Container maxWidth="lg" padded>
  ...
</Container>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| false` | `'xl'` | Max width breakpoint |
| `padded` | `boolean` | `true` | Applies `px: { xs:3, sm:6, lg:8 }` gutters |

---

### `Grid`
```tsx
<Grid cols={{ xs: 1, sm: 2, lg: 4 }} gap={4}>
  ...
</Grid>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `1\|2\|3\|4\|6\|12` or responsive object | `12` | Number of equal columns |
| `gap` | `number` | — | Uniform gap (MUI spacing units) |
| `rowGap` | `number` | — | Row-only gap |
| `colGap` | `number` | — | Column-only gap |

---

### `Columns`
```tsx
<Columns variant="sidebar-left" gap={6}>
  <aside>...</aside>
  <main>...</main>
</Columns>
```
| Variant | Desktop layout |
|---------|----------------|
| `two-col` | 50% / 50% |
| `three-col` | 33% / 33% / 33% |
| `four-col` | 25% × 4 |
| `sidebar-left` | 240px / 1fr |
| `sidebar-right` | 1fr / 240px |
| `sidebar-left-wide` | 320px / 1fr |
| `sidebar-right-wide` | 1fr / 320px |

All variants collapse to 1-column on mobile.

---

### `Divider`
```tsx
<Divider lineStyle="dashed" spacing={4} />
<Divider>Or continue with</Divider>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lineStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Border style |
| `spacing` | `number` | `2` | `my` spacing (MUI units) |
| `variant` | `'fullWidth' \| 'inset' \| 'middle'` | `'fullWidth'` | MUI Divider variant (solid only) |
| `children` | `ReactNode` | — | Label between lines (solid only) |

---

### `Spacer`
```tsx
<Spacer size={8} />
<Spacer axis="horizontal" size={2} />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `4` | Height/width in MUI spacing units (1 unit = 8px) |
| `axis` | `'vertical' \| 'horizontal'` | `'vertical'` | Direction of the space |

---

## Theme Awareness

These are thin primitives — they rely on MUI semantic tokens rather than `useTheme()`:
- Border colors use `borderColor: 'divider'` (adapts light/dark automatically)
- Text inherits from parent (no hardcoded colors)
- `Divider` with `solid` uses MUI's built-in theme-aware Divider component
