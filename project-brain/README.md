# MPG Technologies — Project Brain

> **Master index for all project documentation.**
> Last updated: 2026-04-23

## Project Summary

**MPG Technologies** is a single-page marketing website for a business-systems and automation agency. It presents services, a portfolio of mock projects, process methodology, testimonials, and trust metrics. The site is visually polished (GSAP animations, particle canvas, smooth scroll) but is currently a **static frontend shell** with no working conversion flows.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 7 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3.4.19 |
| UI Library | shadcn/ui (New York style) — **installed but largely unused** |
| Animation | GSAP + ScrollTrigger, Lenis smooth scroll |
| Icons | Lucide React |
| Routing | react-router v7 — **BrowserRouter present but no routes defined** |
| Build | Vite (port 3000) |

## Current Maturity

**Stage:** Frontend-complete static shell.  
**Missing:** All conversion mechanics (booking, inquiry forms, real project links, backend).

## Main Missing Conversion Functionality

1. **Book a Call** — scrolls to CTA section, but there is no calendar integration or form.
2. **View Our Work** — scrolls to Projects, but every project card has dead `href="#"` links.
3. **Start a Project** — dead `href="#"` in FinalCTA; no project-inquiry form exists.
4. **Services "Learn more"** — cursor-only, no destination.
5. **Social links** — LinkedIn, GitHub, Twitter in footer are all `href="#"`.

## Documentation Files

| File | Purpose |
|------|---------|
| [context.md](./context.md) | Business purpose, target users, conversion goals, user journey |
| [architecture.md](./architecture.md) | Code structure, framework, data approach, integrations |
| [routes-and-pages.md](./routes-and-pages.md) | Route map, page status, missing pages |
| [cta-audit.md](./cta-audit.md) | Every CTA audited: label, location, behavior, functional? |
| [backend-gaps.md](./backend-gaps.md) | Exact backend/integration work needed |
| [current-issues.md](./current-issues.md) | Dead links, placeholders, trust issues, code issues |
| [next-steps.md](./next-steps.md) | Prioritized action list for next coding agent |
| [implementation-notes.md](./implementation-notes.md) | Reusable patterns, safe extension points, warnings |
| [ai-handoff-prompt.md](./ai-handoff-prompt.md) | Ready-to-use prompt for the next AI agent |

## Quick Stats

- **Sections:** 11 (Navigation, Hero, Value Proposition, Services, Projects, System Thinking, Why Choose, Process, Trust, Testimonials, Final CTA, Footer)
- **Real pages:** 1 (`/`)
- **Dead CTAs:** 7+
- **Working CTAs:** 3 (all are smooth-scroll anchors)
- **Backend integrations:** 0
