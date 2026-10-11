export const RECIPIENT = 'danny@rossenaarmarketing.nl';
export const SENDER = 'Rossenaar Marketing <contact@rossenaarmarketing.nl>';

export function validateContact(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body))
    return { error: 'Vul je naam, e-mailadres en bericht in.' };
  if (typeof body.website === 'string' && body.website.trim())
    return { bot: true };
  const fields = {
    naam: 100,
    email: 200,
    bedrijf: 150,
    interesse: 150,
    bericht: 5000,
  };
  const data = {};
  for (const [key, max] of Object.entries(fields)) {
    const value = body[key] ?? '';
    if (typeof value !== 'string')
      return { error: 'Een van de velden is niet geldig.' };
    data[key] = value.trim();
    if (data[key].length > max)
      return {
        error: 'Een van de velden is te lang. Maak je bericht iets korter.',
      };
  }
  if (!data.naam || !data.email || !data.bericht)
    return { error: 'Vul je naam, e-mailadres en bericht in.' };
  if (!/^[^\s@<>"\\]+@[^\s@<>"\\]+\.[^\s@<>"\\]+$/.test(data.email))
    return { error: 'Dit e-mailadres lijkt niet te kloppen.' };
  if (/[\r\n]/.test(data.naam))
    return { error: 'Vul je naam op één regel in.' };
  return { data };
}

export function emailPayload(data) {
  return {
    from: SENDER,
    to: [RECIPIENT],
    reply_to: data.email,
    subject: `Nieuw bericht via de website: ${data.naam}`,
    text: `Nieuw bericht via rossenaarmarketing.nl\n\nNaam: ${data.naam}\nE-mail: ${data.email}\nBedrijf: ${data.bedrijf || 'Niet ingevuld'}\nInteresse: ${data.interesse || 'Kennismaken'}\n\nBericht:\n${data.bericht}`,
  };
}
