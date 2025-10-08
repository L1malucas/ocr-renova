

export interface AnexoDto {
  /** @format uuid */
  id?: string;
  nomeArquivo?: string | null;
  caminhoArquivo?: string | null;
  descricao?: string | null;
  tipoMime?: string | null;
  /** @format int64 */
  tamanhoBytes?: number;
}

export interface AnexoDtoApiResponse {
  success?: boolean;
  data?: AnexoDto;
  messages?: string[] | null;
}

export interface AnexoDtoPagedApiResponse {
  success?: boolean;
  data?: AnexoDto[] | null;
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
     * @tags Anexos
     * @name AnexosList
     * @request GET:/api/{recurso}/{recursoId}/anexos
     */
    anexosList: (
      recurso: string,
      recursoId: string,
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
      this.request<AnexoDtoPagedApiResponse, ProblemDetails>({
        path: `/api/${recurso}/${recursoId}/anexos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Anexos
     * @name AnexosCreate
     * @request POST:/api/anexos
     */
    anexosCreate: (
      data: {
        /** @format binary */
        arquivo?: File;
      },
      query?: {
        tipoProprietario?: string;
        /** @format uuid */
        proprietarioId?: string;
        descricao?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AnexoDtoApiResponse, ObjectApiResponse>({
        path: `/api/anexos`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Anexos
     * @name AnexosDownloadList
     * @request GET:/api/anexos/{id}/download
     */
    anexosDownloadList: (id: string, params: RequestParams = {}) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/anexos/${id}/download`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Anexos
     * @name AnexosDelete
     * @request DELETE:/api/anexos/{id}
     */
    anexosDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/anexos/${id}`,
        method: "DELETE",
        ...params,
      }),