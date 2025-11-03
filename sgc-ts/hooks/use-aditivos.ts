import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getAditivos,
  getAditivoById,
  createAditivo,
  updateAditivo,
  deleteAditivo,
  ListAditivosParams,
} from "@/services/aditivos.service"
import { CriarAditivoDto, AtualizarAditivoDto } from "@/models/aditivo.model"

const ADITIVOS_QUERY_KEY = "aditivos"

/**
 * Hook para buscar lista paginada de aditivos.
 */
export const useGetAditivos = (params: ListAditivosParams) => {
  return useQuery({
    queryKey: [ADITIVOS_QUERY_KEY, params],
    queryFn: () => getAditivos(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar um aditivo por ID.
 */
export const useGetAditivoById = (id: string | null) => {
  return useQuery({
    queryKey: [ADITIVOS_QUERY_KEY, id],
    queryFn: () => getAditivoById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar um novo aditivo.
 */
export const useCreateAditivo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarAditivoDto) => createAditivo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADITIVOS_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar um aditivo existente.
 */
export const useUpdateAditivo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarAditivoDto }) =>
      updateAditivo(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ADITIVOS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [ADITIVOS_QUERY_KEY, variables.id] })
    },
  })
}

/**
 * Hook para excluir um aditivo.
 */
export const useDeleteAditivo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAditivo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADITIVOS_QUERY_KEY] })
    },
  })
}
