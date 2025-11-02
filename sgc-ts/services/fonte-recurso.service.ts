import apiClient from "@/lib/api-client"
import type { ApiResponse, PaginatedApiResponse } from "@/lib/types"
import type {
  FonteRecursoDto,
  CriarFonteRecursoDto,
  AtualizarFonteRecursoDto,
} from "@/models/fonte-recurso.model"

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number
  pageSize?: number
}

/**
 * Busca uma lista paginada de Fontes de Recurso.
 */
export const getFontesRecurso = (
  params: ListParams
): Promise<PaginatedApiResponse<FonteRecursoDto[]>> => {
  return apiClient.getPaginated("/fonte-recurso", { params })
}

/**
 * Busca uma Fonte de Recurso pelo seu ID.
 */
export const getFonteRecursoById = (
  id: string
): Promise<ApiResponse<FonteRecursoDto>> => {
  return apiClient.get(`/fonte-recurso/${id}`)
}

/**
 * Cria uma nova Fonte de Recurso.
 */
export const createFonteRecurso = (
  data: CriarFonteRecursoDto
): Promise<ApiResponse<FonteRecursoDto>> => {
  return apiClient.post("/fonte-recurso", data, {
    successMessage: "Fonte de Recurso criada com sucesso.",
  })
}

/**
 * Atualiza uma Fonte de Recurso existente.
 */
export const updateFonteRecurso = (
  id: string,
  data: AtualizarFonteRecursoDto
): Promise<ApiResponse<FonteRecursoDto>> => {
  return apiClient.put(`/fonte-recurso/${id}`, data, {
    successMessage: "Fonte de Recurso atualizada com sucesso.",
  })
}

/**
 * Exclui uma Fonte de Recurso pelo seu ID.
 */
export const deleteFonteRecurso = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/fonte-recurso/${id}`, {
    successMessage: "Fonte de Recurso excluída com sucesso.",
  })
}
