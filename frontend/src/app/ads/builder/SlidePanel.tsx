'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SlideThumbnail } from './SlideCanvas';
import type { AdSlide } from './types';

interface Props {
  slides: AdSlide[];
  activeSlideId: string;
  onSelectSlide: (id: string) => void;
  onAddSlide: () => void;
  onDuplicateSlide: (id: string) => void;
  onRemoveSlide: (id: string) => void;
  onMoveSlide: (id: string, dir: 'up' | 'down') => void;
  onPreviewSlide: (id: string) => void;
}

export function SlidePanel({
  slides,
  activeSlideId,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onRemoveSlide,
  onMoveSlide,
  onPreviewSlide,
}: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary' }}>
          Slides ({slides.length})
        </Typography>
        <Tooltip title="Add slide">
          <IconButton size="small" onClick={onAddSlide} color="primary">
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />

      {/* Slide list — 2-column grid on mobile, 1-column on desktop */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          py: 1,
          px: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: '1fr' },
          alignContent: 'start',
          gap: 1,
        }}
      >
        {slides.map((slide, idx) => {
          const isActive = slide.id === activeSlideId;
          return (
            <Box
              key={slide.id}
              onClick={() => onSelectSlide(slide.id)}
              sx={{
                borderRadius: 2,
                border: '2px solid',
                borderColor: isActive ? 'primary.main' : 'transparent',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                bgcolor: isActive ? 'action.selected' : 'transparent',
                '&:hover': { borderColor: isActive ? 'primary.main' : 'divider' },
                '&:hover .slide-actions': { opacity: 1 },
              }}
            >
              {/* Thumbnail — fills full card width */}
              <SlideThumbnail slide={slide} />

              {/* Slide info bar */}
              <Box sx={{ px: 1, py: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: isActive ? 'primary.main' : 'text.secondary' }}>
                  {idx + 1}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {(slide.durationMs / 1000).toFixed(1)}s
                </Typography>
              </Box>

              {/* Mobile action bar — always visible on xs/sm */}
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 0.5,
                  pb: 0.5,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Reorder */}
                <Box sx={{ display: 'flex', gap: 0.25 }}>
                  <Tooltip title="Move up">
                    <span>
                      <IconButton
                        size="small"
                        disabled={idx === 0}
                        sx={{ p: 0.5, '&.Mui-disabled': { opacity: 0.3 } }}
                        onClick={() => onMoveSlide(slide.id, 'up')}
                      >
                        <KeyboardArrowUpIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Move down">
                    <span>
                      <IconButton
                        size="small"
                        disabled={idx === slides.length - 1}
                        sx={{ p: 0.5, '&.Mui-disabled': { opacity: 0.3 } }}
                        onClick={() => onMoveSlide(slide.id, 'down')}
                      >
                        <KeyboardArrowDownIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 0.25 }}>
                  <Tooltip title="Preview">
                    <IconButton
                      size="small"
                      sx={{ p: 0.5, color: 'text.secondary' }}
                      onClick={() => { onSelectSlide(slide.id); onPreviewSlide(slide.id); }}
                    >
                      <PlayArrowIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Duplicate">
                    <IconButton
                      size="small"
                      sx={{ p: 0.5, color: 'text.secondary' }}
                      onClick={() => onDuplicateSlide(slide.id)}
                    >
                      <ContentCopyIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      sx={{ p: 0.5 }}
                      onClick={() => onRemoveSlide(slide.id)}
                    >
                      <DeleteOutlinedIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Desktop hover action overlay (md+) */}
              <Box
                className="slide-actions"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  gap: 0.25,
                  opacity: 0,
                  transition: 'opacity 0.15s',
                }}
              >
                <Tooltip title="Preview this slide" placement="left">
                  <IconButton
                    size="small"
                    sx={{ bgcolor: 'rgba(0,0,0,0.65)', color: 'white', '&:hover': { bgcolor: 'primary.main' }, p: 0.5 }}
                    onClick={() => { onSelectSlide(slide.id); onPreviewSlide(slide.id); }}
                  >
                    <PlayArrowIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move up" placement="left">
                  <span>
                    <IconButton
                      size="small"
                      disabled={idx === 0}
                      sx={{ bgcolor: 'rgba(0,0,0,0.65)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' }, '&.Mui-disabled': { opacity: 0.3 }, p: 0.5 }}
                      onClick={() => onMoveSlide(slide.id, 'up')}
                    >
                      <KeyboardArrowUpIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Move down" placement="left">
                  <span>
                    <IconButton
                      size="small"
                      disabled={idx === slides.length - 1}
                      sx={{ bgcolor: 'rgba(0,0,0,0.65)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' }, '&.Mui-disabled': { opacity: 0.3 }, p: 0.5 }}
                      onClick={() => onMoveSlide(slide.id, 'down')}
                    >
                      <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Duplicate" placement="left">
                  <IconButton
                    size="small"
                    sx={{ bgcolor: 'rgba(0,0,0,0.65)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' }, p: 0.5 }}
                    onClick={() => onDuplicateSlide(slide.id)}
                  >
                    <ContentCopyIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete slide" placement="left">
                  <IconButton
                    size="small"
                    sx={{ bgcolor: 'rgba(0,0,0,0.65)', color: 'white', '&:hover': { bgcolor: 'error.main' }, p: 0.5 }}
                    onClick={() => onRemoveSlide(slide.id)}
                  >
                    <DeleteOutlinedIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Divider />
      <Box sx={{ p: 1, flexShrink: 0 }}>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          startIcon={<AddIcon />}
          onClick={onAddSlide}
        >
          Add Slide
        </Button>
      </Box>
    </Box>
  );
}
