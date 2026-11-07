import { createHash } from 'node:crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW = '1 h';
const IDEMPOTENCY_TTL_SECONDS = 24 * 60 * 60;
const PROCESSING_TTL_SECONDS = 10 * 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const UUID_PATTERN = /^[\da-f]{8}-[\da-f]{4}-[1-8][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/iu;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/u;
const MESSAGE_CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u;

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

function allowedOrigins(env) {
  const values = [env.URL, env.DEPLOY_PRIME_URL, ...(env.CONTACT_ALLOWED_ORIGINS ?? '').split(',')];
  const origins = new Set();
  for (const value of values) {
    if (!value?.trim()) continue;
    try {
      origins.add(new URL(value.trim()).origin);
    } catch {
      // Ignore malformed optional origin entries; invalid origins never match a request.
    }
  }
  return origins;
}

function emailAddressFromSender(value) {
  const bracketedAddress = value.match(/<([^<>]+)>/u)?.[1];
  return (bracketedAddress ?? value).trim();
}

function getValidationErrors({ name, email, subject, message }) {
  const errors = {};

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > 120 || CONTROL_CHARS.test(name)) errors.name = 'Please use a name under 120 characters.';

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email) || CONTROL_CHARS.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!subject) errors.subject = 'Please add a subject.';
  else if (subject.length > 160 || CONTROL_CHARS.test(subject)) errors.subject = 'Please use a subject under 160 characters.';

  if (!message) errors.message = 'Please write a message.';
  else if (message.length < 10) errors.message = 'Please write at least 10 characters.';
  else if (message.length > 2500 || MESSAGE_CONTROL_CHARS.test(message)) errors.message = 'Please keep your message under 2,500 characters.';

  return errors;
}

export async function sendWithResend({ apiKey, from, to, submissionId, name, email, subject, message, fetchImpl = fetch }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': submissionId,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      }),
      signal: controller.signal,
    });

    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.id !== 'string') {
      const error = new Error('The email provider did not accept the message.');
      error.providerStatus = response.status;
      throw error;
    }
    return result;
  } finally {
    clearTimeout(timeout);
  }
}

