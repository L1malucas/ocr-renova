import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { CentroCustoDto, CriarCentroCustoDto, AtualizarCentroCustoDto } from '@/models/centro-custo.model';

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca uma lista paginada de Centros de Custo.
 */
export const getCentrosCusto = (params: ListParams): Promise<PaginatedApiResponse<CentroCustoDto[]>> => {
  return apiClient.getPaginated('/centros-custo', { params });
};

/**
 * Cria um novo Centro de Custo.
 */
export const createCentroCusto = (data: CriarCentroCustoDto): Promise<ApiResponse<CentroCustoDto>> => {
  return apiClient.post('/centros-custo', data, { successMessage: 'Centro de Custo criado com sucesso.' });
};

/**
 * Atualiza um Centro de Custo existente.
 */
export const updateCentroCusto = (id: string, data: AtualizarCentroCustoDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/centros-custo/${id}`, data, { successMessage: 'Centro de Custo atualizado com sucesso.' });
};