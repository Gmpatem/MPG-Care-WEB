# Architecture — Code Structure & Technical Architecture

## Framework / Build System

- **Build tool:** Vite v7.2.4 (`vite.config.ts`)
- **Base path:** `./` (relative)
- **Dev server:** Port 3000
- **Framework:** React 19 (no Next.js, despite `page.tsx` and `layout.tsx` leftovers)
- **TypeScript:** Strict mode, `noUnusedLocals`, `noUnusedParameters`

## Routing Pattern

**Current state:** Single-page application with **no actual routing**.

- `src/main.tsx` wraps `<App />` in `<BrowserRouter>` from `react-router`.
- **No `<Routes>` or `<Route>` components exist anywhere.**
- Navigation is entirely anchor-based (`#services`, `#projects`, `#process`, `#why-choose`, `#cta`).
- `src/pages/Home.tsx` exists but is **dead code** (it is the default Vite counter template and is never imported).

## Folder Structure

```
src/
├── main.tsx                 # Entry point; renders App inside BrowserRouter
├── App.tsx                  # Root component; mounts all 11 sections + Lenis/GSAP init
├── App.css                  # Default Vite styles (unused; #root padding, .logo, etc.)
├── index.css                # Global styles, Tailwind directives, CSS variables, custom scrollbar
├── pages/
│   └── Home.tsx             # DEAD CODE — Vite template counter page, never imported
├── sections/                # All page sections (11 files)
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── ValueProposition.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── SystemThinking.tsx
│   ├── WhyChoose.tsx
│   ├── Process.tsx
│   ├── Trust.tsx
│   ├── Testimonials.tsx
│   ├── FinalCTA.tsx
│   └── Footer.tsx
├── components/ui/           # 50+ shadcn/ui components (installed, mostly unused)
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   └── ... (45 more)
├── hooks/
│   ├── use-mobile.ts        # useIsMobile hook
│   └── useParticleCanvas.ts # Canvas particle system (used in Hero + FinalCTA)
└── lib/
    └── utils.ts             # cn() helper (clsx + tailwind-merge)
```

## Root-Level Artifacts

| File | Status | Note |
|------|--------|------|
| `page.tsx` | Dead code | Next.js default page, not used by Vite |
| `layout.tsx` | Dead code | Next.js root layout, not used |
| `globals.css` | Dead code | Next.js globals, not imported by Vite app |

## Major Components / Sections

All sections are function components exported from `src/sections/*.tsx`.

| Section | File | GSAP? | Data Source |
|---------|------|-------|-------------|
| Navigation | `Navigation.tsx` | No | Hardcoded `navLinks` array |
| Hero | `Hero.tsx` | No | Hardcoded stats array |
| Value Proposition | `ValueProposition.tsx` | Yes | Hardcoded `problems` + `solutions` |
| Services | `Services.tsx` | Yes | Hardcoded `services` array |
| Projects | `Projects.tsx` | Yes | Hardcoded `projects` array |
| System Thinking | `SystemThinking.tsx` | Yes | Hardcoded `steps` array |
| Why Choose | `WhyChoose.tsx` | Yes | Hardcoded `values` array |
| Process | `Process.tsx` | Yes | Hardcoded `processSteps` array |
| Trust | `Trust.tsx` | Yes | Hardcoded `metrics` array |
| Testimonials | `Testimonials.tsx` | No | Hardcoded `testimonials` array |
| Final CTA | `FinalCTA.tsx` | No | Hardcoded text |
| Footer | `Footer.tsx` | No | Hardcoded `footerLinks` object |

## State / Data Approach

- **100% hardcoded static data.** No API calls, no fetch, no state management library.
- Each section defines its own local constant arrays/objects.
- `Testimonials` uses local `useState` for carousel index + `useEffect` interval (6s auto-rotate).
- `Trust` uses local `useState` for `inView` flag, toggled by GSAP ScrollTrigger.
- `Navigation` uses local `useState` for scroll detection and mobile menu toggle.

## Animation System

- **GSAP + ScrollTrigger** registered once in `App.tsx`.
- Lenis smooth scroll integrated with GSAP ticker.
- `prefers-reduced-motion` is respected (Lenis init is skipped).
- Most sections use `gsap.context(() => { ... }, section)` for scoped cleanup.
- Animation patterns: fade-up, stagger, scroll-scrubbed line drawing.

## Current Integration Points

| Integration | Status | Notes |
|-------------|--------|-------|
| Fonts (Google) | Active | Inter + Space Grotesk loaded in `index.html` |
| Images | Active | 6 project mockups + 3 avatars in `/public/` |
| Backend API | **Missing** | None |
| Form handling | **Missing** | None |
| Calendar/booking | **Missing** | None |
| Analytics | **Missing** | None |
| Email service | **Missing** | Only a `mailto:` in footer |

## Missing Backend Connections

- No contact-form endpoint.
- No project-inquiry endpoint.
- No booking/scheduling API or embed.
- No CMS or headless data source for projects/services.
- No newsletter/email capture.
