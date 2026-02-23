# VarunVejalla.github.io

Personal website scaffolded with Astro + React islands.

## Stack

- Astro for static pages and content collections
- React for interactive client-side project demos
- Markdown content for projects and notes
- GitHub Actions workflow for deployment to GitHub Pages

## Project Structure
## Project Structure

```text
.
|-- .github/workflows/deploy.yml
|-- public/
|   |-- favicon.svg
|   `-- images/projects/
|-- src/
|   |-- components/
|   |-- content/
|   |   |-- notes/
|   |   `-- projects/
|   |-- layouts/
|   |-- pages/
|   `-- styles/
|-- astro.config.mjs
|-- package.json
`-- tsconfig.json
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Key Pages

- `/` Home page with intro, featured projects, and recent notes
- `/projects` Project index
- `/notes` Notes/blog index
- `/resume` Resume section
- `/projects/interactive-demo` Placeholder interactive React demo

## First Things To Replace

1. Update social/profile URLs in:
   - `src/pages/index.astro`
   - `src/pages/resume.astro`
2. Replace placeholder repo URLs in:
   - `src/content/projects/static-showcase.md`
   - `src/content/projects/client-side-tool.md`
3. Add your real screenshots under `public/images/projects/`
4. Add your real resume PDF as `public/resume.pdf` and link it from `src/pages/resume.astro`
5. Edit intro copy in `src/pages/index.astro`

## Content Workflow

- Add new notes in `src/content/notes/*.md`
- Add new projects in `src/content/projects/*.md`
- Each markdown entry is auto-listed on index pages and gets a detail route

## Deploy

Push to the `main` branch. GitHub Actions will build and deploy to GitHub Pages via `.github/workflows/deploy.yml`.
