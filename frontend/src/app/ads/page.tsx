'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Slide types ──────────────────────────────────────────────────────────────

interface ImageSlide {
  type: 'image';
  src: string;
  alt?: string;
  /** Milliseconds to display this slide before auto-advancing */
  durationMs: number;
}

interface VideoSlide {
  type: 'video';
  src: string;
  /** Optional poster frame shown while the video loads */
  poster?: string;
}

type Slide = ImageSlide | VideoSlide;

// ─── Full asset pools ─────────────────────────────────────────────────────────
// All available images and videos.  The active playlist is built at runtime by
// picking IMAGE_PICK_COUNT random images + all videos (see buildPlaylist below).

const IMAGE_PICK_COUNT = 23;

const ALL_IMAGES: ImageSlide[] = [
  { type: 'image', src: '/ads/background.jpg',       alt: 'Welcome',          durationMs: 6000 },
  { type: 'image', src: '/ads/Arcade-03.jpg',         alt: 'Arcade 3',         durationMs: 6000 },
  { type: 'image', src: '/ads/Arcade-04.jpg',         alt: 'Arcade 4',         durationMs: 6000 },
  { type: 'image', src: '/ads/Arcade-05.jpg',         alt: 'Arcade 5',         durationMs: 6000 },
  { type: 'image', src: '/ads/Arcade-06.jpg',         alt: 'Arcade 6',         durationMs: 6000 },
  { type: 'image', src: '/ads/Arcade-07.jpg',         alt: 'Arcade 7',         durationMs: 6000 },
  { type: 'image', src: '/ads/Board-Games-02.jpg',    alt: 'Board Games 2',    durationMs: 6000 },
  { type: 'image', src: '/ads/Board-Games-03.jpg',    alt: 'Board Games 3',    durationMs: 6000 },
  { type: 'image', src: '/ads/Board-Games-05.jpg',    alt: 'Board Games 5',    durationMs: 6000 },
  { type: 'image', src: '/ads/Board-Games-07.jpg',    alt: 'Board Games 7',    durationMs: 6000 },
  { type: 'image', src: '/ads/PC-02.jpg',             alt: 'PC Gaming 2',      durationMs: 6000 },
  { type: 'image', src: '/ads/PC-03.jpg',             alt: 'PC Gaming 3',      durationMs: 6000 },
  { type: 'image', src: '/ads/Stream-Room-01.jpg',    alt: 'Stream Room 1',    durationMs: 6000 },
  { type: 'image', src: '/ads/Stream-Room-02.jpg',    alt: 'Stream Room 2',    durationMs: 6000 },
  { type: 'image', src: '/ads/Stream-Room-04.jpg',    alt: 'Stream Room 4',    durationMs: 6000 },
  { type: 'image', src: '/ads/Stream-Room-06.jpg',    alt: 'Stream Room 6',    durationMs: 6000 },
  { type: 'image', src: '/ads/Stream-Room-07.jpg',    alt: 'Stream Room 7',    durationMs: 6000 },
  { type: 'image', src: '/ads/Other-05.jpg',          alt: 'More 5',           durationMs: 6000 },
  { type: 'image', src: '/ads/Other-08.jpg',          alt: 'More 8',           durationMs: 6000 },
  { type: 'image', src: '/ads/dreamhack.jpg',         alt: 'Dreamhack',        durationMs: 6000 },
  { type: 'image', src: '/ads/signup.png',            alt: 'Sign Up',          durationMs: 6000 },
  { type: 'image', src: '/ads/signout.jpg',           alt: 'Sign Out',         durationMs: 6000 },
  { type: 'image', src: '/ads/techsupport.jpg',       alt: 'Tech Support',     durationMs: 6000 },
];

const ALL_VIDEOS: VideoSlide[] = [
  { type: 'video', src: '/ads/noreset.webm', poster: '/ads/background.jpg' },
];

// ─── Playlist builder ─────────────────────────────────────────────────────────
// Fisher-Yates shuffle → take IMAGE_PICK_COUNT images → append all videos.
// Called once per page load (useState initializer) so the set is stable for the
// duration of the session but different on every refresh.

function buildPlaylist(): Slide[] {
  const pool = [...ALL_IMAGES];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return [...pool.slice(0, IMAGE_PICK_COUNT), ...ALL_VIDEOS];
}

// ─── Dot-window helper ────────────────────────────────────────────────────────
// Returns up to MAX_VISIBLE_DOTS slide indices centred on `current`.
// When the playlist is small enough, every slide gets its own dot.

const MAX_VISIBLE_DOTS = 9;

