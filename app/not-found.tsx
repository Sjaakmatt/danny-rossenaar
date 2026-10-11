import { Button } from '@/components/ui';
export default function NotFound() {
  return (
    <section className="not-found">
      <span>404 · EVEN VERDWAALD</span>
      <h1>
        Ander pad.
        <br />
        <em>Zelfde Danny.</em>
      </h1>
      <p>
        Deze pagina bestaat niet. Via de homepage vind je het verhaal, het werk
        en de weg naar een goed gesprek.
      </p>
      <Button href="/">Terug naar home</Button>
    </section>
  );
}
