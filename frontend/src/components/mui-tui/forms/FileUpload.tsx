'use client';

import { useRef, useState, type DragEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import type { SxProps, Theme } from '@mui/material/styles';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  onFilesChange?: (files: File[]) => void;
  label?: string;
  dragDrop?: boolean;
  buttonLabel?: string;
  sx?: SxProps<Theme>;
}

export default function FileUpload({
  accept,
  multiple = false,
  maxSizeMb,
  onFilesChange,
  label,
  dragDrop = true,
  buttonLabel = 'Choose File',
  sx,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const arr = Array.from(incoming);
    if (maxSizeMb) {
      const oversized = arr.filter(f => f.size > maxSizeMb * 1024 * 1024);
      if (oversized.length) {
        setError(`Files must be under ${maxSizeMb} MB`);
        return;
      }
    }
    setError(null);
    const next = multiple ? [...files, ...arr] : arr;
    setFiles(next);
    onFilesChange?.(next);
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange?.(next);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, ...sx }}>
      {label && (
        <Typography variant="body2" fontWeight={500} color="text.secondary">
          {label}
        </Typography>
      )}

      {dragDrop ? (
        <Box
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          sx={{
            border: '2px dashed',
            borderColor: dragging ? 'primary.main' : 'divider',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: dragging ? 'action.hover' : 'background.paper',
            transition: 'border-color 0.2s, background-color 0.2s',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Drag & drop or{' '}
            <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
              browse
            </Box>
          </Typography>
          {accept && (
            <Typography variant="caption" color="text.disabled" display="block" mt={0.5}>
              Accepted: {accept}
            </Typography>
          )}
        </Box>
      ) : (
        <Button
          variant="outlined"
          startIcon={<AttachFileIcon />}
          onClick={() => inputRef.current?.click()}
          sx={{ alignSelf: 'flex-start' }}
        >
          {buttonLabel}
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={e => addFiles(e.target.files)}
      />

      {error && (
        <Typography variant="caption" color="error.main">
          {error}
        </Typography>
      )}

      {files.length > 0 && (
        <List dense disablePadding>
          {files.map((file, i) => (
            <ListItem
              key={`${file.name}-${i}`}
              disableGutters
              secondaryAction={
                <IconButton size="small" edge="end" onClick={() => removeFile(i)} aria-label="remove">
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              <AttachFileIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <ListItemText
                primary={file.name}
                secondary={`${(file.size / 1024).toFixed(1)} KB`}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
