import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getExecucoesByItemPlanoTrabalho,
  createExecucaoItemPlanoTrabalho,
  updateExecucaoItemPlanoTrabalho,
  deleteExecucaoItemPlanoTrabalho,
  ListParams,
} from "@/services/execucao-item-trabalho.service"
import {
  CriarExecucaoItemPlanoTrabalhoDto,
  AtualizarExecucaoItemPlanoTrabalhoDto,
} from "@/models/execucao-item-plano-trabalho.model"

const EXECUCOES_QUERY_KEY = "execucoesPlanoTrabalho"

export const useGetExecucoesByItem = (itemId: string | null, params: ListParams) => {
  return useQuery({
    queryKey: [EXECUCOES_QUERY_KEY, "item", itemId, params],
    queryFn: () => getExecucoesByItemPlanoTrabalho(itemId!, params),
    enabled: !!itemId,
  })
}

export const useCreateExecucao = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: CriarExecucaoItemPlanoTrabalhoDto }) =>
      createExecucaoItemPlanoTrabalho(itemId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [EXECUCOES_QUERY_KEY, "item", variables.itemId] })
    },
  })
}

export const useUpdateExecucao = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ execucaoId, data }: { execucaoId: string; data: AtualizarExecucaoItemPlanoTrabalhoDto }) =>
      updateExecucaoItemPlanoTrabalho(execucaoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXECUCOES_QUERY_KEY] })
    },
  })
}

export const useDeleteExecucao = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (execucaoId: string) => deleteExecucaoItemPlanoTrabalho(execucaoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXECUCOES_QUERY_KEY] })
    },
  })
}
