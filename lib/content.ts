import type { ArtType } from '@/components/campaign-art';

export const contact = {
  email: 'danny@rossenaarmarketing.nl',
  phone: '06 46 78 16 57',
  tel: '+31646781657',
  linkedin: 'https://www.linkedin.com/in/danny-rossenaar-433723112/',
};

export const services = [
  {
    slug: 'merkverhaal',
    href: '/diensten/social-media-beheer',
    number: '01',
    name: 'Een verhaal dat blijft.',
    label: 'Social media beheer',
    interest: 'Social media beheer',
    description:
      'Jouw verhaal, herkenbaar op je eigen kanalen. We kiezen de richting, maken een werkbare planning en houden samen zicht op wat bij jouw klanten past.',
    items: [
      'Jouw verhaal & eigen stem',
      'Contentplanning',
      'Persoonlijk overleg',
    ],
    accent: 'lime',
  },
  {
    slug: 'content',
    href: '/diensten/content-creatie',
    number: '02',
    name: 'Content die raakt.',
    label: 'Contentcreatie',
    interest: 'Content, fotografie & video',
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
    href: '/diensten/meta-advertenties',
    number: '03',
    name: 'In beeld bij de juiste mensen.',
    label: 'Meta-advertenties',
    interest: 'Meta-advertenties',
    description:
      'Je hoeft niet overal te zijn. Wel op de plekken waar jouw klanten kijken. Met gerichte advertenties op Facebook en Instagram en inzicht in wat werkt.',
    items: [
      'Meta-advertenties',
      'Doelgroep & advertentiecontent',
      'Campagnes optimaliseren',
    ],
    accent: 'blue',
  },
  {
    slug: 'strategie',
    href: '/diensten/personeelswerving',
    number: '04',
    name: 'De juiste mensen. Voor jouw zaak.',
    label: 'Personeelswerving',
    interest: 'Personeelswerving via social media',
    description:
      'Laat zien hoe het is om bij jou te werken. Met echte verhalen van je team en een gerichte campagne brengen we jouw vacature onder de aandacht.',
    items: [
      'Jouw team & de werkvloer in beeld',
      'Vacaturecampagne via social media',
      'Inzicht in reacties & aanvragen',
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

export type Project = {
  slug: string;
  title: string;
  category: string;
  filter: string;
  website?: { url: string; label: string };
  location?: string;
  cover:
    | { art: ArtType; src?: never; alt?: never }
    | { src: string; alt: string; art?: never };
  mediaCaption: string;
  intro: string;
  description: string;
  approach?: { title: string; emphasis: string };
  scope: string[];
  reviewIndex?: number;
  videos?: { src: string; poster: string; title: string }[];
};

export const projects: Project[] = [
  {
    slug: 'chikado',
    title: 'Chikado',
    category: 'Oorbellen schieten · video & content',
    filter: 'Content',
    cover: {
      src: '/media/chikado-in-de-winkel.jpg',
      alt: 'Oorbellen uitzoeken en laten schieten bij Chikado',
    },
    mediaCaption: 'Een moment uit de video voor Chikado.',
    intro: 'Een spannend moment. Een verhaal van dichtbij.',
    approach: {
      title: 'Meer dan oorbellen.',
      emphasis: 'Een persoonlijke ervaring.',
    },
    description:
      'Voor Chikado bracht Danny het schieten van oorbellen in beeld. Van het uitzoeken in de winkel tot het grote moment. In een tweede video vertelt een moeder over de ervaring van haar dochter. Zo krijgt de dienst een gezicht, met de mensen en hun verhaal centraal.',
    scope: [
      'Video op locatie',
      'Oorbellen schieten in beeld',
      'Klantervaring op video',
    ],
    videos: [
      {
        src: '/media/chikado-in-de-winkel.mp4',
        poster: '/media/chikado-in-de-winkel.jpg',
        title: 'Chikado: van oorbellen kiezen tot het grote moment',
      },
      {
        src: '/media/chikado-klantervaring.mp4',
        poster: '/media/chikado-klantervaring.jpg',
        title:
          'Een moeder vertelt over de ervaring van haar dochter bij Chikado',
      },
    ],
  },
  {
    slug: 'emiel-buis',
    title: 'Emiel Buis Visspecialist',
    category: 'Personeelswerving · nieuwe collega’s vinden',
    filter: 'Personeelswerving',
    cover: {
      src: '/media/emiel-buis.jpg',
      alt: 'Emiel Buis vertelt over zijn zaak',
    },
    mediaCaption: 'Emiel Buis aan het woord in zijn zaak.',
    intro: 'Nieuwe collega’s vinden voor de viszaak.',
    approach: { title: 'Een gezicht achter', emphasis: 'de vacature.' },
    description:
      'Voor Emiel Buis Visspecialist draaide de samenwerking om het vinden van personeel. Personeelswerving vraagt om een ander verhaal dan een advertentie voor klanten. Niet alleen wat je verkoopt, maar vooral hoe het is om bij de zaak te werken.',
    scope: ['Personeelswerving', 'De viszaak als werkgever'],
    reviewIndex: 3,
    videos: [
      {
        src: '/media/emiel-buis.mp4',
        poster: '/media/emiel-buis.jpg',
        title: 'Emiel Buis vertelt over zijn zaak',
      },
      {
        src: '/media/vis-achter-de-schermen.mp4',
        poster: '/media/vis-achter-de-schermen.jpg',
        title: 'Een kijkje achter de schermen bij de visinkoop',
      },
    ],
  },
  {
    slug: 'chocolate-planet',
    title: 'Chocolate Planet',
    category: 'Content & campagnes',
    filter: 'Campagnes',
    cover: { art: 'chocolate' },
    mediaCaption: 'Aangeleverde advertentie voor Chocolate Planet.',
    intro: 'Een goed product verdient een verhaal waar je trek van krijgt.',
    description:
      'Voor Chocolate Planet verzorgt Danny Meta-marketing en denkt hij mee over nieuwe content. Persoonlijk contact en snel schakelen staan centraal in de samenwerking.',
    scope: ['Meta-marketing', 'Contentideeën', 'Campagnebegeleiding'],
    reviewIndex: 1,
    videos: [
      {
        src: '/media/chocolate-planet-matcha.mp4',
        poster: '/media/chocolate-planet-matcha.jpg',
        title: 'Matcha en chocolade bij Chocolate Planet',
      },
      {
        src: '/media/chocolate-planet-letters.mp4',
        poster: '/media/chocolate-planet-letters.jpg',
        title: 'Chocoladeletters van Chocolate Planet',
      },
    ],
  },
  {
    slug: 'cafe-retro',
    title: 'Café Retro',
    category: 'Social & advertenties',
    filter: 'Campagnes',
    cover: { art: 'cafe' },
    mediaCaption: 'Grafisch projectomslag voor deze website.',
    intro: 'De sfeer van je zaak. Al voordat iemand binnenstapt.',
    description:
      'Voor Café Retro werkte Danny aan een advertentiecampagne via Meta. Met aandacht voor de zaak, de ondernemer en een professionele advertentie die past bij de sfeer.',
    scope: ['Meta-campagne', 'Advertentiecreatie', 'Persoonlijk advies'],
    reviewIndex: 0,
  },
  {
    slug: 'factumai',
    title: 'FactumAI',
    website: { url: 'https://factumai.nl', label: 'factumai.nl' },
    location: 'Hoogkarspel',
    category: 'Verhaal & persoonlijk contact',
    filter: 'Persoonlijk contact',
    cover: { art: 'factum' },
    mediaCaption: 'Grafisch projectomslag voor deze website.',
    intro: 'Een goed gesprek begint met weten wie je voor je hebt.',
    description:
      'Voor FactumAI uit Hoogkarspel verzorgt Danny outbound acquisitie. Hij verdiept zich eerst in het verhaal, zodat elk gesprek klopt met wat het bedrijf kan bieden.',
    scope: [
      'Outbound acquisitie',
      'Klantgesprekken',
      'Verdieping in het aanbod',
    ],
    reviewIndex: 2,
  },
];
