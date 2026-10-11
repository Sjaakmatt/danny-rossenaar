export const contact = {
  email: 'danny@rossenaarmarketing.nl',
  phone: '06 46 78 16 57',
  tel: '+31646781657',
  linkedin: 'https://www.linkedin.com/in/danny-rossenaar-433723112/',
};

export const services = [
  {
    slug: 'merkverhaal',
    number: '01',
    name: 'Een verhaal dat blijft.',
    label: 'Merkverhaal & branding',
    description:
      'Wat maakt jouw bedrijf bijzonder? We brengen het terug tot de kern. En geven die kern een herkenbare stem en uitstraling.',
    items: ['Positionering & merkverhaal', 'Visuele richting', 'Tone of voice'],
    accent: 'lime',
  },
  {
    slug: 'content',
    number: '02',
    name: 'Content die raakt.',
    label: 'Content & social media',
    description:
      'Van de eerste foto tot die ene sterke video. Content waarin mensen je herkennen, ook als je zelf even druk bent met ondernemen.',
    items: [
      'Fotografie & video',
      'Social content & planning',
      'Campagnecreatie',
    ],
    accent: 'peach',
  },
  {
    slug: 'zichtbaarheid',
    number: '03',
    name: 'In beeld bij de juiste mensen.',
    label: 'Online zichtbaarheid',
    description:
      'Je hoeft niet overal te zijn. Wel op de plekken waar jouw klanten kijken. Met gerichte advertenties en een goed vindbaar verhaal.',
    items: [
      'Meta-advertenties',
      'Online vindbaarheid',
      'Campagnes optimaliseren',
    ],
    accent: 'blue',
  },
  {
    slug: 'strategie',
    number: '04',
    name: 'Groei met een goed plan.',
    label: 'Strategie & persoonlijk contact',
    description:
      'We kiezen een richting die past bij je ambities én je agenda. Met duidelijke stappen, regelmatig contact en inzicht in wat werkt.',
    items: [
      'Marketingplan op maat',
      'Persoonlijke begeleiding',
      'Resultaten & klantinzichten',
    ],
    accent: 'sand',
  },
];

// Testimonials preserved verbatim from the original repository, commit fc59c60.
export const reviews = [
  {
    name: 'Bill Joe Bakker',
    company: 'Retro, Cafe & Events',
    initials: 'B',
    text: 'Danny verzorgde een advertentiecampagne via Meta voor mijn zaak Café Retro. Hij denkt goed mee, werkt snel en begrijpt precies wat je nodig hebt als ondernemer. De advertentie zag er professioneel uit en leverde direct goede reacties op. Aanrader voor ondernemers die serieus aan de slag willen met online marketing!',
  },
  {
    name: 'Paul Wagemaker',
    company: 'Chocolate Planet',
    initials: 'P',
    text: 'Ik ben ontzettend tevreden over de samenwerking met Danny. Al vijf maanden verzorgt hij onze Meta-marketing en de resultaten zijn top. Hij is sterk in communicatie, schakelt snel en komt steeds met originele en creatieve ideeën voor content. Fijn om met iemand te werken die meedenkt, proactief is en echt begrijpt wat werkt. Absoluut een aanrader!',
  },
  {
    name: 'Sjaak ter Veld',
    company: 'FactumAI',
    initials: 'S',
    text: 'Acquisitie schoot er bij mij structureel bij in. Sinds Danny de outbound doet, loopt dat wel. Hij werkt zich in het verhaal in voordat hij de telefoon pakt, en dat hoor je terug in de kwaliteit van de gesprekken. En hij belooft niets namens mij dat ik niet kan leveren. Aanrader voor iedere ondernemer die goed werk levert maar geen tijd heeft om het te verkopen.',
  },
  {
    name: 'Emiel Buis',
    company: 'via Google',
    initials: 'E',
    text: 'Al meerdere keren met Danny samen gewerkt. Het is best moeilijk om iets op beeld over te brengen. Danny weet precies wat hij doet en edit het juiste eruit. Prettige samenwerking in een leuke ongedwongen sfeer.',
  },
];

export const projects = [
  {
    slug: 'chocolate-planet',
    title: 'Chocolate Planet',
    category: 'Content & campagnes',
    filter: 'Campagnes',
    art: 'chocolate' as const,
    intro: 'Een goed product verdient een verhaal waar je trek van krijgt.',
    description:
      'Voor Chocolate Planet verzorgt Danny Meta-marketing en denkt hij mee over nieuwe content. Persoonlijk contact en snel schakelen staan centraal in de samenwerking.',
    scope: ['Meta-marketing', 'Contentideeën', 'Campagnebegeleiding'],
    reviewIndex: 1,
  },
  {
    slug: 'cafe-retro',
    title: 'Café Retro',
    category: 'Social & advertenties',
    filter: 'Campagnes',
    art: 'cafe' as const,
    intro: 'De sfeer van je zaak. Al voordat iemand binnenstapt.',
    description:
      'Voor Café Retro werkte Danny aan een advertentiecampagne via Meta. Met aandacht voor de zaak, de ondernemer en een professionele advertentie die past bij de sfeer.',
    scope: ['Meta-campagne', 'Advertentiecreatie', 'Persoonlijk advies'],
    reviewIndex: 0,
  },
  {
    slug: 'factumai',
    title: 'FactumAI',
    category: 'Verhaal & persoonlijk contact',
    filter: 'Persoonlijk contact',
    art: 'factum' as const,
    intro: 'Een goed gesprek begint met weten wie je voor je hebt.',
    description:
      'Voor FactumAI verzorgt Danny outbound acquisitie. Hij verdiept zich eerst in het verhaal, zodat elk gesprek klopt met wat het bedrijf kan bieden.',
    scope: [
      'Outbound acquisitie',
      'Klantgesprekken',
      'Verdieping in het aanbod',
    ],
    reviewIndex: 2,
  },
];
