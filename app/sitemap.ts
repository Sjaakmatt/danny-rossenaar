import type { MetadataRoute } from 'next';
import { projects } from '@/lib/content';
import { servicePages } from '@/lib/service-pages';
import { absoluteUrl, isPreview, projectImage } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];
  return [
    ...['/', '/werk', '/diensten', '/over', '/inzicht', '/contact'].map(
      (path) => ({ url: absoluteUrl(path) }),
    ),
    ...servicePages.map((service) => ({
      url: absoluteUrl(`/diensten/${service.slug}`),
      images: [absoluteUrl(service.image)],
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/werk/${project.slug}`),
      images: [absoluteUrl(projectImage(project))],
      videos: project.videos?.map((video) => ({
        title: video.title,
        description: `${video.title}. Onderdeel van de samenwerking van Rossenaar Marketing met ${project.title}.`,
        thumbnail_loc: absoluteUrl(video.poster),
        content_loc: absoluteUrl(video.src),
      })),
    })),
  ];
}
