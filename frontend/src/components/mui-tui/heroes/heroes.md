# Material UI Hero & Header Components

Full-page hero sections and page-level header blocks. All are custom-built with MUI primitives and support light/dark mode.

---

## File Structure

| File | Purpose |
|------|---------|
| `HeroCentered.tsx` | Centered headline + CTA with radial gradient bg |
| `HeroSplit.tsx` | Two-column: text left + image right (or reversed) |
| `HeroVideoBG.tsx` | Full-viewport hero with autoplay video background + overlay |
| `HeroCarousel.tsx` | Auto-advancing 3-slide carousel with fade, dots, prev/next |
| `PageHeader.tsx` | Inner-page header: breadcrumbs + title + description + optional actions |
| `AnnouncementBar.tsx` | Slim dismissible top-of-page banner; 4 severity variants |
| `index.ts` | Barrel export (components + prop types) |
| `heroes.md` | This file |

---

## Component API

### `HeroCentered`
```tsx
<HeroCentered
  badge="Announcing v2.0"
  headline="Data to enrich your\nonline business"
  description="..."
  primaryCTA={{ label: 'Get started', href: '/signup' }}
  secondaryCTA={{ label: 'Learn more', href: '/about' }}
/>
```
- Radial indigo gradient blob behind text (adapts opacity per mode)
- `\n` in headline creates a line break (uses `white-space: pre-line`)

---

### `HeroSplit`
```tsx
<HeroSplit
  imagePosition="right"   // 'left' | 'right'
  imageSrc="https://..."
  headline="Deploy to the cloud\nwith confidence."
  primaryCTA={{ label: 'Get started', href: '#' }}
/>
```
- 50/50 grid on `lg:`, stacked on mobile; image always renders after text on mobile
- Image block has `border-radius: 3` and a mode-aware shadow

---

### `HeroVideoBG`
```tsx
<HeroVideoBG
  videoSrc="/hero-reel.mp4"
  poster="/hero-poster.jpg"
  overlayOpacity={0.55}
  headline="The future of work\nstarts here."
/>
```
- Always uses white text (content is over dark video/overlay — mode-agnostic)
- `overlayOpacity` controls how dark the scrim is (0–1, default 0.55)
- `videoSrc` empty → shows solid dark background (safe fallback)

---

### `HeroCarousel`
```tsx
<HeroCarousel
  slides={mySlides}
  autoPlay={true}
  interval={5000}
/>
```
- Pauses on hover; resumes on mouse leave
- All slides rendered; non-active slides are `opacity: 0` + `pointer-events: none`
- Per-slide `accentColor` drives the gradient blob tint
- Dot indicators expand when active (pill shape)

---

### `PageHeader`
```tsx
<PageHeader
  breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: 'Alpha' }]}
  title="Project Alpha"
  description="A short description of this project."
  actions={<><Button>Edit</Button><Button variant="contained">Publish</Button></>}
  divider={true}
/>
```
- Uses `background.paper` so it sits visually above the page bg
- `divider` prop adds `border-bottom: 1px solid divider` (default true)

---

### `AnnouncementBar`
```tsx
<AnnouncementBar
  severity="brand"         // 'brand' | 'info' | 'success' | 'warning'
  message="Big news! New feature just launched."
  linkLabel="Read more"
  linkHref="/blog/launch"
  dismissible={true}
/>
```
- Severity controls bg color (hardcoded brand palette, not theme tokens — intentional: always high-contrast)
- `dismissible` shows ×  button; once dismissed, component returns null

---

## Theme Awareness

| Component | Dark Mode Strategy |
|-----------|-------------------|
| `HeroCentered` | `background.default` bg + opacity-adjusted radial gradient |
| `HeroSplit` | `background.default` bg + mode-aware shadow on image |
| `HeroVideoBG` | Always dark bg (slate-900) — video/overlay makes theme irrelevant |
| `HeroCarousel` | `background.default` bg + opacity-adjusted per-slide gradient blobs |
| `PageHeader` | `background.paper` bg + semantic text/border tokens |
| `AnnouncementBar` | Hardcoded brand colors (light vs dark variant of same hue) via `useTheme()` |
