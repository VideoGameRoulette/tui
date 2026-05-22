'use client';

import { useState, useCallback } from 'react';
import { useStoredColorMode } from '@/lib/stored-color-mode';
import Link from 'next/link';
import { ThemeProvider, alpha, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import AppleLogoIcon from '@/components/icons/AppleLogoIcon';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FilterListIcon from '@mui/icons-material/FilterList';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import TailwindLogoIcon from '@/components/icons/TailwindLogoIcon';
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
import { buildMuiPageTheme, COLORS } from '@/lib/theme';
import { BOTTOM_NAV_TABS } from '@/lib/nav';
import { buildNavSectionsWithIcons } from '@/lib/nav-item-icons';
import { createNavMenuAnchorState, MUI_SECTION_ACCENTS } from '@/lib/nav-shell-styles';

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

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Analytics'] as const;
const STATUSES: Employee['status'][] = ['Active', 'On Leave', 'Inactive'];

const BLANK_FORM = {
  name: '',
  department: 'Engineering',
  role: '',
  salary: '',
  status: 'Active' as Employee['status'],
  startDate: '',
  performance: '',
};

function selCount(model: GridRowSelectionModel, total: number): number {
  return model.type === 'include' ? model.ids.size : total - model.ids.size;
}

// ─── Constants ────────────────────────────────────────────────────────────────


// ─── Nav data ─────────────────────────────────────────────────────────────────

const navSections = buildNavSectionsWithIcons(MUI_SECTION_ACCENTS, MUI_SECTION_ACCENTS.mui);

const BOTTOM_NAV_ICONS = [HomeIcon, MuiLogoIcon, TailwindLogoIcon, AppleLogoIcon] as const;

// ─── Expandable quick-filter styled components ────────────────────────────────

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

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function CustomToolbar({ actions, onAction }: { actions: ActionItem[]; onAction: (key: string) => void }) {
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
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              minWidth: 220,
              borderRadius: '12px !important',
              border: '1px solid',
              borderColor: 'divider',
            },
          },
        }}
      >
        <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
          <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.4, color: 'text.secondary' }}>
            Quick Actions
          </Typography>
        </Box>
        <Divider />

        <ExportCsv render={<MenuItem />} onClick={() => setMenuAnchor(null)}>Export CSV</ExportCsv>
        <ExportExcel render={<MenuItem />} onClick={() => setMenuAnchor(null)}>Export Excel</ExportExcel>
        <ExportPrint render={<MenuItem />} onClick={() => setMenuAnchor(null)}>Print</ExportPrint>

        {actions.map(({ key, label, icon, dividerBefore, danger }) => (
          <Box key={key}>
            {dividerBefore && <Divider sx={{ my: 0.5 }} />}
            <MenuItem
              onClick={() => { setMenuAnchor(null); onAction(key); }}
              sx={{
                color: danger ? 'error.main' : 'text.primary',
                '&:hover': {
                  bgcolor: danger ? alpha('#FF3B30', 0.12) : 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>{icon}</ListItemIcon>
              <ListItemText primary={label} slotProps={{ primary: { sx: { fontWeight: 500, fontSize: '0.9rem' } } }} />
            </MenuItem>
          </Box>
        ))}
      </Menu>

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

export default function MuiDatagridPage() {
  const [mode, toggleMode] = useStoredColorMode();
  const [rows, setRows]               = useState<Employee[]>(INITIAL_ROWS);
  const [rowSelection, setRowSelection] = useState<GridRowSelectionModel>(EMPTY_SELECTION);
  const [groupByDept, setGroupByDept] = useState(false);
  const [snackbar, setSnackbar]       = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [anchors, setAnchors] = useState(createNavMenuAnchorState);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addForm, setAddForm]         = useState(BLANK_FORM);

  const theme  = buildMuiPageTheme(mode);
  const isDark = mode === 'dark';

  const openMenu  = (id: string, el: HTMLElement) => setAnchors((p) => ({ ...p, [id]: el }));
  const closeMenu = (id: string) => setAnchors((p) => ({ ...p, [id]: null }));

  const handleAction = useCallback(
    (key: string) => {
      switch (key) {
        case 'add':
          setAddForm(BLANK_FORM);
          setAddDialogOpen(true);
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

  const handleAddSubmit = useCallback(() => {
    if (!addForm.name.trim()) return;
    setRows((prev) => {
      const newId = prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: newId,
          name: addForm.name.trim(),
          department: addForm.department,
          role: addForm.role.trim(),
          salary: Number(addForm.salary) || 0,
          status: addForm.status,
          startDate: addForm.startDate || new Date().toISOString().slice(0, 10),
          performance: Math.min(5, Math.max(0, Number(addForm.performance) || 0)),
        },
      ];
    });
    setSnackbar('Employee added');
    setAddDialogOpen(false);
  }, [addForm]);

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
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ── Fixed header ── */}
      <Box
        component="header"
        sx={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.surface,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 4 } }}>
          <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>

            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MuiLogoIcon sx={{ fontSize: 18, color: 'white' }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: 'text.primary', letterSpacing: '-0.01em' }}>
                Material UI
              </Typography>
            </Box>

            {/* Desktop nav */}
            <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navSections.map((section) => (
                <Box key={section.id}>
                  <Button
                    id={`nav-dg-${section.id}`}
                    aria-controls={anchors[section.id] ? `menu-dg-${section.id}` : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchors[section.id])}
                    onClick={(e) => openMenu(section.id, e.currentTarget)}
                    endIcon={
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: '1rem !important',
                          transition: 'transform 0.2s',
                          transform: anchors[section.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    }
                    sx={{
                      color: anchors[section.id]
                        ? (isDark ? section.accentLight : section.accentColor)
                        : 'text.secondary',
                      fontSize: '0.9375rem',
                      px: 1.5,
                      '&:hover': { color: isDark ? section.accentLight : section.accentColor, bgcolor: 'action.hover' },
                    }}
                  >
                    {section.label}
                  </Button>

                  <Menu
                    id={`menu-dg-${section.id}`}
                    anchorEl={anchors[section.id]}
                    open={Boolean(anchors[section.id])}
                    onClose={() => closeMenu(section.id)}
                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    slotProps={{
                      paper: {
                        elevation: isDark ? 4 : 2,
                        sx: {
                          mt: 0.75,
                          minWidth: 240,
                          borderRadius: '12px !important',
                          border: '1px solid',
                          borderColor: 'divider',
                          bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface,
                          overflow: 'visible',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -5,
                            left: 20,
                            width: 10,
                            height: 10,
                            bgcolor: isDark ? COLORS.neutral.bg.dark.surface : COLORS.neutral.bg.light.surface,
                            transform: 'rotate(45deg)',
                            borderTop: '1px solid',
                            borderLeft: '1px solid',
                            borderColor: 'divider',
                          },
                        },
                      },
                    }}
                  >
                    <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.1em', color: isDark ? section.accentLight : section.accentColor,
                        }}
                      >
                        {section.heading}
                      </Typography>
                    </Box>

                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <MenuItem
                          key={item.href}
                          component={Link}
                          href={item.href}
                          onClick={() => closeMenu(section.id)}
                          sx={{
                            mx: 1, mb: 0.5, borderRadius: 1.5,
                            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                            gap: 0.25, py: 1.25, px: 1.5,
                            '&:hover': { bgcolor: isDark ? alpha(section.accentColor, 0.1) : alpha(section.accentColor, 0.06) },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ItemIcon sx={{ fontSize: 15, color: isDark ? section.accentLight : section.accentColor }} />
                            <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: 'text.primary' }}>
                              {item.label}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.5, pl: '23px' }}>
                            {item.desc}
                          </Typography>
                        </MenuItem>
                      );
                    })}

                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ px: 2, pb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AddIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                      <Typography sx={{ fontSize: '0.8125rem', color: 'text.disabled', fontStyle: 'italic' }}>
                        More pages coming soon
                      </Typography>
                    </Box>
                  </Menu>
                </Box>
              ))}
            </Box>

            {/* Right — theme toggle + hamburger */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              <IconButton
                onClick={toggleMode}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Mobile drawer ── */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        keepMounted={false}
        sx={{ display: { md: 'none' } }}
        slotProps={{
          root: { keepMounted: false },
          paper: {
            sx: {
              width: 280,
              boxSizing: 'border-box',
              bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.surface,
            },
          },
        }}
      >
        <Box
          sx={{
            height: 60,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MuiLogoIcon sx={{ fontSize: 16, color: 'white' }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>Material UI</Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} size="small" aria-label="Close menu" sx={{ color: 'text.secondary' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ overflowY: 'auto', flex: 1, py: 1.5 }}>
          {navSections.map((section, idx) => (
            <Box key={section.id}>
              <Typography
                sx={{
                  px: 2.5, pt: idx === 0 ? 1 : 2, pb: 0.75,
                  fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: isDark ? section.accentLight : section.accentColor,
                }}
              >
                {section.heading}
              </Typography>

              <List dense disablePadding>
                {section.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <ListItemButton
                      key={item.href}
                      component={Link}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      sx={{
                        mx: 1, borderRadius: 1.5, mb: 0.5, py: 1,
                        '&:hover': { bgcolor: isDark ? alpha(section.accentColor, 0.1) : alpha(section.accentColor, 0.06) },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <ItemIcon sx={{ fontSize: 16, color: isDark ? section.accentLight : section.accentColor }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        secondary={item.desc}
                        slotProps={{
                          primary:   { style: { fontSize: '0.9375rem', fontWeight: 600 } },
                          secondary: { style: { fontSize: '0.8125rem', lineHeight: 1.4, marginTop: 2 } },
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>

              {idx < navSections.length - 1 && <Divider sx={{ mt: 1.5 }} />}
            </Box>
          ))}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2.5, mt: 2 }}>
            <AddIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
            <Typography sx={{ fontSize: '0.8125rem', color: 'text.disabled', fontStyle: 'italic' }}>
              More pages coming soon
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            onClick={() => { toggleMode(); setDrawerOpen(false); }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            sx={{ color: 'text.secondary' }}
          >
            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
          <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            {isDark ? 'Light mode' : 'Dark mode'}
          </Typography>
        </Box>
      </Drawer>

      {/* ── DataGrid content area ── */}
      <Box
        sx={{
          height: '100dvh',
          pt: { xs: '60px', md: 'calc(60px + 16px)' },
          pb: { xs: '56px', md: 2 },
          px: { xs: 0, md: 2 },
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          bgcolor: isDark ? COLORS.neutral.bg.dark.page : COLORS.neutral.bg.light.page,
        }}
      >
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
          slotProps={{ toolbar: { actions, onAction: handleAction } }}
          sx={{
            flex: 1,
            minHeight: 0,
            borderRadius: { xs: 0, md: '16px' },
            '& .MuiDataGrid-toolbarContainer': {
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: isDark ? COLORS.secondary.bg.dark : COLORS.secondary.bg.light,
            },
            '& .MuiDataGrid-virtualScroller': {
              clipPath: 'inset(0)',
            },
            '& .MuiDataGrid-row': {
              clipPath: 'inset(0 0 0 0)',
            },
            '& .MuiDataGrid-cell:not(.MuiDataGrid-cell--pinnedLeft):not(.MuiDataGrid-cell--pinnedRight)': {
              overflow: 'hidden',
              clipPath: 'inset(0)',
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: isDark ? alpha(COLORS.secondary.main, 0.08) : alpha(COLORS.secondary.main, 0.04),
            },
            '& .MuiDataGrid-row.Mui-selected': {
              bgcolor: isDark ? alpha(COLORS.secondary.main, 0.22) : alpha(COLORS.secondary.main, 0.10),
            },
            '& .MuiDataGrid-row.Mui-selected:hover': {
              bgcolor: isDark ? alpha(COLORS.secondary.main, 0.28) : alpha(COLORS.secondary.main, 0.14),
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid',
              borderColor: 'divider',
            },
          }}
        />
      </Box>

      {/* ── Mobile bottom nav ── */}
      <BottomNavigation
        value={1}
        showLabels
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200,
          height: 56, borderTop: '1px solid', borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.3)' : '0 -4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {BOTTOM_NAV_TABS.map((tab, i) => {
          const Icon = BOTTOM_NAV_ICONS[i];
          return (
            <BottomNavigationAction
              key={tab.href}
              label={tab.label}
              icon={<Icon />}
              component={Link}
              href={tab.href}
            />
          );
        })}
      </BottomNavigation>

      {/* ── Add Record Dialog ── */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: '16px', border: '1px solid', borderColor: 'divider' } } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.125rem' }}>Add Employee</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
          <TextField
            label="Name" value={addForm.name} required autoFocus size="small" fullWidth
            onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddSubmit(); }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={addForm.department}
                label="Department"
                onChange={(e) => setAddForm((p) => ({ ...p, department: e.target.value }))}
              >
                {DEPARTMENTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              label="Role" value={addForm.role} size="small" fullWidth
              onChange={(e) => setAddForm((p) => ({ ...p, role: e.target.value }))}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Salary" type="number" value={addForm.salary} size="small" fullWidth
              onChange={(e) => setAddForm((p) => ({ ...p, salary: e.target.value }))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={addForm.status}
                label="Status"
                onChange={(e) => setAddForm((p) => ({ ...p, status: e.target.value as Employee['status'] }))}
              >
                {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Start Date" type="date" value={addForm.startDate} size="small" fullWidth
              onChange={(e) => setAddForm((p) => ({ ...p, startDate: e.target.value }))}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Performance (0–5)" type="number" value={addForm.performance} size="small" fullWidth
              onChange={(e) => setAddForm((p) => ({ ...p, performance: e.target.value }))}
              slotProps={{ input: { inputProps: { min: 0, max: 5, step: 0.1 } } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="text" color="inherit" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSubmit} disabled={!addForm.name.trim()}>
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={snackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </ThemeProvider>
  );
}
