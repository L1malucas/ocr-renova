import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { AditivoDto, CriarAditivoDto, UpdateAmendmentDto } from '@/models/aditivo.model';

// -----------------
// Service Functions
// -----------------

/**
 * Parâmetros para a listagem de aditivos de um contrato.
 */
export interface ListAditivosParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca uma lista paginada de aditivos para um contrato específico.
 */
export const getAditivosByContrato = (
  contratoId: string,
  params: ListAditivosParams
): Promise<PaginatedApiResponse<AditivoDto[]>> => {
  return apiClient.getPaginated(`/contratos/${contratoId}/aditivos`, { params });
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
export const updateAditivo = (id: string, data: UpdateAmendmentDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/aditivos/${id}`, data, { successMessage: 'Aditivo atualizado com sucesso.' });
};

/**
 * Exclui um aditivo pelo seu ID.
 */
export const deleteAditivo = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/aditivos/${id}`, { successMessage: 'Aditivo excluído com sucesso.' });
};