import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import { ExecucaoItemPlanoTrabalhoDto, CriarExecucaoItemPlanoTrabalhoDto, AtualizarExecucaoItemPlanoTrabalhoDto } from '@/models/execucao-item-plano-trabalho.model';


/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number;
  pageSize?: number;

}

/**
 * Busca uma lista paginada de execuções para um item do plano de trabalho específico.
 */
export const getExecucoesByItemPlanoTrabalho = (
  itemId: string,
  params: ListParams

): Promise<PaginatedApiResponse<ExecucaoItemPlanoTrabalhoDto[]>> => {
  return apiClient.getPaginated(`/itens-plano-trabalho/${itemId}/execucoes`, { params });
};

/**
 * Cria uma nova execução para um item do plano de trabalho.
 */
export const createExecucaoItemPlanoTrabalho = (
  itemId: string,
  data: CriarExecucaoItemPlanoTrabalhoDto

): Promise<ApiResponse<ExecucaoItemPlanoTrabalhoDto>> => {
  return apiClient.post(`/itens-plano-trabalho/${itemId}/execucoes`, data, {
    successMessage: 'Execução registrada com sucesso.',

  });
};


export const updateExecucaoItemPlanoTrabalho = (
  execucaoId: string,
  data: AtualizarExecucaoItemPlanoTrabalhoDto

): Promise<ApiResponse<void>> => {
  return apiClient.put(`/execucoes-item-plano-trabalho/${execucaoId}`, data, {
    successMessage: 'Execução atualizada com sucesso.',

  });
};


export const deleteExecucaoItemPlanoTrabalho = (execucaoId: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/execucoes-item-plano-trabalho/${execucaoId}`, {
    successMessage: 'Execução excluída com sucesso.',

  });
};
