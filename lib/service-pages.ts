export type ServicePage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  headline: string;
  emphasis: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: { title: string; body: string }[];
  deliverables: string[];
  steps: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  cases: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: 'social-media-beheer',
    name: 'Social media beheer',
    title: 'Social media beheer in Enkhuizen',
    description:
      'Social media uitbesteden aan Danny Rossenaar? Persoonlijke content en planning voor ondernemers in Enkhuizen en West-Friesland. Bespreek jouw plannen.',
    headline: 'Social media beheer.',
    emphasis: 'Wel jouw verhaal.',
    intro:
      'Social media beheer bij Rossenaar Marketing betekent samen bepalen wat je wilt vertellen, passende content maken en zorgen voor een duidelijke planning. Ik ben Danny, social media marketeer uit Enkhuizen. Ik help ondernemers in West-Friesland en daarbuiten om herkenbaar in beeld te blijven.',
    image: '/assets/op-locatie.webp',
    imageAlt: 'Danny maakt social media content op locatie bij een klant',
    sections: [
      {
        title: 'Uitbesteden zonder je eigen stem kwijt te raken',
        body: 'Je kent je klanten, je product en de vragen die elke week terugkomen. Daar begint goede content. Ik luister naar jouw verhaal en vertaal het naar berichten en beelden die bij je passen. Jij blijft betrokken bij de richting en we spreken af welke onderdelen ik overneem. Zo hoeft social media niet steeds onderaan je takenlijst te eindigen.',
      },
      {
        title: 'Wat past bij jouw bedrijf?',
        body: 'Een winkel heeft andere verhalen dan een dienstverlener. We kijken welke kanalen jouw klanten gebruiken en wat je daar wilt laten zien: een product, de mensen in je zaak of een antwoord op een veelgestelde vraag. Het aantal berichten en de combinatie van foto, video en tekst stemmen we af op je doelen en de tijd die beschikbaar is.',
      },
      {
        title: 'Berichten plaatsen of adverteren?',
        body: 'Met gewone berichten bouw je aan een herkenbaar verhaal op je eigen kanalen. Met betaalde advertenties breng je een specifieke boodschap onder de aandacht van een gekozen doelgroep. Dat zijn verschillende werkzaamheden. We bepalen samen of alleen content voldoende is of dat een Meta-campagne een logische aanvulling is.',
      },
    ],
    deliverables: [
      'Een inhoudelijke richting voor je kanalen',
      'Contentideeën, tekst en passende beelden',
      'Een planning die past bij jouw bedrijf',
      'Persoonlijk overleg over de voortgang',
    ],
    steps: [
      {
        title: 'Eerst jouw verhaal',
        body: 'We bespreken je klanten, doelen en wat jouw onderneming eigen maakt.',
      },
      {
        title: 'Dan een werkbare planning',
        body: 'We kiezen onderwerpen en spreken af wie wat maakt en wanneer we afstemmen.',
      },
      {
        title: 'Blijven kijken en bijsturen',
        body: 'We bespreken reacties en resultaten en bepalen welke verhalen een vervolg verdienen.',
      },
    ],
    faqs: [
      {
        question: 'Wat kost social media beheer?',
        answer:
          'Dat hangt af van de kanalen, hoeveelheid content en werkzaamheden die je wilt uitbesteden. Tijdens een kennismaking bespreken we je wensen en budget. Daarna maak ik een passend voorstel, zodat je vooraf weet wat inbegrepen is.',
      },
      {
        question: 'Kan ik zelf ook berichten blijven plaatsen?',
        answer:
          'Ja. We spreken af welke onderwerpen jij oppakt en welke ik verzorg. Zo blijft er ruimte voor spontane momenten uit je bedrijf, naast de geplande content.',
      },
      {
        question: 'Kom je ook langs om content te maken?',
        answer:
          'Ja, content op locatie is onderdeel van mijn aanbod. Vanuit Enkhuizen werk ik met ondernemers in West-Friesland. We bespreken vooraf welke beelden nodig zijn en plannen daar een geschikt moment voor.',
      },
      {
        question: 'Kan ik ook buiten West-Friesland met je samenwerken?',
        answer:
          'Ja. Voor ondernemers elders in Nederland bespreken we welke afstemming online kan en wanneer een bezoek op locatie nodig is. De aanpak en planning stemmen we daarop af.',
      },
    ],
    cases: ['chikado', 'chocolate-planet'],
  },
  {
    slug: 'content-creatie',
    name: 'Content, fotografie & video',
    title: 'Contentcreatie in West-Friesland',
    description:
      'Foto’s, video’s en social content met de mensen achter jouw bedrijf. Danny Rossenaar maakt content op locatie in Enkhuizen en West-Friesland. Bekijk het werk.',
    headline: 'Content maken.',
    emphasis: 'Van mens tot mens.',
    intro:
      'Rossenaar Marketing maakt foto’s, video’s en social content voor ondernemers in Enkhuizen en West-Friesland. Ik breng je product, dienst en de mensen achter je bedrijf in beeld. Van een kort verhaal op Instagram tot beelden voor een advertentiecampagne.',
    image: '/media/chikado-in-de-winkel.jpg',
    imageAlt:
      'Een echt klantmoment in de video over oorbellen schieten bij Chikado',
    sections: [
      {
        title: 'Je dagelijkse werk zit vol verhalen',
        body: 'Wat voor jou vanzelfsprekend is, kan voor een klant juist interessant zijn. Hoe maak je een product? Wat gebeurt er tijdens een afspraak? En wie staat er achter de toonbank? We zoeken naar die momenten en maken er een duidelijk verhaal van. Een herkenbaar gezicht en een echte ervaring geven mensen iets om op aan te haken.',
      },
      {
        title: 'Filmen op een manier die bij je past',
        body: 'Je hoeft geen presentator te zijn om goed in beeld te komen. We bespreken vooraf wat je wilt vertellen en kiezen een vorm waarin jij je prettig voelt. Dat kan een gesprek zijn, een kijkje achter de schermen of een dienst stap voor stap laten zien. Ik help je tijdens het maken en kies in de montage de momenten die het verhaal dragen.',
      },
      {
        title: 'Een voorbeeld: oorbellen schieten bij Chikado',
        body: 'Bij Chikado filmde ik het uitzoeken en schieten van oorbellen. In een tweede video vertelt een moeder over de ervaring van haar dochter. Zo laten we zowel de handeling als het persoonlijke verhaal zien. De video’s staan op de casepagina, zodat je zelf kunt bekijken hoe dat eruitziet.',
      },
    ],
    deliverables: [
      'Een idee en beeldplan voor jouw verhaal',
      'Foto of video op locatie',
      'Montage en selectie van het materiaal',
      'Content afgestemd op het afgesproken kanaal',
    ],
    steps: [
      {
        title: 'Het verhaal kiezen',
        body: 'Wat moet iemand na het zien weten, voelen of doen? Daar stemmen we de inhoud op af.',
      },
      {
        title: 'Samen in beeld',
        body: 'We plannen de opnames rond jouw zaak, de mensen en het moment dat we willen vastleggen.',
      },
      {
        title: 'Een vorm die werkt',
        body: 'Ik maak een selectie en werk het materiaal uit voor de afgesproken inzet.',
      },
    ],
    faqs: [
      {
        question: 'Kan ik alleen een video laten maken?',
        answer:
          'Ja. Je kunt voor een losse video, fotoserie of andere contentvraag bij me terecht. Je hoeft daarvoor geen doorlopend social media traject af te nemen.',
      },
      {
        question: 'Maak je ook reels voor Instagram?',
        answer:
          'Ja, korte verticale video’s horen bij mijn werk. Kijk bijvoorbeeld naar de video’s voor Chikado en Chocolate Planet om te zien hoe ik echte momenten en producten in beeld breng.',
      },
      {
        question: 'Wat moet ik voorbereiden voor een contentdag?',
        answer:
          'Denk na over wat je wilt laten zien, wie er in beeld komt en welke plek daarvoor geschikt is. We bespreken samen de opnameplanning en wat er nodig is, zodat je vooraf weet waar je aan toe bent.',
      },
      {
        question: 'Wat kost het om content te laten maken?',
        answer:
          'Dat hangt onder meer af van het aantal opnames, de locatie, de montage en de gewenste uitwerkingen. We maken eerst de opdracht concreet; daarna ontvang je een voorstel op maat.',
      },
    ],
    cases: ['chikado', 'chocolate-planet'],
  },
  {
    slug: 'meta-advertenties',
    name: 'Meta-advertenties',
    title: 'Meta-advertenties uitbesteden',
    description:
      'Adverteren op Facebook en Instagram met Danny Rossenaar. Van boodschap en content tot campagnebegeleiding en inzicht. Voor West-Friesland en daarbuiten.',
    headline: 'Meta-advertenties.',
    emphasis: 'Met een helder doel.',
    intro:
      'Meta-advertenties zijn betaalde advertenties op onder meer Facebook en Instagram. Rossenaar Marketing helpt je met de boodschap, advertentiecontent en campagnebegeleiding. Vanuit Enkhuizen werk ik met ondernemers in West-Friesland en elders in Nederland, met persoonlijk contact en inzicht in de voortgang.',
    image: '/media/chocolate-planet-bonbons.jpg',
    imageAlt:
      'Advertentie voor de handgemaakte paasbonbons van Chocolate Planet',
    sections: [
      {
        title: 'Beginnen bij het doel, niet bij de knop',
        body: 'Wil je meer bekendheid voor je zaak, aandacht voor een product of aanvragen voor een dienst? Dat bepaalt de boodschap en wat we onderweg bekijken. We bespreken wie je wilt bereiken en wat iemand na de advertentie moet kunnen doen. Pas als dat helder is, heeft het zin om de campagne verder in te richten.',
      },
      {
        title: 'Een advertentie die bij je zaak past',
        body: 'Een foto of video moet laten zien waarom jouw verhaal relevant is. Ik denk mee over de inhoud en werk die uit in een passende advertentie. Voor Café Retro maakte ik een Meta-campagne rond de zaak. Voor Chocolate Planet verzorg ik Meta-marketing en denk ik mee over nieuwe content. Op de casepagina’s lees je de ervaringen van de ondernemers.',
      },
      {
        title: 'Begrijpen wat er gebeurt',
        body: 'Bereik en klikken vertellen maar een deel van het verhaal. We spreken af welke uitkomsten relevant zijn voor jouw doel en bespreken wat we zien. Via het klantportaal op uitnodiging kun je inzicht krijgen in advertentieresultaten en aanvragen. Op deze website staat een interactieve rondleiding met fictieve gegevens om de werking te laten zien.',
      },
    ],
    deliverables: [
      'Een campagneaanpak rond jouw doel',
      'Advertentiecreatie en passende content',
      'Begeleiding en optimalisatie van de campagne',
      'Persoonlijk overleg en inzicht in resultaten',
    ],
    steps: [
      {
        title: 'Doel en budget bespreken',
        body: 'We maken duidelijk wat je wilt bereiken en welk budget en welke werkzaamheden daarbij passen.',
      },
      {
        title: 'De boodschap uitwerken',
        body: 'We kiezen beeld, tekst en de vervolgstap voor iemand die interesse heeft.',
      },
      {
        title: 'Bekijken en verbeteren',
        body: 'We volgen de campagne en bespreken wat de uitkomsten betekenen voor een volgende stap.',
      },
    ],
    faqs: [
      {
        question: 'Wat kost adverteren op Facebook en Instagram?',
        answer:
          'De kosten bestaan uit het advertentiebudget voor Meta en de afgesproken werkzaamheden voor content en campagnebegeleiding. Ik publiceer geen standaardbedrag: we bepalen eerst wat je doel is en welke inzet daarbij past.',
      },
      {
        question: 'Zijn Meta-advertenties hetzelfde als social media beheer?',
        answer:
          'Nee. Social media beheer gaat over je eigen kanalen en contentplanning. Bij Meta-advertenties betaal je om een boodschap onder de aandacht van een doelgroep te brengen. Beide kunnen samen worden ingezet, maar je kunt ook voor één onderdeel hulp vragen.',
      },
      {
        question: 'Kan ik de resultaten zelf bekijken?',
        answer:
          'Ja, voor advertentieresultaten en aanvragen is er een klantportaal op uitnodiging. We spreken af welke inzichten bij jouw samenwerking horen. De openbare rondleiding gebruikt uitsluitend fictieve voorbeeldgegevens.',
      },
      {
        question: 'Kun je vooraf een aantal klanten garanderen?',
        answer:
          'Nee. De uitkomst hangt onder meer af van je aanbod, doelgroep, budget en opvolging. We spreken een duidelijk doel af en gebruiken de resultaten om onderbouwd bij te sturen.',
      },
    ],
    cases: ['chocolate-planet', 'cafe-retro'],
  },
  {
    slug: 'personeelswerving',
    name: 'Personeelswerving via social media',
    title: 'Personeelswerving via social media',
    description:
      'Personeel zoeken in West-Friesland? Danny Rossenaar helpt je het verhaal achter de vacature te vertellen. Bekijk de samenwerking met Emiel Buis Visspecialist.',
    headline: 'Personeel gezocht.',
    emphasis: 'Laat je mensen zien.',
    intro:
      'Personeelswerving via social media begint bij laten zien hoe het is om bij jouw bedrijf te werken. Rossenaar Marketing helpt ondernemers in Enkhuizen en West-Friesland met het verhaal en de content achter een vacature. Zo krijgt een mogelijke nieuwe collega een concreter beeld van de zaak.',
    image: '/media/emiel-buis.jpg',
    imageAlt: 'Emiel Buis vertelt over zijn viszaak voor de camera',
    sections: [
      {
        title: 'Waarom zou iemand bij jou willen werken?',
        body: 'Een functieomschrijving vertelt wat iemand gaat doen. Het verhaal van je team laat zien hoe een werkdag voelt. We zoeken naar wat jouw zaak als werkgever herkenbaar maakt: de mensen, het contact met klanten en het werk achter de schermen. Dat geeft inhoud aan de vacature en helpt je om een gerichte boodschap te maken.',
      },
      {
        title: 'Van vacature naar een menselijk verhaal',
        body: 'We bespreken wie je zoekt, wat het werk inhoudt en welke informatie iemand nodig heeft om te reageren. Daarna kiezen we een passende vorm, bijvoorbeeld een korte video met de ondernemer of beelden van het dagelijkse werk. Ook de vervolgstap moet duidelijk zijn: wie neemt contact op en hoe verloopt een kennismaking?',
      },
      {
        title: 'De samenwerking met Emiel Buis Visspecialist',
        body: 'Voor Emiel Buis Visspecialist draaide de samenwerking om het vinden van personeel. Op de casepagina zie je Emiel aan het woord en een kijkje achter de schermen bij de visinkoop. De ondernemer en het werk krijgen daarmee een gezicht. Daar lees je ook zijn eigen woorden over de samenwerking.',
      },
    ],
    deliverables: [
      'Een verhaal rond jouw vacature en team',
      'Content die laat zien hoe het werk eruitziet',
      'Een duidelijke boodschap voor mogelijke collega’s',
      'Afstemming over campagne en opvolging',
    ],
    steps: [
      {
        title: 'De vacature begrijpen',
        body: 'We bespreken het werk, je team en wie je wilt bereiken.',
      },
      {
        title: 'De zaak laten zien',
        body: 'We kiezen echte mensen en momenten die iets vertellen over werken bij jouw bedrijf.',
      },
      {
        title: 'De reactie mogelijk maken',
        body: 'We stemmen de boodschap en het contact na een reactie op elkaar af.',
      },
    ],
    faqs: [
      {
        question: 'Voor welke bedrijven is dit bedoeld?',
        answer:
          'Voor ondernemers die mensen zoeken en hun bedrijf als werkgever beter willen laten zien. De samenwerking met Emiel Buis Visspecialist is een concreet voorbeeld. In een kennismaking bekijken we of deze aanpak bij jouw vacature past.',
      },
      {
        question: 'Gaat personeelswerving alleen om advertenties?',
        answer:
          'Nee. Een heldere vacature, een geloofwaardig verhaal en goede opvolging horen er ook bij. Content en advertenties kunnen dat verhaal verspreiden, maar iemand moet vervolgens makkelijk kunnen reageren en contact krijgen.',
      },
      {
        question: 'Kan ik een wervingsvideo laten maken zonder campagne?',
        answer:
          'Ja. We kunnen beginnen met content die je zelf gebruikt. Als je daarnaast hulp wilt met een Meta-campagne, bespreken we die als onderdeel van de opdracht.',
      },
      {
        question: 'Garandeer je dat de vacature wordt ingevuld?',
        answer:
          'Nee. Ik help je met de marketing rond je vacature. De uitkomst hangt ook af van het aanbod, de beschikbare kandidaten en de gesprekken die je voert. We maken vooraf duidelijke afspraken over mijn werkzaamheden.',
      },
    ],
    cases: ['emiel-buis'],
  },
];
