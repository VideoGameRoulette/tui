# Mooey — MUI Component Build Tracker

> CMS block library built with **Material UI**. Components are categorized by build type:
> - 🎨 **Theme Only** — MUI native, just needs brand styling
> - 🔧 **Composite** — Built from MUI primitives, requires custom layout/logic
> - 🏗️ **Custom** — No MUI equivalent, built from scratch with MUI as base

**Progress: 95 / 96 complete**

---

## Layout & Structure

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Section | 🏗️ Custom | `components/mui-tui/layout/Section.tsx` — `py` presets (sm/md/lg/xl), optional top/bottom borders, configurable `as` element |
| [x] | Container | 🎨 Theme Only | `components/mui-tui/layout/Container.tsx` — MUI Container wrapper; `padded` prop applies `px: xs:3/sm:6/lg:8`; `maxWidth` defaults to `xl` |
| [x] | Grid | 🎨 Theme Only | `components/mui-tui/layout/Grid.tsx` — CSS grid wrapper; `cols` accepts number or responsive object `{xs,sm,md,lg,xl}`; `gap`, `rowGap`, `colGap` |
| [x] | Columns | 🔧 Composite | `components/mui-tui/layout/Columns.tsx` — 7 preset variants: two-col, three-col, four-col, sidebar-left/right (240px), sidebar-left/right-wide (320px) |
| [x] | Divider | 🎨 Theme Only | `components/mui-tui/layout/Divider.tsx` — wraps MUI Divider; adds `lineStyle` prop (`solid`/`dashed`/`dotted`) and `spacing` shorthand |
| [x] | Spacer | 🏗️ Custom | `components/mui-tui/layout/Spacer.tsx` — blank block; `size` in MUI spacing units; `axis` prop (`vertical`/`horizontal`) |

---

## Hero & Headers

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Hero – Centered | 🏗️ Custom | `components/mui-tui/heroes/HeroCentered.tsx` — centered text + radial gradient blob; `badge`, `headline`, `description`, `primaryCTA`, `secondaryCTA` props |
| [x] | Hero – Split | 🏗️ Custom | `components/mui-tui/heroes/HeroSplit.tsx` — 50/50 grid; `imagePosition: 'left'\|'right'`; image block with mode-aware shadow |
| [x] | Hero – Video BG | 🏗️ Custom | `components/mui-tui/heroes/HeroVideoBG.tsx` — full-viewport; HTML5 `<video>` autoplay; `overlayOpacity` scrim; always white text |
| [x] | Hero – Carousel | 🔧 Composite | `components/mui-tui/heroes/HeroCarousel.tsx` — fade carousel; pause-on-hover; pill dots + prev/next arrows; per-slide accent gradient |
| [x] | Page Header | 🏗️ Custom | `components/mui-tui/heroes/PageHeader.tsx` — breadcrumbs + title + description + `actions` slot; `divider` prop |
| [x] | Announcement Bar | 🔧 Composite | `components/mui-tui/heroes/AnnouncementBar.tsx` — dismissible; `severity: brand\|info\|success\|warning`; icon + message + link |

---

## Navigation

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Navbar | 🔧 Composite | `navigation/Navbar*.tsx` — 6 files, 11 variants (simple, quick-action, search, menu-button, centered-search, column-layout) |
| [x] | Mega Menu | 🔧 Composite | `navigation/MegaMenu.tsx` — Popper flyout; 4 nav items with icons; recent posts panel; quick links footer row |
| [x] | Sidebar Nav | 🔧 Composite | `navigation/SidebarNav.tsx` — permanent sidebar; 2 nav groups; active state; badge count; user footer |
| [x] | Breadcrumb | 🎨 Theme Only | `navigation/Breadcrumb*.tsx` — 4 variants (simple-slash, simple-chevron, contained, full-width-bar) |
| [x] | Footer | 🏗️ Custom | `navigation/Footer*.tsx` — 7 variants + SocialIcons.tsx |
| [x] | Tab Bar | 🎨 Theme Only | `navigation/TabBar.tsx` — MUI BottomNavigation; badge support; configurable tabs; `showLabels` prop |

---

## Content Blocks

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Rich Text | 🏗️ Custom | `content/RichText.tsx` — `html` or `children`; `constrained` → 680px maxWidth; full typographic CSS selectors via MUI tokens |
| [x] | Text + Image | 🏗️ Custom | `content/TextImage.tsx` — 50/50 grid; `imagePosition: 'left'\|'right'`; `eyebrow`, `headline`, `body`, `cta`; stacks on mobile |
| [x] | Pull Quote | 🔧 Composite | `content/PullQuote.tsx` — variants: `left-border` (default), `centered`, `large`; `attribution` + `role` |
| [x] | Stat Block | 🏗️ Custom | `content/StatBlock.tsx` — variants: `simple`, `divided`, `card`; 2–4 stats; optional section header |
| [x] | Icon + Text | 🔧 Composite | `content/IconText.tsx` — `iconStyle: bare\|chip\|circle`; `columns: 1\|2\|3`; `centered` prop |
| [x] | Timeline | 🏗️ Custom | `content/Timeline.tsx` — **custom** (no @mui/lab); variants: `default`, `compact`, `alternating`; dot/connector with theme-aware line color |
| [x] | Code Block | 🏗️ Custom | `content/CodeBlock.tsx` — dark bg always; `language`, `filename`, `showLineNumbers`; async clipboard copy button |
| [x] | Table | 🎨 Theme Only | `content/ContentTable.tsx` — MUI Table; `striped`, `stickyHeader`, `maxHeight`, `outlined`, `caption`; demo data included |

---

## Media

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Image | 🏗️ Custom | `components/mui-tui/media/MediaImage.tsx` — `aspectRatio` presets, `objectFit`, optional `caption` as figcaption |
| [x] | Image Gallery | 🏗️ Custom | `components/mui-tui/media/ImageGallery.tsx` — `grid` (4/3 cells) or `masonry` (CSS column-count); MUI Dialog lightbox; `cols: 2\|3\|4`; collapses to 1-col on xs |
| [x] | Video Embed | 🏗️ Custom | `components/mui-tui/media/VideoEmbed.tsx` — auto-detects YouTube/Vimeo → embed URL; self-hosted → HTML5 `<video>`; aspect-ratio wrapper |
| [x] | Background Image Section | 🏗️ Custom | `components/mui-tui/media/BackgroundImageSection.tsx` — `imageUrl` or `gradient`; `overlayColor`/`overlayOpacity` scrim; children in `zIndex:1` layer |
| [x] | Lottie / SVG Animation | 🏗️ Custom | `components/mui-tui/media/LottieAnimation.tsx` — `next/dynamic` ssr:false; `lottie-react` peer dep; `loop`, `autoplay`, `width`, `height` props |
| [x] | Map Embed | 🏗️ Custom | `components/mui-tui/media/MapEmbed.tsx` — iframe wrapper; caller supplies embed URL; `height`, `borderRadius`, accessibility `title` |

