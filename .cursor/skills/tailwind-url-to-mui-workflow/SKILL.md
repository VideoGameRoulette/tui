---
name: tailwind-url-to-mui-workflow
description: Builds reusable Next.js components by converting a Tailwind reference URL into 1:1 Material UI output. Use when the user provides Tailwind component references, wants MUI recreation, or asks for section-by-section component implementation.
---

# Tailwind URL to MUI Workflow

## When to use

Use this skill when the user gives a Tailwind component URL or screenshot-equivalent reference and asks for MUI implementations with the same rendered result.

## Instructions

1. Identify one component variant from the reference and implement only that variant first.
2. Recreate Tailwind output in MUI with `sx`, MUI props, and theme tokens.
3. Match layout, spacing, typography, colors, radius, shadows, and state styles.
4. Ensure responsive behavior aligns with the reference.
5. Build TypeScript first, then keep JavaScript parity work queued.
6. Note any unavoidable differences explicitly.

## Output format

Use this structure in responses:

```markdown
Component: <name>
Reference: <tailwind-url>

Implemented:
- <what was built>

Parity notes:
- <exactly matched details>
- <known deltas if any>

Next:
- <next component variant>
```

## Utility script

Use `scripts/create_component_task.py` to generate a reusable task checklist:

```bash
python .cursor/skills/tailwind-url-to-mui-workflow/scripts/create_component_task.py --name "FeatureCard" --url "https://example.com"
```
