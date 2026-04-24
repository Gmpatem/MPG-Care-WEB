# Implementation Notes — Repo-Specific Observations for Future Coding Agents

## Reusable UI Patterns Already Present

### Layout Container
Every section uses this wrapper pattern:
```tsx
<section className="w-full bg-navy py-[120px] md:py-[120px]">
  <div className="max-w-[1280px] mx-auto px-6">
    {/* content */}
  </div>
</section>
```
Safe to copy for any new section or page.

### Section Header Pattern
```tsx
<div className="text-center mb-16">
  <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-orange mb-4 block">
    Label
  </span>
  <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream tracking-[-0.03em]">
    Headline
  </h2>
</div>
```

### Card Pattern
```tsx
<div className="bg-navy-light border border-white/[0.08] rounded-2xl p-10 hover:border-orange/30 transition-all duration-300">
  {/* content */}
</div>
```

### Glass Effect
```tsx
className="glass-nav border-b border-white/[0.08]"
// Defined in index.css:
// .glass-nav { background: rgba(4, 10, 20, 0.8); backdrop-filter: blur(16px); }
```

## Sections / Components Safe to Extend

| Section | Safe to Edit? | Notes |
|---------|---------------|-------|
| `Navigation.tsx` | ✅ Yes | Add new nav links or change CTA behavior |
| `Hero.tsx` | ✅ Yes | Update stats, change CTA destinations |
| `ValueProposition.tsx` | ✅ Yes | Add/remove problem/solution cards |
| `Services.tsx` | ✅ Yes | Add service cards, wire "Learn more" |
| `Projects.tsx` | ✅ Yes | Add projects, fix URLs, change layout |
| `SystemThinking.tsx` | ⚠️ Careful | SVG path animation is fragile; text changes are safe |
| `WhyChoose.tsx` | ✅ Yes | Add values, edit text |
| `Process.tsx` | ✅ Yes | Add steps, edit text |
| `Trust.tsx` | ✅ Yes | Update metrics |
| `Testimonials.tsx` | ✅ Yes | Add testimonials |
| `FinalCTA.tsx` | ✅ Yes | **Primary place to add booking/form action** |
| `Footer.tsx` | ✅ Yes | Update links, add columns |

## Places Where CTAs Are Defined

### "Book a Call"
- `Navigation.tsx:60-66` (desktop button)
- `Navigation.tsx:93-99` (mobile button)
- `Hero.tsx:46-51` ("Book a Strategy Call")
- `FinalCTA.tsx:42-44` ("Book Your Free Call") — **this is the one that actually needs to do something**

### "View Our Work"
- `Hero.tsx:52-57` (scrolls to `#projects`)

### "Start a Project"
- `FinalCTA.tsx:45-50` (dead `href="#"`)

### "Learn more"
- `Services.tsx:97-99` (×4 cards, no link)

## Places Where Project Cards/Data Are Defined

- **Data array:** `Projects.tsx:8-51` — `const projects = [...]`
- **Card rendering:** `Projects.tsx:114-159`
- **Images:** `/public/project-mockup-{1-6}.jpg`

## Recommended New Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Contact.tsx` | Project inquiry form |
| `src/pages/ThankYou.tsx` | Post-submission confirmation |
| `src/pages/Work.tsx` | Full portfolio index |
| `src/pages/NotFound.tsx` | 404 page |
| `src/data/projects.ts` | Centralized project data |
| `src/data/services.ts` | Centralized service data |

## Routing Setup (If Adding Pages)

Current `App.tsx` is a flat list of sections. To add real routes:

1. In `src/App.tsx`, replace the flat section list with `<Routes>` and `<Route>`.
2. Keep the landing page as `/` (all sections).
3. Add new routes for `/contact`, `/work`, `/thank-you`.
4. Move `Navigation` and `Footer` outside `<Routes>` so they persist.

Example structure:
```tsx
// App.tsx
import { Routes, Route } from 'react-router';
import { Landing } from './pages/Landing';
import { Contact } from './pages/Contact';
// ...

function App() {
  return (
    <div className="bg-navy min-h-[100dvh]">
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        {/* ... */}
      </Routes>
      <Footer />
    </div>
  );
}
```

**Warning:** If you convert `App.tsx` to use routes, extract all current sections into a new `src/pages/Landing.tsx` so the homepage remains intact.

## Warnings — Do Not Break

### Animations
- Do NOT remove `gsap.registerPlugin(ScrollTrigger)` from `App.tsx` or any section.
- Do NOT change `ScrollTrigger` start/end values unless you understand the layout.
- Each section creates a `gsap.context(() => { ... }, section)` and calls `ctx.revert()` on cleanup — preserve this pattern.

### Particle Canvas
- `useParticleCanvas` is used in `Hero` (8000 particles, dither text) and `FinalCTA` (4000 particles, no dither).
- Do NOT increase particle count further without performance testing.
- The canvas uses `IntersectionObserver` to pause when off-screen — do not remove this.

### Smooth Scroll
- Lenis is initialized in `App.tsx` with `lerp: 0.12`.
- It is wired to GSAP's ticker — do NOT add another scroll library.
- Anchor links must use `element.scrollIntoView({ behavior: 'smooth' })` or Lenis's `scrollTo`.

### Responsive Behavior
- Mobile breakpoints: `md:` (768px) is the primary breakpoint used.
- The mobile nav overlay is a full-screen fixed div (`z-40`) — any new overlay must respect z-index stacking.

### Color Tokens
Use only the existing custom colors:
- `navy`, `navy-light`, `orange`, `orange-light`, `teal`, `slate`, `slate-muted`, `cream`
- Do NOT introduce new brand colors without updating `tailwind.config.js`.

## shadcn/ui Components Available

Every standard shadcn/ui component is pre-installed in `src/components/ui/`. Safe to use:
- `Button`, `Input`, `Textarea`, `Label`, `Select`, `Dialog`, `Sheet`, `Form`, `Toast`/`Sonner`
- These have NOT been customized to the brand theme yet — they may need color overrides to match `orange`/`teal` accents.
