# Material UI Media Components

Rich-media building blocks for images, video, maps, and animated illustrations.

---

## File Structure

| File | Purpose |
|------|---------|
| `MediaImage.tsx` | Single image with caption, aspect ratio, and object-fit controls |
| `ImageGallery.tsx` | Grid or masonry photo gallery with MUI Dialog lightbox |
| `VideoEmbed.tsx` | YouTube / Vimeo / self-hosted `<video>` with aspect-ratio wrapper |
| `BackgroundImageSection.tsx` | Section with image or gradient background + adjustable overlay |
| `LottieAnimation.tsx` | Animated illustration block via `lottie-react` (dynamic import) |
| `MapEmbed.tsx` | Google Maps or Mapbox `<iframe>` embed block |
| `index.ts` | Barrel export (components + prop types) |
| `media.md` | This file |

---

## Component API

### `MediaImage`
```tsx
<MediaImage
  src="/photo.jpg"
  alt="Scenic view"
  caption="Photo taken in 2024"
  aspectRatio="16/9"
  objectFit="cover"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | `''` | Alt text |
| `caption` | `string` | — | Optional figcaption below the image |
| `aspectRatio` | `'1/1' \| '4/3' \| '3/2' \| '16/9' \| '21/9' \| 'auto'` | `'16/9'` | Aspect ratio of the image box |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'` | CSS object-fit |
| `borderRadius` | `number` | `2` | MUI border-radius token |
| `sx` | `SxProps` | — | MUI sx passthrough |

---

### `ImageGallery`
```tsx
<ImageGallery
  images={[{ src: '/a.jpg', alt: 'A', caption: 'Caption A' }]}
  variant="grid"
  cols={3}
  gap={2}
  lightbox
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `GalleryImage[]` | — | Array of `{ src, alt?, caption? }` |
| `variant` | `'grid' \| 'masonry'` | `'grid'` | Layout mode |
| `cols` | `2 \| 3 \| 4` | `3` | Number of columns on desktop |
| `gap` | `number` | `2` | MUI spacing-unit gap |
| `lightbox` | `boolean` | `true` | Enable click-to-expand Dialog |
| `sx` | `SxProps` | — | MUI sx passthrough |

Grid variant uses 4/3 aspect-ratio cells. Masonry uses CSS `column-count`. Both collapse to 1 column on `xs`.

---

### `VideoEmbed`
```tsx
<VideoEmbed src="https://youtube.com/watch?v=abc123" />
<VideoEmbed src="/video.mp4" poster="/thumb.jpg" autoPlay muted loop />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | YouTube URL, Vimeo URL, or self-hosted file path |
| `poster` | `string` | — | Poster image for self-hosted video |
| `aspectRatio` | `'16/9' \| '4/3' \| '1/1'` | `'16/9'` | Wrapper aspect ratio |
| `autoPlay` | `boolean` | `false` | Auto-play (self-hosted only) |
| `muted` | `boolean` | `true` | Mute audio (self-hosted only) |
| `loop` | `boolean` | `false` | Loop playback (self-hosted only) |
| `controls` | `boolean` | `true` | Show controls (self-hosted only) |
| `title` | `string` | `'Video'` | iframe `title` for accessibility |
| `sx` | `SxProps` | — | MUI sx passthrough |

YouTube and Vimeo URLs are detected by pattern and converted to embed URLs automatically.

---

### `BackgroundImageSection`
```tsx
<BackgroundImageSection
  imageUrl="/hero.jpg"
  overlayOpacity={0.5}
  minHeight={600}
>
  <Container><Typography variant="h2" color="white">...</Typography></Container>
</BackgroundImageSection>

<BackgroundImageSection
  gradient="linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 100%)"
  overlayOpacity={0}
>
  ...
</BackgroundImageSection>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | — | Background image URL |
| `gradient` | `string` | — | CSS gradient string (used when no `imageUrl`) |
| `overlayColor` | `string` | `'#000'` | Scrim colour |
| `overlayOpacity` | `number` | `0.45` | Scrim opacity (0–1) |
| `minHeight` | `string \| number` | `480` | Minimum section height in px |
| `children` | `ReactNode` | — | Content rendered above the overlay |
| `sx` | `SxProps` | — | MUI sx passthrough |

---

### `LottieAnimation`
> **Peer dependency:** `npm i lottie-react`

```tsx
import animationData from './animation.json';
<LottieAnimation animationData={animationData} loop autoplay width={320} />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animationData` | `object` | — | Lottie JSON animation data |
| `loop` | `boolean` | `true` | Loop the animation |
| `autoplay` | `boolean` | `true` | Start playing automatically |
| `width` | `string \| number` | `'100%'` | Container width |
| `height` | `string \| number` | `'auto'` | Container height |
| `sx` | `SxProps` | — | MUI sx passthrough |

Loaded via `next/dynamic` with `ssr: false` — no server-side rendering overhead.

---

### `MapEmbed`
> Caller must supply an embed URL (Google Maps "Share → Embed a map" src, or Mapbox embed URL).

```tsx
<MapEmbed
  src="https://www.google.com/maps/embed?pb=..."
  title="Our office location"
  height={450}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | iframe embed URL |
| `title` | `string` | `'Map'` | iframe `title` for accessibility |
| `height` | `string \| number` | `400` | Map height in px |
| `borderRadius` | `number` | `2` | MUI border-radius token |
| `sx` | `SxProps` | — | MUI sx passthrough |

---

## Theme Awareness

All components use MUI semantic tokens:
- `bgcolor: 'action.hover'` for image placeholders (adapts light/dark)
- `borderColor: 'divider'` for borders
- `color: 'text.secondary'` for captions
- `bgcolor: 'background.default'` for lightbox and video backgrounds
