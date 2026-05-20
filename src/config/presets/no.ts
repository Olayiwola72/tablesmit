import type { PresetDefinition } from '../../types/ui.types'

const presets: PresetDefinition[] = [
  {
    id: 'research',
    label: 'Forskningsnotater',
    rows: 6,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Kilde', 'Nøkkelfunn', 'Relevans', 'Notater'],
    data: [
      ['Kilde', 'Nøkkelfunn', 'Relevans', 'Notater'],
      ['Smith 2025', 'Markedet forventes å vokse 12 %', 'Høy', 'Siter i innledning'],
      ['Lee et al.', 'Brukerpreferanseendring oppdaget', 'Middels', 'Valider med spørreundersøkelse'],
      ['Interne data', 'Kundelojalitet synker etter 6 måneder', 'Høy', 'Tiltak for teamet'],
      ['Bransjerapport', 'Tre nye konkurrenter', 'Lav', 'Overvåk kvartalsvis'],
      ['', '', '', ''],
    ],
  },
  {
    id: 'matrix',
    label: 'Funksjonsmatrise',
    rows: 7,
    cols: 4,
    headerStyle: 'both',
    headers: [],
    data: [
      ['', 'Nåværende', 'Mål', 'Gap'],
      ['Eksport', 'Kun PDF', 'PDF + CSV', 'CSV-eksport venter'],
      ['Formatering', 'Grunnleggende', 'Full Markdown', 'Krever tolk'],
      ['Samarbeid', 'Ingen', 'Sanntid', 'Fase 2'],
      ['Mobil', 'Kun skrivebord', 'Responsiv', 'Pågår'],
      ['API', 'Kun lesing', 'Les + Skriv', 'Design godkjent'],
      ['', '', '', ''],
    ],
  },
  {
    id: 'tracker',
    label: 'Innholdssporing',
    rows: 7,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Element', 'Format', 'Forfallsdato', 'Status'],
    data: [
      ['Element', 'Format', 'Forfallsdato', 'Status'],
      ['Q1-rapport', 'PDF', '31. jan', 'Utkast'],
      ['Kasusstudie', 'Blogg', '15. feb', 'Forskning'],
      ['Whitepaper', 'PDF', '1. mar', 'Ikke påbegynt'],
      ['Versjonsnotater', 'Markdown', 'Ukentlig', 'Pågår'],
      ['Nyhetsbrev', 'E-post', 'Månedlig', 'Planlagt'],
      ['', '', '', ''],
    ],
  },
  {
    id: 'budget',
    label: 'Budsjettsammendrag',
    rows: 6,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Kategori', 'Budsjett', 'Brukt', 'Gjenstående'],
    data: [
      ['Kategori', 'Budsjett', 'Brukt', 'Gjenstående'],
      ['Programvare', '$5,000', '$3,200', '$1,800'],
      ['Konsulenter', '$12,000', '$8,500', '$3,500'],
      ['Infrastruktur', '$3,000', '$2,100', '$900'],
      ['Markedsføring', '$4,000', '$1,500', '$2,500'],
      ['', '', '', ''],
    ],
  },
]

export default presets
