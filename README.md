# Athletica

An editorial athlete registry and cohort ledger for international **Football** and **Cricket**, crafted with a minimalist, boxy visual architecture inspired by high-end financial ledgers and the General Intelligence Company design specification.

---

## Key Features

### 1. Independent Football & Cricket Rosters
- **Strictly Separated Drafts**: Football and Cricket athletes exist in dedicated cohorts and cannot be drafted into a mixed squad.
- **Dedicated Squad Caps**: Each sport has its own independent 11-player roster limit, valuation tally, and salary cap progress tracking.
- **One-Click Auto-Draft**: Independent `Auto ⚽ XI` and `Auto 🏏 XI` generators that automatically assemble balanced squads within the configured budget cap.

### 2. Boxy Editorial Aesthetic (Zero Border Radius)
- **Brutalist / Editorial Hairline Borders**: `0px` border-radius across all cards, buttons, badges, inputs, dialogs, and slide-over sheets.
- **Curated Palette**: Warm parchment `#fefffc` and paper surfaces with 1px `#dee2de` mist hairline dividers and `#41a1cf` Signal Blue outlined accents.

### 3. Dark & Light Mode Support
- **Seamless Theme Switching**: Instant toggle between warm parchment/paper light mode and deep `#121217` midnight dark mode.
- **Persistent Preferences**: Saves your theme choice to `localStorage` and respects system preferences.

### 4. Slide-Over Sheet (Opening from the Right)
- **Tab 1: ⚽ Football Cohort**: Live roster, market valuation vs. cap progress, CSV download, and clipboard export.
- **Tab 2: 🏏 Cricket Cohort**: Live roster, market valuation vs. cap progress, CSV download, and clipboard export.
- **Tab 3: ★ Shortlist**: Bookmark any athlete to your personal watchlist and draft them into their respective sport squad with a single click.

### 5. Head-to-Head Athlete Comparison Tool
- Compare any two athletes side-by-side across market valuation, overall rating (OVR), age, international caps, primary metric, and major titles.
- In-modal dropdown selectors allow hot-swapping athletes without closing the comparison dialog.

### 6. Interactive Salary Cap Stepper
- Dynamically scale squad spending limits from **$100M** up to **$1.0B+**.
- Stepper buttons (`+ $50M` / `- $50M`) and quick preset buttons (`$300M`, `$500M`, `$750M`, `$1.0B`).

### 7. Pagination (No Infinite Scroll)
- Clean, structured page-by-page browsing with customizable page sizes (8, 12, 16, or 24 athletes per page).
- Smooth navigation with quick page jump buttons.

### 8. Athletic & Editorial Typography
- **Fraunces**: Custom display serif for headlines with tight tracking and weight 400.
- **Oxanium**: High-performance athletic monospace numerals for ratings, jersey numbers, and valuations.
- **Inter**: Clean, quiet sans-serif for UI labels and data tables.

---

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Core**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Component Primitives**: Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-slot`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS tokens & CSS Custom Properties

---

## Project Structure

```
├── app/
│   ├── globals.css          # Design tokens (colors, dark mode, 0px boxy architecture)
│   ├── layout.tsx           # Page metadata and root layout
│   └── page.tsx             # Interactive application controller
├── components/
│   ├── Header.tsx           # Centered "Athletica" header with dark mode toggle
│   ├── StatsBar.tsx         # Compact metrics bar & salary cap controls
│   ├── FilterBar.tsx        # Redesigned boxy multi-filter system
│   ├── PlayerCard.tsx       # Boxy content cards with hairline borders
│   ├── PlayerTableView.tsx  # Boxy ledger table view
│   ├── Pagination.tsx       # Page navigation controls
│   ├── PlayerModal.tsx      # Comprehensive career dossier modal
│   ├── CompareModal.tsx     # Head-to-head comparison dialog
│   ├── RosterSheet.tsx      # Right slide-over sheet (Football, Cricket, Shortlist)
│   ├── Footer.tsx           # Minimalist colophon
│   └── ui/                  # shadcn component primitives (Button, Badge, Card, etc.)
├── data/
│   └── players.ts           # Football & Cricket athlete database
├── types/
│   └── player.ts            # TypeScript interfaces
├── pnpm-lock.yaml           # pnpm dependency lockfile
└── package.json             # Dependencies and scripts
```

---

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start the Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
pnpm run build
```

### 4. Run Production Build
```bash
pnpm start
```

---

## License
MIT © Athletica
