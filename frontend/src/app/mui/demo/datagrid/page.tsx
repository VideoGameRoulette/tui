'use client';

import { useState, useCallback } from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import {
  DataGridPremium,
  GridColDef,
  GridRowSelectionModel,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  QuickFilter,
  QuickFilterControl,
  QuickFilterClear,
  QuickFilterTrigger,
  ExportCsv,
  ExportExcel,
  ExportPrint,
} from '@mui/x-data-grid-premium';
import { LicenseInfo } from '@mui/x-license';
import MuiShell from '@/components/MuiShell';
import { COLORS } from '@/lib/theme';

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY ?? '');

// ─── Types ────────────────────────────────────────────────────────────────────

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Inactive';
  startDate: string;
  performance: number;
}

interface ActionItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  dividerBefore: boolean;
  danger: boolean;
}

// Allow custom props through DataGrid slotProps.toolbar
declare module '@mui/x-data-grid-premium' {
  interface ToolbarPropsOverrides {
    actions: ActionItem[];
    onAction: (key: string) => void;
  }
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const INITIAL_ROWS: Employee[] = [
  { id:  1, name: 'Alice Chen',     department: 'Engineering', role: 'Sr. Engineer',    salary: 142000, status: 'Active',   startDate: '2020-03-15', performance: 4.8 },
  { id:  2, name: 'Bob Martinez',   department: 'Engineering', role: 'Engineer II',     salary: 118000, status: 'Active',   startDate: '2021-07-01', performance: 4.2 },
  { id:  3, name: 'Carol Johnson',  department: 'Engineering', role: 'Lead Engineer',   salary: 165000, status: 'Active',   startDate: '2018-11-12', performance: 4.9 },
  { id:  4, name: 'David Park',     department: 'Engineering', role: 'Engineer I',      salary:  98000, status: 'On Leave', startDate: '2023-01-20', performance: 3.9 },
  { id:  5, name: 'Eva Wilson',     department: 'Product',     role: 'PM',              salary: 135000, status: 'Active',   startDate: '2019-06-03', performance: 4.6 },
  { id:  6, name: 'Frank Lee',      department: 'Product',     role: 'Sr. PM',          salary: 158000, status: 'Active',   startDate: '2017-09-28', performance: 4.7 },
  { id:  7, name: 'Grace Kim',      department: 'Product',     role: 'APM',             salary: 105000, status: 'Active',   startDate: '2022-04-11', performance: 4.1 },
  { id:  8, name: 'Henry Davis',    department: 'Design',      role: 'Sr. Designer',    salary: 128000, status: 'Active',   startDate: '2020-08-19', performance: 4.5 },
  { id:  9, name: 'Iris Thompson',  department: 'Design',      role: 'Designer',        salary: 108000, status: 'Inactive', startDate: '2021-02-14', performance: 3.7 },
  { id: 10, name: 'James Brown',    department: 'Design',      role: 'Design Lead',     salary: 145000, status: 'Active',   startDate: '2019-01-07', performance: 4.8 },
  { id: 11, name: 'Kate Miller',    department: 'Analytics',   role: 'Data Analyst',    salary: 112000, status: 'Active',   startDate: '2021-10-25', performance: 4.3 },
  { id: 12, name: 'Liam Garcia',    department: 'Analytics',   role: 'Sr. Analyst',     salary: 132000, status: 'Active',   startDate: '2020-05-30', performance: 4.4 },
  { id: 13, name: 'Mia Anderson',   department: 'Analytics',   role: 'Analytics Lead',  salary: 152000, status: 'On Leave', startDate: '2018-03-22', performance: 4.6 },
  { id: 14, name: 'Noah White',     department: 'Engineering', role: 'DevOps',          salary: 136000, status: 'Active',   startDate: '2020-11-08', performance: 4.4 },
  { id: 15, name: 'Olivia Harris',  department: 'Product',     role: 'PM',              salary: 130000, status: 'Active',   startDate: '2022-07-18', performance: 4.0 },
  { id: 16, name: 'Paul Jackson',   department: 'Design',      role: 'UX Researcher',   salary: 118000, status: 'Active',   startDate: '2021-05-03', performance: 4.2 },
  { id: 17, name: 'Quinn Taylor',   department: 'Analytics',   role: 'Data Scientist',  salary: 148000, status: 'Active',   startDate: '2019-09-16', performance: 4.7 },
  { id: 18, name: 'Rachel Moore',   department: 'Engineering', role: 'QA Engineer',     salary: 108000, status: 'Active',   startDate: '2022-01-31', performance: 4.1 },
  { id: 19, name: 'Sam Nelson',     department: 'Product',     role: 'Dir. of Product', salary: 195000, status: 'Active',   startDate: '2016-04-12', performance: 4.9 },
  { id: 20, name: 'Tina Robinson',  department: 'Analytics',   role: 'BI Developer',    salary: 125000, status: 'Inactive', startDate: '2020-12-09', performance: 3.8 },
];

const EMPTY_SELECTION: GridRowSelectionModel = { type: 'include', ids: new Set() };

const STATUS_COLOR: Record<Employee['status'], 'success' | 'warning' | 'default'> = {
  Active:     'success',
  'On Leave': 'warning',
  Inactive:   'default',
};

function selCount(model: GridRowSelectionModel, total: number): number {
  return model.type === 'include' ? model.ids.size : total - model.ids.size;
}

// ─── Styled quick-filter components (expandable search) ───────────────────────

type OwnerState = { expanded: boolean };

const StyledQuickFilter = styled(QuickFilter)({
  display: 'grid',
  alignItems: 'center',
});

const StyledTriggerButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    width: 'min-content',
    height: 'min-content',
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? 'none' : 'auto',
    transition: theme.transitions.create(['opacity']),
  }),
);

