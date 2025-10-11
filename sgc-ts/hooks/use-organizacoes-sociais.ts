import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getOrganizacoesSociais,
  getOrganizacaoSocialById,
  createOrganizacaoSocial,
  updateOrganizacaoSocial,
  deleteOrganizacaoSocial,
  createUnidadeForOrganizacaoSocial,
  ListParams,
} from "@/services/organizacoes-sociais.service"
import {
  CriarOrganizacaoSocialDto,
  AtualizarOrganizacaoSocialDto,
} from "@/models/organizacao-social.model"
import { CriarUnidadeDto } from "@/models/unidade.model"

const ORG_QUERY_KEY = "organizacoesSociais"

export const useGetOrganizacoesSociais = (params: ListParams) => {
  return useQuery({
    queryKey: [ORG_QUERY_KEY, params],
    queryFn: () => getOrganizacoesSociais(params),
    keepPreviousData: true,
  })
}

export const useGetOrganizacaoSocialById = (id: string | null) => {
  return useQuery({
    queryKey: [ORG_QUERY_KEY, id],
    queryFn: () => getOrganizacaoSocialById(id!),
    enabled: !!id,
  })
}

export const useCreateOrganizacaoSocial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarOrganizacaoSocialDto) => createOrganizacaoSocial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORG_QUERY_KEY] })
    },
  })
}

export const useUpdateOrganizacaoSocial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarOrganizacaoSocialDto }) =>
      updateOrganizacaoSocial(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ORG_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [ORG_QUERY_KEY, variables.id] })
    },
  })
}

export const useDeleteOrganizacaoSocial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteOrganizacaoSocial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORG_QUERY_KEY] })
    },
  })
}

export const useCreateUnidadeForOrganizacaoSocial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ orgId, data }: { orgId: string; data: CriarUnidadeDto }) =>
      createUnidadeForOrganizacaoSocial(orgId, data),
    onSuccess: () => {
      // Idealmente, invalidaria a lista de unidades daquela organização
      queryClient.invalidateQueries({ queryKey: [ORG_QUERY_KEY] })
    },
  })
}
