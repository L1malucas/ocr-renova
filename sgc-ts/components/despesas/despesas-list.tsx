"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, Trash2, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { useDespesas } from "@/hooks/use-despesas"
import type { Despesa } from "@/lib/types"
import { DespesaDrawer } from "./despesa-drawer"

interface DespesasListProps {
  onCreateNew: () => void
}

export function DespesasList({ onCreateNew }: DespesasListProps) {
  const { despesas, loading } = useDespesas()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedDespesa, setSelectedDespesa] = useState<Despesa | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filteredDespesas = despesas.filter((despesa) => {
    const matchesSearch =
      despesa.numero_documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || despesa.status_aprovacao === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const config = {
      Rascunho: { variant: "secondary" as const, color: "bg-gray-100 text-gray-800", icon: Edit },
      "Em Aprovação": { variant: "default" as const, color: "bg-yellow-100 text-yellow-800", icon: Clock },
      Aprovado: { variant: "default" as const, color: "bg-green-100 text-green-800", icon: CheckCircle },
      Rejeitado: { variant: "destructive" as const, color: "bg-red-100 text-red-800", icon: XCircle },
      Pago: { variant: "default" as const, color: "bg-blue-100 text-blue-800", icon: CheckCircle },
    }

    const { variant, color, icon: Icon } = config[status as keyof typeof config] || config.Rascunho

    return (
      <Badge variant={variant} className={color}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const getVencimentoStatus = (vencimento: Date) => {
    const hoje = new Date()
    const diffDays = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return <Badge variant="destructive">Vencida</Badge>
    } else if (diffDays <= 7) {
      return <Badge className="bg-orange-100 text-orange-800">Vence em {diffDays}d</Badge>
    }
    return null
  }

  const handleViewDetails = (despesa: Despesa) => {
    setSelectedDespesa(despesa)
    setDrawerOpen(true)
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">Carregando despesas...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Gestão de Despesas</h1>
          <p className="text-muted-foreground">Controle todo o ciclo de vida das despesas e aprovações</p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Despesa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Rascunhos</p>
                <p className="text-2xl font-bold">{despesas.filter((d) => d.status_aprovacao === "Rascunho").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Em Aprovação</p>
                <p className="text-2xl font-bold">
                  {despesas.filter((d) => d.status_aprovacao === "Em Aprovação").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Aprovadas</p>
                <p className="text-2xl font-bold">{despesas.filter((d) => d.status_aprovacao === "Aprovado").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Vencidas</p>
                <p className="text-2xl font-bold">
                  {despesas.filter((d) => d.data_vencimento < new Date() && d.status_pagamento !== "Pago").length}
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
                  placeholder="Buscar por número do documento ou descrição..."
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
                <SelectItem value="Rascunho">Rascunho</SelectItem>
                <SelectItem value="Em Aprovação">Em Aprovação</SelectItem>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
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
                <TableHead>Documento</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDespesas.map((despesa) => (
                <TableRow key={despesa.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{despesa.numero_documento}</TableCell>
                  <TableCell>{despesa.fornecedor_id}</TableCell>
                  <TableCell className="max-w-xs truncate">{despesa.descricao}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{despesa.data_vencimento.toLocaleDateString("pt-BR")}</span>
                      {getVencimentoStatus(despesa.data_vencimento)}
                    </div>
                  </TableCell>
                  <TableCell>
                    R$ {despesa.valor_liquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{getStatusBadge(despesa.status_aprovacao)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(despesa)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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

      {/* Drawer for details */}
      <DespesaDrawer despesa={selectedDespesa} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
