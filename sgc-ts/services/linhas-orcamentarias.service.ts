export interface AtualizarLinhaOrcamentariaDto {
  /** @minLength 1 */
  nomeItem: string;
  descricao?: string | null;
  /**
   * @format double
   * @min 0
   */
  quantidade: number;
  /**
   * @format double
   * @min 0
   */
  valorUnitario: number;
  unidadeMedida?: string | null;
  /** @format uuid */
  categoriaId: string;
  /** @format uuid */
  centroCustoId: string;
}export interface CriarLinhaOrcamentariaDto {
  /** @format uuid */
  orcamentoId: string;
  /** @minLength 1 */
  nomeItem: string;
  descricao?: string | null;
  /**
   * @format double
   * @min 0
   */
  quantidade: number;
  /**
   * @format double
   * @min 0
   */
  valorUnitario: number;
  unidadeMedida?: string | null;
  /** @format uuid */
  categoriaId: string;
  /** @format uuid */
  centroCustoId: string;
}export interface LinhaOrcamentariaDto {
  /** @format uuid */
  id?: string;
  nomeItem?: string | null;
  descricao?: string | null;
  /** @format double */
  quantidade?: number;
  /** @format double */
  valorUnitario?: number;
  unidadeMedida?: string | null;
  /** @format double */
  valorTotal?: number;
  /** @format uuid */
  categoriaId?: string;
  nomeCategoria?: string | null;
  /** @format uuid */
  centroCustoId?: string;
  nomeCentroCusto?: string | null;
}

export interface LinhaOrcamentariaDtoApiResponse {
  success?: boolean;
  data?: LinhaOrcamentariaDto;
  messages?: string[] | null;
}

    /**
     * No description
     *
     * @tags LinhasOrcamentarias
     * @name OrcamentosLinhasCreate
     * @request POST:/api/orcamentos/{orcamentoId}/linhas
     */
    orcamentosLinhasCreate: (
      orcamentoId: string,
      data: CriarLinhaOrcamentariaDto,
      params: RequestParams = {},
    ) =>
      this.request<LinhaOrcamentariaDtoApiResponse, ObjectApiResponse>({
        path: `/api/orcamentos/${orcamentoId}/linhas`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LinhasOrcamentarias
     * @name LinhasOrcamentariasUpdate
     * @request PUT:/api/linhas-orcamentarias/{linhaId}
     */
    linhasOrcamentariasUpdate: (
      linhaId: string,
      data: AtualizarLinhaOrcamentariaDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/linhas-orcamentarias/${linhaId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags LinhasOrcamentarias
     * @name LinhasOrcamentariasDelete
     * @request DELETE:/api/linhas-orcamentarias/{linhaId}
     */
    linhasOrcamentariasDelete: (linhaId: string, params: RequestParams = {}) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/linhas-orcamentarias/${linhaId}`,
        method: "DELETE",
        ...params,
      }),