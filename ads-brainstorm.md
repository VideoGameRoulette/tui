# Ads System — Brainstorm & Plan

> **Scope:** Multi-organization, multi-monitor digital signage system with unique per-monitor player URLs and a unified management UI. No code changes in this document — this is the planning phase.

---

## Current State

| Route | What it does |
|---|---|
| `/ads` | Full-screen player — shuffles a hardcoded pool of images + videos |
| `/ads/builder` | Slide builder — persists to `localStorage` under the key `ads-builder-v1`, exports JSON |

Both are self-contained and stateless. There is no concept of organizations, monitors, or named presentations yet.

---

## Problem Statement

The building has multiple screens (monitors) in different rooms/locations. Each screen should display its own curated slide playlist. Staff need to be able to:

1. Navigate to a simple management UI
2. Pick an organization (tenant/client/department)
3. Pick a monitor within that organization
4. Open the slide builder scoped to that monitor
5. Save — and have the change reflected on the physical display immediately

Each physical monitor points its browser to a stable URL and stays there. That URL must resolve to exactly the right slide playlist for that screen.

---

## URL Architecture

### Player URLs (displayed on physical monitors — never change)

```
/ads/play/[orgSlug]/[monitorSlug]
```

Examples:
- `/ads/play/acme-corp/lobby-main`
- `/ads/play/acme-corp/break-room-east`
- `/ads/play/vertex-gym/front-desk`

**Why slugs instead of UUIDs?**
- Readable in browser address bar
- Easy to type on a kiosk if needed
- Stable even if internal IDs change
- Human-verifiable: staff can confirm the right playlist is loaded

### Management URLs (staff-facing)

```
/ads/manage                              → Dashboard: list all organizations
/ads/manage/[orgSlug]                    → Org detail: list monitors, org settings
/ads/manage/[orgSlug]/[monitorSlug]      → Monitor builder: slide editor for this monitor
```

### Compatibility

- The existing `/ads` route stays as a demo/testing player (hardcoded pool)
- The existing `/ads/builder` stays as a general-purpose builder (no org/monitor binding)

---

## Data Model

### Organization

```
{
  id:          string (uuid)
  slug:        string (url-safe, unique globally)
  name:        string
  description: string | null
  logoUrl:     string | null
  createdAt:   ISO timestamp
  monitors:    Monitor[]
}
```

### Monitor

```
{
  id:           string (uuid)
  slug:         string (url-safe, unique within org)
  name:         string            // "Lobby Main Screen"
  location:     string | null     // "1st Floor - Main Entrance"
  orientation:  'landscape' | 'portrait'
  aspectRatio:  '16:9' | '9:16' | '4:3' | '21:9'
  orgId:        string
  presentation: Presentation      // the slide deck for this monitor
  updatedAt:    ISO timestamp
}
```

### Presentation (slide deck — same shape as the existing builder)

```
{
  name:      string
  loop:      boolean
  shuffle:   boolean
  slides:    AdSlide[]            // re-uses existing types.ts shape exactly
}
```

The existing `AdSlide` and `AdTextElement` types from `builder/types.ts` are used unchanged — the org/monitor layer is purely a wrapper.

---

## Storage Strategy

### Backend — Django + SQLite3 (local dev → upgradeable)

The backend is a **Django** project in the `/backend` folder. SQLite3 is the database for local development — swappable to PostgreSQL for production with a single settings change.

- Django REST Framework exposes JSON API endpoints consumed by the Next.js frontend
- Django's ORM owns all org/monitor/slide data — localStorage is only used for the builder's transient draft state (undo stack, in-progress edits before publish)
- SQLite3 file lives at `backend/db.sqlite3` (git-ignored)

### Django apps to add

| App | Responsibility |
|---|---|
| `orgs` | Organization model: id, slug, name, description, logo |
| `monitors` | Monitor model: id, slug, name, location, orientation, aspect_ratio, org FK |
| `presentations` | Presentation + Slide models linked to a monitor; stores slide JSON |

> All three apps will be added to the existing `/backend` Django project as we build them out.

### API surface (Django REST Framework)

```
GET  /api/orgs/                           list all orgs
POST /api/orgs/                           create org
GET  /api/orgs/[orgSlug]/                 org detail
PUT  /api/orgs/[orgSlug]/                 update org

GET  /api/orgs/[orgSlug]/monitors/            list monitors
POST /api/orgs/[orgSlug]/monitors/            create monitor
GET  /api/orgs/[orgSlug]/monitors/[slug]/     monitor detail + presentation
PUT  /api/orgs/[orgSlug]/monitors/[slug]/     update monitor settings
DELETE /api/orgs/[orgSlug]/monitors/[slug]/   delete monitor

GET  /api/orgs/[orgSlug]/monitors/[slug]/slides/    get slide deck
PUT  /api/orgs/[orgSlug]/monitors/[slug]/slides/    publish slide deck (full replace)
```

### Player refresh strategy

