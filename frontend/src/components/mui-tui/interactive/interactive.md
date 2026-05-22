# Material UI Interactive & Dynamic Components

State-driven, user-interactive components. All are client components.

---

## File Structure

| File | Purpose |
|------|---------|
| `AppAccordion.tsx` | MUI `Accordion` — items array, `allowMultiple`, `separated` variant |
| `AppTabs.tsx` | MUI `Tabs` + content panels — horizontal/vertical, controlled/uncontrolled |
| `AppCarousel.tsx` | Touch-swipeable slider — arrows, dots, auto-play, keyboard nav |
| `AppDropdown.tsx` | MUI `Menu` — `cloneElement` trigger, `DropdownItem[]` with icons/dividers/links |
| `AppPopover.tsx` | MUI `Popover` — `cloneElement` trigger, toggle on click, `maxWidth` |
| `AppDrawer.tsx` | MUI `Drawer` — title, close button, footer slot, all anchors, scrollable content |
| `AppStepper.tsx` | MUI `Stepper` — horizontal/vertical, built-in nav buttons, `nonLinear` mode |
| `AppPagination.tsx` | MUI `Pagination` — controlled/uncontrolled, `align`, all MUI variants/shapes |
| `InfiniteScroll.tsx` | `IntersectionObserver` sentinel — `hasMore`, `loading`, `endMessage` |
| `FilterSortBar.tsx` | `ToggleButtonGroup` filters + `Select` sort + `TextField` search composite |
| `index.ts` | Barrel export (all components + prop types) |
| `interactive.md` | This file |

---

## Component API

### `AppAccordion`
```tsx
<AppAccordion
  items={[
    { id: 'q1', summary: 'What is your refund policy?', details: '30-day full refund.' },
    { id: 'q2', summary: 'Do you offer support?', details: <SupportContent /> },
  ]}
  allowMultiple
  variant="separated"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | required | `{ id, summary, details, disabled? }[]` |
| `defaultExpanded` | `string \| string[]` | — | Initially expanded item id(s) |
| `allowMultiple` | `boolean` | `false` | Allow multiple panels open simultaneously |
| `disableGutters` | `boolean` | `false` | Remove MUI Accordion gutters |
| `variant` | `'default' \| 'separated'` | `'default'` | `default`: connected stack; `separated`: individual bordered cards with `gap:8px` |

---

### `AppTabs`
```tsx
<AppTabs
  items={[
    { value: 'overview', label: 'Overview', content: <Overview /> },
    { value: 'specs', label: 'Specs', content: <Specs /> },
  ]}
  defaultValue="overview"
  variant="fullWidth"
/>

<AppTabs items={items} orientation="vertical" />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | required | `{ value, label, content, icon?, disabled? }[]` |
| `value` | `string` | — | Controlled active tab |
| `defaultValue` | `string` | first item | Uncontrolled initial tab |
| `onChange` | `(value: string) => void` | — | Change handler |
| `variant` | `'standard' \| 'fullWidth' \| 'scrollable'` | `'standard'` | MUI Tabs variant |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Vertical: tabs on left, content on right |

---

### `AppCarousel`
```tsx
<AppCarousel
  items={[<SlideA />, <SlideB />, <SlideC />]}
  autoPlay
  interval={4000}
  showArrows
  showDots
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ReactNode[]` | required | Slide content — any ReactNode |
| `autoPlay` | `boolean` | `false` | Auto-advance slides |
| `interval` | `number` | `5000` | Auto-advance delay in ms |
| `showArrows` | `boolean` | `true` | Prev/next arrow buttons |
| `showDots` | `boolean` | `true` | Pill dot indicators |

Touch swipe: 50px threshold. Keyboard: ArrowLeft/ArrowRight (focus the carousel first). Animation: CSS `translateX` transition, no layout shift.

---

### `AppDropdown`
```tsx
<AppDropdown
  trigger={<Button endIcon={<ArrowDropDownIcon />}>Options</Button>}
  items={[
    { label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
    { label: 'Share', icon: <ShareIcon />, onClick: handleShare, dividerAfter: true },
    { label: 'Delete', icon: <DeleteIcon />, onClick: handleDelete },
  ]}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactElement` | required | Button/element that opens the menu (`cloneElement` injects `onClick`) |
| `items` | `DropdownItem[]` | required | `{ label, onClick?, icon?, disabled?, dividerAfter?, href? }[]` |
| `minWidth` | `number` | `180` | Menu paper min-width in px |

`dividerAfter: true` inserts a `<Divider />` after that item.

---

### `AppPopover`
```tsx
<AppPopover
  trigger={<IconButton><InfoIcon /></IconButton>}
  title="More info"
  content="This setting controls the maximum number of retries."
  maxWidth={280}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactElement` | required | Element that toggles the popover |
| `content` | `ReactNode` | required | Popover body (string auto-wrapped in Typography) |
| `title` | `string` | — | Bold title above content |
| `maxWidth` | `number \| string` | `320` | Paper max-width |
| `anchorOrigin` | `PopoverOrigin` | `{ vertical: 'bottom', horizontal: 'left' }` | Anchor point on trigger |
| `transformOrigin` | `PopoverOrigin` | `{ vertical: 'top', horizontal: 'left' }` | Anchor point on popover |

Click trigger again to dismiss (toggle behavior).

---

