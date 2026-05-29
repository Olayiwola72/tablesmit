import type { PresetDefinition } from './presets.types'

const presets: PresetDefinition[] = [
  {
    id: 'research',
    label: 'Forskningsnotater',
    rows: 5,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Kilde', 'Nøkkelfunn', 'Relevans', 'Notater'],
    data: [
      ['Kilde', 'Nøkkelfunn', 'Relevans', 'Notater'],
      ['Smith 2025', 'Markedet forventes å vokse 12 %', 'Høy', 'Siter i innledning'],
      ['Lee et al.', 'Brukerpreferanseendring oppdaget', 'Middels', 'Valider med spørreundersøkelse'],
      ['Interne data', 'Kundelojalitet synker etter 6 måneder', 'Høy', 'Tiltak for teamet'],
      ['Bransjerapport', 'Tre nye konkurrenter', 'Lav', 'Overvåk kvartalsvis'],
    ],
  },
  {
    id: 'matrix',
    label: 'Funksjonsmatrise',
    rows: 6,
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
    ],
  },
  {
    id: 'tracker',
    label: 'Innholdssporing',
    rows: 6,
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
    ],
  },
  {
    id: 'budget',
    label: 'Budsjettsammendrag',
    rows: 5,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Kategori', 'Budsjett', 'Brukt', 'Gjenstående'],
    data: [
      ['Kategori', 'Budsjett', 'Brukt', 'Gjenstående'],
      ['Programvare', '$5,000', '$3,200', '$1,800'],
      ['Konsulenter', '$12,000', '$8,500', '$3,500'],
      ['Infrastruktur', '$3,000', '$2,100', '$900'],
      ['Markedsføring', '$4,000', '$1,500', '$2,500'],
    ],
  },
  {
    id: 'q1',
    label: 'Q1-resultater',
    rows: 5,
    cols: 4,
    headerStyle: 'first-row',
    headers: [],
    data: [
      ['Q1-resultater', '', '', 'Mål'],
      ['Jan', 'Feb', 'Mar', ''],
      ['$10,000', '$12,000', '$15,000', '$50,000'],
      ['1,200', '1,350', '1,500', '4,500'],
      ['85%', '90%', '92%', '90%'],
    ],
    mergedRanges: [{ startRow: 0, startCol: 0, endRow: 0, endCol: 2 }],
  },
]

export default presets
