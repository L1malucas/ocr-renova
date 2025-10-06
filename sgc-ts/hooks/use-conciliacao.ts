"use client"

import { useState, useEffect } from "react"
import type { ConciliacaoBancaria, MovimentoBancario, MovimentoFinanceiro } from "@/lib/types"
import { mockConciliacoes, mockMovimentosBancarios, mockMovimentosFinanceiros } from "@/lib/mock-data"

export function useConciliacao() {
  const [conciliacoes, setConciliacoes] = useState<ConciliacaoBancaria[]>([])
  const [movimentosBancarios, setMovimentosBancarios] = useState<MovimentoBancario[]>([])
  const [movimentosFinanceiros, setMovimentosFinanceiros] = useState<MovimentoFinanceiro[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setConciliacoes(mockConciliacoes)
      setMovimentosBancarios(mockMovimentosBancarios)
      setMovimentosFinanceiros(mockMovimentosFinanceiros)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const importarExtrato = async (arquivo: File, contaId: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const novoMovimento: MovimentoBancario = {
        id: `mb-${Date.now()}`,
        data: new Date(),
        descricao: `Movimento importado de ${arquivo.name}`,
        valor: Math.random() * 10000,
        tipo: Math.random() > 0.5 ? "entrada" : "saida",
        contaId,
        numeroDocumento: `DOC${Date.now()}`,
        status: "pendente",
        dataImportacao: new Date(),
      }

      setMovimentosBancarios((prev) => [novoMovimento, ...prev])

      return { success: true, movimentos: 1 }
    } catch (error) {
      console.error("Erro ao importar extrato:", error)
      throw error
    }
  }

  const executarMatchingAutomatico = async (contaId: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const movBancarios = movimentosBancarios.filter((m) => m.contaId === contaId && m.status === "pendente")
      const movFinanceiros = movimentosFinanceiros.filter((m) => m.contaId === contaId && m.status === "pendente")

      const matchesEncontrados = Math.min(movBancarios.length, movFinanceiros.length)

      // Mock conciliation updates
      setMovimentosBancarios((prev) =>
        prev.map((mov) =>
          mov.contaId === contaId && mov.status === "pendente"
            ? { ...mov, status: "conciliado", dataConciliacao: new Date() }
            : mov,
        ),
      )

      return { matchesEncontrados }
    } catch (error) {
      console.error("Erro no matching automático:", error)
      throw error
    }
  }

  const conciliarManual = async (movBancarioId: string, movFinanceiroId: string) => {
    try {
      setMovimentosBancarios((prev) =>
        prev.map((mov) =>
          mov.id === movBancarioId
            ? { ...mov, status: "conciliado", movimentoFinanceiroId: movFinanceiroId, dataConciliacao: new Date() }
            : mov,
        ),
      )

      setMovimentosFinanceiros((prev) =>
        prev.map((mov) =>
          mov.id === movFinanceiroId
            ? { ...mov, status: "conciliado", movimentoBancarioId: movBancarioId, dataConciliacao: new Date() }
            : mov,
        ),
      )
    } catch (error) {
      console.error("Erro na conciliação manual:", error)
      throw error
    }
  }

  return {
    conciliacoes,
    movimentosBancarios,
    movimentosFinanceiros,
    loading,
    importarExtrato,
    executarMatchingAutomatico,
    conciliarManual,
  }
}
