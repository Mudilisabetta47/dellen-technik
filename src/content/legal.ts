/**
 * Rechtstexte – wörtlich von der bisherigen Website dellentechnik-lilienthal.de
 * übernommen (Stand der Sicherung: 26.09.2026). Nicht inhaltlich verändern,
 * ohne dass der Betreiber die Änderung freigibt.
 */
export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'lines'; lines: string[] };

export type LegalSection = { title?: string; blocks: LegalBlock[] };

export const IMPRESSUM: LegalSection[] = [
  {
    blocks: [
      {
        type: 'lines',
        lines: [
          'Dellen Technik – Einzelunternehmen',
          'Inhaber: Akin Hoshaber',
          'Adresse: Falkenberger Landstraße 77, 28865 Lilienthal',
          'Telefon: 0174 71 17 321',
          'Steuernummer: 60 232 19415',
          'Hinweis: Eingang hinter dem Gebäude.',
        ],
      },
      { type: 'p', text: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Akin Hoshaber' },
      { type: 'p', text: 'Bei rechtlichen Fragen: mudi@mep-agentur.de' },
    ],
  },
  {
    title: 'Haftungsausschluss',
    blocks: [
      {
        type: 'p',
        text: 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
      },
      {
        type: 'p',
        text: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      },
      {
        type: 'p',
        text: 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
      },
    ],
  },
  {
    title: 'Streitschlichtung',
    blocks: [
      {
        type: 'p',
        text: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr',
      },
      {
        type: 'p',
        text: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      },
    ],
  },
];

export const DATENSCHUTZ: LegalSection[] = [
  {
    blocks: [
      {
        type: 'p',
        text: 'Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG, TDDDG). In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.',
      },
    ],
  },
  {
    title: '1. Verantwortlicher',
    blocks: [
      {
        type: 'lines',
        lines: [
          'Dellen Technik – Einzelunternehmen',
          'Inhaber: Akin Hoshaber',
          'Falkenberger Landstraße 77',
          '28865 Lilienthal',
          'Telefon: 0174 71 17 321',
          'E-Mail: mudi@mep-agentur.de',
        ],
      },
    ],
  },
  {
    title: '2. Zugriffsdaten / Server-Logfiles',
    blocks: [
      {
        type: 'p',
        text: 'Beim Aufruf unserer Website werden durch den Hosting-Provider automatisch Informationen in sogenannten Server-Logfiles erfasst, die Ihr Browser übermittelt. Dies sind insbesondere:',
      },
      {
        type: 'ul',
        items: [
          'IP-Adresse des anfragenden Geräts (gekürzt/anonymisiert, soweit möglich)',
          'Datum und Uhrzeit des Zugriffs',
          'Name und URL der abgerufenen Datei',
          'Übertragene Datenmenge und Meldung über erfolgreichen Abruf',
          'Verwendeter Browser, Betriebssystem und Referrer-URL',
        ],
      },
      {
        type: 'p',
        text: 'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Sicherstellung eines störungsfreien Betriebs und zur Verbesserung unseres Angebots. Die Logdaten werden spätestens nach 30 Tagen gelöscht, sofern keine Sicherheitsvorfälle eine längere Speicherung erfordern.',
      },
    ],
  },
  {
    title: '3. Hosting',
    blocks: [
      {
        type: 'p',
        text: 'Unsere Website wird bei einem Dienstleister gehostet, der die Inhalte auf Servern bereitstellt. Im Rahmen des Hostings werden personenbezogene Daten (z. B. IP-Adressen, Zugriffsdaten) verarbeitet. Mit dem Hosting-Anbieter besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.',
      },
    ],
  },
  {
    title: '4. Cookies und Tracking',
    blocks: [
      {
        type: 'p',
        text: 'Unsere Website verwendet ausschließlich technisch notwendige Cookies bzw. lokale Speichermechanismen, die für den Betrieb der Seite erforderlich sind (z. B. zur Speicherung von Anzeigeeinstellungen). Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG i. V. m. Art. 6 Abs. 1 lit. f DSGVO.',
      },
      {
        type: 'p',
        text: 'Wir setzen keine Tracking-, Analyse- oder Marketing-Cookies (z. B. Google Analytics, Facebook Pixel) ein und betreiben kein Profiling. Es findet keine Weitergabe von Nutzungsdaten an Dritte zu Werbezwecken statt.',
      },
      {
        type: 'p',
        text: 'Sie können das Setzen von Cookies in Ihrem Browser jederzeit deaktivieren oder bereits gesetzte Cookies löschen. Die Funktionsfähigkeit der Website kann dadurch eingeschränkt sein.',
      },
    ],
  },
  {
    title: '5. Kontaktaufnahme (Telefon, WhatsApp, E-Mail, Formular)',
    blocks: [
      {
        type: 'p',
        text: 'Wenn Sie uns per Telefon, WhatsApp, E-Mail oder über ein Kontaktformular auf unserer Website kontaktieren, werden die von Ihnen mitgeteilten Daten (z. B. Name, Telefonnummer, E-Mail-Adresse, Fahrzeug- und Schadensangaben, Nachrichtentext, ggf. übermittelte Fotos) zur Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen gespeichert.',
      },
      { type: 'p', text: 'Verarbeitete Daten: Kontaktdaten, Nachrichteninhalt, ggf. Fotos des Schadens, Zeitpunkt der Anfrage.' },
      { type: 'p', text: 'Zweck: Bearbeitung Ihrer Anfrage, Angebotserstellung, Terminvereinbarung sowie ggf. Vertragsabwicklung.' },
      {
        type: 'p',
        text: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen / Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation).',
      },
      {
        type: 'p',
        text: 'Speicherdauer: Wir speichern Ihre Anfrage solange, wie es zur Bearbeitung erforderlich ist. Kommt es zu einem Vertragsverhältnis, gelten die gesetzlichen Aufbewahrungsfristen (insbesondere 6 bzw. 10 Jahre nach HGB/AO). Anschließend werden die Daten gelöscht, sofern keine weitere Speicherpflicht besteht.',
      },
      {
        type: 'p',
        text: 'Hinweis zu WhatsApp: Bei Kontaktaufnahme über WhatsApp werden Daten an den Anbieter (WhatsApp Ireland Ltd.) übertragen, der diese ggf. auch außerhalb der EU verarbeitet. Bitte berücksichtigen Sie dies bei Ihrer Kontaktauswahl.',
      },
    ],
  },
  {
    title: '6. Weitergabe von Daten',
    blocks: [
      {
        type: 'p',
        text: 'Eine Weitergabe Ihrer personenbezogenen Daten an Dritte findet nicht statt, es sei denn, dies ist zur Vertragsabwicklung erforderlich (z. B. an Werkstattpartner, Steuerberater, Versicherungen) oder wir sind gesetzlich dazu verpflichtet. Auftragsverarbeiter (z. B. Hosting) werden vertraglich gemäß Art. 28 DSGVO verpflichtet.',
      },
    ],
  },
  {
    title: '7. Ihre Rechte',
    blocks: [
      { type: 'p', text: 'Ihnen stehen folgende Rechte zu, soweit die gesetzlichen Voraussetzungen vorliegen:' },
      {
        type: 'ul',
        items: [
          'Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)',
          'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
          'Löschung (Art. 17 DSGVO)',
          'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
          'Datenübertragbarkeit (Art. 20 DSGVO)',
          'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
          'Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
        ],
      },
      { type: 'p', text: 'Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die oben genannten Kontaktdaten.' },
    ],
  },
  {
    title: '8. Beschwerderecht bei einer Aufsichtsbehörde',
    blocks: [
      {
        type: 'p',
        text: 'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt. Zuständig ist für uns die Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen.',
      },
    ],
  },
  {
    title: '9. Datensicherheit',
    blocks: [
      {
        type: 'p',
        text: 'Wir treffen technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen Verlust, Manipulation und unberechtigten Zugriff zu schützen. Unsere Website nutzt eine SSL-/TLS-Verschlüsselung zum Schutz der Übertragung vertraulicher Inhalte.',
      },
    ],
  },
  {
    title: '10. Aktualität und Änderung dieser Datenschutzerklärung',
    blocks: [
      {
        type: 'p',
        text: 'Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen.',
      },
    ],
  },
];
