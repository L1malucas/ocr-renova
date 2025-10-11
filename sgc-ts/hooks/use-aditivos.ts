import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getAditivosByContrato,
  getAditivoById,
  createAditivo,
  updateAditivo,
  ListAditivosParams,
} from "@/services/aditivos.service"
import { CriarAditivoDto, UpdateAmendmentDto } from "@/models/aditivo.model"

const ADITIVOS_QUERY_KEY = "aditivos"

export const useGetAditivosByContrato = (
  contratoId: string,
  params: ListAditivosParams
) => {
  return useQuery({
    queryKey: [ADITIVOS_QUERY_KEY, "contrato", contratoId, params],
    queryFn: () => getAditivosByContrato(contratoId, params),
    enabled: !!contratoId,
  })
}

export const useGetAditivoById = (id: string | null) => {
  return useQuery({
    queryKey: [ADITIVOS_QUERY_KEY, id],
    queryFn: () => getAditivoById(id!),
    enabled: !!id,
  })
}

export const useCreateAditivo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarAditivoDto) => createAditivo(data),
    onSuccess: (_data, variables) => {
      // Invalida a lista de aditivos daquele contrato específico
      queryClient.invalidateQueries({
        queryKey: [ADITIVOS_QUERY_KEY, "contrato", variables.contratoId],
      })
    },
  })
}

export const useUpdateAditivo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAmendmentDto }) =>
      updateAditivo(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ADITIVOS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [ADITIVOS_QUERY_KEY, variables.id] })
    },
  })
}
