"use client"

import { useState, useEffect } from "react"
import type { Usuario, LogAuditoria } from "@/lib/types"
import { mockUsuarios, mockLogs } from "@/lib/mock-data"

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [logs, setLogs] = useState<LogAuditoria[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsuarios(mockUsuarios)
      setLogs(mockLogs)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const criarUsuario = async (dadosUsuario: Omit<Usuario, "id" | "dataCriacao" | "ultimoLogin">) => {
    try {
      const novoUsuario: Usuario = {
        ...dadosUsuario,
        id: `user-${Date.now()}`,
        dataCriacao: new Date(),
        ultimoLogin: null,
        status: "ativo" as const,
      }

      setUsuarios((prev) => [novoUsuario, ...prev])

      // Mock audit log
      const novoLog: LogAuditoria = {
        id: `log-${Date.now()}`,
        acao: "criar_usuario",
        entidade: "usuario",
        entidadeId: novoUsuario.id,
        usuarioId: "current-user",
        timestamp: new Date(),
        detalhes: `Usuário ${dadosUsuario.nome} criado`,
        ip: "127.0.0.1",
      }

      setLogs((prev) => [novoLog, ...prev])

      return { success: true, id: novoUsuario.id }
    } catch (error) {
      console.error("Erro ao criar usuário:", error)
      throw error
    }
  }

  const atualizarUsuario = async (id: string, dadosUsuario: Partial<Usuario>) => {
    try {
      setUsuarios((prev) => prev.map((user) => (user.id === id ? { ...user, ...dadosUsuario } : user)))

      // Mock audit log
      const novoLog: LogAuditoria = {
        id: `log-${Date.now()}`,
        acao: "atualizar_usuario",
        entidade: "usuario",
        entidadeId: id,
        usuarioId: "current-user",
        timestamp: new Date(),
        detalhes: `Usuário atualizado`,
        ip: "127.0.0.1",
      }

      setLogs((prev) => [novoLog, ...prev])

      return { success: true }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
      throw error
    }
  }

  const alterarStatusUsuario = async (id: string, status: "ativo" | "inativo") => {
    try {
      setUsuarios((prev) => prev.map((user) => (user.id === id ? { ...user, status } : user)))

      // Mock audit log
      const novoLog: LogAuditoria = {
        id: `log-${Date.now()}`,
        acao: status === "ativo" ? "ativar_usuario" : "desativar_usuario",
        entidade: "usuario",
        entidadeId: id,
        usuarioId: "current-user",
        timestamp: new Date(),
        detalhes: `Usuário ${status === "ativo" ? "ativado" : "desativado"}`,
        ip: "127.0.0.1",
      }

      setLogs((prev) => [novoLog, ...prev])

      return { success: true }
    } catch (error) {
      console.error("Erro ao alterar status do usuário:", error)
      throw error
    }
  }

  const buscarLogs = async (filtros: {
    usuarioId?: string
    acao?: string
    entidade?: string
    dataInicio?: Date
    dataFim?: Date
  }) => {
    try {
      return logs.filter((log) => {
        if (filtros.usuarioId && log.usuarioId !== filtros.usuarioId) return false
        if (filtros.acao && log.acao !== filtros.acao) return false
        if (filtros.entidade && log.entidade !== filtros.entidade) return false
        if (filtros.dataInicio && log.timestamp < filtros.dataInicio) return false
        if (filtros.dataFim && log.timestamp > filtros.dataFim) return false
        return true
      })
    } catch (error) {
      console.error("Erro ao buscar logs:", error)
      throw error
    }
  }

  return {
    usuarios,
    logs,
    loading,
    criarUsuario,
    atualizarUsuario,
    alterarStatusUsuario,
    buscarLogs,
  }
}
