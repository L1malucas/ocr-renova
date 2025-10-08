
export interface AtualizarFonteRecursoDto {
  /** @minLength 1 */
  nome: string;
  descricao?: string | null;
}export interface CriarFonteRecursoDto {
  /** @minLength 1 */
  nome: string;
  descricao?: string | null;
}export interface FonteRecursoDto {
  /** @format uuid */
  id?: string;
  nome?: string | null;
  descricao?: string | null;
}

export interface FonteRecursoDtoApiResponse {
  success?: boolean;
  data?: FonteRecursoDto;
  messages?: string[] | null;
}

export interface FonteRecursoDtoListPagedApiResponse {
  success?: boolean;
  data?: FonteRecursoDto[][] | null;
  messages?: string[] | null;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  totalItems?: number;
}
    /**
     * No description
     *
     * @tags Repasses
     * @name FonteRecursoList
     * @request GET:/api/fonte-recurso
     */
    fonteRecursoList: (
      query?: {
        /**
         * @format int32
         * @default 1
         */
        pageNumber?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FonteRecursoDtoListPagedApiResponse, any>({
        path: `/api/fonte-recurso`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Repasses
     * @name FonteRecursoCreate
     * @request POST:/api/fonte-recurso
     */
    fonteRecursoCreate: (
      data: CriarFonteRecursoDto,
      params: RequestParams = {},
    ) =>
      this.request<FonteRecursoDtoApiResponse, ObjectApiResponse>({
        path: `/api/fonte-recurso`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Repasses
     * @name FonteRecursoUpdate
     * @request PUT:/api/fonte-recurso/{id}
     */
    fonteRecursoUpdate: (
      id: string,
      data: AtualizarFonteRecursoDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/fonte-recurso/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),