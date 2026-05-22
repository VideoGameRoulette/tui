# Material UI Forms & Inputs Components

Reusable form primitives and composite inputs. All are client components. Theme-aware via MUI semantic tokens.

---

## File Structure

| File | Purpose |
|------|---------|
| `ContactForm.tsx` | Full contact form — name, email, subject (optional), message; client-side validation; success state |
| `AppInput.tsx` | Thin MUI `TextField` wrapper — all standard TextField props pass through |
| `AppTextarea.tsx` | `TextField` with `multiline` forced on; `minRows` / `maxRows` props |
| `AppSelect.tsx` | `FormControl` + `InputLabel` + `Select` + `MenuItem` wrapper; typed `options[]` |
| `AppCheckbox.tsx` | Single `AppCheckbox` + multi-select `AppCheckboxGroup` from one file |
| `AppRadioGroup.tsx` | `FormControl` + `RadioGroup` + `FormControlLabel`; `row` layout support |
| `AppSwitch.tsx` | `Switch` + `FormControlLabel`; `helperText`, `labelPlacement`, all MUI sizes/colors |
| `FileUpload.tsx` | Hidden `<input type="file">` with optional drag-and-drop zone; file list with remove |
| `SearchInput.tsx` | `TextField` with `SearchIcon` adornment + clear button; controlled or uncontrolled |
| `AppDatePicker.tsx` | MUI X `DatePicker` wrapped with `LocalizationProvider` (AdapterDayjs) |
| `FormField.tsx` | Status-aware field wrapper — `default\|error\|success\|warning` with color + icon |
| `index.ts` | Barrel export (all components + prop types) |
| `forms.md` | This file |

**Peer dependencies:** `@mui/x-date-pickers`, `dayjs` (required for `AppDatePicker`)

---

## Component API

### `ContactForm`
```tsx
<ContactForm
  showSubject
  submitLabel="Send"
  onSubmit={async (data) => await api.sendContact(data)}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(data: ContactFormData) => void \| Promise<void>` | — | Called with validated form data |
| `showSubject` | `boolean` | `false` | Adds a Subject text field |
| `submitLabel` | `string` | `'Send Message'` | Button label |
| `successMessage` | `string` | `"Thanks! We'll be in touch soon."` | Replaces form on success |
| `sx` | `SxProps` | — | MUI sx passthrough |

`ContactFormData`: `{ name, email, subject?, message }`

---

### `AppInput`
```tsx
<AppInput label="First name" required error helperText="Required" />
```
Accepts all MUI `TextFieldProps` — no additional props.

---

### `AppTextarea`
```tsx
<AppTextarea label="Bio" minRows={3} maxRows={8} fullWidth />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minRows` | `number` | `4` | Minimum visible rows |
| `maxRows` | `number` | — | Maximum before scroll |
| `...rest` | `TextFieldProps` (minus `multiline`) | — | All TextField props |

---

### `AppSelect`
```tsx
<AppSelect
  label="Country"
  options={[{ value: 'us', label: 'United States' }]}
  value={country}
  onChange={setCountry}
  placeholder="Pick one"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | required | `{ value, label, disabled? }[]` |
| `value` | `string \| number` | `''` | Controlled value |
| `onChange` | `(value) => void` | — | Change handler |
| `label` | `string` | — | Floating label |
| `placeholder` | `string` | — | Disabled first option |
| `error` | `boolean` | — | Error state |
| `helperText` | `string` | — | Helper / error message |
| `fullWidth` | `boolean` | `true` | Full container width |
| `size` | `'small' \| 'medium'` | `'medium'` | Input size |

---

### `AppCheckbox`
```tsx
<AppCheckbox label="I agree to the terms" checked={agreed} onChange={setAgreed} />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Checkbox label |
| `checked` | `boolean` | — | Controlled checked state |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `indeterminate` | `boolean` | — | Indeterminate state |
| `disabled` | `boolean` | — | Disabled |
| `size` | `'small' \| 'medium'` | `'medium'` | Size |

### `AppCheckboxGroup`
```tsx
<AppCheckboxGroup
  label="Interests"
  options={[{ value: 'code', label: 'Coding' }]}
  value={selected}
  onChange={setSelected}
  row
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CheckboxGroupOption[]` | required | `{ value, label, disabled? }[]` |
| `value` | `string[]` | `[]` | Controlled selected values |
| `onChange` | `(values: string[]) => void` | — | Change handler |
| `label` | `string` | — | Group legend |
| `row` | `boolean` | `false` | Horizontal layout |
| `error` | `boolean` | — | Error state |
| `helperText` | `string` | — | Helper / error message |

