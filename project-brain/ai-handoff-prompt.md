# AI Handoff Prompt — Ready-to-Use Prompt for Next AI Coding Agent

## Summary of Current State

You are working on **MPG Technologies**, a single-page React + Vite website for a business-systems and automation agency. The site has 11 visually polished sections with GSAP animations, a particle canvas, and Lenis smooth scroll. **However, it is a static shell with zero working conversion flows.**

## Exact Features Missing

1. **Book a Call** — "Book Your Free Call" button in FinalCTA does nothing. Needs a Calendly/Cal.com embed or pop-up.
2. **Start a Project** — "Start a Project" link is `href="#"`. Needs a `/contact` route with an inquiry form.
3. **Portfolio Links** — Every project card has dead "Live Demo" and "GitHub" links (`href="#"`).
4. **Services "Learn more"** — No link or destination.
5. **Social Links** — LinkedIn, GitHub, Twitter in footer are all `href="#"`.
6. **Thank You Page** — No confirmation after form submission or booking.
7. **Real Routing** — `react-router` is installed but unused; only anchor links exist.

## Constraints to Respect

- **DO NOT** redesign existing sections or change the visual style.
- **DO NOT** remove GSAP animations, the particle canvas, or Lenis smooth scroll.
- **DO NOT** change the color palette (navy/orange/teal/slate/cream).
- **DO NOT** introduce heavy state management — local state is enough.
- **DO NOT** switch from Vite to Next.js.
- **DO** reuse existing shadcn/ui components (`Button`, `Form`, `Input`, `Textarea`, `Dialog`, etc.).
- **DO** keep all existing responsive behavior (`md:` breakpoint, mobile nav overlay).
- **DO** preserve the `max-w-[1280px] mx-auto px-6` layout container pattern.

## Files Likely to Change

| File | Why |
|------|-----|
| `src/sections/FinalCTA.tsx` | Add booking action to "Book Your Free Call" |
| `src/sections/Navigation.tsx` | Optionally make "Book a Call" open calendar directly |
| `src/sections/Hero.tsx` | Optionally make "Book a Strategy Call" open calendar |
| `src/sections/Projects.tsx` | Fix dead links, maybe centralize data |
| `src/sections/Services.tsx` | Wire "Learn more" to `/contact` |
| `src/sections/Footer.tsx` | Add real social URLs |
| `src/App.tsx` | Add `<Routes>` if creating new pages |
| `src/main.tsx` | Already has `<BrowserRouter>`, no changes needed |
| **New:** `src/pages/Contact.tsx` | Project inquiry form |
| **New:** `src/pages/ThankYou.tsx` | Confirmation page |
| **New:** `src/pages/Work.tsx` | Full portfolio page (optional) |
| **New:** `src/data/projects.ts` | Centralized project data (optional) |

## Implementation Priorities

1. **Highest:** Make "Book Your Free Call" open a Calendly pop-up or inline widget.
2. **High:** Create `/contact` route with a form (name, email, company, budget, message) wired to Formspree/Netlify Forms.
3. **Medium:** Fix or hide dead project card links.
4. **Low:** Add real social URLs, remove dead code (`src/pages/Home.tsx`, `page.tsx`, `layout.tsx`).

## Design Patterns to Follow

- **Buttons:** `font-sans font-semibold text-[16px] bg-orange text-navy px-8 py-3.5 rounded-lg hover:scale-[1.02] hover:shadow-glow transition-all duration-200`
- **Secondary buttons:** `bg-transparent border border-white/20 text-cream ... hover:border-orange hover:text-orange`
- **Cards:** `bg-navy-light border border-white/[0.08] rounded-2xl p-10`
- **Section padding:** `py-[120px] md:py-[120px]`
- **Text colors:** `text-cream` for headings, `text-slate` for body, `text-orange` for accents, `text-teal` for labels

## One-Liner Goal

**Add working conversion mechanics (booking + contact form) to this beautiful but non-functional static site without breaking its design or animations.**
