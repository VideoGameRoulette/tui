# Material UI Social Proof Components

Trust-building components for showcasing testimonials, logos, ratings, and case studies.

---

## File Structure

| File | Purpose |
|------|---------|
| `TestimonialsSlider.tsx` | Auto-playing fade carousel of testimonials — pause-on-hover, dots + arrows |
| `TestimonialsGrid.tsx` | Grid of `TestimonialCard` components — regular or CSS masonry layout |
| `LogoBar.tsx` | Client logo row — `scroll` (CSS marquee) or `static` mode; grayscale option |
| `ReviewStars.tsx` | MUI `Rating` wrapper — optional value label, review count, and custom label |
| `CaseStudyBlock.tsx` | Problem → Solution → Result layout with metrics row and customer quote |
| `index.ts` | Barrel export (all components + prop types) |
| `social-proof.md` | This file |

---

## Component API

### `TestimonialsSlider`
```tsx
<TestimonialsSlider
  slides={testimonials}
  autoPlay
  interval={6000}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `SlideTestimonial[]` | 3 defaults | Array of testimonial data |
| `autoPlay` | `boolean` | `true` | Auto-advance slides |
| `interval` | `number` | `5000` | Auto-advance interval in ms |

`SlideTestimonial`: `{ quote, authorName, authorTitle?, company?, avatarUrl?, rating?, accentColor? }`

Same auto-play pattern as `HeroCarousel`: `setInterval` in `useEffect`, pauses on `mouseEnter`, clears on `mouseLeave`. Fade transition via `opacity` (no layout shift).

---

### `TestimonialsGrid`
```tsx
<TestimonialsGrid
  testimonials={reviews}
  cols={3}
  masonry
  eyebrow="Customer stories"
  title="Loved by teams worldwide"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `testimonials` | `TestimonialCardProps[]` | 6 defaults | Testimonial card data |
| `cols` | `1 \| 2 \| 3` | `3` | Max columns (responsive: sm=min(cols,2), xs=1) |
| `masonry` | `boolean` | `false` | CSS `column-count` masonry layout |
| `gap` | `number` | `3` | MUI spacing gap |
| `eyebrow` | `string` | — | Overline above title |
| `title` | `string` | — | Section heading |
| `description` | `string` | — | Section subtext |

Uses `TestimonialCard` from `../cards/` — no duplicate rendering logic.

---

### `LogoBar`
```tsx
<LogoBar
  logos={clientLogos}
  mode="scroll"
  label="Trusted by 500+ teams"
  grayscale
  speed={25}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logos` | `Logo[]` | 8 defaults | `{ name, src?, href?, alt? }[]` |
| `mode` | `'scroll' \| 'static'` | `'scroll'` | Animation mode |
| `label` | `string` | — | Overline label above logos |
| `height` | `number` | `32` | Logo image height in px |
| `grayscale` | `boolean` | `true` | Filter + opacity on logos; full color on hover |
| `speed` | `number` | `30` | Scroll speed — duration = `logos.length × speed` seconds |

**Scroll mode**: logos are duplicated for a seamless infinite marquee. Mask gradient fades edges. Pauses on hover.

**Static mode**: flex-wrap centered row.

**Text logos**: if `src` is omitted, renders the `name` as styled typography (useful for demos).

---

### `ReviewStars`
```tsx
<ReviewStars value={4.7} showValue count={1284} size="small" />

<ReviewStars
  value={rating}
  onChange={setRating}
  readOnly={false}
  precision={1}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Star rating value |
| `onChange` | `(value: number \| null) => void` | — | Change handler (interactive mode) |
| `readOnly` | `boolean` | `true` | Read-only display |
| `precision` | `number` | `0.5` | Step precision |
| `max` | `number` | `5` | Max stars |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Star size |
| `showValue` | `boolean` | `false` | Show numeric value (e.g. "4.7") |
| `count` | `number` | — | Review count shown as "(1,234 reviews)" |
| `label` | `string` | — | Custom suffix text beside stars |

---

### `CaseStudyBlock`
```tsx
<CaseStudyBlock
  eyebrow="Case Study"
  title="How Acme doubled throughput in 90 days"
  description="..."
  steps={customSteps}
  metrics={[
    { value: '2×', label: 'Throughput' },
    { value: '90 days', label: 'Time to ROI' },
  ]}
  quote="This was the best decision we made all year."
  quoteAuthor="Jane Doe"
  quoteRole="CTO, Acme Corp"
  imageUrl="/images/case-study.jpg"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `eyebrow` | `string` | — | Overline (e.g. "Case Study") |
| `title` | `string` | — | Main heading |
| `description` | `string` | — | Introductory paragraph |
| `imageUrl` | `string` | — | Hero image (triggers 2-col header layout on md+) |
| `imageAlt` | `string` | — | Image alt text |
| `steps` | `CaseStudyStep[]` | 3 defaults | Problem/Solution/Result steps |
| `metrics` | `CaseStudyMetric[]` | 4 defaults | Key numbers displayed in a grid |
| `quote` | `string` | — | Customer pull quote |
| `quoteAuthor` | `string` | — | Quote author name |
| `quoteRole` | `string` | — | Author title / company |
| `quoteAvatarUrl` | `string` | — | Author avatar image URL |

`CaseStudyStep`: `{ label?, heading, body, icon? }`
`CaseStudyMetric`: `{ value, label, description? }`

Steps render with a numbered circle badge (1/2/3) that can be replaced with a custom `icon`. Metrics sit below a `Divider` in a responsive grid (2-col xs, up to 4-col sm+).

---

## Theme Awareness

- `TestimonialsSlider` dots use `rgba(255,255,255,0.2)` in dark mode and `rgba(0,0,0,0.15)` in light mode — same logic as `HeroCarousel`.
- `LogoBar` mask gradient uses standard CSS `linear-gradient` — works in all modes.
- `CaseStudyBlock` quote box uses `action.hover` for the background — adapts light/dark automatically.
- All accent colors in `TestimonialsSlider` default slides use low-opacity rgba — safe in both modes.
