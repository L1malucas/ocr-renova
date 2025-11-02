import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getCategorias,
  getCategoriaById,
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
 * Hook para buscar uma lista paginada de categorias.
 */
export const useGetCategorias = (params: ListParams) => {
  return useQuery({
    queryKey: [CATEGORIAS_QUERY_KEY, params],
    queryFn: () => getCategorias(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar uma única categoria pelo seu ID.
 */
export const useGetCategoriaById = (id: string | null) => {
  return useQuery({
    queryKey: [CATEGORIAS_QUERY_KEY, id],
    queryFn: () => getCategoriaById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar uma nova categoria.
 */
export const useCreateCategoria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarCategoriaDto) => createCategoria(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar uma categoria existente.
 */
export const useUpdateCategoria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarCategoriaDto }) =>
      updateCategoria(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [CATEGORIAS_QUERY_KEY, variables.id],
      })
    },
  })
}

/**
 * Hook para excluir uma categoria.
 */
export const useDeleteCategoria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCategoria(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY] })
    },
  })
}