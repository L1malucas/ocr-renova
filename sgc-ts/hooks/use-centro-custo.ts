import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getCentrosCusto,
  createCentroCusto,
  updateCentroCusto,
  ListParams,
} from "@/services/centro-custo.service"
import { CriarCentroCustoDto, AtualizarCentroCustoDto } from "@/models/centro-custo.model"

const CENTRO_CUSTO_QUERY_KEY = "centrosCusto"

export const useGetCentrosCusto = (params: ListParams) => {
  return useQuery({
    queryKey: [CENTRO_CUSTO_QUERY_KEY, params],
    queryFn: () => getCentrosCusto(params),
    keepPreviousData: true,
  })
}

export const useCreateCentroCusto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarCentroCustoDto) => createCentroCusto(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CENTRO_CUSTO_QUERY_KEY] })
    },
  })
}

export const useUpdateCentroCusto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarCentroCustoDto }) =>
      updateCentroCusto(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CENTRO_CUSTO_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [CENTRO_CUSTO_QUERY_KEY, variables.id] })
    },
  })
}
