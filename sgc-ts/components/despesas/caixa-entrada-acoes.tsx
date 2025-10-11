"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  // Dados reais viriam de um hook ou prop
  const tarefasPendentes: any[] = [] // Array vazio para simular ausência de dados

  const handleAcao = (acao: string, tarefaId: string) => {
    // Lógica de ação seria implementada com mutações da API
    toast({
      title: "Ação Realizada",
      description: `Ação '${acao}' para a tarefa '${tarefaId}' foi executada. (MOCK)`,
    })
    setSelectedAction(null)
    setJustificativa("")
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">MOCK</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">MOCK</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>MOCK</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>MOCK</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>MOCK</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="ml-4">
            MOCK
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">MOCK</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            0 anexo(s): MOCK
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* Botões de ação (Aprovar, Rejeitar, etc.) */}
          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAcao("aprovar", "MOCK")}>
            <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive"><XCircle className="h-4 w-4 mr-1" /> Rejeitar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Rejeitar Despesa</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <Textarea placeholder="Digite a justificativa para rejeição..." value={justificativa} onChange={(e) => setJustificativa(e.target.value)} />
                <Button onClick={() => handleAcao("rejeitar", "MOCK")} variant="destructive" disabled={!justificativa.trim()}>
                  Confirmar Rejeição
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline"><Edit3 className="h-4 w-4 mr-1" /> Solicitar Ajuste</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Solicitar Ajuste</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <Textarea placeholder="Descreva os ajustes necessários..." value={justificativa} onChange={(e) => setJustificativa(e.target.value)} />
                <Button onClick={() => handleAcao("solicitar-ajuste", "MOCK")} disabled={!justificativa.trim()}>
                  Enviar Solicitação
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAcao("processar-pagamento", "MOCK")}>
            <CheckCircle className="h-4 w-4 mr-1" /> Processar Pagamento
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit3, FileText, Calendar, User, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaixaEntradaAcoes() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [justificativa, setJustificativa] = useState("")
  const { toast } = useToast()

  const tarefasPendentes = [
    {
      id: "1",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Material de Escritório",
      valor: "R$ 1.350,00",
      solicitante: "João Silva",
      projeto: "Sede Administrativa",
      dataVencimento: "2024-01-20",
      prioridade: "alta",
      anexos: ["nota-fiscal.pdf"],
      descricao: "Compra de materiais para escritório - papel, canetas, grampeadores",
    },
    {
      id: "2",
      tipo: "aprovacao",
      titulo: "Aprovar despesa de Combustível",
      valor: "R$ 450,00",
      solicitante: "Maria Santos",
      projeto: "Projeto Social ABC",
      dataVencimento: "2024-01-22",
      prioridade: "media",
      anexos: ["recibo-combustivel.jpg"],
      descricao: "Abastecimento veículo para visitas técnicas",
    },
    {
      id: "3",
      tipo: "pagamento",
      titulo: "Processar pagamento - Consultoria TI",
      valor: "R$ 8.500,00",
      solicitante: "Carlos Lima",
      projeto: "Modernização Sistemas",
      dataVencimento: "2024-01-18",
      prioridade: "alta",
      anexos: ["contrato.pdf", "nota-fiscal.xml"],
      descricao: "Pagamento consultoria desenvolvimento sistema",
    },
  ]

  const handleAcao = (acao: string, tarefaId: string) => {
    const tarefa = tarefasPendentes.find((t) => t.id === tarefaId)

    switch (acao) {
      case "aprovar":
        toast({
          title: "Despesa Aprovada",
          description: `Despesa de ${tarefa?.solicitante} foi aprovada com sucesso.`,
        })
        break
      case "rejeitar":
        if (justificativa.trim()) {
          toast({
            title: "Despesa Rejeitada",
            description: `Despesa rejeitada. Justificativa enviada ao solicitante.`,
            variant: "destructive",
          })
          setJustificativa("")
        }
        break
      case "solicitar-ajuste":
        if (justificativa.trim()) {
          toast({
            title: "Ajuste Solicitado",
            description: `Solicitação de ajuste enviada para ${tarefa?.solicitante}.`,
          })
          setJustificativa("")
        }
        break
      case "processar-pagamento":
        toast({
          title: "Pagamento Processado",
          description: `Pagamento de ${tarefa?.valor} foi processado.`,
        })
        break
    }
    setSelectedAction(null)
  }

  const TarefaCard = ({ tarefa }: { tarefa: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{tarefa.titulo}</CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-green-600">{tarefa.valor}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tarefa.solicitante}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{tarefa.projeto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tarefa.dataVencimento).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
          <Badge variant={tarefa.prioridade === "alta" ? "destructive" : "secondary"} className="ml-4">
            {tarefa.prioridade === "alta" ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tarefa.descricao}</p>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {tarefa.anexos.length} anexo(s): {tarefa.anexos.join(", ")}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tarefa.tipo === "aprovacao" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAcao("aprovar", tarefa.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rejeitar Despesa</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite a justificativa para rejeição..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAcao("rejeitar", tarefa.id)}
                      variant="destructive"
                      disabled={!justificativa.trim()}
                    >
                      Confirmar Rejeição
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Solicitar Ajuste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solicitar Ajuste</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Descreva os ajustes necessários..."
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                    />
                    <Button onClick={() => handleAcao("solicitar-ajuste", tarefa.id)} disabled={!justificativa.trim()}>
                      Enviar Solicitação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {tarefa.tipo === "pagamento" && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAcao("processar-pagamento", tarefa.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tarefasAprovacao = tarefasPendentes.filter((t) => t.tipo === "aprovacao")
  const tarefasPagamento = tarefasPendentes.filter((t) => t.tipo === "pagamento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Caixa de Entrada de Ações</h2>
        <Badge variant="secondary" className="text-sm">
          {tarefasPendentes.length} tarefas pendentes
        </Badge>
      </div>

      <Tabs defaultValue="aprovacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aprovacoes">Aguardando Aprovação ({tarefasAprovacao.length})</TabsTrigger>
          <TabsTrigger value="pagamentos">Aguardando Pagamento ({tarefasPagamento.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovacoes" className="mt-6">
          <div className="space-y-4">
            {tarefasAprovacao.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-6">
          <div className="space-y-4">
            {tarefasPagamento.map((tarefa) => (
              <TarefaCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
*/