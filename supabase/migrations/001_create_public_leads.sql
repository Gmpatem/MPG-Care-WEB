-- Migration: Create public lead capture table
-- Purpose: Store website form submissions securely

-- Create the leads table
CREATE TABLE IF NOT EXISTS public.website_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  whatsapp text,
  company text,
  country_code text,
  region text CHECK (region IN ('PH', 'CM', 'OTHER')) DEFAULT 'OTHER',
  service_type text,
  budget_range text,
  project_description text NOT NULL,
  source_page text,
  source_cta text,
  status text DEFAULT 'new',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_website_leads_email ON public.website_leads(email);
CREATE INDEX IF NOT EXISTS idx_website_leads_region ON public.website_leads(region);
CREATE INDEX IF NOT EXISTS idx_website_leads_status ON public.website_leads(status);
CREATE INDEX IF NOT EXISTS idx_website_leads_created_at ON public.website_leads(created_at DESC);

-- Updated-at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_website_leads_updated_at ON public.website_leads;
CREATE TRIGGER set_website_leads_updated_at
  BEFORE UPDATE ON public.website_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security
ALTER TABLE public.website_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous insert (lead capture)
DROP POLICY IF EXISTS allow_anon_insert ON public.website_leads;
CREATE POLICY allow_anon_insert
  ON public.website_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Block all reads from frontend (lead data is private)
DROP POLICY IF EXISTS block_anon_select ON public.website_leads;
CREATE POLICY block_anon_select
  ON public.website_leads
  FOR SELECT
  TO anon
  USING (false);

-- Policy: Block updates/deletes from frontend
DROP POLICY IF EXISTS block_anon_update ON public.website_leads;
CREATE POLICY block_anon_update
  ON public.website_leads
  FOR UPDATE
  TO anon
  USING (false);

DROP POLICY IF EXISTS block_anon_delete ON public.website_leads;
CREATE POLICY block_anon_delete
  ON public.website_leads
  FOR DELETE
  TO anon
  USING (false);
