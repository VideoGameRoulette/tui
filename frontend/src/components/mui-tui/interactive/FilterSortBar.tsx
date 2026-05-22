'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { SxProps, Theme } from '@mui/material/styles';

export interface FilterOption {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface FilterSortBarProps {
  filters?: FilterOption[];
  filterValue?: string | null;
  onFilterChange?: (value: string | null) => void;
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortLabel?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showSort?: boolean;
  sx?: SxProps<Theme>;
}

export default function FilterSortBar({
  filters = [],
  filterValue,
  onFilterChange,
  sortOptions = [],
  sortValue = '',
  onSortChange,
  sortLabel = 'Sort by',
  searchValue: controlledSearch,
  onSearchChange,
  onSearch,
  searchPlaceholder = 'Search…',
  showSearch = true,
  showFilters = true,
  showSort = true,
  sx,
}: FilterSortBarProps) {
  const [internalSearch, setInternalSearch] = useState('');
  const isSearchControlled = controlledSearch !== undefined;
  const search = isSearchControlled ? controlledSearch : internalSearch;

  function handleSearchChange(v: string) {
    if (!isSearchControlled) setInternalSearch(v);
    onSearchChange?.(v);
  }

  function clearSearch() {
    handleSearchChange('');
    onSearch?.('');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        ...sx,
      }}
    >
      {/* Search */}
      {showSearch && (
        <TextField
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch?.(search)}
          placeholder={searchPlaceholder}
          size="small"
          sx={{ minWidth: 200, flex: { xs: '1 1 100%', sm: '1 1 auto' } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: 'text.secondary', cursor: onSearch ? 'pointer' : 'default' }}
                    onClick={() => onSearch?.(search)}
                  />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch} edge="end" aria-label="clear">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />
      )}

      {/* Filter toggle buttons */}
      {showFilters && filters.length > 0 && (
        <ToggleButtonGroup
          value={filterValue ?? null}
          exclusive
          onChange={(_, v) => onFilterChange?.(v)}
          size="small"
          sx={{ flexWrap: 'wrap' }}
        >
          {filters.map(f => (
            <ToggleButton key={f.value} value={f.value}>
              {f.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}

      {/* Sort select */}
      {showSort && sortOptions.length > 0 && (
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>{sortLabel}</InputLabel>
          <Select
            value={sortValue}
            label={sortLabel}
            onChange={e => onSortChange?.(e.target.value)}
          >
            {sortOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}
