"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Eye, Clock, AlertTriangle } from "lucide-react"
import { useDespesas } from "@/hooks/use-despesas"
import { useState } from "react"
import { DespesaDrawer } from "./despesa-drawer"
import type { Despesa } from "@/lib/types"

export function AprovacaoInbox() {
  const { despesasPendentes, loading } = useDespesas()
  const [selectedDespesa, setSelectedDespesa] = useState<Despesa | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleViewDetails = (despesa: Despesa) => {
    setSelectedDespesa(despesa)
    setDrawerOpen(true)
  }

  const getPriorityBadge = (valor: number) => {
    if (valor > 10000) {
      return <Badge variant="destructive">Alta</Badge>
    } else if (valor > 5000) {
      return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>
    }
    return <Badge variant="secondary">Baixa</Badge>
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

  if (loading) {
    return <div className="flex items-center justify-center p-8">Carregando aprovações pendentes...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Caixa de Entrada - Aprovações</h1>
        <p className="text-muted-foreground">Despesas aguardando sua aprovação</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold">{despesasPendentes.length}</p>
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
                  {despesasPendentes.filter((d) => d.data_vencimento < new Date()).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">
                  R${" "}
                  {despesasPendentes
                    .reduce((sum, d) => sum + d.valor_liquido, 0)
                    .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas Pendentes de Aprovação</CardTitle>
          <CardDescription>Clique em uma despesa para ver detalhes e aprovar/rejeitar</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {despesasPendentes.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <p className="text-lg font-medium">Nenhuma aprovação pendente</p>
              <p className="text-sm">Todas as despesas foram processadas!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Saldo Orçamento</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {despesasPendentes.map((despesa) => (
                  <TableRow key={despesa.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{despesa.created_by}</TableCell>
                    <TableCell>{despesa.numero_documento}</TableCell>
                    <TableCell>{despesa.fornecedor_id}</TableCell>
                    <TableCell>{despesa.projeto_id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span>{despesa.data_vencimento.toLocaleDateString("pt-BR")}</span>
                        {getVencimentoStatus(despesa.data_vencimento)}
                      </div>
                    </TableCell>
                    <TableCell>
                      R$ {despesa.valor_liquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>{getPriorityBadge(despesa.valor_liquido)}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">R$ 25.000</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(despesa)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Drawer for details */}
      <DespesaDrawer despesa={selectedDespesa} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