---

## Cards & Lists

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Card | 🎨 Theme Only | `components/mui-tui/cards/Card.tsx` — MUI Card wrapper; `borderRadius:3`; `hover` prop adds translateY + box-shadow; passes all CardProps through |
| [x] | Card Grid | 🔧 Composite | `components/mui-tui/cards/CardGrid.tsx` — CSS grid; `cols: 1\|2\|3\|4`; 2-col on sm, 1-col on xs; `gap` in MUI spacing units |
| [x] | Feature Card | 🔧 Composite | `components/mui-tui/cards/FeatureCard.tsx` — optional `icon` (36px primary) or `imageUrl` (16/9 header); `heading` + `description` |
| [x] | Pricing Card | 🔧 Composite | `components/mui-tui/cards/PricingCard.tsx` — `planName`, `price`, `period`, `features[]` checklist; `highlighted`: primary border + elevation + contained CTA + "Most popular" label |
| [x] | Team Member Card | 🔧 Composite | `components/mui-tui/cards/TeamMemberCard.tsx` — 80px Avatar + name + title (primary) + bio + `socialLinks[]` IconButton row; centered layout |
| [x] | Blog Post Card | 🔧 Composite | `components/mui-tui/cards/BlogPostCard.tsx` — 16/9 thumbnail + category Chip + title + excerpt + author Avatar + date; full card `CardActionArea` link |
| [x] | Testimonial Card | 🔧 Composite | `components/mui-tui/cards/TestimonialCard.tsx` — MUI `Rating`; FormatQuoteIcon watermark; italic quote; author Avatar + name + title/company |
| [x] | Product Card | 🔧 Composite | `components/mui-tui/cards/ProductCard.tsx` — 1/1 image + sale badge Chip; name + price + `originalPrice` strikethrough; "Add to cart" `CardActions` button |

---

## CTA & Conversion

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | CTA Banner | 🏗️ Custom | `components/mui-tui/cta/CTABanner.tsx` — `variant: default\|filled\|tinted`; `align: left\|center`; `buttons[]` with auto-inversion on filled; `py` presets |
| [x] | CTA Split | 🏗️ Custom | `components/mui-tui/cta/CTASplit.tsx` — 50/50 CSS grid (stacks on mobile); `eyebrow`, `headline`, `subtext`; right `children` slot; `reverseOnMobile` prop |
| [x] | Button | 🎨 Theme Only | `components/mui-tui/cta/AppButton.tsx` — `appVariant: primary\|secondary\|ghost\|destructive` maps to MUI variant+color; `loading` prop with CircularProgress |
| [x] | Button Group | 🎨 Theme Only | `components/mui-tui/cta/AppButtonGroup.tsx` — `style: connected` (MUI ButtonGroup) or `spaced` (flex + gap); `orientation`, `size`, `variant` props |
| [x] | Newsletter Signup | 🔧 Composite | `components/mui-tui/cta/NewsletterSignup.tsx` — controlled email input; `layout: inline\|stacked`; success state replaces form; `onSubmit(email)` callback |
| [x] | Popup / Modal CTA | 🔧 Composite | `components/mui-tui/cta/PopupCTA.tsx` — MUI Dialog; `borderRadius:3` Paper; close IconButton; optional `children` slot; CTA + optional secondary button |

---

## Forms & Inputs

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Contact Form | 🔧 Composite | `forms/ContactForm.tsx` — name + email (2-col grid) + optional subject + message; client-side validation; loading + success states; `onSubmit(data)` callback |
| [x] | Input | 🎨 Theme Only | `forms/AppInput.tsx` — MUI `TextField` pass-through; all standard props forwarded |
| [x] | Textarea | 🎨 Theme Only | `forms/AppTextarea.tsx` — `TextField multiline`; `minRows=4` default; `maxRows` prop |
| [x] | Select / Dropdown | 🎨 Theme Only | `forms/AppSelect.tsx` — `FormControl` + `InputLabel` + `Select` + `MenuItem`; typed `options[]`; `placeholder` as disabled first item; `error`/`helperText` |
| [x] | Checkbox | 🎨 Theme Only | `forms/AppCheckbox.tsx` — `AppCheckbox` (single) + `AppCheckboxGroup` (multi-select with `FormGroup`); both exported from one file |
| [x] | Radio Group | 🎨 Theme Only | `forms/AppRadioGroup.tsx` — `FormControl` + `RadioGroup` + `FormControlLabel`; `row`, `error`, `helperText`, `color`, `size` props |
| [x] | Toggle / Switch | 🎨 Theme Only | `forms/AppSwitch.tsx` — `Switch` + `FormControlLabel`; `labelPlacement`, `helperText`, all MUI sizes/colors |
| [x] | File Upload | 🔧 Composite | `forms/FileUpload.tsx` — hidden `<input>` + optional drag-and-drop zone; drag hover state; file list with remove; `maxSizeMb` validation |
| [x] | Search Input | 🔧 Composite | `forms/SearchInput.tsx` — `TextField` with `SearchIcon` adornment + clear `IconButton`; controlled or uncontrolled; `onSearch` (Enter/click) + `onClear` |
| [x] | Date Picker | 🎨 Theme Only | `forms/AppDatePicker.tsx` — MUI X `DatePicker` + `LocalizationProvider` (AdapterDayjs); `minDate`/`maxDate`; peer deps: `@mui/x-date-pickers`, `dayjs` |
| [x] | Form Validation | 🎨 Theme Only | `forms/FormField.tsx` — `status: default\|error\|success\|warning`; status-colored label + helper text with icon; wraps any `children` via `FormControl` |

---

