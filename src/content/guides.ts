import type { Faq, ServiceImageKey } from './services';

export type CaseId = 'heckstossstange' | 'radlauf' | 'kotfluegel';
export type GuideSub = { title: string; paras: string[]; list?: string[] };
export type GuideSection = {
  title: string;
  paras: string[];
  list?: string[];
  sub?: GuideSub[];
  callout?: { title: string; text: string };
  /** Echtes Vorher/Nachher-Beispiel aus der Werkstatt, wenn es zum Abschnitt passt. */
  figure?: { caseId: CaseId; text: string };
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  /** Suchintention (interne Dokumentation, wird nicht angezeigt). */
  intent: string;
  seo: { title: string; description: string; ogTitle: string; ogDescription: string };
  h1: string;
  intro: string;
  tldr: string;
  sections: GuideSection[];
  faq: Faq[];
  /** Hauptleistung (Pillar), auf die der Artikel zurückverlinkt. */
  pillar: string;
  services: string[];
  /** Passende Landingpages (/leistungen/<slug>), die keine Ratgeber sind. */
  landings?: string[];
  regions: string[];
  related: string[];
  image: ServiceImageKey;
};

export const GUIDES_PUBLISHED = '2026-09-26';
export const GUIDE_DISCLAIMER =
  'Hinweis: Dieser Ratgeber gibt allgemeine Orientierung. Er ersetzt weder eine Rechts- noch eine Versicherungsberatung, und er nennt bewusst keine Festpreise oder Zeitangaben – die hängen vom einzelnen Fahrzeug und Schaden ab.';

const words = (g: Guide) =>
  [g.intro, g.tldr, ...g.sections.flatMap((s) => [s.title, ...s.paras, ...(s.list ?? []), ...(s.sub ?? []).flatMap((x) => [x.title, ...x.paras, ...(x.list ?? [])]), s.callout?.text ?? '', s.figure?.text ?? '']), ...g.faq.flatMap((f) => [f.q, f.a])]
    .join(' ')
    .split(/\s+/).length;
export const readMinutes = (g: Guide) => Math.max(2, Math.round(words(g) / 190));

