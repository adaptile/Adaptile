# Adaptile

Brand architecture studio portfolio website based in Dubai. Single-page React app showcasing projects, team, services, and contact info.

## Tech Stack

- **Framework:** React 19 (JSX, no TypeScript)
- **Build:** Vite 8 with @vitejs/plugin-react (Oxc preset)
- **Animation:** motion (Framer Motion alternative), Embla Carousel with wheel gestures
- **Icons:** lucide-react
- **Styling:** Plain CSS with custom properties (no CSS-in-JS, no Tailwind)
- **Testing:** Playwright
- **Linting:** ESLint 9 (flat config)
- **Deployment:** Vercel

## Commands

- `npm run dev` — Start dev server with HMR
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Project Structure

```
src/
  main.jsx          — Entry point, renders <App /> into #root
  App.jsx           — Entire app (~1100 lines, all components in one file)
  App.css           — All component styles (~1600 lines)
  index.css         — Global/reset styles
public/
  icons.svg         — SVG sprite
  nfts/             — Project image assets
```

## Architecture

**Single-file component architecture** — all components live in `App.jsx`:

`CustomCursor` → `Navbar` → `Hero` → `ClientMarquee` → `About` → `WorkSection` → `TeamSection` → `Services` → `ContactSection` → `Footer` + conditional `BatchModal`

**Key components:**
- **Reveal** — Scroll-triggered animations via IntersectionObserver
- **AnimatedCounter** — Animates stat numbers on scroll
- **BatchModal** — Full-screen Embla carousel for project galleries
- **Hero** — Accordion showcasing featured projects

**Data is inline** — project list (16 items), team (9 members), services (4 items), and stats are all defined as arrays at the top of `App.jsx`.

## State Management

Minimal — only React `useState` for UI state. No Redux, Zustand, or context providers. Main state is `selectedBatch` in `App` controlling which project modal is open.

## Styling Conventions

- Dark theme with CSS custom properties (`--bg`, `--surface`, `--text`, `--accent`)
- Accent color: `#91cae8`
- Fonts: Bricolage Grotesque (display), DM Serif Display (serif), Plus Jakarta Sans (body) — loaded via Google Fonts in `index.html`
- GPU-accelerated animations (`transform`/`opacity` only)
- Responsive breakpoints at 768px and 900px

## Notes

- No routing — single-page scroll site
- No external API calls
- Scroll animations use IntersectionObserver, not scroll event listeners
- Custom cursor tracks mouse position via CSS variables