## Feedback & Alerts

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Alert / Banner | 🎨 Theme Only | `feedback/AppAlert.tsx` — `severity`, `variant`, optional `title`; `closeable` self-dismisses via `Collapse`; `onClose`, `action`, `icon` slots |
| [x] | Toast Notification | 🎨 Theme Only | `feedback/AppToast.tsx` — `Snackbar` + `Alert`; controlled `open`; ignores clickaway; `position: SnackbarOrigin`; `duration` ms |
| [x] | Modal / Dialog | 🎨 Theme Only | `feedback/AppDialog.tsx` — `title`, `children`, `actions` slots; `borderRadius:3` Paper; absolute ✕ close button; `dividers`, `maxWidth`, `fullWidth` |
| [x] | Tooltip | 🎨 Theme Only | `feedback/AppTooltip.tsx` — `content` prop (renames MUI `title`); `maxWidth` on tooltip sx; `arrow=true`, `enterDelay=200` defaults |
| [x] | Progress Bar | 🎨 Theme Only | `feedback/AppProgressBar.tsx` — `height` via sx; `showLabel` shows auto `%` caption; `label` overrides auto text; all MUI color/variant options |
| [x] | Skeleton Loader | 🎨 Theme Only | `feedback/AppSkeleton.tsx` — `count` renders stacked skeletons in `flexDirection:column`; last `text` item auto-shortened to 60% width |
| [x] | Empty State | 🏗️ Custom | `feedback/EmptyState.tsx` — 72px icon circle (`action.hover` bg); `title` + `description` (max 360px); `action` + `secondaryAction` CTA buttons |
| [x] | Loading Spinner | 🎨 Theme Only | `feedback/AppSpinner.tsx` — `label` caption below; `center` prop absolute-centers inside positioned parent; `determinate` + `value` for progress ring |

---

## Social Proof

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Testimonials Slider | 🏗️ Custom | `social-proof/TestimonialsSlider.tsx` — same auto-play pattern as `HeroCarousel`; `SlideTestimonial[]`; `accentColor` radial gradient; FormatQuoteIcon; Rating; Avatar + name/title |
| [x] | Testimonials Grid | 🔧 Composite | `social-proof/TestimonialsGrid.tsx` — imports `TestimonialCard` from `../cards/`; `cols: 1\|2\|3`; `masonry` CSS `column-count`; optional section header |
| [x] | Logo Bar / Wall | 🏗️ Custom | `social-proof/LogoBar.tsx` — `scroll`: duplicated logos + CSS `@keyframes marquee`, edge fade mask, pause-on-hover; `static`: flex-wrap; text logo fallback when `src` omitted |
| [x] | Review Stars | 🎨 Theme Only | `social-proof/ReviewStars.tsx` — MUI `Rating` wrapper; `showValue` for numeric label; `count` for review total; `readOnly=true` default; controlled or uncontrolled |
| [x] | Case Study Block | 🏗️ Custom | `social-proof/CaseStudyBlock.tsx` — numbered step badges; `CaseStudyStep[]` + `CaseStudyMetric[]`; Divider before metrics grid; `action.hover` quote box; optional 2-col header with image |

---

## Interactive & Dynamic

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Accordion / FAQ | 🎨 Theme Only | `interactive/AppAccordion.tsx` — `AccordionItem[]`; `allowMultiple`; `variant: default\|separated`; `separated` gaps items with individual borders |
| [x] | Tabs | 🎨 Theme Only | `interactive/AppTabs.tsx` — `TabItem[]` with content; horizontal/vertical; controlled/uncontrolled; `scrollable` variant |
| [x] | Carousel / Slider | 🏗️ Custom | `interactive/AppCarousel.tsx` — `ReactNode[]` items; CSS `translateX` track; touch swipe (50px threshold); keyboard ArrowLeft/Right; arrows + pill dots |
| [x] | Dropdown | 🎨 Theme Only | `interactive/AppDropdown.tsx` — `cloneElement` trigger; `DropdownItem[]` with `icon`, `dividerAfter`, `href`; `slotProps.paper` borderRadius |
| [x] | Popover | 🎨 Theme Only | `interactive/AppPopover.tsx` — `cloneElement` toggle trigger; `title` + `content` slot; `maxWidth`; configurable `anchorOrigin`/`transformOrigin` |
| [x] | Drawer / Side Panel | 🎨 Theme Only | `interactive/AppDrawer.tsx` — all 4 anchors; `width` for left/right; scrollable content; optional `footer` fixed at bottom; ✕ close button |
| [x] | Stepper / Wizard | 🎨 Theme Only | `interactive/AppStepper.tsx` — horizontal/vertical; `StepContent` for vertical; built-in Back/Next/Finish nav; `nonLinear` click-any-step; `onFinish` callback |
| [x] | Pagination | 🎨 Theme Only | `interactive/AppPagination.tsx` — controlled/uncontrolled; `align: left\|center\|right`; all MUI `variant`/`shape`/`color` options; first/last buttons |
| [x] | Infinite Scroll | 🏗️ Custom | `interactive/InfiniteScroll.tsx` — `IntersectionObserver` sentinel div; `onLoadMore` in ref (stale-closure safe); `rootMargin` pre-loads 200px early; `endMessage` |
| [x] | Filter / Sort Bar | 🔧 Composite | `interactive/FilterSortBar.tsx` — `ToggleButtonGroup` filters + `Select` sort + `TextField` search; `showSearch/Filters/Sort` toggles; flex-wrap responsive layout |

---

## Blog & CMS-Specific

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Post Header | 🏗️ Custom | `blog/PostHeader.tsx` — category `Chip`; responsive h1 (2–3.25rem); excerpt; divider-framed author/date/readTime row with icons; 16/9 hero image |
| [x] | Author Bio Block | 🔧 Composite | `blog/AuthorBioBlock.tsx` — `card` (bordered) or `inline`; `role` in primary.main; `followHref` button; `socialLinks[]` IconButton row |
| [x] | Related Posts | 🔧 Composite | `blog/RelatedPosts.tsx` — imports `BlogPostCard` from `../cards/`; `layout: grid\|row` (row = horizontal scroll); responsive `cols: 1\|2\|3` |
| [x] | Table of Contents | 🏗️ Custom | `blog/TableOfContents.tsx` — `IntersectionObserver` rootMargin `-80px 0px -60% 0px`; active item: primary border + color + weight 600; click → `scrollIntoView smooth` + `history.pushState` |
| [x] | Tag / Category Badge | 🎨 Theme Only | `blog/TagBadge.tsx` — `TagBadge` (single Chip) + `TagBadgeGroup` (flex-wrap row); `tags: string[]\|TagBadgeProps[]`; all MUI Chip colors/variants |
| [x] | Share Buttons | 🔧 Composite | `blog/ShareButtons.tsx` — inline SVG paths for Twitter/Facebook/LinkedIn/Reddit; `'copy'` → clipboard + 2s success state; `icon\|outlined` variant; `url` resolved client-side in `useEffect` |
| [x] | Comment Section | 🏗️ Custom | `blog/CommentSection.tsx` — `CommentItem` sub-component; 1-level replies with left-border indent; reply count in heading; validated form (name/email/comment) with success state |

