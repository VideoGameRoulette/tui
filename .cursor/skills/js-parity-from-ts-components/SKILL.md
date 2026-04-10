---
name: js-parity-from-ts-components
description: Produces JavaScript component versions that stay behaviorally and visually identical to canonical TypeScript MUI components. Use when creating or updating JS/JSX parity files from TS/TSX sources.
---

# JavaScript Parity from TypeScript Components

## When to use

Use this skill when a TS component already exists and a matching JS version is required.

## Instructions

1. Treat TS/TSX files as canonical source.
2. Mirror props, defaults, rendered structure, and component states in JS.
3. Preserve responsive behavior and accessibility semantics.
4. Add lightweight runtime guards when TS previously enforced constraints.
5. Keep naming and exports aligned so migration between TS and JS is simple.
6. Document any unavoidable delta immediately.

## Output format

```markdown
TS source: <path>
JS target: <path>

Parity checks:
- Props/defaults: <match status>
- Markup/styling: <match status>
- States/responsive/a11y: <match status>

Deltas:
- <none or explicit difference>
```

## Utility script

Use `scripts/compare_component_exports.py` to compare exports between TS and JS component files:

```bash
python .cursor/skills/js-parity-from-ts-components/scripts/compare_component_exports.py --ts "frontend/components/FeatureCard.tsx" --js "frontend/components/FeatureCard.jsx"
```
