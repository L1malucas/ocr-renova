import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { ContratoDto, CriarContratoDto, AtualizarContratoDto } from '@/models/contrato.model';

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca uma lista paginada de Contratos.
 */
export const getContratos = (params: ListParams): Promise<PaginatedApiResponse<ContratoDto[]>> => {
  return apiClient.getPaginated('/contratos', { params });
};

/**
 * Cria um novo Contrato.
 */
export const createContrato = (data: CriarContratoDto): Promise<ApiResponse<ContratoDto>> => {
  return apiClient.post('/contratos', data, { successMessage: 'Contrato criado com sucesso.' });
};

/**
 * Busca um Contrato pelo seu ID.
 */
export const getContratoById = (id: string): Promise<ApiResponse<ContratoDto>> => {
  return apiClient.get(`/contratos/${id}`);
};

/**
 * Atualiza um Contrato existente.
 */
export const updateContrato = (id: string, data: AtualizarContratoDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/contratos/${id}`, data, { successMessage: 'Contrato atualizado com sucesso.' });
};

/**
 * Exclui um Contrato pelo seu ID.
 */
export const deleteContrato = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/contratos/${id}`, { successMessage: 'Contrato excluído com sucesso.' });
};