function getDotWindow(total: number, current: number): number[] {
  if (total <= MAX_VISIBLE_DOTS) {
    return Array.from({ length: total }, (_, i) => i);
  }
  const half = Math.floor(MAX_VISIBLE_DOTS / 2);
  let start = Math.max(0, current - half);
  const end   = Math.min(total - 1, start + MAX_VISIBLE_DOTS - 1);
  start = Math.max(0, end - MAX_VISIBLE_DOTS + 1);
  return Array.from({ length: MAX_VISIBLE_DOTS }, (_, i) => start + i);
}

// ─── Player ───────────────────────────────────────────────────────────────────

export default function AdsPage() {
  // Populated client-side only (buildPlaylist uses Math.random — would cause
  // server/client hydration mismatch if called during SSR).
  const [playlist, setPlaylist] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  /** Programmatic controls visibility — true shows the pause button regardless
   *  of hover/focus state.  Resets to false on every slide transition so the
   *  button hides itself automatically after the user taps or the slide changes. */
  const [showControls, setShowControls] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Track whether the slide index changed so we only reset video.currentTime on
  // a real slide transition, not when the user simply toggles pause/resume.
  const prevCurrentRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % playlist.length);
  }, [playlist.length]);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % playlist.length);
  }, [playlist.length]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // ── Populate playlist after mount (avoids SSR/client hydration mismatch) ─────
  useEffect(() => { setPlaylist(buildPlaylist()); }, []);

  // ── Image timer: skip when paused ────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const slide = playlist[current];
    if (!slide || slide.type !== 'image') return;
    const id = window.setTimeout(advance, slide.durationMs);
    return () => window.clearTimeout(id);
  }, [current, advance, isPaused, playlist]);

  // ── Video: play/pause, respecting isPaused and slide changes ─────────────────
  // Only reset currentTime when the active slide actually changed.
  useEffect(() => {
    let fallbackId: ReturnType<typeof window.setTimeout> | undefined;
    const slideChanged = prevCurrentRef.current !== current;
    prevCurrentRef.current = current;

    playlist.forEach((slide, i) => {
      if (slide.type !== 'video') return;
      const video = videoRefs.current[i];
      if (!video) return;

      if (i === current) {
        if (isPaused) {
          video.pause();
        } else {
          if (slideChanged) video.currentTime = 0;
          video.play().catch(() => {
            // Autoplay blocked — advance after a safe fallback delay.
            fallbackId = window.setTimeout(advance, 10_000);
          });
        }
      } else {
        video.pause();
      }
    });

    return () => window.clearTimeout(fallbackId);
  }, [current, advance, isPaused, playlist]);

  // ── Hide controls on slide transition ────────────────────────────────────────
  // Programmatically collapse the controls overlay whenever the active slide
  // changes, unless we're paused (in which case the button stays locked open).
  useEffect(() => {
    if (!isPaused) {
      const id = window.setTimeout(() => setShowControls(false), 0);
      return () => window.clearTimeout(id);
    }
  }, [current, isPaused]);

  // ── Auto-hide controls overlay after 3 s ─────────────────────────────────────
  // A tap on the container calls setShowControls(true) so mobile users can reach
  // the button, but we must also dismiss it automatically — otherwise one tap
  // locks the button open until the next slide transition.  The timer is
  // cancelled/re-started whenever showControls or isPaused changes.
  useEffect(() => {
    if (!showControls || isPaused) return;
    const id = window.setTimeout(() => setShowControls(false), 3000);
    return () => window.clearTimeout(id);
  }, [showControls, isPaused]);

  // ── Progress bar: reset on slide change ──────────────────────────────────────
  useEffect(() => {
    if (progressBarRef.current) progressBarRef.current.style.width = '0%';
    cancelAnimationFrame(rafRef.current);
  }, [current]);

  // ── Progress bar: RAF loop for both image and video slides ───────────────────
  // Image: time-interpolated animation.  Video: polls video.currentTime so the
  // bar always reflects real playback position without relying on onTimeUpdate
  // (which can be throttled or silenced by some browsers for off-screen media).
  useEffect(() => {
    const slide = playlist[current];
    if (!slide || isPaused) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    if (slide.type === 'image') {
      const duration = slide.durationMs;
      // Resume from wherever the bar currently sits (e.g. after a pause).
      const startPct = progressBarRef.current
        ? (parseFloat(progressBarRef.current.style.width) || 0) / 100
        : 0;
      let rafStart: number | null = null;

      const tick = (ts: number) => {
        if (rafStart === null) rafStart = ts;
        const p = Math.min(startPct + (ts - rafStart) / duration, 1);
        if (progressBarRef.current) progressBarRef.current.style.width = `${p * 100}%`;
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }

    // Video slide: poll currentTime each frame — reliable even when onTimeUpdate
    // is suppressed by the browser (e.g. hidden / cross-origin / autoplay policy).
    const video = videoRefs.current[current];
    const tick = () => {
      if (video && video.duration && progressBarRef.current) {
        progressBarRef.current.style.width =
          `${(video.currentTime / video.duration) * 100}%`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, isPaused]);

  // ── Swipe / tap handlers ─────────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    // Reveal controls on any touch so mobile users can reach the pause button.
    setShowControls(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return; // too short — treat as tap, not swipe
    if (dx < 0) goNext(); else goPrev();
  };

  return (
    // `group` enables group-hover on children.  tabIndex keeps the container
    // keyboard-focusable for accessibility (arrow-key nav, etc.) but visibility
    // of the pause button is now driven by `showControls` state, not CSS
    // focus-within, so we never need to blur children to hide the button.
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden"
      role="region"
      aria-label="Advertisement display"
      tabIndex={0}
      onMouseMove={() => setShowControls(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Top scrim — darkens the header strip so the bar is readable on
           light slide content (same approach as the bottom scrim for dots). */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-20" />

      {/* ── Top progress bar ─────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/25">
        <div ref={progressBarRef} className="h-full bg-white" style={{ width: '0%' }} />
      </div>

      {/* ── Slides ─────────────────────────────────────────────────────────── */}
      {playlist.map((slide, i) => {
        const active = i === current;

        return (
          <div
            key={i}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              active ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {slide.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slide.src}
                alt={slide.alt ?? ''}
                className="size-full object-cover"
                draggable={false}
              />
            ) : (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={slide.src}
                poster={slide.poster}
                muted
                playsInline
                preload="auto"
                onEnded={active && !isPaused ? advance : undefined}
                className="size-full object-cover"
              />
            )}
          </div>
        );
      })}

      {/* ── Pause / Play button ──────────────────────────────────────────────
          Visible when: paused (locked open) · showControls is true (tap/programmatic)
          · parent is hovered (CSS group-hover).
          Hides automatically on slide change via the showControls useEffect. */}
      <button
        onClick={() => {
          // When resuming (was paused → now playing), collapse the controls
          // overlay immediately instead of waiting for the next slide change.
          if (isPaused) setShowControls(false);
          setIsPaused((p) => !p);
        }}
        aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
        className={[
          'absolute top-4 right-4 z-20',
          'flex items-center justify-center w-11 h-11 rounded-full',
          'bg-black/60 text-white backdrop-blur-sm',
          'transition-opacity duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
          // State-driven visibility — no DOM focus tricks needed.
          isPaused || showControls ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        {isPaused ? (
          // Play triangle
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          // Pause bars
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </button>

      {/* ── Bottom scrim — darkens the footer strip so dots are readable on
           light slide content without adding visible chrome to dark slides. */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />

      {/* ── Dot indicators ─────────────────────────────────────────────────── */}
      {/* Windowed: shows at most MAX_VISIBLE_DOTS dots centred on the active
          slide so the row never overflows regardless of playlist length.
          Edge dots are dimmed when more slides exist beyond the window. */}
      <nav
        aria-label="Slide navigation"
        className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2.5">
          {getDotWindow(playlist.length, current).map((slideIndex, dotPos, arr) => {
            const isActive   = slideIndex === current;
            const isLeftEdge  = dotPos === 0 && slideIndex > 0;
            const isRightEdge = dotPos === arr.length - 1 && slideIndex < playlist.length - 1;
            const isEdgeFade  = isLeftEdge || isRightEdge;
            return (
              <button
                key={slideIndex}
                onClick={() => goTo(slideIndex)}
                aria-label={`Slide ${slideIndex + 1} of ${playlist.length}`}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'rounded-full transition-all duration-300',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
                  'focus-visible:ring-offset-1 focus-visible:ring-offset-black/50',
                  isActive
                    ? 'h-1.5 w-5 bg-white shadow-sm'
                    : isEdgeFade
                      ? 'h-1.5 w-1.5 bg-white/35 hover:bg-white/60'
                      : 'h-1.5 w-1.5 bg-white/60 hover:bg-white/85',
                ].join(' ')}
              />
            );
          })}
        </div>

        {/* Compact slide counter — always visible so the total is never ambiguous */}
        <span className="text-white/60 text-xs tabular-nums select-none">
          {current + 1} / {playlist.length}
        </span>
      </nav>
    </div>
  );
}
