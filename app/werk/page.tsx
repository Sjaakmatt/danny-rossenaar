import { ContentShowcase } from '@/components/content-showcase';
import { PageIntro } from '@/components/ui';
import { WorkGrid } from '@/components/work-grid';
export const metadata = {
  title: 'Werk & samenwerkingen',
  description:
    'Van oorbellen schieten bij Chikado tot personeelswerving voor Emiel Buis Visspecialist. Ontdek de content, campagnes en samenwerkingen van Rossenaar Marketing.',
  alternates: { canonical: '/werk' },
};
export default function Werk() {
  return (
    <>
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
