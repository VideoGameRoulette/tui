'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import TailwindLogoIcon from '@/components/icons/TailwindLogoIcon';
import AppleLogoIcon from '@/components/icons/AppleLogoIcon';
import { TrustedPartnersMarqueeTailwind } from '@/components/marketing/TrustedPartnersMarqueeTailwind';
import { BOTTOM_NAV_TABS } from '@/lib/nav';
import { useStoredColorMode } from '@/lib/stored-color-mode';
import { buildTailwindNavSections } from '@/lib/nav-shell-styles';

const navSections = buildTailwindNavSections();

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&w=1600&q=80',
    badge: 'New · Tailwind CSS v4',
    headline: ['Build your next', 'project faster.'],
    sub: 'Ship production-ready interfaces with utility-first CSS — no configuration required right out of the box.',
    cta: { label: 'Get started free', href: '#' },
    secondary: { label: 'View docs →', href: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    badge: 'Design System',
    headline: ['Design systems', 'for every team.'],
    sub: 'From startups to Fortune 500 — consistent, responsive layouts that scale with your product and your team.',
    cta: { label: 'Explore components', href: '#' },
    secondary: { label: 'See examples →', href: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    badge: 'Open Source · MIT',
    headline: ['Trusted by', 'millions of devs.'],
    sub: 'Community-driven and battle-tested across thousands of production apps. No vendor lock-in, ever.',
    cta: { label: 'Join the community', href: '#' },
    secondary: { label: 'Star on GitHub →', href: '#' },
  },
] as const;

const INTERVAL = 5000;

const HERO_MIN_H = 'min-h-[calc(100dvh-60px-56px)] md:min-h-[calc(100dvh-60px)]';
const HERO_H     = 'h-[calc(100dvh-60px-56px)] md:h-[calc(100dvh-60px)]';

const FEATURES = [
  {
    title: 'Polished layouts',
    body: 'Utility-first patterns for hero, proof, and CTA bands — easy to remix for the next campaign.',
  },
  {
    title: 'Ship faster',
    body: 'No bespoke CSS sprawl: compose spacing, type, and color tokens that stay consistent site-wide.',
  },
  {
    title: 'Built for teams',
    body: 'Marketing and engineering iterate on the same class vocabulary — fewer handoffs, faster reviews.',
  },
] as const;

