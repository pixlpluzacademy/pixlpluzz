# Admin panel setup (Supabase)

## 1. Environment

Copy `.env.example` to `.env.local` and fill:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

Never commit `.env.local`.

## 2. Database

In Supabase Dashboard → SQL Editor, paste and run:

[`supabase/migrations/001_admin_enquiries.sql`](../supabase/migrations/001_admin_enquiries.sql)

Also apply later migrations in order (`002_…`, `003_…`, `004_enquiry_city.sql` for the required city field).

## 3. First admin user

1. Dashboard → Authentication → Users → Add user (email + password).
2. In SQL Editor:

```sql
update public.profiles
set role = 'admin', full_name = 'Admin'
where email = 'your@email.com';
```

## 4. Login

Open `/admin/login` and sign in.

- **Admin** can open Users, create branch admins / staff / admins, deactivate or delete them.
- **Branch admin** can create and manage **staff** only.
- **Staff** can use Dashboard and Enquiries only.

Passwords are set when creating a user (show/hide + copy after create). Auth does not store recoverable passwords later.

## 5. Forms

Contact page and homepage inquiry both `POST /api/enquiries`. New rows appear under Admin → Enquiries.

## Smoke test

1. Submit homepage form → row with `source = home`.
2. Submit contact form → row with `source = contact`.
3. Staff login: no Users nav / `/admin/users` redirects.
4. Admin: create staff → staff can login.
5. Admin: set staff inactive → staff cannot use panel.
