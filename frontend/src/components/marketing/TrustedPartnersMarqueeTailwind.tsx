'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ARCHITECTURE_PROVIDERS } from '@/lib/marketing-partners';

const LOGO_HEIGHT_PX = 28;
const MARQUEE_DURATION_S = 44;

function ProviderLogo({
  label,
  logoSrc,
  invertInDarkMode,
  maxWidthPx,
  isDark,
}: {
  label: string;
  logoSrc: string;
  invertInDarkMode?: boolean;
  maxWidthPx?: number;
  isDark: boolean;
}) {
  const filter =
    invertInDarkMode && isDark ? 'invert(1) brightness(1.12)' : undefined;

  return (
    <span
      className="inline-flex shrink-0 items-center"
      style={{ height: LOGO_HEIGHT_PX + 8 }}
      title={label}
    >
      <Image
        src={logoSrc}
        alt=""
        width={maxWidthPx ?? 96}
        height={LOGO_HEIGHT_PX}
        unoptimized
        title={label}
        className="block h-7 w-auto object-contain"
        style={{
          maxWidth: maxWidthPx ?? 96,
          filter,
        }}
      />
    </span>
  );
}

export function TrustedPartnersMarqueeTailwind({ isDark }: { isDark: boolean }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const names = ARCHITECTURE_PROVIDERS.map((p) => p.label).join(', ');

  const tiles = ARCHITECTURE_PROVIDERS.map((p) => (
    <ProviderLogo
      key={p.id}
      label={p.label}
      logoSrc={p.logoSrc}
      invertInDarkMode={p.invertInDarkMode}
      maxWidthPx={p.maxWidthPx}
      isDark={isDark}
    />
  ));

  const loopedTiles = [0, 1].flatMap((dup) =>
    ARCHITECTURE_PROVIDERS.map((p) => (
      <ProviderLogo
        key={`${dup}-${p.id}`}
        label={p.label}
        logoSrc={p.logoSrc}
        invertInDarkMode={p.invertInDarkMode}
        maxWidthPx={p.maxWidthPx}
        isDark={isDark}
      />
    )),
  );

  return (
    <div className="relative w-full overflow-hidden">
      <style>{`
        @keyframes tui-trusted-partners-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tui-trusted-partners-track {
          display: flex;
          align-items: center;
          gap: clamp(1.25rem, 3vw, 2.25rem);
        }
        .tui-trusted-partners-track--animate {
          width: max-content;
          animation: tui-trusted-partners-marquee ${MARQUEE_DURATION_S}s linear infinite;
        }
        @media (hover: hover) {
          .tui-trusted-partners-track--animate:hover { animation-play-state: paused; }
        }
      `}</style>

      <span className="absolute m-[-1px] size-px overflow-hidden border-0 p-0 whitespace-nowrap">
        Provider logos: {names}.
      </span>

      <div
        className={`tui-trusted-partners-track ${reduceMotion ? 'mx-auto w-full max-w-4xl flex-wrap justify-center gap-x-[clamp(1.25rem,3vw,2.25rem)] gap-y-3' : 'tui-trusted-partners-track--animate'}`}
        aria-hidden={!reduceMotion}
      >
        {reduceMotion ? tiles : loopedTiles}
      </div>
    </div>
  );
}
