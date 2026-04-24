-- Migration: Create website_leads table for MPG Technologies lead capture
-- Run this in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the leads table
CREATE TABLE IF NOT EXISTS public.website_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal info
  full_name text NOT NULL,
  email text,
  whatsapp text,
  phone text,

  -- Location
  country_code text,
  region text CHECK (region IN ('PH', 'CM', 'OTHER')) DEFAULT 'OTHER',

  -- Business info
  business_name text,

  -- Form classification
  form_type text CHECK (form_type IN ('project', 'service', 'callback', 'contact')) NOT NULL,
  service_id text,
  service_label text,

  -- Project details
  budget_range text,
  timeline text,
  preferred_contact_method text,
  preferred_contact_time text,
  project_description text,
  business_problem text,
  message text,

  -- Tracking
  source_page text,
  source_cta text,
  contact_channel_clicked text,

  -- Status
  status text DEFAULT 'new',

  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_website_leads_created_at ON public.website_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_leads_region ON public.website_leads(region);
CREATE INDEX IF NOT EXISTS idx_website_leads_form_type ON public.website_leads(form_type);
CREATE INDEX IF NOT EXISTS idx_website_leads_service_id ON public.website_leads(service_id);
CREATE INDEX IF NOT EXISTS idx_website_leads_status ON public.website_leads(status);
CREATE INDEX IF NOT EXISTS idx_website_leads_email ON public.website_leads(email);
CREATE INDEX IF NOT EXISTS idx_website_leads_whatsapp ON public.website_leads(whatsapp);

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_website_leads_updated_at ON public.website_leads;
CREATE TRIGGER update_website_leads_updated_at
  BEFORE UPDATE ON public.website_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.website_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anonymous users can INSERT (lead capture from website)
DROP POLICY IF EXISTS anon_insert_leads ON public.website_leads;
CREATE POLICY anon_insert_leads
  ON public.website_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can INSERT
DROP POLICY IF EXISTS auth_insert_leads ON public.website_leads;
CREATE POLICY auth_insert_leads
  ON public.website_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- NOTE: No SELECT policy for anon — leads are private.
-- If you need an admin dashboard, create a service role client
-- or add a selective policy for a specific admin role.

-- Optional admin read policy (commented until admin role is set up):
-- DROP POLICY IF EXISTS admin_select_leads ON public.website_leads;
-- CREATE POLICY admin_select_leads
--   ON public.website_leads
--   FOR SELECT
--   TO authenticated
--   USING (auth.jwt() ->> 'role' = 'admin');
