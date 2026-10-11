// Serverless functie die het contactformulier verstuurt via Resend.
// De API-sleutel staat in de omgevingsvariabele RESEND_API_KEY en komt
// dus nooit in de website zelf terecht.

const AFZENDER = 'Rossenaar Marketing <contact@rossenaarmarketing.nl>';
const ONTVANGER = 'danny@rossenaarmarketing.nl';

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode niet toegestaan' });
  }

  const { naam, email, bericht, website } = req.body || {};

  // Verborgen veld dat alleen bots invullen
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!naam || !email || !bericht) {
    return res.status(400).json({ error: 'Vul je naam, e-mailadres en bericht in.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Dit e-mailadres lijkt niet te kloppen.' });
  }

  if (naam.length > 100 || email.length > 200 || bericht.length > 5000) {
    return res.status(400).json({ error: 'Je bericht is te lang.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY ontbreekt');
    return res.status(500).json({ error: 'Het formulier is nog niet ingesteld.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: AFZENDER,
        to: [ONTVANGER],
        reply_to: email,
        subject: `Nieuw bericht via de website: ${naam}`,
        html: `
          <h2>Nieuw bericht via rossenaarmarketing.nl</h2>
          <p><strong>Naam:</strong> ${escapeHtml(naam)}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Bericht:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(bericht)}</p>
        `,
        text: `Nieuw bericht via rossenaarmarketing.nl\n\nNaam: ${naam}\nE-mail: ${email}\n\nBericht:\n${bericht}`,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Resend gaf een fout:', response.status, details);
      return res.status(502).json({ error: 'Versturen is niet gelukt. Probeer het later opnieuw.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Fout bij versturen:', error);
    return res.status(500).json({ error: 'Versturen is niet gelukt. Probeer het later opnieuw.' });
  }
}
