"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useUsuarios } from "@/hooks/use-usuarios"
import { useToast } from "@/hooks/use-toast"
import type { Usuario } from "@/lib/types"

interface UsuarioFormProps {
  usuario?: Usuario
  onSuccess: () => void
  onCancel: () => void
}

export function UsuarioForm({ usuario, onSuccess, onCancel }: UsuarioFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    papel: "",
    permissoes: [] as string[],
    departamento: "",
    telefone: "",
  })
  const [loading, setLoading] = useState(false)
  const { criarUsuario, atualizarUsuario } = useUsuarios()
  const { toast } = useToast()

  const permissoesDisponiveis = [
    { id: "receitas_criar", label: "Criar Receitas" },
    { id: "receitas_editar", label: "Editar Receitas" },
    { id: "receitas_excluir", label: "Excluir Receitas" },
    { id: "despesas_criar", label: "Criar Despesas" },
    { id: "despesas_editar", label: "Editar Despesas" },
    { id: "despesas_aprovar", label: "Aprovar Despesas" },
    { id: "orcamento_criar", label: "Criar Orçamentos" },
    { id: "orcamento_aprovar", label: "Aprovar Orçamentos" },
    { id: "conciliacao_executar", label: "Executar Conciliação" },
    { id: "relatorios_gerar", label: "Gerar Relatórios" },
    { id: "usuarios_gerenciar", label: "Gerenciar Usuários" },
    { id: "configuracoes_alterar", label: "Alterar Configurações" },
  ]

  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
        permissoes: usuario.permissoes,
        departamento: usuario.departamento || "",
        telefone: usuario.telefone || "",
      })
    }
  }, [usuario])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (usuario) {
        await atualizarUsuario(usuario.id!, formData)
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso",
        })
      } else {
        await criarUsuario(formData)
        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso",
        })
      }
      onSuccess()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar usuário",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePermissaoChange = (permissaoId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissoes: checked ? [...prev.permissoes, permissaoId] : prev.permissoes.filter((p) => p !== permissaoId),
    }))
  }

  const handlePapelChange = (papel: string) => {
    setFormData((prev) => ({ ...prev, papel }))

    // Auto-selecionar permissões baseadas no papel
    let permissoesPadrao: string[] = []
    switch (papel) {
      case "administrador":
        permissoesPadrao = permissoesDisponiveis.map((p) => p.id)
        break
      case "gestor":
        permissoesPadrao = [
          "receitas_criar",
          "receitas_editar",
          "despesas_criar",
          "despesas_editar",
          "despesas_aprovar",
          "orcamento_criar",
          "orcamento_aprovar",
          "conciliacao_executar",
          "relatorios_gerar",
        ]
        break
      case "analista":
        permissoesPadrao = [
          "receitas_criar",
          "receitas_editar",
          "despesas_criar",
          "despesas_editar",
          "orcamento_criar",
          "conciliacao_executar",
        ]
        break
      case "aprovador":
        permissoesPadrao = ["despesas_aprovar", "orcamento_aprovar"]
        break
    }

    setFormData((prev) => ({ ...prev, permissoes: permissoesPadrao }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{usuario ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="papel">Papel</Label>
              <Select value={formData.papel} onValueChange={handlePapelChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="gestor">Gestor</SelectItem>
                  <SelectItem value="analista">Analista</SelectItem>
                  <SelectItem value="aprovador">Aprovador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departamento">Departamento</Label>
              <Input
                id="departamento"
                value={formData.departamento}
                onChange={(e) => setFormData((prev) => ({ ...prev, departamento: e.target.value }))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData((prev) => ({ ...prev, telefone: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Permissões</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {permissoesDisponiveis.map((permissao) => (
                <div key={permissao.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permissao.id}
                    checked={formData.permissoes.includes(permissao.id)}
                    onCheckedChange={(checked) => handlePermissaoChange(permissao.id, checked as boolean)}
                  />
                  <Label htmlFor={permissao.id} className="text-sm">
                    {permissao.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : usuario ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
