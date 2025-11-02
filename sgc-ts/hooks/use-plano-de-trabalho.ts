import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getPlanoTrabalhoByContratoId,
  createPlanoTrabalho,
  updatePlanoTrabalho,
  deletePlanoTrabalho,
} from "@/services/plano-trabalho.service"
import { CriarPlanoTrabalhoDto, AtualizarPlanoTrabalhoDto } from "@/models/plano-trabalho.model"

export const PLANO_TRABALHO_QUERY_KEY = "planoTrabalho"

export const useGetPlanoTrabalhoByContratoId = (contratoId: string | null) => {
  return useQuery({
    queryKey: [PLANO_TRABALHO_QUERY_KEY, "contrato", contratoId],
    queryFn: () => getPlanoTrabalhoByContratoId(contratoId!),
    enabled: !!contratoId,
  })
}

export const useCreatePlanoDeTrabalho = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CriarPlanoTrabalhoDto) => createPlanoTrabalho(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [PLANO_TRABALHO_QUERY_KEY, "contrato", variables.contratoId],
      })
    },
  })
}

export const useUpdatePlanoDeTrabalho = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarPlanoTrabalhoDto }) =>
      updatePlanoTrabalho(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANO_TRABALHO_QUERY_KEY] })
    },
  })
}

export const useDeletePlanoTrabalho = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deletePlanoTrabalho(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANO_TRABALHO_QUERY_KEY] })
    },
  })
}