The player page polls the monitor's slide endpoint using `updatedAt` — if the timestamp changed since last load, it soft-reloads the slide deck without interrupting the current slide.

| Mechanism | Detail |
|---|---|
| Polling interval | 30 s (configurable per monitor in Django admin) |
| Change detection | Compare `updatedAt` from API response vs last-seen value |
| Reload behavior | Finish current slide → swap playlist in memory |

---

## Management UI — Screen by Screen

### 1. `/ads/manage` — Dashboard

**Purpose:** Entry point for staff. Shows all organizations at a glance.

**Content:**
- Header: "Signage Manager" + "New Organization" button
- Grid of org cards, each showing:
  - Org logo / initials avatar
  - Org name
  - Monitor count (e.g., "4 monitors")
  - Last updated timestamp
  - Quick-action: "Open" → goes to `/ads/manage/[orgSlug]`
- Empty state: friendly prompt to create first organization

### 2. `/ads/manage/[orgSlug]` — Org Detail

**Purpose:** See all monitors for this org; manage org settings.

**Content:**
- Breadcrumb: Manage → [Org Name]
- Org header: logo, name, edit button
- "New Monitor" button
- Monitor cards grid, each showing:
  - Monitor name + location
  - Orientation badge (Landscape / Portrait)
  - Slide count + total duration
  - Last updated
  - Player URL + copy-link button
  - "Edit Slides" button → goes to `/ads/manage/[orgSlug]/[monitorSlug]`
  - "Open Player" button → opens `/ads/play/[orgSlug]/[monitorSlug]` in new tab
- "Danger zone" section: delete org (requires confirmation)

### 3. `/ads/manage/[orgSlug]/[monitorSlug]` — Monitor Builder

**Purpose:** Full slide editor scoped to this specific monitor.

**Content:** The existing `AdBuilderPage` component, with these additions:
- Breadcrumb: Manage → [Org] → [Monitor Name]
- Top-right: "Copy player link" button (copies the `/ads/play/…` URL)
- Top-right: "Open player" button (opens player in new tab)
- Save/Publish flow: instead of JSON export, writes to the org/monitor storage key
- Optional: QR code modal for the player URL (useful for physical setup)
- Monitor orientation badge — canvas aspect ratio adjusts to match (16:9 vs 9:16)

---

## Player UI — `/ads/play/[orgSlug]/[monitorSlug]`

**Purpose:** Full-screen display running 24/7 on the physical kiosk.

**Behavior:**
- Loads slide data from storage on mount
- Plays slides using the existing player engine (progress bar, dot nav, pause/play)
- Polls for updates every N seconds (configurable per monitor); if `updatedAt` changed → reload slides without interrupting current slide if possible
- Keyboard/touch controls remain for testing (hide in kiosk mode if needed)
- Shows org name + monitor name in a corner overlay (toggleable, useful for setup verification)
- Graceful empty state: shows a placeholder slide if the monitor has no slides yet

---

## Create / Edit Flows

### New Organization

Modal dialog (no full page needed):
1. Name field (auto-generates slug, user can override)
2. Optional: description, logo upload
3. Save → creates org → navigates to `/ads/manage/[newOrgSlug]`

### New Monitor

Modal dialog from the org detail page:
1. Name field
2. Location description (optional)
3. Orientation selector: Landscape / Portrait
4. Aspect ratio selector
5. Slug field (auto-generated from name, user can override)
6. Save → creates monitor with empty presentation → navigates to builder

### Edit Monitor Settings

Accessible from a settings icon on the monitor card or from within the builder. Opens a drawer/modal:
- Rename monitor
- Change location
- Change orientation (updates builder canvas aspect ratio)
- Change slug (updates player URL — show warning that existing links will break)
- Delete monitor

---

## Unique Link System — Key Details

### Slug rules
- Lowercase alphanumeric + hyphens only
- Org slugs: globally unique (enforced at creation)
- Monitor slugs: unique within org
- Max 64 characters each

### Slug generation
- Default: kebab-case from name, e.g., "Lobby Main" → `lobby-main`
- Collision resolution: append `-2`, `-3`, etc.
- User can override before saving

### Shareable player URL format
```
https://[domain]/ads/play/[orgSlug]/[monitorSlug]
```

This is the URL that goes into the kiosk browser's startup page. It never changes unless the admin deliberately renames the slug.

### QR code
Generate client-side (e.g., via `qrcode.react`) for the player URL. Display in a modal from the monitor card or builder header. Staff can scan with a phone to quickly verify the correct content is loading.

---

## Key User Flows

### Flow A — Admin sets up a new monitor for the first time

1. `/ads/manage` → click "New Organization" → fill name → save
2. Org detail page → click "New Monitor" → fill name + location → save
3. Builder opens for the new (empty) monitor
4. Admin builds slides, clicks "Save to Monitor"
5. Admin clicks "Copy player link" and pastes URL into kiosk browser

### Flow B — Updating an existing monitor's slides

1. `/ads/manage` → click org → click monitor's "Edit Slides"
2. Modify slides in builder
3. Click "Publish" (replaces stored slides for that monitor)
4. Player on physical screen detects change on next poll and soft-reloads slides

