import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getOrganizacoesSociais,
  getOrganizacaoSocialById,
  createOrganizacaoSocial,
  updateOrganizacaoSocial,
  deleteOrganizacaoSocial,
  ListParams,
} from "@/services/organizacoes-sociais.service"
import {
  CriarOrganizacaoSocialDto,
  AtualizarOrganizacaoSocialDto,
} from "@/models/organizacao-social.model"

// Chave principal para as queries de organizações sociais
const ORGANIZACOES_SOCIAIS_QUERY_KEY = "organizacoes-sociais"

/**
 * Hook para buscar uma lista paginada de organizações sociais.
 */
export const useGetOrganizacoesSociais = (params: ListParams) => {
  return useQuery({
    queryKey: [ORGANIZACOES_SOCIAIS_QUERY_KEY, params],
    queryFn: () => getOrganizacoesSociais(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar uma única organização social pelo seu ID.
 */
export const useGetOrganizacaoSocialById = (id: string | null) => {
  return useQuery({
    queryKey: [ORGANIZACOES_SOCIAIS_QUERY_KEY, id],
    queryFn: () => getOrganizacaoSocialById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar uma nova organização social.
 */
export const useCreateOrganizacaoSocial = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarOrganizacaoSocialDto) => createOrganizacaoSocial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORGANIZACOES_SOCIAIS_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar uma organização social existente.
 */
export const useUpdateOrganizacaoSocial = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarOrganizacaoSocialDto }) =>
      updateOrganizacaoSocial(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ORGANIZACOES_SOCIAIS_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [ORGANIZACOES_SOCIAIS_QUERY_KEY, variables.id],
      })
    },
  })
}

/**
 * Hook para excluir uma organização social.
 */
export const useDeleteOrganizacaoSocial = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteOrganizacaoSocial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORGANIZACOES_SOCIAIS_QUERY_KEY] })
    },
  })
}