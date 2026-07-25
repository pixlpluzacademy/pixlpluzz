-- Academy software project — website form submissions
-- Run once in the ACADEMY Supabase project → SQL Editor.
-- Stores ONLY the values submitted through the Pixl Pluz website forms.

create table if not exists public.admission_enquiry (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'website' check (source in ('home', 'contact', 'website')),
  full_name text not null,
  email text not null,
  phone text not null default '',
  city text not null default '',
  interest text not null default '',
  message text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists admission_enquiry_created_at_idx
  on public.admission_enquiry (created_at desc);

create index if not exists admission_enquiry_source_idx
  on public.admission_enquiry (source);

-- Row Level Security: keep the table locked down.
-- Inserts happen server-side with the service-role key (which bypasses RLS),
-- so no public insert/select policy is granted. Add policies later only if
-- you need to read this table from the academy client app.
alter table public.admission_enquiry enable row level security;