---

## E-Commerce

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Product Grid | 🔧 Composite | `components/mui-tui/ecommerce/ProductGrid.tsx` — responsive 2/3/4-col grid; imports ProductCard + FilterSortBar; 8 default products; `emptyMessage` prop |
| [x] | Product Detail | 🏗️ Custom | `components/mui-tui/ecommerce/ProductDetail.tsx` — main image + thumbnail row; ToggleButtonGroup variant pickers; qty stepper; ATC disabled when out of stock |
| [x] | Cart Drawer | 🔧 Composite | `components/mui-tui/ecommerce/CartDrawer.tsx` — `slotProps.paper.sx` for width+flex; qty stepper removes item at 0; subtotal; empty state; Continue Shopping button |
| [x] | Checkout Form | 🔧 Composite | `components/mui-tui/ecommerce/CheckoutForm.tsx` — 3-step MUI Stepper; Shipping + Payment + Review; field-level validation; `done` state success message |
| [x] | Badge / Sale Tag | 🔧 Composite | `components/mui-tui/ecommerce/SaleTag.tsx` — chip/ribbon/banner variants; `PLACEMENT_SX` map; `RibbonTag` uses CSS `::before`; standalone renders plain Chip |

---

## Legend

| Symbol | Meaning |
|--------|---------|
| `[ ]` | Not started |
| `[x]` | Complete |
| 🎨 Theme Only | MUI component exists — apply brand theme |
| 🔧 Composite | Built from MUI primitives with custom layout/logic |
| 🏗️ Custom | No MUI equivalent — built from scratch using MUI as base |

### Legend UI Components

| Status | Component | Type | Notes |
|--------|-----------|------|-------|
| [x] | Status Badge | 🎨 Theme Only | `components/mui-tui/legend/StatusBadge.tsx` — `StatusValue` maps 6 states to MUI Chip color+variant presets |
| [x] | Build Type Badge | 🎨 Theme Only | `components/mui-tui/legend/BuildTypeBadge.tsx` — `BuildType` maps theme-only/composite/custom to Chip with PaletteIcon/BuildIcon/ConstructionIcon |
| [x] | Legend | 🏗️ Custom | `components/mui-tui/legend/Legend.tsx` — color swatch + label pairs; `square\|circle\|line` shapes; `horizontal\|vertical` orientation; optional title |

---

## Session Notes

### Legend (complete — 3 components)
**Location:** `frontend/src/components/mui-tui/legend/`

Files:
- `StatusBadge.tsx` — `STATUS_CONFIG` record maps 6 `StatusValue` keys to `{ label, color, variant }`; `label` prop overrides auto label; `variant` prop overrides config default; `fontWeight:600` on all chips; covers tracker `[ ]` / `[x]` status concept
- `BuildTypeBadge.tsx` — `TYPE_CONFIG` maps `theme-only/composite/custom` to `{ label, color, Icon }` (PaletteIcon/BuildIcon/ConstructionIcon); `showIcon` controls leading icon; `variant='outlined'` default; covers tracker 🎨/🔧/🏗️ type concept
- `Legend.tsx` — `Swatch` sub-component handles `square` (rounded Box), `circle` (50% borderRadius), `line` (3px tall, 1.5× width Bar); `orientation: horizontal` flex-wraps, `vertical` stacks; optional `title` in uppercase caption above items
- `index.ts` — barrel export (all 3 components + prop types: `StatusValue`, `BuildType`, `LegendEntry`, `LegendShape`)
- `legend.md` — API docs

---

### E-Commerce (complete — 5 components)
**Location:** `frontend/src/components/mui-tui/ecommerce/`

Files:
- `ProductGrid.tsx` — imports `ProductCard` from `../cards/ProductCard` and `FilterSortBar` from `../interactive/FilterSortBar`; responsive grid xs=2-col always, scales to `cols` at lg; 8 default products; `emptyMessage` for no-results; `showFilterBar` gate
- `ProductDetail.tsx` — `activeImage` state for main image + thumbnail row (72×72, `primary.main` border when active); `selections` Record for `ToggleButtonGroup` variant choices; `adjustQty(delta)` with `Math.max(1,…)` floor; ATC button disabled + label changes when `!inStock`
- `CartDrawer.tsx` — `slotProps.paper.sx: { width, display:'flex', flexDirection:'column' }`; qty stepper calls `onRemove` when decrement would reach 0; `subtotal = items.reduce((sum,i) => sum + i.price * i.quantity, 0)`; empty state with `ShoppingCartIcon`; "Continue Shopping" text button
- `CheckoutForm.tsx` — `ShippingData` + `PaymentData` types; 3-step MUI `Stepper alternativeLabel`; `validateShipping()` / `validatePayment()` with field-level errors in `Record<string,string>`; Review step shows order line items + totals + ship-to + card-last-4; `done` state shows personalized success message
- `SaleTag.tsx` — `PLACEMENT_SX` record maps 4 placements to absolute `top/left/right/bottom`; `RibbonTag` uses `&::before` CSS `content` for diagonal corner ribbon (top-right only); `BannerTag` spans full width, left/right aligned; no `children` → plain inline `Chip`
- `index.ts` — barrel export (all 5 components + all prop types including `CartItem`, `ProductImage`, `ProductVariant`, `ShippingData`, `PaymentData`, `SaleTagPlacement`, `SaleTagVariant`)
- `ecommerce.md` — API docs

---

### Blog & CMS-Specific (complete — 7 components)
**Location:** `frontend/src/components/mui-tui/blog/`

