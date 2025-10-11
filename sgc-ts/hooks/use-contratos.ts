import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getContratos,
  getContratoById,
  createContrato,
  updateContrato,
  deleteContrato,
  ListParams,
} from "@/services/contratos.service"
import { CriarContratoDto, AtualizarContratoDto } from "@/models/contrato.model"

const CONTRATOS_QUERY_KEY = "contratos"

export const useGetContratos = (params: ListParams) => {
  return useQuery({
    queryKey: [CONTRATOS_QUERY_KEY, params],
    queryFn: () => getContratos(params),
    keepPreviousData: true,
  })
}

export const useGetContratoById = (id: string | null) => {
  return useQuery({
    queryKey: [CONTRATOS_QUERY_KEY, id],
    queryFn: () => getContratoById(id!),
    enabled: !!id,
  })
}

export const useCreateContrato = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarContratoDto) => createContrato(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTRATOS_QUERY_KEY] })
    },
  })
}

export const useUpdateContrato = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarContratoDto }) =>
      updateContrato(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CONTRATOS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [CONTRATOS_QUERY_KEY, variables.id] })
    },
  })
}

export const useDeleteContrato = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteContrato(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTRATOS_QUERY_KEY] })
    },
  })
}
