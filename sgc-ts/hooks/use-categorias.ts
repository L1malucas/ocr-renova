import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getCategoriasLinhasOrcamentarias,
  createCategoriaLinhaOrcamentaria,
  getCategoriasCentroCusto,
  createCategoriaCentroCusto,
  getCategoriasDespesas,
  createCategoriaDespesa,
  updateCategoria,
  deleteCategoria,
  ListParams,
  TipoCategoria,
} from "@/services/categorias.service"
import { CriarCategoriaDto, AtualizarCategoriaDto } from "@/models/categoria.model"

const CATEGORIAS_QUERY_KEY = "categorias"

export const useGetCategorias = (tipo: TipoCategoria, params: ListParams) => {
  let queryFn: (params: ListParams) => Promise<any>
  switch (tipo) {
    case "linhas-orcamentarias":
      queryFn = getCategoriasLinhasOrcamentarias
      break
    case "centro-custo":
      queryFn = getCategoriasCentroCusto
      break
    case "despesas":
      queryFn = getCategoriasDespesas
      break
    default:
      throw new Error("Tipo de categoria inválido")
  }

  return useQuery({
    queryKey: [CATEGORIAS_QUERY_KEY, tipo, params],
    queryFn: () => queryFn(params),
    keepPreviousData: true,
  })
}

export const useCreateCategoria = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ tipo, data }: { tipo: TipoCategoria; data: CriarCategoriaDto }) => {
      switch (tipo) {
        case "linhas-orcamentarias":
          return createCategoriaLinhaOrcamentaria(data)
        case "centro-custo":
          return createCategoriaCentroCusto(data)
        case "despesas":
          return createCategoriaDespesa(data)
        default:
          throw new Error("Tipo de categoria inválido")
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY, variables.tipo] })
    },
  })
}

export const useUpdateCategoria = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ tipo, id, data }: { tipo: TipoCategoria; id: string; data: AtualizarCategoriaDto }) =>
      updateCategoria(tipo, id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY, variables.tipo] })
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY, variables.tipo, variables.id] })
    },
  })
}

export const useDeleteCategoria = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ tipo, id }: { tipo: TipoCategoria; id: string }) => deleteCategoria(tipo, id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIAS_QUERY_KEY, variables.tipo] })
    },
  })
}
