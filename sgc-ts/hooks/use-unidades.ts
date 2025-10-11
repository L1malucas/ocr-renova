import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getUnidades,
  getUnidadeById,
  createUnidade,
  updateUnidade,
  deleteUnidade,
  ListParams,
} from "@/services/unidades.service"
import { CriarUnidadeDto, AtualizarUnidadeDto } from "@/models/unidade.model"

const UNIDADES_QUERY_KEY = "unidades"

export const useGetUnidades = (params: ListParams) => {
  return useQuery({
    queryKey: [UNIDADES_QUERY_KEY, params],
    queryFn: () => getUnidades(params),
    keepPreviousData: true,
  })
}

export const useGetUnidadeById = (id: string | null) => {
  return useQuery({
    queryKey: [UNIDADES_QUERY_KEY, id],
    queryFn: () => getUnidadeById(id!),
    enabled: !!id,
  })
}

export const useCreateUnidade = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarUnidadeDto) => createUnidade(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UNIDADES_QUERY_KEY] })
    },
  })
}

export const useUpdateUnidade = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarUnidadeDto }) =>
      updateUnidade(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [UNIDADES_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [UNIDADES_QUERY_KEY, variables.id] })
    },
  })
}

export const useDeleteUnidade = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteUnidade(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UNIDADES_QUERY_KEY] })
    },
  })
}
