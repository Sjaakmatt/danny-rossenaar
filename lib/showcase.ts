import type { ArtType } from '@/components/campaign-art';

type ShowcaseBase = {
  title: string;
  label: string;
  href?: string;
  linkLabel?: string;
  fit?: 'contain' | 'cover';
};
export type ShowcaseItem = ShowcaseBase &
  (
    | { kind: 'art'; art: ArtType }
    | { kind: 'image'; src: string; alt: string }
    | {
        kind: 'video';
        src: string;
        poster: string;
        alt: string;
        hasAudio: boolean;
      }
  );

// Supplied client work. Video exports retain the full source frame and subtitles.
export const showcase: ShowcaseItem[] = [
  {
    kind: 'image',
    src: '/media/la-kingma-advertentie.jpg',
    alt: 'La Kingma Trimsalon advertentie voor Amanova hondenvoer en gratis voedingsadvies',
    title: 'Een goed verhaal verdient aandacht.',
    label: 'La Kingma · social advertentie',
    fit: 'contain',
  },
  {
    kind: 'video',
    src: '/media/emiel-buis.mp4',
    poster: '/media/emiel-buis.jpg',
    alt: 'Emiel Buis vertelt over zijn zaak',
    title: 'De ondernemer aan het woord.',
    label: 'Emiel Buis · videoportret',
    fit: 'contain',
    hasAudio: true,
  },
  {
    kind: 'video',
    src: '/media/chocolate-planet-matcha.mp4',
    poster: '/media/chocolate-planet-matcha.jpg',
    alt: 'Matcha en chocolade bij Chocolate Planet',
    title: 'Gemaakt om van te proeven.',
    label: 'Chocolate Planet · social video',
    fit: 'contain',
    hasAudio: false,
  },
  {
    kind: 'image',
    src: '/assets/op-locatie.webp',
    alt: 'Content maken in de winkel van een klant',
    title: 'Jouw verhaal, van dichtbij.',
    label: 'Op locatie bij een klant',
    href: '/over',
    linkLabel: 'Samen content maken',
  },
  {
    kind: 'image',
    src: '/media/chocolate-planet-bonbons.jpg',
    alt: 'Chocolate Planet advertentie voor handgemaakte paasbonbons met gezouten karamel',
    title: 'Kleine bonbons. Vol karakter.',
    label: 'Chocolate Planet · social advertentie',
    fit: 'contain',
    href: '/werk/chocolate-planet',
    linkLabel: 'Over deze samenwerking',
  },
  {
    kind: 'video',
    src: '/media/chocolate-planet-letters.mp4',
    poster: '/media/chocolate-planet-letters.jpg',
    alt: 'Chocoladeletters van Chocolate Planet',
    title: 'Een letter die naar meer smaakt.',
    label: 'Chocolate Planet · seizoenscampagne',
    fit: 'contain',
    hasAudio: false,
  },
  {
    kind: 'video',
    src: '/media/reisverhaal.mp4',
    poster: '/media/reisverhaal.jpg',
    alt: 'Reisvideo met uitzicht op het water',
    title: 'Even helemaal ergens anders.',
    label: 'Reisverhaal · social video',
    fit: 'contain',
    hasAudio: false,
  },
  {
    kind: 'video',
    src: '/media/vis-achter-de-schermen.mp4',
    poster: '/media/vis-achter-de-schermen.jpg',
    alt: 'Een kijkje achter de schermen bij de visinkoop',
    title: 'Laat zien waar je voor staat.',
    label: 'Achter de schermen · social video',
    fit: 'contain',
    hasAudio: true,
  },
  {
    kind: 'image',
    src: '/media/chocolate-planet-bedankt.jpg',
    alt: 'Chocolate Planet advertentie: zeg bedankt met chocolade',
    title: 'Een klein gebaar. Een groot bedankje.',
    label: 'Chocolate Planet · social advertentie',
    fit: 'contain',
    href: '/werk/chocolate-planet',
    linkLabel: 'Over deze samenwerking',
  },
];
