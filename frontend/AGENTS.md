<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:component-tracker -->
# Component build tracker

`../mui-tailwind-components.md` (one level up from this directory) is the source of truth for which MUI components have been built, where they live, and their completion status.

**Rules:**
- When you build or complete a component, immediately update the tracker: flip `[ ]` → `[x]` (or `[~]` for in-progress), update the Notes column with the subfolder path, and add/update the Session Notes entry with the file list.
- When you finish extracting inline components into `components/mui-tui/*` subfolders, update the tracker to reflect the new location.
- All components belong in `frontend/src/components/mui-tui/<category>/` as standalone files with a barrel `index.ts` export.
- Update the **Progress** count at the top of the tracker whenever a component moves to `[x]`.
<!-- END:component-tracker -->
