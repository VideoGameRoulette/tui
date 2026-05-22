'use client';

import { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { AdSlide, AdTextElement, ObjectFitType, AnimationType, EasingType, FontWeight, TextAlign, TransitionType } from './types';

// ── Constants ──────────────────────────────────────────────────────────────────

const FONT_FAMILIES = [
  { label: 'System UI (default)',  value: 'system-ui, sans-serif' },
  { label: 'Arial',                value: '"Arial", sans-serif' },
  { label: 'Helvetica',            value: '"Helvetica Neue", Helvetica, sans-serif' },
  { label: 'Georgia',              value: '"Georgia", serif' },
  { label: 'Times New Roman',      value: '"Times New Roman", serif' },
  { label: 'Trebuchet MS',         value: '"Trebuchet MS", sans-serif' },
  { label: 'Verdana',              value: '"Verdana", sans-serif' },
  { label: 'Courier New',          value: '"Courier New", monospace' },
  { label: 'Impact',               value: '"Impact", "Haettenschweiler", sans-serif' },
];

// ── Section wrapper ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary', fontWeight: 700, letterSpacing: '0.1em', mb: 1.5 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {children}
      </Box>
    </Box>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.25 }}>
      {children}
    </Typography>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface Props {
  slide: AdSlide;
  selectedTextId: string | null;
  onSelectText: (id: string | null) => void;
  onUpdateSlide: (partial: Partial<AdSlide>) => void;
  onAddText: () => void;
  onUpdateText: (id: string, partial: Partial<AdTextElement>) => void;
  onRemoveText: (id: string) => void;
  onMoveText: (id: string, dir: 'up' | 'down') => void;
}

