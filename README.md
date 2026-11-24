# Xusheng Guo — Portfolio & Technical Blog

Personal portfolio and technical blog hosted on GitHub Pages at **https://guohere.github.io**, built with **Astro**, **TypeScript**, **Content Collections (Zod)**, **KaTeX math rendering**, **Shiki syntax highlighting**, and automated **GitHub Actions CI/CD**.

## Quick Edit Cheat Sheet (Only 3 Places You Need)

You never need to touch `src/components/`, `src/layouts/`, `src/styles/`, or `.github/` for normal updates:

| What you want to change | Where to edit |
| :--- | :--- |
| Email, bio, education, experience, skills (EN & DE) | `src/data/profile.ts` |
| Add or edit a blog post | `src/content/blog/*.md` (1 file = 1 post) |
| Add or edit a project | `src/content/projects/*.md` (1 file = 1 project) |

## Features

- **Type-Safe Blog System (`src/content/blog/`):** Write posts in Markdown with schema-validated frontmatter, automatic reading time, table of contents, category filters, instant search, and RSS (`/rss.xml`).
- **LaTeX Math & Code Blocks:** Supports inline (`$...$`) and display (`$$...$$`) equations via `remark-math` + `rehype-katex`, plus syntax-highlighted code blocks with one-click copy.
- **Project Case Studies (`src/content/projects/`):** Dedicated project write-up pages alongside GitHub/demo links.
- **Bilingual EN / DE Switcher:** Header toggle switches the entire portfolio UI, CV sections, and optional German post/project summaries (`titleDe`, `descriptionDe`, `lang: 'de'`) instantly without page reload.
- **Automated Deployment:** Pushing to `main` triggers `.github/workflows/deploy.yml` to run `astro check`, build the static site, and publish to GitHub Pages.

---

## How to Write & Publish a Blog Post

### Option A: Edit Locally (VS Code / Obsidian)

1. Create a new `.md` file inside `src/content/blog/` (for example, `src/content/blog/my-thesis-chapter-1.md`).
2. Add frontmatter at the top:

```markdown
---
title: 'Your Post Title'
titleDe: 'Optional German Title'
description: 'A 1–2 sentence summary shown on the blog index and SEO previews.'
descriptionDe: 'Optional German summary.'
pubDate: 2026-11-25
category: 'Master Thesis' # Master Thesis | Projects | AI & LLMs | Robotics | Engineering
tags: ['RAG', 'PyTorch', 'LLMs']
lang: 'en' # or 'de' if the article body is written in German
draft: false
---

Write your Markdown here. Inline math like $y = Wx + b$ and display blocks:

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

work automatically.
```

3. Commit and push to `main` — GitHub Actions builds and publishes it automatically within ~1 minute.

### Option B: Edit Directly in Your Browser on GitHub.com

1. Open `https://github.com/guohere/guohere.github.io` and navigate to `src/content/blog/`.
2. Click **Add file → Create new file** (or press `.` on the repo page to open GitHub's web VS Code editor).
3. Save and commit to `main` — GitHub Actions publishes the updated blog automatically.

---

## How to Add a New Project

Create a `.md` file inside `src/content/projects/`:

```markdown
---
title: 'My New AI Project'
summary: 'Short recruiter-friendly summary of what the system does.'
period: '2026'
role: 'AI Engineer'
status: 'In Progress' # Completed | In Progress | Research
metrics: 'Optional headline metric (e.g., 42 ms p95 latency)'
tags: ['Python', 'PyTorch', 'Docker']
repoUrl: 'https://github.com/guohere/your-repo'
featured: true
order: 3
---

## Problem Statement
...
```

---

## Local Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start local dev server at http://localhost:4321
npm run check    # Run TypeScript & Astro type checks
npm run build    # Build production static site into ./dist
npm run preview  # Preview the built ./dist site locally
```

## One-Time GitHub Pages Setting

Because this site builds with GitHub Actions, ensure **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions** in your repository settings.
