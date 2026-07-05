# Seawise — launch checklist

The site is launch-ready code. These are the owner steps to go live.

## 1. Deploy (Vercel, ~10 min)
1. vercel.com → Add New → Project → import `akopperstad/Claude`.
2. **Root Directory:** set to `seawise/` (critical — the repo holds other apps).
3. Framework preset: Next.js (auto). Build command / output: defaults.
4. Deploy → you get a `*.vercel.app` preview URL immediately.

## 2. Domain
1. Vercel project → Settings → Domains → add `seawise.no` (+ `www.seawise.no`).
2. At your DNS provider (where seawise.no lives today): point per Vercel's
   instructions — usually `A 76.76.21.21` for apex, `CNAME cname.vercel-dns.com`
   for www.
3. Keep the old site up until the new one is verified on the preview URL.

## 3. Lead email (activate the contact form)
Set in Vercel → Settings → Environment Variables:
| var | value |
|---|---|
| `SMTP_URL` | `smtp://USER:PASS@smtp.yourprovider.com:587` |
| `LEADS_TO` | `hello@seawise.no` |
| `LEADS_FROM` | `hello@seawise.no` (must be allowed sender on the SMTP account) |

Without `SMTP_URL` the form still succeeds but leads are only logged.
Any transactional provider works (Resend SMTP, Postmark, Office365, Google
Workspace app password).

## 4. Analytics (optional, 2 min)
Plausible or Vercel Analytics — Vercel Analytics is one click in the
dashboard (Project → Analytics → Enable).

## 5. Final swap-ins (optional)
- Official logo: drop `public/logo.svg` and swap the inline SVG in
  `components/Logo.tsx`.
- New product screens: overwrite files in `public/product/` (same names).

## Verify after launch
- [ ] `https://seawise.no` loads, dive scrolls, depth meter ticks
- [ ] Contact form submit → email arrives in `LEADS_TO`
- [ ] Share a link in Slack/LinkedIn → OG card shows the dark hero
- [ ] Phone check: hero, product strip, form
