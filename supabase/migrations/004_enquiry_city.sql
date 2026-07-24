-- Add mandatory city field to enquiries (existing rows get empty string)
alter table public.enquiries
  add column if not exists city text not null default '';
