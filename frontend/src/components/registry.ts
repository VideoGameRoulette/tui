import { ComponentType } from 'react';
import NavbarShowcase from '@/app/showcases/NavbarShowcase';
import FooterShowcase from '@/app/showcases/FooterShowcase';
import BreadcrumbsShowcase from '@/app/showcases/BreadcrumbsShowcase';

export interface ComponentEntry {
  name: string;
  slug: string;
  description: string;
  Preview: ComponentType;
}

const registry: ComponentEntry[] = [
  {
    name: 'Navbar',
    slug: 'navbar',
    description: '11 variants: simple light/dark, with search, centered search, quick action, column layout',
    Preview: NavbarShowcase,
  },
  {
    name: 'Breadcrumbs',
    slug: 'breadcrumbs',
    description: '4 variants: contained, full-width bar, simple chevrons, simple slashes',
    Preview: BreadcrumbsShowcase,
  },
  {
    name: 'Footer',
    slug: 'footer',
    description: 'Tailwind Plus footer variants',
    Preview: FooterShowcase,
  },
];

export default registry;
