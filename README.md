# SBTI Share Card Generator

Open-source social share card generator for absurd personality quiz results.

Take the full interactive test at [sbtitest.co](https://sbtitest.co).

## Why This Exists

This repo extracts one useful part of the broader SBTI experience: the share card layer.

It is designed to be:

- small and easy to understand
- easy to run locally
- easy to fork for other quiz, meme, and result-card projects
- useful on its own without exposing the full product
- compatible with a small optional data pack for extension work

The full interactive SBTI test lives on [sbtitest.co](https://sbtitest.co).

## What It Does

- renders a live 1200x630 share card preview
- lets you edit type code, title, subtitle, tagline, and accent color
- includes default SBTI-style presets
- exports PNG directly in the browser
- uses a simple config structure that is easy to extend

## Preview

![SBTI share card example](./public/example-card.png)

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Stack

- Next.js
- TypeScript
- React
- Tailwind CSS

## Project Structure

```text
app/
  layout.tsx
  page.tsx
components/
  share-card-builder.tsx
  share-card-preview.tsx
data/
  sbti_questions_31.json
  sbti_results_overview_27.json
docs/
  sbti_archive.md
lib/
  presets.ts
  share-card.ts
public/
  example-card.png
```

## Data Model

```ts
type SbtiTypeConfig = {
  code: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  footerText?: string;
  ctaText?: string;
  emoji?: string;
  theme: {
    background: string;
    foreground: string;
    accent: string;
    accentSoft: string;
  };
};
```

## Customization

Edit [lib/presets.ts](./lib/presets.ts) to add or swap type presets.

The current MVP renders cards as SVG and exports PNG through Canvas on the client. That keeps deployment simple and avoids adding a backend image service too early.

## Data Files

This repository can optionally include a small static data pack for reference and future integration work.

- [data/sbti_questions_31.json](./data/sbti_questions_31.json) is the canonical question-bank source in this repo
- [data/sbti_results_overview_27.json](./data/sbti_results_overview_27.json) is the canonical result metadata source in this repo
- [docs/sbti_archive.md](./docs/sbti_archive.md) is a human-readable archive and is not used as runtime input

Rules:

- JSON is the single source of truth for structured quiz data kept in this repository
- Markdown in `docs/` is reference material only
- CSV exports are intentionally excluded to avoid duplicate sources drifting over time

## Scope

This repository does not include:

- the full interactive quiz flow
- the scoring or type-matching engine
- user accounts
- payments
- backend systems

It is intentionally focused on the reusable share-card piece, with a small optional reference dataset for extension work.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Roadmap

See [ROADMAP.md](./ROADMAP.md).

## License

[MIT](./LICENSE)

## GitHub Setup Suggestions

- About: `Open-source social share card generator for absurd personality quiz results.`
- Website: `https://sbtitest.co`
- Topics: `personality-test`, `personality-quiz`, `quiz`, `social-share-image`, `open-graph`, `card-generator`, `meme`, `nextjs`, `json`, `sbti`

Built by the team behind [sbtitest.co](https://sbtitest.co).
