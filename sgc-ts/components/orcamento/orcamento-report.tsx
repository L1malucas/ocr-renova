"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"
import { useOrcamento } from "@/hooks/use-orcamento"
import { useState } from "react"
import type { Orcamento } from "@/lib/types"

interface OrcamentoReportProps {
  orcamento: Orcamento
}

// Mock data for demonstration
const mockExecucao = [
  {
    categoria: "Pessoal",
    previsto: 120000,
    realizado: 85000,
    comprometido: 15000,
    percentual: 83.3,
  },
  {
    categoria: "Administrativo",
    previsto: 45000,
    realizado: 32000,
    comprometido: 8000,
    percentual: 88.9,
  },
  {
    categoria: "Projetos",
    previsto: 200000,
    realizado: 156000,
    comprometido: 25000,
    percentual: 90.5,
  },
  {
    categoria: "Infraestrutura",
    previsto: 35000,
    realizado: 28000,
    comprometido: 5000,
    percentual: 94.3,
  },
]

export function OrcamentoReport({ orcamento }: OrcamentoReportProps) {
  const { categorias } = useOrcamento()
  const [periodoFilter, setPeriodoFilter] = useState("anual")

  const getStatusColor = (percentual: number) => {
    if (percentual >= 100) return "text-red-600"
    if (percentual >= 80) return "text-yellow-600"
    return "text-green-600"
  }

  const getStatusIcon = (percentual: number) => {
    if (percentual >= 100) return <AlertTriangle className="h-4 w-4 text-red-600" />
    if (percentual >= 80) return <TrendingUp className="h-4 w-4 text-yellow-600" />
    return <CheckCircle className="h-4 w-4 text-green-600" />
  }

  const totalPrevisto = mockExecucao.reduce((sum, item) => sum + item.previsto, 0)
  const totalRealizado = mockExecucao.reduce((sum, item) => sum + item.realizado, 0)
  const totalComprometido = mockExecucao.reduce((sum, item) => sum + item.comprometido, 0)
  const percentualGeral = ((totalRealizado + totalComprometido) / totalPrevisto) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Relatório Orçamentário</h1>
          <p className="text-muted-foreground">{orcamento.nome}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={periodoFilter} onValueChange={setPeriodoFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anual">Anual</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline">v{orcamento.versao}</Badge>
          <Badge className="bg-green-100 text-green-800">{orcamento.status}</Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Orçado</p>
                <p className="text-2xl font-bold">
                  R$ {totalPrevisto.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
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
                <p className="text-sm text-muted-foreground">Realizado</p>
                <p className="text-2xl font-bold">
                  R$ {totalRealizado.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Comprometido</p>
                <p className="text-2xl font-bold">
                  R$ {totalComprometido.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(percentualGeral)}
              <div>
                <p className="text-sm text-muted-foreground">Execução</p>
                <p className={`text-2xl font-bold ${getStatusColor(percentualGeral)}`}>{percentualGeral.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Execution Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso da Execução</CardTitle>
          <CardDescription>Acompanhamento detalhado por categoria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockExecucao.map((item) => (
            <div key={item.categoria} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.categoria}</span>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">
                    R$ {(item.realizado + item.comprometido).toLocaleString("pt-BR")} / R${" "}
                    {item.previsto.toLocaleString("pt-BR")}
                  </span>
                  <span className={`font-medium ${getStatusColor(item.percentual)}`}>{item.percentual}%</span>
                </div>
              </div>
              <Progress value={item.percentual} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Realizado: R$ {item.realizado.toLocaleString("pt-BR")}</span>
                <span>Comprometido: R$ {item.comprometido.toLocaleString("pt-BR")}</span>
                <span>Saldo: R$ {(item.previsto - item.realizado - item.comprometido).toLocaleString("pt-BR")}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Categoria</CardTitle>
          <CardDescription>Análise completa da execução orçamentária</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Previsto</TableHead>
                <TableHead className="text-right">Realizado</TableHead>
                <TableHead className="text-right">Comprometido</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
                <TableHead className="text-right">% Execução</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExecucao.map((item) => {
                const saldo = item.previsto - item.realizado - item.comprometido
                return (
                  <TableRow key={item.categoria}>
                    <TableCell className="font-medium">{item.categoria}</TableCell>
                    <TableCell className="text-right">
                      R$ {item.previsto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {item.realizado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {item.comprometido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className={`text-right ${saldo < 0 ? "text-red-600" : "text-green-600"}`}>
                      R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className={`text-right ${getStatusColor(item.percentual)}`}>
                      {item.percentual.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.percentual)}
                        <span className="text-sm">
                          {item.percentual >= 100 ? "Excedido" : item.percentual >= 80 ? "Atenção" : "Normal"}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alertas de Orçamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Categoria "Projetos" atingiu 90% da execução</p>
              <p>• Categoria "Infraestrutura" próxima do limite (94%)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Performance Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Execução dentro do planejado: {percentualGeral.toFixed(1)}%</p>
              <p>
                • Saldo disponível: R$ {(totalPrevisto - totalRealizado - totalComprometido).toLocaleString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
