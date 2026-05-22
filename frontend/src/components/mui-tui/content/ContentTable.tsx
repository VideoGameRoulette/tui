'use client';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  minWidth?: number;
}

export interface ContentTableProps {
  columns: TableColumn[];
  rows: Record<string, React.ReactNode>[];
  caption?: string;
  striped?: boolean;
  stickyHeader?: boolean;
  maxHeight?: number;
  outlined?: boolean;
  sx?: SxProps<Theme>;
}

const DEMO_COLUMNS: TableColumn[] = [
  { key: 'name',    label: 'Name',    minWidth: 140 },
  { key: 'role',    label: 'Role',    minWidth: 140 },
  { key: 'email',   label: 'Email',   minWidth: 180 },
  { key: 'status',  label: 'Status',  minWidth: 100, align: 'center' },
  { key: 'joined',  label: 'Joined',  minWidth: 120, align: 'right'  },
];

const DEMO_ROWS = [
  { name: 'Alex Rivera',    role: 'Engineering Lead', email: 'alex@example.com',    status: 'Active',    joined: 'Jan 2022' },
  { name: 'Sam Okonkwo',   role: 'Product Manager',  email: 'sam@example.com',     status: 'Active',    joined: 'Mar 2022' },
  { name: 'Jordan Lee',    role: 'Designer',          email: 'jordan@example.com',  status: 'On leave',  joined: 'Jul 2022' },
  { name: 'Taylor Singh',  role: 'Backend Engineer',  email: 'taylor@example.com',  status: 'Active',    joined: 'Oct 2022' },
  { name: 'Morgan Chen',   role: 'Data Analyst',      email: 'morgan@example.com',  status: 'Inactive',  joined: 'Feb 2023' },
];

export default function ContentTable({
  columns = DEMO_COLUMNS,
  rows = DEMO_ROWS,
  caption,
  striped = true,
  stickyHeader = false,
  maxHeight,
  outlined = true,
  sx,
}: ContentTableProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';

  const stripeColor = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)';

  return (
    <Box sx={sx}>
      {caption && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontStyle: 'italic' }}>
          {caption}
        </Typography>
      )}
      <TableContainer
        component={outlined ? Paper : Box}
        variant={outlined ? 'outlined' : undefined}
        sx={{
          borderRadius: outlined ? 2 : 0,
          ...(maxHeight ? { maxHeight } : {}),
        }}
      >
        <Table stickyHeader={stickyHeader} size="medium">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align ?? 'left'}
                  sx={{
                    minWidth: col.minWidth,
                    fontWeight: 700,
                    color: 'text.primary',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    bgcolor: dark ? '#1e293b' : 'grey.50',
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                sx={{
                  bgcolor: striped && rowIndex % 2 === 1 ? stripeColor : 'transparent',
                  '&:last-child td': { border: 0 },
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align ?? 'left'}
                    sx={{ color: col.key === columns[0].key ? 'text.primary' : 'text.secondary', fontSize: '0.9375rem' }}
                  >
                    {row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
