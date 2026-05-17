# Mooey — MUI Component Build Tracker

> CMS block library built with **Material UI**. Components are categorized by build type:
> - 🎨 **Theme Only** — MUI native, just needs brand styling
> - 🔧 **Composite** — Built from MUI primitives, requires custom layout/logic
> - 🏗️ **Custom** — No MUI equivalent, built from scratch with MUI as base

**Progress: 2 / 93 complete**

---

## Layout & Structure

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Section | 🏗️ Custom | Full-width page section wrapper with padding/spacing controls |
| [ ] | Container | 🎨 Theme Only | MUI `Container` — set `maxWidth` variants to match design system |
| [ ] | Grid | 🎨 Theme Only | MUI `Grid2` — configure column/gap defaults |
| [ ] | Columns | 🔧 Composite | Preset column layouts (2-col, 3-col, sidebar+content) using MUI Grid |
| [ ] | Divider | 🎨 Theme Only | MUI `Divider` — style variants (solid, dashed, with label) |
| [ ] | Spacer | 🏗️ Custom | Blank vertical spacing block with height prop |

---

## Hero & Headers

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Hero – Centered | 🏗️ Custom | Large headline + subtext + CTA, centered layout |
| [ ] | Hero – Split | 🏗️ Custom | Left text / right image (or reversed) |
| [ ] | Hero – Video BG | 🏗️ Custom | Fullscreen hero with autoplay background video |
| [ ] | Hero – Carousel | 🔧 Composite | Looping slides hero, built with MUI + custom slider logic |
| [ ] | Page Header | 🏗️ Custom | Inner-page title block: breadcrumb + title + subtitle |
| [ ] | Announcement Bar | 🔧 Composite | Top-of-page slim banner using MUI `Alert` or custom |

---

## Navigation

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Navbar | 🔧 Composite | 11 variants: simple light/dark, with search, centered search, quick action, column layout, menu-left — all from Tailwind Plus |
| [ ] | Mega Menu | 🔧 Composite | MUI `Popper` or `Menu` with grouped links + featured content |
| [ ] | Sidebar Nav | 🔧 Composite | MUI `Drawer` (permanent variant) + `List` items |
| [~] | Breadcrumb | 🎨 Theme Only | MUI `Breadcrumbs` — theme separator and link styles |
| [x] | Footer | 🏗️ Custom | Converting Tailwind Plus footer variants |
| [ ] | Tab Bar | 🎨 Theme Only | MUI `BottomNavigation` — mobile-first bottom tabs |

---

## Content Blocks

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Rich Text | 🏗️ Custom | WYSIWYG output renderer: headings, paragraphs, lists, blockquotes, inline code |
| [ ] | Text + Image | 🏗️ Custom | Side-by-side text and image with alignment controls |
| [ ] | Pull Quote | 🔧 Composite | Large styled blockquote using MUI `Typography` + custom border |
| [ ] | Stat Block | 🏗️ Custom | Large number/metric + label, typically in a row of 3–4 |
| [ ] | Icon + Text | 🔧 Composite | MUI `Stack` + icon + `Typography`, used for feature lists |
| [ ] | Timeline | 🎨 Theme Only | MUI `Timeline` from `@mui/lab` — theme colors and connector styles |
| [ ] | Code Block | 🏗️ Custom | Syntax-highlighted code + copy button (use `highlight.js` or `prism`) |
| [ ] | Table | 🎨 Theme Only | MUI `Table` / `DataGrid` — theme striping, borders, responsive behavior |

---

## Media

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Image | 🏗️ Custom | Single image with caption, alt, aspect ratio, and fit controls |
| [ ] | Image Gallery | 🏗️ Custom | Grid or masonry photo gallery with lightbox |
| [ ] | Video Embed | 🏗️ Custom | YouTube / Vimeo / self-hosted video with poster image |
| [ ] | Background Image Section | 🏗️ Custom | Section with image or gradient background + overlay |
| [ ] | Lottie / SVG Animation | 🏗️ Custom | Animated illustration block using `lottie-react` |
| [ ] | Map Embed | 🏗️ Custom | Google Maps or Mapbox embed block |

---

