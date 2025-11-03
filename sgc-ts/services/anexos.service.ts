import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { AnexoDto, CriarAnexoDto } from '@/models/anexo.model';

// -----------------
// Service Functions
// -----------------

/**
 * Parâmetros para a listagem de anexos de um recurso.
 */
export interface ListAnexosParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca a lista de tipos de recursos disponíveis para anexos.
 */
export const getTiposRecursos = (): Promise<ApiResponse<string[]>> => {
  return apiClient.get('/anexos/tipos-recursos');
};

/**
 * Busca uma lista paginada de anexos para um recurso específico (ex: contrato, despesa).
 */
export const getAnexosByRecurso = (
  recurso: string,
  recursoId: string,
  params: ListAnexosParams
): Promise<PaginatedApiResponse<AnexoDto[]>> => {
  return apiClient.getPaginated(`/${recurso}/${recursoId}/anexos`, { params });
};

/**
 * Realiza o upload de um novo anexo.
 * Os parâmetros são enviados como query params conforme a API.
 */
export const createAnexo = ({ arquivo, tipoRecurso, recursoId, descricao }: CriarAnexoDto): Promise<ApiResponse<AnexoDto>> => {
  // Monta a URL com query params
  const params = new URLSearchParams({
    tipoRecurso,
    recursoId,
  });

  if (descricao) {
    params.append('descricao', descricao);
  }

  return apiClient.post(`/anexos?${params.toString()}`, null, {
    attachments: [arquivo],
    successMessage: 'Anexo enviado com sucesso.',
  });
};

/**
 * Inicia o download de um anexo.
 * Abre a URL de download em uma nova janela para o navegador gerenciar.
 */
export const downloadAnexo = (id: string): void => {
  // Acessa a URL base do apiClient para construir a URL completa.
  const baseUrl = apiClient.baseURL;
  const url = `${baseUrl}/anexos/${id}/download`;
  window.open(url, '_blank');
};

/**
 * Exclui um anexo pelo seu ID.
 */
export const deleteAnexo = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/anexos/${id}`, { successMessage: 'Anexo excluído com sucesso.' });
};