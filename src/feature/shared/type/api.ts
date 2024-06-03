export interface ErrorResponse {
  statusCode: number;
  name: string;
  message: string;
}

export interface PaginationResponse {
  total: number;
  count: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  nextPage: number | null;
  previousPage: number | null;
  limit: number;
}

export interface PaginationCommonInput {
  page?: number;
  limit?: number;
}
