-- Store created login password for admin panel visibility
alter table public.profiles add column if not exists plain_password text not null default '';
