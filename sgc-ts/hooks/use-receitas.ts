import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getReceitas,
  getReceitaById,
  createReceita,
  updateReceita,
  deleteReceita,
  ListParams,
} from "@/services/receitas.service"
import {
  CriarReceitaDto,
  AtualizarReceitaDto,
} from "@/models/receita.model"

// Chave principal para as queries de receitas
const RECEITAS_QUERY_KEY = "receitas"

/**
 * Hook para buscar uma lista paginada de receitas.
 */
export const useGetReceitas = (params: ListParams) => {
  return useQuery({
    queryKey: [RECEITAS_QUERY_KEY, params],
    queryFn: () => getReceitas(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar uma única receita pelo seu ID.
 */
export const useGetReceitaById = (id: string | null) => {
  return useQuery({
    queryKey: [RECEITAS_QUERY_KEY, id],
    queryFn: () => getReceitaById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar uma nova receita.
 */
export const useCreateReceita = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarReceitaDto) => createReceita(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECEITAS_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar uma receita existente.
 */
export const useUpdateReceita = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarReceitaDto }) =>
      updateReceita(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [RECEITAS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [RECEITAS_QUERY_KEY, variables.id],
      })
    },
  })
}

/**
 * Hook para excluir uma receita.
 */
export const useDeleteReceita = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteReceita(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECEITAS_QUERY_KEY] })
    },
  })
}
