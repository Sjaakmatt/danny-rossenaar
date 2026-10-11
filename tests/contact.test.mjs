import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, emailPayload, RECIPIENT } from '../lib/contact.mjs';
const valid = {
  naam: 'Test Ondernemer',
  email: 'test@example.com',
  bericht: 'Ik wil kennismaken.',
};
test('validates and trims input without changing the message', () => {
  const result = validateContact({ ...valid, naam: '  Danny  ' });
  assert.equal(result.data.naam, 'Danny');
  assert.equal(result.data.bericht, valid.bericht);
});
test('malformed body and non-string fields cannot bypass validation', () => {
  for (const value of [
    null,
    [],
    'text',
    { ...valid, naam: {} },
    { ...valid, bericht: ['hello'] },
    { ...valid, bedrijf: 12 },
  ])
    assert.ok(validateContact(value).error);
});
test('requires real input, rejects email and header injection, enforces length', () => {
  for (const value of [
    { ...valid, naam: ' ' },
    { ...valid, bericht: ' ' },
    { ...valid, email: 'bad' },
    { ...valid, email: 'test@example.com\nBcc:other@example.com' },
    { ...valid, naam: 'Hi\nBcc: other' },
    { ...valid, bericht: 'x'.repeat(5001) },
    { ...valid, bedrijf: 'x'.repeat(151) },
  ])
    assert.ok(validateContact(value).error);
});
test('honeypot suppresses email creation', () =>
  assert.equal(validateContact({ ...valid, website: 'spam' }).bot, true));
test('mail recipient cannot be overridden and user content stays plain text', () => {
  const data = validateContact({
    ...valid,
    to: 'attacker@example.com',
    bericht: '<script>alert(1)</script>',
  }).data;
  const payload = emailPayload(data);
  assert.deepEqual(payload.to, [RECIPIENT]);
  assert.equal(payload.reply_to, valid.email);
  assert.equal(payload.html, undefined);
  assert.ok(payload.text.includes('<script>alert(1)</script>'));
});
