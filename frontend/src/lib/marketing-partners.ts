// ─── Marketing demo: architecture provider logo row ─────────────────────────
// Used by infinite marquee sections on MUI, Tailwind, and Apple marketing pages.

export interface ArchitectureProvider {
  readonly id: string;
  readonly label: string;
  /** Path under `public/` */
  readonly logoSrc: string;
  /** Monochrome marks that need inversion on dark backgrounds */
  readonly invertInDarkMode?: boolean;
  /** Max rendered width for wide wordmarks (CSS px) */
  readonly maxWidthPx?: number;
}

export const ARCHITECTURE_PROVIDERS: readonly ArchitectureProvider[] = [
  { id: 'react', label: 'React', logoSrc: '/logos/react.svg' },
  {
    id: 'next',
    label: 'Next.js',
    logoSrc: '/next.svg',
    invertInDarkMode: true,
    maxWidthPx: 120,
  },
  { id: 'typescript', label: 'TypeScript', logoSrc: '/logos/typescript.svg', maxWidthPx: 108 },
  { id: 'mui', label: 'Material UI', logoSrc: '/logos/mui.svg', maxWidthPx: 40 },
  { id: 'tailwind', label: 'Tailwind CSS', logoSrc: '/logos/tailwindcss.svg', maxWidthPx: 128 },
  { id: 'yarn', label: 'Yarn', logoSrc: '/logos/yarn.svg', maxWidthPx: 44 },
  { id: 'snyk', label: 'Snyk', logoSrc: '/logos/snyk.svg', maxWidthPx: 36 },
] as const;
