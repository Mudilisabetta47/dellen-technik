import type { Faq } from './services';
import { ENABLE_UMLAND_PAGES } from './site';

export type Region = {
  slug: string;
  name: string;
  /** core = Kerngebiet laut bisheriger Website (mit Kartenpunkt); umland = erweitertes Umland (Sammelseite je Landkreis/Richtung). */
  tier: 'core' | 'umland';
  /** Orte, die die Seite abdeckt (für Umland-Seiten). */
  places?: string[];
  /** Position auf der schematischen Karte (Längen-/Breitengrad, gerundet) – nur Kerngebiet. */
  geo?: { lat: number; lng: number };
  teaser: string;
  seo: { title: string; description: string; ogTitle: string; ogDescription: string };
  h1: [string, string];
  heroSub: string;
  focus: string[];
  sections: { title: string; paras: string[] }[];
  faq: Faq[];
  services: string[];
  guides: string[];
  /** Passende Landingpages (/leistungen/<slug>). */
  landings?: string[];
  neighbors: string[];
};

const CORE_AND_UMLAND: Region[] = [
  {
    slug: 'lilienthal',
    tier: 'core',
    name: 'Lilienthal',
    geo: { lat: 53.1372, lng: 8.9039 },
    teaser: 'Unser Standort – Dellenreparatur direkt vor Ort in der Falkenberger Landstraße.',
    seo: {
      title: 'Dellenreparatur Lilienthal – Werkstatt Falkenberger Landstraße',
      description:
        'Dellenreparatur, Hagelschaden und Smart-Repair direkt in Lilienthal: Falkenberger Landstraße 77, Eingang hinter dem Gebäude. Kostenlose Ersteinschätzung.',
      ogTitle: 'Dellen Technik in Lilienthal – Ihre Werkstatt vor Ort',
      ogDescription: 'Dellenbeseitigung, Hagelschaden-Reparatur und Smart-Repair in der Falkenberger Landstraße 77.',
    },
    h1: ['Dellenreparatur', 'in Lilienthal.'],
    heroSub:
      'Hier sitzt unsere Werkstatt: Falkenberger Landstraße 77. Kommen Sie mit Ihrem Fahrzeug vorbei – wir schauen es uns in Ruhe an.',
    focus: ['Dellenbeseitigung', 'Smart-Repair', 'Fahrzeugaufbereitung'],
    sections: [
      {
        title: 'Direkt vor Ort: kurze Wege für Lilienthaler.',
        paras: [
          'Wenn Ihr Auto in Lilienthal steht, ist der Weg zu uns kurz. Für die Begutachtung dürfen Sie direkt bei uns vorbeikommen – am besten rufen Sie kurz an, damit wir uns Zeit für Sie nehmen können.',
          'Wir prüfen den Schaden, geben eine transparente Einschätzung und vereinbaren mit Ihnen einen Termin. Die kostenlose Ersteinschätzung findet vor Ort in unserer Werkstatt statt.',
        ],
      },
      {
        title: 'So finden Sie uns.',
        paras: [
          'Die Werkstatt liegt in der Falkenberger Landstraße 77. Wichtig: Der Eingang befindet sich hinter dem Gebäude – bitte fahren Sie hinten herum.',
          'Öffnungszeiten: Montag bis Freitag 08:30 – 17:30 Uhr, Samstag 10:00 – 13:00 Uhr. Termine außerhalb der Zeiten sind auf Anfrage möglich.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wo genau ist der Eingang der Werkstatt in Lilienthal?',
        a: 'Der Eingang befindet sich hinter dem Gebäude in der Falkenberger Landstraße 77. Bitte fahren Sie hinten herum.',
      },
      {
        q: 'Kann ich einfach vorbeikommen, um den Schaden anzuschauen?',
        a: 'Sie dürfen zur unverbindlichen Begutachtung direkt bei uns vorbeikommen. Damit wir Zeit für Sie einplanen, rufen Sie am besten kurz unter 0174 71 17 321 an.',
      },
      {
        q: 'Welche Leistungen bieten Sie in Lilienthal an?',
        a: 'Dellenbeseitigung, Hagelschaden-Reparatur, Beulenentfernung, Smart-Repair, Lackauffrischung und Fahrzeugaufbereitung.',
      },
    ],
    services: ['dellenbeseitigung', 'smart-repair', 'fahrzeugaufbereitung'],
    guides: ['delle-ohne-lackieren-entfernen', 'wie-lange-dauert-eine-dellenreparatur'],
    landings: ['parkdelle-reparieren'],
    neighbors: ['bremen', 'grasberg', 'worpswede'],
  },
  {
    slug: 'bremen',
    tier: 'core',
    name: 'Bremen',
    geo: { lat: 53.0793, lng: 8.8017 },
    teaser: 'Kurze Wege für Kunden aus Bremen, Horn-Lehe, Borgfeld, Oberneuland und Vahr.',
    seo: {
      title: 'Dellenreparatur Bremen – Hagelschaden & Smart Repair',
      description:
        'Dellenreparatur, Hagelschaden und Smart Repair für Bremen: Werkstatt in Lilienthal, kurze Wege aus Horn-Lehe, Borgfeld, Oberneuland und Vahr. Ersteinschätzung kostenlos.',
      ogTitle: 'Dellenreparatur für Bremen – Dellen Technik in Lilienthal',
      ogDescription: 'Dellen, Beulen und Hagelschäden lackschonend reparieren – kurze Wege aus Bremen nach Lilienthal.',
    },
    h1: ['Dellenreparatur', 'für Bremen.'],
    heroSub:
      'Unsere Werkstatt liegt in Lilienthal, direkt an der Bremer Stadtgrenze. Für Kunden aus Horn-Lehe, Borgfeld, Oberneuland und Vahr sind wir schnell erreichbar.',
    focus: ['Dellenreparatur', 'Hagelschaden Bremen', 'Smart Repair Bremen'],
    sections: [
      {
        title: 'Dellenreparatur für Bremer Fahrzeuge.',
        paras: [
          'Im Stadtverkehr sind Dellen fast unvermeidlich: enge Parkplätze, Türkanten, Einkaufswagen, ein Rempler beim Rangieren. Wenn der Lack dabei nicht beschädigt wurde, lässt sich die Delle meist lackschonend entfernen – ohne Spachteln und Neulackierung.',
          'Wir betreuen regelmäßig Kunden aus Bremen und den Stadtteilen Horn-Lehe, Borgfeld, Oberneuland und Vahr. Lilienthal grenzt direkt an Bremen-Borgfeld – der Weg zu uns ist deshalb für viele kurz.',
        ],
      },
      {
        title: 'Hagelschaden in Bremen.',
        paras: [
          'Nach einem Hagelschauer trifft es viele Fahrzeuge gleichzeitig. Bringen Sie Ihr Auto zur Begutachtung vorbei: Wir prüfen das Ausmaß, klären, was schonend repariert werden kann, und sagen Ihnen offen, womit Sie rechnen können.',
          'Bitte informieren Sie vor der Reparatur Ihre Versicherung und dokumentieren Sie den Schaden mit Fotos.',
        ],
      },
      {
        title: 'Smart Repair für Bremen.',
        paras: [
          'Kleinere Karosserieschäden, Dellen und Beulen reparieren wir punktgenau – ohne aufwendige Komplettlackierung. Auch die Lackauffrischung gehört zu unserem Angebot.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie komme ich aus Bremen zu Ihrer Werkstatt?',
        a: 'Die Werkstatt liegt in der Falkenberger Landstraße 77 in Lilienthal, direkt an der Bremer Stadtgrenze. Der Eingang befindet sich hinter dem Gebäude. Über den Routenplaner unten auf der Seite sehen Sie die aktuelle Strecke von Ihrem Standort.',
      },
      {
        q: 'Repariert Dellen Technik auch Hagelschäden für Bremer Kunden?',
        a: 'Ja. Wir prüfen Hagelschäden, schätzen das Ausmaß ein und setzen Fahrzeuge instand. Kommen Sie dafür einfach zur Begutachtung vorbei.',
      },
      {
        q: 'Kann ich in Bremen eine Delle ohne Lackieren entfernen lassen?',
        a: 'In den meisten Fällen ja, solange der Lack unbeschädigt ist. Ob es bei Ihrer Delle geht, sehen wir bei der kostenlosen Ersteinschätzung.',
      },
    ],
    services: ['dellenbeseitigung', 'hagelschaden-reparatur', 'smart-repair'],
    guides: ['delle-nach-parkrempler-was-tun', 'hagelschaden-am-auto-was-jetzt', 'was-kostet-eine-dellenreparatur'],
    landings: ['delle-ohne-lackieren-bremen', 'parkdelle-reparieren'],
    neighbors: ['lilienthal', 'ritterhude', 'osterholz-scharmbeck'],
  },
  {
    slug: 'osterholz-scharmbeck',
    tier: 'core',
    name: 'Osterholz-Scharmbeck',
    geo: { lat: 53.2247, lng: 8.7936 },
    teaser: 'Schnelle Termine für den gesamten Landkreis Osterholz.',
    seo: {
      title: 'Dellenreparatur Osterholz-Scharmbeck – Dellen Technik',
      description:
        'Dellen, Beulen und Hagelschäden für Osterholz-Scharmbeck und den Landkreis Osterholz: schnelle Terminvergabe, Werkstatt in Lilienthal. Jetzt anrufen.',
      ogTitle: 'Dellenreparatur für Osterholz-Scharmbeck und Umgebung',
      ogDescription: 'Schnelle Termine für den Landkreis Osterholz – Dellen Technik in Lilienthal.',
    },
    h1: ['Dellenreparatur', 'für Osterholz-Scharmbeck.'],
    heroSub:
      'Lilienthal und Osterholz-Scharmbeck liegen im selben Landkreis. Wir vergeben kurzfristig Termine für Fahrzeuge aus der Kreisstadt und dem gesamten Landkreis Osterholz.',
    focus: ['Schnelle Termine', 'Landkreis Osterholz', 'Dellen & Hagel'],
    sections: [
      {
        title: 'Ein Landkreis, ein Ansprechpartner.',
        paras: [
          'Osterholz-Scharmbeck ist die Kreisstadt, Lilienthal liegt im selben Landkreis Osterholz. Für Fahrzeuge aus der Kreisstadt und den umliegenden Orten ist unsere Werkstatt deshalb ein regionaler Ansprechpartner für Dellen, Beulen und Hagelschäden.',
          'Termine vergeben wir kurzfristig nach Vereinbarung. Das ist gerade dann hilfreich, wenn das Auto im Alltag gebraucht wird und die Delle nicht ewig warten soll.',
        ],
      },
      {
        title: 'Was wir für Sie tun.',
        paras: [
          'Von der einzelnen Parkdelle bis zum Hagelschaden: Wir prüfen den Schaden, geben Ihnen eine transparente Einschätzung und arbeiten so, dass der originale Lack erhalten bleibt, wo es möglich ist.',
          'Wenn Sie aus Osterholz-Scharmbeck kommen, rufen Sie kurz an. Wir finden gemeinsam einen Zeitpunkt für die Begutachtung.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie schnell bekomme ich als Kunde aus Osterholz-Scharmbeck einen Termin?',
        a: 'Termine vergeben wir kurzfristig nach Vereinbarung. Rufen Sie uns einfach an, dann finden wir gemeinsam einen passenden Zeitpunkt.',
      },
      {
        q: 'Betreuen Sie den ganzen Landkreis Osterholz?',
        a: 'Ja. Wir betreuen regelmäßig Kunden aus Osterholz-Scharmbeck, Lilienthal, Ritterhude, Worpswede, Grasberg und dem gesamten Landkreis Osterholz.',
      },
      {
        q: 'Reparieren Sie auch Hagelschäden für Kunden aus dem Landkreis?',
        a: 'Ja. Wir prüfen das Ausmaß, klären die Reparaturmöglichkeit und setzen Ihr Fahrzeug nach Terminvereinbarung instand.',
      },
    ],
    services: ['dellenbeseitigung', 'hagelschaden-reparatur', 'beulenentfernung'],
    guides: ['wie-lange-dauert-eine-dellenreparatur', 'dellen-vor-fahrzeugverkauf-reparieren'],
    neighbors: ['ritterhude', 'worpswede', 'lilienthal'],
  },
  {
    slug: 'worpswede',
    tier: 'core',
    name: 'Worpswede',
    geo: { lat: 53.2178, lng: 8.9339 },
    teaser: 'Dellen- und Hagelschadenreparatur für Worpswede und Künstlerdorf-Umgebung.',
    seo: {
      title: 'Dellenreparatur Worpswede – Hagelschaden & Beulen',
      description:
        'Dellen- und Hagelschadenreparatur für Worpswede und das Teufelsmoor: Werkstatt in Lilienthal, lackschonend, kostenlose Ersteinschätzung vor Ort.',
      ogTitle: 'Dellen und Hagelschäden für Worpswede – Dellen Technik',
      ogDescription: 'Aus dem Teufelsmoor nach Lilienthal: lackschonende Dellenreparatur mit ehrlicher Beratung.',
    },
    h1: ['Dellenreparatur', 'für Worpswede.'],
    heroSub:
      'Aus dem Künstlerdorf und dem Teufelsmoor ist es nicht weit zu unserer Werkstatt in Lilienthal – für Dellen, Beulen und Hagelschäden.',
    focus: ['Dellen', 'Hagelschaden', 'Teufelsmoor'],
    sections: [
      {
        title: 'Dellen aus dem Teufelsmoor.',
        paras: [
          'Enge Ortsdurchfahrten, kleine Parkplätze und Ausflugsverkehr – in und um Worpswede entstehen Parkdellen schnell. Dazu kommen Hagelschauer, die über das offene Land ziehen und Fahrzeuge an vielen Stellen zugleich treffen.',
          'Für beides sind wir der richtige Ansprechpartner: Wir entfernen Dellen lackschonend und prüfen bei Hagelschäden das Ausmaß und die Reparaturmöglichkeit.',
        ],
      },
      {
        title: 'Termin und Begutachtung.',
        paras: [
          'Rufen Sie an, schildern Sie kurz Ihren Schaden und kommen Sie zur unverbindlichen Begutachtung in die Falkenberger Landstraße 77 in Lilienthal. Der Eingang befindet sich hinter dem Gebäude.',
          'Vor Ort schätzen wir den Schaden kostenlos ein und vereinbaren mit Ihnen einen Termin für die Reparatur.',
        ],
      },
    ],
    faq: [
      {
        q: 'Reparieren Sie Hagelschäden für Kunden aus Worpswede?',
        a: 'Ja. Dellen- und Hagelschadenreparatur gehört zu unseren Leistungen – auch für Worpswede und die Umgebung.',
      },
      {
        q: 'Was ist, wenn mein Fahrzeug nicht mehr fahrbereit ist?',
        a: 'Rufen Sie uns in diesem Fall bitte an und schildern Sie kurz die Situation. Wir besprechen mit Ihnen, wie es weitergehen kann.',
      },
      {
        q: 'Muss ich vorher anrufen?',
        a: 'Für die Begutachtung dürfen Sie direkt vorbeikommen. Ein kurzer Anruf vorab hilft uns, Zeit für Sie einzuplanen.',
      },
    ],
    services: ['dellenbeseitigung', 'hagelschaden-reparatur', 'beulenentfernung'],
    guides: ['hagelschaden-am-auto-was-jetzt', 'welche-dellen-lassen-sich-ohne-lackieren-reparieren'],
    neighbors: ['osterholz-scharmbeck', 'lilienthal', 'grasberg'],
  },
  {
    slug: 'ritterhude',
    tier: 'core',
    name: 'Ritterhude',
    geo: { lat: 53.1794, lng: 8.7526 },
    teaser: 'Smart-Repair und Lackauffrischung für Ritterhude und Umgebung.',
    seo: {
      title: 'Smart Repair Ritterhude – Dellen & Lackauffrischung',
      description:
        'Smart-Repair, Dellenbeseitigung und Lackauffrischung für Ritterhude und Umgebung. Werkstatt in Lilienthal, ehrliche Beratung, kostenlose Ersteinschätzung.',
      ogTitle: 'Smart-Repair und Lackauffrischung für Ritterhude',
      ogDescription: 'Kleine Schäden punktgenau reparieren – Dellen Technik in Lilienthal.',
    },
    h1: ['Smart-Repair', 'für Ritterhude.'],
    heroSub:
      'Ritterhude liegt zwischen Bremen und Osterholz-Scharmbeck. Für kleine Schäden und müden Lack ist unsere Werkstatt in Lilienthal ein kurzer Weg.',
    focus: ['Smart-Repair', 'Lackauffrischung', 'Kleine Schäden'],
    sections: [
      {
        title: 'Kleine Schäden, kleine Lösung.',
        paras: [
          'Für Fahrzeuge aus Ritterhude sind wir besonders bei kleineren Schäden gefragt: eine Delle an der Tür, eine Beule am Kotflügel, ein Lack, der nicht mehr glänzt. Statt eines Aufwands wie bei einer Komplettlackierung setzen wir auf Smart-Repair – punktgenau, effizient und so schonend wie möglich.',
        ],
      },
      {
        title: 'Lack, der wieder wirkt.',
        paras: [
          'Die Lackauffrischung bringt Glanz und Farbtiefe zurück und unterstützt den Werterhalt. Gut kombinierbar mit einer Dellenbeseitigung: erst der Schaden weg, dann das Finish.',
          'Wenn Sie aus Ritterhude zu uns kommen, rufen Sie kurz an – wir vereinbaren kurzfristig einen Termin für die Begutachtung.',
        ],
      },
    ],
    faq: [
      {
        q: 'Welche Schäden reparieren Sie für Kunden aus Ritterhude?',
        a: 'Kleinere Karosserieschäden, Dellen, Beulen und Lackauffrischung – außerdem Hagelschäden und Fahrzeugaufbereitung.',
      },
      {
        q: 'Was bringt Smart-Repair gegenüber einer klassischen Reparatur?',
        a: 'Es wird gezielt nur die betroffene Stelle bearbeitet – das spart Aufwand und erhält so viel Originalsubstanz wie möglich.',
      },
      {
        q: 'Kann ich mein Auto nach der Reparatur gleich aufbereiten lassen?',
        a: 'Ja. Innen- und Außenaufbereitung lässt sich gut mit der Reparatur kombinieren. Sprechen Sie uns bei der Einschätzung darauf an.',
      },
    ],
    services: ['smart-repair', 'lackauffrischung', 'dellenbeseitigung'],
    guides: ['was-ist-smart-repair', 'was-kostet-ein-kleiner-parkschaden'],
    neighbors: ['bremen', 'osterholz-scharmbeck', 'lilienthal'],
  },
  {
    slug: 'grasberg',
    tier: 'core',
    name: 'Grasberg',
    geo: { lat: 53.1167, lng: 8.9764 },
    teaser: 'Professionelle Beulenentfernung für Grasberg, Tarmstedt und Umland.',
    seo: {
      title: 'Beulen entfernen Grasberg – Dellenreparatur Tarmstedt',
      description:
        'Beulenentfernung und Dellenreparatur für Grasberg, Tarmstedt und Umland: Werkstatt in Lilienthal, saubere Arbeit, kostenlose Ersteinschätzung vor Ort.',
      ogTitle: 'Beulenentfernung für Grasberg und Tarmstedt – Dellen Technik',
      ogDescription: 'Beulen und Dellen sauber entfernen – Werkstatt in Lilienthal, kurzer Weg aus Grasberg.',
    },
    h1: ['Beulenentfernung', 'für Grasberg.'],
    heroSub:
      'Für Grasberg, Tarmstedt und das Umland entfernen wir Beulen und Dellen sauber und präzise – in unserer Werkstatt in Lilienthal.',
    focus: ['Beulenentfernung', 'Grasberg', 'Tarmstedt'],
    sections: [
      {
        title: 'Beulen sauber entfernen.',
        paras: [
          'Eine Beule an Tür, Kotflügel oder Seitenteil ist mehr als nur ein Schönheitsfehler – man sieht sie jeden Tag. Wir entfernen Beulen an Karosserie und Fahrzeugteilen sauber und präzise.',
          'Ob der Lack dabei erhalten bleiben kann, klären wir bei der kostenlosen Ersteinschätzung. Ist er unbeschädigt, geht es oft ohne Spachteln und Neulackierung.',
        ],
      },
      {
        title: 'Der Weg zu uns.',
        paras: [
          'Grasberg und Tarmstedt liegen ländlich geprägt östlich von Lilienthal. Für Fahrzeuge aus der Region ist die Werkstatt in der Falkenberger Landstraße 77 gut erreichbar.',
          'Rufen Sie an und vereinbaren Sie eine Begutachtung – der Eingang befindet sich hinter dem Gebäude.',
        ],
      },
    ],
    faq: [
      {
        q: 'Entfernen Sie Beulen auch für Kunden aus Tarmstedt?',
        a: 'Ja. Wir betreuen Kunden aus Grasberg, Tarmstedt und dem Umland und entfernen Beulen an Karosserie und Fahrzeugteilen.',
      },
      {
        q: 'Ist jede Beule reparabel?',
        a: 'Nicht jede. Sehr tiefe Verformungen, scharfe Knicke oder beschädigter Lack können Grenzen setzen. Bei der Begutachtung sagen wir Ihnen ehrlich, was möglich ist.',
      },
      {
        q: 'Wie läuft die Terminvereinbarung ab?',
        a: 'Rufen Sie uns einfach an. Termine vergeben wir kurzfristig nach Vereinbarung.',
      },
    ],
    services: ['beulenentfernung', 'dellenbeseitigung', 'smart-repair'],
    guides: ['welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'delle-nach-parkrempler-was-tun'],
    neighbors: ['lilienthal', 'worpswede', 'osterholz-scharmbeck'],
  },

  /* ------------------------------------------------------------- UMLAND */
  {
    slug: 'landkreis-verden',
    tier: 'umland',
    name: 'Landkreis Verden',
    places: ['Achim', 'Oyten', 'Ottersberg', 'Verden'],
    teaser: 'Achim, Oyten, Ottersberg, Verden – Anfragen aus dem Landkreis Verden sind willkommen.',
    seo: {
      title: 'Dellenreparatur Landkreis Verden – Achim, Oyten, Ottersberg',
      description:
        'Dellenreparatur für Achim, Oyten, Ottersberg und Verden: lackschonende Dellenbeseitigung und Hagelschaden-Reparatur. Werkstatt in Lilienthal, Ersteinschätzung kostenlos.',
      ogTitle: 'Dellenreparatur für den Landkreis Verden – Dellen Technik',
      ogDescription: 'Aus Achim, Oyten, Ottersberg oder Verden nach Lilienthal: so bereiten Sie den Besuch vor.',
    },
    h1: ['Dellenreparatur', 'für den Landkreis Verden.'],
    heroSub:
      'Aus Achim, Oyten, Ottersberg oder Verden ist unsere Werkstatt in Lilienthal ein überschaubarer Weg. Wir besprechen Ihren Schaden vorab am Telefon – und schauen ihn uns dann in Ruhe vor Ort an.',
    focus: ['Dellenreparatur', 'Hagelschaden', 'Anfahrt planen'],
    sections: [
      {
        title: 'Ein Weg, der sich planen lässt.',
        paras: [
          'Der Landkreis Verden liegt südöstlich von Bremen, Lilienthal nordöstlich der Stadt. Ottersberg und Lilienthal liegen beide im Einzugsbereich der Wümme – von dort ist der Weg zu uns vergleichsweise direkt. Aus Achim, Oyten oder Verden führt er am Bremer Stadtrand entlang oder durch die Stadt; den besten Weg zeigt Ihnen der Routenplaner.',
          'Ehrlich gesagt: Unser Kerngebiet sind Lilienthal, Bremen und der Landkreis Osterholz. Anfragen aus dem Landkreis Verden sind willkommen – rufen Sie an, wir besprechen den Schaden vorab und sagen Ihnen, ob sich die Anfahrt lohnt.',
        ],
      },
      {
        title: 'So bereiten Sie den Besuch vor.',
        paras: [
          'Beschreiben Sie den Schaden am Telefon oder per WhatsApp, gern mit einem Foto – die verbindliche Einschätzung erfolgt aber vor Ort, weil sich Tiefe und Lackzustand auf Bildern schlecht beurteilen lassen. Zeigen Sie uns alle Schäden auf einmal und kommen Sie mit sauberem Fahrzeug: So lässt sich der Besuch bündeln.',
          'Öffnungszeiten: Montag bis Freitag 08:30 – 17:30 Uhr, Samstag 10:00 – 13:00 Uhr. Der Eingang befindet sich hinter dem Gebäude.',
        ],
      },
    ],
    faq: [
      { q: 'Lohnt sich die Anfahrt aus Achim, Oyten oder Verden?', a: 'Das hängt von Ihrem Schaden ab. Beschreiben Sie ihn uns kurz telefonisch; wir besprechen, was möglich ist und ob sich der Weg lohnt. Die Ersteinschätzung vor Ort ist kostenlos.' },
      { q: 'Kann ich vorab Fotos schicken?', a: 'Ja, per WhatsApp an 0174 71 17 321. Sie helfen uns für einen ersten Eindruck; die verbindliche Einschätzung erfolgt vor Ort.' },
      { q: 'Reparieren Sie auch Hagelschäden für Kunden aus dem Landkreis Verden?', a: 'Hagelschaden-Reparatur gehört zu unseren Leistungen. Wir prüfen bei der Begutachtung Ausmaß und Reparaturmöglichkeit.' },
    ],
    services: ['dellenbeseitigung', 'hagelschaden-reparatur', 'smart-repair'],
    guides: ['wie-lange-dauert-eine-dellenreparatur', 'ablauf-dellenreparatur'],
    neighbors: ['lilienthal', 'bremen', 'grasberg'],
  },
  {
    slug: 'landkreis-rotenburg',
    tier: 'umland',
    name: 'Landkreis Rotenburg (Wümme)',
    places: ['Tarmstedt', 'Rotenburg (Wümme)', 'Zeven'],
    teaser: 'Tarmstedt, Rotenburg (Wümme) und Zeven – aus dem Osten in die Werkstatt nach Lilienthal.',
    seo: {
      title: 'Dellenreparatur Tarmstedt, Rotenburg & Zeven | Dellen Technik',
      description:
        'Dellenreparatur und Beulenentfernung für Tarmstedt, Rotenburg (Wümme) und Zeven: lackschonend, mit ehrlicher Einschätzung. Werkstatt in Lilienthal, kostenlose Begutachtung.',
      ogTitle: 'Dellenreparatur für Tarmstedt, Rotenburg und Zeven',
      ogDescription: 'Aus dem Landkreis Rotenburg (Wümme) zu Dellen Technik in Lilienthal.',
    },
    h1: ['Dellenreparatur', 'für Tarmstedt & Rotenburg.'],
    heroSub:
      'Tarmstedt kennen wir aus der Region um Grasberg. Wer aus Rotenburg (Wümme) oder Zeven kommt, plant etwas mehr Weg ein – deshalb sprechen wir den Schaden vorher kurz durch.',
    focus: ['Beulenentfernung', 'Dellen', 'Weg planen'],
    sections: [
      {
        title: 'Aus dem Osten nach Lilienthal.',
        paras: [
          'Tarmstedt gehört zu dem Umland, das wir schon von Grasberg aus im Blick haben: Für Grasberg, Tarmstedt und Umland entfernen wir Beulen und Dellen. Rotenburg (Wümme) und Zeven liegen im selben Landkreis, aber weiter entfernt – dort lohnt sich ein kurzes Vorgespräch, bevor Sie losfahren.',
          'Bei Schäden an Tür, Kotflügel oder Seitenteil lässt sich am Telefon oft schon einordnen, ob eine lackschonende Reparatur in Frage kommt. Verbindlich beurteilen wir das vor Ort.',
        ],
      },
      {
        title: 'Was Sie mitbringen sollten.',
        paras: [
          'Ein sauberes Fahrzeug, alle Schäden auf einmal und – bei Versicherungsfällen – die nötigen Angaben zur Schadenmeldung. Wenn mehrere Dinge zu erledigen sind, etwa Delle und Lackauffrischung, besprechen wir das am besten gleich im ersten Gespräch. So wird aus der Anfahrt ein Termin statt zwei.',
        ],
      },
    ],
    faq: [
      { q: 'Betreuen Sie auch Tarmstedt?', a: 'Ja. Für Grasberg, Tarmstedt und Umland entfernen wir Beulen und Dellen.' },
      { q: 'Gilt das auch für Rotenburg (Wümme) und Zeven?', a: 'Anfragen von dort sind willkommen. Der Weg ist länger, deshalb besprechen wir den Schaden vorab telefonisch und sagen Ihnen, ob sich die Fahrt lohnt.' },
      { q: 'Wie schnell bekomme ich einen Termin?', a: 'Termine vergeben wir kurzfristig nach Vereinbarung. Rufen Sie einfach an: 0174 71 17 321.' },
    ],
    services: ['beulenentfernung', 'dellenbeseitigung', 'smart-repair'],
    guides: ['beule-im-auto-entfernen', 'wie-lange-dauert-eine-dellenreparatur'],
    neighbors: ['grasberg', 'worpswede', 'lilienthal'],
  },
  {
    slug: 'bremer-sueden',
    tier: 'umland',
    name: 'Bremer Süden & Delmenhorst',
    places: ['Delmenhorst', 'Stuhr', 'Weyhe', 'Syke'],
    teaser: 'Delmenhorst, Stuhr, Weyhe und Syke – Anfragen aus dem Süden und Südwesten von Bremen.',
    seo: {
      title: 'Dellenreparatur Delmenhorst, Stuhr, Weyhe & Syke',
      description:
        'Dellenreparatur und Hagelschaden für Delmenhorst, Stuhr, Weyhe und Syke: Werkstatt in Lilienthal, Anfahrt am besten vorab absprechen. Ersteinschätzung kostenlos.',
      ogTitle: 'Dellenreparatur für Delmenhorst, Stuhr, Weyhe und Syke',
      ogDescription: 'Aus dem Bremer Süden nach Lilienthal: wann sich der Weg lohnt und wie Sie ihn planen.',
    },
    h1: ['Dellenreparatur', 'für den Bremer Süden.'],
    heroSub:
      'Delmenhorst, Stuhr, Weyhe und Syke liegen auf der anderen Seite von Bremen. Damit sich der Weg nach Lilienthal für Sie lohnt, besprechen wir Ihren Schaden gern vorab.',
    focus: ['Anfahrt', 'Hagelschaden', 'Vorgespräch'],
    sections: [
      {
        title: 'Einmal quer durchs Bremer Umland.',
        paras: [
          'Delmenhorst ist eine kreisfreie Stadt, Stuhr, Weyhe und Syke gehören zum Landkreis Diepholz – alle südlich bzw. südwestlich von Bremen. Lilienthal liegt im Nordosten. Sie fahren also durch oder um die Stadt; planen Sie Puffer ein und nutzen Sie den Routenplaner für die aktuelle Strecke.',
          'Genau deshalb lohnt sich hier ein Vorgespräch: Wir klären am Telefon, um was für einen Schaden es geht und ob ein Besuch sinnvoll ist. Anfragen aus dem Bremer Süden sind willkommen.',
        ],
      },
      {
        title: 'Wann sich der Weg besonders lohnt.',
        paras: [
          'Bei mehreren Dellen, einem Hagelschaden oder wenn Sie Delle und Lackauffrischung kombinieren möchten, ist ein längerer Weg schnell gerechtfertigt – ein Termin erledigt vieles. Bei einer einzelnen kleinen Delle empfehlen wir, vorher zu fragen. Wir sagen es Ihnen ehrlich.',
        ],
      },
    ],
    faq: [
      { q: 'Wie komme ich aus Delmenhorst, Stuhr, Weyhe oder Syke zu Ihnen?', a: 'Die Werkstatt liegt in der Falkenberger Landstraße 77 in Lilienthal, Eingang hinter dem Gebäude. Die aktuelle Strecke sehen Sie im Routenplaner; planen Sie Puffer für den Verkehr um Bremen ein.' },
      { q: 'Kann ich den Schaden vorher schildern?', a: 'Ja, am Telefon oder per WhatsApp, gern mit Foto. Die verbindliche Einschätzung erfolgt vor Ort und ist kostenlos.' },
      { q: 'Lohnt sich das bei einem Hagelschaden?', a: 'Bei einem Hagelschaden mit vielen Treffern oft eher als bei einer einzelnen kleinen Delle. Wir besprechen es vorab.' },
    ],
    services: ['hagelschaden-reparatur', 'dellenbeseitigung', 'lackauffrischung'],
    guides: ['hagelschaden-am-auto-was-jetzt', 'ablauf-dellenreparatur'],
    neighbors: ['bremen', 'lilienthal', 'ritterhude'],
  },
  {
    slug: 'schwanewede-lemwerder',
    tier: 'umland',
    name: 'Schwanewede & Lemwerder',
    places: ['Schwanewede', 'Lemwerder'],
    teaser: 'Schwanewede und Lemwerder – von der Unterweser nach Lilienthal.',
    seo: {
      title: 'Dellenreparatur Schwanewede & Lemwerder | Dellen Technik',
      description:
        'Dellenreparatur, Smart-Repair und Lackauffrischung für Schwanewede und Lemwerder: Werkstatt in Lilienthal, ehrliche Einschätzung, kostenlose Begutachtung.',
      ogTitle: 'Dellenreparatur für Schwanewede und Lemwerder',
      ogDescription: 'Von der Unterweser nach Lilienthal – Dellen und Beulen lackschonend beheben.',
    },
    h1: ['Dellenreparatur', 'für Schwanewede & Lemwerder.'],
    heroSub:
      'Schwanewede gehört wie Lilienthal zum Landkreis Osterholz, Lemwerder liegt am gegenüberliegenden Weserufer. Für beide ist die Werkstatt in Lilienthal ein Ausflug wert – wir besprechen ihn vorher.',
    focus: ['Landkreis Osterholz', 'Unterweser', 'Vorgespräch'],
    sections: [
      {
        title: 'Zwei Orte, ein Landkreis und ein Fluss.',
        paras: [
          'Schwanewede liegt im Landkreis Osterholz – demselben, in dem auch Lilienthal liegt. Wir betreuen regelmäßig Kunden aus dem gesamten Landkreis Osterholz; für Schwanewede sind Anfragen deshalb naheliegend. Lemwerder liegt am gegenüberliegenden Weserufer im Landkreis Wesermarsch – dort ist der Weg länger und mit Blick auf die Route zu planen.',
        ],
      },
      {
        title: 'Vor dem Besuch kurz durchsprechen.',
        paras: [
          'Schildern Sie uns den Schaden am Telefon oder per WhatsApp. Wir sagen Ihnen, was sich bei intaktem Lack lackschonend beheben lässt, wann Smart-Repair sinnvoll ist und ob sich die Anfahrt lohnt. Die verbindliche Einschätzung erfolgt vor Ort – kostenlos.',
        ],
      },
    ],
    faq: [
      { q: 'Gehört Schwanewede zu Ihrem Einzugsgebiet?', a: 'Schwanewede liegt im Landkreis Osterholz, und wir betreuen regelmäßig Kunden aus dem gesamten Landkreis. Rufen Sie einfach an, dann klären wir Ihren Fall.' },
      { q: 'Und Lemwerder?', a: 'Anfragen aus Lemwerder sind willkommen. Weil der Weg länger ist, besprechen wir den Schaden gern vorab.' },
      { q: 'Welche Leistungen bieten Sie an?', a: 'Dellenbeseitigung, Hagelschaden-Reparatur, Beulenentfernung, Smart-Repair, Lackauffrischung und Fahrzeugaufbereitung.' },
    ],
    services: ['dellenbeseitigung', 'smart-repair', 'lackauffrischung'],
    guides: ['welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'was-kostet-ein-kleiner-parkschaden'],
    neighbors: ['ritterhude', 'osterholz-scharmbeck', 'bremen'],
  },
];

export const REGIONS: Region[] = CORE_AND_UMLAND.filter((r) => r.tier === 'core' || ENABLE_UMLAND_PAGES);
export const CORE_REGIONS = REGIONS.filter((r) => r.tier === 'core');
export const UMLAND_REGIONS = REGIONS.filter((r) => r.tier === 'umland');

export const regionBySlug = (slug: string) => REGIONS.find((r) => r.slug === slug);