export function SettingsPanel({
  slide,
  selectedTextId,
  onSelectText,
  onUpdateSlide,
  onAddText,
  onUpdateText,
  onRemoveText,
  onMoveText,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedText = slide.textElements.find((t) => t.id === selectedTextId) ?? null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onUpdateSlide({ backgroundImage: ev.target?.result as string, backgroundImageName: file.name });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <Box sx={{ p: 2, overflowY: 'auto', height: '100%', boxSizing: 'border-box' }}>

      {/* ── Background ─────────────────────────────────────────────────────── */}
      <Section title="Background">

        {/* Image upload */}
        <Box>
          <FieldLabel>Image</FieldLabel>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          {slide.backgroundImage ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                sx={{
                  width: '100%',
                  height: 72,
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'relative',
                  bgcolor: slide.backgroundColor,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.backgroundImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" startIcon={<FileUploadIcon />} onClick={() => fileRef.current?.click()} variant="outlined" sx={{ flex: 1 }}>
                  Change
                </Button>
                <Tooltip title="Remove image">
                  <IconButton size="small" color="error" onClick={() => onUpdateSlide({ backgroundImage: null, backgroundImageName: null })}>
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              {slide.backgroundImageName && (
                <Typography variant="caption" sx={{ color: 'text.disabled', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {slide.backgroundImageName}
                </Typography>
              )}
            </Box>
          ) : (
            <Button variant="outlined" size="small" fullWidth startIcon={<FileUploadIcon />} onClick={() => fileRef.current?.click()}>
              Upload Image
            </Button>
          )}
        </Box>

        {/* Object fit */}
        <FormControl size="small" fullWidth>
          <InputLabel>Object Fit</InputLabel>
          <Select
            value={slide.objectFit}
            label="Object Fit"
            onChange={(e) => onUpdateSlide({ objectFit: e.target.value as ObjectFitType })}
          >
            <MenuItem value="cover">Cover (fill, crop)</MenuItem>
            <MenuItem value="contain">Contain (letterbox)</MenuItem>
            <MenuItem value="fill">Fill (stretch)</MenuItem>
            <MenuItem value="none">None (natural size)</MenuItem>
            <MenuItem value="scale-down">Scale Down</MenuItem>
          </Select>
        </FormControl>

        {/* Offsets */}
        <Box>
          <FieldLabel>Position X — {slide.offsetX}%</FieldLabel>
          <Slider value={slide.offsetX} onChange={(_, v) => onUpdateSlide({ offsetX: v as number })} min={0} max={100} step={1} size="small" />
        </Box>
        <Box>
          <FieldLabel>Position Y — {slide.offsetY}%</FieldLabel>
          <Slider value={slide.offsetY} onChange={(_, v) => onUpdateSlide({ offsetY: v as number })} min={0} max={100} step={1} size="small" />
        </Box>

        {/* BG color */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FieldLabel>Background Color</FieldLabel>
          <input
            type="color"
            value={slide.backgroundColor}
            onChange={(e) => onUpdateSlide({ backgroundColor: e.target.value })}
            style={{ width: 36, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 2, background: 'none' }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{slide.backgroundColor}</Typography>
        </Box>
      </Section>

      <Divider sx={{ mb: 3 }} />

      {/* ── Color Overlay ──────────────────────────────────────────────────── */}
      <Section title="Color Overlay">
        <Box>
          <FieldLabel>Opacity — {Math.round((slide.overlayOpacity ?? 0) * 100)}%</FieldLabel>
          <Slider
            value={slide.overlayOpacity ?? 0}
            onChange={(_, v) => onUpdateSlide({ overlayOpacity: v as number })}
            min={0} max={1} step={0.01}
            size="small"
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
          />
        </Box>
        {(slide.overlayOpacity ?? 0) > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <FieldLabel>Overlay Color</FieldLabel>
            <input
              type="color"
              value={slide.overlayColor ?? '#000000'}
              onChange={(e) => onUpdateSlide({ overlayColor: e.target.value })}
              style={{ width: 36, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 2, background: 'none' }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{slide.overlayColor ?? '#000000'}</Typography>
          </Box>
        )}
      </Section>

      <Divider sx={{ mb: 3 }} />

      {/* ── Timing ─────────────────────────────────────────────────────────── */}
      <Section title="Timing">
        <Box>
          <FieldLabel>Slide Duration — {(slide.durationMs / 1000).toFixed(1)}s</FieldLabel>
          <Slider
            value={slide.durationMs}
            onChange={(_, v) => onUpdateSlide({ durationMs: v as number })}
            min={1000} max={30000} step={500}
            size="small"
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${(v / 1000).toFixed(1)}s`}
          />
        </Box>
      </Section>

      <Divider sx={{ mb: 3 }} />

      {/* ── Transition ─────────────────────────────────────────────────────── */}
      <Section title="Slide Transition">
        <FormControl size="small" fullWidth>
          <InputLabel>Transition Type</InputLabel>
          <Select
            value={slide.transition ?? 'fade'}
            label="Transition Type"
            onChange={(e) => onUpdateSlide({ transition: e.target.value as TransitionType })}
          >
            <MenuItem value="none">None (instant)</MenuItem>
            <MenuItem value="fade">Fade</MenuItem>
            <MenuItem value="slideLeft">Slide Left</MenuItem>
            <MenuItem value="slideRight">Slide Right</MenuItem>
            <MenuItem value="slideUp">Slide Up</MenuItem>
            <MenuItem value="slideDown">Slide Down</MenuItem>
            <MenuItem value="zoom">Zoom</MenuItem>
          </Select>
        </FormControl>

        {slide.transition !== 'none' && (
          <Box>
            <FieldLabel>Transition Duration — {((slide.transitionDuration ?? 600) / 1000).toFixed(1)}s</FieldLabel>
            <Slider
              value={slide.transitionDuration ?? 600}
              onChange={(_, v) => onUpdateSlide({ transitionDuration: v as number })}
              min={100} max={2000} step={50}
              size="small"
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${(v / 1000).toFixed(1)}s`}
            />
          </Box>
        )}
      </Section>

      <Divider sx={{ mb: 3 }} />

      {/* ── Text Elements list ──────────────────────────────────────────────── */}
      <Section title="Text Elements">
        <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={onAddText} fullWidth>
          Add Text Element
        </Button>

        {slide.textElements.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <TextFieldsIcon sx={{ fontSize: 32, color: 'text.disabled', mb: 0.5 }} />
            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
              No text elements yet
            </Typography>
          </Box>
        )}

        {slide.textElements.map((el, idx) => {
          const isSelected = selectedTextId === el.id;
          return (
            <Box
              key={el.id}
              onClick={() => onSelectText(isSelected ? null : el.id)}
              sx={{
                border: '1px solid',
                borderColor: isSelected ? 'primary.main' : 'divider',
                borderRadius: 1.5,
                px: 1.5,
                py: 1,
                cursor: 'pointer',
                bgcolor: isSelected ? 'action.selected' : 'transparent',
                '&:hover': { borderColor: isSelected ? 'primary.main' : 'primary.light' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: el.color, flexShrink: 0, border: '1px solid', borderColor: 'divider' }} />
              <Typography
                variant="caption"
                sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: isSelected ? 600 : 400 }}
              >
                {el.text.split('\n')[0] || '(empty)'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.25 }} onClick={(e) => e.stopPropagation()}>
                <Tooltip title="Move up">
                  <span>
                    <IconButton size="small" disabled={idx === 0} onClick={() => onMoveText(el.id, 'up')}>
                      <KeyboardArrowUpIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Move down">
                  <span>
                    <IconButton size="small" disabled={idx === slide.textElements.length - 1} onClick={() => onMoveText(el.id, 'down')}>
                      <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error" onClick={() => onRemoveText(el.id)}>
                    <DeleteOutlinedIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          );
        })}
      </Section>

      {/* ── Text Element Editor ─────────────────────────────────────────────── */}
      {selectedText && (
        <>
          <Divider sx={{ mb: 3 }} />
          <TextElementEditor
            el={selectedText}
            onChange={(partial) => onUpdateText(selectedText.id, partial)}
          />
        </>
      )}
    </Box>
  );
}

