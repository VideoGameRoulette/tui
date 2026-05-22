'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ReplayIcon from '@mui/icons-material/Replay';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { SlideCanvas, SlideThumbnail } from './SlideCanvas';
import { SlidePanel } from './SlidePanel';
import { SettingsPanel } from './SettingsPanel';
import { PresentationPreview } from './PresentationPreview';
import { createDefaultSlide, createDefaultTextElement } from './helpers';
import type { AdSlide, AdTextElement } from './types';

// ── Helpers ───────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 10);

const STORAGE_KEY = 'ads-builder-v1';

function loadSaved(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function deepCopySlides(slides: AdSlide[]): AdSlide[] {
  return slides.map((s) => ({
    ...s,
    textElements: s.textElements.map((t) => ({ ...t })),
  }));
}

type MobileTab = 0 | 1 | 2; // 0=slides, 1=canvas, 2=settings

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdBuilderPage() {
  // ── State — initialized from localStorage ──────────────────────────────────
  const [slides, setSlides] = useState<AdSlide[]>(() => {
    const saved = loadSaved();
    const s = saved?.slides;
    return Array.isArray(s) && s.length > 0 ? (s as AdSlide[]) : [createDefaultSlide()];
  });

  const [activeSlideId, setActiveSlideId] = useState<string>(() => {
    const saved = loadSaved();
    const id = saved?.activeSlideId as string | undefined;
    return id && slides.some((s) => s.id === id) ? id : slides[0].id;
  });

  const [presentationName, setPresentationName] = useState<string>(() => {
    const saved = loadSaved();
    return (saved?.presentationName as string) ?? 'Untitled Presentation';
  });

  const [editingName, setEditingName] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>(1);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [showPresentation, setShowPresentation] = useState(false);
  const [presentationStart, setPresentationStart] = useState(0);
  const [presentationOpenKey, setPresentationOpenKey] = useState(0);

  // ── Undo / Redo ────────────────────────────────────────────────────────────
  const slidesRef = useRef<AdSlide[]>(slides);
  useEffect(() => { slidesRef.current = slides; }, [slides]);

  const undoStack = useRef<AdSlide[][]>([]);
  const redoStack = useRef<AdSlide[][]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const pushUndo = useCallback(() => {
    const snapshot = deepCopySlides(slidesRef.current);
    undoStack.current = [...undoStack.current.slice(-49), snapshot];
    redoStack.current = [];
    setCanUndo(true);
    setCanRedo(false);
  }, []);

  const undo = useCallback(() => {
    const prev = undoStack.current.pop();
    if (!prev) return;
    redoStack.current = [...redoStack.current, deepCopySlides(slidesRef.current)];
    setSlides(prev);
    setCanUndo(undoStack.current.length > 0);
    setCanRedo(true);
  }, []);

  const redo = useCallback(() => {
    const next = redoStack.current.pop();
    if (!next) return;
    undoStack.current = [...undoStack.current, deepCopySlides(slidesRef.current)];
    setSlides(next);
    setCanUndo(true);
    setCanRedo(redoStack.current.length > 0);
  }, []);

  // Keyboard undo/redo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  // ── Persist to localStorage ────────────────────────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ slides, activeSlideId, presentationName }));
    } catch {
      // Quota exceeded (large images) — silently ignore
    }
  }, [slides, activeSlideId, presentationName]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const activeSlide = slides.find((s) => s.id === activeSlideId) ?? slides[0];
  const activeSlideIndex = slides.findIndex((s) => s.id === activeSlideId);
  const totalDurationMs = slides.reduce((sum, s) => sum + s.durationMs, 0);
  const totalDurationLabel = totalDurationMs >= 60000
    ? `${Math.floor(totalDurationMs / 60000)}m ${Math.round((totalDurationMs % 60000) / 1000)}s`
    : `${(totalDurationMs / 1000).toFixed(0)}s`;

  // ── Slide mutations ────────────────────────────────────────────────────────
  const updateActiveSlide = useCallback((partial: Partial<AdSlide>) => {
    setSlides((prev) => prev.map((s) => (s.id === activeSlideId ? { ...s, ...partial } : s)));
  }, [activeSlideId]);

  const addSlide = useCallback(() => {
    pushUndo();
    const s = createDefaultSlide();
    setSlides((prev) => [...prev, s]);
    setActiveSlideId(s.id);
    setSelectedTextId(null);
  }, [pushUndo]);

  const duplicateSlide = useCallback((id: string) => {
    pushUndo();
    setSlides((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const orig = prev[idx];
      const copy: AdSlide = {
        ...orig,
        id: uid(),
        textElements: orig.textElements.map((t) => ({ ...t, id: uid() })),
      };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      setActiveSlideId(copy.id);
      return next;
    });
  }, [pushUndo]);

  const removeSlide = useCallback((id: string) => {
    pushUndo();
    setSlides((prev) => {
      if (prev.length === 1) {
        const fresh = createDefaultSlide();
        setActiveSlideId(fresh.id);
        return [fresh];
      }
      const next = prev.filter((s) => s.id !== id);
      if (id === activeSlideId) {
        const idx = prev.findIndex((s) => s.id === id);
        setActiveSlideId(next[Math.max(0, idx - 1)].id);
      }
      return next;
    });
    setSelectedTextId(null);
  }, [activeSlideId, pushUndo]);

  const moveSlide = useCallback((id: string, dir: 'up' | 'down') => {
    pushUndo();
    setSlides((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      const newIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  }, [pushUndo]);

  // ── Text element mutations ─────────────────────────────────────────────────
  const addTextElement = useCallback(() => {
    pushUndo();
    const el = createDefaultTextElement();
    setSlides((prev) =>
      prev.map((s) =>
        s.id === activeSlideId ? { ...s, textElements: [...s.textElements, el] } : s
      )
    );
    setSelectedTextId(el.id);
    setMobileTab(2);
  }, [activeSlideId, pushUndo]);

  const updateTextElement = useCallback((textId: string, partial: Partial<AdTextElement>) => {
    setSlides((prev) =>
      prev.map((s) => {
        if (s.id !== activeSlideId) return s;
        return {
          ...s,
          textElements: s.textElements.map((t) => (t.id === textId ? { ...t, ...partial } : t)),
        };
      })
    );
  }, [activeSlideId]);

  const removeTextElement = useCallback((textId: string) => {
    pushUndo();
    setSlides((prev) =>
      prev.map((s) => {
        if (s.id !== activeSlideId) return s;
        return { ...s, textElements: s.textElements.filter((t) => t.id !== textId) };
      })
    );
    setSelectedTextId((prev) => (prev === textId ? null : prev));
  }, [activeSlideId, pushUndo]);

  const moveTextElement = useCallback((textId: string, dir: 'up' | 'down') => {
    pushUndo();
    setSlides((prev) =>
      prev.map((s) => {
        if (s.id !== activeSlideId) return s;
        const arr = [...s.textElements];
        const idx = arr.findIndex((t) => t.id === textId);
        const newIdx = dir === 'up' ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= arr.length) return s;
        [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
        return { ...s, textElements: arr };
      })
    );
  }, [activeSlideId, pushUndo]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const replayAnimations = () => setAnimKey((k) => k + 1);

  const openPresentation = (fromSlideId?: string) => {
    const idx = fromSlideId ? slides.findIndex((s) => s.id === fromSlideId) : activeSlideIndex;
    setPresentationStart(Math.max(0, idx));
    setPresentationOpenKey((k) => k + 1);
    setShowPresentation(true);
  };

  const exportJSON = () => {
    const data = JSON.stringify({ name: presentationName, slides }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${presentationName.replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'presentation'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectSlide = (id: string) => {
    setActiveSlideId(id);
    setSelectedTextId(null);
    setMobileTab(1);
  };

  // ── Shared panel props ─────────────────────────────────────────────────────
  const slidePanelProps = {
    slides,
    activeSlideId: activeSlide.id,
    onSelectSlide: handleSelectSlide,
    onAddSlide: addSlide,
    onDuplicateSlide: duplicateSlide,
    onRemoveSlide: removeSlide,
    onMoveSlide: moveSlide,
    onPreviewSlide: (id: string) => openPresentation(id),
  };

  const settingsPanelProps = {
    slide: activeSlide,
    selectedTextId,
    onSelectText: setSelectedTextId,
    onUpdateSlide: updateActiveSlide,
    onAddText: addTextElement,
    onUpdateText: updateTextElement,
    onRemoveText: removeTextElement,
    onMoveText: moveTextElement,
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden', bgcolor: 'background.default' }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <Box
        component="header"
        sx={{
          flexShrink: 0,
          height: { xs: 52, md: 56 },
          display: 'flex',
          alignItems: 'center',
          px: { xs: 1, md: 2 },
          gap: { xs: 0.5, md: 1 },
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          zIndex: 10,
        }}
      >
        {/* Back button */}
        <Tooltip title="Back to Signage">
          <IconButton size="small" sx={{ color: 'text.secondary', flexShrink: 0 }} component={Link} href="/ads">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, display: { xs: 'none', sm: 'block' } }} />

        {/* Presentation name (editable) */}
        {editingName ? (
          <TextField
            value={presentationName}
            onChange={(e) => setPresentationName(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setEditingName(false); }}
            autoFocus
            size="small"
            variant="standard"
            sx={{
              minWidth: 100,
              maxWidth: { xs: 130, sm: 220 },
              '& .MuiInput-input': { fontWeight: 600, fontSize: { xs: '0.8125rem', md: '0.9375rem' } },
            }}
          />
        ) : (
          <Typography
            onClick={() => setEditingName(true)}
            title="Click to rename"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '0.8125rem', md: '0.9375rem' },
              cursor: 'text',
              px: 0.5,
              borderRadius: 0.75,
              '&:hover': { bgcolor: 'action.hover' },
              maxWidth: { xs: 120, sm: 180, md: 260 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexShrink: 1,
            }}
          >
            {presentationName}
          </Typography>
        )}

        <Box sx={{ flex: 1 }} />

        {/* Total duration + slide counter — desktop only */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, mr: 0.5 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', whiteSpace: 'nowrap' }}>
            {activeSlideIndex + 1} / {slides.length}
          </Typography>
          <Tooltip title="Total presentation duration">
            <Typography variant="caption" sx={{ color: 'text.disabled', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
              {totalDurationLabel} total
            </Typography>
          </Tooltip>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, display: { xs: 'none', md: 'block' } }} />

        {/* Undo/Redo — desktop only */}
        <Tooltip title="Undo (Ctrl+Z)">
          <span>
            <IconButton size="small" onClick={undo} disabled={!canUndo} sx={{ display: { xs: 'none', md: 'flex' }, color: 'text.secondary' }}>
              <UndoIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Redo (Ctrl+Y)">
          <span>
            <IconButton size="small" onClick={redo} disabled={!canRedo} sx={{ display: { xs: 'none', md: 'flex' }, color: 'text.secondary' }}>
              <RedoIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, display: { xs: 'none', md: 'block' } }} />

        {/* Replay — desktop only */}
        <Tooltip title="Replay animations">
          <IconButton
            size="small"
            onClick={replayAnimations}
            sx={{ color: 'text.secondary', display: { xs: 'none', md: 'flex' } }}
          >
            <ReplayIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Export JSON — sm+ */}
        <Tooltip title="Export as JSON">
          <IconButton
            size="small"
            onClick={exportJSON}
            sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'flex' } }}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Preview Slide — button on sm+, icon on xs */}
        <Button
          variant="outlined"
          size="small"
          startIcon={<PlayArrowIcon />}
          onClick={() => openPresentation(activeSlide?.id)}
          sx={{ textTransform: 'none', display: { xs: 'none', sm: 'inline-flex' }, flexShrink: 0 }}
        >
          Preview Slide
        </Button>
        <Tooltip title="Preview slide">
          <IconButton
            size="small"
            onClick={() => openPresentation(activeSlide?.id)}
            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'text.secondary' }}
          >
            <PlayArrowIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Preview All — button on sm+, icon on xs */}
        <Button
          variant="contained"
          size="small"
          startIcon={<SlideshowIcon />}
          onClick={() => openPresentation()}
          sx={{ textTransform: 'none', display: { xs: 'none', sm: 'inline-flex' }, flexShrink: 0 }}
        >
          Preview All
        </Button>
        <Tooltip title="Preview all slides">
          <IconButton
            size="small"
            onClick={() => openPresentation()}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 1,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <SlideshowIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>

        {/* ── Desktop three-column layout (≥ md) ── */}

        {/* Left: Slide panel */}
        <Box
          sx={{
            width: 220,
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            overflow: 'hidden',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
          }}
        >
          <SlidePanel {...slidePanelProps} />
        </Box>

        {/* Center: Canvas */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#111827',
            p: 3,
            gap: 2,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '100%', maxHeight: 'calc(100% - 40px)' }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1920/1080',
                maxHeight: 'calc(100vh - 56px - 80px)',
                mx: 'auto',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <SlideCanvas
                slide={activeSlide}
                animKey={animKey}
                selectedTextId={selectedTextId}
                onSelectText={setSelectedTextId}
              />
            </Box>
          </Box>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
            Click text elements to select · Click canvas to deselect ·{' '}
            <Box
              component="span"
              onClick={replayAnimations}
              sx={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer', '&:hover': { color: 'white' } }}
            >
              replay animations
            </Box>
          </Typography>
        </Box>

        {/* Right: Settings */}
        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            borderLeft: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            overflow: 'hidden',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
          }}
        >
          <SettingsPanel {...settingsPanelProps} />
        </Box>

        {/* ── Mobile single-panel view (< md) ── */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flex: 1,
            minWidth: 0,
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {mobileTab === 0 && (
            <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <SlidePanel {...slidePanelProps} />
            </Box>
          )}

          {mobileTab === 1 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#111827', overflow: 'hidden' }}>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 1.5, sm: 2 },
                  gap: 1,
                  overflow: 'hidden',
                }}
              >
                {/* Mini toolbar */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0, width: '100%', justifyContent: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Slide {activeSlideIndex + 1} / {slides.length} · {totalDurationLabel}
                  </Typography>
                  <Tooltip title="Replay animations">
                    <IconButton
                      size="small"
                      onClick={replayAnimations}
                      sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: 'white' }, p: 0.5 }}
                    >
                      <ReplayIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Export JSON">
                    <IconButton
                      size="small"
                      onClick={exportJSON}
                      sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: 'white' }, p: 0.5 }}
                    >
                      <DownloadIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Canvas */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1920/1080',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                    borderRadius: 1,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <SlideCanvas
                    slide={activeSlide}
                    animKey={animKey}
                    selectedTextId={selectedTextId}
                    onSelectText={(id) => {
                      setSelectedTextId(id);
                      if (id) setMobileTab(2);
                    }}
                  />
                </Box>

                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)', textAlign: 'center', flexShrink: 0 }}>
                  Tap text elements to select &amp; edit
                </Typography>
              </Box>

              {/* Horizontal slide strip */}
              <Box
                sx={{
                  flexShrink: 0,
                  overflowX: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  bgcolor: 'rgba(0,0,0,0.35)',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {slides.map((slide, idx) => {
                  const isThisActive = slide.id === activeSlideId;
                  return (
                    <Box
                      key={slide.id}
                      onClick={() => { setActiveSlideId(slide.id); setSelectedTextId(null); }}
                      sx={{
                        flexShrink: 0,
                        width: 80,
                        borderRadius: 1,
                        border: '2px solid',
                        borderColor: isThisActive ? 'primary.main' : 'rgba(255,255,255,0.15)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s',
                      }}
                    >
                      <SlideThumbnail slide={slide} />
                      <Box sx={{ textAlign: 'center', py: 0.25 }}>
                        <Typography variant="caption" sx={{ fontSize: 10, color: isThisActive ? 'primary.light' : 'rgba(255,255,255,0.35)', fontWeight: isThisActive ? 700 : 400 }}>
                          {idx + 1}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
                <Tooltip title="Add slide">
                  <Box
                    onClick={addSlide}
                    sx={{
                      flexShrink: 0,
                      width: 52,
                      height: 42,
                      borderRadius: 1,
                      border: '2px dashed rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.3)',
                      '&:hover': { borderColor: 'rgba(255,255,255,0.5)', color: 'rgba(255,255,255,0.7)' },
                    }}
                  >
                    <AddIcon sx={{ fontSize: 18 }} />
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          )}

          {mobileTab === 2 && (
            <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <SettingsPanel {...settingsPanelProps} />
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Mobile bottom tab bar (< md) ──────────────────────────────────────── */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexShrink: 0,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Tabs
          value={mobileTab}
          onChange={(_, v) => setMobileTab(v as MobileTab)}
          variant="fullWidth"
          sx={{
            width: '100%',
            minHeight: 52,
            '& .MuiTab-root': { minHeight: 52, py: 0.75 },
          }}
        >
          <Tab
            icon={<LayersIcon sx={{ fontSize: 18 }} />}
            label="Slides"
            iconPosition="start"
            sx={{ gap: 0.75, fontSize: '0.75rem', textTransform: 'none' }}
          />
          <Tab
            icon={<CropOriginalIcon sx={{ fontSize: 18 }} />}
            label="Canvas"
            iconPosition="start"
            sx={{ gap: 0.75, fontSize: '0.75rem', textTransform: 'none' }}
          />
          <Tab
            icon={<SettingsIcon sx={{ fontSize: 18 }} />}
            label="Settings"
            iconPosition="start"
            sx={{ gap: 0.75, fontSize: '0.75rem', textTransform: 'none' }}
          />
        </Tabs>
      </Box>

      {/* ── Presentation preview ───────────────────────────────────────────────── */}
      <PresentationPreview
        open={showPresentation}
        onClose={() => setShowPresentation(false)}
        slides={slides}
        startIndex={presentationStart}
        openKey={presentationOpenKey}
      />
    </Box>
  );
}
