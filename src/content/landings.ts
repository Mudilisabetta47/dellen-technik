import type { Faq, ServiceImageKey, Step } from './services';
import type { CaseId } from './guides';

export type LandingBlock =
  | { type: 'split'; id: string; eyebrow: string; title: string; paras: string[]; tone?: 'dark' | 'darker' }
  | { type: 'conditions'; id: string; eyebrow: string; title: string; intro: string; good: string[]; limits: string[]; note?: string }
  | { type: 'dent' }
  | { type: 'facts'; id: string; eyebrow: string; title: string; items: Step[] }
  | { type: 'steps'; title: string; steps: Step[] }
  | { type: 'case'; caseId: CaseId }
  | { type: 'region'; id: string; eyebrow: string; title: string; paras: string[]; regionSlug: string; places: string[] };

export type Landing = {
  slug: string;
  /** Ziel-Suchanfragen (interne Dokumentation, wird nicht angezeigt). */
  keywords: string[];
  seo: { title: string; description: string; ogTitle: string; ogDescription: string };
  eyebrow: string;
  h1: [string, string];
  heroSub: string;
  image: ServiceImageKey;
  imageAlt: string;
  pillar: string;
  services: string[];
  regions: string[];
  guides: string[];
  schemaName: string;
  schemaDescription: string;
  blocks: LandingBlock[];
  faq: Faq[];
};

