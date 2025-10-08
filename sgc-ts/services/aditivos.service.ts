    /**
     * No description
     *
     * @tags Aditivos
     * @name ContratosAditivosList
     * @request GET:/api/contratos/{contratoId}/aditivos
     */export interface CriarAditivoDto {
  /**
   * @minLength 0
   * @maxLength 50
   */
  numeroTermo: string;
  /** @minLength 1 */
  objeto: string;
  tipo: AditivoType;
  /** @format double */
  valorAlteracao?: number;
  /** @format date-time */
  dataAssinatura?: string;
  /** @format date-time */
  novoFimVigencia?: string | null;
  /** @format uuid */
  contratoId: string;
}
export interface UpdateAmendmentDto {
  /** @minLength 1 */
  subject: string;
  /** @format date-time */
  newEndTerm?: string | null;
}

    contratosAditivosList: (
      contratoId: string,
      query?: {
        /** @format uuid */
        contractId?: string;
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
      this.request<AditivoDtoPagedApiResponse, ProblemDetails>({
        path: `/api/contratos/${contratoId}/aditivos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Aditivos
     * @name AditivosDetail
     * @request GET:/api/aditivos/{id}
     */
    aditivosDetail: (id: string, params: RequestParams = {}) =>
      this.request<AditivoDtoApiResponse, ObjectApiResponse>({
        path: `/api/aditivos/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Aditivos
     * @name AditivosUpdate
     * @request PUT:/api/aditivos/{id}
     */
    aditivosUpdate: (
      id: string,
      data: UpdateAmendmentDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/aditivos/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Aditivos
     * @name AditivosCreate
     * @request POST:/api/aditivos
     */
    aditivosCreate: (data: CriarAditivoDto, params: RequestParams = {}) =>
      this.request<AditivoDtoApiResponse, ObjectApiResponse>({
        path: `/api/aditivos`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

      /** @format int32 */
export enum AditivoType {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

export interface AditivoDto {
  /** @format uuid */
  id?: string;
  numeroTermo?: string | null;
  objeto?: string | null;
  tipo?: string | null;
  /** @format double */
  valorAlteracao?: number;
  /** @format date-time */
  dataAssinatura?: string;
  /** @format date-time */
  novoFimVigencia?: string | null;
  status?: string | null;
  /** @format uuid */
  contratoId?: string;
}

export interface AditivoDtoApiResponse {
  success?: boolean;
  data?: AditivoDto;
  messages?: string[] | null;
}

export interface AditivoDtoPagedApiResponse {
  success?: boolean;
  data?: AditivoDto[] | null;
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