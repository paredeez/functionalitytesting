# Reusable quote form (multi-client)

One codebase. Deploy once per client on Vercel. **Only change env vars** — no code edits.

## Per-client setup (2 env vars)

In Vercel → Project → Settings → Environment Variables:

| Variable | Example |
|---|---|
| `QUOTE_RECIPIENT_EMAIL` | `owner@theirplumbing.com` |
| `BUSINESS_NAME` | `Acme Plumbing` |
| `RESEND_API_KEY` | same key for all projects |
| `RESEND_FROM_EMAIL` | `Website Enquiries <onboarding@resend.dev>` |

Shared across all clients: `RESEND_API_KEY` + `RESEND_FROM_EMAIL`  
Per client: `QUOTE_RECIPIENT_EMAIL` + `BUSINESS_NAME`

## Test locally

1. Copy `.env.local.example` → `.env.local`
2. Set `QUOTE_RECIPIENT_EMAIL=xamcorporate@gmail.com`
3. `npm install && npm run dev`
4. Submit form at http://localhost:3000/quote

## Embed on any client site

```html
<iframe
  src="https://YOUR-VERCEL-URL.vercel.app/embed"
  width="100%"
  height="900"
  style="border:0;"
  title="Quote form"
></iframe>
```

## Routes

- `/quote` — full page form
- `/embed` — minimal form for iframe
- `/api/quote` — POST handler (do not link directly)
