import { createTheme } from '@mui/material/styles';

// primary = TUI / sky brand
// secondary = MUI / indigo brand
export const COLORS = {
  primary: {
    main: '#0ea5e9',
    dark: '#0284c7',
    light: '#38bdf8',
    bg: { light: '#f0f9ff', dark: 'rgba(14,165,233,0.15)' },
    border: { light: '#bae6fd', dark: '#0284c7' },
    contrast: '#ffffff',
  },
  secondary: {
    main: '#4f46e5',
    dark: '#4338ca',
    light: '#818cf8',
    bg: { light: '#eef2ff', dark: 'rgba(79,70,229,0.15)' },
    border: { light: '#c7d2fe', dark: '#4338ca' },
    contrast: '#ffffff',
  },
  neutral: {
    bg: {
      light: { page: '#f8fafc', surface: '#ffffff' },
      dark:  { page: '#0f172a', surface: '#1e293b' },
    },
    text: {
      light: { primary: '#0f172a', secondary: '#64748b' },
      dark:  { primary: '#f1f5f9', secondary: '#94a3b8' },
    },
    border: { light: '#e2e8f0', dark: '#334155' },
  },
} as const;

function neutralPalette(mode: 'light' | 'dark') {
  const isDark = mode === 'dark';
  const n = COLORS.neutral;
  return {
    background: {
      default: isDark ? n.bg.dark.page    : n.bg.light.page,
      paper:   isDark ? n.bg.dark.surface : n.bg.light.surface,
    },
    text: {
      primary:   isDark ? n.text.dark.primary   : n.text.light.primary,
      secondary: isDark ? n.text.dark.secondary : n.text.light.secondary,
    },
    divider: isDark ? n.border.dark : n.border.light,
  };
}

const sharedButtonOverrides = {
  root: {
    textTransform: 'none' as const,
    fontWeight: 600,
    borderRadius: 8,
    boxShadow: 'none',
    '&:hover': { boxShadow: 'none' },
  },
  sizeLarge:  { padding: '12px 28px', fontSize: '1rem' },
  sizeMedium: { padding: '8px 20px',  fontSize: '0.9375rem' },
};

// Home page: hero accent uses secondary (indigo) for the "Starter" highlight
export function buildHomeTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary:   { main: COLORS.secondary.main, dark: COLORS.secondary.dark, light: COLORS.secondary.light, contrastText: COLORS.secondary.contrast },
      secondary: { main: COLORS.primary.main,   dark: COLORS.primary.dark,   light: COLORS.primary.light,   contrastText: COLORS.primary.contrast },
      ...neutralPalette(mode),
    },
    typography: { fontFamily: 'var(--font-geist-sans), Inter, system-ui, sans-serif' },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: { styleOverrides: sharedButtonOverrides },
      MuiMenu:   { styleOverrides: { paper: { borderRadius: 12 } } },
    },
  });
}

export const APPLE = {
  blue:   '#007AFF',
  indigo: '#5856D6',
  purple: '#AF52DE',
  pink:   '#FF2D55',
  red:    '#FF3B30',
  green:  '#34C759',
  gray:   '#8E8E93',
} as const;

export function buildAppleTheme(mode: 'light' | 'dark') {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary:   { main: APPLE.blue,   dark: '#0062CC', light: '#409CFF', contrastText: '#ffffff' },
      secondary: { main: APPLE.indigo, dark: '#3634A3', light: '#7B7ADB', contrastText: '#ffffff' },
      background: {
        default: isDark ? '#000000' : '#f2f2f7',
        paper:   isDark ? 'rgba(28,28,30,0.75)' : 'rgba(255,255,255,0.72)',
      },
      text: {
        primary:   isDark ? '#ffffff' : '#1d1d1f',
        secondary: isDark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)',
      },
      divider: isDark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.18)',
    },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
      h1: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05 },
      h2: { fontWeight: 700, letterSpacing: '-0.02em',  lineHeight: 1.1  },
      h3: { fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2  },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none' as const,
            fontWeight: 500,
            borderRadius: 8,
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          sizeLarge:  { padding: '12px 28px', fontSize: '1.0625rem' },
          sizeMedium: { padding: '8px 18px',  fontSize: '0.9375rem' },
          sizeSmall:  { padding: '5px 14px',  fontSize: '0.875rem' },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  });
}

// MUI landing page: primary = indigo (MUI brand), secondary = sky (TUI brand)
export function buildMuiPageTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary:   { main: COLORS.secondary.main, dark: COLORS.secondary.dark, light: COLORS.secondary.light, contrastText: COLORS.secondary.contrast },
      secondary: { main: COLORS.primary.main,   dark: COLORS.primary.dark,   light: COLORS.primary.light,   contrastText: COLORS.primary.contrast },
      ...neutralPalette(mode),
    },
    typography: {
      fontFamily: 'var(--font-geist-sans), Inter, system-ui, -apple-system, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.04em' },
      h2: { fontWeight: 800, letterSpacing: '-0.03em' },
      h3: { fontWeight: 700, letterSpacing: '-0.02em' },
      button: { fontWeight: 600 },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton:  { styleOverrides: sharedButtonOverrides },
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: mode === 'light' ? COLORS.neutral.border.light : COLORS.neutral.border.dark },
        },
      },
    },
  });
}
