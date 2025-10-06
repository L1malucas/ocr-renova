"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, Trash2, CheckCircle, Clock, FileText, Copy } from "lucide-react"
import { useOrcamento } from "@/hooks/use-orcamento"
import type { Orcamento } from "@/lib/types"

interface OrcamentoListProps {
  onCreateNew: () => void
  onEdit: (orcamento: Orcamento) => void
  onView: (orcamento: Orcamento) => void
}

export function OrcamentoList({ onCreateNew, onEdit, onView }: OrcamentoListProps) {
  const { orcamentos, aprovarOrcamento, criarRevisao, loading } = useOrcamento()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [anoFilter, setAnoFilter] = useState<string>("all")

  const filteredOrcamentos = orcamentos.filter((orcamento) => {
    const matchesSearch = orcamento.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || orcamento.status === statusFilter
    const matchesAno = anoFilter === "all" || orcamento.ano_fiscal.toString() === anoFilter
    return matchesSearch && matchesStatus && matchesAno
  })

  const getStatusBadge = (status: string) => {
    const config = {
      Planejamento: { color: "bg-gray-100 text-gray-800", icon: Edit },
      Aprovado: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      Revisão: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      Fechado: { color: "bg-blue-100 text-blue-800", icon: FileText },
    }

    const { color, icon: Icon } = config[status as keyof typeof config] || config.Planejamento

    return (
      <Badge className={color}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const handleAprovar = async (id: string) => {
    try {
      await aprovarOrcamento(id)
    } catch (error) {
      console.error("Erro ao aprovar orçamento:", error)
    }
  }

  const handleCriarRevisao = async (id: string) => {
    try {
      await criarRevisao(id)
    } catch (error) {
      console.error("Erro ao criar revisão:", error)
    }
  }

  const anosDisponiveis = [...new Set(orcamentos.map((o) => o.ano_fiscal))].sort((a, b) => b - a)

  if (loading) {
    return <div className="flex items-center justify-center p-8">Carregando orçamentos...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Gestão de Orçamento</h1>
          <p className="text-muted-foreground">Planeje, controle e monitore a execução orçamentária</p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Orçamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Em Planejamento</p>
                <p className="text-2xl font-bold">{orcamentos.filter((o) => o.status === "Planejamento").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Aprovados</p>
                <p className="text-2xl font-bold">{orcamentos.filter((o) => o.status === "Aprovado").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Em Revisão</p>
                <p className="text-2xl font-bold">{orcamentos.filter((o) => o.status === "Revisão").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Orçamento Total</p>
                <p className="text-2xl font-bold">
                  R${" "}
                  {orcamentos
                    .filter((o) => o.status === "Aprovado")
                    .reduce((sum, o) => sum + o.total_previsto, 0)
                    .toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome do orçamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Planejamento">Planejamento</SelectItem>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Revisão">Revisão</SelectItem>
                <SelectItem value="Fechado">Fechado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={anoFilter} onValueChange={setAnoFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {anosDisponiveis.map((ano) => (
                  <SelectItem key={ano} value={ano.toString()}>
                    {ano}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ano Fiscal</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Versão</TableHead>
                <TableHead>Total Previsto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrcamentos.map((orcamento) => (
                <TableRow key={orcamento.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{orcamento.nome}</TableCell>
                  <TableCell>{orcamento.ano_fiscal}</TableCell>
                  <TableCell>{orcamento.projeto_id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">v{orcamento.versao}</Badge>
                  </TableCell>
                  <TableCell>
                    R$ {orcamento.total_previsto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{getStatusBadge(orcamento.status)}</TableCell>
                  <TableCell>{orcamento.created_at.toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onView(orcamento)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {orcamento.status === "Planejamento" && (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => onEdit(orcamento)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleAprovar(orcamento.id)}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {orcamento.status === "Aprovado" && (
                        <Button variant="ghost" size="sm" onClick={() => handleCriarRevisao(orcamento.id)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
