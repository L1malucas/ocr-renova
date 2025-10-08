
export interface PlanoTrabalhoDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  contratoId?: string;
  itens?: ItemPlanoTrabalhoDto[] | null;
}

export interface PlanoTrabalhoDtoApiResponse {
  success?: boolean;
  data?: PlanoTrabalhoDto;
  messages?: string[] | null;
}

    /**
     * No description
     *
     * @tags PlanosTrabalho
     * @name ContratosPlanoTrabalhoList
     * @request GET:/api/contratos/{contratoId}/plano-trabalho
     */export interface CriarPlanoTrabalhoDto {
  /** @format uuid */
  contratoId: string;
}
    contratosPlanoTrabalhoList: (
      contratoId: string,
      params: RequestParams = {},
    ) =>
      this.request<PlanoTrabalhoDtoApiResponse, ObjectApiResponse>({
        path: `/api/contratos/${contratoId}/plano-trabalho`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PlanosTrabalho
     * @name PlanosTrabalhoCreate
     * @request POST:/api/planos-trabalho
     */
    planosTrabalhoCreate: (
      data: CriarPlanoTrabalhoDto,
      params: RequestParams = {},
    ) =>
      this.request<PlanoTrabalhoDtoApiResponse, ObjectApiResponse>({
        path: `/api/planos-trabalho`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),