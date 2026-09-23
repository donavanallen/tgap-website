# TGAP Real Estate Investment Group

Public website for TGAP LLC, Richfield, Utah. Live at https://tgap.us

## Stack
Next.js (App Router), TypeScript, Tailwind CSS 4. Hosted on Vercel; pushes to `main` deploy to production automatically.

## Routes
- `/` main site
- `/calculators` real estate investment calculators
- `/privacy`, `/terms` legal pages
- `/api/contact` contact form handler (Resend)

## Environment variables (Vercel project settings)
- `RESEND_API_KEY` Resend API key
- `CONTACT_TO` inbox for form submissions (comma separated for multiple)
- `CONTACT_FROM` verified sender, e.g. `TGAP Website <noreply@tgap.us>`

## Local development
```
npm install
npm run dev
```
