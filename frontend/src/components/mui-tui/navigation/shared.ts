'use client';

// ─── Navbar shared data ───────────────────────────────────────────────────────

export const navItems = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

export const userNavItems = [
  { name: 'Your profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const LOGO_SRC =
  'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500';

// ─── Footer shared data ───────────────────────────────────────────────────────

export const company = {
  name: 'Acme Inc.',
  description:
    'Making the world a better place through constructing elegant hierarchies.',
  logoSrc:
    'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600',
  logoSrcDark:
    'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500',
};

export const navigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ],
};

export const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'X', href: '#' },
  { name: 'GitHub', href: '#' },
  { name: 'YouTube', href: '#' },
];

export const simpleNavLinks = [
  { name: 'About', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Accessibility', href: '#' },
  { name: 'Partners', href: '#' },
];

export const CURRENT_YEAR = new Date().getFullYear();

// ─── Breadcrumb shared data ───────────────────────────────────────────────────

export const crumbs: Array<{ label: string; href?: string }> = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Project Alpha' },
];
