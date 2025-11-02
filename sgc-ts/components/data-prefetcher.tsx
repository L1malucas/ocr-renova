"use client"

import { useEffect } from "react"
import { useCache } from "@/hooks/use-cache"
import { useGetFornecedores } from "@/hooks/use-fornecedores"
import { useGetAditivosByContrato } from "@/hooks/use-aditivos"
import { useGetLinhasOrcamentarias } from "@/hooks/use-linhas-orcamentarias"
import { useGetCategorias } from "@/hooks/use-categorias"

// Este componente é responsável por buscar dados essenciais no carregamento da aplicação
// e armazená-los em cache para acesso rápido em outras partes do sistema.
export function DataPrefetcher() {
  const { setCacheItem, getCacheItem } = useCache()
  const { data: fornecedores, isLoading: isLoadingFornecedores, isError: isErrorFornecedores } = useGetFornecedores({ pageNumber: 1, pageSize: 1000 })
  const { data: aditivos, isLoading: isLoadingAditivos, isError: isErrorAditivos } = useGetAditivosByContrato("", { pageNumber: 1, pageSize: 1000 })
  const { data: linhasOrcamentarias, isLoading: isLoadingLinhasOrcamentarias, isError: isErrorLinhasOrcamentarias } = useGetLinhasOrcamentarias({ pageNumber: 1, pageSize: 1000 })
  const { data: categorias, isLoading: isLoadingCategorias, isError: isErrorCategorias } = useGetCategorias({ pageNumber: 1, pageSize: 1000 })

  useEffect(() => {
    // Verifica se os fornecedores já estão em cache e não estão sendo carregados
    if (!isLoadingFornecedores && !isErrorFornecedores && fornecedores) {
      const cachedFornecedores = getCacheItem("fornecedores")
      // Evita re-gravar desnecessariamente se os dados já estiverem lá
      if (!cachedFornecedores || JSON.stringify(cachedFornecedores) !== JSON.stringify(fornecedores.data)) {
        console.log("Caching fornecedores...")
        setCacheItem("fornecedores", fornecedores.data)
      }
    }
  }, [fornecedores, isLoadingFornecedores, isErrorFornecedores, setCacheItem, getCacheItem])

  useEffect(() => {
    if (!isLoadingAditivos && !isErrorAditivos && aditivos) {
      const cachedAditivos = getCacheItem("aditivos")
      if (!cachedAditivos || JSON.stringify(cachedAditivos) !== JSON.stringify(aditivos.data)) {
        console.log("Caching aditivos...")
        setCacheItem("aditivos", aditivos.data)
      }
    }
  }, [aditivos, isLoadingAditivos, isErrorAditivos, setCacheItem, getCacheItem])

  useEffect(() => {
    if (!isLoadingLinhasOrcamentarias && !isErrorLinhasOrcamentarias && linhasOrcamentarias) {
      const cachedLinhasOrcamentarias = getCacheItem("linhas-orcamentarias")
      if (!cachedLinhasOrcamentarias || JSON.stringify(cachedLinhasOrcamentarias) !== JSON.stringify(linhasOrcamentarias.data)) {
        console.log("Caching linhas orçamentárias...")
        setCacheItem("linhas-orcamentarias", linhasOrcamentarias.data)
      }
    }
  }, [linhasOrcamentarias, isLoadingLinhasOrcamentarias, isErrorLinhasOrcamentarias, setCacheItem, getCacheItem])

  useEffect(() => {
    if (!isLoadingCategorias && !isErrorCategorias && categorias) {
      const cachedCategorias = getCacheItem("categorias")
      if (!cachedCategorias || JSON.stringify(cachedCategorias) !== JSON.stringify(categorias.data)) {
        console.log("Caching categorias...")
        setCacheItem("categorias", categorias.data)
      }
    }
  }, [categorias, isLoadingCategorias, isErrorCategorias, setCacheItem, getCacheItem])

  // Este componente não renderiza nada no DOM
  return null
}