Files:
- `PostHeader.tsx` — `component="header"` semantic; category Chip with optional `href`; h1 responsive `fontSize: {xs:'2rem',sm:'2.75rem',md:'3.25rem'}`; divider wraps author/date row; `CalendarTodayIcon` + `AccessTimeIcon` at 14px; hero `aspectRatio: '16/9'` figure
- `AuthorBioBlock.tsx` — `variant='card'`: `border: 1px solid divider, borderRadius:3, p:3`; `role` in `primary.main`; `followHref` → `Button component="a" variant="outlined" ml:auto`; social links: `IconButton color:text.secondary hover:primary.main`
- `RelatedPosts.tsx` — imports `BlogPostCard` from `../cards/BlogPostCard`; `layout='row'`: `flex overflowX:auto`, each card `flex: 0 0 280px`; `layout='grid'`: responsive `gridTemplateColumns`; 3-post default dataset
- `TableOfContents.tsx` — `IntersectionObserver` with `rootMargin: '-80px 0px -60% 0px'`; `entries.filter(isIntersecting).sort(by boundingClientRect.top)[0]` picks topmost visible heading; active: `borderColor:primary.main, color:primary.main, fontWeight:600`; click: `scrollIntoView({behavior:'smooth'}) + history.pushState`
- `TagBadge.tsx` — `default` export is `TagBadge`; `TagBadgeGroup` named export; group accepts `string[]` (uses group-level props) or `TagBadgeProps[]` (per-tag overrides via spread); both use `fontWeight:600` on Chip
- `ShareButtons.tsx` — `NetworkIcon` sub-component renders inline SVG paths (24×24 viewBox); `url` state + `useEffect(() => { if (!url) setPageUrl(window.location.href) })` for SSR safety; `window.open` with `noopener,noreferrer`; copy: `navigator.clipboard.writeText` → `setCopied(true)` + `setTimeout 2000`
- `CommentSection.tsx` — `CommentItem` renders Avatar + name + date + content + Reply toggle; replies in `pl:2 borderLeft:2px solid divider`; depth guard at 1; `CommentForm` sub-component with field-level errors + loading + success; count = `comments.reduce((n,c) => n + 1 + replies.length, 0)`
- `index.ts` — barrel export (all 7 components; named: `TagBadgeGroup`; all prop types)
- `blog.md` — API docs

---

### Interactive & Dynamic (complete — 10 components)
**Location:** `frontend/src/components/mui-tui/interactive/`

Files:
- `AppAccordion.tsx` — `useState<string[]>` tracks expanded ids; `allowMultiple` toggles array vs single-element logic; `separated` variant uses inline `gap:8px` style + `borderRadius:8px !important` + `'&:before': {display:'none'}` to override MUI's default pseudo-element connector
- `AppTabs.tsx` — controlled/uncontrolled via `controlledValue !== undefined` check; vertical: `flexDirection: row`, `borderRight: 1 divider`, `minWidth: 160`; horizontal: `borderBottom: 1 divider`; tab panels use `hidden` attribute for accessibility
- `AppCarousel.tsx` — `position: relative` outer, `overflow: hidden` track, `flex: 0 0 100%` slides; `transform: translateX(-current*100%)` transition; `onTouchStart/End` with `touchStartX` ref; `tabIndex=0` + `onKeyDown` for keyboard; same pill-dot pattern as `HeroCarousel`
- `AppDropdown.tsx` — `cloneElement` injects `onClick` + `aria-haspopup` + `aria-expanded` into trigger; `slotProps.paper` for borderRadius + minWidth; `dividerAfter` appended as sibling `<Divider>` key'd as `d-${i}`; `href` items use `component="a"`
- `AppPopover.tsx` — click toggles: `setAnchor(prev => prev ? null : e.currentTarget)`; `id` only set when open (accessibility); string `content` auto-wrapped in `Typography body2 text.secondary`
- `AppDrawer.tsx` — `slotProps.paper.sx` applies `width` only for left/right anchors via `isHorizontal` flag; `flex: 1; overflowY: auto` content + `flexShrink: 0` footer pattern; `Divider` separates header and footer
- `AppStepper.tsx` — vertical uses `<StepContent>` with inline nav; horizontal renders active step content below stepper + nav row; `nonLinear` makes `StepLabel` clickable; `completed` prop skipped for `nonLinear` mode
- `AppPagination.tsx` — `justifyMap` maps `align` to flex `justifyContent`; controlled/uncontrolled pattern matches other components
- `InfiniteScroll.tsx` — `onLoadMoreRef` updated in separate `useEffect` to avoid stale closure; observer only created when `!loading && hasMore`; `rootMargin: '0px 0px 200px 0px'` pre-fires 200px before sentinel reaches viewport
- `FilterSortBar.tsx` — internal `internalSearch` state for uncontrolled mode; `isSearchControlled = controlledSearch !== undefined`; search `flex: 1 1 100%` on xs, `1 1 auto` on sm+; ToggleButtonGroup `exclusive` for single-select filter
- `index.ts` — barrel export (all 10 components + prop types)
- `interactive.md` — API docs

---

### Social Proof (complete — 5 components)
**Location:** `frontend/src/components/mui-tui/social-proof/`

Files:
- `TestimonialsSlider.tsx` — identical auto-play architecture to `HeroCarousel` (`useCallback next/prev`, `useEffect setInterval`, `paused` state); opacity fade via `position:absolute/relative` first-slide trick; `SlideTestimonial[]` with optional `accentColor` radial gradient blob; FormatQuoteIcon at 30% opacity; MUI `Rating`; Avatar with name+title/company
- `TestimonialsGrid.tsx` — imports `TestimonialCard` from `../cards/TestimonialCard`; `masonry` uses CSS `column-count` + `breakInside: 'avoid'` same as `ImageGallery`; regular grid uses `gridTemplateColumns` responsive; optional eyebrow/title/description header; 6-item default dataset
- `LogoBar.tsx` — `LogoItem` sub-component handles img vs text fallback + optional `href` link; `scroll` mode: `doubled = [...logos, ...logos]`; `duration = logos.length × speed`; CSS `@keyframes marquee` 0%→-50%; `maskImage` gradient for edge fade; `static` mode: flex-wrap centered; both support `grayscale` filter with hover reveal
- `ReviewStars.tsx` — thin `Rating` wrapper; `count` formatted with `.toLocaleString()`; `showValue` shows e.g. "4.7"; `label` appends custom suffix; `onChange` only wired when `readOnly=false`
- `CaseStudyBlock.tsx` — numbered circle badge (primary bg, contrastText) replaces step icon by default; `icon` prop overrides; metrics grid uses `repeat(min(metrics.length,4), 1fr)`; Divider separates steps from metrics; quote box `bgcolor:'action.hover'` with `borderRadius:3`; header goes 2-col on md+ when `imageUrl` provided
- `index.ts` — barrel export (all 5 components + prop types including `SlideTestimonial`, `CaseStudyStep`, `CaseStudyMetric`, `Logo`)
- `social-proof.md` — API docs

