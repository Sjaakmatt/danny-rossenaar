import Image from 'next/image';
import { ArrowUpRight, AudioLines } from 'lucide-react';
import { BrandMark } from './ui';
export type ArtType = 'chocolate' | 'cafe' | 'factum' | 'danny' | 'story';
export function CampaignArt({
  type,
  priority = false,
}: {
  type: ArtType;
  priority?: boolean;
}) {
  return (
    <div className={`campaign-art art-${type}`}>
      {(type === 'chocolate' || type === 'cafe') && (
        <Image
          src={`/assets/${type}-concept.webp`}
          alt={
            type === 'chocolate'
              ? 'Conceptbeeld: chocolade op een terracotta achtergrond'
              : 'Conceptbeeld: twee mensen proosten in een warm café'
          }
          fill
          sizes="(max-width: 700px) 85vw, 480px"
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      {type === 'chocolate' && (
        <>
          <span className="art-topline">EEN SMAAKVOL VERHAAL</span>
          <strong>
            Om bij
            <br />
            <em>stil te staan.</em>
          </strong>
          <span className="art-bottomline">
            CONTENT DIE JE VOELT <ArrowUpRight size={20} />
          </span>
        </>
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