export const LANDINGS: Landing[] = [
  {
    slug: 'delle-ohne-lackieren-bremen',
    keywords: ['Delle ohne Lackieren Bremen', 'Delle entfernen ohne Lackieren Bremen', 'Parkdelle ohne Lackieren Bremen', 'Beule ohne Lackieren Bremen'],
    seo: {
      title: 'Delle ohne Lackieren entfernen in Bremen | Dellen Technik',
      description:
        'Delle ohne Lackieren in Bremen entfernen: lackschonend bei intaktem Lack, mit ehrlicher Einschätzung. Kostenlose Begutachtung in Lilienthal an der Bremer Stadtgrenze.',
      ogTitle: 'Delle ohne Lackieren in Bremen – wann es geht und wie',
      ogDescription: 'Parkdelle, Beule, Hageltreffer: Wann der Werkslack erhalten bleiben kann – und wie die kostenlose Einschätzung abläuft.',
    },
    eyebrow: 'Lackschonend · Bremen',
    h1: ['Delle ohne Lackieren', 'entfernen in Bremen.'],
    heroSub:
      'Parkdelle, Beule oder Hageltreffer: Wenn der Lack intakt ist, kann die Delle oft zurückgeformt werden – ohne Spachteln und Neulackierung. Für Bremen direkt an der Stadtgrenze, in Lilienthal.',
    image: 'dent',
    imageAlt: 'Glänzende dunkle Karosseriefläche mit einer Delle im Spiegelbild der Lichtstreifen',
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'beulenentfernung', 'smart-repair'],
    regions: ['bremen', 'lilienthal'],
    guides: ['delle-ohne-lackieren-entfernen', 'welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'was-kostet-eine-dellenreparatur', 'kann-eine-delle-unsichtbar-repariert-werden'],
    schemaName: 'Delle ohne Lackieren entfernen (Bremen)',
    schemaDescription: 'Lackschonende Entfernung von Dellen und Beulen bei intaktem Lack – für Kunden aus Bremen und Umgebung.',
    blocks: [
      {
        type: 'split',
        id: 'problem-h',
        eyebrow: 'Das Problem',
        title: 'Da ist eine Delle. Muss jetzt lackiert werden?',
        paras: [
          'Wer in Bremen eine Delle im Auto entdeckt, denkt oft sofort an Spachteln, Schleifen und Neulackieren – und an die Kosten und den Aufwand, die damit verbunden sind. Dabei ist bei vielen Dellen der Lack gar nicht das Problem: Er ist nicht gerissen, nur das Blech darunter ist verformt.',
          'Genau dann kann die Delle häufig lackschonend zurückgeformt werden. Der originale Werkslack bleibt, wo er ist. Wichtig ist der ehrliche Blick auf die Voraussetzungen – denn nicht jede Delle eignet sich dafür.',
        ],
      },
      {
        type: 'conditions',
        id: 'wann-h',
        eyebrow: 'Voraussetzungen',
        title: 'Wann eine Delle ohne Lackieren reparierbar sein kann.',
        intro: 'Eine lackschonende Reparatur kommt in Frage, wenn mehrere Punkte zusammenkommen. Ein Versprechen für jede Delle gibt es nicht – und das ist bei seriösen Betrieben auch nicht üblich.',
        good: [
          'Der Lack ist nicht gerissen und nicht abgeplatzt.',
          'Die Delle ist eine sanfte Mulde, kein scharfer Knick.',
          'Die Verformung ist nicht extrem tief.',
          'Die Stelle ist zugänglich – zum Beispiel auf einer Tür, einem Kotflügel oder der Motorhaube.',
        ],
        limits: [
          'Lackriss oder Abplatzer: Ausbeulen allein reicht nicht.',
          'Sehr tiefe Verformung oder scharfe Falte.',
          'Stark gestrecktes Material.',
          'Kanten und Sicken: möglich, aber anspruchsvoller.',
          'Größere Unfallschäden mit verformter Struktur: eher ein Fall für Karosserie und Lackierung.',
        ],
        note: 'Was bei Ihrem Fahrzeug geht, zeigt die kostenlose Ersteinschätzung vor Ort.',
      },
      { type: 'dent' },
      {
        type: 'facts',
        id: 'arten-h',
        eyebrow: 'Schadenarten',
        title: 'Parkdelle, Beule, Hageltreffer – wo liegt der Unterschied?',
        items: [
          { title: 'Parkdelle ohne Lackieren', text: 'Türkantenschäden und Rempler auf Parkplätzen sind oft flache Mulden bei intaktem Lack – häufig gute Voraussetzungen. Sitzt die Delle an der Kante, wird es anspruchsvoller.' },
          { title: 'Beule ohne Lackieren', text: 'Größere, tiefere Verformungen. Ob eine Beule sauber ausgebeult werden kann, hängt von Tiefe, Form und Lackzustand ab.' },
          { title: 'Hageltreffer ohne Lackieren', text: 'Viele kleine Dellen auf Dach, Haube und Kofferraum. Bei intaktem Lack kann eine schonende Reparatur möglich sein; Anzahl und Tiefe entscheiden.' },
        ],
      },
      {
        type: 'facts',
        id: 'vorteile-h',
        eyebrow: 'Vorteile',
        title: 'Warum sich der Blick auf die lackschonende Lösung lohnt.',
        items: [
          { title: 'Der Werkslack bleibt', text: 'Wo der Lack intakt ist, muss er nicht ersetzt werden – ohne Spachteln und ohne Neulackierung.' },
          { title: 'Kein Farbton-Angleichen', text: 'Weil nicht lackiert wird, entfällt die Anpassung des Farbtons an angrenzende Bauteile.' },
          { title: 'Wertstabil', text: 'Ein erhaltener Originallack kann dazu beitragen, den Fahrzeugwert zu sichern.' },
          { title: 'Ehrliche Einschätzung, kostenlos', text: 'Sie erfahren vorab, ob es bei Ihrer Delle geht – und womit Sie rechnen können.' },
        ],
      },
      {
        type: 'steps',
        title: 'So läuft es bei uns ab.',
        steps: [
          { title: 'Schaden zeigen', text: 'Kommen Sie zur unverbindlichen Begutachtung in die Falkenberger Landstraße 77 in Lilienthal. Der Eingang befindet sich hinter dem Gebäude.' },
          { title: 'Einschätzung erhalten', text: 'Wir prüfen Lack, Tiefe, Form und Lage und sagen Ihnen ehrlich, ob eine Reparatur ohne Lackieren möglich ist – kostenlos.' },
          { title: 'Termin vereinbaren', text: 'Gemeinsam finden wir einen passenden Termin für die Reparatur.' },
          { title: 'Reparatur und Kontrolle', text: 'Die Delle wird Schritt für Schritt zurückgeformt; das Ergebnis prüfen wir im Licht. Danach holen Sie Ihr Fahrzeug ab.' },
        ],
      },
      { type: 'case', caseId: 'radlauf' },
      {
        type: 'region',
        id: 'bremen-h',
        eyebrow: 'Für Bremen',
        title: 'Aus Bremen zu uns: kurzer Weg an der Stadtgrenze.',
        paras: [
          'Lilienthal grenzt direkt an den Bremer Stadtteil Borgfeld. Für Kunden aus Bremen, Horn-Lehe, Borgfeld, Oberneuland und Vahr sind wir schnell erreichbar – und wir betreuen regelmäßig Kunden aus der Stadt.',
          'In der Stadt entstehen Dellen oft im Alltag: auf engen Parkplätzen, beim Ein- und Aussteigen, durch Einkaufswagen. Gerade dann ist der Lack häufig noch intakt und die Frage „ohne Lackieren?“ berechtigt.',
          'Rufen Sie kurz an, kommen Sie vorbei – die Begutachtung ist kostenlos. Öffnungszeiten: Mo–Fr 08:30–17:30 Uhr, Sa 10:00–13:00 Uhr.',
        ],
        regionSlug: 'bremen',
        places: ['Horn-Lehe', 'Borgfeld', 'Oberneuland', 'Vahr'],
      },
    ],
    faq: [
      { q: 'Kann jede Delle in Bremen ohne Lackieren entfernt werden?', a: 'Nein. Es hängt von Lackzustand, Tiefe, Form, Lage und Zugänglichkeit ab. Bei intaktem Lack und einer sanften Mulde stehen die Chancen gut; ob es bei Ihrem Fahrzeug geht, sehen wir bei der kostenlosen Ersteinschätzung.' },
      { q: 'Wie erkenne ich, ob meine Delle geeignet ist?', a: 'Grob: Ist der Lack glatt, die Delle eine sanfte Mulde und die Stelle gut erreichbar, ist das ein gutes Zeichen. Sicher beurteilen wir das bei der Begutachtung. Eine Checkliste steht im Ratgeber „Welche Dellen lassen sich ohne Lackieren reparieren?“.' },
      { q: 'Was kostet es, eine Delle ohne Lackieren zu entfernen?', a: 'Es gibt keinen Pauschalpreis: Größe, Tiefe, Lage, Anzahl und Lackzustand bestimmen den Aufwand. Bei der kostenlosen Einschätzung vor Ort erfahren Sie, womit Sie rechnen können.' },
      { q: 'Können Sie auch Parkdellen und Beulen ohne Lackieren beheben?', a: 'Ja, wenn die Voraussetzungen stimmen: Parkdellen und Beulen bei intaktem Lack lassen sich häufig lackschonend entfernen. Bei Kanten, sehr tiefen Verformungen oder beschädigtem Lack sagen wir Ihnen ehrlich, was möglich ist.' },
      { q: 'Was passiert, wenn der Lack schon beschädigt ist?', a: 'Dann reicht Ausbeulen allein nicht. Wir prüfen, ob eine Kombination mit Smart-Repair – der punktgenauen Reparatur ohne aufwendige Komplettlackierung – sinnvoll ist.' },
      { q: 'Muss ich vorher einen Termin machen?', a: 'Für die Begutachtung dürfen Sie direkt vorbeikommen; damit wir Zeit für Sie einplanen, rufen Sie am besten kurz unter 0174 71 17 321 an. Termine für die Reparatur vergeben wir kurzfristig nach Vereinbarung.' },
    ],
  },

  {
    slug: 'parkdelle-reparieren',
    keywords: ['Parkdelle reparieren', 'Parkdelle reparieren lassen', 'Parkdelle Auto', 'Autodelle reparieren', 'Türkante Delle reparieren'],
    seo: {
      title: 'Parkdelle reparieren lassen in Lilienthal & Bremen',
      description:
        'Parkdelle im Auto? So gehen Sie vor: dokumentieren, Verursacher klären, lackschonend reparieren lassen. Kostenlose Einschätzung bei Dellen Technik in Lilienthal.',
      ogTitle: 'Parkdelle reparieren lassen – erst klären, dann reparieren',
      ogDescription: 'Der Weg von der Parkdelle zur glatten Fläche: Formalitäten, Voraussetzungen und Ablauf bei Dellen Technik.',
    },
    eyebrow: 'Parkschaden',
    h1: ['Parkdelle', 'reparieren lassen.'],
    heroSub:
      'Türkante, Einkaufswagen, Rangieren: Parkdellen passieren in Sekunden und bleiben lange sichtbar. Wir zeigen, wie Sie vorgehen – und wie sich Parkdellen bei intaktem Lack oft lackschonend beheben lassen.',
    image: 'dent',
    imageAlt: 'Karosseriefläche mit einer Delle im Spiegelbild der Lichtstreifen',
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'smart-repair', 'beulenentfernung'],
    regions: ['lilienthal', 'bremen', 'ritterhude'],
    guides: ['delle-nach-parkrempler-was-tun', 'delle-im-auto-was-tun', 'was-kostet-ein-kleiner-parkschaden', 'welche-dellen-lassen-sich-ohne-lackieren-reparieren'],
    schemaName: 'Parkdelle reparieren',
    schemaDescription: 'Lackschonende Reparatur von Parkdellen an Tür, Kotflügel, Stoßstange und weiteren Karosserieteilen.',
    blocks: [
      {
        type: 'split',
        id: 'problem-h',
        eyebrow: 'Das Problem',
        title: 'Passiert in Sekunden, bleibt lange sichtbar.',
        paras: [
          'Eine Autotür schlägt gegen die Karosserie, ein Einkaufswagen rollt an, beim Rangieren wird es zu eng: Parkdellen entstehen im Alltag und oft unbemerkt. Meist ist die Delle klein – und stört trotzdem bei jedem Blick aufs Auto.',
          'Zwei Fragen stehen am Anfang: Wer ist verantwortlich? Und lässt sich die Delle beheben, ohne den Lack anzufassen? Die zweite Frage klärt die Begutachtung, die erste sollten Sie vor der Reparatur klären.',
        ],
      },
      {
        type: 'facts',
        id: 'klaeren-h',
        eyebrow: 'Vorab klären',
        title: 'Erst klären, dann reparieren.',
        items: [
          { title: 'Schaden dokumentieren', text: 'Fotos aus mehreren Winkeln, Ort, Datum, ggf. Kennzeichen und Zeugen. Das hilft bei jeder Regulierung.' },
          { title: 'Verursacher bekannt oder unbekannt?', text: 'Bekannter Verursacher: Kontakt und Versicherung klären. Unbekannt (Unfallflucht): Polizei und Ihre Versicherung fragen, ob und wie die Kasko eintritt.' },
          { title: 'Selbst zahlen oder Versicherung?', text: 'Bei kleinen Schäden lohnt der Vergleich mit Selbstbeteiligung und möglichen Beitragsfolgen. Das kann Ihre Versicherung am besten beurteilen.' },
          { title: 'Erst dann den Termin machen', text: 'Wenn eine Versicherung zahlen soll, warten Sie mit der Reparatur, bis das Vorgehen geklärt ist. Details im Ratgeber „Delle nach Parkrempler – was tun?“.' },
        ],
      },
      {
        type: 'conditions',
        id: 'geeignet-h',
        eyebrow: 'Voraussetzungen',
        title: 'Welche Parkdellen sich gut reparieren lassen.',
        intro: 'Parkdellen sind oft flache Mulden bei intaktem Lack – das ist die günstigste Ausgangslage. Trotzdem gilt: Es kommt auf den Einzelfall an.',
        good: [
          'Die Delle sitzt auf einer freien Fläche, zum Beispiel mitten auf der Tür oder dem Kotflügel.',
          'Der Lack ist glatt, ohne Risse oder Abplatzer.',
          'Die Verformung ist rund und nicht scharf geknickt.',
        ],
        limits: [
          'Delle direkt an der Türkante: möglich, aber anspruchsvoller.',
          'Lackabrieb oder Kratzer im Bereich der Delle: zusätzliche Arbeiten (z. B. Smart-Repair) können nötig sein.',
          'Scharfer Knick oder sehr tiefe Verformung.',
        ],
        note: 'Wir sagen es Ihnen ehrlich: Manchmal ist eine andere Lösung besser.',
      },
      { type: 'dent' },
      {
        type: 'steps',
        title: 'So läuft die Reparatur einer Parkdelle ab.',
        steps: [
          { title: 'Schaden zeigen', text: 'Kommen Sie mit sauberem Fahrzeug zur unverbindlichen Begutachtung – der Eingang liegt hinter dem Gebäude.' },
          { title: 'Einschätzung erhalten', text: 'Wir prüfen Lack, Form und Lage der Delle und sagen Ihnen offen, was möglich ist. Kostenlos.' },
          { title: 'Termin vereinbaren', text: 'Termine vergeben wir kurzfristig nach Vereinbarung.' },
          { title: 'Fahrzeug abholen', text: 'Die Delle wird lackschonend zurückgeformt und im Licht kontrolliert. Danach ist Ihr Fahrzeug wieder in Bestform.' },
        ],
      },
      { type: 'case', caseId: 'heckstossstange' },
      {
        type: 'region',
        id: 'region-h',
        eyebrow: 'Vor Ort',
        title: 'Aus Lilienthal, Bremen und dem Landkreis Osterholz.',
        paras: [
          'Parkdellen gibt es überall: auf Supermarkt-Parkplätzen im Landkreis, in dichten Bremer Wohnquartieren, in der Tiefgarage. Unsere Werkstatt liegt in der Falkenberger Landstraße 77 in Lilienthal – für Kunden aus Lilienthal, Bremen, Ritterhude, Osterholz-Scharmbeck und Umgebung.',
          'Rufen Sie an oder kommen Sie vorbei: Mo–Fr 08:30–17:30 Uhr, Sa 10:00–13:00 Uhr. Die Ersteinschätzung ist kostenlos.',
        ],
        regionSlug: 'lilienthal',
        places: ['Lilienthal', 'Bremen', 'Ritterhude', 'Osterholz-Scharmbeck'],
      },
    ],
    faq: [
      { q: 'Muss ich einen Parkrempler der Versicherung melden?', a: 'Wenn eine Versicherung zahlen soll, ja – zeitnah und vor der Reparatur. Bei Selbstzahlung entfällt das. Im Zweifel fragt man am besten bei der Versicherung nach.' },
      { q: 'Was tun bei Unfallflucht?', a: 'Bei unbekanntem Verursacher ist die Polizei ein sinnvoller erster Schritt. Ob Ihre Vollkasko eintritt und was das für Ihre Einstufung heißt, klärt Ihre Versicherung.' },
      { q: 'Kann eine Parkdelle ohne Lackieren repariert werden?', a: 'Bei intaktem Lack und geeigneter Delle häufig ja. Sitzt sie an einer Kante oder ist der Lack beschädigt, ist es anspruchsvoller. Das klären wir bei der Begutachtung.' },
      { q: 'Was kostet es, eine Parkdelle reparieren zu lassen?', a: 'Das hängt von Größe, Tiefe, Lage und Lackzustand ab – einen Pauschalpreis gibt es nicht. Die Ersteinschätzung vor Ort ist kostenlos; danach wissen Sie, womit Sie rechnen können.' },
      { q: 'Wie lange dauert die Reparatur?', a: 'Das hängt vom Schaden ab. Den Zeitrahmen nennen wir bei der Einschätzung. Termine vergeben wir kurzfristig nach Vereinbarung.' },
    ],
  },
];

export const landingBySlug = (slug: string) => LANDINGS.find((l) => l.slug === slug);
