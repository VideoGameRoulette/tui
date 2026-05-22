import { COLORS } from '@/lib/theme';
import { NAV_SECTIONS } from '@/lib/nav';

export type SectionAccent = { accentColor: string; accentLight: string };
export type SectionTailwind = { accentClass: string; bgHoverClass: string };

/** MUI / home / MuiShell — theme token accents */
export const MUI_SECTION_ACCENTS: Record<string, SectionAccent> = {
  mui:   { accentColor: COLORS.secondary.main, accentLight: COLORS.secondary.light },
  tui:   { accentColor: COLORS.primary.main,   accentLight: COLORS.primary.light   },
  apple: { accentColor: '#007AFF',              accentLight: '#409CFF'              },
  ads:   { accentColor: '#f59e0b',              accentLight: '#fcd34d'              },
};

/** Apple liquid-glass pages — slightly different mui/tui hues */
export const APPLE_GLASS_SECTION_ACCENTS: Record<string, SectionAccent> = {
  mui:   { accentColor: '#6366f1', accentLight: '#a5b4fc' },
  tui:   { accentColor: '#0ea5e9', accentLight: '#7dd3fc' },
  apple: { accentColor: '#007AFF', accentLight: '#409CFF' },
  ads:   { accentColor: '#f59e0b', accentLight: '#fcd34d' },
};

/** Tailwind shell pages */
export const TUI_SECTION_CLASSES: Record<string, SectionTailwind> = {
  mui:   { accentClass: 'text-indigo-500 dark:text-indigo-400', bgHoverClass: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20' },
  tui:   { accentClass: 'text-sky-500 dark:text-sky-400',       bgHoverClass: 'hover:bg-sky-50 dark:hover:bg-sky-900/20'       },
  apple: { accentClass: 'text-blue-500 dark:text-blue-400',     bgHoverClass: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'     },
  ads:   { accentClass: 'text-amber-500 dark:text-amber-400',   bgHoverClass: 'hover:bg-amber-50 dark:hover:bg-amber-900/20'   },
};

export function accentForSection(
  accents: Record<string, SectionAccent>,
  sectionId: string,
  fallback: SectionAccent = MUI_SECTION_ACCENTS.mui,
): SectionAccent {
  return accents[sectionId] ?? fallback;
}

export function tailwindForSection(
  classes: Record<string, SectionTailwind>,
  sectionId: string,
  fallback: SectionTailwind = TUI_SECTION_CLASSES.mui,
): SectionTailwind {
  return classes[sectionId] ?? fallback;
}

/** Menu anchor state keyed by every nav section id (including ads). */
export function createNavMenuAnchorState(): Record<string, HTMLElement | null> {
  return Object.fromEntries(NAV_SECTIONS.map((s) => [s.id, null])) as Record<string, HTMLElement | null>;
}

export function buildTailwindNavSections() {
  return NAV_SECTIONS.map((section) => ({
    ...section,
    ...tailwindForSection(TUI_SECTION_CLASSES, section.id),
  }));
}
