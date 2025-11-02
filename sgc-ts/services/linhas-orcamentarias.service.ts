import apiClient from "@/lib/api-client"
import type { ApiResponse, PaginatedApiResponse } from "@/lib/types"
import type {
  LinhaOrcamentariaDto,
  CriarLinhaOrcamentariaDto,
  AtualizarLinhaOrcamentariaDto,
} from "@/models/linha-orcamentaria.model"

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number
  pageSize?: number
}

/**
 * Busca uma lista paginada de Linhas Orçamentárias.
 */
export const getLinhasOrcamentarias = (
  params: ListParams
): Promise<PaginatedApiResponse<LinhaOrcamentariaDto[]>> => {
  return apiClient.getPaginated("/categories/linhas-orcamentarias", { params })
}

/**
 * Busca uma Linha Orçamentária pelo seu ID.
 */
export const getLinhaOrcamentariaById = (
  id: string
): Promise<ApiResponse<LinhaOrcamentariaDto>> => {
  return apiClient.get(`/categories/linhas-orcamentarias/${id}`)
}

/**
 * Cria uma nova Linha Orçamentária.
 */
export const createLinhaOrcamentaria = (
  data: CriarLinhaOrcamentariaDto
): Promise<ApiResponse<LinhaOrcamentariaDto>> => {
  return apiClient.post("/categories/linhas-orcamentarias", data, {
    successMessage: "Linha Orçamentária criada com sucesso.",
  })
}

/**
 * Atualiza uma Linha Orçamentária existente.
 */
export const updateLinhaOrcamentaria = (
  id: string,
  data: AtualizarLinhaOrcamentariaDto
): Promise<ApiResponse<LinhaOrcamentariaDto>> => {
  return apiClient.put(`/categories/linhas-orcamentarias/${id}`, data, {
    successMessage: "Linha Orçamentária atualizada com sucesso.",
  })
}

/**
 * Exclui uma Linha Orçamentária pelo seu ID.
 */
export const deleteLinhaOrcamentaria = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/categories/linhas-orcamentarias/${id}`, {
    successMessage: "Linha Orçamentária excluída com sucesso.",
  })
}