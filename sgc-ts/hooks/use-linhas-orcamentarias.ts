import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getLinhasOrcamentarias,
  getLinhaOrcamentariaById,
  createLinhaOrcamentaria,
  updateLinhaOrcamentaria,
  deleteLinhaOrcamentaria,
  ListParams,
} from "@/services/linhas-orcamentarias.service"
import {
  CriarLinhaOrcamentariaDto,
  AtualizarLinhaOrcamentariaDto,
} from "@/models/linha-orcamentaria.model"

// Chave principal para as queries de linhas orçamentárias
const LINHAS_ORCAMENTARIAS_QUERY_KEY = "linhas-orcamentarias"

/**
 * Hook para buscar uma lista paginada de linhas orçamentárias.
 */
export const useGetLinhasOrcamentarias = (params: ListParams) => {
  return useQuery({
    queryKey: [LINHAS_ORCAMENTARIAS_QUERY_KEY, params],
    queryFn: () => getLinhasOrcamentarias(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar uma única linha orçamentária pelo seu ID.
 */
export const useGetLinhaOrcamentariaById = (id: string | null) => {
  return useQuery({
    queryKey: [LINHAS_ORCAMENTARIAS_QUERY_KEY, id],
    queryFn: () => getLinhaOrcamentariaById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar uma nova linha orçamentária.
 */
export const useCreateLinhaOrcamentaria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarLinhaOrcamentariaDto) => createLinhaOrcamentaria(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LINHAS_ORCAMENTARIAS_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar uma linha orçamentária existente.
 */
export const useUpdateLinhaOrcamentaria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarLinhaOrcamentariaDto }) =>
      updateLinhaOrcamentaria(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [LINHAS_ORCAMENTARIAS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [LINHAS_ORCAMENTARIAS_QUERY_KEY, variables.id],
      })
    },
  })
}

/**
 * Hook para excluir uma linha orçamentária.
 */
export const useDeleteLinhaOrcamentaria = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteLinhaOrcamentaria(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LINHAS_ORCAMENTARIAS_QUERY_KEY] })
    },
  })
}