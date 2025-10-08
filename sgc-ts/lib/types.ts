/**
 * Represents the standard non-paginated API response structure.
 * @template T The type of the data payload.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  messages: string[];
}

/**
 * Represents the standard paginated API response structure.
 * @template T The type of the items in the data array.
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}