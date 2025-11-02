import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getFontesRecurso,
  getFonteRecursoById,
  createFonteRecurso,
  updateFonteRecurso,
  deleteFonteRecurso,
  ListParams,
} from "@/services/fonte-recurso.service"
import {
  CriarFonteRecursoDto,
  AtualizarFonteRecursoDto,
} from "@/models/fonte-recurso.model"

// Chave principal para as queries de fontes de recurso
const FONTES_RECURSO_QUERY_KEY = "fontes-recurso"

/**
 * Hook para buscar uma lista paginada de fontes de recurso.
 */
export const useGetFontesRecurso = (params: ListParams) => {
  return useQuery({
    queryKey: [FONTES_RECURSO_QUERY_KEY, params],
    queryFn: () => getFontesRecurso(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar uma única fonte de recurso pelo seu ID.
 */
export const useGetFonteRecursoById = (id: string | null) => {
  return useQuery({
    queryKey: [FONTES_RECURSO_QUERY_KEY, id],
    queryFn: () => getFonteRecursoById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar uma nova fonte de recurso.
 */
export const useCreateFonteRecurso = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarFonteRecursoDto) => createFonteRecurso(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FONTES_RECURSO_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar uma fonte de recurso existente.
 */
export const useUpdateFonteRecurso = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarFonteRecursoDto }) =>
      updateFonteRecurso(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [FONTES_RECURSO_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [FONTES_RECURSO_QUERY_KEY, variables.id],
      })
    },
  })
}

/**
 * Hook para excluir uma fonte de recurso.
 */
export const useDeleteFonteRecurso = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteFonteRecurso(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FONTES_RECURSO_QUERY_KEY] })
    },
  })
}
