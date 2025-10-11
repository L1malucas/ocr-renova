import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createItemPlanoTrabalho,
  updateItemPlanoTrabalho,
  deleteItemPlanoTrabalho,
} from "@/services/itens-trabalho.service"
import {
  CriarItemPlanoTrabalhoDto,
  AtualizarItemPlanoTrabalhoDto,
} from "@/models/item-plano-trabalho.model"
import { PLANO_TRABALHO_QUERY_KEY } from "./use-plano-de-trabalho"

export const useCreateItemPlanoTrabalho = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ planoTrabalhoId, data }: { planoTrabalhoId: string; data: CriarItemPlanoTrabalhoDto }) =>
      createItemPlanoTrabalho(planoTrabalhoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANO_TRABALHO_QUERY_KEY] })
    },
  })
}

export const useUpdateItemPlanoTrabalho = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: AtualizarItemPlanoTrabalhoDto }) =>
      updateItemPlanoTrabalho(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANO_TRABALHO_QUERY_KEY] })
    },
  })
}

export const useDeleteItemPlanoTrabalho = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (itemId: string) => deleteItemPlanoTrabalho(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANO_TRABALHO_QUERY_KEY] })
    },
  })
}
