'use client';

import EmotionCacheProvider from './EmotionCacheProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      {children}
    </EmotionCacheProvider>
  );
}
