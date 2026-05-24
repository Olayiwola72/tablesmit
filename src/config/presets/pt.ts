import type { PresetDefinition } from '../../types/table'

const presets: PresetDefinition[] = [
  {
    id: 'research',
    label: 'Notas de pesquisa',
    rows: 5,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Fonte', 'Descoberta principal', 'Relevância', 'Notas'],
    data: [
      ['Fonte', 'Descoberta principal', 'Relevância', 'Notas'],
      ['Smith 2025', 'Mercado projetado para crescer 12 %', 'Alta', 'Citar na introdução'],
      ['Lee et al.', 'Mudança de preferência do usuário detectada', 'Média', 'Validar com pesquisa'],
      ['Dados internos', 'Retenção cai após 6 meses', 'Alta', 'Ação para a equipe'],
      ['Relatório do setor', 'Três concorrentes emergentes', 'Baixa', 'Acompanhar trimestralmente'],
    ],
  },
  {
    id: 'matrix',
    label: 'Matriz de recursos',
    rows: 6,
    cols: 4,
    headerStyle: 'both',
    headers: [],
    data: [
      ['', 'Atual', 'Meta', 'Lacuna'],
      ['Exportar', 'Apenas PDF', 'PDF + CSV', 'Exportação CSV pendente'],
      ['Formatação', 'Básica', 'Markdown completo', 'Requer parser'],
      ['Colaboração', 'Nenhuma', 'Tempo real', 'Fase 2'],
      ['Mobile', 'Apenas desktop', 'Responsivo', 'Em andamento'],
      ['API', 'Somente leitura', 'Leitura e escrita', 'Design aprovado'],
    ],
  },
  {
    id: 'tracker',
    label: 'Rastreador de conteúdo',
    rows: 6,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Item', 'Formato', 'Prazo', 'Status'],
    data: [
      ['Item', 'Formato', 'Prazo', 'Status'],
      ['Relatório T1', 'PDF', '31 jan', 'Redigindo'],
      ['Estudo de caso', 'Blog', '15 fev', 'Pesquisa'],
      ['White paper', 'PDF', '1 mar', 'Não iniciado'],
      ['Notas de versão', 'Markdown', 'Semanal', 'Em andamento'],
      ['Newsletter', 'Email', 'Mensal', 'Agendado'],
    ],
  },
  {
    id: 'budget',
    label: 'Resumo do orçamento',
    rows: 5,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Categoria', 'Orçamento', 'Gasto', 'Restante'],
    data: [
      ['Categoria', 'Orçamento', 'Gasto', 'Restante'],
      ['Software', '$5.000', '$3.200', '$1.800'],
      ['Prestadores', '$12.000', '$8.500', '$3.500'],
      ['Infraestrutura', '$3.000', '$2.100', '$900'],
      ['Marketing', '$4.000', '$1.500', '$2.500'],
    ],
  },
  {
    id: 'q1',
    label: 'Desempenho T1',
    rows: 5,
    cols: 4,
    headerStyle: 'first-row',
    headers: [],
    data: [
      ['Desempenho T1', '', '', 'Meta'],
      ['Jan', 'Fev', 'Mar', ''],
      ['$10.000', '$12.000', '$15.000', '$50.000'],
      ['1.200', '1.350', '1.500', '4.500'],
      ['85%', '90%', '92%', '90%'],
    ],
    mergedRanges: [{ startRow: 0, startCol: 0, endRow: 0, endCol: 2 }],
  },
]

export default presets
