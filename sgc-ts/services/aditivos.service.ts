import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { AditivoDto, CriarAditivoDto, AtualizarAditivoDto } from '@/models/aditivo.model';

// -----------------
// Service Functions
// -----------------

/**
 * Parâmetros para a listagem de aditivos.
 */
export interface ListAditivosParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca uma lista paginada de aditivos.
 */
export const getAditivos = (
  params: ListAditivosParams
): Promise<PaginatedApiResponse<AditivoDto[]>> => {
  return apiClient.getPaginated('/aditivos', { params });
};

/**
 * Busca um único aditivo pelo seu ID.
 */
export const getAditivoById = (id: string): Promise<ApiResponse<AditivoDto>> => {
  return apiClient.get(`/aditivos/${id}`);
};

/**
 * Cria um novo aditivo.
 */
export const createAditivo = (data: CriarAditivoDto): Promise<ApiResponse<AditivoDto>> => {
  return apiClient.post('/aditivos', data, { successMessage: 'Aditivo criado com sucesso.' });
};

/**
 * Atualiza um aditivo existente.
 */
export const updateAditivo = (id: string, data: AtualizarAditivoDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/aditivos/${id}`, data, { successMessage: 'Aditivo atualizado com sucesso.' });
};

/**
 * Exclui um aditivo pelo seu ID.
 */
export const deleteAditivo = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/aditivos/${id}`, { successMessage: 'Aditivo excluído com sucesso.' });
};