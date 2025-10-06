"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GitBranch, Eye, Edit, Clock, User, FileText, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockVersoes = [
  {
    id: 1,
    versao: "1.0",
    status: "arquivada",
    dataAprovacao: "2024-01-15",
    aprovadoPor: "Maria Silva",
    valorTotal: 500000,
    observacoes: "Versão inicial aprovada",
    alteracoes: [],
  },
  {
    id: 2,
    versao: "1.1",
    status: "ativa",
    dataAprovacao: "2024-02-20",
    aprovadoPor: "João Santos",
    valorTotal: 485000,
    observacoes: "Redução de custos com material permanente",
    alteracoes: [
      { tipo: "reducao", item: "Computadores Desktop", valorAnterior: 50000, valorNovo: 35000 },
      { tipo: "adicao", item: "Tablets para Alunos", valorAnterior: 0, valorNovo: 20000 },
    ],
  },
  {
    id: 3,
    versao: "1.2",
    status: "em_aprovacao",
    dataAprovacao: null,
    aprovadoPor: null,
    valorTotal: 495000,
    observacoes: "Inclusão de novos itens de capacitação",
    alteracoes: [
      { tipo: "adicao", item: "Certificação Internacional", valorAnterior: 0, valorNovo: 15000 },
      { tipo: "reducao", item: "Material Didático", valorAnterior: 8000, valorNovo: 5000 },
    ],
  },
]

export function RevisoesVersoes() {
  const [versoes, setVersoes] = useState(mockVersoes)
  const [isNovaRevisaoOpen, setIsNovaRevisaoOpen] = useState(false)
  const [justificativa, setJustificativa] = useState("")
  const [selectedVersoes, setSelectedVersoes] = useState<string[]>(["1.0", "1.1"])
  const { toast } = useToast()

  const iniciarRevisao = () => {
    const novaVersao = {
      id: versoes.length + 1,
      versao: "1.3",
      status: "rascunho" as const,
      dataAprovacao: null,
      aprovadoPor: null,
      valorTotal: 495000,
      observacoes: justificativa,
      alteracoes: [],
    }

    setVersoes([...versoes, novaVersao])
    setIsNovaRevisaoOpen(false)
    setJustificativa("")

    toast({
      title: "Revisão iniciada!",
      description: "Nova versão 1.3 criada. Você pode editá-la agora.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativa":
        return <Badge className="bg-emerald-100 text-emerald-800">Ativa</Badge>
      case "arquivada":
        return <Badge className="bg-gray-100 text-gray-800">Arquivada</Badge>
      case "em_aprovacao":
        return <Badge className="bg-amber-100 text-amber-800">Em Aprovação</Badge>
      case "rascunho":
        return <Badge className="bg-blue-100 text-blue-800">Rascunho</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const getAlteracaoIcon = (tipo: string) => {
    switch (tipo) {
      case "adicao":
        return <span className="text-emerald-600">+</span>
      case "reducao":
        return <span className="text-red-600">-</span>
      case "alteracao":
        return <span className="text-amber-600">~</span>
      default:
        return <span>•</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Revisões e Versões</h2>
          <p className="text-gray-600">Gerencie as versões do plano de trabalho e controle de mudanças</p>
        </div>
        <Dialog open={isNovaRevisaoOpen} onOpenChange={setIsNovaRevisaoOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <GitBranch className="h-4 w-4 mr-2" />
              Nova Revisão Orçamentária
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Iniciar Nova Revisão Orçamentária</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Justificativa para a Revisão</Label>
                <Textarea
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  placeholder="Descreva os motivos que levaram à necessidade desta revisão..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNovaRevisaoOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={iniciarRevisao}>Iniciar Revisão</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Timeline de Versões */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Versões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {versoes.map((versao, index) => (
              <div key={versao.id} className="relative">
                {/* Linha conectora */}
                {index < versoes.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>}

                <div className="flex items-start gap-4">
                  {/* Ícone da versão */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <GitBranch className="h-6 w-6 text-blue-600" />
                  </div>

                  {/* Conteúdo da versão */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">Versão {versao.versao}</h3>
                        {getStatusBadge(versao.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Visualizar
                        </Button>
                        {versao.status === "rascunho" && (
                          <Button size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Valor Total:</span>
                        <span className="font-medium">R$ {versao.valorTotal.toLocaleString()}</span>
                      </div>

                      {versao.dataAprovacao && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Aprovado em:</span>
                          <span className="font-medium">{new Date(versao.dataAprovacao).toLocaleDateString()}</span>
                        </div>
                      )}

                      {versao.aprovadoPor && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Aprovado por:</span>
                          <span className="font-medium">{versao.aprovadoPor}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-700">{versao.observacoes}</p>
                    </div>

                    {/* Alterações */}
                    {versao.alteracoes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Principais Alterações:</h4>
                        <div className="space-y-1">
                          {versao.alteracoes.map((alteracao, altIndex) => (
                            <div key={altIndex} className="flex items-center gap-2 text-sm">
                              {getAlteracaoIcon(alteracao.tipo)}
                              <span>{alteracao.item}:</span>
                              <span className="text-gray-600">
                                R$ {alteracao.valorAnterior.toLocaleString()} → R${" "}
                                {alteracao.valorNovo.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparador de Versões */}
      <Card>
        <CardHeader>
          <CardTitle>Comparar Versões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Versão Base</Label>
              <select
                className="w-full p-2 border rounded"
                value={selectedVersoes[0]}
                onChange={(e) => setSelectedVersoes([e.target.value, selectedVersoes[1]])}
              >
                {versoes.map((v) => (
                  <option key={v.versao} value={v.versao}>
                    Versão {v.versao}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Comparar com</Label>
              <select
                className="w-full p-2 border rounded"
                value={selectedVersoes[1]}
                onChange={(e) => setSelectedVersoes([selectedVersoes[0], e.target.value])}
              >
                {versoes.map((v) => (
                  <option key={v.versao} value={v.versao}>
                    Versão {v.versao}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Gerar Relatório Comparativo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
