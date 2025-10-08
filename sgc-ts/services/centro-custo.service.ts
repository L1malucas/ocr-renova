export interface AtualizarCentroCustoDto {
  /** @minLength 1 */
  codigo: string;
  /** @minLength 1 */
  nome: string;
  descricao?: string | null;
  /** @format uuid */
  paiId?: string | null;
  /** @format uuid */
  categoriaId: string;
}

export interface CentroCustoDto {
  /** @format uuid */
  id?: string;
  codigo?: string | null;
  nome?: string | null;
  descricao?: string | null;
  /** @format uuid */
  paiId?: string | null;
  filhos?: CentroCustoDto[] | null;
  /** @format uuid */
  categoriaId?: string;
  nomeCategoria?: string | null;
}

export interface CentroCustoDtoApiResponse {
  success?: boolean;
  data?: CentroCustoDto;
  messages?: string[] | null;
}export interface CriarCentroCustoDto {
  /** @minLength 1 */
  codigo: string;
  /** @minLength 1 */
  nome: string;
  descricao?: string | null;
  /** @format uuid */
  paiId?: string | null;
  /** @format uuid */
  categoriaId: string;
}

export interface CentroCustoDtoPagedApiResponse {
  success?: boolean;
  data?: CentroCustoDto[] | null;
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
     * @tags CentrosCusto
     * @name CentrosCustoList
     * @request GET:/api/centros-custo
     */
    centrosCustoList: (
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
      this.request<CentroCustoDtoPagedApiResponse, ProblemDetails>({
        path: `/api/centros-custo`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CentrosCusto
     * @name CentrosCustoCreate
     * @request POST:/api/centros-custo
     */
    centrosCustoCreate: (
      data: CriarCentroCustoDto,
      params: RequestParams = {},
    ) =>
      this.request<CentroCustoDtoApiResponse, ObjectApiResponse>({
        path: `/api/centros-custo`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CentrosCusto
     * @name CentrosCustoUpdate
     * @request PUT:/api/centros-custo/{id}
     */
    centrosCustoUpdate: (
      id: string,
      data: AtualizarCentroCustoDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/centros-custo/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),