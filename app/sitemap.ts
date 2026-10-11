import type { MetadataRoute } from 'next';
import { projects } from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/werk',
    '/diensten',
    '/over',
    '/inzicht',
    '/contact',
    '/privacy',
    ...projects.map((p) => `/werk/${p.slug}`),
  ].map((path) => ({
    url: `https://www.rossenaarmarketing.nl${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
