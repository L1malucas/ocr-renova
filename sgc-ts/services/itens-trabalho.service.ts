    /**
     * No description
     *
     * @tags ItensPlanoTrabalho
     * @name PlanosTrabalhoItensCreate
     * @request POST:/api/planos-trabalho/{planoTrabalhoId}/itens
     */export interface CriarItemPlanoTrabalhoDto {
  /** @format uuid */
  planoTrabalhoId: string;
  /** @format uuid */
  itemPaiId?: string | null;
  /** @minLength 1 */
  objetivo: string;
  /** @minLength 1 */
  acao: string;
  descricao?: string | null;
  /** @format double */
  valorMeta?: number | null;
  tipoMetrica: TipoMetrica;
  unidadeMedida?: string | null;
  frequencia?: Frequencia;
  obrigatorio?: boolean;
  /** @format date-time */
  dataInicio: string;
  /** @format date-time */
  dataFim: string;
  /** @format uuid */
  categoriaId: string;
}

export interface ItemPlanoTrabalhoDto {
  /** @format uuid */
  id?: string;
  objetivo?: string | null;
  acao?: string | null;
  descricao?: string | null;
  status?: string | null;
  /** @format double */
  valorMeta?: number | null;
  tipoMetrica?: string | null;
  unidadeMedida?: string | null;
  frequencia?: string | null;
  obrigatorio?: boolean;
  /** @format date-time */
  dataInicio?: string;
  /** @format date-time */
  dataFim?: string;
  /** @format uuid */
  itemPaiId?: string | null;
  subItens?: ItemPlanoTrabalhoDto[] | null;
  /** @format uuid */
  categoriaId?: string;
  nomeCategoria?: string | null;
}

export interface ItemPlanoTrabalhoDtoApiResponse {
  success?: boolean;
  data?: ItemPlanoTrabalhoDto;
  messages?: string[] | null;
}

    planosTrabalhoItensCreate: (
      planoTrabalhoId: string,
      data: CriarItemPlanoTrabalhoDto,
      params: RequestParams = {},
    ) =>
      this.request<ItemPlanoTrabalhoDtoApiResponse, ObjectApiResponse>({
        path: `/api/planos-trabalho/${planoTrabalhoId}/itens`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ItensPlanoTrabalho
     * @name ItensPlanoTrabalhoUpdate
     * @request PUT:/api/itens-plano-trabalho/{itemId}
     */
    itensPlanoTrabalhoUpdate: (
      itemId: string,
      data: AtualizarItemPlanoTrabalhoDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/itens-plano-trabalho/${itemId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ItensPlanoTrabalho
     * @name ItensPlanoTrabalhoDelete
     * @request DELETE:/api/itens-plano-trabalho/{itemId}
     */
    itensPlanoTrabalhoDelete: (itemId: string, params: RequestParams = {}) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/itens-plano-trabalho/${itemId}`,
        method: "DELETE",
        ...params,
      }),


export interface AtualizarItemPlanoTrabalhoDto {
  /** @minLength 1 */
  objetivo: string;
  /** @minLength 1 */
  acao: string;
  descricao?: string | null;
  /** @format double */
  valorMeta?: number | null;
  tipoMetrica: TipoMetrica;
  unidadeMedida?: string | null;
  frequencia?: Frequencia;
  obrigatorio?: boolean;
  /** @format date-time */
  dataInicio: string;
  /** @format date-time */
  dataFim: string;
  /** @format uuid */
  categoriaId: string;
}