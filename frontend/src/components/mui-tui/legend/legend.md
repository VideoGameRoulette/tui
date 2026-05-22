# Legend Components

Location: `frontend/src/components/mui-tui/legend/`

Utility components for displaying status indicators, component-type badges, and data legends. Maps directly to the tracker's symbol key: `[ ]`/`[x]` statuses and 🎨/🔧/🏗️ build types.

---

## StatusBadge

A colored MUI Chip that communicates task or component completion status.

```tsx
import { StatusBadge } from '@/components/mui-tui/legend';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `StatusValue` | required | Status key |
| `label` | `string` | auto | Override the auto-generated label |
| `size` | `ChipProps['size']` | `'small'` | Chip size |
| `variant` | `ChipProps['variant']` | auto | Override chip variant |
| `sx` | `SxProps<Theme>` | — | MUI sx override |

### StatusValue options

| Value | Label | Color | Variant |
|-------|-------|-------|---------|
| `not-started` | Not Started | default | outlined |
| `in-progress` | In Progress | warning | filled |
| `complete` | Complete | success | filled |
| `deprecated` | Deprecated | default | filled |
| `error` | Error | error | filled |
| `warning` | Warning | warning | outlined |

### Example

```tsx
<StatusBadge status="complete" />
<StatusBadge status="in-progress" />
<StatusBadge status="not-started" label="Backlog" />
```

---

## BuildTypeBadge

A Chip with an icon that shows how a component was built — Theme Only, Composite, or Custom.

```tsx
import { BuildTypeBadge } from '@/components/mui-tui/legend';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `BuildType` | required | Build classification |
| `showIcon` | `boolean` | `true` | Show/hide the leading icon |
| `size` | `ChipProps['size']` | `'small'` | Chip size |
| `variant` | `ChipProps['variant']` | `'outlined'` | Chip variant |
| `sx` | `SxProps<Theme>` | — | MUI sx override |

### BuildType options

| Value | Label | Color | Icon |
|-------|-------|-------|------|
| `theme-only` | Theme Only | primary | PaletteIcon |
| `composite` | Composite | secondary | BuildIcon |
| `custom` | Custom | info | ConstructionIcon |

### Example

```tsx
<BuildTypeBadge type="theme-only" />
<BuildTypeBadge type="composite" showIcon={false} />
<BuildTypeBadge type="custom" variant="filled" />
```

---

## Legend

A general-purpose chart/data legend with colored swatches and labels. Supports square, circle, and line swatch shapes.

```tsx
import { Legend } from '@/components/mui-tui/legend';
import type { LegendEntry } from '@/components/mui-tui/legend';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `LegendEntry[]` | required | Legend entries |
| `title` | `string` | — | Optional uppercase title above the legend |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `swatchSize` | `number` | `12` | Width/height of swatch in px |
| `sx` | `SxProps<Theme>` | — | MUI sx override |

### LegendEntry

```ts
interface LegendEntry {
  color: string;         // Any CSS color value
  label: string;
  shape?: 'square' | 'circle' | 'line'; // default: 'square'
}
```

### Swatch shapes

| Shape | Description |
|-------|-------------|
| `square` | Rounded-corner square (default) |
| `circle` | Full circle dot |
| `line` | Short horizontal bar — ideal for line charts |

### Example

```tsx
<Legend
  title="Traffic sources"
  orientation="horizontal"
  items={[
    { color: '#3b82f6', label: 'Organic' },
    { color: '#22c55e', label: 'Referral', shape: 'circle' },
    { color: '#f59e0b', label: 'Direct',   shape: 'line'   },
    { color: '#ef4444', label: 'Paid' },
  ]}
/>

{/* Vertical legend for a sidebar */}
<Legend
  title="Status"
  orientation="vertical"
  swatchSize={10}
  items={[
    { color: '#22c55e', label: 'Online',  shape: 'circle' },
    { color: '#f59e0b', label: 'Away',    shape: 'circle' },
    { color: '#94a3b8', label: 'Offline', shape: 'circle' },
  ]}
/>
```
