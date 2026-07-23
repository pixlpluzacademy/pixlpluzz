-- Add branch_admin role (already applied remotely if using MCP)
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('admin', 'branch_admin', 'staff'));

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
