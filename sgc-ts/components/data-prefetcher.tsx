"use client"

import { useEffect } from "react"
import { useCache } from "@/hooks/use-cache"
import { useGetFornecedores } from "@/hooks/use-fornecedores"
import { useGetLinhasOrcamentarias } from "@/hooks/use-linhas-orcamentarias"
// import { useGetCategorias } from "@/hooks/use-categorias" // REMOVIDO: endpoint /categories/despesas não existe no backend
import { useGetFontesRecurso } from "@/hooks/use-fonte-recurso"
import { useGetOrganizacoesSociais } from "@/hooks/use-organizacoes-sociais"
import { useGetReceitas } from "@/hooks/use-receitas"
import { useGetUnidades } from "@/hooks/use-unidades"

// Este componente é responsável por buscar dados essenciais no carregamento da aplicação
// e armazená-los em cache para acesso rápido em outras partes do sistema.
export function DataPrefetcher() {
  const PAGE_SIZE = 10;
  const PAGE_NUMBER = 1;
  const { setCacheItem, getCacheItem } = useCache()
  const { data: fornecedores, isLoading: isLoadingFornecedores, isError: isErrorFornecedores } = useGetFornecedores({ pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })
  const { data: linhasOrcamentarias, isLoading: isLoadingLinhasOrcamentarias, isError: isErrorLinhasOrcamentarias } = useGetLinhasOrcamentarias({ pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })
  // const { data: categorias, isLoading: isLoadingCategorias, isError: isErrorCategorias } = useGetCategorias({ pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE }) // REMOVIDO: endpoint não existe
  const { data: fontesRecurso, isLoading: isLoadingFontesRecurso, isError: isErrorFontesRecurso } = useGetFontesRecurso({ pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })
  const { data: organizacoesSociais, isLoading: isLoadingOrganizacoesSociais, isError: isErrorOrganizacoesSociais } = useGetOrganizacoesSociais({ pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })
  const { data: receitas, isLoading: isLoadingReceitas, isError: isErrorReceitas } = useGetReceitas({ pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })
  const { data: unidades, isLoading: isLoadingUnidades, isError: isErrorUnidades } = useGetUnidades({ pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })

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
    if (!isLoadingLinhasOrcamentarias && !isErrorLinhasOrcamentarias && linhasOrcamentarias) {
      const cachedLinhasOrcamentarias = getCacheItem("linhas-orcamentarias")
      if (!cachedLinhasOrcamentarias || JSON.stringify(cachedLinhasOrcamentarias) !== JSON.stringify(linhasOrcamentarias.data)) {
        console.log("Caching linhas orçamentárias...")
        setCacheItem("linhas-orcamentarias", linhasOrcamentarias.data)
      }
    }
  }, [linhasOrcamentarias, isLoadingLinhasOrcamentarias, isErrorLinhasOrcamentarias, setCacheItem, getCacheItem])

  // REMOVIDO: useEffect de categorias pois o endpoint /categories/despesas não existe no backend
  // useEffect(() => {
  //   if (!isLoadingCategorias && !isErrorCategorias && categorias) {
  //     const cachedCategorias = getCacheItem("categorias")
  //     if (!cachedCategorias || JSON.stringify(cachedCategorias) !== JSON.stringify(categorias.data)) {
  //       console.log("Caching categorias...")
  //       setCacheItem("categorias", categorias.data)
  //     }
  //   }
  // }, [categorias, isLoadingCategorias, isErrorCategorias, setCacheItem, getCacheItem])

  useEffect(() => {
    if (!isLoadingFontesRecurso && !isErrorFontesRecurso && fontesRecurso) {
      const cachedFontesRecurso = getCacheItem("fontes-recurso")
      if (!cachedFontesRecurso || JSON.stringify(cachedFontesRecurso) !== JSON.stringify(fontesRecurso.data)) {
        console.log("Caching fontes de recurso...")
        setCacheItem("fontes-recurso", fontesRecurso.data)
      }
    }
  }, [fontesRecurso, isLoadingFontesRecurso, isErrorFontesRecurso, setCacheItem, getCacheItem])

  useEffect(() => {
    if (!isLoadingOrganizacoesSociais && !isErrorOrganizacoesSociais && organizacoesSociais) {
      const cachedOrganizacoesSociais = getCacheItem("organizacoes-sociais")
      if (!cachedOrganizacoesSociais || JSON.stringify(cachedOrganizacoesSociais) !== JSON.stringify(organizacoesSociais.data)) {
        console.log("Caching organizações sociais...")
        setCacheItem("organizacoes-sociais", organizacoesSociais.data)
      }
    }
  }, [organizacoesSociais, isLoadingOrganizacoesSociais, isErrorOrganizacoesSociais, setCacheItem, getCacheItem])

  useEffect(() => {
    if (!isLoadingReceitas && !isErrorReceitas && receitas) {
      const cachedReceitas = getCacheItem("receitas")
      if (!cachedReceitas || JSON.stringify(cachedReceitas) !== JSON.stringify(receitas.data)) {
        console.log("Caching receitas...")
        setCacheItem("receitas", receitas.data)
      }
    }
  }, [receitas, isLoadingReceitas, isErrorReceitas, setCacheItem, getCacheItem])

  useEffect(() => {
    if (!isLoadingUnidades && !isErrorUnidades && unidades) {
      const cachedUnidades = getCacheItem("unidades")
      if (!cachedUnidades || JSON.stringify(cachedUnidades) !== JSON.stringify(unidades.data)) {
        console.log("Caching unidades...")
        setCacheItem("unidades", unidades.data)
      }
    }
  }, [unidades, isLoadingUnidades, isErrorUnidades, setCacheItem, getCacheItem])

  // Este componente não renderiza nada no DOM
  return null
}
