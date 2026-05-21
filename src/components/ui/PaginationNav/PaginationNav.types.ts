export interface PaginationNavProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