---

### Feedback & Alerts (complete — 8 components)
**Location:** `frontend/src/components/mui-tui/feedback/`

Files:
- `AppAlert.tsx` — `useState(true)` + `Collapse` for self-dismiss; `closeable` triggers internal `handleClose`; `onClose` alone wires to MUI's close button externally; `AlertTitle` with `fontWeight:700`
- `AppToast.tsx` — `Snackbar onClose` ignores `reason==='clickaway'`; `Alert` fills full width of snackbar; `variant='filled'` default for visibility
- `AppDialog.tsx` — mirrors `PopupCTA.tsx` pattern (`PaperProps={{ sx: { borderRadius: 3 } }}`); `DialogContent` only rendered when `children` present; `DialogActions` only when `actions` present
- `AppTooltip.tsx` — renames MUI `title` to `content` to avoid confusion with HTML `title` attribute; `maxWidth` applied via `componentsProps.tooltip.sx`; merges with any passed `componentsProps`
- `AppProgressBar.tsx` — `height` applied as `sx.height + sx.borderRadius` on `LinearProgress`; `showLabel` conditionally renders `Typography caption`; auto-percentage only for `determinate` variant
- `AppSkeleton.tsx` — `count=1` renders bare `Skeleton` (no wrapper); `count>1` wraps in `Box flexDirection:column`; last item in `text` variant gets `width:'60%'` to mimic real text endings
- `EmptyState.tsx` — icon circle `bgcolor:'action.hover'` for dark-mode; default icon is `InboxIcon`; both action buttons accept `variant` override; `flexWrap: 'wrap'` for narrow containers
- `AppSpinner.tsx` — `center` uses `position:absolute + transform:translate(-50%,-50%)` requiring positioned parent; `label` as `Typography caption` below spinner; `inline-flex column` for label alignment
- `index.ts` — barrel export (all 8 components + prop types including `EmptyStateAction`)
- `feedback.md` — API docs

---

### Forms & Inputs (complete — 11 components)
**Location:** `frontend/src/components/mui-tui/forms/`

Files:
- `ContactForm.tsx` — controlled form state; 2-col name/email grid; optional subject; `validate()` returns field-level errors; async `onSubmit` with loading state; success message replaces form
- `AppInput.tsx` — direct `TextField` pass-through; exists as named library entry point
- `AppTextarea.tsx` — `TextField` with `multiline` locked on; `minRows=4` default; `maxRows` for scroll cutoff; all other TextField props forwarded
- `AppSelect.tsx` — `FormControl` + `InputLabel` + `Select` wrapper; `options: SelectOption[]`; placeholder renders as disabled first `MenuItem`; `labelId` auto-generated from `label` prop
- `AppCheckbox.tsx` — exports two components: `AppCheckbox` (single `Checkbox` + `FormControlLabel`) and `AppCheckboxGroup` (`FormGroup` with toggle-array logic); `default` export is `AppCheckbox`
- `AppRadioGroup.tsx` — `FormControl component="fieldset"` + `RadioGroup`; `row` prop for horizontal layout; `error` propagates to `FormHelperText`
- `AppSwitch.tsx` — `FormControl` + conditional `FormControlLabel` (omitted when no `label`); `labelPlacement` prop; `helperText` via `FormHelperText`
- `FileUpload.tsx` — hidden `<input ref>` triggered by button or drag zone; `dragDrop` prop toggles zone vs. plain button; drag hover state via `dragging` boolean; `maxSizeMb` size check before state update; file list with per-item remove
- `SearchInput.tsx` — controlled/uncontrolled via `controlledValue !== undefined` check; `SearchIcon` as `startAdornment`; clear `IconButton` only appears when value is non-empty; `onSearch` fires on Enter key or icon click
- `AppDatePicker.tsx` — self-contained `LocalizationProvider` wrapper (can be hoisted to layout for perf); `slotProps.textField` forwards `required`, `error`, `helperText`, `fullWidth`, `size`; peer deps: `@mui/x-date-pickers ^9.0.0`, `dayjs`
- `FormField.tsx` — `STATUS` record maps 4 states to `{ color, Icon }`; `FormControl error={status==='error'}` wires MUI error propagation; helper text icon via `Box component={Icon}` to allow `sx` on the element; `'&.Mui-disabled'` selector keeps label readable
- `index.ts` — barrel export (all 11 components + named exports: `AppCheckboxGroup`; all prop types)
- `forms.md` — API docs

---

### CTA & Conversion (complete — 6 components)
**Location:** `frontend/src/components/mui-tui/cta/`

Files:
- `CTABanner.tsx` — full-width section; `bgMap` maps `default/filled/tinted` to bgcolor/border sx; `getBtnSx()` auto-inverts button colors on `filled` variant; `align: left|center` controls `textAlign` + `justifyContent`
- `CTASplit.tsx` — 50/50 CSS grid via `gridTemplateColumns: {xs:'1fr', md:'1fr 1fr'}`; optional `eyebrow` overline; `children` is the right slot; `reverseOnMobile` flips order on xs
- `AppButton.tsx` — `variantMap` record maps 4 semantic names to `{variant, color}` MUI props; `loading` inserts CircularProgress as `startIcon` and sets `disabled`; all ButtonProps forwarded
- `AppButtonGroup.tsx` — `connected`: MUI `ButtonGroup` with `disableElevation`; `spaced`: Box flex with configurable `gap`; both support `orientation: horizontal|vertical`
- `NewsletterSignup.tsx` — controlled `email` state; `submitted` boolean flips form to success message; `layout: inline` = `{xs:'column', sm:'row'}` flex; `stacked` = column full-width
- `PopupCTA.tsx` — MUI Dialog with `PaperProps: {borderRadius:3}`; absolute close IconButton top-right; `dividers` prop on DialogContent only when children present; CTA handler calls `onCTA()` then `onClose()`
- `index.ts` — barrel export (components + prop types)
- `cta.md` — API docs

