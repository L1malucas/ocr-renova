"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Settings, Play, Trash2, Edit, Zap, Target, Filter } from "lucide-react"

const mockRegras = [
  {
    id: 1,
    nome: "IOF Automático",
    tipo: "Categorização",
    condicao: "Descrição contém 'IOF'",
    acao: "Criar despesa na categoria 'Impostos e Taxas Bancárias'",
    ativa: true,
    execucoes: 45,
    ultimaExecucao: "2024-09-15",
  },
  {
    id: 2,
    nome: "Agrupamento PIX Recebidos",
    tipo: "Agrupamento",
    condicao: "Múltiplos PIX no mesmo dia com mesma descrição",
    acao: "Agrupar como único lançamento de receita",
    ativa: true,
    execucoes: 12,
    ultimaExecucao: "2024-09-14",
  },
  {
    id: 3,
    nome: "TED Projetos",
    tipo: "Categorização",
    condicao: "Valor > R$ 10.000 e descrição contém 'PROJETO'",
    acao: "Criar receita na categoria 'Convênios e Projetos'",
    ativa: false,
    execucoes: 8,
    ultimaExecucao: "2024-09-10",
  },
]

export function RegrasAutomacao() {
  const [showNovaRegra, setShowNovaRegra] = useState(false)
  const [regraEditando, setRegraEditando] = useState<number | null>(null)
  const [novaRegra, setNovaRegra] = useState({
    nome: "",
    tipo: "",
    campo: "",
    operador: "",
    valor: "",
    acao: "",
    categoria: "",
    descricao: "",
  })

  const handleSalvarRegra = () => {
    console.log(`[v0] Salvando nova regra:`, novaRegra)
    setShowNovaRegra(false)
    setNovaRegra({
      nome: "",
      tipo: "",
      campo: "",
      operador: "",
      valor: "",
      acao: "",
      categoria: "",
      descricao: "",
    })
    // Mock: adicionar à lista
  }

  const handleToggleRegra = (id: number, ativa: boolean) => {
    console.log(`[v0] ${ativa ? "Ativando" : "Pausando"} regra ${id}`)
  }

  const handleExcluirRegra = (id: number) => {
    console.log(`[v0] Excluindo regra ${id}`)
  }

  const handleTestarRegra = (id: number) => {
    console.log(`[v0] Testando regra ${id}`)
    alert("Regra testada com sucesso! 3 transações seriam afetadas.")
  }

  return (
    <div className="space-y-6">
      {/* Header com Ação */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Regras e Automação</h2>
          <p className="text-slate-600 mt-1">Configure regras para automatizar a conciliação e categorização</p>
        </div>
        <Dialog open={showNovaRegra} onOpenChange={setShowNovaRegra}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nova Regra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Regra de Automação</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Nome da Regra</label>
                  <Input
                    placeholder="Ex: IOF Automático"
                    value={novaRegra.nome}
                    onChange={(e) => setNovaRegra({ ...novaRegra, nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Tipo de Regra</label>
                  <Select value={novaRegra.tipo} onValueChange={(value) => setNovaRegra({ ...novaRegra, tipo: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="categorizacao">Categorização Automática</SelectItem>
                      <SelectItem value="agrupamento">Agrupamento de Transações</SelectItem>
                      <SelectItem value="matching">Matching Inteligente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Condições */}
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5 text-blue-600" />
                    SE (Condições)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Campo</label>
                      <Select
                        value={novaRegra.campo}
                        onValueChange={(value) => setNovaRegra({ ...novaRegra, campo: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Campo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="descricao">Descrição</SelectItem>
                          <SelectItem value="valor">Valor</SelectItem>
                          <SelectItem value="data">Data</SelectItem>
                          <SelectItem value="tipo">Tipo (Crédito/Débito)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Operador</label>
                      <Select
                        value={novaRegra.operador}
                        onValueChange={(value) => setNovaRegra({ ...novaRegra, operador: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Operador" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contem">Contém</SelectItem>
                          <SelectItem value="igual">É igual a</SelectItem>
                          <SelectItem value="maior">Maior que</SelectItem>
                          <SelectItem value="menor">Menor que</SelectItem>
                          <SelectItem value="inicia">Inicia com</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Valor</label>
                      <Input
                        placeholder="Ex: IOF, 1000, etc"
                        value={novaRegra.valor}
                        onChange={(e) => setNovaRegra({ ...novaRegra, valor: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <Card className="bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    ENTÃO (Ações)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Ação</label>
                    <Select
                      value={novaRegra.acao}
                      onValueChange={(value) => setNovaRegra({ ...novaRegra, acao: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a ação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="criar-despesa">Criar despesa automaticamente</SelectItem>
                        <SelectItem value="criar-receita">Criar receita automaticamente</SelectItem>
                        <SelectItem value="agrupar">Agrupar transações similares</SelectItem>
                        <SelectItem value="sugerir-match">Sugerir matching específico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(novaRegra.acao === "criar-despesa" || novaRegra.acao === "criar-receita") && (
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Categoria</label>
                      <Select
                        value={novaRegra.categoria}
                        onValueChange={(value) => setNovaRegra({ ...novaRegra, categoria: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="impostos">Impostos e Taxas Bancárias</SelectItem>
                          <SelectItem value="convenios">Convênios e Projetos</SelectItem>
                          <SelectItem value="doacoes">Doações</SelectItem>
                          <SelectItem value="administrativo">Despesas Administrativas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Descrição da Ação</label>
                    <Textarea
                      placeholder="Descreva o que esta regra fará..."
                      value={novaRegra.descricao}
                      onChange={(e) => setNovaRegra({ ...novaRegra, descricao: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowNovaRegra(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSalvarRegra} className="bg-purple-600 hover:bg-purple-700">
                  Salvar Regra
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Regras */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Settings className="h-5 w-5 text-purple-600" />
            Regras Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Regra</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Condição</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Execuções</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRegras.map((regra) => (
                <TableRow key={regra.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-800">{regra.nome}</p>
                      <p className="text-sm text-slate-600">
                        Última execução: {new Date(regra.ultimaExecucao).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        regra.tipo === "Categorização"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : regra.tipo === "Agrupamento"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-purple-50 text-purple-700 border-purple-200"
                      }
                    >
                      {regra.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-slate-600">{regra.condicao}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-slate-600">{regra.acao}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={regra.ativa}
                        onCheckedChange={(checked) => handleToggleRegra(regra.id, checked)}
                      />
                      <Badge variant={regra.ativa ? "default" : "secondary"}>{regra.ativa ? "Ativa" : "Pausada"}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{regra.execucoes}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleTestarRegra(regra.id)}>
                        <Play className="h-3 w-3 mr-1" />
                        Testar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setRegraEditando(regra.id)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExcluirRegra(regra.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Estatísticas de Automação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Regras Ativas</p>
                <p className="text-2xl font-bold text-blue-900">{mockRegras.filter((r) => r.ativa).length}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Execuções Este Mês</p>
                <p className="text-2xl font-bold text-green-900">
                  {mockRegras.reduce((acc, r) => acc + r.execucoes, 0)}
                </p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Taxa de Automação</p>
                <p className="text-2xl font-bold text-purple-900">78%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
