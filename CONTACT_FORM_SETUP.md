# Contact form backend setup

The portfolio is a Vite and React static site. Its contact API runs as a Netlify Function at `/api/contact`, sends mail through Resend, and uses Upstash Redis for shared rate limiting and idempotency.

## Production setup

1. Create a Resend account, verify a sender domain you control, and create a server-side API key with email sending access. Set the sender to an address on that verified domain, for example `Karthiga Portfolio <contact@your-domain.com>`.
2. Create an Upstash Redis database and copy its REST URL and REST token.
3. In the Netlify project environment-variable settings, add:

   | Variable | Value |
   | --- | --- |
   | `RESEND_API_KEY` | Resend API key; keep this secret |
   | `CONTACT_FROM_EMAIL` | Sender name and address on the verified domain |
   | `CONTACT_TO_EMAIL` | `saravanankarthiga87@gmail.com` |
   | `CONTACT_ALLOWED_ORIGINS` | `https://karthiga-portfolio-7.netlify.app` |
   | `UPSTASH_REDIS_REST_URL` | Upstash REST URL; keep this private |
   | `UPSTASH_REDIS_REST_TOKEN` | Upstash REST token; keep this secret |

   Make these variables available to Netlify Functions. Never put secret values in the Vite `VITE_*` namespace or commit them to Git.
4. Redeploy the site after setting the variables. Netlify Functions receive environment variables at runtime.

Resend uses the visitor's email as `reply_to`, so replying to the notification goes back to the visitor. The message body contains the visitor name, email, subject, and full message. The endpoint allows five submissions per IP per hour, validates the origin and payload, checks a hidden honeypot, and uses an idempotency key to prevent duplicate mail.

## Local development

1. Copy `.env.example` to `.env` and fill in working Resend and Upstash values. Do not commit `.env`.
2. Run `npm run dev:netlify` to start Vite and the Netlify Functions emulator at `http://localhost:8888`.
3. Run `npm test` for the contact endpoint validation, rate-limit, duplicate, honeypot, and provider-request tests. These tests mock the external services and do not send real email.

To verify real delivery, submit the form on the deployed site after configuring the production variables, then check the recipient inbox and reply to the notification. A successful test requires a valid Resend key and verified sender domain, plus an active Upstash database.

## Environment template

See `.env.example` for the required variable names. Netlify's build settings are in `netlify.toml`.