### `AppDrawer`
```tsx
<AppDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="Filters"
  anchor="right"
  width={400}
  footer={<Button fullWidth variant="contained">Apply</Button>}
>
  <FilterContent />
</AppDrawer>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controls visibility |
| `onClose` | `() => void` | required | Called on backdrop click or ✕ |
| `anchor` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Drawer edge |
| `width` | `number \| string` | `360` | Width for left/right drawers |
| `title` | `string` | — | Header title |
| `children` | `ReactNode` | — | Scrollable content area |
| `footer` | `ReactNode` | — | Fixed footer (buttons, etc.) |
| `showCloseButton` | `boolean` | `true` | ✕ icon in header |

---

### `AppStepper`
```tsx
<AppStepper
  steps={[
    { label: 'Account', description: 'Set up your login', content: <AccountStep /> },
    { label: 'Profile', content: <ProfileStep /> },
    { label: 'Review', content: <ReviewStep /> },
  ]}
  showNavButtons
  onFinish={handleFinish}
/>

<AppStepper steps={steps} orientation="vertical" showNavButtons />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepItem[]` | required | `{ label, description?, content?, optional? }[]` |
| `activeStep` | `number` | — | Controlled active step index |
| `defaultActiveStep` | `number` | `0` | Uncontrolled initial step |
| `onChange` | `(step: number) => void` | — | Called on step change |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `alternativeLabel` | `boolean` | `false` | Labels below icons (horizontal only) |
| `nonLinear` | `boolean` | `false` | Allow clicking any step |
| `showNavButtons` | `boolean` | `true` | Built-in Back/Next/Finish buttons |
| `onFinish` | `() => void` | — | Called when last step's Finish is clicked |

Vertical orientation uses `StepContent` — nav buttons appear inside each step. Horizontal renders content + nav below the stepper bar.

---

### `AppPagination`
```tsx
<AppPagination
  count={24}
  page={page}
  onChange={setPage}
  shape="rounded"
  color="primary"
  align="center"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | required | Total number of pages |
| `page` | `number` | — | Controlled current page |
| `defaultPage` | `number` | `1` | Uncontrolled initial page |
| `onChange` | `(page: number) => void` | — | Change handler |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Item size |
| `variant` | `'text' \| 'outlined'` | `'outlined'` | Item style |
| `shape` | `'circular' \| 'rounded'` | `'rounded'` | Item border radius |
| `color` | `'primary' \| 'secondary' \| 'standard'` | `'primary'` | Selected item color |
| `showFirstButton` | `boolean` | `false` | « first-page button |
| `showLastButton` | `boolean` | `false` | » last-page button |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Horizontal alignment |

---

### `InfiniteScroll`
```tsx
<InfiniteScroll
  hasMore={hasMore}
  loading={isFetching}
  onLoadMore={fetchNextPage}
  endMessage="You've seen everything!"
>
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</InfiniteScroll>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | List of items already loaded |
| `onLoadMore` | `() => void \| Promise<void>` | required | Called when sentinel enters viewport |
| `hasMore` | `boolean` | required | Whether more items exist |
| `loading` | `boolean` | `false` | Shows loading indicator, blocks new triggers |
| `loadingIndicator` | `ReactNode` | `<CircularProgress />` | Custom loading UI |
| `endMessage` | `ReactNode` | — | Shown when `hasMore=false` and not loading |
| `threshold` | `number` | `0.1` | IntersectionObserver threshold (0–1) |
| `rootMargin` | `string` | `'0px 0px 200px 0px'` | Trigger 200px before sentinel reaches viewport |

`onLoadMore` is stored in a ref to prevent stale-closure issues without requiring the caller to memoize.

---

### `FilterSortBar`
```tsx
<FilterSortBar
  filters={[
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
  ]}
  filterValue={filter}
  onFilterChange={setFilter}
  sortOptions={[
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
  ]}
  sortValue={sort}
  onSortChange={setSort}
  onSearch={handleSearch}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filters` | `FilterOption[]` | `[]` | `{ value, label }[]` — rendered as `ToggleButtonGroup` |
| `filterValue` | `string \| null` | — | Controlled filter value |
| `onFilterChange` | `(value: string \| null) => void` | — | Filter change handler |
| `sortOptions` | `SortOption[]` | `[]` | `{ value, label }[]` — rendered as `Select` |
| `sortValue` | `string` | `''` | Controlled sort value |
| `onSortChange` | `(value: string) => void` | — | Sort change handler |
| `searchValue` | `string` | — | Controlled search value |
| `onSearchChange` | `(value: string) => void` | — | Fires on every keystroke |
| `onSearch` | `(value: string) => void` | — | Fires on Enter or search icon click |
| `showSearch` | `boolean` | `true` | Show search field |
| `showFilters` | `boolean` | `true` | Show filter toggle buttons |
| `showSort` | `boolean` | `true` | Show sort select |

Layout: flex-wrap row. Search expands on mobile (`flex: 1 1 100%` on xs).

---

## Theme Awareness

- `AppAccordion` border uses `borderColor: 'divider'` — adapts light/dark.
- `AppCarousel` dots use same dark/light rgba logic as `HeroCarousel`.
- `AppDropdown` / `AppPopover` use `slotProps.paper.sx` (MUI v9 pattern).
- `AppDrawer` content area is `overflowY: auto` — footer stays fixed at bottom.
- `InfiniteScroll` default `rootMargin` pre-loads 200px before the sentinel is visible — prevents jarring loads at the very bottom.
