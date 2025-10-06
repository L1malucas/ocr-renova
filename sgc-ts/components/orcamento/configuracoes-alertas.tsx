"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Plus, Edit, Trash2, AlertTriangle, Target, DollarSign, Calendar, Users, Settings } from "lucide-react"

interface AlertaConfig {
  id: string
  nome: string
  tipo: "contrato" | "categoria" | "item" | "plano" | "geral"
  entidade: string
  condicao: "percentual" | "valor_absoluto" | "prazo" | "aprovacao"
  limite: number
  operador: "maior_que" | "menor_que" | "igual_a" | "entre"
  valor_min?: number
  valor_max?: number
  ativo: boolean
  notificacao_email: boolean
  notificacao_sistema: boolean
  destinatarios: string[]
  frequencia: "imediata" | "diaria" | "semanal"
  descricao: string
  cor: string
}

export function ConfiguracoesAlertas() {
  const [alertas, setAlertas] = useState<AlertaConfig[]>([
    {
      id: "1",
      nome: "Execução Orçamentária Alta",
      tipo: "contrato",
      entidade: "Contrato BNDES 2024",
      condicao: "percentual",
      limite: 85,
      operador: "maior_que",
      ativo: true,
      notificacao_email: true,
      notificacao_sistema: true,
      destinatarios: ["gestor@ong.org", "financeiro@ong.org"],
      frequencia: "imediata",
      descricao: "Alerta quando execução ultrapassar 85% do orçamento",
      cor: "amber",
    },
    {
      id: "2",
      nome: "Prazo de Prestação de Contas",
      tipo: "contrato",
      entidade: "Todos os Contratos",
      condicao: "prazo",
      limite: 30,
      operador: "menor_que",
      ativo: true,
      notificacao_email: true,
      notificacao_sistema: true,
      destinatarios: ["contabilidade@ong.org"],
      frequencia: "semanal",
      descricao: "Alerta 30 dias antes do vencimento da prestação de contas",
      cor: "red",
    },
    {
      id: "3",
      nome: "Categoria Pessoal Crítica",
      tipo: "categoria",
      entidade: "Pessoal e Encargos",
      condicao: "percentual",
      limite: 90,
      operador: "maior_que",
      ativo: true,
      notificacao_email: true,
      notificacao_sistema: true,
      destinatarios: ["rh@ong.org", "diretoria@ong.org"],
      frequencia: "imediata",
      descricao: "Alerta crítico para categoria de pessoal",
      cor: "red",
    },
  ])

  const [novoAlerta, setNovoAlerta] = useState<Partial<AlertaConfig>>({
    tipo: "contrato",
    condicao: "percentual",
    operador: "maior_que",
    ativo: true,
    notificacao_email: true,
    notificacao_sistema: true,
    destinatarios: [],
    frequencia: "imediata",
    cor: "blue",
  })

  const [dialogAberto, setDialogAberto] = useState(false)

  const adicionarAlerta = () => {
    if (novoAlerta.nome && novoAlerta.limite) {
      const alerta: AlertaConfig = {
        id: Date.now().toString(),
        nome: novoAlerta.nome,
        tipo: novoAlerta.tipo || "contrato",
        entidade: novoAlerta.entidade || "",
        condicao: novoAlerta.condicao || "percentual",
        limite: novoAlerta.limite,
        operador: novoAlerta.operador || "maior_que",
        ativo: novoAlerta.ativo || true,
        notificacao_email: novoAlerta.notificacao_email || true,
        notificacao_sistema: novoAlerta.notificacao_sistema || true,
        destinatarios: novoAlerta.destinatarios || [],
        frequencia: novoAlerta.frequencia || "imediata",
        descricao: novoAlerta.descricao || "",
        cor: novoAlerta.cor || "blue",
      }
      setAlertas([...alertas, alerta])
      setNovoAlerta({
        tipo: "contrato",
        condicao: "percentual",
        operador: "maior_que",
        ativo: true,
        notificacao_email: true,
        notificacao_sistema: true,
        destinatarios: [],
        frequencia: "imediata",
        cor: "blue",
      })
      setDialogAberto(false)
    }
  }

  const toggleAlerta = (id: string) => {
    setAlertas(alertas.map((alerta) => (alerta.id === id ? { ...alerta, ativo: !alerta.ativo } : alerta)))
  }

  const removerAlerta = (id: string) => {
    setAlertas(alertas.filter((alerta) => alerta.id !== id))
  }

  const getCorBadge = (cor: string) => {
    const cores = {
      blue: "bg-blue-100 text-blue-800",
      amber: "bg-amber-100 text-amber-800",
      red: "bg-red-100 text-red-800",
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  const getTipoIcon = (tipo: string) => {
    const icons = {
      contrato: <Target className="h-4 w-4" />,
      categoria: <DollarSign className="h-4 w-4" />,
      item: <Settings className="h-4 w-4" />,
      plano: <Calendar className="h-4 w-4" />,
      geral: <Users className="h-4 w-4" />,
    }
    return icons[tipo as keyof typeof icons] || icons.geral
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <Bell className="h-5 w-5" />
                Configurações de Alertas Orçamentários
              </CardTitle>
              <p className="text-orange-700 mt-1">
                Configure alertas personalizados para monitoramento proativo do orçamento
              </p>
            </div>
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Alerta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Configurar Novo Alerta</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome do Alerta</Label>
                      <Input
                        id="nome"
                        value={novoAlerta.nome || ""}
                        onChange={(e) => setNovoAlerta({ ...novoAlerta, nome: e.target.value })}
                        placeholder="Ex: Execução Alta - Projeto X"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tipo">Tipo de Entidade</Label>
                      <Select
                        value={novoAlerta.tipo}
                        onValueChange={(value) => setNovoAlerta({ ...novoAlerta, tipo: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contrato">Contrato</SelectItem>
                          <SelectItem value="categoria">Categoria</SelectItem>
                          <SelectItem value="item">Item Orçamentário</SelectItem>
                          <SelectItem value="plano">Plano de Trabalho</SelectItem>
                          <SelectItem value="geral">Geral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="entidade">Entidade Específica</Label>
                    <Input
                      id="entidade"
                      value={novoAlerta.entidade || ""}
                      onChange={(e) => setNovoAlerta({ ...novoAlerta, entidade: e.target.value })}
                      placeholder="Ex: Contrato BNDES 2024, Categoria Pessoal, etc."
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="condicao">Condição</Label>
                      <Select
                        value={novoAlerta.condicao}
                        onValueChange={(value) => setNovoAlerta({ ...novoAlerta, condicao: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentual">Percentual (%)</SelectItem>
                          <SelectItem value="valor_absoluto">Valor Absoluto (R$)</SelectItem>
                          <SelectItem value="prazo">Prazo (dias)</SelectItem>
                          <SelectItem value="aprovacao">Aprovação Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="operador">Operador</Label>
                      <Select
                        value={novoAlerta.operador}
                        onValueChange={(value) => setNovoAlerta({ ...novoAlerta, operador: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maior_que">Maior que</SelectItem>
                          <SelectItem value="menor_que">Menor que</SelectItem>
                          <SelectItem value="igual_a">Igual a</SelectItem>
                          <SelectItem value="entre">Entre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="limite">Valor Limite</Label>
                      <Input
                        id="limite"
                        type="number"
                        value={novoAlerta.limite || ""}
                        onChange={(e) => setNovoAlerta({ ...novoAlerta, limite: Number(e.target.value) })}
                        placeholder="Ex: 85, 50000, 30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={novoAlerta.descricao || ""}
                      onChange={(e) => setNovoAlerta({ ...novoAlerta, descricao: e.target.value })}
                      placeholder="Descreva quando este alerta deve ser acionado..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="frequencia">Frequência</Label>
                      <Select
                        value={novoAlerta.frequencia}
                        onValueChange={(value) => setNovoAlerta({ ...novoAlerta, frequencia: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imediata">Imediata</SelectItem>
                          <SelectItem value="diaria">Diária</SelectItem>
                          <SelectItem value="semanal">Semanal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cor">Cor do Alerta</Label>
                      <Select
                        value={novoAlerta.cor}
                        onValueChange={(value) => setNovoAlerta({ ...novoAlerta, cor: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Azul (Info)</SelectItem>
                          <SelectItem value="amber">Amarelo (Atenção)</SelectItem>
                          <SelectItem value="red">Vermelho (Crítico)</SelectItem>
                          <SelectItem value="green">Verde (Sucesso)</SelectItem>
                          <SelectItem value="purple">Roxo (Especial)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="email"
                        checked={novoAlerta.notificacao_email}
                        onCheckedChange={(checked) => setNovoAlerta({ ...novoAlerta, notificacao_email: checked })}
                      />
                      <Label htmlFor="email">Notificação por Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="sistema"
                        checked={novoAlerta.notificacao_sistema}
                        onCheckedChange={(checked) => setNovoAlerta({ ...novoAlerta, notificacao_sistema: checked })}
                      />
                      <Label htmlFor="sistema">Notificação no Sistema</Label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setDialogAberto(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={adicionarAlerta} className="bg-orange-600 hover:bg-orange-700">
                      Criar Alerta
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Estatísticas dos Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Alertas</p>
                <p className="text-2xl font-bold text-gray-900">{alertas.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertas Ativos</p>
                <p className="text-2xl font-bold text-green-600">{alertas.filter((a) => a.ativo).length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertas Críticos</p>
                <p className="text-2xl font-bold text-red-600">
                  {alertas.filter((a) => a.cor === "red" && a.ativo).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notificações Hoje</p>
                <p className="text-2xl font-bold text-amber-600">12</p>
              </div>
              <Bell className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alertas Configurados */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Configurados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTipoIcon(alerta.tipo)}
                    <Badge className={getCorBadge(alerta.cor)}>{alerta.tipo.toUpperCase()}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium">{alerta.nome}</h4>
                    <p className="text-sm text-gray-600">{alerta.descricao}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        {alerta.entidade} • {alerta.operador.replace("_", " ")} {alerta.limite}
                        {alerta.condicao === "percentual"
                          ? "%"
                          : alerta.condicao === "valor_absoluto"
                            ? " R$"
                            : " dias"}
                      </span>
                      <span className="text-xs text-gray-500">Frequência: {alerta.frequencia}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={alerta.ativo} onCheckedChange={() => toggleAlerta(alerta.id)} />
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removerAlerta(alerta.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Templates de Alertas Pré-configurados */}
      <Card>
        <CardHeader>
          <CardTitle>Templates de Alertas Recomendados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-medium text-blue-900">Execução Orçamentária</h4>
              <p className="text-sm text-blue-700 mt-1">Alertas para controle de execução por contrato e categoria</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Aplicar Template
              </Button>
            </div>
            <div className="p-4 border rounded-lg bg-amber-50">
              <h4 className="font-medium text-amber-900">Prazos de Prestação</h4>
              <p className="text-sm text-amber-700 mt-1">Alertas para vencimentos e entregas obrigatórias</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Aplicar Template
              </Button>
            </div>
            <div className="p-4 border rounded-lg bg-red-50">
              <h4 className="font-medium text-red-900">Alertas Críticos</h4>
              <p className="text-sm text-red-700 mt-1">Alertas para situações que requerem ação imediata</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Aplicar Template
              </Button>
            </div>
            <div className="p-4 border rounded-lg bg-green-50">
              <h4 className="font-medium text-green-900">Compliance</h4>
              <p className="text-sm text-green-700 mt-1">Alertas para conformidade e auditoria</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Aplicar Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
