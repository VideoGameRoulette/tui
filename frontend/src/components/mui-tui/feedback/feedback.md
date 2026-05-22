# Material UI Feedback & Alerts Components

Status messaging, loading states, and overlay components. All are client components. Theme-aware via MUI semantic tokens.

---

## File Structure

| File | Purpose |
|------|---------|
| `AppAlert.tsx` | MUI `Alert` wrapper — severity, variant, optional title, self-dismissing `closeable` prop |
| `AppToast.tsx` | `Snackbar` + `Alert` — controlled open state, position, auto-hide duration |
| `AppDialog.tsx` | `Dialog` with title, content, actions slots; close button; rounded Paper |
| `AppTooltip.tsx` | `Tooltip` wrapper — `content` prop (renames MUI's `title`), `maxWidth`, `arrow` default on |
| `AppProgressBar.tsx` | `LinearProgress` — custom `height`, `showLabel`, all MUI color/variant options |
| `AppSkeleton.tsx` | `Skeleton` — `count` renders stacked skeletons; last text line auto-shortened to 60% |
| `EmptyState.tsx` | Custom no-results placeholder — icon circle, title, description, primary + secondary CTA |
| `AppSpinner.tsx` | `CircularProgress` — `label` below spinner, `center` prop for overlay centering |
| `index.ts` | Barrel export (all components + prop types) |
| `feedback.md` | This file |

---

## Component API

### `AppAlert`
```tsx
<AppAlert severity="warning" title="Heads up" closeable>
  This action cannot be undone.
</AppAlert>

<AppAlert severity="success" variant="filled">
  Your changes have been saved.
</AppAlert>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `severity` | `'error' \| 'warning' \| 'info' \| 'success'` | `'info'` | Alert color and icon |
| `variant` | `'filled' \| 'outlined' \| 'standard'` | `'standard'` | Visual style |
| `title` | `string` | — | Bold title above message |
| `closeable` | `boolean` | — | Adds ✕ button; hides alert via internal `Collapse` |
| `onClose` | `() => void` | — | Called when closed (works with or without `closeable`) |
| `action` | `ReactNode` | — | Custom action slot (replaces close button) |
| `icon` | `ReactNode \| false` | — | Custom icon or `false` to hide |

---

### `AppToast`
```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Show toast</Button>
<AppToast
  open={open}
  onClose={() => setOpen(false)}
  message="File uploaded successfully."
  severity="success"
  position={{ vertical: 'top', horizontal: 'right' }}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controls visibility |
| `onClose` | `() => void` | required | Called when dismissed (not on clickaway) |
| `message` | `string` | required | Toast message |
| `severity` | `AlertColor` | `'info'` | Alert severity |
| `variant` | `'filled' \| 'outlined' \| 'standard'` | `'filled'` | Alert visual style |
| `duration` | `number` | `4000` | Auto-hide delay in ms |
| `position` | `SnackbarOrigin` | `{ vertical: 'bottom', horizontal: 'left' }` | Screen position |

---

### `AppDialog`
```tsx
<AppDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  actions={
    <>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  <DialogContentText>This cannot be undone.</DialogContentText>
</AppDialog>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controls visibility |
| `onClose` | `() => void` | required | Called on backdrop click or ✕ |
| `title` | `string` | — | `DialogTitle` text |
| `children` | `ReactNode` | — | `DialogContent` slot |
| `actions` | `ReactNode` | — | `DialogActions` slot |
| `maxWidth` | `DialogProps['maxWidth']` | `'sm'` | Max width breakpoint |
| `fullWidth` | `boolean` | `true` | Stretch to maxWidth |
| `dividers` | `boolean` | `false` | Divider lines in `DialogContent` |
| `showCloseButton` | `boolean` | `true` | Absolute ✕ icon in top-right |

---

### `AppTooltip`
```tsx
<AppTooltip content="Copy to clipboard" placement="bottom">
  <IconButton>...</IconButton>
</AppTooltip>

<AppTooltip content={<Box>Rich <strong>content</strong></Box>} maxWidth={300}>
  <span>Hover me</span>
</AppTooltip>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | required | Tooltip content (maps to MUI `title`) |
| `maxWidth` | `number \| string` | `220` | Max tooltip width in px |
| `arrow` | `boolean` | `true` | Show arrow pointing to target |
| `placement` | `TooltipProps['placement']` | `'top'` | Tooltip position |
| `enterDelay` | `number` | `200` | Delay before showing (ms) |
| `children` | `ReactElement` | required | Target element |

---

### `AppProgressBar`
```tsx
<AppProgressBar value={72} showLabel color="success" height={8} />
<AppProgressBar variant="indeterminate" color="secondary" />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress 0–100 (determinate only) |
| `variant` | `LinearProgressProps['variant']` | `'determinate'` | `determinate \| indeterminate \| buffer \| query` |
| `color` | `LinearProgressProps['color']` | `'primary'` | MUI color token |
| `height` | `number` | `6` | Bar height in px (also sets border-radius) |
| `showLabel` | `boolean` | `false` | Show percentage label above bar |
| `label` | `string` | — | Custom label text (overrides auto percentage) |

---

### `AppSkeleton`
```tsx
<AppSkeleton variant="text" count={3} />
<AppSkeleton variant="rectangular" width="100%" height={200} />
<AppSkeleton variant="circular" width={48} height={48} />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'rectangular' \| 'rounded' \| 'circular'` | `'text'` | Shape |
| `animation` | `'pulse' \| 'wave' \| false` | `'wave'` | Animation type |
| `width` | `number \| string` | — | Width (auto for `text`) |
| `height` | `number \| string` | — | Height (auto for `text`) |
| `count` | `number` | `1` | Render N stacked skeletons (last `text` line → 60% width) |
| `gap` | `number` | `1` | MUI spacing gap between stacked skeletons |

---

### `EmptyState`
```tsx
<EmptyState
  icon={<SearchOffIcon sx={{ fontSize: 36 }} />}
  title="No results found"
  description="Try adjusting your filters or search term."
  action={{ label: 'Clear filters', onClick: clearFilters }}
  secondaryAction={{ label: 'Browse all', onClick: browseAll, variant: 'text' }}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Primary heading |
| `description` | `string` | — | Secondary explanation text (max 360px wide) |
| `icon` | `ReactNode` | `<InboxIcon />` | Icon inside the circle background |
| `action` | `EmptyStateAction` | — | Primary CTA button |
| `secondaryAction` | `EmptyStateAction` | — | Secondary CTA button |

`EmptyStateAction`: `{ label: string; onClick: () => void; variant?: 'contained' | 'outlined' | 'text' }`

---

### `AppSpinner`
```tsx
<AppSpinner size={24} color="inherit" />
<AppSpinner size={64} label="Loading data…" center />
<AppSpinner variant="determinate" value={progress} size={48} />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `40` | Diameter in px |
| `color` | `CircularProgressProps['color']` | `'primary'` | MUI color token |
| `thickness` | `number` | `3.6` | Ring thickness |
| `variant` | `'indeterminate' \| 'determinate'` | `'indeterminate'` | Animation mode |
| `value` | `number` | — | Progress 0–100 (determinate only) |
| `label` | `string` | — | Caption text below spinner |
| `center` | `boolean` | `false` | Absolute-center inside positioned parent |

---

## Theme Awareness

- All severity colors (`error`, `warning`, `info`, `success`) resolve from the MUI theme automatically.
- `AppAlert` uses `Collapse` for animated dismiss — no layout shift.
- `AppToast` ignores `'clickaway'` events per MUI best practice.
- `EmptyState` icon circle uses `action.hover` for dark-mode compatibility.
- `AppSpinner center` requires a `position: relative` (or similar) parent container.
