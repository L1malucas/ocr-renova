import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getOrcamentoByContratoId,
  getOrcamentoById,
  createOrcamento,
  updateOrcamento,
  deleteOrcamento,
} from "@/services/orcamentos.service"
import { CriarOrcamentoDto, AtualizarOrcamentoDto } from "@/models/orcamento.model"

export const ORCAMENTO_QUERY_KEY = "orcamentos"

export const useGetOrcamentoByContratoId = (contratoId: string | null) => {
  return useQuery({
    queryKey: [ORCAMENTO_QUERY_KEY, "contrato", contratoId],
    queryFn: () => getOrcamentoByContratoId(contratoId!),
    enabled: !!contratoId,
  })
}

export const useGetOrcamentoById = (id: string | null) => {
  return useQuery({
    queryKey: [ORCAMENTO_QUERY_KEY, id],
    queryFn: () => getOrcamentoById(id!),
    enabled: !!id,
  })
}

export const useCreateOrcamento = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarOrcamentoDto) => createOrcamento(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ORCAMENTO_QUERY_KEY, "contrato", variables.contratoId],
      })
    },
  })
}

export const useUpdateOrcamento = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarOrcamentoDto }) =>
      updateOrcamento(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ORCAMENTO_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [ORCAMENTO_QUERY_KEY, variables.id] })
    },
  })
}

export const useDeleteOrcamento = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteOrcamento(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORCAMENTO_QUERY_KEY] })
    },
  })
}