export const GUIDES: Guide[] = [
  /* ------------------------------------------------------------------ KOSTEN */
  {
    slug: 'was-kostet-eine-dellenreparatur',
    title: 'Was kostet eine Dellenreparatur?',
    category: 'Kosten',
    intent: 'Informationssuche nach dem Preis einer Dellenreparatur – Orientierung ohne erfundene Zahlen, Weg zur kostenlosen Einschätzung.',
    seo: {
      title: 'Was kostet eine Dellenreparatur? Preisfaktoren erklärt',
      description:
        'Was kostet eine Dellenreparatur? Größe, Tiefe, Lage, Anzahl und Lackzustand bestimmen den Preis. So kommen Sie in Lilienthal zu einer ehrlichen Einschätzung.',
      ogTitle: 'Was kostet eine Dellenreparatur? – Ratgeber von Dellen Technik',
      ogDescription: 'Welche Faktoren den Preis bestimmen, woran Sie ein faires Angebot erkennen und wie die kostenlose Ersteinschätzung abläuft.',
    },
    h1: 'Was kostet eine Dellenreparatur?',
    intro:
      'Wer nach dem Preis einer Dellenreparatur sucht, will meist eine Zahl. Die ehrliche Antwort: Eine seriöse Zahl gibt es erst, wenn jemand die Delle gesehen hat. Dieser Ratgeber erklärt, woran das liegt, welche Faktoren den Aufwand bestimmen und wie Sie zu einer belastbaren Einschätzung kommen.',
    tldr: 'Es gibt keinen Pauschalpreis pro Delle. Größe, Tiefe, Lage, Anzahl und Lackzustand bestimmen den Aufwand. Verlässlich wird es erst nach der Begutachtung – bei uns kostenlos und vor Ort.',
    sections: [
      {
        title: 'Warum sich Dellen nicht per Foto bepreisen lassen',
        paras: [
          'Zwei Dellen, die auf einem Foto ähnlich aussehen, können ganz unterschiedlich aufwendig sein. Eine flache Mulde mitten in einer Tür ist etwas anderes als eine gleich große Delle an einer Kante oder Sicke. Dazu kommt: Dellen wirken je nach Licht und Blickwinkel größer oder kleiner, als sie sind – erst im richtigen Licht sieht man, wie tief die Verformung wirklich ist.',
          'Ein Festpreis ohne Ansicht des Fahrzeugs wäre deshalb eine Schätzung ins Blaue. Das kann in beide Richtungen schiefgehen – für Sie und für den Betrieb.',
        ],
      },
      {
        title: 'Diese Faktoren bestimmen den Aufwand',
        paras: ['Für die Kosten einer Dellenreparatur sind vor allem sechs Punkte entscheidend:'],
        sub: [
          { title: 'Größe und Tiefe', paras: ['Je größer und tiefer die Verformung, desto mehr Arbeitsschritte sind nötig, um die Fläche gleichmäßig zurückzuformen.'] },
          { title: 'Lage am Fahrzeug', paras: ['Freie Flächen wie Tür, Kotflügel oder Motorhaube sind meist unkomplizierter als Kanten, Sicken oder Übergänge. Auch die Zugänglichkeit von hinten spielt eine Rolle.'] },
          { title: 'Anzahl der Dellen', paras: ['Mehrere Dellen in einem Termin werden anders bewertet als eine einzelne. Bei Hagelschäden zählt jeder Treffer – hier lohnt sich ein eigener Blick auf den Hagelschaden.'] },
          { title: 'Zustand des Lacks', paras: ['Ist der Lack intakt, kann häufig ohne Spachteln und Neulackierung gearbeitet werden. Ist er gerissen oder abgeplatzt, kommen zusätzliche Arbeiten dazu.'] },
          { title: 'Material und Bauteil', paras: ['Nicht jedes Blech verhält sich gleich. Stahl und Aluminium reagieren unterschiedlich, und auch Form und Aufbau des Bauteils beeinflussen den Aufwand.'] },
          { title: 'Zusatzwünsche', paras: ['Wer nach der Reparatur zusätzlich eine Lackauffrischung oder eine Fahrzeugaufbereitung möchte, sollte das gleich mit besprechen.'] },
        ],
      },
      {
        title: 'Lackschonend oder klassisch – was ändert sich beim Preis?',
        paras: [
          'Bei der klassischen Reparatur wird gespachtelt, geschliffen und lackiert; dazu gehören Farbtonanpassung und Trocknungszeiten. Bei der lackschonenden Dellenbeseitigung entfallen diese Schritte, wenn der Lack unbeschädigt ist. Ob das im Einzelfall günstiger ist, hängt vom Schaden ab – deshalb sollte man es nicht pauschal versprechen. Sicher ist nur: Der originale Lack bleibt erhalten, und das kann für den Fahrzeugwert eine Rolle spielen.',
        ],
      },
      {
        title: 'So kommen Sie zu einem belastbaren Angebot',
        paras: ['Ein paar Dinge helfen, damit die Einschätzung präzise wird:'],
        list: [
          'Zeigen Sie alle Dellen, nicht nur die auffälligste – gern auch alte, die Sie kaum noch wahrnehmen.',
          'Kommen Sie mit einem sauberen Fahrzeug: Schmutz verdeckt Dellen und macht die Beurteilung ungenauer.',
          'Fragen Sie, ob lackschonend gearbeitet werden kann und was im Preis enthalten ist.',
          'Klären Sie vorher, wer zahlt (Selbstzahler, Kasko, Verursacher) – das beeinflusst, welche Unterlagen Sie brauchen.',
        ],
        callout: {
          title: 'Bei Dellen Technik',
          text: 'Die Ersteinschätzung vor Ort ist kostenlos und unverbindlich. Sie bekommen eine transparente Einschätzung – und danach wissen Sie, womit Sie rechnen können.',
        },
      },
      {
        title: 'Wer zahlt die Reparatur?',
        paras: [
          'Das hängt von der Ursache ab. Ein selbst verursachter Parkschaden geht in der Regel zulasten des Fahrzeughalters bzw. der Vollkasko; ein Hagelschaden wird üblicherweise über die Teilkasko reguliert; bei einem fremd verursachten Schaden kommt die gegnerische Haftpflichtversicherung in Betracht. Welche Leistungen Ihnen zustehen, richtet sich nach Ihrem Vertrag – klären Sie das bitte mit Ihrer Versicherung.',
        ],
      },
    ],
    faq: [
      { q: 'Gibt es einen Festpreis pro Delle?', a: 'Nein. Der Aufwand hängt von Größe, Tiefe, Lage, Anzahl und Lackzustand ab. Deshalb gibt es bei uns die kostenlose Ersteinschätzung vor Ort – danach wissen Sie, womit Sie rechnen können.' },
      { q: 'Kostet die Begutachtung etwas?', a: 'Die Ersteinschätzung vor Ort ist kostenlos und unverbindlich.' },
      { q: 'Kann ich Fotos schicken, um vorab einen Eindruck zu bekommen?', a: 'Fotos per WhatsApp helfen uns für einen ersten Eindruck. Die verbindliche Einschätzung erfolgt aber vor Ort, weil sich Tiefe und Lackzustand auf Bildern schlecht beurteilen lassen.' },
      { q: 'Lohnt sich die Reparatur bei einer kleinen Delle überhaupt?', a: 'Das ist eine persönliche Abwägung. Eine kleine Delle kann optisch stören und beim Verkauf oder bei der Leasingrückgabe eine Rolle spielen. Wir sagen Ihnen bei der Einschätzung ehrlich, was sinnvoll ist.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'smart-repair'],
    regions: ['bremen', 'lilienthal'],
    related: ['was-kostet-ein-kleiner-parkschaden', 'was-kostet-eine-hagelschaden-reparatur', 'ablauf-dellenreparatur'],
    image: 'dent',
  },

  /* ------------------------------------------------------------ SOFORT-HILFE */
  {
    slug: 'delle-im-auto-was-tun',
    title: 'Delle im Auto – was tun?',
    category: 'Sofort-Ratgeber',
    intent: 'Akute Situation: Delle entdeckt, was jetzt? Klare Reihenfolge, Warnung vor Selbstversuchen, Weg zur Einschätzung.',
    seo: {
      title: 'Delle im Auto – was tun? Die ersten Schritte',
      description:
        'Delle im Auto entdeckt? In fünf Schritten: fotografieren, Ursache klären, Lack prüfen, nicht selbst basteln, Fachbetrieb in Lilienthal einschätzen lassen.',
      ogTitle: 'Delle im Auto – was tun? – Dellen Technik',
      ogDescription: 'Fünf Schritte nach dem Schaden – und warum Saugglocke und Heißluft selten die Lösung sind.',
    },
    h1: 'Delle im Auto – was tun?',
    intro:
      'Ein Blick auf die Tür, und da ist sie: eine Delle, die gestern noch nicht da war. Ärger ist normal – trotzdem lohnt es sich, in der richtigen Reihenfolge vorzugehen. Diese fünf Schritte helfen, nichts zu verbauen: weder Ansprüche gegenüber Dritten noch die Chance auf eine lackschonende Reparatur.',
    tldr: 'Fotografieren, Ursache klären, Lack prüfen, nichts selbst „reparieren“ und die Delle dann fachlich einschätzen lassen. Die meisten Dellen mit intaktem Lack lassen sich lackschonend beurteilen – ob es bei Ihrer klappt, zeigt die Begutachtung.',
    sections: [
      {
        title: 'Schritt 1: Ruhig bleiben und den Schaden dokumentieren',
        paras: [
          'Machen Sie Fotos aus mehreren Winkeln, möglichst bei Tageslicht und nicht in praller Sonne. Ein Foto schräg gegen das Licht zeigt Spiegelungen, in denen die Verformung besonders gut sichtbar wird. Halten Sie Ort, Datum und Uhrzeit fest.',
          'War es ein Unfall mit Verletzten oder ist das Fahrzeug nicht mehr verkehrssicher, geht es zuerst um Sicherheit – dann gehört der Fall zur Polizei bzw. zum Gutachter und nicht in den Bereich einer Dellenreparatur.',
        ],
      },
      {
        title: 'Schritt 2: Klären, wodurch die Delle entstanden ist',
        paras: ['Die Ursache entscheidet darüber, wer zahlt und was Sie vor der Reparatur noch erledigen sollten:'],
        list: [
          'Ein bekannter Verursacher: Kontaktdaten sichern, Versicherung des Verursachers kann zuständig sein.',
          'Ein unbekannter Verursacher (Parkplatz): Bei Unfallflucht ist die Polizei ein sinnvoller erster Schritt.',
          'Hagel oder ein anderes Naturereignis: in der Regel ein Fall für die Teilkasko.',
          'Selbst verursacht: Sie tragen den Schaden selbst oder nutzen die Vollkasko – dann lohnt der Vergleich mit Selbstbeteiligung und möglicher Rückstufung.',
        ],
      },
      {
        title: 'Schritt 3: Den Lack ansehen',
        paras: [
          'Bleibt die Oberfläche glatt und glänzend, ist der Lack vermutlich intakt – das ist die wichtigste Voraussetzung für eine lackschonende Reparatur. Sehen Sie Risse, abgeplatzte Stellen oder freiliegendes Metall, sollten Sie nicht allzu lange warten: Freiliegendes Blech kann anfangen zu korrodieren. Auch dann ist eine Einschätzung sinnvoll – die Reparatur sieht dann aber anders aus.',
        ],
      },
      {
        title: 'Schritt 4: Nicht selbst „reparieren“',
        paras: [
          'Im Netz kursieren Tricks mit Saugglocken oder Heißluft. Bei manchen Dellen verändern sie nichts, bei anderen können sie Lack beschädigen oder die Verformung verschlimmern. Wenn der Lack erst einmal Risse hat, ist die lackschonende Lösung meist vom Tisch. Ein Blick eines Fachmanns kostet bei uns nichts.',
        ],
      },
      {
        title: 'Schritt 5: Fachlich einschätzen lassen',
        paras: [
          'Kommen Sie mit sauberem Fahrzeug zur Begutachtung. Wir prüfen Lack, Tiefe, Form und Lage und sagen Ihnen offen, ob eine lackschonende Reparatur möglich ist – oder ob eine andere Lösung besser passt, zum Beispiel Smart-Repair. Die Ersteinschätzung vor Ort ist kostenlos.',
        ],
        callout: { title: 'Muss die Delle sofort repariert werden?', text: 'Bei intaktem Lack drängt die Zeit meist nicht. Trotzdem lohnt es sich, nicht ewig zu warten – etwa wenn eine Leasingrückgabe ansteht, das Fahrzeug verkauft werden soll oder ein Versicherungsfall zu klären ist.' },
      },
    ],
    faq: [
      { q: 'Wie erkenne ich, ob der Lack noch intakt ist?', a: 'Streichen Sie mit dem Fingernagel vorsichtig über die Stelle und schauen Sie im Schräglicht: Risse, Kanten oder abgeplatzte Bereiche sind Warnzeichen. Ist die Oberfläche durchgehend glatt, ist der Lack vermutlich intakt – sicher beurteilen wir das bei der Begutachtung.' },
      { q: 'Kann ich eine Delle mit einer Saugglocke selbst entfernen?', a: 'Bei manchen flachen Dellen kann das funktionieren, bei vielen nicht. Es besteht das Risiko, Lack zu beschädigen oder die Verformung zu verschlimmern. Wir raten, die Delle vorher einschätzen zu lassen.' },
      { q: 'Muss ich mich vor der Reparatur bei der Versicherung melden?', a: 'Wenn eine Versicherung zahlen soll, ja: Melden Sie den Schaden zeitnah und klären Sie das Vorgehen, bevor Sie eine Reparatur beauftragen. Bei selbst gezahlten Schäden entfällt das.' },
      { q: 'Was passiert bei der Begutachtung?', a: 'Wir sehen uns die Delle im passenden Licht an, prüfen den Lack und besprechen mit Ihnen, ob und wie sie sich beheben lässt. Das ist kostenlos und unverbindlich.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'smart-repair'],
    regions: ['lilienthal', 'bremen'],
    landings: ['parkdelle-reparieren'],
    related: ['welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'ablauf-dellenreparatur', 'was-kostet-eine-dellenreparatur'],
    image: 'dent',
  },

  /* ----------------------------------------------------------------- METHODE */
  {
    slug: 'delle-ohne-lackieren-entfernen',
    title: 'Delle ohne Lackieren entfernen',
    category: 'Methode',
    intent: 'Wie funktioniert lackschonende Dellenbeseitigung, wann geht es, wann nicht – Grundlagenartikel des Themenclusters.',
    seo: {
      title: 'Delle ohne Lackieren entfernen – so funktioniert es',
      description:
        'Delle ohne Lackieren entfernen: Wie die lackschonende Methode funktioniert, wann sie möglich ist, wo ihre Grenzen liegen und was sie vom Lackieren unterscheidet.',
      ogTitle: 'Delle ohne Lackieren entfernen – Methode, Voraussetzungen, Grenzen',
      ogDescription: 'Zurückformen statt überlackieren: was dahintersteckt und wann der Werkslack erhalten bleiben kann.',
    },
    h1: 'Delle ohne Lackieren entfernen – so funktioniert es',
    intro:
      'Die meisten Dellen sind für den Lack unproblematisch: Er ist nicht gerissen, nur das Blech darunter ist verformt. Genau hier setzt die lackschonende Dellenbeseitigung an. Sie formt die Stelle zurück, statt sie zu spachteln und zu überlackieren. Wie das grundsätzlich funktioniert, wann es geht und wann nicht, lesen Sie hier.',
    tldr: 'Ist der Lack unbeschädigt und die Delle nicht extrem tief oder scharf geknickt, kann sie oft lackschonend zurückgeformt werden – ohne Spachteln und Neulackierung. Nicht jede Delle eignet sich dafür; das klären wir vor Ort.',
    sections: [
      {
        title: 'Das Prinzip: zurückformen statt überlackieren',
        paras: [
          'Bei einer Delle ist das Blech nach innen gedrückt worden, der Lack ist dabei nur „mitgegangen“. Solange er nicht gerissen ist, muss er auch nicht ersetzt werden. Bei der lackschonenden Methode wird die verformte Stelle Schritt für Schritt in ihre ursprüngliche Form zurückgearbeitet. Je nach Schaden und Zugang kommen dafür unterschiedliche Verfahren zum Einsatz.',
          'Am Ende wird die Fläche im Licht kontrolliert: Reflexionen und Lichtlinien sollten wieder gleichmäßig verlaufen. Das ist der eigentliche Prüfstein – nicht, ob die Delle „ungefähr weg“ ist.',
        ],
      },
      {
        title: 'Wann es funktioniert – und wann nicht',
        paras: ['Die Chancen sind gut, wenn mehrere Punkte zusammenkommen:'],
        sub: [
          { title: 'Gute Voraussetzungen', paras: ['Der Lack ist nicht gerissen oder abgeplatzt. Die Delle ist eher eine sanfte Mulde als ein scharfer Knick. Die Stelle ist für die Reparatur zugänglich.'] },
          { title: 'Grenzen', paras: ['Bei beschädigtem Lack reicht Ausbeulen allein nicht. Sehr tiefe Verformungen, scharfe Falten oder stark gestrecktes Material setzen Grenzen. Auch Kanten und Sicken sind anspruchsvoller als freie Flächen.'] },
        ],
        callout: { title: 'Wichtig', text: 'Nicht jede Delle lässt sich ohne Lackieren reparieren – und niemand kann das seriös aus der Ferne versprechen. Was bei Ihrem Fahrzeug geht, zeigt die kostenlose Ersteinschätzung vor Ort.' },
      },
      {
        title: 'Was das gegenüber Spachteln und Lackieren ändert',
        paras: [
          'Klassisch wird die Delle gespachtelt, geschliffen und lackiert – inklusive Farbtonanpassung. Das ist bei beschädigtem Lack oder sehr tiefen Schäden oft der richtige Weg. Bei intaktem Lack hat die lackschonende Methode einen klaren Vorteil: Der originale Werkslack bleibt erhalten. Das hält die Oberfläche einheitlich und kann für den Fahrzeugwert relevant sein.',
        ],
        figure: { caseId: 'radlauf', text: 'Beispiel aus unserer Werkstatt: Radlauf – Ausbeulen ohne Lackieren. Im Nachher-Bild laufen die Spiegelungen auf der Fläche wieder ruhig.' },
      },
      {
        title: 'Und wenn der Lack doch beschädigt ist?',
        paras: [
          'Dann prüfen wir, ob eine Kombination aus Ausbeulen und Smart-Repair sinnvoll ist – die punktgenaue Reparatur kleiner Schäden ohne aufwendige Komplettlackierung. Das besprechen wir vorab offen mit Ihnen.',
        ],
      },
    ],
    faq: [
      { q: 'Bleibt nach der Reparatur eine Spur sichtbar?', a: 'Ziel ist eine Fläche, die im Licht wieder gleichmäßig reflektiert. Bei sehr tiefen oder scharfen Dellen können Restspuren nicht ausgeschlossen werden. Was realistisch ist, sagen wir Ihnen bei der Einschätzung.' },
      { q: 'Geht das bei jedem Fahrzeug?', a: 'Grundsätzlich bei vielen. Bauteil, Material und Zugänglichkeit spielen aber eine Rolle. Wir schauen uns das an Ihrem Fahrzeug an.' },
      { q: 'Wird der Lack dabei beschädigt?', a: 'Ziel der Methode ist gerade, den Lack zu erhalten. Voraussetzung ist, dass er vorher intakt war.' },
      { q: 'Wie finde ich heraus, ob meine Delle geeignet ist?', a: 'Am sichersten durch eine Begutachtung. Vorab hilft ein Blick auf Lack, Tiefe, Form und Lage – die Kriterien stehen im Ratgeber „Welche Dellen lassen sich ohne Lackieren reparieren?“.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'beulenentfernung', 'smart-repair'],
    regions: ['bremen', 'lilienthal'],
    landings: ['delle-ohne-lackieren-bremen'],
    related: ['welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'kann-eine-delle-unsichtbar-repariert-werden', 'was-kostet-eine-dellenreparatur'],
    image: 'dent',
  },

  /* ------------------------------------------------------------ HAGEL: KOSTEN */
  {
    slug: 'was-kostet-eine-hagelschaden-reparatur',
    title: 'Was kostet eine Hagelschaden-Reparatur?',
    category: 'Hagelschaden',
    intent: 'Preisorientierung bei Hagelschäden inkl. Versicherungsfragen; keine Zahlen erfinden.',
    seo: {
      title: 'Was kostet eine Hagelschaden-Reparatur? Was den Preis bestimmt',
      description:
        'Was kostet die Reparatur eines Hagelschadens? Anzahl der Treffer, Größe, betroffene Teile und Lack bestimmen den Aufwand – und wer zahlt. Ratgeber aus Lilienthal.',
      ogTitle: 'Was kostet eine Hagelschaden-Reparatur? – Ratgeber',
      ogDescription: 'Preisfaktoren bei Hagelschäden, Teilkasko-Grundlagen und wie Sie eine belastbare Einschätzung bekommen.',
    },
    h1: 'Was kostet eine Hagelschaden-Reparatur?',
    intro:
      'Bei einem Hagelschaden geht es selten um eine einzelne Delle. Es geht um Dutzende – verteilt über Dach, Motorhaube und Kofferraum. Entsprechend schwer lässt sich vorab eine Zahl nennen. Hier steht, welche Faktoren den Aufwand bestimmen, wie die Abrechnung über die Versicherung typischerweise gedacht ist und warum eine Begutachtung der erste Schritt ist.',
    tldr: 'Der Preis hängt von Anzahl, Größe und Tiefe der Treffer, den betroffenen Bauteilen und dem Lackzustand ab. Einen Pauschalpreis gibt es nicht. Hagelschäden laufen in der Regel über die Teilkasko – die Bedingungen Ihres Vertrags sind maßgeblich.',
    sections: [
      {
        title: 'Warum Hagelschäden so unterschiedlich ausfallen',
        paras: [
          'Zwei Fahrzeuge aus demselben Unwetter können völlig verschieden betroffen sein: Stand das Auto frei oder unter einem Baum? Waren die Körner klein oder groß, der Wind stark oder schwach? Auch das Fahrzeug selbst spielt eine Rolle – Form und Ausrichtung der Flächen bestimmen, wie viele Treffer wo landen.',
        ],
      },
      {
        title: 'Diese Faktoren bestimmen den Aufwand',
        paras: [],
        sub: [
          { title: 'Anzahl und Größe der Treffer', paras: ['Je mehr Dellen und je größer sie sind, desto umfangreicher die Arbeit.'] },
          { title: 'Betroffene Bauteile', paras: ['Horizontale Flächen wie Dach, Motorhaube und Kofferraumdeckel sind meist am stärksten betroffen. Sicken, Kanten und Übergänge sind aufwendiger als freie Flächen.'] },
          { title: 'Lackzustand', paras: ['Hagel kann Lack anplatzen lassen. Wo der Lack intakt ist, kommt eine schonende Reparatur eher in Frage; wo er beschädigt ist, sind zusätzliche Arbeiten nötig.'] },
          { title: 'Zugänglichkeit', paras: ['Je nach Bauteil müssen Verkleidungen oder Anbauteile abgenommen werden, damit man an die Rückseite der Dellen kommt.'] },
        ],
      },
      {
        title: 'Wer zahlt – und worauf Sie achten sollten',
        paras: [
          'Hagelschäden werden in der Regel über die Teilkaskoversicherung abgewickelt. Welche Leistungen Ihnen zustehen, hängt von den Bedingungen Ihres Vertrags ab, etwa von einer Selbstbeteiligung. Melden Sie den Schaden zeitnah und klären Sie das Vorgehen, bevor Sie die Reparatur beauftragen.',
          'Beachten Sie außerdem: Eine Abrechnung auf Grundlage eines Gutachtens oder Kostenvoranschlags kann anders ausfallen als eine Abrechnung bei tatsächlich durchgeführter Reparatur. Fragen Sie Ihre Versicherung, welche Variante für Sie gilt. Eine Versicherungsberatung können wir nicht leisten.',
        ],
      },
      {
        title: 'So bekommen Sie eine belastbare Einschätzung',
        paras: [
          'Kommen Sie mit sauberem Fahrzeug zur Begutachtung. Wir nehmen die betroffenen Flächen auf, schätzen das Ausmaß ein und prüfen, wo eine schonende Reparatur möglich ist – ohne überzogene Versprechen. Danach wissen Sie, womit Sie rechnen können. Die Ersteinschätzung vor Ort ist kostenlos.',
        ],
      },
    ],
    faq: [
      { q: 'Kann ich einen Hagelschaden vorab telefonisch bepreisen lassen?', a: 'Eine seriöse Zahl gibt es erst nach Begutachtung, weil Anzahl, Tiefe und Lackzustand der Treffer entscheidend sind. Rufen Sie uns gern an, dann vereinbaren wir die Begutachtung.' },
      { q: 'Zahlt die Versicherung immer die volle Reparatur?', a: 'Das hängt von Ihrem Vertrag ab, zum Beispiel von einer Selbstbeteiligung. Wir können keine Versicherungsberatung geben – bitte fragen Sie Ihren Versicherer.' },
      { q: 'Lässt sich jeder Hagelschaden reparieren?', a: 'Nicht jeder. Bei sehr vielen, tiefen Treffern oder beschädigtem Lack sind die Möglichkeiten begrenzt. Nach der Begutachtung sagen wir Ihnen ehrlich, was reparabel ist.' },
    ],
    pillar: 'hagelschaden-reparatur',
    services: ['hagelschaden-reparatur', 'dellenbeseitigung'],
    regions: ['bremen', 'osterholz-scharmbeck'],
    related: ['hagelschaden-am-auto-was-jetzt', 'dellen-vor-fahrzeugverkauf-reparieren', 'wie-lange-dauert-eine-dellenreparatur'],
    image: 'hail',
  },

  /* --------------------------------------------------------- HAGEL: WAS JETZT */
  {
    slug: 'hagelschaden-am-auto-was-jetzt',
    title: 'Hagelschaden am Auto – was jetzt?',
    category: 'Hagelschaden',
    intent: 'Akutfrage nach Unwetter: Reihenfolge der Schritte inkl. Versicherung und Werkstatt.',
    seo: {
      title: 'Hagelschaden am Auto – was jetzt? Schritt für Schritt',
      description:
        'Hagelschaden am Auto: Sicherheit prüfen, dokumentieren, Versicherung informieren, Schaden begutachten lassen. So gehen Sie vor – Ratgeber aus Lilienthal bei Bremen.',
      ogTitle: 'Hagelschaden am Auto – was jetzt?',
      ogDescription: 'Die wichtigsten Schritte nach dem Hagelschauer – vom Foto bis zur Instandsetzung.',
    },
    h1: 'Hagelschaden am Auto – was jetzt?',
    intro:
      'Der Schauer ist vorbei, die Motorhaube sieht aus wie ein Golfball. Jetzt zählt die richtige Reihenfolge: erst Sicherheit, dann Beweise, dann Meldung und Begutachtung. So lässt sich vermeiden, dass Sie später Ansprüche gefährden oder Möglichkeiten für eine schonende Reparatur verbauen.',
    tldr: 'Sicherheit prüfen, Schaden fotografieren, Versicherung zeitnah informieren, Fahrzeug begutachten lassen – und erst danach die Reparatur beauftragen. Wo der Originallack erhalten bleiben kann, soll er es.',
    sections: [
      {
        title: '1. Sicherheit zuerst',
        paras: ['Prüfen Sie, ob Scheiben, Scheinwerfer oder Spiegel beschädigt sind und das Fahrzeug noch verkehrssicher ist. Bei Glasbruch oder Schäden an sicherheitsrelevanten Teilen sollte das Fahrzeug nicht weiterbewegt werden, bis es geprüft wurde.'],
      },
      {
        title: '2. Schaden dokumentieren',
        paras: [
          'Fotografieren Sie das Fahrzeug bei Tageslicht aus mehreren Winkeln, auch die Reflexionen auf Dach, Motorhaube und Kofferraum – dort sieht man die Dellen am besten. Notieren Sie Datum, Ort und ungefähre Uhrzeit des Unwetters. Wenn möglich, halten Sie fest, wie das Fahrzeug stand.',
        ],
      },
      {
        title: '3. Versicherung informieren',
        paras: [
          'Hagelschäden werden in der Regel über die Teilkaskoversicherung abgewickelt. Die meisten Verträge verlangen eine zeitnahe Schadenmeldung. Klären Sie mit der Versicherung, wie sie vorgehen möchte, bevor Sie eine Reparatur beauftragen – etwa ob ein Gutachten oder Kostenvoranschlag verlangt wird.',
        ],
      },
      {
        title: '4. Begutachtung in der Werkstatt',
        paras: ['So läuft die Begutachtung bei uns ab:'],
        list: [
          'Schaden prüfen: Wir nehmen die betroffenen Flächen auf.',
          'Ausmaß einschätzen: Wie viele Treffer, wie tief, an welchen Bauteilen?',
          'Reparaturmöglichkeit prüfen: Wo ist eine schonende Reparatur möglich, wo nicht?',
          'Termin vereinbaren und Instandsetzung.',
        ],
        callout: { title: 'Keine überzogenen Versprechen', text: 'Nicht jeder Hagelschaden lässt sich lackschonend beseitigen. Wenn etwas nicht reparabel ist, sagen wir es klar.' },
      },
      {
        title: 'Hagelschäden sind mehr als Dellen',
        paras: [
          'Achten Sie auch auf Lackabplatzer, Kratzer, beschädigte Zierleisten und Glas. Solche Begleitschäden sollten in der Schadenmeldung nicht fehlen. Für Lackzustand und Glanz kommen je nach Fall Lackauffrischung und Fahrzeugaufbereitung dazu.',
        ],
      },
    ],
    faq: [
      { q: 'Wie schnell muss ich den Hagelschaden melden?', a: 'Zeitnah. Die meisten Verträge verlangen eine unverzügliche Schadenmeldung. Die konkrete Frist steht in Ihren Vertragsbedingungen.' },
      { q: 'Darf ich sofort reparieren lassen?', a: 'Klären Sie das vorher mit Ihrer Versicherung. Eine Reparatur ohne Abstimmung kann die Regulierung erschweren.' },
      { q: 'Kann der Hagelschaden ohne Lackieren repariert werden?', a: 'Bei intaktem Lack und geeigneten Dellen häufig ja. Ob es bei Ihrem Fahrzeug geht, sehen wir bei der Begutachtung.' },
      { q: 'Was, wenn mein Fahrzeug stark betroffen ist?', a: 'Dann prüfen wir, welche Flächen sich schonend reparieren lassen. Bei sehr vielen tiefen Treffern sind die Möglichkeiten begrenzt – das sagen wir Ihnen offen.' },
    ],
    pillar: 'hagelschaden-reparatur',
    services: ['hagelschaden-reparatur', 'lackauffrischung'],
    regions: ['bremen', 'osterholz-scharmbeck', 'worpswede'],
    related: ['was-kostet-eine-hagelschaden-reparatur', 'dellen-vor-fahrzeugverkauf-reparieren', 'wie-lange-dauert-eine-dellenreparatur'],
    image: 'hail',
  },

  /* ------------------------------------------------------------ SMART REPAIR */
  {
    slug: 'was-ist-smart-repair',
    title: 'Was ist Smart Repair?',
    category: 'Methode',
    intent: 'Begriffsklärung Smart Repair, Abgrenzung zur klassischen Reparatur, was bei Dellen Technik dazugehört.',
    seo: {
      title: 'Was ist Smart Repair? Einfach erklärt mit Beispielen',
      description:
        'Was ist Smart Repair? Die punktgenaue Reparatur kleiner Schäden ohne Komplettlackierung – Einsatzbereiche, Grenzen und was Dellen Technik in Lilienthal anbietet.',
      ogTitle: 'Was ist Smart Repair? – einfach erklärt',
      ogDescription: 'Kleine Schäden gezielt reparieren: Definition, typische Fälle, Grenzen und Unterschied zur klassischen Reparatur.',
    },
    h1: 'Was ist Smart Repair?',
    intro:
      'Ein kleiner Schaden am Auto muss nicht gleich eine große Reparatur bedeuten. Genau dafür wurde Smart Repair entwickelt: Es wird nur die betroffene Stelle instandgesetzt, statt ein ganzes Bauteil zu erneuern oder komplett zu lackieren. Hier steht, was das konkret heißt und wann es die richtige Wahl ist.',
    tldr: 'Smart Repair ist die gezielte Reparatur kleiner, begrenzter Schäden – ohne aufwendige Komplettlackierung. Bei uns gehören kleinere Karosserieschäden, Dellen, Beulen und die Lackauffrischung dazu.',
    sections: [
      {
        title: 'Die Idee hinter Smart Repair',
        paras: [
          'Bei der klassischen Reparatur wird oft ein ganzes Bauteil bearbeitet: Ein kleiner Schaden an der Tür kann bedeuten, dass die komplette Tür lackiert wird, damit der Farbton einheitlich bleibt. Smart Repair dreht das um: Es wird so gezielt wie möglich gearbeitet und so viel Originalsubstanz wie möglich erhalten. Das spart Aufwand und schont das Fahrzeug.',
        ],
      },
      {
        title: 'Was bei Dellen Technik dazugehört',
        paras: [],
        sub: [
          { title: 'Kleinere Karosserieschäden', paras: ['Begrenzte Schäden an der Karosserie, für die keine große Reparatur nötig ist.'] },
          { title: 'Dellen und Beulen', paras: ['Lackschonende Entfernung, wo der Lack intakt ist – siehe Dellenbeseitigung und Beulenentfernung.'] },
          { title: 'Lackauffrischung', paras: ['Mehr Glanz und Farbtiefe, wenn der Lack müde wirkt.'] },
        ],
      },
      {
        title: 'Typische Fälle',
        paras: ['Smart Repair bietet sich zum Beispiel an bei:'],
        list: ['einer Parkdelle an einer Tür oder einem Kotflügel', 'einer Beule an einem Fahrzeugteil ohne Lackschaden', 'einem Fahrzeug, das vor dem Verkauf oder der Rückgabe optisch aufgefrischt werden soll'],
        figure: { caseId: 'heckstossstange', text: 'Beispiel aus unserer Werkstatt: Heckstoßstange – Delle entfernt.' },
      },
      {
        title: 'Wo Smart Repair nicht reicht',
        paras: [
          'Bei größeren Unfallschäden mit verformter Struktur ist meist eine klassische Karosserie- und Lackierwerkstatt der richtige Ansprechpartner. Sehen wir bei der Begutachtung, dass eine andere Lösung besser ist, sagen wir es Ihnen ehrlich.',
        ],
      },
    ],
    faq: [
      { q: 'Ist Smart Repair dasselbe wie Dellenreparatur?', a: 'Die Dellenreparatur ist ein Teil davon. Smart Repair ist der Oberbegriff für gezielte Reparaturen kleiner Schäden – bei uns inklusive Dellen, Beulen, kleinerer Karosserieschäden und Lackauffrischung.' },
      { q: 'Wird dabei das ganze Bauteil lackiert?', a: 'Ziel ist gerade, das zu vermeiden – Smart Repair heißt punktgenau arbeiten. Was im Einzelfall nötig ist, sagen wir bei der Einschätzung.' },
      { q: 'Für welche Schäden eignet es sich nicht?', a: 'Für größere Unfallschäden mit verformter Struktur ist eine klassische Karosserie- und Lackierwerkstatt der bessere Weg.' },
    ],
    pillar: 'smart-repair',
    services: ['smart-repair', 'lackauffrischung', 'dellenbeseitigung'],
    regions: ['lilienthal', 'ritterhude', 'bremen'],
    related: ['was-kostet-ein-kleiner-parkschaden', 'delle-ohne-lackieren-entfernen', 'beule-im-auto-entfernen'],
    image: 'workshop',
  },

  /* ---------------------------------------------------------------- KRITERIEN */
  {
    slug: 'welche-dellen-lassen-sich-ohne-lackieren-reparieren',
    title: 'Welche Dellen lassen sich ohne Lackieren reparieren?',
    category: 'Beurteilung',
    intent: 'Entscheidungshilfe/Checkliste: Kriterien, an denen sich Reparierbarkeit entscheidet (Abgrenzung zu „Methode“).',
    seo: {
      title: 'Welche Dellen lassen sich ohne Lackieren reparieren?',
      description:
        'Welche Dellen lassen sich ohne Lackieren reparieren? Die sechs Kriterien – Lack, Tiefe, Form, Kanten, Zugang, Material – als Checkliste. Ratgeber aus Lilienthal.',
      ogTitle: 'Welche Dellen lassen sich ohne Lackieren reparieren? – Checkliste',
      ogDescription: 'Sechs Kriterien, an denen sich entscheidet, ob Ihre Delle lackschonend zu beheben ist.',
    },
    h1: 'Welche Dellen lassen sich ohne Lackieren reparieren?',
    intro:
      'Der wichtigste Satz vorweg: Nicht jede Delle lässt sich ohne Lackieren reparieren. Wer etwas anderes verspricht, verkauft Erwartungen. Es gibt aber sechs klare Kriterien, an denen sich meist schon vor der Begutachtung abschätzen lässt, ob eine lackschonende Reparatur realistisch ist. Diese Checkliste erklärt sie.',
    tldr: 'Entscheidend sind Lack, Tiefe, Form, Lage (Kante oder Fläche), Zugänglichkeit und Material. Sind Lack und Form günstig, stehen die Chancen gut – die Gewissheit bringt die Begutachtung.',
    sections: [
      {
        title: 'Die sechs Kriterien im Überblick',
        paras: [],
        sub: [
          { title: '1. Lack: intakt oder beschädigt?', paras: ['Das wichtigste Kriterium. Ist der Lack nicht gerissen oder abgeplatzt, ist die Grundlage für eine lackschonende Reparatur da. Ein Lackriss lässt sich durch Ausbeulen allein nicht beheben.'] },
          { title: '2. Tiefe: Mulde oder tiefe Verformung?', paras: ['Flache bis mittlere Mulden sind meist gut zugänglich. Sehr tiefe Verformungen sind anspruchsvoller und können Grenzen setzen.'] },
          { title: '3. Form: sanft gerundet oder scharf geknickt?', paras: ['Runde Dellen lassen sich meist besser zurückformen als scharfe Falten oder Knicke, bei denen das Material stark gestreckt wurde.'] },
          { title: '4. Lage: freie Fläche oder Kante?', paras: ['Auf freien Flächen wie Tür oder Kotflügel sind die Voraussetzungen oft günstiger. Kanten, Sicken und Übergänge sind aufwendiger.'] },
          { title: '5. Zugänglichkeit', paras: ['Kommt man an die Rückseite der Delle? Manche Stellen sind gut erreichbar, bei anderen müssen Verkleidungen ab – oder es geht nur eingeschränkt.'] },
          { title: '6. Material und Bauteil', paras: ['Stahl und Aluminium verhalten sich unterschiedlich; auch Aufbau und Verstärkungen im Bauteil spielen eine Rolle.'] },
        ],
      },
      {
        title: 'Typische Situationen – und wie sie sich meist einordnen lassen',
        paras: ['Die folgenden Einschätzungen sind Orientierung, keine Zusage:'],
        list: [
          'Parkdelle in der Mitte einer Tür, Lack glatt: gute Voraussetzungen.',
          'Delle direkt an der Türkante: möglich, aber anspruchsvoller.',
          'Viele flache Hageltreffer auf Dach und Haube: häufig gute Chancen, hängt von Anzahl und Tiefe ab.',
          'Knick mit Lackriss: lackschonend nicht möglich; Smart-Repair oder Lackarbeiten können sinnvoll sein.',
          'Sehr große, tiefe Verformung nach einem Unfall: eher ein Fall für eine Karosserie- und Lackierwerkstatt.',
        ],
        figure: { caseId: 'kotfluegel', text: 'Beispiel aus unserer Werkstatt: Kotflügel – Dellenbeseitigung, Lack intakt.' },
      },
      {
        title: 'Selbst-Check vor dem Termin',
        paras: [
          'Reinigen Sie das Fahrzeug, betrachten Sie die Delle im Schräglicht und schauen Sie, ob der Lack glatt bleibt. Machen Sie Fotos. Alles Weitere klären wir gemeinsam vor Ort – kostenlos und ehrlich, auch wenn die Antwort „lieber anders reparieren“ lautet.',
        ],
      },
    ],
    faq: [
      { q: 'Kann ich vorab selbst erkennen, ob meine Delle geeignet ist?', a: 'Grob ja: Ist der Lack intakt und die Delle eine sanfte Mulde auf einer freien Fläche, stehen die Chancen gut. Sicher wissen wir es erst nach Begutachtung.' },
      { q: 'Wie ist es bei Aluminiumbauteilen?', a: 'Aluminium verhält sich anders als Stahl. Ob und wie es geht, beurteilen wir am Bauteil.' },
      { q: 'Sind ältere Dellen ein Problem?', a: 'Nicht automatisch. Entscheidend sind Lackzustand und Verformung, nicht das Alter der Delle.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'beulenentfernung', 'smart-repair'],
    regions: ['bremen', 'grasberg'],
    landings: ['delle-ohne-lackieren-bremen'],
    related: ['delle-ohne-lackieren-entfernen', 'kann-eine-delle-unsichtbar-repariert-werden', 'delle-im-auto-was-tun'],
    image: 'large',
  },

  /* -------------------------------------------------------------- PARKREMPLER */
  {
    slug: 'delle-nach-parkrempler-was-tun',
    title: 'Delle nach Parkrempler – was tun?',
    category: 'Alltag',
    intent: 'Nach einem Parkrempler mit Delle: Dokumentation, Verursacherfrage, Versicherung, Reparatur.',
    seo: {
      title: 'Delle nach Parkrempler – was tun? Ablauf und Tipps',
      description:
        'Parkrempler mit Delle: Schaden dokumentieren, Verursacher klären, Versicherung informieren und erst dann reparieren. Ratgeber von Dellen Technik, Lilienthal.',
      ogTitle: 'Delle nach Parkrempler – was tun?',
      ogDescription: 'Bekannter oder unbekannter Verursacher – das ändert den Ablauf. Und wann eine lackschonende Reparatur in Frage kommt.',
    },
    h1: 'Delle nach Parkrempler – was tun?',
    intro:
      'Es passiert im Supermarktparkplatz, in der Tiefgarage, vor der eigenen Haustür: Jemand öffnet die Tür oder rangiert etwas zu knapp – und Ihr Auto hat eine Delle. Was danach zählt, ist die richtige Reihenfolge. Erst klären, wer verantwortlich ist, dann reparieren. So gefährden Sie keine Ansprüche.',
    tldr: 'Erst dokumentieren und – falls möglich – den Verursacher klären, dann die Delle begutachten lassen. Parkdellen bei intaktem Lack lassen sich häufig lackschonend entfernen.',
    sections: [
      {
        title: 'Direkt nach dem Schaden',
        paras: [
          'Fotografieren Sie die Delle aus mehreren Winkeln und die Position der beteiligten Fahrzeuge, falls noch vorhanden. Halten Sie Ort, Zeit und Kennzeichen fest. Fragen Sie bei Zeugen nach Namen und Nummer. Wer einen Schaden verursacht und sich einfach entfernt, begeht Unfallflucht.',
        ],
      },
      {
        title: 'Drei Situationen, drei Wege',
        paras: [],
        sub: [
          { title: 'Der Verursacher ist bekannt', paras: ['Tauschen Sie Daten aus und informieren Sie die Versicherung des Verursachers bzw. Ihre eigene. Warten Sie mit der Reparatur, bis geklärt ist, wie abgerechnet wird.'] },
          { title: 'Der Verursacher ist unbekannt', paras: ['Bei Unfallflucht ist die Polizei ein sinnvoller erster Schritt. Ob Ihre Vollkasko einspringt und was das für Selbstbeteiligung und Beitragseinstufung bedeutet, klären Sie mit Ihrer Versicherung.'] },
          { title: 'Sie waren selbst der Verursacher', paras: ['Dann tragen Sie den Schaden selbst oder nutzen Ihre Vollkasko. Bei kleinen Schäden lohnt der Vergleich mit einer Eigenzahlung – die Versicherung kann Ihnen zu den Folgen für Ihre Einstufung Auskunft geben.'] },
        ],
      },
      {
        title: 'Die Delle reparieren lassen',
        paras: [
          'Parkdellen sitzen oft auf Türen, Kotflügeln oder der Stoßstange. Bei intaktem Lack lassen sie sich häufig lackschonend entfernen. Etwas anspruchsvoller sind Dellen direkt an der Kante – dort entscheidet die Begutachtung. Kommen Sie mit sauberem Fahrzeug vorbei: Die Ersteinschätzung vor Ort ist kostenlos.',
        ],
        figure: { caseId: 'heckstossstange', text: 'Beispiel aus unserer Werkstatt: Heckstoßstange – Delle entfernt.' },
      },
    ],
    faq: [
      { q: 'Muss ich bei einer kleinen Parkdelle die Polizei rufen?', a: 'Bei bekanntem Verursacher meist nicht. Bei unbekanntem Verursacher (Unfallflucht) ist es sinnvoll. Im Zweifel fragen Sie Ihre Versicherung.' },
      { q: 'Kann ich sofort reparieren lassen?', a: 'Wenn eine Versicherung zahlen soll, klären Sie erst das Vorgehen. Bei Eigenzahlung können Sie direkt einen Termin vereinbaren.' },
      { q: 'Lohnt sich eine Reparatur bei kleinen Dellen?', a: 'Das ist eine persönliche Abwägung. Bei der Einschätzung sagen wir Ihnen ehrlich, was sinnvoll ist.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'smart-repair'],
    regions: ['bremen', 'lilienthal'],
    landings: ['parkdelle-reparieren'],
    related: ['was-kostet-ein-kleiner-parkschaden', 'delle-im-auto-was-tun', 'ablauf-dellenreparatur'],
    image: 'dent',
  },

  /* ----------------------------------------------------------------- LEASING */
  {
    slug: 'delle-vor-leasingrueckgabe-reparieren',
    title: 'Dellen vor der Leasingrückgabe reparieren',
    category: 'Leasing',
    intent: 'Leasingnehmer vor Rückgabe: Rückgabeprotokoll, Abgrenzung Gebrauchsspur/Schaden, Zeitplan, Reparatur ja/nein.',
    seo: {
      title: 'Dellen vor der Leasingrückgabe reparieren? Ratgeber',
      description:
        'Dellen vor der Leasingrückgabe beseitigen? Was im Rückgabeprotokoll zählt, worauf Sie achten und wie lackschonende Reparatur helfen kann. Ratgeber aus Lilienthal.',
      ogTitle: 'Dellen vor der Leasingrückgabe reparieren?',
      ogDescription: 'Gebrauchsspur oder Schaden? So bereiten Sie die Rückgabe vor und prüfen, ob sich eine Reparatur lohnt.',
    },
    h1: 'Dellen vor der Leasingrückgabe reparieren?',
    intro:
      'Bei der Rückgabe eines Leasingfahrzeugs wird der Zustand meist in einem Protokoll festgehalten. Was über normale Gebrauchsspuren hinausgeht, kann nach den Vertragsbedingungen nachberechnet werden. Dellen gehören zu den häufigsten Streitpunkten. Wer rechtzeitig prüft, kann entscheiden, ob eine Reparatur sinnvoll ist – statt später überrascht zu werden.',
    tldr: 'Lesen Sie zuerst Ihre Vertragsbedingungen und das Rückgabemerkblatt, planen Sie Vorlauf ein und lassen Sie sichtbare Dellen einschätzen. Eine lackschonende Reparatur kann sich lohnen – wie der Leasinggeber am Ende bewertet, können wir nicht zusichern.',
    sections: [
      {
        title: 'Gebrauchsspur oder Schaden?',
        paras: [
          'Leasinggeber unterscheiden zwischen normalem Verschleiß und Schäden. Was im Einzelnen als üblich gilt, regeln Vertrag und Rückgabekriterien – häufig mit Vorgaben zur Größe von Dellen oder Lackschäden. Eine pauschale Aussage gibt es nicht; schauen Sie in Ihre Unterlagen.',
        ],
      },
      {
        title: 'Vorbereitung in vier Schritten',
        paras: [],
        list: [
          'Unterlagen prüfen: Vertragsbedingungen, Rückgabemerkblatt, ggf. Kriterienkatalog des Leasinggebers.',
          'Fahrzeug im Licht prüfen: Reinigen Sie es gründlich und schauen Sie auf Dellen und Kratzer.',
          'Vorlauf einplanen: Termine für Reparatur und Rückgabe nicht auf den letzten Tag legen.',
          'Einschätzung einholen: Lassen Sie sichtbare Dellen begutachten, bevor Sie entscheiden.',
        ],
      },
      {
        title: 'Reparieren oder nachberechnen lassen?',
        paras: [
          'Das ist eine Abwägung: Auf der einen Seite steht die Nachberechnung durch den Leasinggeber, auf der anderen der Aufwand einer Reparatur. Bei intaktem Lack kann die lackschonende Beseitigung eine sinnvolle Option sein. Prüfen Sie außerdem, ob Ihr Leasinggeber Vorgaben zur Ausführung macht, etwa bestimmte Nachweise für Reparaturen.',
        ],
        callout: { title: 'Ehrlichkeit vorab', text: 'Wir können nicht zusichern, wie ein Leasinggeber ein Fahrzeug bewertet. Wir sagen Ihnen, was sich reparieren lässt – und was nicht.' },
      },
      {
        title: 'Auch der Gesamteindruck zählt',
        paras: ['Neben Dellen fallen bei der Rückgabe Lackzustand und Sauberkeit auf. Eine Lackauffrischung oder Fahrzeugaufbereitung kann das Bild abrunden.'],
      },
    ],
    faq: [
      { q: 'Wie früh sollte ich vor der Rückgabe kommen?', a: 'Möglichst früh, damit Zeit für Einschätzung, Terminfindung und Reparatur bleibt. Termine vergeben wir kurzfristig nach Vereinbarung – rechnen Sie trotzdem Puffer ein.' },
      { q: 'Kann eine Reparatur garantieren, dass es keine Nachberechnung gibt?', a: 'Nein. Wie der Leasinggeber bewertet, entscheidet er selbst.' },
      { q: 'Reicht eine lackschonende Reparatur aus?', a: 'Wenn der Lack intakt ist und die Delle geeignet, kann sie eine gute Lösung sein. Ob sie Ihren Vorgaben genügt, klären Sie mit dem Leasinggeber.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'lackauffrischung', 'fahrzeugaufbereitung'],
    regions: ['bremen', 'lilienthal'],
    related: ['dellen-vor-fahrzeugverkauf-reparieren', 'wie-lange-dauert-eine-dellenreparatur', 'was-kostet-eine-dellenreparatur'],
    image: 'gloss',
  },

  /* ----------------------------------------------------------------- VERKAUF */
  {
    slug: 'dellen-vor-fahrzeugverkauf-reparieren',
    title: 'Dellen vor dem Fahrzeugverkauf reparieren',
    category: 'Verkauf',
    intent: 'Verkaufsentscheidung: Delle/Hagelschaden vor Verkauf reparieren oder offen ausweisen.',
    seo: {
      title: 'Dellen vor dem Autoverkauf reparieren? Entscheidungshilfe',
      description:
        'Dellen oder Hagelschaden vor dem Fahrzeugverkauf reparieren oder offen ausweisen? Was für und gegen die Reparatur spricht – Ratgeber von Dellen Technik, Lilienthal.',
      ogTitle: 'Dellen vor dem Fahrzeugverkauf reparieren?',
      ogDescription: 'Reparieren oder ausweisen? Die wichtigsten Fragen vor dem Verkauf – auch bei Hagelschaden.',
    },
    h1: 'Dellen vor dem Fahrzeugverkauf reparieren?',
    intro:
      'Ein Auto mit Delle lässt sich verkaufen – aber Interessenten sehen sie sofort. Ob sich eine Reparatur vor dem Verkauf lohnt, hängt vom Schaden, vom Verkaufsweg und von Ihrem Ziel ab. Dieser Ratgeber hilft bei der Entscheidung, ohne ein Ergebnis vorwegzunehmen.',
    tldr: 'Ob sich die Reparatur lohnt, hängt von Ausmaß, Aufwand und Verkaufsweg ab. Eine Begutachtung schafft Klarheit. Bekannte Schäden dürfen Sie beim Verkauf nicht verschweigen.',
    sections: [
      {
        title: 'Zwei legitime Wege',
        paras: [
          'Sie können das Fahrzeug mit Delle anbieten und den Schaden offen ausweisen – oder die Delle vorher beheben lassen. Beides ist in Ordnung. Nicht in Ordnung ist es, bekannte Schäden zu verschweigen; das kann zu Ansprüchen des Käufers führen.',
        ],
      },
      {
        title: 'Was für die Reparatur spricht',
        paras: ['Ein optisch einwandfreies Fahrzeug spricht Interessenten oft stärker an, und der Verkaufsprozess wird unkomplizierter, wenn weniger Diskussionen über Mängel nötig sind. Dagegen steht der Aufwand. Diese Fragen helfen:'],
        list: [
          'Wie viele Dellen sind es, wie groß und wo?',
          'Ist der Lack intakt, kommt also eine lackschonende Reparatur in Frage?',
          'Verkaufen Sie privat oder an einen Händler? Bei einem Ankauf durch Händler kann der Stellenwert einer Reparatur anders ausfallen.',
          'Wie verhält sich der Aufwand zu Ihrem Verkaufsziel?',
        ],
      },
      {
        title: 'Sonderfall Hagelschaden',
        paras: [
          'Bei Hagelschäden kommt hinzu, dass die Versicherung häufig beteiligt ist. Klären Sie mit ihr, wie abgerechnet wird, bevor Sie verkaufen oder reparieren lassen. Ein unrepariertes Fahrzeug mit Hagelschaden muss im Inserat und im Kaufvertrag entsprechend beschrieben sein.',
        ],
      },
      {
        title: 'Die sinnvolle Reihenfolge',
        paras: ['Erst die Dellen beurteilen lassen, dann – falls gewünscht – lackschonend beseitigen, anschließend Lack und Innenraum auffrischen. So wirkt das Gesamtbild stimmig. Wir sagen Ihnen bei der Einschätzung, was sich reparieren lässt und womit Sie rechnen können.'],
      },
    ],
    faq: [
      { q: 'Erhöht die Reparatur den Verkaufspreis?', a: 'Dazu machen wir keine Zusage. Ein optisch gepflegtes Fahrzeug wirkt oft überzeugender; wie sich das im Preis niederschlägt, hängt vom Markt und vom Käufer ab.' },
      { q: 'Darf ich eine Delle beim Verkauf verschweigen?', a: 'Nein. Bekannte Schäden sollten Sie offenlegen. Im Zweifel fragen Sie Ihren Rechtsbeistand.' },
      { q: 'Lohnt sich die Reparatur bei einem älteren Fahrzeug?', a: 'Das ist eine Abwägung von Aufwand und Nutzen. Wir sagen Ihnen bei der Einschätzung ehrlich, was sinnvoll ist – auch, wenn die Antwort „lieber nicht“ lautet.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'hagelschaden-reparatur', 'fahrzeugaufbereitung'],
    regions: ['bremen', 'osterholz-scharmbeck'],
    related: ['delle-vor-leasingrueckgabe-reparieren', 'hagelschaden-am-auto-was-jetzt', 'was-kostet-eine-dellenreparatur'],
    image: 'gloss',
  },

  /* ------------------------------------------------------------------- DAUER */
  {
    slug: 'wie-lange-dauert-eine-dellenreparatur',
    title: 'Wie lange dauert eine Dellenreparatur?',
    category: 'Ablauf',
    intent: 'Zeitfrage: Dauer ohne erfundene Angaben, dafür Einflussfaktoren und Terminlogik.',
    seo: {
      title: 'Wie lange dauert eine Dellenreparatur? Was die Dauer bestimmt',
      description:
        'Wie lange dauert eine Dellenreparatur? Anzahl, Größe und Lage der Dellen bestimmen die Dauer. So läuft die Terminvergabe bei Dellen Technik in Lilienthal ab.',
      ogTitle: 'Wie lange dauert eine Dellenreparatur?',
      ogDescription: 'Warum es keine feste Zeitangabe gibt, was die Dauer beeinflusst und wie Sie schnell zum Termin kommen.',
    },
    h1: 'Wie lange dauert eine Dellenreparatur?',
    intro:
      'Am liebsten wüsste man es vorher auf die Stunde. Eine feste Angabe wäre aber unseriös, denn die Dauer hängt vom einzelnen Schaden ab. Was sich sagen lässt: welche Faktoren sie bestimmen, wie der Weg vom Anruf bis zur Abholung aussieht und was Sie tun können, damit alles zügig geht.',
    tldr: 'Die Dauer hängt von Anzahl, Größe, Tiefe und Lage der Dellen ab. Termine vergeben wir kurzfristig nach Vereinbarung; den Zeitrahmen für Ihren Fall nennen wir bei der kostenlosen Einschätzung.',
    sections: [
      {
        title: 'Was die Dauer beeinflusst',
        paras: [],
        list: [
          'Anzahl der Dellen – ein Hagelschaden braucht länger als eine einzelne Parkdelle.',
          'Größe, Tiefe und Lage der Stellen – Kanten und Sicken sind aufwendiger als freie Flächen.',
          'Zugänglichkeit – müssen Verkleidungen abgenommen werden?',
          'Zusatzwünsche wie Lackauffrischung oder Fahrzeugaufbereitung.',
        ],
      },
      {
        title: 'Vom Anruf bis zur Abholung',
        paras: ['Der Ablauf hat vier Stationen: Schaden zeigen, Einschätzung erhalten, Termin vereinbaren, Fahrzeug abholen. Zwischen Einschätzung und Termin liegt bei uns meist nicht viel: Termine vergeben wir kurzfristig nach Vereinbarung.'],
        callout: { title: 'Planung mit Alltag', text: 'Brauchen Sie Ihr Fahrzeug jeden Tag? Sagen Sie es bei der Einschätzung. Dann besprechen wir, wie sich der Termin einrichten lässt.' },
      },
      {
        title: 'So geht es schneller',
        paras: [],
        list: [
          'Rufen Sie an, bevor Sie kommen: 0174 71 17 321.',
          'Zeigen Sie alle Dellen bei der Begutachtung, nicht nur die auffälligste.',
          'Kommen Sie mit sauberem Fahrzeug – Schmutz erschwert die Beurteilung.',
          'Klären Sie Versicherungsfragen vorab, damit die Reparatur ohne Warten starten kann.',
        ],
      },
    ],
    faq: [
      { q: 'Kann ich das Fahrzeug direkt nach der Begutachtung dalassen?', a: 'Das besprechen wir bei der Einschätzung. Termine vergeben wir kurzfristig nach Vereinbarung.' },
      { q: 'Wie lange dauert ein Hagelschaden?', a: 'Länger als eine Einzeldelle, weil mehr Treffer zu bearbeiten sind. Den Zeitrahmen nennen wir nach der Begutachtung.' },
      { q: 'Gibt es Termine am Samstag?', a: 'Wir haben samstags von 10:00 bis 13:00 Uhr geöffnet. Termine außerhalb der Zeiten sind auf Anfrage möglich.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'hagelschaden-reparatur'],
    regions: ['lilienthal', 'osterholz-scharmbeck'],
    related: ['ablauf-dellenreparatur', 'was-kostet-eine-dellenreparatur', 'hagelschaden-am-auto-was-jetzt'],
    image: 'dent',
  },

  /* --------------------------------------------------------------- UNSICHTBAR */
  {
    slug: 'kann-eine-delle-unsichtbar-repariert-werden',
    title: 'Kann eine Delle unsichtbar repariert werden?',
    category: 'Ergebnis',
    intent: 'Erwartungsmanagement: Ziel vs. Garantie, woran man ein gutes Ergebnis erkennt.',
    seo: {
      title: 'Kann eine Delle unsichtbar repariert werden? Ehrliche Antwort',
      description:
        'Lässt sich eine Delle unsichtbar reparieren? Was „unsichtbar“ heißt, woran man ein gutes Ergebnis erkennt und wann Restspuren bleiben können. Ratgeber aus Lilienthal.',
      ogTitle: 'Kann eine Delle unsichtbar repariert werden?',
      ogDescription: 'Das Ziel ist eine Fläche, die wieder gleichmäßig reflektiert – und wo die Grenzen liegen.',
    },
    h1: 'Kann eine Delle unsichtbar repariert werden?',
    intro:
      'Die kurze Antwort: Das ist das Ziel – ein Versprechen für jede Delle ist es nicht. Eine Reparatur gilt als gelungen, wenn die Fläche im Licht wieder gleichmäßig reflektiert und man die Stelle nicht mehr sucht. Was dafür nötig ist und wann trotzdem Spuren bleiben können, erklärt dieser Ratgeber.',
    tldr: 'Ziel ist eine Fläche, deren Reflexionen wieder gleichmäßig laufen. Bei günstigen Voraussetzungen gelingt das sehr gut; bei tiefen oder scharfen Dellen sind Restspuren möglich. Was realistisch ist, sagen wir vor der Reparatur.',
    sections: [
      {
        title: 'Woran man ein gutes Ergebnis erkennt',
        paras: [
          'Das Auge erkennt Dellen nicht an der Form, sondern an den Spiegelungen: Auf einer glatten Fläche verlaufen Lichtlinien gerade, bei einer Delle knicken oder wellen sie. Wenn Lichtlinien und Reflexionen nach der Reparatur wieder ruhig durch die Stelle laufen, ist die Delle visuell weg. Genau so kontrollieren wir das Ergebnis im Licht.',
        ],
        figure: { caseId: 'radlauf', text: 'Radlauf – Ausbeulen ohne Lackieren: Im Nachher-Bild verlaufen die Spiegelungen wieder gleichmäßig über die Fläche.' },
      },
      {
        title: 'Was den Unterschied macht',
        paras: [],
        list: [
          'Ein intakter Lack – ohne Risse gelingt „unsichtbar“ deutlich eher.',
          'Eine sanfte Form – tiefe Knicke und Falten lassen sich schwerer vollständig glätten.',
          'Die Lage – auf freien Flächen einfacher als an Kanten und Sicken.',
          'Sorgfalt und Erfahrung – saubere Handwerksarbeit ist hier keine Floskel, sondern der Kern.',
        ],
      },
      {
        title: 'Wann Restspuren bleiben können',
        paras: [
          'Bei sehr tiefen Verformungen, stark gestrecktem Material oder bereits beschädigtem Lack kann eine Spur sichtbar bleiben. Wir sagen Ihnen das vor der Reparatur – nicht danach. Manchmal ist dann eine Kombination mit Smart-Repair oder Lackauffrischung die bessere Lösung.',
        ],
      },
      {
        title: 'Ehrliche Erwartung, gutes Ergebnis',
        paras: ['Wer realistische Erwartungen hat, ist am Ende meist zufriedener. Deshalb gehört die ehrliche Einschätzung bei uns zur Reparatur dazu – kostenlos und vor Ort.'],
      },
    ],
    faq: [
      { q: 'Kann ich eine 100%ige Unsichtbarkeit erwarten?', a: 'Eine Garantie geben wir nicht. Bei günstigen Voraussetzungen ist das Ergebnis sehr gut; bei tiefen oder scharfen Dellen sind Restspuren möglich.' },
      { q: 'Wie prüfen Sie das Ergebnis?', a: 'Im passenden Licht: Die Reflexionen auf der Fläche sollten wieder gleichmäßig verlaufen.' },
      { q: 'Was, wenn ich mit dem Ergebnis nicht zufrieden bin?', a: 'Sprechen Sie uns direkt an. Wir schauen uns das gemeinsam an.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'smart-repair'],
    regions: ['lilienthal', 'bremen'],
    related: ['delle-ohne-lackieren-entfernen', 'welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'ablauf-dellenreparatur'],
    image: 'gloss',
  },

  /* ------------------------------------------------------------ KLEINER SCHADEN */
  {
    slug: 'was-kostet-ein-kleiner-parkschaden',
    title: 'Was kostet ein kleiner Parkschaden?',
    category: 'Kosten',
    intent: 'Kleiner Schaden am Fahrzeug: welche Lösung, was beeinflusst den Preis.',
    seo: {
      title: 'Was kostet ein kleiner Parkschaden? Lösungen im Überblick',
      description:
        'Was kostet ein kleiner Parkschaden? Von der Delle bis zum Lackschaden: Art, Größe und Lage bestimmen den Preis. Ehrliche Einschätzung kostenlos in Lilienthal.',
      ogTitle: 'Was kostet ein kleiner Parkschaden?',
      ogDescription: 'Kleine Schäden richtig einordnen: welche Lösung passt und was den Preis beeinflusst.',
    },
    h1: 'Was kostet ein kleiner Parkschaden?',
    intro:
      'Ein „kleiner Parkschaden“ kann vieles sein: eine Delle, eine Beule, ein Kratzer, ein Lackabrieb – oder mehrere Dinge zugleich. Deshalb lässt sich der Preis ohne Ansicht des Schadens nicht seriös nennen. Was sich sagen lässt: welche Lösungen es gibt, was jede beeinflusst und wie Sie eine belastbare Einschätzung bekommen.',
    tldr: 'Die Kosten hängen von Art, Größe, Lage und Lackzustand ab. Oft reicht eine punktgenaue Lösung statt einer aufwendigen Komplettlackierung – die Einschätzung dazu bekommen Sie bei uns kostenlos.',
    sections: [
      {
        title: 'Welche Lösung passt zu welchem Schaden?',
        paras: [],
        sub: [
          { title: 'Delle oder Beule bei intaktem Lack', paras: ['Lackschonende Dellenbeseitigung bzw. Beulenentfernung – ohne Spachteln und Neulackierung, wo es möglich ist.'] },
          { title: 'Kleiner Lackschaden ohne große Verformung', paras: ['Smart-Repair: gezielte Reparatur der Stelle statt Komplettlackierung des Bauteils.'] },
          { title: 'Matter oder fleckiger Lack insgesamt', paras: ['Lackauffrischung für mehr Glanz und Farbtiefe.'] },
        ],
      },
      {
        title: 'Was den Preis beeinflusst',
        paras: [],
        list: ['Art des Schadens: Delle, Beule, Lackschaden oder mehrere', 'Größe und Lage an der Karosserie', 'Zustand des Lacks', 'gewählte Lösung: Ausbeulen, Smart-Repair oder Lackauffrischung'],
      },
      {
        title: 'Reparieren, selbst zahlen oder über die Versicherung?',
        paras: [
          'Bei kleinen Schäden lohnt sich ein Vergleich: Liegt die Reparatur nur knapp über einer Selbstbeteiligung, kann Selbstzahlen sinnvoll sein – auch wegen der möglichen Beitragsfolgen bei Vollkasko-Inanspruchnahme. Das können wir nicht beurteilen; Ihre Versicherung kann es.',
        ],
      },
      {
        title: 'Die passende Lösung finden',
        paras: ['Wir schauen uns den Schaden an, sagen Ihnen offen, was sinnvoll ist, und nennen Ihnen bei der Einschätzung, womit Sie rechnen können – kostenlos und unverbindlich.'],
      },
    ],
    faq: [
      { q: 'Ist ein Kratzer dasselbe wie eine Delle?', a: 'Nein. Für Kratzer und Lackschäden kommen andere Verfahren in Frage, zum Beispiel Smart-Repair oder Lackauffrischung. Wir schauen uns an, was bei Ihnen vorliegt.' },
      { q: 'Muss ich für die Einschätzung einen Termin machen?', a: 'Für die Begutachtung dürfen Sie direkt vorbeikommen; damit wir Zeit für Sie einplanen, rufen Sie am besten kurz an.' },
      { q: 'Kann ich mehrere kleine Schäden in einem Termin beheben lassen?', a: 'Ja, das lässt sich oft sinnvoll bündeln. Zeigen Sie uns bei der Begutachtung alle Stellen.' },
    ],
    pillar: 'smart-repair',
    services: ['smart-repair', 'dellenbeseitigung', 'beulenentfernung'],
    regions: ['bremen', 'ritterhude'],
    related: ['was-kostet-eine-dellenreparatur', 'was-ist-smart-repair', 'delle-nach-parkrempler-was-tun'],
    image: 'workshop',
  },

  /* ------------------------------------------------------------------ ABLAUF */
  {
    slug: 'ablauf-dellenreparatur',
    title: 'Ablauf einer Dellenreparatur',
    category: 'Ablauf',
    intent: 'Prozessverständnis: wie läuft es konkret ab, was bringen Kunden mit – senkt Hemmschwelle für Anfrage.',
    seo: {
      title: 'Ablauf einer Dellenreparatur – Schritt für Schritt erklärt',
      description:
        'So läuft eine Dellenreparatur ab: Schaden zeigen, Einschätzung, Termin, Reparatur, Kontrolle, Abholung. Was Sie mitbringen sollten – bei Dellen Technik in Lilienthal.',
      ogTitle: 'Ablauf einer Dellenreparatur bei Dellen Technik',
      ogDescription: 'Vom ersten Anruf bis zur Abholung: der Ablauf in sechs Stationen.',
    },
    h1: 'Ablauf einer Dellenreparatur – Schritt für Schritt',
    intro:
      'Wer noch nie eine Dellenreparatur beauftragt hat, weiß oft nicht, was auf ihn zukommt. Hier ist der Ablauf bei uns in der Werkstatt in Lilienthal – von der ersten Kontaktaufnahme bis zur Abholung des Fahrzeugs.',
    tldr: 'Schaden zeigen, Einschätzung erhalten, Termin vereinbaren, Reparatur, Kontrolle, Abholung. Die Ersteinschätzung vor Ort ist kostenlos. Der Eingang befindet sich hinter dem Gebäude.',
    sections: [
      {
        title: 'Die sechs Stationen',
        paras: [],
        sub: [
          { title: '1. Schaden zeigen', paras: ['Rufen Sie kurz an oder kommen Sie direkt zur unverbindlichen Begutachtung vorbei. Die Adresse: Falkenberger Landstraße 77 in Lilienthal – der Eingang befindet sich hinter dem Gebäude.'] },
          { title: '2. Einschätzung erhalten', paras: ['Wir prüfen den Schaden und geben Ihnen eine transparente Einschätzung: Ist eine lackschonende Reparatur möglich? Womit können Sie rechnen? Das ist kostenlos.'] },
          { title: '3. Termin vereinbaren', paras: ['Gemeinsam finden wir einen passenden Termin. Termine vergeben wir kurzfristig nach Vereinbarung.'] },
          { title: '4. Reparatur', paras: ['Die Delle wird Schritt für Schritt zurückgeformt. Bei Bedarf werden Lackauffrischung oder Aufbereitung ergänzt.'] },
          { title: '5. Kontrolle', paras: ['Wir prüfen das Ergebnis im Licht: Die Reflexionen sollten wieder gleichmäßig über die Fläche laufen.'] },
          { title: '6. Abholung', paras: ['Ihr Fahrzeug ist professionell instandgesetzt und wieder in Bestform.'] },
        ],
      },
      {
        title: 'Was Sie mitbringen sollten',
        paras: [],
        list: [
          'Ein möglichst sauberes Fahrzeug – Schmutz verdeckt Dellen.',
          'Bei Versicherungsfällen: Unterlagen bzw. Angaben zur Schadenmeldung.',
          'Fotos oder Datum/Ort des Schadens, falls vorhanden (z. B. bei Hagel).',
          'Fragen und Wünsche – etwa zu Lackauffrischung oder Aufbereitung.',
        ],
      },
      {
        title: 'Öffnungszeiten und Anfahrt',
        paras: ['Montag bis Freitag 08:30 bis 17:30 Uhr, Samstag 10:00 bis 13:00 Uhr, sonntags geschlossen. Termine außerhalb der Zeiten sind auf Anfrage möglich. Bitte fahren Sie hinten herum zum Eingang.'],
      },
    ],
    faq: [
      { q: 'Muss ich vor dem Besuch anrufen?', a: 'Für die Begutachtung dürfen Sie direkt vorbeikommen. Ein kurzer Anruf vorab hilft uns, Zeit für Sie einzuplanen.' },
      { q: 'Ist die Einschätzung wirklich kostenlos?', a: 'Ja. Die Ersteinschätzung vor Ort ist kostenlos und unverbindlich.' },
      { q: 'Wie erfahre ich, ob meine Delle reparabel ist?', a: 'Bei der Begutachtung. Wir prüfen Lack, Tiefe, Form und Lage und sagen Ihnen offen, was möglich ist.' },
    ],
    pillar: 'dellenbeseitigung',
    services: ['dellenbeseitigung', 'smart-repair'],
    regions: ['lilienthal', 'bremen'],
    related: ['wie-lange-dauert-eine-dellenreparatur', 'was-kostet-eine-dellenreparatur', 'delle-im-auto-was-tun'],
    image: 'workshop',
  },

  /* -------------------------------------------------------------------- BEULE */
  {
    slug: 'beule-im-auto-entfernen',
    title: 'Beule im Auto entfernen',
    category: 'Beulen',
    intent: 'Suchanfrage „Beule Auto reparieren/entfernen“: Unterschied zur Delle, wann möglich, Alternativen.',
    seo: {
      title: 'Beule im Auto entfernen – was möglich ist und was nicht',
      description:
        'Beule im Auto entfernen: Unterschied zur Delle, wann Ausbeulen möglich ist, was bei Lackschaden hilft und wie die Einschätzung in Lilienthal abläuft.',
      ogTitle: 'Beule im Auto entfernen – Möglichkeiten und Grenzen',
      ogDescription: 'Wann sich eine Beule sauber ausbeulen lässt und wann eine andere Lösung besser ist.',
    },
    h1: 'Beule im Auto entfernen – was ist möglich?',
    intro:
      'Delle oder Beule – im Alltag meint man dasselbe: eine Stelle, an der das Blech nach innen gedrückt wurde. Sprachlich sagt man Beule, wenn die Verformung größer oder tiefer ist. Ob sie sich sauber entfernen lässt, hängt davon ab, wie tief sie ist, wo sie sitzt und wie der Lack aussieht.',
    tldr: 'Viele Beulen lassen sich sauber ausbeulen, wenn der Lack intakt und die Stelle zugänglich ist. Sehr tiefe Verformungen, scharfe Knicke und Lackschäden setzen Grenzen – dann prüfen wir Alternativen wie Smart-Repair.',
    sections: [
      {
        title: 'Delle oder Beule – gibt es einen Unterschied?',
        paras: ['Fachlich gibt es keine feste Grenze. Wichtiger als das Wort sind drei Fragen: Wie tief ist die Verformung? Ist der Lack intakt? Wie gut kommt man an die Stelle?'],
      },
      {
        title: 'Wann sich eine Beule entfernen lässt',
        paras: [],
        list: [
          'Der Lack ist nicht gerissen oder abgeplatzt.',
          'Die Verformung ist rund und nicht scharf geknickt.',
          'Die Stelle ist zugänglich und liegt nicht an einer schwierigen Kante.',
        ],
        figure: { caseId: 'heckstossstange', text: 'Beispiel aus unserer Werkstatt: Heckstoßstange – Delle entfernt.' },
      },
      {
        title: 'Wenn es nicht (allein) mit Ausbeulen geht',
        paras: [
          'Ist der Lack beschädigt, reicht Ausbeulen allein nicht. Dann prüfen wir, ob eine Kombination mit Smart-Repair sinnvoll ist – die punktgenaue Reparatur ohne aufwendige Komplettlackierung. Bei größeren Unfallschäden mit verformter Struktur ist eine Karosserie- und Lackierwerkstatt der richtige Ansprechpartner.',
        ],
      },
      {
        title: 'So gehen wir vor',
        paras: ['Begutachten, gemeinsam das Vorgehen festlegen, ausbeulen, Finish im Licht prüfen. Die Einschätzung vor Ort ist kostenlos; danach wissen Sie, womit Sie rechnen können.'],
      },
    ],
    faq: [
      { q: 'Wie tief darf eine Beule sein?', a: 'Eine feste Grenze gibt es nicht. Entscheidend ist das Zusammenspiel aus Tiefe, Form, Lage und Lackzustand. Das beurteilen wir am Fahrzeug.' },
      { q: 'Was, wenn die Beule direkt an einer Kante sitzt?', a: 'Das ist anspruchsvoller. Ob und wie es geht, zeigt die Begutachtung.' },
      { q: 'Entfernen Sie Beulen auch für Kunden aus Bremen und dem Umland?', a: 'Ja. Wir betreuen Kunden aus Lilienthal, Bremen, Osterholz-Scharmbeck, Worpswede, Ritterhude, Grasberg und dem Landkreis Osterholz.' },
    ],
    pillar: 'beulenentfernung',
    services: ['beulenentfernung', 'smart-repair', 'dellenbeseitigung'],
    regions: ['grasberg', 'bremen'],
    related: ['welche-dellen-lassen-sich-ohne-lackieren-reparieren', 'was-ist-smart-repair', 'delle-ohne-lackieren-entfernen'],
    image: 'large',
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
