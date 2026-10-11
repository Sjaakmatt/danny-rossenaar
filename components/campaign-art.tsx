import Image from 'next/image';
import { ArrowUpRight, AudioLines } from 'lucide-react';
import { BrandMark } from './ui';
export type ArtType =
  | 'chocolate'
  | 'cafe'
  | 'factum'
  | 'danny'
  | 'story'
  | 'location'
  | 'emiel'
  | 'kingma';
export function CampaignArt({
  type,
  priority = false,
}: {
  type: ArtType;
  priority?: boolean;
}) {
  return (
    <div className={`campaign-art art-${type}`}>
      {(type === 'chocolate' || type === 'kingma' || type === 'emiel') && (
        <Image
          src={
            type === 'chocolate'
              ? '/media/chocolate-planet-bonbons.jpg'
              : type === 'kingma'
                ? '/media/la-kingma-advertentie.jpg'
                : '/media/emiel-buis.jpg'
          }
          alt={
            type === 'chocolate'
              ? 'Advertentie voor handgemaakte paasbonbons van Chocolate Planet'
              : type === 'kingma'
                ? 'La Kingma advertentie voor hondenvoeding'
                : 'Emiel Buis vertelt over zijn zaak'
          }
          fill
          sizes="(max-width: 700px) 85vw, 640px"
          style={{ objectFit: 'contain' }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      {type === 'cafe' && (
        <>
          <span className="art-topline">MAAK VAN VANDAAG EEN</span>
          <strong>
            goede
            <br />
            <em>avond.</em>
          </strong>
          <span className="art-bottomline">
            SAMEN MAAK JE HET MOOIER <ArrowUpRight size={20} />
          </span>
        </>
      )}
      {type === 'factum' && (
        <>
          <span className="art-topline">HET BEGINT MET CONTACT</span>
          <div className="orbit-design" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>
              <AudioLines size={52} />
            </span>
          </div>
          <strong>
            Goed contact.
            <br />
            <em>Groot verschil.</em>
          </strong>
          <span className="art-bottomline">
            PERSOONLIJK WERKT <ArrowUpRight size={20} />
          </span>
        </>
      )}
      {type === 'story' && (
        <>
          <BrandMark className="art-brand" />
          <strong>
            Laat van
            <br />
            je <em>horen.</em>
          </strong>
          <span className="art-bottomline">
            JOUW VERHAAL VERDIENT HET <ArrowUpRight size={20} />
          </span>
          <div className="art-asterisk" aria-hidden="true">
            ✳
          </div>
        </>
      )}
      {type === 'location' && (
        <>
          <Image
            src="/assets/op-locatie.webp"
            alt="Content maken op locatie bij een klant"
            fill
            sizes="(max-width: 700px) 85vw, 480px"
            loading={priority ? 'eager' : 'lazy'}
          />
          <span className="art-bottomline">
            OP LOCATIE BIJ EEN KLANT <ArrowUpRight size={20} />
          </span>
        </>
      )}
      {type === 'danny' && (
        <>
          <Image
            src="/assets/danny-hero.jpg"
            alt="Danny Rossenaar"
            fill
            sizes="(max-width: 700px) 85vw, 480px"
            loading={priority ? 'eager' : 'lazy'}
          />
          <span className="danny-sticker">
            <span className="status-dot" />
            Aangenaam, Danny.
          </span>
          <span className="art-bottomline">
            JOUW VASTE AANSPREEKPUNT <ArrowUpRight size={20} />
          </span>
        </>
      )}
    </div>
  );
}
