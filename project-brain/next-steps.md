# Next Steps — Prioritized Action List

## Completed ✅

1. ~~Book a Call integration~~ — SmartCTA handles Calendly (all regions).
2. ~~Contact form + /thank-you~~ — Built with shadcn/ui, connected to Supabase.
3. ~~Fix dead project links~~ — Conditionally rendered, "View All Projects" links to `/work`.
4. ~~Fix social links~~ — Pulled from `siteConfig.social`, hidden if empty.
5. ~~Data centralization~~ — `src/data/` holds all config, services, projects.
6. ~~LeadFormModal with 3 form types~~ — project, service, callback forms.
7. ~~Contact Options Modal~~ — Book Call, WhatsApp, Email, Send Project Details.
8. ~~Contact channel click tracking~~ — WhatsApp, Email, Calendly, Form clicks tracked in Supabase.
9. ~~Service cards complete~~ — 6 real services with working CTAs.
10. ~~Project CTAs~~ — "Start Similar Project" opens lead form.
11. ~~Footer contact~~ — Opens ContactOptionsModal.
12. ~~Supabase migration~~ — `001_create_website_leads.sql` with RLS.
13. ~~Env example~~ — `.env.local.example` created.

---

## Immediate Setup (Before Going Live)

### 1. Configure Supabase Environment Variables
**Files:** `.env.local` (copy from `.env.local.example`)  
**Time:** 5 minutes  
**Impact:** 🔴 Critical — lead capture will not work without this

1. Create a Supabase project at https://supabase.com
2. Copy Project URL and Anon Key from Settings > API
3. Paste into `.env.local`
4. Run the SQL migration in Supabase SQL Editor: `supabase/migrations/001_create_website_leads.sql`

### 2. Cameroon WhatsApp Number (Optional)
**File:** `.env.local` — set `VITE_WHATSAPP_CM`  
**Time:** 2 minutes  
**Impact:** Medium — CM users currently fall back to email/PH WhatsApp

If no Cameroon number is available, the site gracefully falls back to email and the Philippines WhatsApp number.

### 3. Add Real Social Links (Optional)
**File:** `src/data/site-config.ts` — fill in `social.linkedin`, `social.github`, `social.twitter`  
**Time:** 2 minutes  
**Impact:** Low — links are hidden until real URLs are provided

---

## Medium-Priority Work

### 4. Add 404 Page
**Files:** New `src/pages/NotFound.tsx`, update `src/App.tsx`  
**Time:** 30 minutes  
**Impact:** Low — professionalism

Add a catch-all route:
```tsx
<Route path="*" element={<NotFound />} />
```

### 5. Add Privacy Policy / Terms
**Files:** New `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`  
**Time:** 1 hour  
**Impact:** Medium — compliance for form data collection

Required because the contact form collects PII (name, email, phone).

### 6. Add Basic Analytics
**File:** `index.html`  
**Time:** 15 minutes  
**Impact:** Low — data for optimization

- Google Analytics 4 `gtag` snippet
- Event tracking on "Book a Call" and form submission

---

## Lower-Priority Polish

### 7. Remove Dead Code
**Files:** `src/pages/Home.tsx`, `page.tsx`, `layout.tsx`, `globals.css`  
**Time:** 10 minutes  
**Impact:** Low — code hygiene

### 8. Admin Dashboard for Leads
**Approach:** Use Supabase Dashboard Table Editor, or build a private admin page.  
**Time:** 2-4 hours  
**Impact:** Medium — operational necessity once leads start flowing

**Important:** Do NOT build a public admin page. Use Supabase Auth + service-role key if building a custom dashboard.

### 9. Email Notifications on New Lead
**Approach:** Supabase Database Webhooks → Edge Function → Resend/Email service  
**Time:** 2-3 hours  
**Impact:** Medium — operational response time

### 10. A/B Test CTA Copy
**Approach:** Use PostHog or Vercel Flags  
**Time:** 2-3 hours  
**Impact:** Low-Medium — conversion optimization

---

## What NOT to Do

- Do NOT redesign existing sections.
- Do NOT change the color palette or typography.
- Do NOT remove GSAP animations or the particle canvas.
- Do NOT introduce a heavy state management library (Zustand, Redux).
- Do NOT replace Vite with Next.js unless explicitly asked.
- Do NOT make the leads table publicly readable.
