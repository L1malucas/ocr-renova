import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getReceitas,
  getReceitaById,
  createReceita,
  updateReceita,
  deleteReceita,
  ListParams,
} from "@/services/receitas.service"
import { CriarReceitaDto, AtualizarReceitaDto, ReceitaListSchema } from "@/models/receita.model"

// Chave principal para as queries de receitas, usada para invalidação
const RECEITAS_QUERY_KEY = "receitas"

/**
 * Hook para buscar uma lista paginada de receitas.
 */
export const useGetReceitas = (params: ListParams) => {
  return useQuery({
    queryKey: [RECEITAS_QUERY_KEY, params],
    queryFn: () => getReceitas(params),
    // Transforma os dados usando o schema Zod
    select: (data) => ({
      ...data,
      data: data.data.map(receita => ReceitaListSchema.parse(receita))
    }),
    // Mantém os dados anteriores enquanto busca novos, para uma experiência de paginação mais suave
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar uma única receita pelo seu ID.
 * @param id - O ID da receita a ser buscada.
 */
export const useGetReceitaById = (id: string | null) => {
  return useQuery({
    queryKey: [RECEITAS_QUERY_KEY, id],
    queryFn: () => getReceitaById(id!),
    // A query só será executada se o ID não for nulo
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
      // Invalida todas as queries de lista de receitas para forçar a atualização
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
    onSuccess: (data, variables) => {
      // Invalida a lista e também o cache da receita específica que foi alterada
      queryClient.invalidateQueries({ queryKey: [RECEITAS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [RECEITAS_QUERY_KEY, variables.id] })
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