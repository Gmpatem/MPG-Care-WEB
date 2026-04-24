# CTA Audit — All Call-to-Action Flows

## Audit Table

| # | CTA Label | Location | Current Behavior | Destination / Action | Functional? | Gap |
|---|-----------|----------|------------------|----------------------|-------------|-----|
| 1 | **Book a Call** | Nav (desktop + mobile) | Smooth scroll to anchor | `#cta` (FinalCTA section) | ⚠️ Partial | Scrolls, but destination CTA does nothing |
| 2 | **Book a Strategy Call** | Hero | Smooth scroll to anchor | `#cta` | ⚠️ Partial | Same as above |
| 3 | **View Our Work** | Hero | Smooth scroll to anchor | `#projects` | ✅ Yes | Works as intended |
| 4 | **Learn more →** | Services (×4 cards) | None | `cursor: pointer` only | ❌ No | No link, no modal, no route |
| 5 | **View All Projects →** | Projects header | None | `href="#"` | ❌ No | No dedicated portfolio page |
| 6 | **Live Demo** | Each project card (×6) | None | `href="#"` | ❌ No | No real demo URLs |
| 7 | **GitHub** | Each project card (×6) | None | `href="#"` | ❌ No | No real repo URLs |
| 8 | **Book Your Free Call** | FinalCTA | None | `<button>` with no `onClick` | ❌ No | No booking integration |
| 9 | **Start a Project** | FinalCTA | None | `href="#"` | ❌ No | No inquiry form or route |
| 10 | **LinkedIn** | Footer | None | `href="#"` | ❌ No | No profile URL |
| 11 | **GitHub** | Footer | None | `href="#"` | ❌ No | No profile URL |
| 12 | **Twitter** | Footer | None | `href="#"` | ❌ No | No profile URL |
| 13 | **Email** | Footer | Opens mail client | `mailto:hello@mpgtechnologies.com` | ✅ Yes | Functional but not trackable |
| 14 | **Logo** | Nav + Footer | Smooth scroll to top | `window.scrollTo(0,0)` | ✅ Yes | Functional |

## Critical Conversion Flows — Deep Dive

### 1. Book a Call

**Current frontend status:** Buttons exist in 3 places (Nav, Hero, FinalCTA). All scroll to `#cta`.  
**Missing:**
- The FinalCTA "Book Your Free Call" button has **no action**.
- No Calendly, Cal.com, HubSpot Meetings, or custom booking page.
- No `/book` route.
- No tracking event (Google Analytics, Meta Pixel, etc.).

**Minimum change required:**
1. Add an `onClick` to the FinalCTA button that opens a Calendly inline widget or modal.
2. **OR** create a `/book` route with an embedded calendar.
3. **OR** change the button to an `<a>` pointing to an external booking URL.

### 2. View Our Work / Portfolio

**Current frontend status:** Projects section displays 6 cards with gradients and placeholder images.  
**Missing:**
- Real project detail pages (`/work/:slug`).
- Real "Live Demo" URLs.
- Real "GitHub" URLs.
- A dedicated `/work` or `/portfolio` index page.

**Minimum change required:**
1. Replace `href="#"` on project cards with real URLs (even if external).
2. Add a `/work` route that lists all projects in detail.
3. Create individual case-study pages or modals.

### 3. Start a Project

**Current frontend status:** A text link in FinalCTA saying "Start a Project" → `href="#"`.  
**Missing:**
- A `/start-project` or `/contact` route.
- A form component (name, email, company, budget, message).
- Form validation and submission handling.
- Success/error states.

**Minimum change required:**
1. Create a `/contact` route with a project inquiry form.
2. Wire the form to a backend endpoint or form service (Formspree, Netlify Forms, Resend, etc.).
3. Add a thank-you redirect or success toast.

## Social / Profile Links

| Platform | Current | Needed |
|----------|---------|--------|
| LinkedIn | `href="#"` | Real company/profile URL |
| GitHub | `href="#"` | Real org URL |
| Twitter / X | `href="#"` | Real profile URL |

## Quick Fix Priority

1. **FinalCTA "Book Your Free Call"** — add action (highest conversion impact).
2. **FinalCTA "Start a Project"** — create `/contact` form.
3. **Project card links** — add real URLs or hide buttons until ready.
4. **Footer social links** — add real URLs.
5. **Services "Learn more"** — link to `/services/:slug` or scroll to `/contact`.
