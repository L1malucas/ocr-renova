"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, FileText, Calendar, DollarSign, Building, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockContratos = [
  {
    id: 1,
    nome: "Convênio Fundação ABC - Educação",
    financiador: "Fundação ABC",
    valor: 500000,
    vigenciaInicio: "2024-01-01",
    vigenciaFim: "2024-12-31",
    status: "ativo",
  },
  {
    id: 2,
    nome: "Projeto Instituto XYZ - Saúde",
    financiador: "Instituto XYZ",
    valor: 300000,
    vigenciaInicio: "2024-03-01",
    vigenciaFim: "2025-02-28",
    status: "ativo",
  },
  {
    id: 3,
    nome: "Edital Governo - Meio Ambiente",
    financiador: "Secretaria do Meio Ambiente",
    valor: 750000,
    vigenciaInicio: "2024-06-01",
    vigenciaFim: "2025-05-31",
    status: "pendente",
  },
]

export function ContratosFontes() {
  const [contratos, setContratos] = useState(mockContratos)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    financiador: "",
    valor: "",
    vigenciaInicio: "",
    vigenciaFim: "",
    descricao: "",
    anexo: null as File | null,
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const novoContrato = {
      id: contratos.length + 1,
      nome: formData.nome,
      financiador: formData.financiador,
      valor: Number.parseFloat(formData.valor),
      vigenciaInicio: formData.vigenciaInicio,
      vigenciaFim: formData.vigenciaFim,
      status: "ativo" as const,
    }

    setContratos([...contratos, novoContrato])
    setIsDialogOpen(false)
    setFormData({
      nome: "",
      financiador: "",
      valor: "",
      vigenciaInicio: "",
      vigenciaFim: "",
      descricao: "",
      anexo: null,
    })

    toast({
      title: "Contrato cadastrado com sucesso!",
      description: "O contrato foi adicionado e está disponível para planejamento.",
    })
  }

  const handleCreatePlanoTrabalho = (contratoId: number) => {
    toast({
      title: "Redirecionando para Planejamento",
      description: "Criando novo Plano de Trabalho para este contrato...",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-emerald-100 text-emerald-800">Ativo</Badge>
      case "pendente":
        return <Badge className="bg-amber-100 text-amber-800">Pendente</Badge>
      case "encerrado":
        return <Badge className="bg-gray-100 text-gray-800">Encerrado</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header com ação principal */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Contratos e Fontes de Recurso</h2>
          <p className="text-gray-600">Gerencie os contratos e convênios que financiam seus projetos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Contrato
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Contrato/Convênio</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome do Contrato/Convênio</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Convênio Fundação ABC - Educação"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="financiador">Financiador</Label>
                  <Input
                    id="financiador"
                    value={formData.financiador}
                    onChange={(e) => setFormData({ ...formData, financiador: e.target.value })}
                    placeholder="Ex: Fundação ABC"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="valor">Valor Total</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    placeholder="500000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vigenciaInicio">Vigência - Início</Label>
                  <Input
                    id="vigenciaInicio"
                    type="date"
                    value={formData.vigenciaInicio}
                    onChange={(e) => setFormData({ ...formData, vigenciaInicio: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vigenciaFim">Vigência - Fim</Label>
                  <Input
                    id="vigenciaFim"
                    type="date"
                    value={formData.vigenciaFim}
                    onChange={(e) => setFormData({ ...formData, vigenciaFim: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição/Objeto do Contrato</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva o objeto e objetivos do contrato..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="anexo">Anexar Documento do Contrato</Label>
                <Input
                  id="anexo"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData({ ...formData, anexo: e.target.files?.[0] || null })}
                />
                <p className="text-xs text-gray-500 mt-1">Formatos aceitos: PDF, DOC, DOCX</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Cadastrar Contrato</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabela de Contratos */}
      <Card>
        <CardHeader>
          <CardTitle>Contratos Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contratos.map((contrato) => (
              <div key={contrato.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{contrato.nome}</h3>
                      {getStatusBadge(contrato.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Financiador:</span>
                        <span className="font-medium">{contrato.financiador}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Valor:</span>
                        <span className="font-medium">R$ {contrato.valor.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Vigência:</span>
                        <span className="font-medium">
                          {new Date(contrato.vigenciaInicio).toLocaleDateString()} -{" "}
                          {new Date(contrato.vigenciaFim).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Documento:</span>
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          Ver anexo
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleCreatePlanoTrabalho(contrato.id)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Plano de Trabalho
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar Contrato
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
