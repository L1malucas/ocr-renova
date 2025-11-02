"use client"

import { useEffect } from "react"
import { useCache } from "@/hooks/use-cache"
import { useAllFornecedores } from "@/hooks/use-fornecedores"

// Este componente é responsável por buscar dados essenciais no carregamento da aplicação
// e armazená-los em cache para acesso rápido em outras partes do sistema.
export function DataPrefetcher() {
  const { setCacheItem, getCacheItem } = useCache()
  const { data: fornecedores, isLoading, isError } = useAllFornecedores()

  useEffect(() => {
    // Verifica se os fornecedores já estão em cache e não estão sendo carregados
    if (!isLoading && !isError && fornecedores) {
      const cachedFornecedores = getCacheItem("fornecedores")
      // Evita re-gravar desnecessariamente se os dados já estiverem lá
      if (!cachedFornecedores || JSON.stringify(cachedFornecedores) !== JSON.stringify(fornecedores)) {
        console.log("Caching fornecedores...")
        setCacheItem("fornecedores", fornecedores)
      }
    }
  }, [fornecedores, isLoading, isError, setCacheItem, getCacheItem])

  // Adicione aqui outras lógicas de pre-fetching para outras entidades (projetos, etc.)
  // Exemplo:
  // const { data: projetos } = useAllProjetos();
  // useEffect(() => {
  //   if (projetos) setCacheItem('projetos', projetos);
  // }, [projetos, setCacheItem]);

  // Este componente não renderiza nada no DOM
  return null
}