// ─── Icons ────────────────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XMenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
      className={`size-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
      <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
      <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L9.19 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3 text-slate-400">
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.452.55.853 1.005 1.005l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.45.15-.85.55-.995 1.005l-.4 1.187a.75.75 0 0 1-1.43 0l-.4-1.187a1.875 1.875 0 0 0-.995-1.005l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.45-.15.85-.55.995-1.005l.4-1.187A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M4.5 6.375a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM9.75 21.75h-6v-1.125a4.125 4.125 0 0 1 4.128-4.125H9.75a4.125 4.125 0 0 1 4.128 4.125v1.125h-4.128ZM14.25 11.625a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Zm3.375 10.125H12v-1.125a2.625 2.625 0 0 1 2.625-2.625h.75a2.625 2.625 0 0 1 2.625 2.625v1.125Z" />
    </svg>
  );
}

const FEATURE_ICONS = [<SparklesIcon key="s" />, <BoltIcon key="b" />, <UsersIcon key="u" />];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TuiMarketingDemo() {
  const [mode, toggleMode] = useStoredColorMode();
  const isDark = mode === 'dark';
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [active, setActive]           = useState(0);
  const [paused, setPaused]           = useState(false);
  const [tickKey, setTickKey]         = useState(0);
  const touchStartX                   = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    return () => { document.documentElement.classList.remove('dark'); };
  }, [isDark]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    setTickKey((k) => k + 1);
  }, []);
  const next = useCallback(() => {
    setActive((i) => (i + 1) % SLIDES.length);
    setTickKey((k) => k + 1);
  }, []);
  const goTo = useCallback((i: number) => {
    setActive(i);
    setTickKey((k) => k + 1);
  }, []);

  // Auto-advance — uses inline setter so the effect only restarts when paused
  // changes or when a manual navigation resets tickKey.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, tickKey]);

  return (
    <div className="h-dvh flex flex-col bg-slate-50 dark:bg-slate-900">

      {/* ── Header ── */}
      <header className="shrink-0 relative z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-[60px] items-center justify-between gap-4">

            {/* Logo */}
            <div className="flex shrink-0 items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-sky-500">
                <TailwindLogoIcon sx={{ fontSize: 16, color: 'white' }} />
              </div>
              <span className="text-[1.0625rem] font-bold tracking-tight text-slate-900 dark:text-white">Tailwind UI</span>
            </div>

            {/* Centre — section dropdowns (desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {navSections.map((section) => (
                <div key={section.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                    aria-expanded={openSection === section.id}
                    className={`flex items-center gap-1 px-3 py-1.5 text-[0.9375rem] font-medium rounded-md transition-colors ${
                      openSection === section.id
                        ? `${section.accentClass} bg-slate-100 dark:bg-slate-800`
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {section.label}
                    <ChevronDownIcon open={openSection === section.id} />
                  </button>

                  {openSection === section.id && (
                    <div className="absolute left-0 top-full mt-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg z-50">
                      <p className={`px-3 pt-3 pb-1 text-[0.6875rem] font-bold uppercase tracking-widest ${section.accentClass}`}>
                        {section.heading}
                      </p>
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenSection(null)}
                          className={`flex flex-col mx-2 mb-1 rounded-lg px-2.5 py-2.5 transition-colors ${section.bgHoverClass}`}
                        >
                          <span className="text-[0.9375rem] font-semibold text-slate-900 dark:text-white">{item.label}</span>
                          <span className="text-[0.8125rem] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{item.desc}</span>
                        </Link>
                      ))}
                      <div className="border-t border-slate-100 dark:border-slate-800 mx-3 mt-0.5 mb-2 pt-2 flex items-center gap-1">
                        <PlusIcon />
                        <span className="text-[0.8125rem] text-slate-400 italic">More pages coming soon</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right — theme + hamburger */}
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={toggleMode}
                className="flex size-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex md:hidden size-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Open navigation menu"
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative flex h-full w-72 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-2xl">
            <div className="flex h-[60px] shrink-0 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-sky-500">
                  <TailwindLogoIcon sx={{ fontSize: 14, color: 'white' }} />
                </div>
                <span className="text-base font-bold text-slate-900 dark:text-white">Tailwind UI</span>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="flex size-8 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <XMenuIcon />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 py-3">
              {navSections.map((section, idx) => (
                <div key={section.id}>
                  <p className={`px-4 pt-${idx === 0 ? 2 : 4} pb-1.5 text-[0.6875rem] font-bold uppercase tracking-widest ${section.accentClass}`}>
                    {section.heading}
                  </p>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex flex-col mx-2 mb-1 rounded-lg px-3 py-2.5 transition-colors ${section.bgHoverClass}`}
                    >
                      <span className="text-[0.9375rem] font-semibold text-slate-900 dark:text-white">{item.label}</span>
                      <span className="text-[0.8125rem] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                  {idx < navSections.length - 1 && <hr className="mx-4 mt-3 border-slate-100 dark:border-slate-800" />}
                </div>
              ))}
              <div className="flex items-center gap-1 px-4 mt-3">
                <PlusIcon />
                <span className="text-[0.8125rem] text-slate-400 italic">More pages coming soon</span>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-3 flex items-center gap-2">
              <button
                onClick={() => { toggleMode(); setDrawerOpen(false); }}
                className="flex size-9 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
              <span className="text-[0.875rem] text-slate-500 dark:text-slate-400">{isDark ? 'Light mode' : 'Dark mode'}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Scrollable content ── */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-slate-50 dark:bg-slate-900">
        {/* ── Slider Hero — one viewport minus chrome ── */}
        <div
          className={`relative ${HERO_MIN_H} ${HERO_H} overflow-hidden bg-slate-900`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(dx) < 40) return;
            if (dx > 0) prev(); else next();
          }}
        >

          {/* Slides */}
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              className={`absolute inset-0 flex items-center justify-center text-center transition-opacity duration-700 ${
                i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Overlay */}
              <div className={`absolute inset-0 ${
                isDark
                  ? 'bg-gradient-to-br from-slate-950/88 to-slate-900/93'
                  : 'bg-gradient-to-br from-slate-900/82 to-sky-950/88'
              }`} />

              {/* Content */}
              <div className="relative z-10 px-4 sm:px-6 max-w-2xl mx-auto w-full">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 rounded-full border border-sky-500/30 bg-sky-500/10 text-[0.8125rem] font-semibold text-sky-300">
                  <span className="size-1.5 rounded-full bg-sky-400" />
                  {slide.badge}
                </div>

                <h1 className="text-[2.5rem] sm:text-[3.75rem] lg:text-[5rem] font-extrabold leading-none tracking-[-0.04em] text-white mb-6">
                  {slide.headline[0]}<br />
                  <span className="text-sky-400">{slide.headline[1]}</span>
                </h1>

                <p className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-slate-300 mb-8">
                  {slide.sub}
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={slide.cta.href}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-400 px-7 py-3.5 text-base font-semibold text-white transition-colors"
                  >
                    {slide.cta.label}
                    <ArrowRightIcon />
                  </a>
                  <a
                    href={slide.secondary.href}
                    className="inline-flex items-center rounded-lg border border-white/20 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    {slide.secondary.label}
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* ── Top-left: dots + counter chip ── */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-sky-400 w-5' : 'bg-white/40 w-1.5 hover:bg-white/65'
                  }`}
                />
              ))}
            </div>
            <span className="pl-1.5 border-l border-white/20 text-[0.6875rem] font-medium leading-none text-white/65 tabular-nums">
              {active + 1} / {SLIDES.length}
            </span>
          </div>

          {/* ── Top-right: prev / next arrow chip ── */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex items-center gap-0.5 p-1.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="flex size-7 items-center justify-center rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="flex size-7 items-center justify-center rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRightIcon />
            </button>
          </div>

        </div>

        {/* ── Feature grid ── */}
        <section className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Why teams choose this stack
            </p>
            <h2 className="mt-2 text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Marketing pages without the scramble
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-slate-600 dark:text-slate-400">
              This demo pairs a full-bleed hero carousel with sections you would reuse on a real launch —
              social proof, narrative, and a closing call to action.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {FEATURES.map((f, idx) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6 shadow-sm"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                    {FEATURE_ICONS[idx]}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Logo strip ── */}
        <section
          className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/30 py-12"
          aria-labelledby="architecture-providers-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
            <p id="architecture-providers-heading" className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Trusted architecture providers
            </p>
            <div className="mt-6">
              <TrustedPartnersMarqueeTailwind isDark={isDark} />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-white dark:bg-slate-900 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Ready when your campaign is
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Swap slides, tune copy, and wire CTAs to your analytics — the shell navigation and theme toggle
              stay consistent with the rest of the template.
            </p>
            <Link
              href="/tui"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-sky-400"
            >
              Back to Tailwind home
              <ArrowRightIcon />
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
            <span className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">Tailwind UI · Marketing</span>
            <span className="text-center text-[0.8125rem] text-slate-500 dark:text-slate-400 sm:text-right">
              © 2019 - 2026 In House Cloud Solutions. All rights reserved.
            </span>
          </div>
        </footer>
      </main>

      {/* ── Mobile bottom navigation ── */}
      <div className="shrink-0 md:hidden flex h-14 items-center justify-around bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        {BOTTOM_NAV_TABS.map((tab) => {
          const iconMap: Record<string, React.ReactNode> = {
            '/': (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            ),
            '/mui':   <MuiLogoIcon sx={{ fontSize: 20 }} />,
            '/tui':   <TailwindLogoIcon sx={{ fontSize: 20 }} />,
            '/apple': <AppleLogoIcon sx={{ fontSize: 20 }} />,
          };
          const isActive = tab.href === '/tui';
          return (
            <a
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 transition-colors ${
                isActive
                  ? 'text-sky-500'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {iconMap[tab.href]}
              <span className="text-[0.625rem] font-medium leading-none">{tab.label}</span>
            </a>
          );
        })}
      </div>

    </div>
  );
}
