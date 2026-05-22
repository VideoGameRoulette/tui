# Material UI CTA & Conversion Components

Call-to-action building blocks for driving user engagement and conversions.

---

## File Structure

| File | Purpose |
|------|---------|
| `CTABanner.tsx` | Full-width section: headline + subtext + button(s); 3 visual variants |
| `CTASplit.tsx` | 50/50 grid — left text block, right slot for form or buttons |
| `AppButton.tsx` | MUI Button with `primary / secondary / ghost / destructive` semantic variants + `loading` state |
| `AppButtonGroup.tsx` | MUI ButtonGroup with `connected` (shared borders) and `spaced` (flex gap) styles |
| `NewsletterSignup.tsx` | Email field + submit button; `inline` or `stacked` layout; success state |
| `PopupCTA.tsx` | MUI Dialog with title, description, optional content slot, CTA + secondary actions |
| `index.ts` | Barrel export (components + prop types) |
| `cta.md` | This file |

---

## Component API

### `CTABanner`
```tsx
<CTABanner
  headline="Ready to get started?"
  subtext="Join thousands of teams already using our platform."
  variant="filled"
  align="center"
  buttons={[
    { label: 'Start free trial', href: '/signup' },
    { label: 'Learn more', href: '/about', variant: 'outlined' },
  ]}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | `string` | — | Main headline |
| `subtext` | `string` | — | Supporting paragraph |
| `buttons` | `CTABannerButton[]` | `[]` | Buttons: `{ label, href?, onClick?, variant? }` |
| `align` | `'left' \| 'center'` | `'center'` | Text and button alignment |
| `variant` | `'default' \| 'filled' \| 'tinted'` | `'default'` | `default` = paper bg with divider borders; `filled` = `primary.main` bg, white text, auto-inverted buttons; `tinted` = `action.selected` bg |
| `sx` | `SxProps` | — | MUI sx passthrough |

First button defaults to `contained`, subsequent buttons to `outlined`. In `filled` mode, button colors are automatically inverted to white.

---

### `CTASplit`
```tsx
<CTASplit
  eyebrow="New feature"
  headline="Automate your workflow"
  subtext="Save hours every week with smart automation."
>
  <NewsletterSignup buttonLabel="Get early access" />
</CTASplit>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | `string` | — | Section headline |
| `subtext` | `string` | — | Supporting paragraph |
| `eyebrow` | `string` | — | Small overline label above headline |
| `children` | `ReactNode` | — | Right-side slot: form, button, image, etc. |
| `reverseOnMobile` | `boolean` | `false` | Show right slot above left text on mobile |
| `sx` | `SxProps` | — | MUI sx passthrough |

Stacks to 1-column on mobile; 50/50 grid on `md+`.

---

### `AppButton`
```tsx
<AppButton appVariant="primary">Sign up</AppButton>
<AppButton appVariant="ghost" size="large">Learn more</AppButton>
<AppButton appVariant="destructive" loading>Deleting…</AppButton>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appVariant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'primary'` | Semantic variant |
| `loading` | `boolean` | `false` | Shows `CircularProgress` in startIcon slot; disables button |
| `sx` | `SxProps` | — | MUI sx passthrough |

Variant → MUI mapping:
- `primary` → `contained` + `primary`
- `secondary` → `contained` + `secondary`
- `ghost` → `outlined` + `primary`
- `destructive` → `contained` + `error`

All other `ButtonProps` are passed through (`size`, `href`, `onClick`, `startIcon`, `endIcon`, etc.).

---

### `AppButtonGroup`
```tsx
// Connected (default) — shared borders like a toolbar
<AppButtonGroup variant="outlined" size="small">
  <Button>Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
</AppButtonGroup>

// Spaced — independent buttons with gap
<AppButtonGroup style="spaced" gap={2}>
  <Button variant="contained">Primary</Button>
  <Button variant="outlined">Secondary</Button>
</AppButtonGroup>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `'connected' \| 'spaced'` | `'connected'` | `connected` uses MUI `ButtonGroup`; `spaced` uses flex with gap |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size (connected mode only) |
| `variant` | `'outlined' \| 'contained' \| 'text'` | `'outlined'` | Button variant (connected mode only) |
| `gap` | `number` | `1` | MUI spacing-unit gap (spaced mode only) |
| `children` | `ReactNode` | — | MUI `Button` components |

---

### `NewsletterSignup`
```tsx
<NewsletterSignup
  headline="Stay in the loop"
  description="Get product updates and tips delivered to your inbox."
  placeholder="you@company.com"
  buttonLabel="Subscribe"
  layout="inline"
  onSubmit={(email) => console.log(email)}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | `string` | — | Optional section headline |
| `description` | `string` | — | Optional supporting text |
| `placeholder` | `string` | `'Enter your email'` | Input placeholder |
| `buttonLabel` | `string` | `'Subscribe'` | Submit button label |
| `layout` | `'inline' \| 'stacked'` | `'inline'` | `inline`: field + button in a row (stacks to column on xs); `stacked`: full-width field above full-width button |
| `onSubmit` | `(email: string) => void` | — | Called on valid form submission; triggers success state |

On submit, replaces form with "Thanks for subscribing!" confirmation text.

---

### `PopupCTA`
```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open offer</Button>
<PopupCTA
  open={open}
  onClose={() => setOpen(false)}
  title="Get 30% off your first month"
  description="Use code WELCOME30 at checkout. Offer expires soon."
  ctaLabel="Claim offer"
  secondaryLabel="No thanks"
  onCTA={() => router.push('/signup?code=WELCOME30')}
>
  {/* optional form or custom content */}
</PopupCTA>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls dialog visibility |
| `onClose` | `() => void` | — | Called on backdrop click, close button, or secondary action |
| `title` | `string` | — | Dialog title (bold) |
| `description` | `string` | — | Optional body text above `children` |
| `children` | `ReactNode` | — | Optional content slot (form, image, etc.) |
| `ctaLabel` | `string` | `'Get started'` | Primary action button label |
| `onCTA` | `() => void` | — | Primary action handler (dialog closes after) |
| `secondaryLabel` | `string` | — | Optional secondary/dismiss button label |
| `onSecondary` | `() => void` | — | Secondary action handler (dialog closes after) |
| `maxWidth` | `'xs' \| 'sm' \| 'md'` | `'sm'` | Dialog max width |
| `sx` | `SxProps` | — | Applied to Dialog `Paper` |

Close icon always shown in top-right corner.

---

## Theme Awareness

- `CTABanner` `filled` variant uses `primary.main` background; button colors auto-invert
- `CTABanner` `tinted` uses `action.selected` (theme-aware transparent primary tint)
- `AppButton` uses MUI color tokens — inherits theme primary/secondary/error
- `PopupCTA` uses `borderRadius: 3` on Dialog Paper
- All text uses `text.primary` / `text.secondary` semantic tokens
