# Academy form sync

Website contact/home forms `POST /api/enquiries` and insert **only form fields** into the academy Supabase table `admission_enquiry`.

## Environment (`.env.local` + Vercel)

```
ACADEMY_API_URL=https://YOUR_ACADEMY_PROJECT.supabase.co
ACADEMY_SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
```

Never commit secrets. Website admin Supabase keys are no longer required.

## Database

Run in the **academy** project SQL editor:

[`supabase/academy/001_admission_enquiry.sql`](../supabase/academy/001_admission_enquiry.sql)

## Smoke test

1. Submit homepage form → row with `source = home` in `admission_enquiry`.
2. Submit contact form → row with `source = contact`.
