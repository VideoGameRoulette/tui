# Material UI Blog & CMS-Specific Components

Content presentation components for blog posts, articles, and CMS-driven pages.

---

## File Structure

| File | Purpose |
|------|---------|
| `PostHeader.tsx` | Article header — category chip, h1 title, excerpt, author/date/readTime row, hero image |
| `AuthorBioBlock.tsx` | Author card — Avatar + name + role + bio + social link buttons; `card` or `inline` variant |
| `RelatedPosts.tsx` | Grid or horizontal row of `BlogPostCard` components; imports from `../cards/` |
| `TableOfContents.tsx` | Heading index with `IntersectionObserver` scroll tracking; sticky sidebar option |
| `TagBadge.tsx` | MUI `Chip` wrapper (`TagBadge`) + `TagBadgeGroup` for collections |
| `ShareButtons.tsx` | Social share popup + clipboard copy; inline SVG brand icons; icon or outlined variant |
| `CommentSection.tsx` | Threaded comment list (1 level of replies) + validated submit form |
| `index.ts` | Barrel export (all components + prop types) |
| `blog.md` | This file |

---

## Component API

### `PostHeader`
```tsx
<PostHeader
  category="Engineering"
  categoryHref="/blog/engineering"
  title="How we scaled to 10 million users"
  excerpt="The infrastructure decisions that kept us stable through unexpected growth."
  author={{ name: 'James Wu', avatarUrl: '/avatars/james.jpg', href: '/authors/james' }}
  date="May 21, 2026"
  readTime="8 min read"
  heroImageUrl="/images/post-hero.jpg"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | `h1` at display size (2–3.25rem responsive) |
| `excerpt` | `string` | — | Subtitle paragraph below title |
| `category` | `string` | — | Category `Chip` (primary color) above title |
| `categoryHref` | `string` | — | Makes category chip a link |
| `author` | `{ name, avatarUrl?, href? }` | — | Author row with Avatar |
| `date` | `string` | — | Publication date with calendar icon |
| `readTime` | `string` | — | e.g. `"8 min read"` with clock icon |
| `heroImageUrl` | `string` | — | Hero image (16/9 aspect ratio, rounded) |
| `heroImageAlt` | `string` | title | Hero image alt text |

---

### `AuthorBioBlock`
```tsx
<AuthorBioBlock
  name="James Wu"
  avatarUrl="/avatars/james.jpg"
  role="Staff Engineer"
  bio="James has been building distributed systems for 12 years..."
  socialLinks={[
    { icon: <TwitterIcon />, href: 'https://twitter.com/jameswu', label: 'Twitter' },
  ]}
  followHref="https://twitter.com/jameswu"
  variant="card"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Author name |
| `avatarUrl` | `string` | — | Avatar image URL |
| `role` | `string` | — | Job title (primary color) |
| `bio` | `string` | — | Short biography |
| `socialLinks` | `{ icon, href, label }[]` | `[]` | Social icon buttons |
| `followHref` | `string` | — | "Follow" button link |
| `followLabel` | `string` | `'Follow'` | Follow button text |
| `variant` | `'card' \| 'inline'` | `'card'` | `card`: bordered Paper; `inline`: no border |

---

