"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Eye, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

const mockExecucao = [
  {
    id: "1.1.1",
    meta: "Capacitar 100 jovens em tecnologia",
    acao: "Realizar oficinas de programação",
    itemDespesa: "Instrutor - Programação Básica",
    categoria: "Recursos Humanos",
    orcadoMes: 8000,
    realizadoMes: 7500,
    orcadoAcumulado: 32000,
    realizadoAcumulado: 28500,
    saldo: 3500,
    percentualExec: 89.1,
    despesasVinculadas: [{ id: 1, descricao: "Pagamento Instrutor João - Janeiro", valor: 7500, data: "2024-01-15" }],
  },
  {
    id: "1.1.2",
    meta: "Capacitar 100 jovens em tecnologia",
    acao: "Realizar oficinas de programação",
    itemDespesa: "Material Didático - Apostilas",
    categoria: "Material de Consumo",
    orcadoMes: 2000,
    realizadoMes: 2150,
    orcadoAcumulado: 8000,
    realizadoAcumulado: 8650,
    saldo: -650,
    percentualExec: 108.1,
    despesasVinculadas: [{ id: 2, descricao: "Compra Apostilas - Editora ABC", valor: 2150, data: "2024-01-10" }],
  },
  {
    id: "1.2.1",
    meta: "Capacitar 100 jovens em tecnologia",
    acao: "Equipar laboratório de informática",
    itemDespesa: "Computadores Desktop",
    categoria: "Material Permanente",
    orcadoMes: 0,
    realizadoMes: 0,
    orcadoAcumulado: 50000,
    realizadoAcumulado: 0,
    saldo: 50000,
    percentualExec: 0,
    despesasVinculadas: [],
  },
]

export function ExecucaoPlanejado() {
  const [filtros, setFiltros] = useState({
    periodo: "2024-01",
    contrato: "",
    projeto: "",
  })
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusColor = (percentual: number) => {
    if (percentual <= 70) return "text-emerald-600"
    if (percentual <= 90) return "text-amber-600"
    if (percentual <= 100) return "text-orange-600"
    return "text-red-600"
  }

  const getStatusIcon = (percentual: number) => {
    if (percentual <= 90) return <TrendingUp className="h-4 w-4" />
    if (percentual <= 100) return <AlertTriangle className="h-4 w-4" />
    return <TrendingDown className="h-4 w-4" />
  }

  const getStatusBadge = (percentual: number) => {
    if (percentual <= 70) return <Badge className="bg-emerald-100 text-emerald-800">Saudável</Badge>
    if (percentual <= 90) return <Badge className="bg-amber-100 text-amber-800">Atenção</Badge>
    if (percentual <= 100) return <Badge className="bg-orange-100 text-orange-800">Crítico</Badge>
    return <Badge className="bg-red-100 text-red-800">Excedido</Badge>
  }

  const handleDrillDown = (item: any) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const totalOrcado = mockExecucao.reduce((sum, item) => sum + item.orcadoAcumulado, 0)
  const totalRealizado = mockExecucao.reduce((sum, item) => sum + item.realizadoAcumulado, 0)
  const execucaoGeral = (totalRealizado / totalOrcado) * 100

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoramento: Execução vs. Planejado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Período</label>
              <Select value={filtros.periodo} onValueChange={(value) => setFiltros({ ...filtros, periodo: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">Janeiro 2024</SelectItem>
                  <SelectItem value="2024-02">Fevereiro 2024</SelectItem>
                  <SelectItem value="2024-03">Março 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Contrato</label>
              <Select value={filtros.contrato} onValueChange={(value) => setFiltros({ ...filtros, contrato: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os contratos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Convênio Fundação ABC</SelectItem>
                  <SelectItem value="2">Projeto Instituto XYZ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Projeto/Meta</label>
              <Select value={filtros.projeto} onValueChange={(value) => setFiltros({ ...filtros, projeto: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os projetos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Capacitar 100 jovens</SelectItem>
                  <SelectItem value="2">Educação Ambiental</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">Aplicar Filtros</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Execução Geral</p>
                <p className="text-2xl font-bold">{execucaoGeral.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={execucaoGeral} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orçado</p>
                <p className="text-2xl font-bold">R$ {totalOrcado.toLocaleString()}</p>
              </div>
              <div className="text-blue-500">📊</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Realizado</p>
                <p className="text-2xl font-bold">R$ {totalRealizado.toLocaleString()}</p>
              </div>
              <div className="text-emerald-500">💰</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Comparativa */}
      <Card>
        <CardHeader>
          <CardTitle>Execução Detalhada por Item Orçamentário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Item de Despesa</th>
                  <th className="text-left p-3">Categoria</th>
                  <th className="text-right p-3">Orçado (Mês)</th>
                  <th className="text-right p-3">Realizado (Mês)</th>
                  <th className="text-right p-3">Orçado (Acum.)</th>
                  <th className="text-right p-3">Realizado (Acum.)</th>
                  <th className="text-right p-3">Saldo</th>
                  <th className="text-center p-3">% Exec.</th>
                  <th className="text-center p-3">Status</th>
                  <th className="text-center p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockExecucao.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{item.itemDespesa}</div>
                        <div className="text-sm text-gray-500">{item.meta}</div>
                        <div className="text-xs text-gray-400">{item.acao}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{item.categoria}</Badge>
                    </td>
                    <td className="p-3 text-right">R$ {item.orcadoMes.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <Button variant="link" className="p-0 h-auto font-normal" onClick={() => handleDrillDown(item)}>
                        R$ {item.realizadoMes.toLocaleString()}
                      </Button>
                    </td>
                    <td className="p-3 text-right">R$ {item.orcadoAcumulado.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <Button variant="link" className="p-0 h-auto font-normal" onClick={() => handleDrillDown(item)}>
                        R$ {item.realizadoAcumulado.toLocaleString()}
                      </Button>
                    </td>
                    <td
                      className={`p-3 text-right font-medium ${item.saldo < 0 ? "text-red-600" : "text-emerald-600"}`}
                    >
                      R$ {item.saldo.toLocaleString()}
                    </td>
                    <td className={`p-3 text-center font-medium ${getStatusColor(item.percentualExec)}`}>
                      <div className="flex items-center justify-center gap-1">
                        {getStatusIcon(item.percentualExec)}
                        {item.percentualExec.toFixed(1)}%
                      </div>
                    </td>
                    <td className="p-3 text-center">{getStatusBadge(item.percentualExec)}</td>
                    <td className="p-3 text-center">
                      <Button size="sm" variant="ghost" onClick={() => handleDrillDown(item)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Drill-Down */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Despesas Vinculadas: {selectedItem?.itemDespesa}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
              <div>
                <p className="text-sm text-gray-600">Orçado (Acumulado)</p>
                <p className="text-lg font-bold">R$ {selectedItem?.orcadoAcumulado.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Realizado (Acumulado)</p>
                <p className="text-lg font-bold">R$ {selectedItem?.realizadoAcumulado.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Despesas Individuais</h4>
              <div className="space-y-2">
                {selectedItem?.despesasVinculadas.map((despesa: any) => (
                  <div key={despesa.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{despesa.descricao}</p>
                      <p className="text-sm text-gray-500">{despesa.data}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ {despesa.valor.toLocaleString()}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                ))}
                {selectedItem?.despesasVinculadas.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhuma despesa vinculada ainda</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