---

### Cards & Lists (complete — 8 components)
**Location:** `frontend/src/components/mui-tui/cards/`

Files:
- `Card.tsx` — MUI Card wrapper; `borderRadius:3`; `hover` prop: `transition: box-shadow/transform 0.2s`, hover → `boxShadow:4` + `translateY(-2px)`; all MuiCardProps passed through
- `CardGrid.tsx` — Box with `display:grid`; `gridTemplateColumns` responsive: xs=1fr, sm=repeat(min(cols,2)), md=repeat(cols); `gap` prop
- `FeatureCard.tsx` — optional 16/9 header image or icon (36px, primary.main); `heading` h6 700 weight; `description` body2 secondary; `height:100%` for grid alignment
- `PricingCard.tsx` — outlined Card; `highlighted`: `borderColor:primary.main`, `borderWidth:2`, `boxShadow:6`, "Most popular" overline, contained CTA; feature checklist with `CheckIcon` (18px primary)
- `TeamMemberCard.tsx` — centered column layout; 80px Avatar; title in `primary.main`; optional `bio`; `socialLinks: {icon, href, label}[]` → IconButton row
- `BlogPostCard.tsx` — full card wrapped in `CardActionArea` (link); 16/9 thumbnail with `CardActionArea` hover scale; category `Chip` (primary, small); author 28px Avatar + name + date
- `TestimonialCard.tsx` — optional `Rating` (precision 0.5); `FormatQuoteIcon` watermark (40px, 25% opacity, primary); italic body1 quote with `pl:3`; 44px Avatar + name + `[title, company].join(', ')`
- `ProductCard.tsx` — 1/1 image in `CardActionArea`; absolute badge `Chip` (error color); `CardContent`: name + price + strikethrough originalPrice; `CardActions`: full-width "Add to cart" contained button
- `index.ts` — barrel export (components + prop types including `SocialLink`)
- `cards.md` — API docs

---

### Media (complete — 6 components)
**Location:** `frontend/src/components/mui-tui/media/`

Files:
- `MediaImage.tsx` — `Box component="figure"`; `aspectRatio` presets (`1/1`, `4/3`, `3/2`, `16/9`, `21/9`, `auto`); `objectFit` prop; optional `figcaption` below image; `borderRadius` token
- `ImageGallery.tsx` — `grid` variant: CSS grid with `aspectRatio: 4/3` cells, hover scale; `masonry` variant: CSS `column-count`; MUI Dialog lightbox with close button; both collapse to 1-col on xs
- `VideoEmbed.tsx` — `getEmbedInfo()` regex detects YouTube/Vimeo and rewrites to embed URL; self-hosted falls through to HTML5 `<video>` with `autoPlay`, `muted`, `loop`, `controls`, `playsInline`; aspect-ratio position:relative wrapper
- `BackgroundImageSection.tsx` — `imageUrl` applies CSS background-image; `gradient` applies CSS background; overlay Box with `aria-hidden`; children lifted to `zIndex:1`
- `LottieAnimation.tsx` — `next/dynamic` with `ssr: false` wraps `lottie-react`; peer dep must be installed separately (`npm i lottie-react`); `width`/`height` props on inner Box
- `MapEmbed.tsx` — `Box component="iframe"` with `loading="lazy"`, `allowFullScreen`, `referrerPolicy`; caller supplies full embed src URL; `border: 1px solid divider` wrapper
- `index.ts` — barrel export (components + prop types)
- `media.md` — API docs

---

### Content Blocks (complete — 8 components)
**Location:** `frontend/src/components/mui-tui/content/`

