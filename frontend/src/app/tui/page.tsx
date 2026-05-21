'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import TailwindLogoIcon from '@/components/icons/TailwindLogoIcon';
import AppleLogoIcon from '@/components/icons/AppleLogoIcon';
import { NAV_SECTIONS, BOTTOM_NAV_TABS } from '@/lib/nav';
import { useStoredColorMode } from '@/lib/stored-color-mode';

// ─── Data ─────────────────────────────────────────────────────────────────────

// Route data lives in src/lib/nav.ts — add/rename routes there.
const SECTION_STYLES: Record<string, { accentClass: string; bgHoverClass: string }> = {
  mui:   { accentClass: 'text-indigo-500 dark:text-indigo-400', bgHoverClass: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20' },
  tui:   { accentClass: 'text-sky-500 dark:text-sky-400',       bgHoverClass: 'hover:bg-sky-50 dark:hover:bg-sky-900/20'       },
  apple: { accentClass: 'text-blue-500 dark:text-blue-400',     bgHoverClass: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'     },
};

const navSections = NAV_SECTIONS.map((s) => ({ ...s, ...SECTION_STYLES[s.id] }));

const features = [
  {
    colorClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    title: 'Lightning Fast',
    desc: 'Server-first architecture with React Server Components. Pages load in under 100 ms right out of the box.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.718a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .945-.143Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    colorClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    title: 'Accessible by Default',
    desc: 'Every component meets WCAG 2.1 AA. Full keyboard navigation and screen-reader support included.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.491 4.491 0 0 1-3.497-1.307 4.491 4.491 0 0 1-1.307-3.497A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.491 4.491 0 0 1 1.307-3.497 4.491 4.491 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    colorClass: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
    title: 'Dark Mode Ready',
    desc: 'Built-in light and dark theme support. Switches instantly with zero flash of unstyled content.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    colorClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    title: 'TypeScript First',
    desc: 'Full type safety from prop definitions to API responses. Catch errors at compile time, not in production.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 1 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    colorClass: 'bg-sky-100 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400',
    title: 'Responsive Design',
    desc: 'Mobile-first breakpoint system. Looks great on phones, tablets, laptops, and wide-format displays.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    colorClass: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    title: 'Open Source',
    desc: 'MIT licensed, free forever. Contributions welcome. No vendor lock-in, ever.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: '10k+', label: 'Components' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<50ms', label: 'Response time' },
  { value: 'MIT', label: 'License' },
];


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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TuiPage() {
  const [mode, toggleMode] = useStoredColorMode();
  const isDark = mode === 'dark';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    return () => { document.documentElement.classList.remove('dark'); };
  }, [isDark]);

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

              {/* Centre — section dropdowns (desktop only) */}
              <nav className="hidden md:flex items-center gap-1">
                {navSections.map((section) => (
                  <div key={section.id} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                      aria-expanded={openSection === section.id}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 px-3 py-1.5 text-[0.9375rem] font-medium rounded-md transition-colors ${
                        openSection === section.id
                          ? `${section.accentClass} bg-slate-100 dark:bg-slate-800`
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {section.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className={`size-3.5 transition-transform duration-200 ${openSection === section.id ? 'rotate-180' : ''}`}
                      >
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
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
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3 text-slate-400">
                            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                          </svg>
                          <span className="text-[0.8125rem] text-slate-400 italic">More pages coming soon</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right — theme toggle + mobile hamburger */}
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="flex size-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </button>

                {/* Hamburger — mobile only */}
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
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="relative flex h-full w-72 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-2xl">
              <div className="flex h-[60px] flex-shrink-0 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-md bg-sky-500">
                    <TailwindLogoIcon sx={{ fontSize: 14, color: 'white' }} />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">Tailwind UI</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <XMenuIcon />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-3">
                {navSections.map((section, idx) => (
                  <div key={section.id}>
                    <p className={`px-4 pb-1.5 text-[0.6875rem] font-bold uppercase tracking-widest ${section.accentClass} ${idx === 0 ? 'pt-2' : 'pt-4'}`}>
                      {section.heading}
                    </p>
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex mx-2 flex-col rounded-xl px-3 py-2.5 mb-0.5 transition-colors ${section.bgHoverClass} text-slate-700 dark:text-slate-200`}
                      >
                        <span className="text-[0.9375rem] font-medium">{item.label}</span>
                        <span className="text-[0.8125rem] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{item.desc}</span>
                      </Link>
                    ))}
                    {idx < navSections.length - 1 && (
                      <div className="h-px bg-slate-100 dark:bg-slate-800 mx-3 my-2" />
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-1.5 px-4 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3 text-slate-400">
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                  </svg>
                  <span className="text-[0.8125rem] text-slate-400 italic">More pages coming soon</span>
                </div>
              </nav>

              <div className="border-t border-slate-200 dark:border-slate-700 p-4">
                <button
                  onClick={() => { toggleMode(); setDrawerOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                  {isDark ? 'Light mode' : 'Dark mode'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Click-outside overlay for dropdown menus ── */}
        {openSection && (
          <div className="fixed inset-0 z-40" onClick={() => setOpenSection(null)} />
        )}

        {/* ── Scrollable content ── */}
        <main className="flex-1 overflow-y-auto">

        {/* ── Hero ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-sky-50 to-slate-50 dark:from-sky-950 dark:via-slate-900 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 min-h-[calc(100dvh-60px-56px)] md:min-h-[calc(100dvh-60px)] flex flex-col items-center justify-center px-4 text-center">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-32 -right-32 size-[480px] rounded-full bg-sky-500/5" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-cyan-500/5" />

          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-700 bg-sky-50 dark:bg-sky-950 px-4 py-1.5 text-[0.8125rem] font-semibold text-sky-600 dark:text-sky-400">
              <span className="size-1.5 rounded-full bg-sky-500 animate-pulse" />
              New · Now in v2.0 — built with Tailwind v4
            </div>

            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-[-0.04em] leading-none text-slate-900 dark:text-white mb-4">
              Ship your next<br />
              <span className="text-sky-500">project faster.</span>
            </h1>

            <p className="mx-auto max-w-xl text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-slate-600 dark:text-slate-400 mb-7">
              Tailwind UI gives you the UI components, design tokens, and developer experience to build
              exceptional web applications — all with Tailwind&apos;s atomic utility approach.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-sky-400 transition-colors"
              >
                Get started for free
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent px-6 py-3 text-base font-semibold text-slate-700 dark:text-slate-300 hover:border-sky-400 dark:hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                View docs →
              </a>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-4xl font-extrabold tracking-tight text-sky-500 leading-none mb-1">
                    {s.value}
                  </dt>
                  <dd className="text-[0.9375rem] font-medium text-slate-500 dark:text-slate-400">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Features ── */}
        <div id="features" className="bg-slate-50 dark:bg-slate-900 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-sky-500 mb-3">
              Everything you need
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Built for the modern web
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Everything you need to build production-quality applications. No compromises.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-7 shadow-sm dark:shadow-none transition-shadow hover:shadow-md dark:hover:border-slate-600"
              >
                <div className={`mb-5 inline-flex size-11 items-center justify-center rounded-xl ${f.colorClass}`}>
                  {f.svg}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="bg-gradient-to-br from-sky-500 to-cyan-600 py-24 sm:py-32 text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5">
              Ready to dive in?
            </h2>
            <p className="text-lg leading-relaxed text-sky-100 mb-10 max-w-md mx-auto">
              Start building with Tailwind UI today. Free plan available — no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-sky-600 shadow-sm hover:bg-sky-50 transition-colors"
              >
                Get started for free
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-lg border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Brand */}
              <div className="flex items-center gap-2">
                <div className="flex size-[22px] items-center justify-center rounded-md bg-sky-500">
                  <TailwindLogoIcon sx={{ fontSize: 12, color: 'white' }} />
                </div>
                <span className="text-[0.9375rem] font-semibold text-slate-900 dark:text-slate-100">
                  Tailwind UI
                </span>
              </div>

              <p className="text-center text-[0.75rem] text-slate-500 dark:text-slate-400 sm:flex-1">
                © 2019 - 2026 In House Cloud Solutions. All rights reserved.
              </p>

              <span className="inline-flex rounded border border-slate-200 px-2.5 py-1 font-mono text-[0.8125rem] text-slate-600 dark:border-slate-700 dark:text-slate-400">
                /tui route
              </span>
            </div>
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
