# Material UI Navbar Components

Recreated in **Material UI (MUI)** using **Tailwind Plus navbar patterns** as design guidance.

---

## File Structure

| File | Purpose |
|------|---------|
| `shared.ts` | Shared data constants (`navItems`, `userNavItems`, `user`, `LOGO_SRC`) |
| `ProfileMenu.tsx` | Reusable profile dropdown menu component |
| `index.ts` | Barrel exports for the navbar package |
| `navbars.md` | This file |

---

## Component Summary

| Status | Component | Merged From | Design Reference |
|--------|-----------|-------------|------------------|
| [x] | `NavbarSimple` | Simple Light + Simple Dark | Tailwind Plus #1 & #2 |
| [x] | `NavbarWithQuickAction` | Quick Action Light + Dark | Tailwind Plus #3 & #4 |
| [x] | `NavbarWithSearch` | With Search Light + Dark | Tailwind Plus #5 & #6 |
| [x] | `NavbarWithMenuButton` | Menu Left Light + Dark | Tailwind Plus #7 & #8 |
| [x] | `NavbarWithCenteredSearch` | Centered Search Dark + Light | Tailwind Plus #9 & #10 |
| [x] | `NavbarWithSearchColumnLayout` | Column Layout | Tailwind Plus #11 |

---

## Theme Awareness

All components respond to the MUI theme mode (`light` / `dark`) via `useTheme()`:

- **Background**: `bgcolor: 'background.paper'` — adapts automatically
- **Text**: `color: 'text.primary'` / `color: 'text.secondary'`
- **Borders / dividers**: `borderColor: 'divider'`
- **Hover / active states**: `bgcolor: 'action.hover'` / `bgcolor: 'action.selected'`
- **Nav link style**: underline-tab in light mode, rounded-pill in dark mode (per original Tailwind Plus design)
- **Primary accent**: `primary.main` for active indicators and CTA buttons

---

## Showcase

All variants are rendered in `src/app/showcases/NavbarShowcase.tsx`.

---

## Implementation Details

All navbar variants are:

- Built with **Material UI (MUI)**
- Written in **TypeScript**
- Inspired by **Tailwind Plus** reference implementations (light + dark merged into one)
- Fully responsive
- Theme-aware (light/dark mode via `useTheme`)
- Modular — each variant is its own file
- Exported through a unified package interface (`index.ts`)

---

## Progress Overview

| Status | Count |
|--------|-------|
| Completed | 6 |
| In Progress | 0 |
| Planned | TBD |
