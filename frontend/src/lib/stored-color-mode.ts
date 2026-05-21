'use client';

import { useCallback, useSyncExternalStore } from 'react';

export const COLOR_SCHEME_STORAGE_KEY = 'forma-color-scheme';

export type ColorMode = 'light' | 'dark';

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function notify() {
  listeners.forEach((cb) => cb());
}

function readMode(): ColorMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* private mode / blocked storage */
  }
  return 'light';
}

/** SSR-safe color mode synced with localStorage (avoids hydration mismatch on mobile). */
export function useStoredColorMode(): [ColorMode, () => void, (mode: ColorMode) => void] {
  const mode = useSyncExternalStore(subscribe, readMode, (): ColorMode => 'light');

  const setMode = useCallback((next: ColorMode) => {
    try {
      localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    notify();
  }, []);

  const toggle = useCallback(() => {
    const current = readMode();
    setMode(current === 'light' ? 'dark' : 'light');
  }, [setMode]);

  return [mode, toggle, setMode];
}
