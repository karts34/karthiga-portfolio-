import assert from 'node:assert/strict';
import test from 'node:test';
import { createContactHandler, sendWithResend } from '../netlify/functions/contact.mjs';

const origin = 'https://karthiga-portfolio-7.netlify.app';
const submissionId = '123e4567-e89b-42d3-a456-426614174000';
const validPayload = {
  name: 'Asha Visitor',
  email: 'asha@example.com',
  subject: 'Portfolio question',
  message: 'I would like to ask about your recent project.',
  submissionId,
};

function createRedis() {
  const values = new Map();
  return {
    values,
    async get(key) { return values.get(key) ?? null; },
    async set(key, value, options = {}) {
      if (options.nx && values.has(key)) return null;
      values.set(key, value);
      return 'OK';
    },
    async del(key) { return values.delete(key) ? 1 : 0; },
  };
}

function createDependencies(overrides = {}) {
  const redis = overrides.redis ?? createRedis();
  const sent = [];
  const dependencies = {
    env: {
      URL: origin,
      CONTACT_ALLOWED_ORIGINS: `${origin},http://localhost:8888`,
      CONTACT_FROM_EMAIL: 'Karthiga Portfolio <contact@example.com>',
      CONTACT_TO_EMAIL: 'saravanankarthiga87@gmail.com',
      RESEND_API_KEY: 'server-side-test-key',
      UPSTASH_REDIS_REST_URL: 'https://example.upstash.io',
      UPSTASH_REDIS_REST_TOKEN: 'server-side-test-token',
    },
    redis,
    limiter: { async limit() { return { success: true, reset: Date.now() + 60_000 }; } },
    async sendEmail(payload) { sent.push(payload); return { id: 'mock-email-id' }; },
    ...overrides,
  };
  return { handler: createContactHandler(dependencies), dependencies, redis, sent };
}

function request(payload = validPayload, { method = 'POST', requestOrigin = origin, contentType = 'application/json' } = {}) {
  const headers = new Headers();
  if (requestOrigin) headers.set('Origin', requestOrigin);
  if (contentType) headers.set('Content-Type', contentType);
  return new Request(`${origin}/api/contact`, {
    method,
    headers,
    body: method === 'GET' ? undefined : JSON.stringify(payload),
  });
}

test('valid contact passes the full message to the configured email sender', async () => {
  const { handler, sent } = createDependencies();
  const response = await handler(request(), { ip: '203.0.113.10' });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'saravanankarthiga87@gmail.com');
  assert.equal(sent[0].email, validPayload.email);
  assert.equal(sent[0].message, validPayload.message);
});

test('invalid email and empty submissions are rejected before sending', async () => {
  const { handler, sent } = createDependencies();
  const invalidEmail = await handler(request({ ...validPayload, email: 'not-an-email' }), { ip: '203.0.113.11' });
  const empty = await handler(request({ submissionId }), { ip: '203.0.113.12' });

  assert.equal(invalidEmail.status, 400);
  assert.ok((await invalidEmail.json()).fields.email);
  assert.equal(empty.status, 400);
  assert.equal(sent.length, 0);
});

test('email failure returns an error and never reports success', async () => {
  const { handler } = createDependencies({ async sendEmail() { throw new Error('provider unavailable'); } });
  const response = await handler(request(), { ip: '203.0.113.13' });
  const body = await response.json();

  assert.equal(response.status, 502);
  assert.equal(body.success, undefined);
  assert.match(body.error, /could not be sent/u);
});

test('repeated request id is idempotent and sends only once', async () => {
  const { handler, sent } = createDependencies();
  const first = await handler(request(), { ip: '203.0.113.14' });
  const second = await handler(request(), { ip: '203.0.113.14' });

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(sent.length, 1);
});

test('reusing an idempotency key with different form data is rejected', async () => {
  const { handler, sent } = createDependencies();
  const first = await handler(request(), { ip: '203.0.113.19' });
  const changed = await handler(request({ ...validPayload, message: 'A different message with enough length.' }), { ip: '203.0.113.19' });

  assert.equal(first.status, 200);
  assert.equal(changed.status, 409);
  assert.equal(sent.length, 1);
});

test('rate limit rejects additional messages without calling the provider', async () => {
  const { handler, sent } = createDependencies({
    limiter: { async limit() { return { success: false, reset: Date.now() + 30_000 }; } },
  });
  const response = await handler(request(), { ip: '203.0.113.15' });

  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '30');
  assert.equal(sent.length, 0);
});

test('honeypot and foreign origins are rejected', async () => {
  const { handler, sent } = createDependencies();
  const trapped = await handler(request({ ...validPayload, website: 'spam' }), { ip: '203.0.113.16' });
  const foreign = await handler(request(validPayload, { requestOrigin: 'https://malicious.example' }), { ip: '203.0.113.17' });

  assert.equal(trapped.status, 400);
  assert.equal(foreign.status, 403);
  assert.equal(sent.length, 0);
});

test('missing service configuration fails closed', async () => {
  const { handler } = createDependencies({ env: { URL: origin } });
  const response = await handler(request(), { ip: '203.0.113.18' });

  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, undefined);
});

test('Resend request uses the visitor as reply-to and an idempotency key', async () => {
  let call;
  const fetchImpl = async (url, options) => {
    call = { url, options };
    return new Response(JSON.stringify({ id: 'resend-id' }), { status: 200 });
  };
  const email = { ...validPayload, apiKey: 'secret', from: 'Karthiga <contact@example.com>', to: 'owner@example.com', fetchImpl };
  await sendWithResend(email);

  assert.equal(call.url, 'https://api.resend.com/emails');
  assert.equal(call.options.headers.Authorization, 'Bearer secret');
  assert.equal(call.options.headers['Idempotency-Key'], submissionId);
  const body = JSON.parse(call.options.body);
  assert.equal(body.reply_to, validPayload.email);
  assert.equal(body.to[0], 'owner@example.com');
  assert.match(body.text, /Asha Visitor/u);
  assert.match(body.text, /I would like to ask about your recent project\./u);
});

test('Resend non-success response throws instead of claiming delivery', async () => {
  await assert.rejects(sendWithResend({
    ...validPayload,
    apiKey: 'secret',
    from: 'Karthiga <contact@example.com>',
    to: 'owner@example.com',
    fetchImpl: async () => new Response(JSON.stringify({ message: 'Rejected' }), { status: 401 }),
  }));
});