## Cards & Lists

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Card | 🎨 Theme Only | MUI `Card` — theme elevation, radius, hover states |
| [ ] | Card Grid | 🔧 Composite | MUI `Grid` of `Card` components with configurable columns |
| [ ] | Feature Card | 🔧 Composite | Icon/image + heading + description using MUI `Card` |
| [ ] | Pricing Card | 🔧 Composite | Plan name, price, feature list, CTA, highlighted variant |
| [ ] | Team Member Card | 🔧 Composite | MUI `Card` + `Avatar` + name + title + social links |
| [ ] | Blog Post Card | 🔧 Composite | Thumbnail + category + title + author + date |
| [ ] | Testimonial Card | 🔧 Composite | Quote + avatar + name + company + MUI `Rating` stars |
| [ ] | Product Card | 🔧 Composite | Image + name + price + add-to-cart button |

---

## CTA & Conversion

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | CTA Banner | 🏗️ Custom | Full-width section: headline + subtext + button(s) |
| [ ] | CTA Split | 🏗️ Custom | Left text + right form or button |
| [ ] | Button | 🎨 Theme Only | MUI `Button` — theme primary/secondary/ghost/destructive + size variants |
| [ ] | Button Group | 🎨 Theme Only | MUI `ButtonGroup` — theme connected and spaced variants |
| [ ] | Newsletter Signup | 🔧 Composite | MUI `TextField` + `Button` inline or stacked |
| [ ] | Popup / Modal CTA | 🔧 Composite | MUI `Dialog` with form or offer content |

---

## Forms & Inputs

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Contact Form | 🔧 Composite | Name, email, message + submit using MUI form components |
| [ ] | Input | 🎨 Theme Only | MUI `TextField` — theme label, error, helper text states |
| [ ] | Textarea | 🎨 Theme Only | MUI `TextField` with `multiline` prop |
| [ ] | Select / Dropdown | 🎨 Theme Only | MUI `Select` — theme menu, placeholder, error states |
| [ ] | Checkbox | 🎨 Theme Only | MUI `Checkbox` + `FormControlLabel` |
| [ ] | Radio Group | 🎨 Theme Only | MUI `RadioGroup` + `FormControlLabel` |
| [ ] | Toggle / Switch | 🎨 Theme Only | MUI `Switch` — theme track and thumb colors |
| [ ] | File Upload | 🔧 Composite | MUI `Button` + hidden input or drag-and-drop zone |
| [ ] | Search Input | 🔧 Composite | MUI `TextField` with search `InputAdornment` + clear button |
| [ ] | Date Picker | 🎨 Theme Only | MUI `DatePicker` from `@mui/x-date-pickers` |
| [ ] | Form Validation | 🎨 Theme Only | MUI field error/success/disabled states — standardize usage patterns |

---

## Feedback & Alerts

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Alert / Banner | 🎨 Theme Only | MUI `Alert` — theme info/success/warning/error variants |
| [ ] | Toast Notification | 🎨 Theme Only | MUI `Snackbar` + `Alert` — theme position and duration |
| [ ] | Modal / Dialog | 🎨 Theme Only | MUI `Dialog` — theme sizing, backdrop, transition |
| [ ] | Tooltip | 🎨 Theme Only | MUI `Tooltip` — theme arrow, delay, max-width |
| [ ] | Progress Bar | 🎨 Theme Only | MUI `LinearProgress` — theme color and height variants |
| [ ] | Skeleton Loader | 🎨 Theme Only | MUI `Skeleton` — theme animation and shape variants |
| [ ] | Empty State | 🏗️ Custom | No-results placeholder with illustration + CTA |
| [ ] | Loading Spinner | 🎨 Theme Only | MUI `CircularProgress` — theme size and color variants |

---

## Social Proof

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Testimonials Slider | 🏗️ Custom | Auto-playing carousel of testimonial cards |
| [ ] | Testimonials Grid | 🔧 Composite | MUI `Grid` of Testimonial Cards, masonry optional |
| [ ] | Logo Bar / Wall | 🏗️ Custom | Horizontal scrolling or static row of client logos |
| [ ] | Review Stars | 🎨 Theme Only | MUI `Rating` — theme filled/empty icon and size |
| [ ] | Case Study Block | 🏗️ Custom | Problem → Solution → Result layout with metrics |

---

