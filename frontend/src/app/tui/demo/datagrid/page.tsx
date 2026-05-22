'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useStoredColorMode } from '@/lib/stored-color-mode';
import Link from 'next/link';
import TailwindLogoIcon from '@/components/icons/TailwindLogoIcon';
import MuiLogoIcon from '@/components/icons/MuiLogoIcon';
import AppleLogoIcon from '@/components/icons/AppleLogoIcon';
import { buildTailwindNavSections } from '@/lib/nav-shell-styles';

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

type SortKey = keyof Employee;
type SortDir = 'asc' | 'desc';

interface ColDef {
  key: SortKey;
  label: string;
  align?: 'right';
  minW: string;
  render?: (row: Employee) => React.ReactNode;
}

interface ActiveFilter {
  id: number;
  field: SortKey;
  op: string;
  value: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────


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

const STATUS_STYLE: Record<Employee['status'], string> = {
  Active:     'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  'On Leave': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  Inactive:   'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
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

const COLUMNS: ColDef[] = [
  { key: 'name',        label: 'Name',       minW: 'min-w-[140px]' },
  { key: 'department',  label: 'Department', minW: 'min-w-[120px]' },
  { key: 'role',        label: 'Role',       minW: 'min-w-[140px]' },
  { key: 'salary',      label: 'Salary',     align: 'right', minW: 'min-w-[110px]', render: (r) => `$${r.salary.toLocaleString()}` },
  { key: 'status',      label: 'Status',     minW: 'min-w-[100px]', render: (r) => (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[r.status]}`}>{r.status}</span>
  )},
  { key: 'startDate',   label: 'Start Date', minW: 'min-w-[110px]', render: (r) => new Date(r.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) },
  { key: 'performance', label: 'Perf.',      align: 'right', minW: 'min-w-[80px]',  render: (r) => `${r.performance.toFixed(1)} ★` },
];

// ─── Filter helpers ───────────────────────────────────────────────────────────

const FIELD_OPS: Record<string, { value: string; label: string }[]> = {
  name:        [{ value: 'contains', label: 'contains' }, { value: 'equals', label: 'equals' }, { value: 'startsWith', label: 'starts with' }],
  department:  [{ value: 'contains', label: 'contains' }, { value: 'equals', label: 'equals' }],
  role:        [{ value: 'contains', label: 'contains' }, { value: 'equals', label: 'equals' }],
  salary:      [{ value: 'eq', label: '=' }, { value: 'neq', label: '≠' }, { value: 'lt', label: '<' }, { value: 'lte', label: '≤' }, { value: 'gt', label: '>' }, { value: 'gte', label: '≥' }],
  status:      [{ value: 'equals', label: 'is' }, { value: 'neq', label: 'is not' }],
  startDate:   [{ value: 'equals', label: 'is' }, { value: 'lt', label: 'before' }, { value: 'gt', label: 'after' }],
  performance: [{ value: 'eq', label: '=' }, { value: 'neq', label: '≠' }, { value: 'lt', label: '<' }, { value: 'lte', label: '≤' }, { value: 'gt', label: '>' }, { value: 'gte', label: '≥' }],
};

function applyFilterOp(val: unknown, op: string, fv: string): boolean {
  if (!fv.trim()) return true;
  const sv = String(val).toLowerCase();
  const fl = fv.toLowerCase();
  const nv = Number(val);
  const nf = Number(fv);
  switch (op) {
    case 'contains':   return sv.includes(fl);
    case 'equals':     return sv === fl;
    case 'startsWith': return sv.startsWith(fl);
    case 'neq':        return sv !== fl;
    case 'eq':         return nv === nf;
    case 'lt':         return isNaN(nv) ? sv < fl : nv < nf;
    case 'lte':        return isNaN(nv) ? sv <= fl : nv <= nf;
    case 'gt':         return isNaN(nv) ? sv > fl : nv > nf;
    case 'gte':        return isNaN(nv) ? sv >= fl : nv >= nf;
    default:           return true;
  }
}

let _filterId = 0;
const nextId = () => ++_filterId;

// ─── Nav data ─────────────────────────────────────────────────────────────────

const navSections = buildTailwindNavSections();

// ─── Icons ────────────────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XMenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function SearchIcon({ cls = 'size-4' }: { cls?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={cls}>
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
    </svg>
  );
}

function XSmIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3.5">
      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z" clipRule="evenodd" />
    </svg>
  );
}

function ColumnsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  );
}

function MoreVertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.46-.35Zm-4.624-7.86a5.5 5.5 0 0 1 4.877 2.535l.312.31h-2.433a.75.75 0 0 0 0 1.5H17.01a.75.75 0 0 0 .75-.75V3.917a.75.75 0 0 0-1.5 0v2.43l-.31-.31A7 7 0 0 0 4.23 9.175a.75.75 0 1 0 1.46.35 5.5 5.5 0 0 1 5-.961Z" clipRule="evenodd" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v2.5A2.25 2.25 0 0 1 15.75 9h-11.5A2.25 2.25 0 0 1 2 6.75v-2.5ZM2 13.25A2.25 2.25 0 0 1 4.25 11h11.5A2.25 2.25 0 0 1 18 13.25v2.5A2.25 2.25 0 0 1 15.75 18h-11.5A2.25 2.25 0 0 1 2 15.75v-2.5Z" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.752.097 1.126.153A2.212 2.212 0 0 1 18 8.653v4.097A2.25 2.25 0 0 1 15.75 15h-.241l.305 1.984A1.75 1.75 0 0 1 14.084 19H5.915a1.75 1.75 0 0 1-1.73-2.016L4.49 15H4.25A2.25 2.25 0 0 1 2 12.75V8.653c0-1.082.775-2.034 1.874-2.198.374-.056.75-.107 1.126-.153V2.75Zm4.5 0a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 0 1.5h-1ZM6.5 6.5c.31 0 .62.004.928.013l.072.002h5c.308-.01.618-.015.928-.015 0-.172.004-.342.013-.51V2.75a.25.25 0 0 0-.25-.25h-6.5a.25.25 0 0 0-.25.25v3.24c.009.169.013.34.013.51Zm7 2a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.5a.75.75 0 0 1-.75-.75V9.25A.75.75 0 0 1 6.5 8.5h7Z" clipRule="evenodd" />
    </svg>
  );
}

function ChevUpIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
      className={`size-3.5 transition-colors ${active ? 'text-sky-500' : 'text-slate-400 dark:text-slate-500'}`}>
      <path fillRule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
    </svg>
  );
}

function ChevDownIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
      className={`size-3.5 transition-colors ${active ? 'text-sky-500' : 'text-slate-400 dark:text-slate-500'}`}>
      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== col) {
    return (
      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col -space-y-1">
        <ChevUpIcon active={false} />
        <ChevDownIcon active={false} />
      </span>
    );
  }
  return sortDir === 'asc' ? <ChevUpIcon active /> : <ChevDownIcon active />;
}

// ─── Shared panel/menu button style ──────────────────────────────────────────

const toolbarBtnCls = (active?: boolean) =>
  `flex items-center gap-1.5 h-8 px-2.5 rounded text-sm font-medium transition-colors ${
    active
      ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
  }`;

const menuItemCls = 'flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left rounded-lg transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700';
const menuItemDangerCls = 'flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left rounded-lg transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20';

const panelCls = 'absolute top-full mt-1 z-50 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TuiDatagridPage() {
  // ── UI state ──────────────────────────────────────────────────────────────
  const [mode, toggleMode] = useStoredColorMode();
  const isDark = mode === 'dark';
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  // ── Toolbar panel state ───────────────────────────────────────────────────
  const [colPanelOpen,    setColPanelOpen]    = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [actionsOpen,     setActionsOpen]     = useState(false);
  const [searchExpanded,  setSearchExpanded]  = useState(false);
  const [addDialogOpen,   setAddDialogOpen]   = useState(false);
  const [addForm,         setAddForm]         = useState(BLANK_FORM);

  // ── Data state ────────────────────────────────────────────────────────────
  const [rows, setRows]             = useState<Employee[]>(INITIAL_ROWS);
  const [search, setSearch]         = useState('');
  const [sortKey, setSortKey]       = useState<SortKey | null>(null);
  const [sortDir, setSortDir]       = useState<SortDir>('asc');
  const [selection, setSelection]   = useState<Set<number>>(new Set());
  const [page, setPage]             = useState(0);
  const [pageSize, setPageSize]     = useState<5 | 10 | 20>(10);
  const [toast, setToast]           = useState<string | null>(null);
  const [groupByDept, setGroupByDept] = useState(false);

  // ── Column visibility ─────────────────────────────────────────────────────
  const [visibleCols, setVisibleCols] = useState<Set<SortKey>>(
    new Set(COLUMNS.map((c) => c.key)),
  );
  const visibleColDefs = COLUMNS.filter((c) => visibleCols.has(c.key));

  // ── Filters ───────────────────────────────────────────────────────────────
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const activeFilterCount = filters.filter((f) => f.value.trim()).length;

  const addFilter = useCallback(() => {
    setFilters((prev) => [...prev, { id: nextId(), field: 'name', op: 'contains', value: '' }]);
  }, []);

  const updateFilter = useCallback((id: number, patch: Partial<ActiveFilter>) => {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }, []);

  const removeFilter = useCallback((id: number) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // ── Dark mode ──────────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    return () => { document.documentElement.classList.remove('dark'); };
  }, [isDark]);

  // ── Toast auto-dismiss ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Close panels on Escape ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setColPanelOpen(false); setFilterPanelOpen(false); setActionsOpen(false);
      setAddDialogOpen(false);
      setOpenSection(null);
      if (searchExpanded && !search) setSearchExpanded(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchExpanded, search]);

  // ── Derived state ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = rows;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q),
      );
    }
    for (const f of filters) {
      if (!f.value.trim()) continue;
      result = result.filter((r) => applyFilterOp(r[f.field], f.op, f.value));
    }
    return result;
  }, [rows, search, filters]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage   = Math.min(page, totalPages - 1);
  const paged      = sorted.slice(safePage * pageSize, (safePage + 1) * pageSize);
  const pagedIds   = useMemo(() => new Set(paged.map((r) => r.id)), [paged]);

  const allChecked  = pagedIds.size > 0 && [...pagedIds].every((id) => selection.has(id));
  const someChecked = [...pagedIds].some((id) => selection.has(id)) && !allChecked;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const toggleAll = useCallback(() => {
    setSelection((prev) => {
      const next = new Set(prev);
      if (allChecked) pagedIds.forEach((id) => next.delete(id));
      else            pagedIds.forEach((id) => next.add(id));
      return next;
    });
  }, [allChecked, pagedIds]);

  const toggleRow = useCallback((id: number) => {
    setSelection((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
    setPage(0);
  }, [sortKey]);

  const handleDelete = useCallback(() => {
    if (selection.size === 0) { setToast('Select rows first'); return; }
    setRows((prev) => prev.filter((r) => !selection.has(r.id)));
    setToast(`Deleted ${selection.size} record(s)`);
    setSelection(new Set());
    setPage(0);
    setActionsOpen(false);
  }, [selection]);

  const handleRefresh = useCallback(() => {
    setRows(INITIAL_ROWS);
    setSelection(new Set());
    setSearch('');
    setSortKey(null);
    setPage(0);
    setGroupByDept(false);
    setFilters([]);
    setToast('Data refreshed');
    setActionsOpen(false);
  }, []);

  const exportCsv = useCallback(() => {
    const header = visibleColDefs.map((c) => c.label).join(',');
    const body = sorted.map((r) =>
      visibleColDefs.map((c) => {
        const v = String(r[c.key]);
        return v.includes(',') ? `"${v}"` : v;
      }).join(','),
    );
    const blob = new Blob([[header, ...body].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'employees.csv'; a.click();
    URL.revokeObjectURL(url);
    setToast('CSV exported');
    setActionsOpen(false);
  }, [sorted, visibleColDefs]);

  const handlePrint = useCallback(() => {
    window.print();
    setActionsOpen(false);
  }, []);

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
    setToast('Employee added');
    setAddDialogOpen(false);
    setPage(0);
  }, [addForm]);

  const selCount   = selection.size;
  const rangeStart = sorted.length === 0 ? 0 : safePage * pageSize + 1;
  const rangeEnd   = Math.min((safePage + 1) * pageSize, sorted.length);

  // ── Group by dept ─────────────────────────────────────────────────────────
  const groupedPaged = useMemo(() => {
    if (!groupByDept) return null;
    const groups: Record<string, Employee[]> = {};
    for (const row of paged) {
      if (!groups[row.department]) groups[row.department] = [];
      groups[row.department].push(row);
    }
    return groups;
  }, [groupByDept, paged]);

  // ── Row renderer ──────────────────────────────────────────────────────────
  const renderRow = (row: Employee) => {
    const isSelected = selection.has(row.id);
    return (
      <tr
        key={row.id}
        className={`transition-colors ${isSelected ? 'bg-sky-50/80 dark:bg-sky-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'}`}
      >
        <td className="px-4 py-3.5">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleRow(row.id)}
            aria-label={`Select ${row.name}`}
            className="size-4 rounded border-slate-300 dark:border-slate-600 accent-sky-500 focus:ring-sky-500 focus:ring-offset-0 cursor-pointer"
          />
        </td>
        {visibleColDefs.map((col) => (
          <td
            key={col.key}
            className={`px-4 py-3.5 text-slate-700 dark:text-slate-200 whitespace-nowrap ${col.align === 'right' ? 'text-right tabular-nums' : ''}`}
          >
            {col.render ? col.render(row) : String(row[col.key])}
          </td>
        ))}
      </tr>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-dvh bg-slate-50 dark:bg-slate-900">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between gap-4 px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-sky-500">
            <TailwindLogoIcon sx={{ fontSize: 16, color: 'white' }} />
          </div>
          <span className="text-[1.0625rem] font-bold tracking-tight text-slate-900 dark:text-white">Tailwind UI</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navSections.map((section) => (
            <div key={section.id} className="relative">
              <button
                type="button"
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                aria-expanded={openSection === section.id}
                aria-haspopup="true"
                className={`flex items-center gap-1 px-3 py-1.5 text-[0.9375rem] font-medium rounded-md transition-colors ${
                  openSection === section.id
                    ? `${section.accentClass} bg-slate-100 dark:bg-slate-800`
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {section.label}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  className={`size-3.5 transition-transform duration-200 ${openSection === section.id ? 'rotate-180' : ''}`}>
                  <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>

              {openSection === section.id && (
                <div className="absolute left-0 top-full mt-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg z-50">
                  <p className={`px-3 pt-3 pb-1 text-[0.6875rem] font-bold uppercase tracking-widest ${section.accentClass}`}>
                    {section.heading}
                  </p>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenSection(null)}
                      className={`flex flex-col mx-2 mb-1 rounded-lg px-2.5 py-2.5 transition-colors ${section.bgHoverClass}`}
                    >
                      <span className="text-[0.9375rem] font-semibold text-slate-900 dark:text-white">{item.label}</span>
                      <span className="text-[0.8125rem] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 dark:border-slate-800 mx-3 mt-0.5 mb-2 pt-2 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3 text-slate-400">
                      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                    </svg>
                    <span className="text-[0.8125rem] text-slate-400 italic">More pages coming soon</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={toggleMode}
            className="flex size-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex md:hidden size-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Open navigation menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative flex h-full w-72 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-2xl">
            <div className="flex h-[60px] flex-shrink-0 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-md bg-sky-500">
                  <TailwindLogoIcon sx={{ fontSize: 14, color: 'white' }} />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">Tailwind UI</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <XMenuIcon />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3">
              {navSections.map((section, idx) => (
                <div key={section.id}>
                  <p className={`px-4 pb-1.5 text-[0.6875rem] font-bold uppercase tracking-widest ${section.accentClass} ${idx === 0 ? 'pt-2' : 'pt-4'}`}>
                    {section.heading}
                  </p>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex mx-2 flex-col rounded-xl px-3 py-2.5 mb-0.5 transition-colors ${section.bgHoverClass} text-slate-700 dark:text-slate-200`}
                    >
                      <span className="text-[0.9375rem] font-medium">{item.label}</span>
                      <span className="text-[0.8125rem] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                  {idx < navSections.length - 1 && <div className="h-px bg-slate-100 dark:bg-slate-800 mx-3 my-2" />}
                </div>
              ))}
            </nav>
            <div className="border-t border-slate-200 dark:border-slate-700 p-4">
              <button
                onClick={() => { toggleMode(); setDrawerOpen(false); }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click-outside overlays for nav + toolbar panels */}
      {openSection   && <div className="fixed inset-0 z-40" onClick={() => setOpenSection(null)} />}
      {colPanelOpen  && <div className="fixed inset-0 z-40" onClick={() => setColPanelOpen(false)} />}
      {filterPanelOpen && <div className="fixed inset-0 z-40" onClick={() => setFilterPanelOpen(false)} />}
      {actionsOpen   && <div className="fixed inset-0 z-40" onClick={() => setActionsOpen(false)} />}

      {/* ── Main content ── */}
      <main className="flex flex-col flex-1 min-h-0 pt-[60px] pb-[56px] md:pb-2 md:p-4">
        <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-slate-800 md:rounded-2xl md:border border-slate-200 dark:border-slate-700 md:shadow-sm overflow-hidden">

          {/* ── Toolbar ── */}
          <div className="flex items-center gap-0.5 px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">

            {/* 1 — Columns */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setColPanelOpen((o) => !o); setFilterPanelOpen(false); setActionsOpen(false); }}
                className={toolbarBtnCls(colPanelOpen)}
                aria-label="Toggle columns"
              >
                <ColumnsIcon />
                <span className="hidden sm:inline">Columns</span>
              </button>

              {colPanelOpen && (
                <div className={`${panelCls} left-0 w-52 py-1`}>
                  <p className="px-3 pt-2 pb-1.5 text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Show / hide columns
                  </p>
                  {COLUMNS.map((col) => (
                    <label
                      key={col.key}
                      className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={visibleCols.has(col.key)}
                        onChange={() =>
                          setVisibleCols((prev) => {
                            const next = new Set(prev);
                            if (next.has(col.key)) next.delete(col.key); else next.add(col.key);
                            return next;
                          })
                        }
                        className="size-4 rounded border-slate-300 dark:border-slate-600 accent-sky-500 cursor-pointer"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 2 — Filters */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setFilterPanelOpen((o) => !o); setColPanelOpen(false); setActionsOpen(false); }}
                className={toolbarBtnCls(filterPanelOpen)}
                aria-label="Filters"
              >
                <FilterIcon />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center size-4 rounded-full bg-sky-500 text-[0.625rem] font-bold text-white leading-none">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {filterPanelOpen && (
                <div className={`${panelCls} left-0 w-[480px] max-w-[calc(100vw-2rem)] py-2`}>
                  <p className="px-3 pt-1 pb-2 text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Column filters
                  </p>

                  {filters.length === 0 && (
                    <p className="px-3 pb-2 text-sm text-slate-400 dark:text-slate-500">No filters applied.</p>
                  )}

                  <div className="flex flex-col gap-1.5 px-3">
                    {filters.map((f) => {
                      const ops = FIELD_OPS[f.field] ?? FIELD_OPS.name;
                      return (
                        <div key={f.id} className="flex items-center gap-2">
                          {/* Field */}
                          <select
                            value={f.field}
                            onChange={(e) => {
                              const field = e.target.value as SortKey;
                              const firstOp = (FIELD_OPS[field] ?? FIELD_OPS.name)[0].value;
                              updateFilter(f.id, { field, op: firstOp, value: '' });
                            }}
                            className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 min-w-0 flex-1"
                          >
                            {COLUMNS.map((c) => (
                              <option key={c.key} value={c.key}>{c.label}</option>
                            ))}
                          </select>
                          {/* Operator */}
                          <select
                            value={f.op}
                            onChange={(e) => updateFilter(f.id, { op: e.target.value })}
                            className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 min-w-0 w-[90px]"
                          >
                            {ops.map((op) => (
                              <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                          </select>
                          {/* Value */}
                          <input
                            type="text"
                            value={f.value}
                            onChange={(e) => { updateFilter(f.id, { value: e.target.value }); setPage(0); }}
                            placeholder="Value…"
                            className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 min-w-0 flex-1"
                          />
                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeFilter(f.id)}
                            className="flex size-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Remove filter"
                          >
                            <XSmIcon />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                    <button
                      type="button"
                      onClick={addFilter}
                      className="flex items-center gap-1.5 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors"
                    >
                      <PlusIcon />
                      Add filter
                    </button>
                    {filters.length > 0 && (
                      <button
                        type="button"
                        onClick={() => { setFilters([]); setPage(0); }}
                        className="ml-auto text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="mx-0.5 h-5 w-px bg-slate-200 dark:bg-slate-700" />

            {/* 3 — Actions menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setActionsOpen((o) => !o); setColPanelOpen(false); setFilterPanelOpen(false); }}
                className={toolbarBtnCls(actionsOpen)}
                aria-label="Actions"
              >
                <MoreVertIcon />
              </button>

              {actionsOpen && (
                <div className={`${panelCls} left-0 w-56 p-1`}>
                  <p className="px-3 pt-2 pb-1 text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Quick Actions
                  </p>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                  <button className={menuItemCls} onClick={exportCsv}>
                    <ExportIcon /><span>Export CSV</span>
                  </button>
                  <button className={menuItemCls} onClick={() => { setToast('Excel export not implemented'); setActionsOpen(false); }}>
                    <ExportIcon /><span>Export Excel</span>
                  </button>
                  <button className={menuItemCls} onClick={handlePrint}>
                    <PrintIcon /><span>Print</span>
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                  <button className={menuItemCls} onClick={() => { setAddForm(BLANK_FORM); setAddDialogOpen(true); setActionsOpen(false); }}>
                    <PlusIcon /><span>Add Record</span>
                  </button>
                  <button className={menuItemCls} onClick={() => { setGroupByDept((p) => { const next = !p; setToast(next ? 'Grouped by Department' : 'Grouping removed'); return next; }); setActionsOpen(false); }}>
                    <GroupIcon /><span>{groupByDept ? 'Remove Grouping' : 'Group by Department'}</span>
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                  <button className={menuItemDangerCls} onClick={handleDelete}>
                    <TrashIcon /><span>{selCount > 0 ? `Delete Selected (${selCount})` : 'Delete Selected'}</span>
                  </button>
                  <button className={menuItemCls} onClick={handleRefresh}>
                    <RefreshIcon /><span>Refresh Data</span>
                  </button>
                </div>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* 4 — Search */}
            <div className="flex items-center">
              {searchExpanded ? (
                <div className="flex items-center gap-1">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 dark:text-slate-500">
                      <SearchIcon />
                    </div>
                    <input
                      autoFocus
                      type="text"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                      placeholder="Search…"
                      className="h-8 w-52 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 pl-8 pr-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSearch(''); setSearchExpanded(false); setPage(0); }}
                    className="flex size-8 items-center justify-center rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Clear search"
                  >
                    <XSmIcon />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchExpanded(true)}
                  className={toolbarBtnCls(Boolean(search))}
                  aria-label="Search"
                >
                  <SearchIcon />
                  {search && <span className="hidden sm:inline text-xs max-w-[80px] truncate">{search}</span>}
                </button>
              )}
            </div>
          </div>

          {/* ── Table scroll area ── */}
          <div className="flex-1 min-h-0 overflow-auto">
            <table className="w-full text-sm text-left border-collapse" style={{ minWidth: 480 }}>
              <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900/90 backdrop-blur-sm">
                <tr>
                  <th className="w-10 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      ref={(el) => { if (el) el.indeterminate = someChecked; }}
                      onChange={toggleAll}
                      aria-label="Select all rows"
                      className="size-4 rounded border-slate-300 dark:border-slate-600 accent-sky-500 focus:ring-sky-500 focus:ring-offset-0 cursor-pointer"
                    />
                  </th>
                  {visibleColDefs.map((col) => (
                    <th
                      key={col.key}
                      className={`group px-4 py-3 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap ${col.minW} ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSort(col.key)}
                        className={`inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold uppercase tracking-wider transition-colors hover:text-slate-900 dark:hover:text-white ${
                          sortKey === col.key ? 'text-sky-500 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {col.label}
                        <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={visibleColDefs.length + 1} className="px-4 py-16 text-center text-slate-400 dark:text-slate-500 text-sm">
                      No records found
                    </td>
                  </tr>
                ) : groupedPaged ? (
                  Object.entries(groupedPaged).map(([dept, deptRows]) => (
                    <>
                      <tr key={`dept-hdr-${dept}`}>
                        <td
                          colSpan={visibleColDefs.length + 1}
                          className="px-4 py-1.5 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 text-[0.8125rem] font-semibold"
                        >
                          {dept} <span className="font-normal text-sky-500 dark:text-sky-400">({deptRows.length})</span>
                        </td>
                      </tr>
                      {deptRows.map(renderRow)}
                    </>
                  ))
                ) : (
                  paged.map(renderRow)
                )}
              </tbody>
            </table>
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-end gap-4 px-4 py-2.5 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-800">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value) as 5 | 10 | 20); setPage(0); }}
                className="rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm py-0.5 px-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <span className="text-sm tabular-nums text-slate-500 dark:text-slate-400">
              {sorted.length === 0 ? '0–0 of 0' : `${rangeStart}–${rangeEnd} of ${sorted.length}`}
            </span>

            <div className="flex items-center gap-0.5">
              <button
                type="button"
                disabled={safePage === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="flex size-8 items-center justify-center rounded text-slate-500 dark:text-slate-400 disabled:opacity-30 enabled:hover:bg-slate-100 dark:enabled:hover:bg-slate-700 enabled:hover:text-slate-700 dark:enabled:hover:text-white transition-colors"
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages - 1}
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                className="flex size-8 items-center justify-center rounded text-slate-500 dark:text-slate-400 disabled:opacity-30 enabled:hover:bg-slate-100 dark:enabled:hover:bg-slate-700 enabled:hover:text-slate-700 dark:enabled:hover:text-white transition-colors"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ── Mobile bottom navigation ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex h-14 items-center justify-around bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        {([
          { href: '/',      label: 'Home',     active: false,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" /><path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" /></svg> },
          { href: '/mui',   label: 'MUI',      active: false, icon: <MuiLogoIcon sx={{ fontSize: 20 }} /> },
          { href: '/tui',   label: 'Tailwind', active: true,  icon: <TailwindLogoIcon sx={{ fontSize: 20 }} /> },
          { href: '/apple', label: 'Glass',    active: false, icon: <AppleLogoIcon sx={{ fontSize: 20 }} /> },
        ] as { href: string; label: string; active: boolean; icon: React.ReactNode }[]).map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 transition-colors ${
              tab.active ? 'text-sky-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            {tab.icon}
            <span className="text-[0.625rem] font-medium leading-none">{tab.label}</span>
          </a>
        ))}
      </div>

      {/* ── Add Record Dialog ── */}
      {addDialogOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setAddDialogOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Add Employee</h2>
              <button
                type="button"
                onClick={() => setAddDialogOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close"
              >
                <XMenuIcon />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4 flex flex-col gap-3">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  autoFocus
                  type="text"
                  value={addForm.name}
                  placeholder="e.g. Jane Smith"
                  onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddSubmit(); }}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              {/* Department + Role */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Department</label>
                  <select
                    value={addForm.department}
                    onChange={(e) => setAddForm((p) => ({ ...p, department: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/60 text-slate-900 dark:text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                  >
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Role</label>
                  <input
                    type="text"
                    value={addForm.role}
                    placeholder="e.g. Sr. Engineer"
                    onChange={(e) => setAddForm((p) => ({ ...p, role: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Salary + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Salary</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500 text-sm pointer-events-none">$</span>
                    <input
                      type="number"
                      value={addForm.salary}
                      placeholder="100000"
                      onChange={(e) => setAddForm((p) => ({ ...p, salary: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Status</label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm((p) => ({ ...p, status: e.target.value as Employee['status'] }))}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/60 text-slate-900 dark:text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Start Date + Performance */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={addForm.startDate}
                    onChange={(e) => setAddForm((p) => ({ ...p, startDate: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/60 text-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Performance (0–5)</label>
                  <input
                    type="number"
                    value={addForm.performance}
                    placeholder="4.0"
                    min={0}
                    max={5}
                    step={0.1}
                    onChange={(e) => setAddForm((p) => ({ ...p, performance: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-100 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setAddDialogOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSubmit}
                disabled={!addForm.name.trim()}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 bg-slate-800 dark:bg-slate-700 text-white text-sm font-medium rounded-full shadow-xl whitespace-nowrap pointer-events-none">
          {toast}
        </div>
      )}

    </div>
  );
}