const StyledSearchField = styled(TextField)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    overflowX: 'clip',
    width: ownerState.expanded ? 260 : 'var(--trigger-width)',
    opacity: ownerState.expanded ? 1 : 0,
    transition: theme.transitions.create(['width', 'opacity']),
  }),
);

// ─── Custom toolbar ───────────────────────────────────────────────────────────

function CustomToolbar({ actions, onAction }: { actions: ActionItem[]; onAction: (key: string) => void }) {
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  return (
    <Toolbar>
      <Tooltip title="Columns">
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <ViewColumnIcon fontSize="small" />
        </ColumnsPanelTrigger>
      </Tooltip>

      <Tooltip title="Filters">
        <FilterPanelTrigger
          render={(props, state) => (
            <ToolbarButton {...props} color="default">
              <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                <FilterListIcon fontSize="small" />
              </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>

      <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Actions">
        <ToolbarButton
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          aria-label="Open actions menu"
          color="default"
        >
          <MoreVertIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { elevation: 4, sx: { minWidth: 220, borderRadius: 2 } } }}
      >
        <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
          <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.4, color: 'text.secondary' }}>
            Quick Actions
          </Typography>
        </Box>
        <Divider />

        {/* Built-in export actions */}
        <ExportCsv render={<MenuItem />} onClick={() => setMenuAnchor(null)}>
          Export CSV
        </ExportCsv>
        <ExportExcel render={<MenuItem />} onClick={() => setMenuAnchor(null)}>
          Export Excel
        </ExportExcel>
        <ExportPrint render={<MenuItem />} onClick={() => setMenuAnchor(null)}>
          Print
        </ExportPrint>

        {/* Custom actions */}
        {actions.map(({ key, label, icon, dividerBefore, danger }) => (
          <Box key={key}>
            {dividerBefore && <Divider sx={{ my: 0.5 }} />}
            <MenuItem
              onClick={() => { setMenuAnchor(null); onAction(key); }}
              sx={{
                color: danger ? 'error.main' : 'text.primary',
                '&:hover': {
                  bgcolor: danger ? alpha(theme.palette.error.main, 0.08) : 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>{icon}</ListItemIcon>
              <ListItemText primary={label} slotProps={{ primary: { sx: { fontWeight: 500, fontSize: '0.9rem' } } }} />
            </MenuItem>
          </Box>
        ))}
      </Menu>

      {/* Expandable quick-filter search */}
      <StyledQuickFilter>
        <QuickFilterTrigger
          render={(triggerProps, state) => (
            <Tooltip title="Search" enterDelay={0}>
              <StyledTriggerButton
                {...triggerProps}
                ownerState={{ expanded: state.expanded }}
                color="default"
                aria-disabled={state.expanded}
              >
                <SearchIcon fontSize="small" />
              </StyledTriggerButton>
            </Tooltip>
          )}
        />
        <QuickFilterControl
          render={({ ref, ...controlProps }, state) => (
            <StyledSearchField
              {...controlProps}
              ownerState={{ expanded: state.expanded }}
              inputRef={ref}
              aria-label="Search"
              placeholder="Search..."
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Clear search"
                        material={{ sx: { marginRight: -0.75 } }}
                      >
                        <CancelIcon fontSize="small" />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...controlProps.slotProps?.input,
                },
                ...controlProps.slotProps,
              }}
            />
          )}
        />
      </StyledQuickFilter>
    </Toolbar>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DatagridDemoPage() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const [rows, setRows]                 = useState<Employee[]>(INITIAL_ROWS);
  const [rowSelection, setRowSelection] = useState<GridRowSelectionModel>(EMPTY_SELECTION);
  const [groupByDept, setGroupByDept]   = useState(false);
  const [snackbar, setSnackbar]         = useState<string | null>(null);

  const isDark = colorMode === 'dark';

  const handleAction = useCallback(
    (key: string) => {
      switch (key) {
        case 'add':
          setSnackbar('Add-record dialog would open here');
          break;
        case 'group':
          setGroupByDept((prev) => {
            const next = !prev;
            setSnackbar(next ? 'Grouped by Department' : 'Grouping removed');
            return next;
          });
          break;
        case 'delete': {
          const count = selCount(rowSelection, rows.length);
          if (count === 0) {
            setSnackbar('Select rows first');
          } else {
            setRows((prev) =>
              prev.filter((r) => {
                const inSet = rowSelection.ids.has(r.id);
                return rowSelection.type === 'include' ? !inSet : inSet;
              }),
            );
            setSnackbar(`Deleted ${count} record(s)`);
            setRowSelection(EMPTY_SELECTION);
          }
          break;
        }
        case 'refresh':
          setRows(INITIAL_ROWS);
          setGroupByDept(false);
          setRowSelection(EMPTY_SELECTION);
          setSnackbar('Data refreshed');
          break;
      }
    },
    [rowSelection, rows.length],
  );

  const columns: GridColDef<Employee>[] = [
    { field: 'name',       headerName: 'Name',       flex: 1.2, minWidth: 160 },
    { field: 'department', headerName: 'Department', flex: 1,   minWidth: 130 },
    { field: 'role',       headerName: 'Role',       flex: 1.2, minWidth: 150 },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'number',
      flex: 1,
      minWidth: 120,
      valueFormatter: (value) => `$${Number(value).toLocaleString()}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.9,
      minWidth: 110,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          color={STATUS_COLOR[value as Employee['status']] ?? 'default'}
          size="small"
          sx={{ fontWeight: 600, fontSize: '0.75rem' }}
        />
      ),
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      type: 'date',
      flex: 0.9,
      minWidth: 120,
      valueGetter: (value) => (value ? new Date(value as string) : null),
    },
    {
      field: 'performance',
      headerName: 'Perf.',
      type: 'number',
      flex: 0.7,
      minWidth: 90,
      valueFormatter: (value) => `${Number(value).toFixed(1)} ★`,
    },
  ];

  const count = selCount(rowSelection, rows.length);

  const actions: ActionItem[] = [
    { key: 'add',     label: 'Add Record',                                              icon: <AddIcon />,        dividerBefore: true,  danger: false },
    { key: 'group',   label: groupByDept ? 'Remove Grouping' : 'Group by Department',  icon: <ViewColumnIcon />, dividerBefore: true,  danger: false },
    { key: 'delete',  label: count ? `Delete Selected (${count})` : 'Delete Selected', icon: <DeleteIcon />,     dividerBefore: true,  danger: true  },
    { key: 'refresh', label: 'Refresh Data',                                            icon: <RefreshIcon />,    dividerBefore: true,  danger: false },
  ];

  return (
    <MuiShell colorMode={colorMode} onToggleMode={() => setColorMode((m) => (m === 'light' ? 'dark' : 'light'))}>
      <Box sx={{
        height: 'calc(100vh - 60px)',
        p: 2,
        pb: { xs: 'calc(56px + 16px)', md: 2 },
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}>
        <DataGridPremium
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={rowSelection}
          onRowSelectionModelChange={setRowSelection}
          rowGroupingModel={groupByDept ? ['department'] : []}
          onRowGroupingModelChange={(model) => setGroupByDept(model.length > 0)}
          aggregationModel={groupByDept ? { salary: 'avg', performance: 'avg' } : {}}
          pagination
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            pinnedColumns: { left: ['__check__', 'name'] },
          }}
          density="standard"
          showToolbar
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: { actions, onAction: handleAction },
          }}
          sx={{
            flex: 1,
            minHeight: 0,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: isDark
                ? alpha(COLORS.secondary.main, 0.12)
                : alpha(COLORS.secondary.main, 0.06),
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: isDark
                ? alpha(COLORS.secondary.main, 0.08)
                : alpha(COLORS.secondary.main, 0.04),
            },
            '& .MuiDataGrid-row.Mui-selected': {
              bgcolor: isDark
                ? alpha(COLORS.secondary.main, 0.18)
                : alpha(COLORS.secondary.main, 0.10),
            },
          }}
        />
      </Box>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={snackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </MuiShell>
  );
}