// ── Text element editor ───────────────────────────────────────────────────────

function TextElementEditor({ el, onChange }: { el: AdTextElement; onChange: (p: Partial<AdTextElement>) => void }) {
  return (
    <Section title="Text Settings">
      {/* Text content */}
      <TextField
        label="Text Content"
        value={el.text}
        onChange={(e) => onChange({ text: e.target.value })}
        multiline
        minRows={2}
        maxRows={5}
        size="small"
        fullWidth
      />

      {/* Font family */}
      <FormControl size="small" fullWidth>
        <InputLabel>Font Family</InputLabel>
        <Select
          value={el.fontFamily ?? 'system-ui, sans-serif'}
          label="Font Family"
          onChange={(e) => onChange({ fontFamily: e.target.value })}
        >
          {FONT_FAMILIES.map((f) => (
            <MenuItem key={f.value} value={f.value} style={{ fontFamily: f.value }}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Position */}
      <Box>
        <FieldLabel>Position X — {el.x.toFixed(0)}%</FieldLabel>
        <Slider value={el.x} onChange={(_, v) => onChange({ x: v as number })} min={0} max={100} step={1} size="small" />
      </Box>
      <Box>
        <FieldLabel>Position Y — {el.y.toFixed(0)}%</FieldLabel>
        <Slider value={el.y} onChange={(_, v) => onChange({ y: v as number })} min={0} max={100} step={1} size="small" />
      </Box>

      {/* Font size */}
      <Box>
        <FieldLabel>Font Size — {el.fontSize}px</FieldLabel>
        <Slider value={el.fontSize} onChange={(_, v) => onChange({ fontSize: v as number })} min={24} max={300} step={4} size="small" />
      </Box>

      {/* Font weight */}
      <FormControl size="small" fullWidth>
        <InputLabel>Font Weight</InputLabel>
        <Select
          value={el.fontWeight}
          label="Font Weight"
          onChange={(e) => onChange({ fontWeight: e.target.value as FontWeight })}
        >
          <MenuItem value="400">Regular (400)</MenuItem>
          <MenuItem value="500">Medium (500)</MenuItem>
          <MenuItem value="600">SemiBold (600)</MenuItem>
          <MenuItem value="700">Bold (700)</MenuItem>
          <MenuItem value="800">ExtraBold (800)</MenuItem>
          <MenuItem value="900">Black (900)</MenuItem>
        </Select>
      </FormControl>

      {/* Letter spacing */}
      <Box>
        <FieldLabel>Letter Spacing — {(el.letterSpacing ?? 0).toFixed(2)}em</FieldLabel>
        <Slider
          value={el.letterSpacing ?? 0}
          onChange={(_, v) => onChange({ letterSpacing: v as number })}
          min={-0.1} max={0.5} step={0.01}
          size="small"
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v.toFixed(2)}em`}
        />
      </Box>

      {/* Line height */}
      <Box>
        <FieldLabel>Line Height — {(el.lineHeight ?? 1.2).toFixed(2)}</FieldLabel>
        <Slider
          value={el.lineHeight ?? 1.2}
          onChange={(_, v) => onChange({ lineHeight: v as number })}
          min={0.8} max={3} step={0.05}
          size="small"
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => v.toFixed(2)}
        />
      </Box>

      {/* Color */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <FieldLabel>Color</FieldLabel>
        <input
          type="color"
          value={el.color}
          onChange={(e) => onChange({ color: e.target.value })}
          style={{ width: 36, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 2, background: 'none' }}
        />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{el.color}</Typography>
      </Box>

      {/* Opacity */}
      <Box>
        <FieldLabel>Opacity — {Math.round((el.opacity ?? 1) * 100)}%</FieldLabel>
        <Slider
          value={el.opacity ?? 1}
          onChange={(_, v) => onChange({ opacity: v as number })}
          min={0} max={1} step={0.01}
          size="small"
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
        />
      </Box>

      {/* Text align */}
      <Box>
        <FieldLabel>Text Align</FieldLabel>
        <ToggleButtonGroup
          value={el.textAlign}
          exclusive
          onChange={(_, v) => v && onChange({ textAlign: v as TextAlign })}
          size="small"
        >
          <ToggleButton value="left"><FormatAlignLeftIcon fontSize="small" /></ToggleButton>
          <ToggleButton value="center"><FormatAlignCenterIcon fontSize="small" /></ToggleButton>
          <ToggleButton value="right"><FormatAlignRightIcon fontSize="small" /></ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Text shadow */}
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={el.textShadow ?? false}
            onChange={(e) => onChange({ textShadow: e.target.checked })}
          />
        }
        label={<Typography variant="caption">Text Shadow</Typography>}
        sx={{ mx: 0 }}
      />

      <Divider />

      {/* Animation type */}
      <FormControl size="small" fullWidth>
        <InputLabel>Animation</InputLabel>
        <Select
          value={el.animation}
          label="Animation"
          onChange={(e) => onChange({ animation: e.target.value as AnimationType })}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="fadeIn">Fade In</MenuItem>
          <MenuItem value="slideInLeft">Slide In Left</MenuItem>
          <MenuItem value="slideInRight">Slide In Right</MenuItem>
          <MenuItem value="slideInUp">Slide In Up</MenuItem>
          <MenuItem value="slideInDown">Slide In Down</MenuItem>
          <MenuItem value="zoomIn">Zoom In</MenuItem>
          <MenuItem value="zoomOut">Zoom Out</MenuItem>
        </Select>
      </FormControl>

      {el.animation !== 'none' && (
        <>
          <Box>
            <FieldLabel>Duration — {el.animationDuration}ms</FieldLabel>
            <Slider
              value={el.animationDuration}
              onChange={(_, v) => onChange({ animationDuration: v as number })}
              min={100} max={5000} step={100}
              size="small"
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}ms`}
            />
          </Box>

          <Box>
            <FieldLabel>Delay — {el.animationDelay}ms</FieldLabel>
            <Slider
              value={el.animationDelay}
              onChange={(_, v) => onChange({ animationDelay: v as number })}
              min={0} max={5000} step={100}
              size="small"
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}ms`}
            />
          </Box>

          <FormControl size="small" fullWidth>
            <InputLabel>Easing</InputLabel>
            <Select
              value={el.easing}
              label="Easing"
              onChange={(e) => onChange({ easing: e.target.value as EasingType })}
            >
              <MenuItem value="linear">Linear</MenuItem>
              <MenuItem value="ease">Ease</MenuItem>
              <MenuItem value="ease-in">Ease In</MenuItem>
              <MenuItem value="ease-out">Ease Out</MenuItem>
              <MenuItem value="ease-in-out">Ease In Out</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
    </Section>
  );
}
