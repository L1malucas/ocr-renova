"use client"

import { useState, useEffect } from "react"
import type { Recebimento, FonteRecurso, RateioRecebimento } from "@/lib/types"
import { mockRecebimentos, mockFontesRecurso } from "@/lib/mock-data"
import { useAuth } from "./use-auth"

export function useReceitas() {
  const [recebimentos, setRecebimentos] = useState<Recebimento[]>([])
  const [fontesRecurso, setFontesRecurso] = useState<FonteRecurso[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const timer = setTimeout(() => {
      setRecebimentos(mockRecebimentos)
      setFontesRecurso(mockFontesRecurso)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [user])

  const createRecebimento = async (recebimento: Omit<Recebimento, "id" | "created_at" | "updated_at">) => {
    if (!user) throw new Error("User not authenticated")

    const newRecebimento: Recebimento = {
      ...recebimento,
      id: `rec-${Date.now()}`,
      created_by: user.id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    setRecebimentos((prev) => [newRecebimento, ...prev])
    return newRecebimento.id
  }

  const updateRecebimento = async (id: string, updates: Partial<Recebimento>) => {
    setRecebimentos((prev) => prev.map((rec) => (rec.id === id ? { ...rec, ...updates, updated_at: new Date() } : rec)))
  }

  const deleteRecebimento = async (id: string) => {
    setRecebimentos((prev) => prev.filter((rec) => rec.id !== id))
  }

  const createFonteRecurso = async (fonte: Omit<FonteRecurso, "id" | "created_at" | "updated_at">) => {
    const newFonte: FonteRecurso = {
      ...fonte,
      id: `fonte-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
    }

    setFontesRecurso((prev) => [newFonte, ...prev])
    return newFonte.id
  }

  const createRateio = async (rateio: Omit<RateioRecebimento, "id">) => {
    const newRateio: RateioRecebimento = {
      ...rateio,
      id: `rateio-${Date.now()}`,
    }
    return newRateio.id
  }

  return {
    recebimentos,
    fontesRecurso,
    loading,
    createRecebimento,
    updateRecebimento,
    deleteRecebimento,
    createFonteRecurso,
    createRateio,
  }
}
