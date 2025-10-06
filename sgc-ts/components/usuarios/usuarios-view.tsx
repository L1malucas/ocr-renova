"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsuariosList } from "./usuarios-list"
import { UsuarioForm } from "./usuario-form"
import { AuditoriaLogs } from "./auditoria-logs"
import { Card, CardContent } from "@/components/ui/card"
import { useUsuarios } from "@/hooks/use-usuarios"
import type { Usuario } from "@/lib/types"
import { Users, Shield, UserCheck, UserX } from "lucide-react"

export function UsuariosView() {
  const [showForm, setShowForm] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<Usuario | undefined>()
  const { usuarios, logs, loading } = useUsuarios()

  const stats = {
    totalUsuarios: usuarios.length,
    usuariosAtivos: usuarios.filter((u) => u.status === "ativo").length,
    usuariosInativos: usuarios.filter((u) => u.status === "inativo").length,
    totalLogs: logs.length,
  }

  const handleEditUsuario = (usuario: Usuario) => {
    setEditingUsuario(usuario)
    setShowForm(true)
  }

  const handleNovoUsuario = () => {
    setEditingUsuario(undefined)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingUsuario(undefined)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingUsuario(undefined)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{editingUsuario ? "Editar Usuário" : "Novo Usuário"}</h1>
          <p className="text-gray-600 mt-2">
            {editingUsuario ? "Atualize as informações do usuário" : "Adicione um novo usuário ao sistema"}
          </p>
        </div>

        <UsuarioForm usuario={editingUsuario} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Usuários e Auditoria</h1>
        <p className="text-gray-600 mt-2">Gerencie usuários do sistema e monitore atividades</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsuarios}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-green-600">{stats.usuariosAtivos}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Inativos</p>
                <p className="text-2xl font-bold text-red-600">{stats.usuariosInativos}</p>
              </div>
              <UserX className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Logs de Auditoria</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalLogs}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usuarios" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="usuarios">Gerenciar Usuários</TabsTrigger>
          <TabsTrigger value="auditoria">Logs de Auditoria</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios">
          <UsuariosList onEditUsuario={handleEditUsuario} onNovoUsuario={handleNovoUsuario} />
        </TabsContent>

        <TabsContent value="auditoria">
          <AuditoriaLogs />
        </TabsContent>
      </Tabs>
    </div>
  )
}
