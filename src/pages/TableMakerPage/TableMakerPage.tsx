import { type ReactNode } from 'react'
import { TableProvider } from '../../context/TableContext'
import { TableMakerContent } from '../../components/features/TableMakerContent/TableMakerContent'

export function TableMakerPage(): ReactNode {
  return (
    <TableProvider>
      <TableMakerContent />
    </TableProvider>
  )
}

export default TableMakerPage
