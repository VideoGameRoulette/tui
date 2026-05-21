'use client';

// Add substrings of error messages you want hidden in dev here.
const SUPPRESSED: string[] = [
  "MUI X: Missing license key.",
];

// Must run synchronously at module load — MUI X fires console.error during
// React's render/useMemo phase, before any useEffect can intercept it.
if (typeof window !== 'undefined') {
  const _orig = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : '';
    if (SUPPRESSED.some((p) => msg.includes(p))) return;
    _orig(...args);
  };
}

export default function DevConsoleSuppressor() {
  return null;
}
