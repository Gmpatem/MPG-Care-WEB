# Backend Gaps — What Integration Work Is Needed

## Summary

The entire website is a static frontend. No API calls are made, no data is fetched, no forms are submitted. To make the site functional for a real business, lightweight backend connections are needed for three core flows: **booking**, **project inquiry**, and **portfolio data**.

---

## 1. Booking Flow Requirements

### Current State
- "Book a Call" appears in 3 places. All scroll to `#cta`.
- The FinalCTA "Book Your Free Call" button does nothing.

### Requirements
- Open a scheduling interface when the user clicks "Book Your Free Call".
- Capture the booking event (for analytics/retargeting).
- Optionally pre-fill known user info if available.

### Lightweight Implementation Options

| Option | Effort | Best For |
|--------|--------|----------|
| **Calendly inline widget** | 15 min | Fastest, free tier available, brandable |
| **Cal.com embed** | 15 min | Open-source alternative, more control |
| **HubSpot Meetings** | 15 min | If already using HubSpot CRM |
| **Custom `/book` page** | 2-4 hrs | If you want full design control + tracking |

### Recommended Minimum Path
1. Sign up for Calendly (or Cal.com).
2. Get the inline embed code or pop-up script.
3. Add an `onClick` to the FinalCTA button that opens the Calendly modal.
4. Add the same handler to the Nav and Hero "Book a Call" buttons (instead of just scrolling).

---

## 2. Project Inquiry / Start-a-Project Form Requirements

### Current State
- "Start a Project" in FinalCTA is `href="#"`.
- No form exists anywhere on the site.

### Requirements
- A form with fields:
  - Name (required)
  - Email (required)
  - Company (optional)
  - Budget range (optional, select)
  - Project description (required, textarea)
- Client-side validation.
- Submission handling.
- Success state (toast, redirect to `/thank-you`, or inline message).
- Error state (inline message).

### Lightweight Implementation Options

| Option | Effort | Best For |
|--------|--------|----------|
| **Formspree** (`formspree.io/f/{id}`) | 30 min | Zero backend code, free tier, email notifications |
| **Netlify Forms** | 30 min | If hosting on Netlify; zero backend code |
| **Resend + serverless function** | 2-4 hrs | Custom branded emails, needs API route |
| **Google Forms embed** | 15 min | Quick and dirty; poor design integration |

### Recommended Minimum Path
1. Create a `/contact` route with a form using shadcn/ui `Form`, `Input`, `Textarea`, `Select`.
2. Use **Formspree** or **Netlify Forms** for zero-backend submission.
3. On success, redirect to a `/thank-you` page or show a `sonner` toast.
4. Wire the "Start a Project" link in FinalCTA to `/contact`.

---

## 3. Portfolio / Work Data Requirements

### Current State
- 6 projects are hardcoded in `src/sections/Projects.tsx`.
- All "Live Demo" and "GitHub" links are `href="#"`.
- Images are static files in `/public/`.

### Requirements
- Real URLs for at least some projects.
- Ability to add/edit projects without touching code (ideal) OR at least a centralized data file.

### Lightweight Implementation Options

| Option | Effort | Best For |
|--------|--------|----------|
| **Centralized `projects.ts` data file** | 30 min | Keep it static but maintainable |
| **JSON file in `/public/` fetched at runtime** | 1 hr | Decouples data from build |
| **Notion / Airtable + serverless fetch** | 2-4 hrs | Non-dev content updates |
| **CMS (Sanity, Strapi, Contentful)** | 1-2 days | Scale, but overkill right now |

### Recommended Minimum Path
1. Move `projects` array from `Projects.tsx` into `src/data/projects.ts`.
2. Add real `liveUrl` and `githubUrl` fields where available.
3. Hide or disable the "Live Demo" / "GitHub" buttons when URLs are empty.
4. Later, migrate to a headless CMS if project count grows.

---

## 4. Email / Notification Requirements

### Current State
- Only a `mailto:` link in the footer.

### Requirements
- Notifications when someone submits the inquiry form.
- Optionally, an auto-reply to the user confirming receipt.

### Recommended Path
- If using Formspree/Netlify: email notifications are built-in.
- If using Resend: create a simple serverless function (Vercel Edge, Netlify Function, or Cloudflare Worker) that sends an email to `hello@mpgtechnologies.com` and an optional auto-reply.

---

## 5. Analytics / Tracking (Optional but Recommended)

| Tool | Purpose | Implementation |
|------|---------|----------------|
| Google Analytics 4 | Traffic & behavior | `gtag` snippet in `index.html` |
| Google Tag Manager | Event tracking | GTM container snippet |
| Meta Pixel | Retargeting | Pixel base code + events on CTA clicks |

---

## Minimum Viable Backend Connections

To make the site **functional** (not just beautiful), implement these three things:

1. **Calendar embed** (Calendly/Cal.com) for "Book a Call".
2. **Form service** (Formspree/Netlify) for "Start a Project".
3. **Real project URLs** in a centralized data file.

Everything else (CMS, custom API, analytics) can come later.