### `RelatedPosts`
```tsx
<RelatedPosts
  posts={relatedArticles}
  title="You might also like"
  cols={3}
  layout="grid"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `posts` | `BlogPostCardProps[]` | 3 defaults | Posts to display |
| `title` | `string` | `'Related Posts'` | Section heading |
| `layout` | `'grid' \| 'row'` | `'grid'` | `row`: horizontal scroll; `grid`: responsive columns |
| `cols` | `1 \| 2 \| 3` | `3` | Max grid columns (responsive: sm=min(cols,2), xs=1) |

Uses `BlogPostCard` from `../cards/` — no duplicate logic.

---

### `TableOfContents`
```tsx
<TableOfContents
  items={[
    { id: 'intro', label: 'Introduction', level: 1 },
    { id: 'setup', label: 'Setup', level: 1 },
    { id: 'config', label: 'Configuration', level: 2 },
    { id: 'conclusion', label: 'Conclusion', level: 1 },
  ]}
  sticky
  stickyTop={96}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TOCItem[]` | required | `{ id, label, level? }[]` — `id` must match heading element's `id` attribute |
| `title` | `string` | `'On this page'` | Label above the list |
| `sticky` | `boolean` | `true` | `position: sticky` with `top: stickyTop` |
| `stickyTop` | `number` | `80` | Sticky offset in px (accounts for fixed navbar) |
| `trackScroll` | `boolean` | `true` | Use `IntersectionObserver` to highlight active heading |

Active item: left border turns `primary.main`, text color changes to `primary.main`, weight 600. Click: `scrollIntoView({ behavior: 'smooth' })` + `history.pushState` to update URL hash.

---

### `TagBadge` / `TagBadgeGroup`
```tsx
<TagBadge label="TypeScript" color="primary" href="/tags/typescript" />

<TagBadgeGroup
  tags={['React', 'Next.js', 'MUI']}
  color="default"
  variant="outlined"
/>

<TagBadgeGroup
  tags={[
    { label: 'Engineering', color: 'primary' },
    { label: 'Design', color: 'secondary' },
  ]}
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required (`TagBadge`) | Chip label |
| `color` | `ChipProps['color']` | `'default'` | MUI color token |
| `href` | `string` | — | Makes chip a link |
| `onClick` | `() => void` | — | Click handler |
| `size` | `'small' \| 'medium'` | `'small'` | Chip size |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Chip style |

`TagBadgeGroup` accepts `tags` as `string[]` (uses group-level `color/size/variant`) or `TagBadgeProps[]` (per-tag overrides).

---

### `ShareButtons`
```tsx
<ShareButtons
  url="https://example.com/post"
  title="How we scaled to 10M users"
  networks={['twitter', 'linkedin', 'copy']}
  variant="outlined"
  label="Share:"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | `window.location.href` | URL to share |
| `title` | `string` | `document.title` | Share text for Twitter/Reddit |
| `networks` | `ShareNetwork[]` | `['twitter','linkedin','facebook','copy']` | Which buttons to show |
| `variant` | `'icon' \| 'outlined'` | `'icon'` | Icon-only or labeled outlined buttons |
| `size` | `'small' \| 'medium'` | `'medium'` | Button size |
| `label` | `string` | — | "Share:" text prefix |

`ShareNetwork`: `'twitter' | 'facebook' | 'linkedin' | 'reddit' | 'copy'`

Social networks open in a `600×400` popup. Copy uses `navigator.clipboard.writeText`. Copy button shows ✓ + "Copied!" for 2 seconds. `url` is resolved client-side via `useEffect` to avoid SSR mismatch.

---

### `CommentSection`
```tsx
<CommentSection
  comments={comments}
  onSubmit={async (data) => {
    await api.postComment(data);
  }}
  title="Discussion"
/>
```
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `comments` | `Comment[]` | `[]` | Top-level comments with optional `replies[]` |
| `onSubmit` | `(data: CommentFormData) => void \| Promise<void>` | — | Form submission handler |
| `title` | `string` | `'Comments'` | Section heading |

`Comment`: `{ id, authorName, authorAvatarUrl?, content, date, replies?: CommentReply[] }`
`CommentFormData`: `{ name, email, comment }`

Max reply depth: 1 level (replies rendered with left border indent). Comment count in heading includes replies. Form validates name, email (regex), comment — shows success message on submit.

---

## Theme Awareness

- `PostHeader` divider and meta icons use semantic tokens — automatic dark mode.
- `TableOfContents` active border and text use `primary.main`.
- `AuthorBioBlock` card border uses `borderColor: 'divider'`.
- `ShareButtons` copy success uses `success.main` icon color.
- `CommentSection` reply indent uses `borderColor: 'divider'` left border.
