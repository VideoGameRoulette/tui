// ─── Shared navigation data ───────────────────────────────────────────────────
//
// Single source of truth for routes, labels, and descriptions.
// Each shell (MuiShell, AppShell, TUI page, Apple page) imports these and
// applies its own icon / color / Tailwind-class decorations locally.
//
// Rule: add / rename / reorder routes HERE — every shell picks up the change.

export interface NavItem {
  readonly label: string;
  readonly href:  string;
  readonly desc:  string;
}

export interface NavSection {
  readonly id:      string;
  readonly label:   string;
  readonly heading: string;
  readonly items:   readonly NavItem[];
}

// ─── Nav sections ─────────────────────────────────────────────────────────────

export const NAV_SECTIONS: readonly NavSection[] = [
  {
    id:      'mui',
    label:   'MUI',
    heading: 'Material UI',
    items: [
      { label: 'Home',      href: '/mui',                  desc: 'Landing page with Tailwind-inspired MUI theme' },
      { label: 'Data Grid', href: '/mui/demo/datagrid',    desc: 'Premium DataGrid with sorting, filtering, grouping and CSV/XLS export' },
      { label: 'Marketing', href: '/mui/demo/marketing',   desc: 'Hero image slider with auto-advance, CTAs, and dot navigation' },
    ],
  },
  {
    id:      'tui',
    label:   'Tailwind',
    heading: 'Tailwind CSS',
    items: [
      { label: 'Home',      href: '/tui',                  desc: 'Landing page built with pure Tailwind v4 utility classes' },
      { label: 'Data Grid', href: '/tui/demo/datagrid',    desc: 'Datagrid with sort, filter, selection and pagination — pure Tailwind' },
      { label: 'Marketing', href: '/tui/demo/marketing',   desc: 'Hero image slider with auto-advance, CTAs, and dot navigation' },
    ],
  },
  {
    id:      'apple',
    label:   'Glass',
    heading: 'Apple Liquid Glass',
    items: [
      { label: 'Home',      href: '/apple',                desc: 'Apple-inspired liquid glass design system with MUI v9' },
      { label: 'Data Grid', href: '/apple/demo/datagrid',  desc: 'DataGrid with liquid glass styling, filtering and export' },
      { label: 'Marketing', href: '/apple/demo/marketing', desc: 'Hero image slider with auto-advance, CTAs, and dot navigation' },
    ],
  },
  {
    id:      'ads',
    label:   'Signage',
    heading: 'Digital Ad Signage',
    items: [
      { label: 'Signage Player', href: '/ads', desc: 'Full-screen digital signage player cycling image and video slides' },
    ],
  },
];

// ─── Bottom-navigation tabs ───────────────────────────────────────────────────
// href + label only — each shell supplies its own icon components.

export const BOTTOM_NAV_TABS = [
  { href: '/',      label: 'Home'     },
  { href: '/mui',   label: 'MUI'      },
  { href: '/tui',   label: 'Tailwind' },
  { href: '/apple', label: 'Glass'    },
] as const;

export type BottomNavTab = (typeof BOTTOM_NAV_TABS)[number];

// ─── User / profile dropdown ──────────────────────────────────────────────────

export const USER_NAV = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out',     href: '#' },
] as const;
