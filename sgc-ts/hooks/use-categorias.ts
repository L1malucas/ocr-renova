import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  ListParams,
} from "@/services/categorias.service"
import {
  CriarCategoriaDto,
  AtualizarCategoriaDto,
} from "@/models/categoria.model"

// Chave principal para as queries de categorias
const CATEGORIAS_QUERY_KEY = "categorias"

/**
 * Hook para buscar uma lista paginada de categorias por tipo.
 */
export const useGetCategorias = (
  type: 'linhas-orcamentarias' | 'despesas',
  params: ListParams
) => {
  return useQuery({
    queryKey: [CATEGORIAS_QUERY_KEY, type, params],
    queryFn: () => getCategorias(type, params),
    keepPreviousData: true,
  })
}

/**
 * Hook para criar uma nova categoria.
 */
export const useCreateCategoria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ type, data }: { type: 'linhas-orcamentarias' | 'despesas'; data: CriarCategoriaDto }) =>
      createCategoria(type, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY, variables.type] })
    },
  })
}

/**
 * Hook para atualizar uma categoria existente.
 */
export const useUpdateCategoria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ type, id, data }: { type: 'linhas-orcamentarias' | 'despesas'; id: string; data: AtualizarCategoriaDto }) =>
      updateCategoria(type, id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY, variables.type] })
    },
  })
}

/**
 * Hook para excluir uma categoria.
 */
export const useDeleteCategoria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ type, id }: { type: 'linhas-orcamentarias' | 'despesas'; id: string }) =>
      deleteCategoria(type, id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY, variables.type] })
    },
  })
}