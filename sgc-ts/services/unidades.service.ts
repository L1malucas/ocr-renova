import apiClient from "@/lib/api-client"
import type { ApiResponse, PaginatedApiResponse } from "@/lib/types"
import type {
  UnidadeDto,
  CriarUnidadeDto,
  AtualizarUnidadeDto,
} from "@/models/unidade.model"

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number
  pageSize?: number
}

/**
 * Busca uma lista paginada de Unidades.
 */
export const getUnidades = (
  params: ListParams
): Promise<PaginatedApiResponse<UnidadeDto[]>> => {
  return apiClient.getPaginated("/unidades", { params })
}

/**
 * Busca uma Unidade pelo seu ID.
 */
export const getUnidadeById = (id: string): Promise<ApiResponse<UnidadeDto>> => {
  return apiClient.get(`/unidades/${id}`)
}

/**
 * Cria uma nova Unidade.
 */
export const createUnidade = (
  data: CriarUnidadeDto
): Promise<ApiResponse<UnidadeDto>> => {
  return apiClient.post("/unidades", data, {
    successMessage: "Unidade criada com sucesso.",
  })
}

/**
 * Atualiza uma Unidade existente.
 */
export const updateUnidade = (
  id: string,
  data: AtualizarUnidadeDto
): Promise<ApiResponse<UnidadeDto>> => {
  return apiClient.put(`/unidades/${id}`, data, {
    successMessage: "Unidade atualizada com sucesso.",
  })
}

/**
 * Exclui uma Unidade pelo seu ID.
 */
export const deleteUnidade = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/unidades/${id}`, {
    successMessage: "Unidade excluída com sucesso.",
  })
}
