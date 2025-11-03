import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getTiposRecursos,
  getAnexosByRecurso,
  createAnexo,
  deleteAnexo,
  downloadAnexo,
  ListAnexosParams,
} from "@/services/anexos.service"
import { CriarAnexoDto } from "@/models/anexo.model"

const ANEXOS_QUERY_KEY = "anexos"

/**
 * Hook para buscar os tipos de recursos disponíveis para anexos.
 */
export const useGetTiposRecursos = () => {
  return useQuery({
    queryKey: [ANEXOS_QUERY_KEY, "tipos-recursos"],
    queryFn: () => getTiposRecursos(),
  })
}

/**
 * Hook para buscar anexos de um recurso específico (ex: uma entrega, uma despesa).
 */
export const useGetAnexosByRecurso = (
  recurso: string,
  recursoId: string | null,
  params: ListAnexosParams
) => {
  return useQuery({
    queryKey: [ANEXOS_QUERY_KEY, recurso, recursoId, params],
    queryFn: () => getAnexosByRecurso(recurso, recursoId!, params),
    enabled: !!recursoId, // A query só executa se o recursoId for fornecido
  })
}

/**
 * Hook para fazer upload de um novo anexo.
 */
export const useCreateAnexo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarAnexoDto) => createAnexo(data),
    onSuccess: (_data, variables) => {
      // Invalida a query de anexos para o recurso específico para recarregar a lista
      queryClient.invalidateQueries({
        queryKey: [ANEXOS_QUERY_KEY, variables.tipoRecurso, variables.recursoId],
      })
    },
  })
}

/**
 * Hook para excluir um anexo.
 */
export const useDeleteAnexo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAnexo(id),
    onSuccess: () => {
      // Invalida todas as queries de anexo, pois não sabemos qual recurso foi afetado
      queryClient.invalidateQueries({ queryKey: [ANEXOS_QUERY_KEY] })
    },
  })
}

/**
 * Função para iniciar o download de um anexo.
 * Não é um hook, pois é uma ação direta.
 */
export const useDownloadAnexo = () => {
  return (id: string) => downloadAnexo(id)
}
