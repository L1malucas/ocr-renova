"use client"

import { useState, useEffect } from "react"
import type { Despesa, Fornecedor, WorkflowAprovacao } from "@/lib/types"
import { mockDespesas, mockFornecedores, mockWorkflows } from "@/lib/mock-data"
import { useAuth } from "./use-auth"

export function useDespesas() {
  const [despesas, setDespesas] = useState<Despesa[]>([])
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [workflows, setWorkflows] = useState<WorkflowAprovacao[]>([])
  const [despesasPendentes, setDespesasPendentes] = useState<Despesa[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const timer = setTimeout(() => {
      setDespesas(mockDespesas)
      setFornecedores(mockFornecedores)
      setWorkflows(mockWorkflows)
      setDespesasPendentes(mockDespesas.filter((d) => d.status_aprovacao === "Em Aprovação"))
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [user])

  const createDespesa = async (despesa: Omit<Despesa, "id" | "created_at" | "updated_at">) => {
    if (!user) throw new Error("User not authenticated")

    const newDespesa: Despesa = {
      ...despesa,
      id: `desp-${Date.now()}`,
      created_by: user.id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    setDespesas((prev) => [newDespesa, ...prev])
    return newDespesa.id
  }

  const updateDespesa = async (id: string, updates: Partial<Despesa>) => {
    setDespesas((prev) => prev.map((desp) => (desp.id === id ? { ...desp, ...updates, updated_at: new Date() } : desp)))
  }

  const deleteDespesa = async (id: string) => {
    setDespesas((prev) => prev.filter((desp) => desp.id !== id))
  }

  const aprovarDespesa = async (id: string, observacoes?: string) => {
    if (!user) throw new Error("User not authenticated")

    const updates = {
      status_aprovacao: "Aprovado" as const,
      aprovado_por: user.id,
      aprovado_em: new Date(),
      observacoes_aprovacao: observacoes,
      updated_at: new Date(),
    }

    setDespesas((prev) => prev.map((desp) => (desp.id === id ? { ...desp, ...updates } : desp)))
    setDespesasPendentes((prev) => prev.filter((d) => d.id !== id))
  }

  const rejeitarDespesa = async (id: string, motivo: string) => {
    if (!user) throw new Error("User not authenticated")

    const updates = {
      status_aprovacao: "Rejeitado" as const,
      aprovado_por: user.id,
      aprovado_em: new Date(),
      motivo_rejeicao: motivo,
      updated_at: new Date(),
    }

    setDespesas((prev) => prev.map((desp) => (desp.id === id ? { ...desp, ...updates } : desp)))
    setDespesasPendentes((prev) => prev.filter((d) => d.id !== id))
  }

  const createFornecedor = async (fornecedor: Omit<Fornecedor, "id" | "created_at" | "updated_at">) => {
    const newFornecedor: Fornecedor = {
      ...fornecedor,
      id: `forn-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
    }

    setFornecedores((prev) => [newFornecedor, ...prev])
    return newFornecedor.id
  }

  return {
    despesas,
    fornecedores,
    workflows,
    despesasPendentes,
    loading,
    createDespesa,
    updateDespesa,
    deleteDespesa,
    aprovarDespesa,
    rejeitarDespesa,
    createFornecedor,
  }
}
