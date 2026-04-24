# Routes and Pages — Map of All Real Pages & Major Sections

## Current Routing Reality

The app is a **single-page landing page** with zero declared routes. `react-router`'s `BrowserRouter` wraps the app but no `<Routes>` or `<Route>` elements exist. All navigation is anchor-link based.

## Anchor Sections ("Virtual Routes")

| Anchor ID | Section | File | Status |
|-----------|---------|------|--------|
| `#` (top) | Hero | `Hero.tsx` | ✅ Fully functional |
| `#services` | Services | `Services.tsx` | ✅ Visible, but "Learn more" is dead |
| `#projects` | Projects | `Projects.tsx` | ✅ Visible, but all card links are dead |
| `#process` | Process | `Process.tsx` | ✅ Fully functional |
| `#why-choose` | Why Choose | `WhyChoose.tsx` | ✅ Fully functional |
| `#methodology` | System Thinking | `SystemThinking.tsx` | ✅ Fully functional |
| `#trust` | Trust | `Trust.tsx` | ✅ Fully functional |
| `#testimonials` | Testimonials | `Testimonials.tsx` | ✅ Fully functional |
| `#cta` | Final CTA | `FinalCTA.tsx` | ⚠️ Visible, but primary CTA buttons are dead |
| `#value` | Value Proposition | `ValueProposition.tsx` | ✅ Fully functional |

## Actual File-Based Pages

| Path | File | Used? | Status |
|------|------|-------|--------|
| `/` | `App.tsx` | ✅ Yes | Single page composing all sections |
| `/` (intended) | `src/pages/Home.tsx` | ❌ No | Dead code — Vite template counter |

## Missing Pages (Conversion-Critical)

These pages should exist for a functional agency website but are **entirely absent**:

| Missing Page | Why It's Needed | Minimum Viable Form |
|--------------|-----------------|---------------------|
| **Book a Call** (`/book` or `#book`) | Primary conversion goal | Calendly embed or dedicated booking page |
| **Work / Portfolio** (`/work` or `/portfolio`) | Trust & credibility | Dedicated page with case-study detail, real URLs |
| **Start a Project** (`/start-project` or `/contact`) | Secondary conversion | Contact/inquiry form with fields (name, email, budget, description) |
| **Thank You** (`/thank-you`) | Post-conversion confirmation | Simple confirmation after form submission or booking |
| **Individual Project Case Study** (`/work/:slug`) | Deep trust building | Detailed write-up per project with real metrics |
| **Privacy Policy / Terms** | Compliance | Standard legal pages |

## Section-Level Functionality Audit

### Navigation (`Navigation.tsx`)
- **Desktop:** 4 anchor links + "Book a Call" button.
- **Mobile:** Hamburger overlay with same links.
- **Status:** Smooth scroll works. "Book a Call" scrolls to `#cta` but does not open a booking interface.

### Hero (`Hero.tsx`)
- **Primary CTA:** "Book a Strategy Call" → scrolls to `#cta`.
- **Secondary CTA:** "View Our Work" → scrolls to `#projects`.
- **Trust bar:** Static stats (40+, 15+, 99%, 24h) — hardcoded, not dynamic.
- **Particle canvas:** Interactive, performant, renders "SYSTEMS" text via dither effect.
- **Status:** Visuals complete, conversion mechanics missing.

### Value Proposition (`ValueProposition.tsx`)
- Left sticky panel + right scrolling problem/solution cards.
- **Status:** Fully functional. No CTAs inside this section.

### Services (`Services.tsx`)
- 4 service cards with icons, titles, descriptions.
- **"Learn more →"** text present on every card — **no link, no route, no modal**.
- **Status:** Presentation complete, exploration path blocked.

### Projects (`Projects.tsx`)
- Horizontal scroll container with 6 project cards.
- Each card has: gradient placeholder image, tags, title, description, "Live Demo", "GitHub".
- **All links are `href="#"`.**
- **"View All Projects →"** header link is also `href="#"`.
- **Status:** Visual portfolio shell. No real project destinations.

### System Thinking (`SystemThinking.tsx`)
- 5-step methodology diagram with SVG progress line.
- **Status:** Fully functional animation, no CTAs.

### Why Choose (`WhyChoose.tsx`)
- 5 value propositions + animated concentric-ring visual.
- **Status:** Fully functional, no CTAs.

### Process (`Process.tsx`)
- 6-step horizontal timeline (desktop) / vertical stack (mobile).
- **Status:** Fully functional, no CTAs.

### Trust (`Trust.tsx`)
- 4 animated metric counters.
- **Status:** Fully functional. Numbers are hardcoded.

### Testimonials (`Testimonials.tsx`)
- Auto-rotating carousel (6s interval) with 3 testimonials.
- Avatar images referenced from `/public/`.
- **Status:** Fully functional. Quotes are hardcoded/mock.

### Final CTA (`FinalCTA.tsx`)
- Headline, subtext, "Book Your Free Call" button, "Start a Project" link.
- **"Book Your Free Call"** is a `<button>` with **no `onClick`**.
- **"Start a Project"** is an `<a href="#">` with **no destination**.
- **Status:** The most important section and the most broken.

### Footer (`Footer.tsx`)
- 3 link columns (Services, Company, Connect).
- Email link is real (`mailto:hello@mpgtechnologies.com`).
- LinkedIn, GitHub, Twitter are `href="#"`.
- **Status:** Partially functional.
