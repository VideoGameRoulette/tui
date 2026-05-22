'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductCard from '../cards/ProductCard';
import type { ProductCardProps } from '../cards/ProductCard';
import FilterSortBar from '../interactive/FilterSortBar';
import type { FilterOption, SortOption } from '../interactive/FilterSortBar';
import type { SxProps, Theme } from '@mui/material/styles';

const DEFAULT_PRODUCTS: ProductCardProps[] = [
  { name: 'Classic Leather Wallet', price: '$49', originalPrice: '$65', badge: 'Sale', href: '#' },
  { name: 'Canvas Tote Bag', price: '$35', href: '#' },
  { name: 'Minimalist Watch', price: '$129', originalPrice: '$160', badge: 'Sale', href: '#' },
  { name: 'Ceramic Mug Set', price: '$28', href: '#' },
  { name: 'Bamboo Desk Organizer', price: '$42', href: '#' },
  { name: 'Merino Wool Socks', price: '$18', href: '#' },
  { name: 'Linen Throw Blanket', price: '$75', originalPrice: '$95', href: '#' },
  { name: 'Stainless Steel Bottle', price: '$32', badge: 'New', href: '#' },
];

export interface ProductGridProps {
  products?: ProductCardProps[];
  cols?: 2 | 3 | 4;
  filters?: FilterOption[];
  filterValue?: string | null;
  onFilterChange?: (value: string | null) => void;
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  showFilterBar?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  sx?: SxProps<Theme>;
}

export default function ProductGrid({
  products = DEFAULT_PRODUCTS,
  cols = 4,
  filters = [],
  filterValue,
  onFilterChange,
  sortOptions = [],
  sortValue,
  onSortChange,
  onSearch,
  searchPlaceholder = 'Search products…',
  showFilterBar = true,
  loading = false,
  emptyMessage = 'No products found.',
  sx,
}: ProductGridProps) {
  const smCols = Math.min(cols, 2);
  const mdCols = Math.min(cols, 3);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ...sx }}>
      {showFilterBar && (
        <FilterSortBar
          filters={filters}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
          sortOptions={sortOptions}
          sortValue={sortValue ?? ''}
          onSortChange={onSortChange}
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
          showFilters={filters.length > 0}
          showSort={sortOptions.length > 0}
        />
      )}

      {products.length === 0 && !loading ? (
        <Typography color="text.secondary" textAlign="center" py={8}>
          {emptyMessage}
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: `repeat(${smCols}, 1fr)`,
              md: `repeat(${mdCols}, 1fr)`,
              lg: `repeat(${cols}, 1fr)`,
            },
            gap: 3,
          }}
        >
          {products.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
        </Box>
      )}
    </Box>
  );
}