Files:
- `RichText.tsx` — accepts `html` (dangerouslySetInnerHTML, caller must sanitize) or `children`; `constrained` caps maxWidth 680px; all styles via MUI semantic tokens so dark mode is automatic
- `TextImage.tsx` — CSS grid 50/50; `imagePosition: 'left'|'right'`; image reorders to bottom on mobile via `order`; `eyebrow`, `headline`, `body`, `cta` props
- `PullQuote.tsx` — `left-border`: 4px primary left border + italic; `centered`: CSS open/close quote chars; `large`: top border rule + display-size type + dash separator
- `StatBlock.tsx` — `simple`: 2-col→4-col grid no borders; `divided`: full-width row with `divider` token vertical lines; `card`: each stat in `Paper` outlined card
- `IconText.tsx` — `bare`: 32px icon, primary color; `chip`: 48px square rounded, primary bg, white icon; `circle`: 48px circle, action.selected bg, primary icon; `centered` layout mode
- `Timeline.tsx` — custom (no @mui/lab); `default`: left-rail + connector + body text; `compact`: left-rail, date + title only; `alternating`: centre rail, items alternate sides on md+; line color adapts to dark mode
- `CodeBlock.tsx` — always dark (#0f172a bg); header bar with language label or filename; async clipboard copy with checkmark feedback; `showLineNumbers` uses CSS table layout
- `ContentTable.tsx` — MUI Table; header bg switches (`grey.50` / `#1e293b`); stripe uses rgba (theme-aware); `stickyHeader` + `maxHeight` for scroll; `outlined` wraps in Paper
- `index.ts` — barrel export (all 8 components + prop types)
- `content.md` — API docs

---

### Navigation (complete — 6 categories, 26 files)
**Canonical location:** `frontend/src/components/mui-tui/navigation/`
**Reorganized:** All files now flat in `navigation/` — no subdirectories. Three `shared.ts` files merged into one.

Files:
- `NavbarSimple.tsx` / `NavbarWithQuickAction.tsx` / `NavbarWithSearch.tsx` / `NavbarWithMenuButton.tsx` / `NavbarWithCenteredSearch.tsx` / `NavbarWithSearchColumnLayout.tsx` — 11 navbar variants across 6 files
- `ProfileMenu.tsx` — shared profile dropdown used by navbar variants
- `FooterFourColMission.tsx` / `FooterFourColCTA.tsx` / `FooterFourColSimple.tsx` / `FooterFourColNewsletter.tsx` / `FooterFourColNewsletterBelow.tsx` / `FooterSimpleCentered.tsx` / `FooterSimpleSocial.tsx` — 7 footer variants
- `SocialIcons.tsx` — shared social icon row (inline SVG: Facebook/Instagram/X/GitHub/YouTube)
- `BreadcrumbSimpleSlash.tsx` / `BreadcrumbSimpleChevron.tsx` / `ContainedBreadcrumb.tsx` / `BreadcrumbFullWidthBar.tsx` / `BreadcrumbsShowcase.tsx` — 4 breadcrumb variants + showcase
- `MegaMenu.tsx` — click-triggered Popper flyout; left panel: 4 icon items with name + description; right panel: 3 recent posts with "See all"; bottom: quick-link buttons; `Grow` + `ClickAwayListener`
- `SidebarNav.tsx` — 256px permanent sidebar; two nav groups; active item: `action.selected` + `primary.main`; badge count; user avatar/name/role footer
- `TabBar.tsx` — MUI `BottomNavigation` wrapper; `tabs` prop with `badge` support; `showLabels` toggle; 60px height; top shadow border
- `shared.ts` — merged navbar data (`navItems`, `userNavItems`, `user`, `LOGO_SRC`) + footer data (`company`, `navigation`, `socialLinks`, `simpleNavLinks`, `CURRENT_YEAR`) + breadcrumb data (`crumbs`)
- `index.ts` — flat barrel export (all 26 component files, sectioned by type)
- `navigation.md` — API docs

---

### Hero & Headers (complete — 6 components)
**Location:** `frontend/src/components/mui-tui/heroes/`

Files:
- `HeroCentered.tsx` — centered headline + CTA; indigo radial gradient blob adapts opacity per mode; `badge` chip, `\n` headline line breaks
- `HeroSplit.tsx` — 50/50 CSS grid; `imagePosition: 'left'|'right'`; image reorders on mobile; mode-aware drop shadow
- `HeroVideoBG.tsx` — full-viewport (`min-height: 100vh`); HTML5 video with `autoPlay muted loop playsInline`; `overlayOpacity` scrim (default 0.55); always white text
- `HeroCarousel.tsx` — 3 default slides; `opacity` fade between slides; auto-advance (`interval` ms); pauses on hover; pill dot indicators expand when active; prev/next `IconButton`s
- `PageHeader.tsx` — MUI `Breadcrumbs` + title + description + `actions` slot; `bgcolor: background.paper`; optional bottom divider
- `AnnouncementBar.tsx` — dismissible with `useState`; `severity: 'brand'|'info'|'success'|'warning'`; hardcoded high-contrast brand colors (light/dark variant per mode); close button hides permanently
- `index.ts` — barrel export (components + prop types)

---

### Layout & Structure (complete — 6 components)
**Location:** `frontend/src/components/mui-tui/layout/`

Files:
- `Section.tsx` — semantic section wrapper with `py` size presets (`none/sm/md/lg/xl`) and optional `topBorder`/`bottomBorder`
- `Container.tsx` — MUI Container wrapper with project-standard `px` gutters (xs:3, sm:6, lg:8); `padded` and `maxWidth` props
- `Grid.tsx` — CSS grid via Box; `cols` accepts `1|2|3|4|6|12` or responsive object; `gap`, `rowGap`, `colGap`
- `Columns.tsx` — 7 preset layouts: two-col, three-col, four-col, sidebar-left/right (240px), sidebar-left/right-wide (320px); all collapse to 1-col on mobile
- `Divider.tsx` — MUI Divider wrapper; `lineStyle` adds `dashed`/`dotted` via custom `<hr>`; `spacing` shorthand for `my`; `solid` passes through to MUI Divider (supports label children)
- `Spacer.tsx` — blank spacer; `size` in MUI spacing units (default 4 = 32px); `axis` vertical/horizontal
- `index.ts` — barrel export (components + prop types)

---

### Navbar (complete — 11 variants)
**Location:** `frontend/src/components/mui-tui/navbars/`

Files:
- `NavbarSimple.tsx` — Simple light + Simple dark variants
- `NavbarWithQuickAction.tsx` — Quick action light + dark variants
- `NavbarWithSearch.tsx` — With search light + dark variants
- `NavbarWithMenuButton.tsx` — Menu button on left light + dark variants
- `NavbarWithCenteredSearch.tsx` — Centered search light + dark variants
- `NavbarWithSearchColumnLayout.tsx` — Search in column layout variant
- `ProfileMenu.tsx` — Shared profile/avatar dropdown
- `index.ts` — barrel export

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

### Footer (complete — 7 variants)
**Location:** `frontend/src/components/mui-tui/footers/`

Files:
- `FooterFourColMission.tsx` — logo + mission description (left col) + 4 link columns + social/copyright bottom
- `FooterFourColCTA.tsx` — CTA headline + buttons (top) → 4 link columns → logo/copyright/social bottom
- `FooterFourColSimple.tsx` — logo (top) → 4 link columns → social icons → copyright
- `FooterFourColNewsletter.tsx` — logo + newsletter form (left col) + 3 link columns + legal links bottom
- `FooterFourColNewsletterBelow.tsx` — 4 link columns → newsletter signup → logo/copyright/social bottom
- `FooterSimpleCentered.tsx` — logo → nav links → social icons → copyright; all centered
- `FooterSimpleSocial.tsx` — logo + nav links + social icons (horizontal) → copyright
- `SocialIcons.tsx` — shared social icon button row (inline SVGs: Facebook, Instagram, X, GitHub, YouTube)
- `shared.ts` — data constants (company, navigation, socialLinks, simpleNavLinks, CURRENT_YEAR)
- `index.ts` — barrel export

Source: https://tailwindcss.com/plus/ui-blocks/marketing/sections/footers

> Note: Page files (`tui/demo/marketing`, `apple/demo/marketing`, `mui/demo/marketing`) still contain inline footer stubs — those should be swapped out for the extracted components.

### Breadcrumb (complete — 4 variants)
**Location:** `frontend/src/components/mui-tui/breadcrumbs/`

Files:
- `BreadcrumbSimpleSlash.tsx` — slash separator variant
- `BreadcrumbSimpleChevron.tsx` — chevron (`›`) separator variant
- `ContainedBreadcrumb.tsx` — pill-shaped contained/shadow variant with slash SVG separator
- `BreadcrumbFullWidthBar.tsx` — full-width bordered bar; dark mode: `action.hover` bg, light: `grey.50`
- `BreadcrumbsShowcase.tsx` — demo wrapper showing all 4 variants with labels
- `shared.ts` — crumbs data constant
- `index.tsx` — barrel export

Source: https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/breadcrumbs

---

*Last updated: May 2026*