### Flow C — Staff checks which slides a monitor is running

1. Visit `/ads/manage/[orgSlug]/[monitorSlug]`
2. Click "Open Player" → new tab shows full-screen player exactly as the kiosk sees it

### Flow D — Multiple orgs on same building's server

Each org has its own namespace. Staff for Org A can only manage their monitors; Org B's monitors are invisible to them. (Auth/RBAC is out of scope for Phase 1 — single admin account implied.)

---

## Nav / Routing Changes

Add to `nav.ts` `NAV_SECTIONS` (or a separate admin nav):

```
/ads/manage          → "Manage Signage"
/ads/play/…/…        → no nav entry (accessed via copy-link, not global nav)
```

The existing `/ads` and `/ads/builder` entries stay unchanged.

---

## Open Questions (to resolve before coding)

1. **Storage in Phase 1:** Use `localStorage` only (builder + player must be same browser), or immediately go to a Next.js API route writing JSON files to disk so the kiosk can pull remotely?

2. **Auth:** Is this an internal tool with no auth (local network only), or do we add Django's built-in session/token auth to protect the `/ads/manage` routes?

3. **Monitor orientation:** Do we need portrait (9:16) support in the canvas now, or is landscape-only fine for v1?

4. **Image storage:** Currently the builder stores images as base64 data URLs in localStorage. Django's `MEDIA_ROOT` + `FileField` is the right solution — images upload to `backend/media/` and the API returns a URL the player fetches directly. Phase 2 work.

5. **Player refresh cadence:** 30 s polling is probably fine. Do we want SSE/WebSocket for instant pushes, or is polling acceptable?

6. **Slide count limits:** No limit implied. Should we cap slides per monitor for performance (e.g., 50 slides max)?

7. **Kiosk mode:** Should the player suppress the address bar / hide OS chrome? That's handled by the browser itself (kiosk mode flag), not our app — but worth noting in setup docs.

---

## Phased Implementation Roadmap

### Phase 1 — Core multi-monitor support (localStorage)

- [ ] Data types: `Organization`, `Monitor`, `Presentation` wrapper
- [ ] Storage helpers keyed by org+monitor slug
- [ ] `/ads/manage` dashboard page
- [ ] `/ads/manage/[orgSlug]` org detail + monitor grid
- [ ] New Org modal
- [ ] New Monitor modal
- [ ] `/ads/manage/[orgSlug]/[monitorSlug]` — builder wired to org/monitor storage
- [ ] `/ads/play/[orgSlug]/[monitorSlug]` — player loaded from org/monitor storage
- [ ] "Copy player link" and "Open Player" buttons

### Phase 2 — Django backend wiring

- [ ] `orgs` app: Organization model + DRF serializer + views
- [ ] `monitors` app: Monitor model + DRF serializer + views
- [ ] `presentations` app: Presentation + Slide models + publish endpoint
- [ ] CORS configured so Next.js dev server can call Django
- [ ] Player polling with `updatedAt` change detection
- [ ] Image/media upload via Django `MEDIA_ROOT` + API endpoint

### Phase 3 — Polish

- [ ] QR code modal for player URLs
- [ ] "Publish" confirmation flow (diff preview before overwriting)
- [ ] Monitor settings drawer (rename, relocate, delete)
- [ ] Toast notifications for save/publish success
- [ ] Org logo upload

---

## Component / File Map (tentative)

### Frontend (Next.js — `frontend/`)

```
src/app/ads/
├── page.tsx                          existing: hardcoded demo player
├── manage/
│   ├── page.tsx                      org dashboard
│   ├── [orgSlug]/
│   │   ├── page.tsx                  org detail / monitor grid
│   │   └── [monitorSlug]/
│   │       └── page.tsx              builder scoped to monitor
└── play/
    └── [orgSlug]/
        └── [monitorSlug]/
            └── page.tsx              player for this monitor

src/lib/
├── ads-api.ts                        fetch wrappers for Django REST endpoints
└── ads-types.ts                      Organization, Monitor, Presentation TS types

src/components/ads/
├── OrgCard.tsx
├── MonitorCard.tsx
├── NewOrgModal.tsx
└── NewMonitorModal.tsx
```

### Backend (Django — `backend/`)

Starting from the existing `/backend` folder; the following apps will be added:

```
backend/
├── manage.py
├── db.sqlite3                        (git-ignored, local dev database)
├── backend/                          Django project settings
│   ├── settings.py                   DATABASES = sqlite3 locally
│   ├── urls.py                       includes app routers
│   └── wsgi.py
├── orgs/                             app: Organization
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── monitors/                         app: Monitor
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
└── presentations/                    app: Presentation + Slide
    ├── models.py
    ├── serializers.py
    ├── views.py
    └── urls.py
```

---

*Last updated: 2026-05-21. Backend: Django + SQLite3 (existing `/backend` folder). No code written yet — this document is the planning artifact.*
