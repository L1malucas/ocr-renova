import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getFornecedores,
  getFornecedorById,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
  ListParams,
} from "@/services/fornecedores.service"
import {
  CriarFornecedorDto,
  AtualizarFornecedorDto,
} from "@/models/fornecedor.model"

// Chave principal para as queries de fornecedores
const FORNECEDORES_QUERY_KEY = "fornecedores"

/**
 * Hook para buscar uma lista paginada de fornecedores.
 */
export const useGetFornecedores = (params: ListParams) => {
  return useQuery({
    queryKey: [FORNECEDORES_QUERY_KEY, params],
    queryFn: () => getFornecedores(params),
    keepPreviousData: true,
  })
}

/**
 * Hook para buscar um único fornecedor pelo seu ID.
 */
export const useGetFornecedorById = (id: string | null) => {
  return useQuery({
    queryKey: [FORNECEDORES_QUERY_KEY, id],
    queryFn: () => getFornecedorById(id!),
    enabled: !!id,
  })
}

/**
 * Hook para criar um novo fornecedor.
 */
export const useCreateFornecedor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarFornecedorDto) => createFornecedor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FORNECEDORES_QUERY_KEY] })
    },
  })
}

/**
 * Hook para atualizar um fornecedor existente.
 */
export const useUpdateFornecedor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarFornecedorDto }) =>
      updateFornecedor(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [FORNECEDORES_QUERY_KEY] })
      queryClient.invalidateQueries({
        queryKey: [FORNECEDORES_QUERY_KEY, variables.id],
      })
    },
  })
}

/**
 * Hook para excluir um fornecedor.
 */
export const useDeleteFornecedor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteFornecedor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FORNECEDORES_QUERY_KEY] })
    },
  })
}