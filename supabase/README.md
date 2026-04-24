# Supabase Setup for MPG Technologies

## Required Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |
| `VITE_CALENDLY_URL` | Calendly booking URL | No (has fallback) |
| `VITE_PUBLIC_EMAIL` | Public contact email | No (has fallback) |
| `VITE_WHATSAPP_PH` | Philippines WhatsApp number (intl format) | No (has fallback) |
| `VITE_WHATSAPP_CM` | Cameroon WhatsApp number (intl format) | No (leave empty) |

## Database Migration

Run the SQL migration in your Supabase SQL Editor:

**File:** `supabase/migrations/001_create_website_leads.sql`

This creates:
- `public.website_leads` table with all lead capture columns
- Indexes for common queries
- `updated_at` trigger
- RLS policies (anon INSERT only)

## RLS Explanation

- **Anonymous users** can `INSERT` leads (this is how the website submits)
- **Anonymous users** cannot `SELECT`, `UPDATE`, or `DELETE`
- **Authenticated users** can `INSERT`
- No public `SELECT` policy — leads are private

To view leads, use the Supabase Dashboard or create a secure admin backend.

## Testing Lead Submission

### 1. Without Supabase (fallback mode)
If env vars are missing, the form shows a graceful error. This is useful for local dev.

### 2. With Supabase
1. Fill in `.env.local`
2. Start dev server: `npm run dev`
3. Open any lead form ("Start a Project", "Discuss This Service", etc.)
4. Submit the form
5. Check Supabase Dashboard > Table Editor > `website_leads`

### 3. Testing Contact Channel Tracking
Click WhatsApp, Email, or Calendly in the Contact Options Modal. A lightweight lead record with `form_type = 'contact'` is inserted.

## Checking Leads in Supabase

Go to your Supabase project:
- **Dashboard:** Project Home > Table Editor > `website_leads`
- **SQL:** `SELECT * FROM public.website_leads ORDER BY created_at DESC;`

## Values Still Needed

| Item | Status | Notes |
|------|--------|-------|
| Supabase URL & Key | Manual | Create at supabase.com, paste into `.env.local` |
| Cameroon WhatsApp | Missing | No fake number. CM users fall back to email/PH WhatsApp. |
| Social links | Missing | LinkedIn, GitHub, Twitter hidden in footer until real URLs added. |
| Project demo links | Missing | Live Demo / GitHub buttons hidden for projects without URLs. |

## Security Notes

- Never commit `.env.local`
- The anon key is safe for client-side use (RLS protects data)
- Do not add a public SELECT policy
- Use service role key only in serverless functions / backend
