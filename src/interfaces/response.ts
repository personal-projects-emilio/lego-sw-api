type PrevOrNext = { page: number, limit: number }

interface Pagination {
  total: Number;
  count: Number;
  prev?: PrevOrNext
  next?: PrevOrNext
}