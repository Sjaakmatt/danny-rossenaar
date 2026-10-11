import type { Metadata } from 'next';
import { contact, type Project } from './content';

export const site = {
  url: 'https://www.rossenaarmarketing.nl',
  name: 'Rossenaar Marketing',
  description:
    'Social media marketing, content en Meta-advertenties met Danny Rossenaar uit Enkhuizen. Voor ondernemers in West-Friesland en daarbuiten. Maak kennis.',
};
export const absoluteUrl = (path = '/') => new URL(path, site.url).href;
export const isPreview = Boolean(
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production',
);
export const organizationId = absoluteUrl('/#organisatie');
export const personId = absoluteUrl('/over#danny');
export const websiteId = absoluteUrl('/#website');
export const serviceArea = [
  { '@type': 'City', name: 'Enkhuizen' },
  { '@type': 'AdministrativeArea', name: 'West-Friesland, Noord-Holland' },
  { '@type': 'Country', name: 'Nederland' },
];

export function pageMetadata(
  path: string,
  title: string,
  description: string,
  image = '/assets/og-image.png',
): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const shareImage = { url: absoluteUrl(image), alt: fullTitle };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      siteName: site.name,
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}

export type SchemaNode = Record<string, unknown>;
export const organizationGraph: SchemaNode[] = [
  {
    '@type': 'Organization',
    '@id': organizationId,
    name: site.name,
    url: absoluteUrl(),
    description: site.description,
    logo: absoluteUrl('/assets/logo.png'),
    image: absoluteUrl('/assets/op-locatie.webp'),
    email: contact.email,
    telephone: contact.tel,
    founder: { '@id': personId },
    areaServed: serviceArea,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'kennismaken en klantcontact',
      telephone: contact.tel,
      email: contact.email,
      availableLanguage: 'nl',
    },
  },
  {
    '@type': 'Person',
    '@id': personId,
    name: 'Danny Rossenaar',
    url: absoluteUrl('/over'),
    image: absoluteUrl('/assets/danny-hero.jpg'),
    jobTitle: 'Social media marketeer',
    worksFor: { '@id': organizationId },
    sameAs: [contact.linkedin],
    description:
      'Danny Rossenaar is social media marketeer uit Enkhuizen en begon in juni 2024 Rossenaar Marketing. Daarvoor werkte hij acht jaar in de zorg.',
  },
  {
    '@type': 'WebSite',
    '@id': websiteId,
    name: site.name,
    url: absoluteUrl(),
    inLanguage: 'nl-NL',
    publisher: { '@id': organizationId },
  },
];

export type Crumb = { name: string; path: string };
export function pageGraph(
  path: string,
  name: string,
  description: string,
  options: {
    type?: string;
    crumbs?: Crumb[];
    mainEntity?: SchemaNode;
  } = {},
): SchemaNode[] {
  const url = absoluteUrl(path);
  const crumbs = options.crumbs;
  return [
    {
      '@type': options.type ?? 'WebPage',
      '@id': `${url}#pagina`,
      url,
      name,
      description,
      inLanguage: 'nl-NL',
      isPartOf: { '@id': websiteId },
      publisher: { '@id': organizationId },
      about: { '@id': organizationId },
      ...(options.mainEntity && { mainEntity: options.mainEntity }),
      ...(crumbs && { breadcrumb: { '@id': `${url}#broodkruimels` } }),
    },
    ...(crumbs
      ? [
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#broodkruimels`,
            itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map(
              (crumb, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: crumb.name,
                item: absoluteUrl(crumb.path),
              }),
            ),
          },
        ]
      : []),
  ];
}

export function projectImage(project: Project) {
  return (
    project.cover.src ??
    (project.cover.art === 'chocolate'
      ? '/media/chocolate-planet-bonbons.jpg'
      : '/assets/og-image.png')
  );
}

export const projectSearch: Record<
  string,
  { title: string; description: string }
> = {
  chikado: {
    title: 'Chikado: video over oorbellen schieten',
    description:
      'Van oorbellen kiezen tot de ervaring van een moeder en dochter: bekijk de video’s die Danny Rossenaar maakte voor Chikado. Content met echte mensen.',
  },
  'emiel-buis': {
    title: 'Emiel Buis: personeelswerving',
    description:
      'Nieuwe collega’s vinden voor Emiel Buis Visspecialist. Bekijk de samenwerking met Danny Rossenaar en de video’s die de mensen achter de viszaak laten zien.',
  },
  'chocolate-planet': {
    title: 'Chocolate Planet: content en Meta-ads',
    description:
      'Meta-marketing en content voor Chocolate Planet. Bekijk de advertenties, video’s en ervaring van de ondernemer met de persoonlijke aanpak van Danny Rossenaar.',
  },
  'cafe-retro': {
    title: 'Café Retro: Meta-advertentiecampagne',
    description:
      'Een Meta-advertentiecampagne die past bij Café Retro. Lees hoe Danny Rossenaar meedenkt met de ondernemer en ontdek zijn ervaring met de samenwerking.',
  },
  factumai: {
    title: 'FactumAI: persoonlijke acquisitie',
    description:
      'Outbound acquisitie voor FactumAI, met aandacht voor het verhaal achter het aanbod. Lees de ervaring met Danny Rossenaar en zijn persoonlijke klantgesprekken.',
  },
};
