import apiClient from "@/lib/api-client"
import type { ApiResponse, PaginatedApiResponse } from "@/lib/types"
import type {
  OrganizacaoSocialDto,
  CriarOrganizacaoSocialDto,
  AtualizarOrganizacaoSocialDto,
} from "@/models/organizacao-social.model"

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number
  pageSize?: number
}

/**
 * Busca uma lista paginada de Organizações Sociais.
 */
export const getOrganizacoesSociais = (
  params: ListParams
): Promise<PaginatedApiResponse<OrganizacaoSocialDto[]>> => {
  return apiClient.getPaginated("/organizacoes-sociais", { params })
}

/**
 * Busca uma Organização Social pelo seu ID.
 */
export const getOrganizacaoSocialById = (
  id: string
): Promise<ApiResponse<OrganizacaoSocialDto>> => {
  return apiClient.get(`/organizacoes-sociais/${id}`)
}

/**
 * Cria uma nova Organização Social.
 */
export const createOrganizacaoSocial = (
  data: CriarOrganizacaoSocialDto
): Promise<ApiResponse<OrganizacaoSocialDto>> => {
  return apiClient.post("/organizacoes-sociais", data, {
    successMessage: "Organização Social criada com sucesso.",
  })
}

/**
 * Atualiza uma Organização Social existente.
 */
export const updateOrganizacaoSocial = (
  id: string,
  data: AtualizarOrganizacaoSocialDto
): Promise<ApiResponse<OrganizacaoSocialDto>> => {
  return apiClient.put(`/organizacoes-sociais/${id}`, data, {
    successMessage: "Organização Social atualizada com sucesso.",
  })
}

/**
 * Exclui uma Organização Social pelo seu ID.
 */
export const deleteOrganizacaoSocial = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/organizacoes-sociais/${id}`, {
    successMessage: "Organização Social excluída com sucesso.",
  })
}
