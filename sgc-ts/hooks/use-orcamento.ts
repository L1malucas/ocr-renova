"use client"

import { useState, useEffect } from "react"
import type { Orcamento, LinhaOrcamentaria, Projeto, CentroCusto, Categoria } from "@/lib/types"
import {
  mockOrcamentos,
  mockLinhasOrcamentarias,
  mockProjetos,
  mockCentrosCusto,
  mockCategorias,
} from "@/lib/mock-data"
import { useAuth } from "./use-auth"

export function useOrcamento() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])
  const [linhasOrcamentarias, setLinhasOrcamentarias] = useState<LinhaOrcamentaria[]>([])
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [centrosCusto, setCentrosCusto] = useState<CentroCusto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const timer = setTimeout(() => {
      setOrcamentos(mockOrcamentos)
      setLinhasOrcamentarias(mockLinhasOrcamentarias)
      setProjetos(mockProjetos)
      setCentrosCusto(mockCentrosCusto)
      setCategorias(mockCategorias)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [user])

  const createOrcamento = async (orcamento: Omit<Orcamento, "id" | "created_at" | "updated_at">) => {
    if (!user) throw new Error("User not authenticated")

    const newOrcamento: Orcamento = {
      ...orcamento,
      id: `orc-${Date.now()}`,
      created_by: user.id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    setOrcamentos((prev) => [newOrcamento, ...prev])
    return newOrcamento.id
  }

  const updateOrcamento = async (id: string, updates: Partial<Orcamento>) => {
    setOrcamentos((prev) => prev.map((orc) => (orc.id === id ? { ...orc, ...updates, updated_at: new Date() } : orc)))
  }

  const deleteOrcamento = async (id: string) => {
    setOrcamentos((prev) => prev.filter((orc) => orc.id !== id))
  }

  const createLinhaOrcamentaria = async (linha: Omit<LinhaOrcamentaria, "id">) => {
    const newLinha: LinhaOrcamentaria = {
      ...linha,
      id: `linha-${Date.now()}`,
    }

    setLinhasOrcamentarias((prev) => [newLinha, ...prev])
    return newLinha.id
  }

  const updateLinhaOrcamentaria = async (id: string, updates: Partial<LinhaOrcamentaria>) => {
    setLinhasOrcamentarias((prev) => prev.map((linha) => (linha.id === id ? { ...linha, ...updates } : linha)))
  }

  const aprovarOrcamento = async (id: string) => {
    await updateOrcamento(id, { status: "Aprovado" })
  }

  const criarRevisao = async (orcamentoId: string) => {
    const orcamentoOriginal = orcamentos.find((o) => o.id === orcamentoId)
    if (!orcamentoOriginal) throw new Error("Orçamento não encontrado")

    const novaVersao = orcamentoOriginal.versao + 1
    const novoOrcamento = {
      ...orcamentoOriginal,
      nome: `${orcamentoOriginal.nome} - Revisão ${novaVersao}`,
      versao: novaVersao,
      status: "Planejamento" as const,
    }

    delete (novoOrcamento as any).id
    delete (novoOrcamento as any).created_at
    delete (novoOrcamento as any).updated_at

    return await createOrcamento(novoOrcamento)
  }

  return {
    orcamentos,
    linhasOrcamentarias,
    projetos,
    centrosCusto,
    categorias,
    loading,
    createOrcamento,
    updateOrcamento,
    deleteOrcamento,
    createLinhaOrcamentaria,
    updateLinhaOrcamentaria,
    aprovarOrcamento,
    criarRevisao,
  }
}
