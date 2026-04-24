# Current Issues — Product & Code Issues

## Resolved ✅

| Issue | Resolution |
|-------|------------|
| All `href="#"` dead links | Eliminated. Every link now has a real destination or is conditionally hidden. |
| "Book Your Free Call" does nothing | Now opens Calendly (PH) or WhatsApp (CM) via SmartCTA. |
| "Start a Project" dead link | Now routes to `/contact` (PH) or WhatsApp prefilled message (CM). |
| No contact form | `/contact` page exists with full form + validation. |
| No thank-you page | `/thank-you` exists with region-aware messaging. |
| No routing | `/`, `/contact`, `/thank-you`, `/work` routes active. |
| Hardcoded data inline | Services, projects, config moved to `src/data/`. |
| No lead capture backend | Supabase integration added (`src/features/leads/`). |

## Remaining Issues

### Placeholder / Mock Data Still Exposed

| Data | Location | Status | Risk |
|------|----------|--------|------|
| Project mockup images | `/public/project-mockup-{1-6}.jpg` | Real image files exist | Low |
| Project descriptions | `src/data/projects.ts` | Hardcoded, fictional | Medium — add real URLs to `liveUrl`/`githubUrl` when available |
| Testimonial quotes | `Testimonials.tsx:4-22` | Hardcoded, fictional | Medium |
| Trust metrics | `Trust.tsx:7-12` | Hardcoded (40+, 15+, 99.9%, <24h) | Low — common agency positioning |
| Stats in Hero trust bar | `Hero.tsx` | Hardcoded | Low |

### Missing Pages

| Page | Status |
|------|--------|
| 404 / Not Found | Still missing. Router falls through with no matching route. |
| Privacy Policy / Terms | Compliance gap for form data collection. |

### Code Hygiene

| Issue | File | Detail |
|-------|------|--------|
| Dead code | `src/pages/Home.tsx` | Default Vite counter page; never imported |
| Dead code | `page.tsx` | Next.js page; not used by Vite build |
| Dead code | `layout.tsx` | Next.js layout; not used |
| Dead code | `globals.css` | Next.js globals; not imported |

### Performance Observations

- `useParticleCanvas` runs two canvas instances (Hero + FinalCTA) with up to 8000 particles each. On low-end devices this may cause frame drops. `IntersectionObserver` pauses animation when off-screen, which helps.
- GSAP ScrollTrigger instances are cleaned up via `ctx.revert()` in each section — correctly implemented.
- No lazy loading for images beyond native `loading="lazy"` on project card images.

### Accessibility Observations

- `prefers-reduced-motion` is respected globally (Lenis skipped, CSS transitions reduced).
- Mobile nav hamburger has `aria-label`.
- Testimonial dots have `aria-label`.
- Some interactive elements lack focus-visible styles (needs verification).

## Supabase Integration — Known Limitations

| Item | Status | Action Required |
|------|--------|-----------------|
| Supabase URL | Placeholder | Fill `VITE_SUPABASE_URL` in `.env.local` |
| Supabase Anon Key | Placeholder | Fill `VITE_SUPABASE_ANON_KEY` in `.env.local` |
| SQL Migration | Created | Run `supabase/migrations/001_create_public_leads.sql` in Supabase SQL Editor |
| RLS Policies | Defined in migration | Verify policies are active after migration |
| Form fallback | Present | If env vars missing, form shows error and does not crash |