## Interactive & Dynamic

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Accordion / FAQ | 🎨 Theme Only | MUI `Accordion` — theme expand icon, border, spacing |
| [ ] | Tabs | 🎨 Theme Only | MUI `Tabs` + `Tab` — theme indicator, variant styles |
| [ ] | Carousel / Slider | 🏗️ Custom | Touch-swipeable content slider with arrows + dots |
| [ ] | Dropdown | 🎨 Theme Only | MUI `Menu` — theme elevation, item hover, divider |
| [ ] | Popover | 🎨 Theme Only | MUI `Popover` — theme padding and shadow |
| [ ] | Drawer / Side Panel | 🎨 Theme Only | MUI `Drawer` — theme width, backdrop, anchor variants |
| [ ] | Stepper / Wizard | 🎨 Theme Only | MUI `Stepper` — theme connector, icon, and label styles |
| [ ] | Pagination | 🎨 Theme Only | MUI `Pagination` — theme selected state and shape |
| [ ] | Infinite Scroll | 🏗️ Custom | Auto-load more on scroll using `IntersectionObserver` |
| [ ] | Filter / Sort Bar | 🔧 Composite | MUI `ToggleButtonGroup` + `Select` + `TextField` search |

---

## Blog & CMS-Specific

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Post Header | 🏗️ Custom | Title + author + date + category + hero image |
| [ ] | Author Bio Block | 🔧 Composite | MUI `Avatar` + name + bio + social links |
| [ ] | Related Posts | 🔧 Composite | Row or grid of Blog Post Cards |
| [ ] | Table of Contents | 🏗️ Custom | Sticky sidebar or inline heading index with scroll tracking |
| [ ] | Tag / Category Badge | 🎨 Theme Only | MUI `Chip` — theme color variants for taxonomy labels |
| [ ] | Share Buttons | 🔧 Composite | MUI `IconButton` row for social share + copy link |
| [ ] | Comment Section | 🏗️ Custom | Threaded comment list + submit form |

---

## E-Commerce

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [ ] | Product Grid | 🔧 Composite | MUI `Grid` of Product Cards with filter bar |
| [ ] | Product Detail | 🏗️ Custom | Image gallery + title + price + variant picker + ATC |
| [ ] | Cart Drawer | 🔧 Composite | MUI `Drawer` with item list, totals, checkout CTA |
| [ ] | Checkout Form | 🔧 Composite | MUI form components in a multi-step `Stepper` layout |
| [ ] | Badge / Sale Tag | 🔧 Composite | MUI `Chip` or `Badge` overlaid on product images |

---

## Legend

| Symbol | Meaning |
|--------|---------|
| `[ ]` | Not started |
| `[x]` | Complete |
| 🎨 Theme Only | MUI component exists — apply brand theme |
| 🔧 Composite | Built from MUI primitives with custom layout/logic |
| 🏗️ Custom | No MUI equivalent — built from scratch using MUI as base |

---

## Session Notes

### Navbar (complete — 11 variants)
All variants converted from Tailwind Plus `/ui-blocks/application-ui/navigation/navbars`:
1. Simple (light) — underline-tab links, bell+avatar `sm:`, hamburger right
2. Simple dark — rounded-pill links, bell+avatar `sm:`, hamburger right, full mobile panel
3. With quick action (light) — hamburger left `md:`, "New Job" CTA always visible
4. Dark with quick action — same structure, dark colors
5. With search (light) — 3-column `lg:` layout, underline-tab links, light search
6. Dark with search — 3-column `lg:` layout, rounded-pill links, dark search
7. Simple with menu button on left (light) — hamburger `sm:absolute` left, underline-tab desktop
8. Simple dark with menu button on left — hamburger `sm:absolute` left, logo centered mobile
9. Dark with centered search — 2-row: row1 logo+search(`sm:absolute`)+actions, row2 secondary nav `lg:`
10. With centered search (light) — same 2-row structure, light colors
11. With search in column layout — `xl:grid-cols-12`, logo `md:absolute lg:static`, Chelsea Hagon user

### Footer (complete)
Source: https://tailwindcss.com/plus/ui-blocks/marketing/sections/footers

### Breadcrumb (in progress)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/breadcrumbs

---

*Last updated: May 2026*
