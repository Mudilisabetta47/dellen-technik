export type Faq = { q: string; a: string };
export type Step = { title: string; text: string };

export type ServiceImageKey = 'dent' | 'hail' | 'large' | 'workshop' | 'gloss' | 'polish';

export type Service = {
  slug: string;
  n: string;
  title: string;
  kicker: string;
  quote: string;
  short: string;
  image: ServiceImageKey;
  imageAlt: string;
  seo: { title: string; description: string; ogTitle: string; ogDescription: string };
  h1: [string, string];
  heroSub: string;
  problem: { title: string; paras: string[] };
  solution: { title: string; paras: string[] };
  stepsTitle: string;
  steps: Step[];
  benefits: Step[];
  faq: Faq[];
  caseId: 'heckstossstange' | 'radlauf' | 'kotfluegel';
  related: string[];
  guides: string[];
  regions: string[];
  schemaName: string;
  schemaDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'dellenbeseitigung',
    n: '01',
    title: 'Dellenbeseitigung',
    kicker: 'Lackschonend',
    quote: 'Wo der originale Lack erhalten bleiben kann, soll er erhalten bleiben.',
    short: 'Kleine und größere Dellen fachgerecht und präzise entfernen – häufig ohne Lackieren.',
    image: 'dent',
    imageAlt: 'Glänzende dunkle Karosseriefläche mit einer Delle im Spiegelbild der Lichtstreifen',
    seo: {
      title: 'Dellenbeseitigung Lilienthal – Dellen ohne Lackieren',
      description:
        'Dellen entfernen in Lilienthal: lackschonend, ohne Spachteln und Neulackierung. Kostenlose Ersteinschätzung vor Ort – für Lilienthal, Bremen und Umgebung.',
      ogTitle: 'Dellen entfernen, Originallack behalten – Dellen Technik Lilienthal',
      ogDescription:
        'Präzise Dellenbeseitigung in Lilienthal. Der Werkslack bleibt, wo es möglich ist. Jetzt Schaden einschätzen lassen.',
    },
    h1: ['Dellenbeseitigung', 'in Lilienthal.'],
    heroSub:
      'Kleine und größere Dellen entfernen wir fachgerecht und präzise – häufig ohne Lackieren. So bleibt der originale Lack erhalten.',
    problem: {
      title: 'Eine Delle sieht nach wenig aus. Und stört jeden Tag.',
      paras: [
        'Ein Parkrempler, eine Türkante, ein Einkaufswagen, ein Hagelkorn: Dellen entstehen im Alltag, oft ohne dass man es merkt. Bleibt der Lack dabei unbeschädigt, ist die Delle vor allem ein optisches Problem – aber eines, das man bei jedem Blick aufs Auto sieht.',
        'Sie lässt sich meist schonender beheben, als viele denken. Ist der Lack allerdings gerissen oder abgeplatzt, sieht die Sache anders aus. Auch das sagen wir Ihnen ehrlich, bevor Sie sich entscheiden.',
      ],
    },
    solution: {
      title: 'Zurückformen statt überlackieren.',
      paras: [
        'Bei der Dellentechnik wird die verformte Stelle Schritt für Schritt in ihre ursprüngliche Form zurückgearbeitet. Kein Spachteln, keine Neulackierung – der Werkslack bleibt, wo er ist.',
        'Das erhält die Optik und den Wert Ihres Fahrzeugs. Ob Ihre Delle dafür geeignet ist, beurteilen wir bei der kostenlosen Ersteinschätzung direkt vor Ort.',
      ],
    },
    stepsTitle: 'So läuft die Dellenbeseitigung ab.',
    steps: [
      { title: 'Begutachten', text: 'Wir sehen uns die Delle im richtigen Licht an und prüfen, ob der Lack unbeschädigt ist.' },
      { title: 'Einschätzen', text: 'Sie erfahren, ob und wie die Delle entfernt werden kann – transparent und kostenlos.' },
      { title: 'Zurückformen', text: 'Die Stelle wird Schritt für Schritt in ihre ursprüngliche Form gearbeitet.' },
      { title: 'Kontrollieren', text: 'Im Streiflicht prüfen wir, ob die Fläche wieder gleichmäßig reflektiert.' },
    ],
    benefits: [
      { title: 'Originallack bleibt', text: 'Wo es möglich ist, arbeiten wir ohne Spachteln und Neulackierung.' },
      { title: 'Wertstabil', text: 'Ein erhaltener Werkslack hilft, den Fahrzeugwert zu sichern.' },
      { title: 'Ehrliche Einschätzung', text: 'Sie erfahren offen, was möglich ist – bevor etwas passiert.' },
      { title: 'Kostenlos begutachtet', text: 'Die Ersteinschätzung vor Ort kostet nichts.' },
    ],
    faq: [
      {
        q: 'Kann eine Delle ohne Lackieren entfernt werden?',
        a: 'In den meisten Fällen ja. Mit moderner Dellentechnik beheben wir Schäden lackschonend – der originale Werkslack bleibt erhalten. Voraussetzung ist unter anderem, dass der Lack nicht gerissen oder abgeplatzt ist. Das prüfen wir bei der Ersteinschätzung.',
      },
      {
        q: 'Welche Dellen lassen sich entfernen?',
        a: 'Wir entfernen kleine und größere Dellen. Entscheidend sind Lackzustand, Tiefe, Form und Lage der Delle. Manche Stellen sind einfacher zugänglich als andere – deshalb schauen wir uns jeden Schaden persönlich an.',
      },
      {
        q: 'Was kostet die Dellenbeseitigung?',
        a: 'Das hängt von Größe, Tiefe, Lage und Anzahl der Dellen ab. Deshalb gibt es bei uns die kostenlose Ersteinschätzung vor Ort. Danach wissen Sie, womit Sie rechnen können.',
      },
      {
        q: 'Dellenbeseitigung, Dellenentfernung, Dellenreparatur – ist das dasselbe?',
        a: 'Im Alltag meinen alle drei Begriffe dasselbe: Dellen am Fahrzeug entfernen bzw. reparieren lassen. Entscheidend ist nicht das Wort, sondern der Weg: Bei intaktem Lack kann die Delle oft lackschonend zurückgeformt werden – ohne Spachteln und Neulackierung.',
      },
      {
        q: 'Wie lange dauert die Reparatur?',
        a: 'Das hängt vom Schaden ab. Den Zeitrahmen nennen wir Ihnen bei der Einschätzung – und den Termin vereinbaren wir kurzfristig nach Absprache.',
      },
    ],
    caseId: 'kotfluegel',
    related: ['beulenentfernung', 'smart-repair', 'hagelschaden-reparatur'],
    guides: ['delle-ohne-lackieren-entfernen', 'welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'was-kostet-eine-dellenreparatur'],
    regions: ['lilienthal', 'bremen', 'osterholz-scharmbeck'],
    schemaName: 'Dellenbeseitigung',
    schemaDescription:
      'Lackschonende Entfernung kleiner und größerer Dellen an der Karosserie – häufig ohne Lackieren.',
  },
  {
    slug: 'hagelschaden-reparatur',
    n: '02',
    title: 'Hagelschaden-Reparatur',
    kicker: 'Hagel',
    quote: 'Hagel hinterlässt Spuren. Wir entfernen sie.',
    short: 'Professionelle Instandsetzung von Hagelschäden mit schonenden Reparaturmethoden.',
    image: 'hail',
    imageAlt: 'Dunkle Karosseriefläche mit mehreren kleinen Hageldellen im Spiegelbild',
    seo: {
      title: 'Hagelschaden Reparatur Lilienthal & Bremen',
      description:
        'Hagelschaden am Auto? Wir prüfen Ausmaß und Reparaturmöglichkeit und setzen Hageldellen schonend instand. Für Lilienthal, Bremen und Osterholz-Scharmbeck.',
      ogTitle: 'Hagelschaden am Auto – Reparatur in Lilienthal | Dellen Technik',
      ogDescription:
        'Wir prüfen Ihren Hagelschaden, schätzen das Ausmaß ein und setzen Ihr Fahrzeug instand. Kostenlose Ersteinschätzung vor Ort.',
    },
    h1: ['Hagelschaden-Reparatur', 'in Lilienthal.'],
    heroSub:
      'Professionelle Instandsetzung von Hagelschäden mit schonenden Reparaturmethoden – für Fahrzeuge aus Lilienthal, Bremen und dem Landkreis Osterholz.',
    problem: {
      title: 'Nach dem Hagel: viele Treffer, große Unsicherheit.',
      paras: [
        'Ein Hagelschauer trifft ein Fahrzeug an vielen Stellen zugleich – meist Motorhaube, Dach und Kofferraumdeckel. Das Ausmaß sieht man oft erst richtig im passenden Licht, wenn die Spiegelungen die Dellen sichtbar machen.',
        'Die zentralen Fragen danach: Wie schlimm ist es wirklich? Lässt sich das reparieren, ohne zu lackieren? Und wie geht es weiter? Darauf gibt es keine Pauschalantwort – aber eine saubere Begutachtung.',
      ],
    },
    solution: {
      title: 'Prüfen, einschätzen, instandsetzen.',
      paras: [
        'Wir nehmen den Schaden systematisch auf, beurteilen das Ausmaß und prüfen, an welchen Flächen eine schonende Reparatur möglich ist. Sie bekommen eine transparente Einschätzung – ohne überzogene Versprechen.',
        'Danach vereinbaren wir einen Termin und setzen Ihr Fahrzeug instand. Wo der Originallack erhalten bleiben kann, soll er erhalten bleiben.',
      ],
    },
    stepsTitle: 'Vom Hagelschauer zum sauberen Ergebnis.',
    steps: [
      { title: 'Schaden prüfen', text: 'Wir sehen uns Ihr Fahrzeug an und nehmen die betroffenen Flächen auf.' },
      { title: 'Ausmaß einschätzen', text: 'Wie viele Dellen, wie tief, an welchen Teilen? Sie erhalten eine transparente Einschätzung.' },
      { title: 'Reparaturmöglichkeit prüfen', text: 'Wir klären, wo eine schonende Reparatur möglich ist und wo nicht.' },
      { title: 'Termin vereinbaren', text: 'Gemeinsam finden wir einen passenden Termin für die Instandsetzung.' },
      { title: 'Instandsetzen', text: 'Ihr Fahrzeug wird professionell instandgesetzt und ist wieder in Bestform.' },
    ],
    benefits: [
      { title: 'Schonende Methoden', text: 'Wir setzen auf Reparaturmethoden, die den Lack schonen.' },
      { title: 'Erfahrung mit Hagel', text: 'Wir kennen den Unterschied zwischen wenigen Treffern und einem stark betroffenen Fahrzeug.' },
      { title: 'Keine überzogenen Versprechen', text: 'Wenn etwas nicht reparabel ist, sagen wir es klar.' },
      { title: 'Kostenlose Ersteinschätzung', text: 'Begutachtung und Einschätzung vor Ort kosten nichts.' },
    ],
    faq: [
      {
        q: 'Was sollte ich nach einem Hagelschaden tun?',
        a: 'Dokumentieren Sie den Schaden mit Fotos – am besten bei Tageslicht und aus mehreren Winkeln. Informieren Sie Ihre Versicherung, bevor Sie eine Reparatur beauftragen, und kommen Sie zur Begutachtung bei uns vorbei. Wir sagen Ihnen, was möglich ist.',
      },
      {
        q: 'Zahlt die Versicherung einen Hagelschaden?',
        a: 'Hagelschäden werden in der Regel über die Teilkaskoversicherung abgewickelt. Maßgeblich sind aber immer die Bedingungen Ihres Vertrags. Eine Versicherungsberatung können wir nicht leisten – klären Sie den Umfang bitte mit Ihrem Versicherer.',
      },
      {
        q: 'Lässt sich jeder Hagelschaden reparieren?',
        a: 'Nicht jeder. Entscheidend sind Anzahl, Tiefe und Lage der Dellen sowie der Zustand des Lacks. Nach der Begutachtung sagen wir Ihnen ehrlich, was reparabel ist.',
      },
      {
        q: 'Wie lange dauert eine Hagelschaden-Reparatur?',
        a: 'Das hängt vom Ausmaß ab. Ein Fahrzeug mit wenigen Treffern ist schneller fertig als eines mit vielen. Den Zeitrahmen nennen wir Ihnen bei der Einschätzung.',
      },
    ],
    caseId: 'radlauf',
    related: ['dellenbeseitigung', 'smart-repair', 'lackauffrischung'],
    guides: ['hagelschaden-am-auto-was-jetzt', 'dellen-vor-fahrzeugverkauf-reparieren', 'wie-lange-dauert-eine-dellenreparatur'],
    regions: ['bremen', 'osterholz-scharmbeck', 'worpswede'],
    schemaName: 'Hagelschaden-Reparatur',
    schemaDescription: 'Begutachtung und schonende Instandsetzung von Hagelschäden an Fahrzeugen.',
  },
  {
    slug: 'beulenentfernung',
    n: '03',
    title: 'Beulenentfernung',
    kicker: 'Karosserie',
    quote: 'Saubere Entfernung von Beulen an Karosserie und Fahrzeugteilen.',
    short: 'Beulen an Karosserie und Fahrzeugteilen sauber entfernen.',
    image: 'large',
    imageAlt: 'Karosseriefläche mit einer größeren Beule im Spiegelbild der Lichtstreifen',
    seo: {
      title: 'Beulen entfernen Lilienthal – Beulenentfernung am Auto',
      description:
        'Beule im Auto? Wir entfernen Beulen an Karosserie und Fahrzeugteilen sauber und präzise. Kostenlose Ersteinschätzung in Lilienthal – auch für Bremen.',
      ogTitle: 'Beule am Auto entfernen – Beulenentfernung in Lilienthal',
      ogDescription:
        'Sauber ausgebeult statt aufwendig neu lackiert: Beulenentfernung bei Dellen Technik in Lilienthal.',
    },
    h1: ['Beulenentfernung', 'in Lilienthal.'],
    heroSub:
      'Beulen an Karosserie und Fahrzeugteilen entfernen wir sauber und präzise. Damit Ihr Fahrzeug wieder gepflegt aussieht.',
    problem: {
      title: 'Wenn aus einer Delle eine Beule wird.',
      paras: [
        'Im Alltag sagt man Beule, wenn eine Verformung größer, tiefer oder auffälliger ist als eine kleine Parkdelle. Türen, Kotflügel, Seitenteile oder Motorhaube – überall dort, wo etwas anstößt, bleibt eine Spur.',
        'Ob sich eine Beule sauber zurückformen lässt, hängt von der Stelle, der Tiefe und vom Zustand des Lacks ab. Deshalb beurteilen wir jeden Fall persönlich, statt pauschal zu versprechen.',
      ],
    },
    solution: {
      title: 'Ausbeulen mit Gefühl für die Fläche.',
      paras: [
        'Wir arbeiten die Beule Schritt für Schritt zurück in die Form der Karosserie. Ziel ist eine ruhige, gleichmäßig reflektierende Fläche – nicht nur eine „ungefähr glatte“.',
        'Wenn zusätzlich der Lack beschädigt ist, prüfen wir, ob eine Kombination mit Smart-Repair sinnvoll ist. Auch das besprechen wir vorab offen mit Ihnen.',
      ],
    },
    stepsTitle: 'So entfernen wir Beulen.',
    steps: [
      { title: 'Begutachten', text: 'Lage, Tiefe und Lackzustand der Beule werden bei der Ersteinschätzung geprüft.' },
      { title: 'Vorgehen festlegen', text: 'Wir besprechen mit Ihnen, ob Ausbeulen genügt oder ob Lackarbeiten nötig sind.' },
      { title: 'Ausbeulen', text: 'Die Beule wird kontrolliert in ihre ursprüngliche Form zurückgearbeitet.' },
      { title: 'Finish prüfen', text: 'Wir kontrollieren die Fläche im Licht und feilen an den Details, bis sie stimmt.' },
    ],
    benefits: [
      { title: 'Saubere Arbeit', text: 'Präzision statt Schnellschuss – das sieht man im Spiegelbild der Fläche.' },
      { title: 'Für Karosserie und Fahrzeugteile', text: 'Wir entfernen Beulen an Karosserie und Fahrzeugteilen.' },
      { title: 'Ehrliche Beratung', text: 'Wir sagen, was sinnvoll ist – auch wenn es nur eine kleine Lösung braucht.' },
      { title: 'Faire Preise', text: 'Nach der Einschätzung wissen Sie, womit Sie rechnen können.' },
    ],
    faq: [
      {
        q: 'Was ist der Unterschied zwischen Delle und Beule?',
        a: 'Fachlich gibt es keine feste Grenze. Im Alltag sagt man Beule, wenn die Verformung größer oder tiefer ist. Für Sie ist vor allem wichtig, ob der Lack intakt ist und wie gut die Stelle zugänglich ist.',
      },
      {
        q: 'Kann jede Beule entfernt werden?',
        a: 'Nicht jede. Sehr tiefe Verformungen, scharfe Knicke oder beschädigter Lack können Grenzen setzen. Das prüfen wir bei der Begutachtung und sagen Ihnen offen, was möglich ist.',
      },
      {
        q: 'Was passiert, wenn der Lack an der Beule beschädigt ist?',
        a: 'Dann schauen wir, ob eine Kombination aus Ausbeulen und Smart-Repair sinnvoll ist. Wir bieten die effiziente Reparatur kleiner Schäden ohne aufwendige Komplettlackierung an.',
      },
      {
        q: 'Beulenreparatur oder Beulenentfernung – was ist der Unterschied?',
        a: 'Im Sprachgebrauch ist beides dasselbe: eine Beule am Fahrzeug beheben. Wir sprechen von Beulenentfernung, wenn die Verformung ausgebeult und die Fläche wieder gleichmäßig wird – bei intaktem Lack oft ohne Neulackierung.',
      },
      {
        q: 'Entfernen Sie Beulen auch bei Kunden aus Bremen?',
        a: 'Ja. Wir betreuen Kunden aus Lilienthal, Bremen, Osterholz-Scharmbeck, Worpswede, Ritterhude, Grasberg und dem Landkreis Osterholz.',
      },
    ],
    caseId: 'heckstossstange',
    related: ['dellenbeseitigung', 'smart-repair', 'lackauffrischung'],
    guides: ['welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'delle-nach-parkrempler-was-tun', 'was-kostet-ein-kleiner-parkschaden'],
    regions: ['grasberg', 'lilienthal', 'bremen'],
    schemaName: 'Beulenentfernung',
    schemaDescription: 'Sauberes Entfernen von Beulen an Karosserie und Fahrzeugteilen.',
  },
  {
    slug: 'smart-repair',
    n: '04',
    title: 'Smart-Repair',
    kicker: 'Punktgenau',
    quote: 'Kleine Schäden müssen nicht nach großer Reparatur aussehen.',
    short: 'Effiziente Reparatur kleiner Schäden ohne aufwendige Komplettlackierung.',
    image: 'workshop',
    imageAlt: 'Nahaufnahme einer dunklen, glänzenden Lackoberfläche mit weichen Lichtreflexen',
    seo: {
      title: 'Smart Repair Lilienthal – kleine Schäden, saubere Reparatur',
      description:
        'Smart Repair in Lilienthal: kleinere Karosserieschäden, Dellen und Beulen effizient reparieren – ohne aufwendige Komplettlackierung. Auch für Bremen.',
      ogTitle: 'Smart Repair in Lilienthal – punktgenau statt aufwendig',
      ogDescription:
        'Kleine Schäden gezielt reparieren, ohne den ganzen Wagen anzufassen. Smart-Repair bei Dellen Technik.',
    },
    h1: ['Smart-Repair', 'in Lilienthal.'],
    heroSub:
      'Effiziente Reparatur kleiner Schäden ohne aufwendige Komplettlackierung – für Fahrzeuge aus Lilienthal, Bremen und Umgebung.',
    problem: {
      title: 'Kleine Schäden müssen nicht nach großer Reparatur aussehen.',
      paras: [
        'Ein kleiner Schaden ist ärgerlich – aber oft steht der Aufwand einer klassischen Reparatur in keinem Verhältnis dazu. Ein ganzes Bauteil neu lackieren für eine Stelle, die kaum größer ist als eine Münze?',
        'Genau dafür gibt es Smart-Repair: die punktgenaue Instandsetzung begrenzter Schäden, statt ein ganzes Fahrzeugteil anzufassen.',
      ],
    },
    solution: {
      title: 'Nur dort arbeiten, wo der Schaden ist.',
      paras: [
        'Beim Smart-Repair bearbeiten wir gezielt die betroffene Stelle. Das spart Aufwand und erhält so viel Originalsubstanz wie möglich.',
        'Was wir dafür anbieten: die Reparatur kleinerer Karosserieschäden, die Entfernung von Dellen und Beulen sowie die Lackauffrischung.',
      ],
    },
    stepsTitle: 'Was Smart-Repair bei uns umfasst.',
    steps: [
      { title: 'Kleinere Karosserieschäden', text: 'Begrenzte Schäden an der Karosserie, die keine große Reparatur erfordern.' },
      { title: 'Dellen', text: 'Lackschonende Dellenbeseitigung, wo der Lack intakt ist.' },
      { title: 'Beulen', text: 'Saubere Entfernung von Beulen an Karosserie und Fahrzeugteilen.' },
      { title: 'Lackauffrischung', text: 'Mehr Glanz und Farbtiefe – für ein gepflegtes Gesamtbild.' },
    ],
    benefits: [
      { title: 'Punktgenau', text: 'Nur die betroffene Stelle wird bearbeitet.' },
      { title: 'Effizient', text: 'Kein Aufwand einer Komplettlackierung für einen kleinen Schaden.' },
      { title: 'Werterhalt', text: 'So viel Originalsubstanz wie möglich bleibt erhalten.' },
      { title: 'Ehrliche Einschätzung', text: 'Wir sagen, wann Smart-Repair reicht – und wann nicht.' },
    ],
    faq: [
      {
        q: 'Was ist Smart-Repair?',
        a: 'Smart-Repair bezeichnet die gezielte Reparatur kleiner, begrenzter Schäden – statt ein ganzes Bauteil aufwendig zu erneuern oder komplett zu lackieren. Bei uns umfasst das kleinere Karosserieschäden, Dellen, Beulen und Lackauffrischung.',
      },
      {
        q: 'Welche Schäden eignen sich für Smart-Repair?',
        a: 'Begrenzte Schäden wie Dellen, Beulen oder kleinere Karosserieschäden. Ob Ihr Schaden geeignet ist, sehen wir bei der kostenlosen Ersteinschätzung vor Ort.',
      },
      {
        q: 'Wann ist Smart-Repair nicht die richtige Lösung?',
        a: 'Bei größeren Unfallschäden mit verformter Struktur ist meist eine klassische Karosserie- und Lackierwerkstatt der bessere Ansprechpartner. Sehen wir bei der Begutachtung, dass eine andere Lösung besser ist, sagen wir es Ihnen ehrlich.',
      },
      {
        q: 'Was kostet Smart-Repair?',
        a: 'Das hängt von Art, Größe und Lage des Schadens ab. Bei der Ersteinschätzung vor Ort erfahren Sie, womit Sie rechnen können.',
      },
    ],
    caseId: 'heckstossstange',
    related: ['dellenbeseitigung', 'beulenentfernung', 'lackauffrischung'],
    guides: ['was-ist-smart-repair', 'was-kostet-ein-kleiner-parkschaden', 'delle-nach-parkrempler-was-tun'],
    regions: ['lilienthal', 'bremen', 'ritterhude'],
    schemaName: 'Smart-Repair',
    schemaDescription:
      'Effiziente Reparatur kleiner Schäden an Karosserie und Lack ohne aufwendige Komplettlackierung.',
  },
  {
    slug: 'lackauffrischung',
    n: '05',
    title: 'Lackauffrischung',
    kicker: 'Glanz',
    quote: 'Professionelle Lackpflege für mehr Glanz, Farbtiefe und Werterhalt.',
    short: 'Professionelle Lackpflege für mehr Glanz, Farbtiefe und Werterhalt.',
    image: 'gloss',
    imageAlt: 'Tiefschwarzer, hochglänzender Lack mit Reflexionen von Studiolicht',
    seo: {
      title: 'Lackauffrischung Lilienthal – Glanz und Farbtiefe zurück',
      description:
        'Lackauffrischung in Lilienthal: professionelle Lackpflege für mehr Glanz, Farbtiefe und Werterhalt. Für Fahrzeuge aus Lilienthal, Bremen und Umgebung.',
      ogTitle: 'Lackauffrischung in Lilienthal – mehr Glanz, mehr Farbtiefe',
      ogDescription:
        'Matten Lack zurück zum Leuchten bringen: professionelle Lackpflege bei Dellen Technik.',
    },
    h1: ['Lackauffrischung', 'in Lilienthal.'],
    heroSub:
      'Professionelle Lackpflege für mehr Glanz, Farbtiefe und Werterhalt – damit Ihr Fahrzeug wieder gepflegt und hochwertig aussieht.',
    problem: {
      title: 'Wenn der Lack müde wirkt.',
      paras: [
        'Mit den Jahren verliert Lack an Glanz: Die Fläche wirkt stumpfer, die Farbe flacher, und im Sonnenlicht zeigen sich feine Spuren. Das sieht man dem ganzen Fahrzeug an – auch wenn technisch nichts kaputt ist.',
        'Eine gepflegte Lackoberfläche wirkt nicht nur besser. Sie trägt auch dazu bei, den Wert eines Fahrzeugs zu erhalten.',
      ],
    },
    solution: {
      title: 'Glanz zurückholen, Farbtiefe sichtbar machen.',
      paras: [
        'Bei der Lackauffrischung bringen wir den Lack durch fachgerechte Lackpflege wieder in Form. Wie viel sich erreichen lässt, hängt vom Zustand ab – das besprechen wir vorab.',
        'Tiefe Kratzer, die den Lack durchdringen, lassen sich durch Lackpflege allein nicht entfernen. Sie erfahren bei der Einschätzung ehrlich, was realistisch ist.',
      ],
    },
    stepsTitle: 'So gehen wir bei der Lackauffrischung vor.',
    steps: [
      { title: 'Lackzustand prüfen', text: 'Wir sehen uns die Oberfläche im Licht an und beurteilen den Zustand.' },
      { title: 'Vorgehen besprechen', text: 'Sie erfahren, was sinnvoll und realistisch ist.' },
      { title: 'Lack auffrischen', text: 'Die Oberfläche wird fachgerecht gepflegt und wieder in Form gebracht.' },
      { title: 'Ergebnis kontrollieren', text: 'Wir prüfen Glanz und Gleichmäßigkeit im Licht.' },
    ],
    benefits: [
      { title: 'Mehr Glanz', text: 'Eine gepflegte Oberfläche reflektiert wieder sauber.' },
      { title: 'Mehr Farbtiefe', text: 'Der Lack wirkt satter und hochwertiger.' },
      { title: 'Werterhalt', text: 'Ein gepflegtes Erscheinungsbild unterstützt den Wert Ihres Fahrzeugs.' },
      { title: 'Kombinierbar', text: 'Ideal nach einer Dellen- oder Smart-Repair-Reparatur.' },
    ],
    faq: [
      {
        q: 'Was bringt eine Lackauffrischung?',
        a: 'Sie verbessert Glanz und Farbtiefe des Lacks und lässt das Fahrzeug insgesamt gepflegter wirken. Das Ausmaß hängt vom Ausgangszustand des Lacks ab.',
      },
      {
        q: 'Verschwinden dadurch alle Kratzer?',
        a: 'Nein. Feine Spuren lassen sich oft deutlich verbessern, tiefe Kratzer, die durch den Klarlack gehen, jedoch nicht durch Lackpflege allein. Wir sagen Ihnen bei der Begutachtung, was realistisch ist.',
      },
      {
        q: 'Lohnt sich eine Lackauffrischung vor dem Verkauf?',
        a: 'Ein gepflegtes Erscheinungsbild wirkt beim Verkauf oft überzeugender. Garantien für einen bestimmten Verkaufspreis können wir natürlich nicht geben.',
      },
      {
        q: 'Kann ich die Lackauffrischung mit einer Dellenreparatur kombinieren?',
        a: 'Ja, das ist eine sinnvolle Kombination. Sprechen Sie uns einfach an – wir besprechen bei der Einschätzung, was für Ihr Fahrzeug passt.',
      },
    ],
    caseId: 'kotfluegel',
    related: ['fahrzeugaufbereitung', 'smart-repair', 'dellenbeseitigung'],
    guides: ['dellen-vor-fahrzeugverkauf-reparieren', 'delle-vor-leasingrueckgabe-reparieren', 'was-ist-smart-repair'],
    regions: ['ritterhude', 'lilienthal', 'osterholz-scharmbeck'],
    schemaName: 'Lackauffrischung',
    schemaDescription: 'Professionelle Lackpflege für mehr Glanz, Farbtiefe und Werterhalt.',
  },
  {
    slug: 'fahrzeugaufbereitung',
    n: '06',
    title: 'Fahrzeugaufbereitung',
    kicker: 'Finish',
    quote: 'Innen- und Außenaufbereitung für ein gepflegtes, hochwertiges Fahrzeugbild.',
    short: 'Innen- und Außenaufbereitung für ein gepflegtes, hochwertiges Fahrzeugbild.',
    image: 'polish',
    imageAlt: 'Hände führen eine Poliermaschine über dunklen Fahrzeuglack in der Werkstatt',
    seo: {
      title: 'Fahrzeugaufbereitung Lilienthal – innen & außen',
      description:
        'Fahrzeugaufbereitung in Lilienthal: Innen- und Außenaufbereitung für ein gepflegtes, hochwertiges Fahrzeugbild. Für Kunden aus Lilienthal und Bremen.',
      ogTitle: 'Fahrzeugaufbereitung in Lilienthal – innen und außen',
      ogDescription:
        'Ein gepflegtes Fahrzeug von innen und außen: Fahrzeugaufbereitung bei Dellen Technik.',
    },
    h1: ['Fahrzeugaufbereitung', 'in Lilienthal.'],
    heroSub:
      'Innen- und Außenaufbereitung für ein gepflegtes, hochwertiges Fahrzeugbild – nach einer Reparatur, vor dem Verkauf oder einfach so.',
    problem: {
      title: 'Ein Auto ist nur so gut wie sein Gesamteindruck.',
      paras: [
        'Ein repariertes Blech nützt wenig, wenn Innenraum und Lack ansonsten müde wirken. Den Gesamteindruck bestimmen viele Details – außen wie innen.',
        'Anlässe gibt es genug: der Verkauf, die Rückgabe, eine anstehende Reise oder einfach der Wunsch, wieder gern einzusteigen.',
      ],
    },
    solution: {
      title: 'Innen und außen, aus einer Hand.',
      paras: [
        'Wir bereiten Ihr Fahrzeug innen und außen auf – für ein gepflegtes, hochwertiges Erscheinungsbild. Den genauen Umfang legen wir nach Zustand und Ihrem Wunsch vor Ort fest.',
        'Ideal in Kombination mit einer Dellen- oder Lackreparatur: erst der Schaden weg, dann das Finish.',
      ],
    },
    stepsTitle: 'So läuft die Aufbereitung ab.',
    steps: [
      { title: 'Zustand ansehen', text: 'Wir sehen uns Innenraum und Außenhaut gemeinsam mit Ihnen an.' },
      { title: 'Umfang festlegen', text: 'Sie sagen uns Ihre Ziele, wir sagen Ihnen, was dafür sinnvoll ist.' },
      { title: 'Aufbereiten', text: 'Innen- und Außenaufbereitung mit dem Anspruch an saubere Handwerksarbeit.' },
      { title: 'Übergabe', text: 'Ihr Fahrzeug ist wieder in Bestform und kann abgeholt werden.' },
    ],
    benefits: [
      { title: 'Innen und außen', text: 'Ein durchgängig gepflegtes Fahrzeugbild.' },
      { title: 'Kombinierbar', text: 'Sinnvoll nach einer Dellen-, Beulen- oder Smart-Reparatur.' },
      { title: 'Persönliche Absprache', text: 'Der Umfang richtet sich nach Ihrem Fahrzeug und Ihrem Ziel.' },
      { title: 'Faire Preise', text: 'Sie erfahren vorab, womit Sie rechnen können.' },
    ],
    faq: [
      {
        q: 'Was umfasst die Fahrzeugaufbereitung?',
        a: 'Wir bieten Innen- und Außenaufbereitung an. Den genauen Umfang besprechen wir vor Ort – abhängig vom Zustand Ihres Fahrzeugs und Ihren Wünschen.',
      },
      {
        q: 'Ist eine Aufbereitung vor dem Verkauf sinnvoll?',
        a: 'Ein gepflegtes Fahrzeug macht beim Verkauf einen besseren Eindruck. Kombiniert mit der Beseitigung sichtbarer Dellen wirkt das Gesamtbild meist deutlich stimmiger.',
      },
      {
        q: 'Kann ich Aufbereitung und Dellenreparatur kombinieren?',
        a: 'Ja. Sprechen Sie uns einfach an – wir finden gemeinsam einen passenden Termin.',
      },
      {
        q: 'Wie schnell bekomme ich einen Termin?',
        a: 'Termine vergeben wir kurzfristig nach Vereinbarung. Rufen Sie uns einfach an.',
      },
    ],
    caseId: 'kotfluegel',
    related: ['lackauffrischung', 'dellenbeseitigung', 'smart-repair'],
    guides: ['delle-vor-leasingrueckgabe-reparieren', 'dellen-vor-fahrzeugverkauf-reparieren', 'was-ist-smart-repair'],
    regions: ['lilienthal', 'bremen', 'osterholz-scharmbeck'],
    schemaName: 'Fahrzeugaufbereitung',
    schemaDescription: 'Innen- und Außenaufbereitung von Fahrzeugen für ein gepflegtes, hochwertiges Erscheinungsbild.',
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
