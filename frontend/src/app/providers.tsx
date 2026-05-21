'use client';

import EmotionCacheProvider from './EmotionCacheProvider';
import DevConsoleSuppressor from './DevConsoleSuppressor';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      <DevConsoleSuppressor />
      {children}
    </EmotionCacheProvider>
  );
}
