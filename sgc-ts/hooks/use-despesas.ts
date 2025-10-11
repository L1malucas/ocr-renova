import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getDespesas,
  getDespesaById,
  createDespesa,
  updateDespesa,
  deleteDespesa,
  ListParams,
} from "@/services/despesas.service"
import { CriarDespesaDto, AtualizarDespesaDto } from "@/models/despesa.model"

// Chave principal para as queries de despesas
const DESPESAS_QUERY_KEY = "despesas"

/**
 * Hook para buscar uma lista paginada de despesas.
 */
export const useGetDespesas = (params: ListParams) => {
  return useQuery({
    queryKey: [DESPESAS_QUERY_KEY, params],
    queryFn: () => getDespesas(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar uma única despesa pelo seu ID.
 */
export const useGetDespesaById = (id: string | null) => {
  return useQuery({
    queryKey: [DESPESAS_QUERY_KEY, id],
    queryFn: () => getDespesaById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar uma nova despesa.
 */
export const useCreateDespesa = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarDespesaDto) => createDespesa(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DESPESAS_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar uma despesa existente.
 */
export const useUpdateDespesa = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarDespesaDto }) =>
      updateDespesa(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [DESPESAS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [DESPESAS_QUERY_KEY, variables.id] })
    },
  })
}

/**
 * Hook para excluir uma despesa.
 */
export const useDeleteDespesa = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteDespesa(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DESPESAS_QUERY_KEY] })
    },
  })
}