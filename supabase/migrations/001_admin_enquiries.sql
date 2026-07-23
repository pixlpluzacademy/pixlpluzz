-- Pixl Pluz admin + enquiries schema
-- Run once in Supabase SQL Editor

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null default 'staff' check (role in ('admin', 'branch_admin', 'staff')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_is_active_idx on public.profiles (is_active);

-- Enquiries from site forms
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('contact', 'home')),
  full_name text not null,
  email text not null,
  phone text not null default '',
  interest text not null default '',
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'read', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists enquiries_source_idx on public.enquiries (source);
create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);

-- Auto-create profile when auth user is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, is_active)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    case
      when new.raw_user_meta_data->>'role' = 'admin' then 'admin'
      when new.raw_user_meta_data->>'role' = 'branch_admin' then 'branch_admin'
      else 'staff'
    end,
    true
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.enquiries enable row level security;

-- Helper: current user is active staff/admin
create or replace function public.is_active_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_active = true
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_active = true and role = 'admin'
  );
$$;

-- Profiles policies
drop policy if exists "Active users can read profiles" on public.profiles;
create policy "Active users can read profiles"
  on public.profiles for select
  to authenticated
  using (public.is_active_staff());

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete profiles" on public.profiles;
create policy "Admins can delete profiles"
  on public.profiles for delete
  to authenticated
  using (public.is_admin());

-- Enquiries policies (insert only via service role / API)
drop policy if exists "Active users can read enquiries" on public.enquiries;
create policy "Active users can read enquiries"
  on public.enquiries for select
  to authenticated
  using (public.is_active_staff());

drop policy if exists "Active users can update enquiries" on public.enquiries;
create policy "Active users can update enquiries"
  on public.enquiries for update
  to authenticated
  using (public.is_active_staff())
  with check (public.is_active_staff());

-- After creating your first Auth user in the dashboard, promote them:
-- update public.profiles set role = 'admin' where email = 'you@example.com';
