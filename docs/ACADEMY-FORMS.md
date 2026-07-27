# Enquiry email (Gmail via Nodemailer)

Form submissions are emailed to **pixlpluz@gmail.com** as:

`New enquiry from {user name}`

WhatsApp CTA buttons still open WhatsApp as before. Academy DB storage stays paused unless `ENQUIRY_STORAGE_ENABLED=true`.

## 1. Create a Gmail App Password

1. Open Google Account for `pixlpluz@gmail.com`
2. Enable **2-Step Verification**
3. Go to [App passwords](https://myaccount.google.com/apppasswords)
4. Create one for “Mail” / “Other (Pixl Pluz website)”
5. Copy the 16-character password

## 2. Environment

`.env.local` and Vercel:

```
GMAIL_USER=pixlpluz@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
```

Restart `pnpm run dev` after saving. Add the same vars in Vercel for production.

## 3. Smoke test

1. Submit home or contact form
2. Check inbox of `pixlpluz@gmail.com`
3. Subject looks like: `New enquiry from Lakshmi Nair`
4. Reply-To is the visitor’s email

## Optional: resume academy storage

```
ENQUIRY_STORAGE_ENABLED=true
ACADEMY_API_URL=...
ACADEMY_SUPABASE_SERVICE_ROLE_KEY=...
```
