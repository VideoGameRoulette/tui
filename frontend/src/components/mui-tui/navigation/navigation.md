# Navigation Components

Location: `frontend/src/components/mui-tui/navigation/`

---

## Component Summary

### Navbars (7 files — 11 variants)

| Component | Description |
|-----------|-------------|
| `NavbarSimple` | Simple light + dark variants; underline-tab links, bell + avatar, hamburger |
| `NavbarWithQuickAction` | Light + dark; hamburger left, "New Job" CTA always visible |
| `NavbarWithSearch` | Light + dark; 3-column layout, search input in nav row |
| `NavbarWithMenuButton` | Light + dark; hamburger `sm:absolute` left, underline-tab desktop links |
| `NavbarWithCenteredSearch` | 2-row: logo + search + actions on row 1, secondary nav on row 2 |
| `NavbarWithSearchColumnLayout` | `xl:grid-cols-12`, logo `md:absolute lg:static`, Chelsea Hagon user |
| `ProfileMenu` | Shared profile/avatar dropdown (used internally by navbar variants) |

### Footers (8 files — 7 variants + SocialIcons)

| Component | Description |
|-----------|-------------|
| `FooterFourColMission` | Logo + mission description (left col) + 4 link columns + social/copyright |
| `FooterFourColCTA` | CTA headline + buttons (top) → 4 link columns → logo/copyright/social |
| `FooterFourColSimple` | Logo (top) → 4 link columns → social icons → copyright |
| `FooterFourColNewsletter` | Logo + newsletter form (left col) + 3 link columns + legal links |
| `FooterFourColNewsletterBelow` | 4 link columns → newsletter signup → logo/copyright/social |
| `FooterSimpleCentered` | Logo → nav links → social icons → copyright; all centered |
| `FooterSimpleSocial` | Logo + nav links + social icons (horizontal) → copyright |
| `SocialIcons` | Shared social icon button row (inline SVGs: Facebook, Instagram, X, GitHub, YouTube) |

### Breadcrumbs (5 files — 4 variants + showcase)

| Component | Description |
|-----------|-------------|
| `BreadcrumbSimpleSlash` | Slash `/` separator variant |
| `BreadcrumbSimpleChevron` | Chevron `›` separator variant |
| `ContainedBreadcrumb` | Pill-shaped contained/shadow variant with slash SVG separator |
| `BreadcrumbFullWidthBar` | Full-width bordered bar; dark: `action.hover` bg, light: `grey.50` |
| `BreadcrumbsShowcase` | Demo wrapper showing all 4 variants with labels |

### New Navigation Components

| Component | Description |
|-----------|-------------|
| `MegaMenu` | Popper flyout; nav items with icons + recent posts + quick-link footer |
| `SidebarNav` | Permanent sidebar; 2 nav groups; active state; badge count; user footer |
| `TabBar` | MUI BottomNavigation; badge support; configurable tabs; `showLabels` |

---

## MegaMenu

```tsx
import { MegaMenu } from '@/components/mui-tui/navigation';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `'Solutions'` | Trigger button label |

- Self-contained trigger button + Popper panel
- Left panel: 4 nav items with icon (36×36 chip) + name + description
- Right panel (sm+): 3 recent posts with category, date, "See all" link
- Footer bar: 3 quick-action buttons (Watch demo / View all / Contact sales)
- `ClickAwayListener` dismisses on outside click; `Grow` transition

---

## SidebarNav

```tsx
import { SidebarNav } from '@/components/mui-tui/navigation';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultActive` | `string` | `'dashboard'` | Initially selected nav item value |
| `width` | `number` | `256` | Sidebar pixel width |

- Two nav groups: main items (6) + settings items (2) with group title
- Active item: `action.selected` bg + `primary.main` icon/text + bold label
- Badge count displayed on "Projects" item by default
- User footer with avatar, name, role

---

## TabBar

```tsx
import { TabBar } from '@/components/mui-tui/navigation';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | 4 default tabs | Tab definitions; `badge` adds MUI `Badge` |
| `defaultValue` | `string` | `'home'` | Initially selected tab |
| `showLabels` | `boolean` | `true` | Show labels below icons |

- Height 60px; top border via box-shadow for clean edge
- Selected color: `primary.main`; unselected: `text.disabled`
- Label font: 0.6875rem at all states (prevents MUI resize jump)

---

## Shared Data

`shared.ts` — all demo/placeholder data used across components in this folder:

- **Navbars:** `navItems`, `userNavItems`, `user`, `LOGO_SRC`
- **Footers:** `company`, `navigation`, `socialLinks`, `simpleNavLinks`, `CURRENT_YEAR`
- **Breadcrumbs:** `crumbs`

---

## Import

```ts
import {
  // Navbars
  NavbarSimple, NavbarWithSearch, NavbarWithQuickAction,
  NavbarWithMenuButton, NavbarWithCenteredSearch, NavbarWithSearchColumnLayout,
  // Footers
  FooterFourColMission, FooterSimpleCentered, SocialIcons,
  // Breadcrumbs
  BreadcrumbSimpleSlash, ContainedBreadcrumb,
  // New
  MegaMenu, SidebarNav, TabBar,
} from '@/components/mui-tui/navigation';
```
