type PrevOrNext = { page: number; limit: number };

interface Pagination {
  total: number;
  count: number;
  prev?: PrevOrNext;
  next?: PrevOrNext;
}
