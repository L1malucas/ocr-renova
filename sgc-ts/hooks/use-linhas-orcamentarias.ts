import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createLinhaOrcamentaria,
  updateLinhaOrcamentaria,
  deleteLinhaOrcamentaria,
} from "@/services/linhas-orcamentarias.service"
import {
  CriarLinhaOrcamentariaDto,
  AtualizarLinhaOrcamentariaDto,
} from "@/models/linha-orcamentaria.model"
import { ORCAMENTO_QUERY_KEY } from "./use-orcamento"

export const useCreateLinhaOrcamentaria = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ orcamentoId, data }: { orcamentoId: string, data: CriarLinhaOrcamentariaDto }) =>
      createLinhaOrcamentaria(orcamentoId, data),
    onSuccess: () => {
      // Invalida as queries de orçamento para recarregar a lista de linhas
      queryClient.invalidateQueries({ queryKey: [ORCAMENTO_QUERY_KEY] })
    },
  })
}

export const useUpdateLinhaOrcamentaria = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ linhaId, data }: { linhaId: string; data: AtualizarLinhaOrcamentariaDto }) =>
      updateLinhaOrcamentaria(linhaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORCAMENTO_QUERY_KEY] })
    },
  })
}

export const useDeleteLinhaOrcamentaria = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (linhaId: string) => deleteLinhaOrcamentaria(linhaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORCAMENTO_QUERY_KEY] })
    },
  })
}
