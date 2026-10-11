import { pageGraph, pageMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContentShowcase } from '@/components/content-showcase';
import { PageIntro } from '@/components/ui';
import { WorkGrid } from '@/components/work-grid';
const pageTitle = 'Klantcases: content en campagnes';
const description =
  'Van oorbellen schieten bij Chikado tot personeelswerving voor Emiel Buis. Bekijk de content, campagnes en klantervaringen van Rossenaar Marketing.';
const crumbs = [{ name: 'Werk', path: '/werk' }];
export const metadata = pageMetadata('/werk', pageTitle, description);
export default function Werk() {
  return (
    <>
      <StructuredData
        nodes={pageGraph('/werk', pageTitle, description, {
          crumbs,
          type: 'CollectionPage',
        })}
      />
      <Breadcrumbs items={crumbs} />
      <PageIntro
        label="Werk & samenwerkingen"
        title="Achter elk merk"
        italic="zit een mens."
        description="Van een café vol verhalen tot een bedrijf met grote plannen. Dit zijn een paar van de mensen met wie ik samenwerk."
      />
      <ContentShowcase />
      <section className="wrap work-section">
        <WorkGrid />
        <p className="concept-note">
          Een selectie uit de content en samenwerkingen. De omslagen van Café
          Retro en FactumAI zijn grafisch vormgegeven voor deze website.
        </p>
      </section>
    </>
  );
}
