import type { PresetDefinition } from '../../types/ui.types'

const presets: PresetDefinition[] = [
  {
    id: 'research',
    label: 'Notas de investigación',
    rows: 6,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Fuente', 'Hallazgo clave', 'Relevancia', 'Notas'],
    data: [
      ['Fuente', 'Hallazgo clave', 'Relevancia', 'Notas'],
      ['Smith 2025', 'Se proyecta que el mercado crezca un 12 %', 'Alta', 'Citar en la intro'],
      ['Lee et al.', 'Cambio en la preferencia del usuario detectado', 'Media', 'Validar con encuesta'],
      ['Datos internos', 'La retención cae después de 6 meses', 'Alta', 'Acción para el equipo'],
      ['Informe del sector', 'Tres competidores emergentes', 'Baja', 'Seguimiento trimestral'],
      ['', '', '', ''],
    ],
  },
  {
    id: 'matrix',
    label: 'Matriz de funciones',
    rows: 7,
    cols: 4,
    headerStyle: 'both',
    headers: [],
    data: [
      ['', 'Actual', 'Objetivo', 'Brecha'],
      ['Exportar', 'Solo PDF', 'PDF + CSV', 'Exportación CSV pendiente'],
      ['Formateo', 'Básico', 'Markdown completo', 'Requiere analizador'],
      ['Colaboración', 'Ninguna', 'Tiempo real', 'Fase 2'],
      ['Móvil', 'Solo escritorio', 'Responsivo', 'En progreso'],
      ['API', 'Solo lectura', 'Lectura y escritura', 'Diseño aprobado'],
      ['', '', '', ''],
    ],
  },
  {
    id: 'tracker',
    label: 'Seguimiento de contenido',
    rows: 7,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Elemento', 'Formato', 'Vencimiento', 'Estado'],
    data: [
      ['Elemento', 'Formato', 'Vencimiento', 'Estado'],
      ['Informe T1', 'PDF', '31 ene', 'Redactando'],
      ['Caso de estudio', 'Blog', '15 feb', 'Investigación'],
      ['Documento técnico', 'PDF', '1 mar', 'No iniciado'],
      ['Notas de versión', 'Markdown', 'Semanal', 'En curso'],
      ['Boletín', 'Email', 'Mensual', 'Programado'],
      ['', '', '', ''],
    ],
  },
  {
    id: 'budget',
    label: 'Resumen de presupuesto',
    rows: 6,
    cols: 4,
    headerStyle: 'first-row',
    headers: ['Categoría', 'Presupuesto', 'Gastado', 'Restante'],
    data: [
      ['Categoría', 'Presupuesto', 'Gastado', 'Restante'],
      ['Software', '$5,000', '$3,200', '$1,800'],
      ['Contratistas', '$12,000', '$8,500', '$3,500'],
      ['Infraestructura', '$3,000', '$2,100', '$900'],
      ['Marketing', '$4,000', '$1,500', '$2,500'],
      ['', '', '', ''],
    ],
  },
]

export default presets