---

### `AppRadioGroup`
```tsx
<AppRadioGroup
  label="Plan"
  options={[{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }]}
  value={plan}
  onChange={setPlan}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `RadioOption[]` | required | `{ value, label, disabled? }[]` |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `label` | `string` | — | Group legend |
| `row` | `boolean` | `false` | Horizontal layout |
| `error` | `boolean` | — | Error state |
| `helperText` | `string` | — | Helper / error message |
| `size` | `'small' \| 'medium'` | `'medium'` | Radio size |

---

### `AppSwitch`
```tsx
<AppSwitch label="Dark mode" checked={dark} onChange={setDark} />
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text (omit for unlabelled switch) |
| `checked` | `boolean` | — | Controlled checked state |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `helperText` | `string` | — | Helper text below |
| `labelPlacement` | `'start' \| 'end' \| 'top' \| 'bottom'` | `'end'` | Label position |
| `size` | `'small' \| 'medium'` | `'medium'` | Switch size |
| `color` | MUI color | `'primary'` | Track/thumb color |

---

### `FileUpload`
```tsx
<FileUpload
  accept="image/*"
  multiple
  maxSizeMb={5}
  dragDrop
  label="Upload images"
  onFilesChange={setFiles}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | — | MIME type filter (e.g. `'image/*'`) |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `maxSizeMb` | `number` | — | Per-file size limit in MB |
| `dragDrop` | `boolean` | `true` | Show drag-and-drop zone (vs. plain button) |
| `buttonLabel` | `string` | `'Choose File'` | Button label when `dragDrop=false` |
| `label` | `string` | — | Section label above the zone |
| `onFilesChange` | `(files: File[]) => void` | — | Called whenever file list changes |

---

### `SearchInput`
```tsx
<SearchInput
  placeholder="Search products…"
  onSearch={handleSearch}
  onClear={clearResults}
  fullWidth
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | `''` | Uncontrolled initial value |
| `onChange` | `(value: string) => void` | — | Fires on every keystroke |
| `onSearch` | `(value: string) => void` | — | Fires on Enter or search icon click |
| `onClear` | `() => void` | — | Fires when × is clicked |
| `placeholder` | `string` | `'Search…'` | Input placeholder |
| `size` | `'small' \| 'medium'` | `'small'` | Input size |
| `fullWidth` | `boolean` | `false` | Full container width |

---

### `AppDatePicker`
```tsx
<AppDatePicker
  label="Start date"
  value={date}
  onChange={setDate}
  format="MM/DD/YYYY"
  fullWidth
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Dayjs \| null` | — | Controlled date value |
| `onChange` | `(value: Dayjs \| null) => void` | — | Change handler |
| `label` | `string` | `'Date'` | Field label |
| `format` | `string` | `'MM/DD/YYYY'` | Display format |
| `minDate` | `Dayjs` | — | Earliest selectable date |
| `maxDate` | `Dayjs` | — | Latest selectable date |
| `error` | `boolean` | — | Error state |
| `helperText` | `string` | — | Helper / error message |
| `fullWidth` | `boolean` | `false` | Full container width |
| `size` | `'small' \| 'medium'` | `'medium'` | Input size |

> The component self-contains `LocalizationProvider`. For apps with many date pickers, hoist `LocalizationProvider` to the layout instead.

---

### `FormField`
```tsx
<FormField label="Password" status="error" helperText="Must be at least 8 characters">
  <TextField type="password" fullWidth />
</FormField>

<FormField label="Username" status="success" helperText="Available!">
  <TextField fullWidth />
</FormField>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label above the child |
| `helperText` | `string` | — | Status-colored helper text with icon |
| `status` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Validation state |
| `required` | `boolean` | — | Adds required marker to label |
| `disabled` | `boolean` | — | Disables all inner controls |
| `fullWidth` | `boolean` | `true` | Full container width |
| `children` | `ReactNode` | required | The form element(s) to wrap |

---

## Theme Awareness

- All components use MUI semantic tokens — dark mode is automatic.
- Error/success/warning colors resolve via `error.main`, `success.main`, `warning.main`.
- `FormField` uses `FormControl`'s `error` prop to propagate error state to nested MUI inputs automatically (no manual wiring needed).