export function createContactHandler({
  env = process.env,
  redis: injectedRedis,
  limiter: injectedLimiter,
  sendEmail = sendWithResend,
} = {}) {
  let redis = injectedRedis;
  let limiter = injectedLimiter;

  function getRateLimitServices() {
    if (!redis) {
      redis = new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      });
    }
    if (!limiter) {
      limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(RATE_LIMIT, RATE_WINDOW),
        prefix: 'karthiga-portfolio:contact',
        analytics: false,
      });
    }
    return { redis, limiter };
  }

  return async function contactHandler(request, context) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed.' }, 405, { Allow: 'POST' });
    }

    const origin = request.headers.get('origin');
    if (!origin || !allowedOrigins(env).has(origin)) {
      return json({ error: 'This form can only be submitted from the portfolio site.' }, 403);
    }

    if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
      return json({ error: 'Please submit the form in the supported format.' }, 415);
    }

    const declaredLength = Number(request.headers.get('content-length') ?? 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return json({ error: 'Your message is too large. Please shorten it and try again.' }, 413);
    }

    let rawBody;
    let payload;
    try {
      rawBody = await request.text();
      if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
        return json({ error: 'Your message is too large. Please shorten it and try again.' }, 413);
      }
      payload = JSON.parse(rawBody);
    } catch {
      return json({ error: 'Please submit a valid contact form.' }, 400);
    }

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return json({ error: 'Please submit a valid contact form.' }, 400);
    }

    const fields = {
      name: typeof payload.name === 'string' ? payload.name.trim() : '',
      email: typeof payload.email === 'string' ? payload.email.trim() : '',
      subject: typeof payload.subject === 'string' ? payload.subject.trim() : '',
      message: typeof payload.message === 'string' ? payload.message.trim() : '',
    };
    const submissionId = typeof payload.submissionId === 'string' ? payload.submissionId.trim() : '';

    if (typeof payload.website === 'string' && payload.website.trim()) {
      return json({ error: 'Unable to verify this submission. Please review the form and try again.' }, 400);
    }

    const errors = getValidationErrors(fields);
    if (!UUID_PATTERN.test(submissionId)) errors.form = 'Please refresh the page and try again.';
    if (Object.keys(errors).length) {
      return json({ error: 'Please check the form fields and try again.', fields: errors }, 400);
    }

    const senderAddress = emailAddressFromSender(env.CONTACT_FROM_EMAIL ?? '');
    const configurationIsValid = Boolean(
      env.RESEND_API_KEY?.trim()
      && env.CONTACT_FROM_EMAIL?.trim()
      && EMAIL_PATTERN.test(senderAddress)
      && EMAIL_PATTERN.test(env.CONTACT_TO_EMAIL?.trim() ?? '')
      && env.UPSTASH_REDIS_REST_URL?.trim()
      && env.UPSTASH_REDIS_REST_TOKEN?.trim(),
    );
    if (!configurationIsValid) {
      return json({ error: 'The contact service is temporarily unavailable. Please try again later.' }, 503);
    }

    const clientIp = typeof context?.ip === 'string' && context.ip ? context.ip : 'unknown';
    const rateLimitId = createHash('sha256').update(clientIp).digest('hex');
    const idempotencyKey = `contact:submission:${createHash('sha256').update(`${rateLimitId}:${submissionId}`).digest('hex')}`;
    const payloadFingerprint = createHash('sha256').update(JSON.stringify(fields)).digest('hex');
    const processingValue = `processing:${payloadFingerprint}`;
    const sentValue = `sent:${payloadFingerprint}`;
    let services;
    let reserved = false;

    try {
      services = getRateLimitServices();

      const previous = await services.redis.get(idempotencyKey);
      if (previous === sentValue) return json({ success: true });
      if (previous === `processing:${payloadFingerprint}`) {
        return json({ error: 'This message is already being processed. Please wait a moment.' }, 409);
      }
      if (previous) return json({ error: 'This submission ID was already used. Please refresh the page and try again.' }, 409);

      const reservation = await services.redis.set(idempotencyKey, processingValue, {
        nx: true,
        ex: PROCESSING_TTL_SECONDS,
      });
      if (reservation !== 'OK') {
        const latest = await services.redis.get(idempotencyKey);
        if (latest === sentValue) return json({ success: true });
        if (latest && latest !== processingValue) {
          return json({ error: 'This submission ID was already used. Please refresh the page and try again.' }, 409);
        }
        return json({ error: 'This message is already being processed. Please wait a moment.' }, 409);
      }
      reserved = true;

      const rateLimit = await services.limiter.limit(rateLimitId);
      if (!rateLimit.success) {
        await services.redis.del(idempotencyKey);
        const retryAfter = Math.max(1, Math.ceil(((rateLimit.reset ?? Date.now() + 60_000) - Date.now()) / 1000));
        return json(
          { error: 'You have sent several messages recently. Please try again later.' },
          429,
          { 'Retry-After': String(retryAfter) },
        );
      }
    } catch (error) {
      if (reserved && services) await services.redis.del(idempotencyKey).catch(() => undefined);
      console.error('[contact] Rate limit service failed:', error instanceof Error ? error.name : 'unknown error');
      return json({ error: 'The contact service is temporarily unavailable. Please try again later.' }, 503);
    }

    try {
      await sendEmail({
        apiKey: env.RESEND_API_KEY,
        from: env.CONTACT_FROM_EMAIL,
        to: env.CONTACT_TO_EMAIL.trim(),
        submissionId,
        ...fields,
      });
    } catch (error) {
      await services.redis.del(idempotencyKey).catch(() => undefined);
      console.error('[contact] Email provider failed:', error instanceof Error ? error.name : 'unknown error');
      return json({ error: 'Your message could not be sent right now. Please try again later.' }, 502);
    }

    await services.redis.set(idempotencyKey, sentValue, { ex: IDEMPOTENCY_TTL_SECONDS }).catch(() => {
      console.error('[contact] Could not store the completed submission idempotency marker.');
    });
    return json({ success: true });
  };
}

export const config = { path: '/api/contact' };
export default createContactHandler();
