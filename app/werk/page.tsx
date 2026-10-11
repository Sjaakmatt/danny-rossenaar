import { PageIntro } from '@/components/ui';
import { WorkGrid } from '@/components/work-grid';
export const metadata = {
  title: 'Werk & samenwerkingen',
  description:
    'Ontdek samenwerkingen met Café Retro, Chocolate Planet en FactumAI. Persoonlijke marketing die begint bij een goed gesprek.',
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
      <section className="wrap work-section">
        <WorkGrid />
        <p className="concept-note">
          De samenwerkingen zijn echt. De beelden op deze pagina zijn creatieve
          concepten voor deze website, geen gepubliceerde klantcampagnes.
        </p>
      </section>
    </>
  );
}
