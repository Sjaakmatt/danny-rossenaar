import type { SchemaNode } from '@/lib/seo';

export function StructuredData({ nodes }: { nodes: SchemaNode[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': nodes,
        }).replace(/</g, '\\u003c'),
      }}
    />
  );
}
