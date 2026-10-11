import { NextResponse } from 'next/server';
import { emailPayload, validateContact } from '@/lib/contact.mjs';

const MAX_BYTES = 32_768;
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  // Next's internal request URL can use localhost behind a proxy. Match the
  // incoming Host instead, so same-origin forms also work on preview domains.
  const host = request.headers.get('host') || new URL(request.url).host;
  if (origin) {
    try {
      if (new URL(origin).host !== host)
        return NextResponse.json(
          { error: 'Deze aanvraag is niet toegestaan.' },
          { status: 403 },
        );
    } catch {
      return NextResponse.json(
        { error: 'Deze aanvraag is niet toegestaan.' },
        { status: 403 },
      );
    }
  }
  if (!request.headers.get('content-type')?.includes('application/json'))
    return NextResponse.json(
      { error: 'Ongeldig berichtformaat.' },
      { status: 415 },
    );
  let body: unknown;
  try {
    // Enforce the limit while reading; do not trust Content-Length alone.
    const reader = request.body?.getReader();
    if (!reader)
      return NextResponse.json(
        { error: 'Je bericht is leeg.' },
        { status: 400 },
      );
    let bytes = 0;
    let raw = '';
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        return NextResponse.json(
          { error: 'Je bericht is te lang.' },
          { status: 413 },
        );
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: 'Je bericht kon niet worden gelezen.' },
      { status: 400 },
    );
  }
  const result = validateContact(body);
  if (result.bot) return NextResponse.json({ ok: true });
  if (result.error || !result.data)
    return NextResponse.json({ error: result.error }, { status: 400 });
  const key = process.env.RESEND_API_KEY;
  if (!key)
    return NextResponse.json(
      {
        error:
          'Het formulier is momenteel niet beschikbaar. Mail me op danny@rossenaarmarketing.nl of bel 06 46 78 16 57.',
      },
      { status: 503 },
    );
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload(result.data)),
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) {
      console.error('Contact delivery failed with status', response.status);
      return NextResponse.json(
        {
          error:
            'Versturen is niet gelukt. Probeer het later opnieuw of mail Danny rechtstreeks.',
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          'Versturen duurt te lang of is niet gelukt. Probeer het later opnieuw of mail Danny rechtstreeks.',
      },
      { status: 502 },
    );
  }
}
