import apiClient from '@/lib/api-client';
import type { ApiResponse } from '@/lib/types';
import type { PlanoTrabalhoDto, CriarPlanoTrabalhoDto, AtualizarPlanoTrabalhoDto } from '@/models/plano-trabalho.model';

// -----------------
// Service Functions
// -----------------

/**
 * Busca o Plano de Trabalho associado a um contrato específico.
 */
export const getPlanoTrabalhoByContratoId = (contratoId: string): Promise<ApiResponse<PlanoTrabalhoDto>> => {
  return apiClient.get(`/contratos/${contratoId}/plano-trabalho`);
};

/**
 * Busca um Plano de Trabalho pelo seu ID.
 */
export const getPlanoTrabalhoById = (id: string): Promise<ApiResponse<PlanoTrabalhoDto>> => {
  return apiClient.get(`/planos-trabalho/${id}`);
};

/**
 * Cria um novo Plano de Trabalho.
 */
export const createPlanoTrabalho = (data: CriarPlanoTrabalhoDto): Promise<ApiResponse<PlanoTrabalhoDto>> => {
  return apiClient.post('/planos-trabalho', data, { successMessage: 'Plano de Trabalho criado com sucesso.' });
};

/**
 * Atualiza um Plano de Trabalho existente.
 */
export const updatePlanoTrabalho = (id: string, data: AtualizarPlanoTrabalhoDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/planos-trabalho/${id}`, data, { successMessage: 'Plano de Trabalho atualizado com sucesso.' });
};

/**
 * Exclui um Plano de Trabalho pelo seu ID.
 */
export const deletePlanoTrabalho = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/planos-trabalho/${id}`, { successMessage: 'Plano de Trabalho excluído com sucesso.' });
};