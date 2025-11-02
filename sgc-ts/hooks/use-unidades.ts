import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getUnidades,
  getUnidadeById,
  createUnidade,
  updateUnidade,
  deleteUnidade,
  ListParams,
} from "@/services/unidades.service"
import {
  CriarUnidadeDto,
  AtualizarUnidadeDto,
} from "@/models/unidade.model"

// Chave principal para as queries de unidades
const UNIDADES_QUERY_KEY = "unidades"

/**
 * Hook para buscar uma lista paginada de unidades.
 */
export const useGetUnidades = (params: ListParams) => {
  return useQuery({
    queryKey: [UNIDADES_QUERY_KEY, params],
    queryFn: () => getUnidades(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar uma única unidade pelo seu ID.
 */
export const useGetUnidadeById = (id: string | null) => {
  return useQuery({
    queryKey: [UNIDADES_QUERY_KEY, id],
    queryFn: () => getUnidadeById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar uma nova unidade.
 */
export const useCreateUnidade = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarUnidadeDto) => createUnidade(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UNIDADES_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar uma unidade existente.
 */
export const useUpdateUnidade = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarUnidadeDto }) =>
      updateUnidade(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [UNIDADES_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [UNIDADES_QUERY_KEY, variables.id],
      })
    },
  })
}

/**
 * Hook para excluir uma unidade.
 */
export const useDeleteUnidade = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUnidade(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UNIDADES_QUERY_KEY] })
    },
  })
}