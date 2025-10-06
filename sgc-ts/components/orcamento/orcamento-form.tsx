"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, X, Save } from "lucide-react"
import { useOrcamento } from "@/hooks/use-orcamento"
import type { Orcamento, LinhaOrcamentaria } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface OrcamentoFormProps {
  onCancel: () => void
  onSuccess: () => void
  orcamento?: Orcamento
}

interface LinhaOrcamentariaForm extends Omit<LinhaOrcamentaria, "id" | "orcamento_id"> {
  id?: string
  categoria_nome?: string
}

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export function OrcamentoForm({ onCancel, onSuccess, orcamento }: OrcamentoFormProps) {
  const {
    createOrcamento,
    updateOrcamento,
    createLinhaOrcamentaria,
    updateLinhaOrcamentaria,
    projetos,
    centrosCusto,
    categorias,
    linhasOrcamentarias,
  } = useOrcamento()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    nome: orcamento?.nome || "",
    ano_fiscal: orcamento?.ano_fiscal || new Date().getFullYear(),
    projeto_id: orcamento?.projeto_id || "",
    centro_custo_id: orcamento?.centro_custo_id || "",
    status: orcamento?.status || ("Planejamento" as const),
    versao: orcamento?.versao || 1,
  })

  const [linhas, setLinhas] = useState<LinhaOrcamentariaForm[]>([])

  // Load existing lines if editing
  useEffect(() => {
    if (orcamento) {
      const linhasExistentes = linhasOrcamentarias
        .filter((linha) => linha.orcamento_id === orcamento.id)
        .map((linha) => {
          const categoria = categorias.find((c) => c.id === linha.categoria_id)
          return {
            ...linha,
            categoria_nome: categoria?.nome || "Categoria não encontrada",
          }
        })
      setLinhas(linhasExistentes)
    }
  }, [orcamento, linhasOrcamentarias, categorias])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addLinha = () => {
    setLinhas((prev) => [
      ...prev,
      {
        categoria_id: "",
        mes_1_previsto: 0,
        mes_2_previsto: 0,
        mes_3_previsto: 0,
        mes_4_previsto: 0,
        mes_5_previsto: 0,
        mes_6_previsto: 0,
        mes_7_previsto: 0,
        mes_8_previsto: 0,
        mes_9_previsto: 0,
        mes_10_previsto: 0,
        mes_11_previsto: 0,
        mes_12_previsto: 0,
        total_previsto: 0,
      },
    ])
  }

  const removeLinha = (index: number) => {
    setLinhas((prev) => prev.filter((_, i) => i !== index))
  }

  const updateLinha = (index: number, field: string, value: any) => {
    setLinhas((prev) =>
      prev.map((linha, i) => {
        if (i === index) {
          const updated = { ...linha, [field]: value }

          // Update category name if category changed
          if (field === "categoria_id") {
            const categoria = categorias.find((c) => c.id === value)
            updated.categoria_nome = categoria?.nome || ""
          }

          // Recalculate total if it's a monthly value
          if (field.includes("mes_") && field.includes("_previsto")) {
            updated.total_previsto =
              updated.mes_1_previsto +
              updated.mes_2_previsto +
              updated.mes_3_previsto +
              updated.mes_4_previsto +
              updated.mes_5_previsto +
              updated.mes_6_previsto +
              updated.mes_7_previsto +
              updated.mes_8_previsto +
              updated.mes_9_previsto +
              updated.mes_10_previsto +
              updated.mes_11_previsto +
              updated.mes_12_previsto
          }

          return updated
        }
        return linha
      }),
    )
  }

  const getTotalGeral = () => {
    return linhas.reduce((sum, linha) => sum + linha.total_previsto, 0)
  }

  const getTotalMes = (mes: number) => {
    const campo = `mes_${mes}_previsto` as keyof LinhaOrcamentariaForm
    return linhas.reduce((sum, linha) => sum + (Number(linha[campo]) || 0), 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (linhas.length === 0) {
      toast({
        title: "Erro",
        description: "É necessário adicionar pelo menos uma linha orçamentária",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const orcamentoData = {
        ...formData,
        total_previsto: getTotalGeral(),
      }

      let orcamentoId: string

      if (orcamento) {
        await updateOrcamento(orcamento.id, orcamentoData)
        orcamentoId = orcamento.id
        toast({
          title: "Orçamento atualizado",
          description: "O orçamento foi atualizado com sucesso.",
        })
      } else {
        orcamentoId = await createOrcamento(orcamentoData as any)
        toast({
          title: "Orçamento criado",
          description: "O orçamento foi criado com sucesso.",
        })
      }

      // Save budget lines
      for (const linha of linhas) {
        const linhaData = {
          orcamento_id: orcamentoId,
          categoria_id: linha.categoria_id,
          mes_1_previsto: linha.mes_1_previsto,
          mes_2_previsto: linha.mes_2_previsto,
          mes_3_previsto: linha.mes_3_previsto,
          mes_4_previsto: linha.mes_4_previsto,
          mes_5_previsto: linha.mes_5_previsto,
          mes_6_previsto: linha.mes_6_previsto,
          mes_7_previsto: linha.mes_7_previsto,
          mes_8_previsto: linha.mes_8_previsto,
          mes_9_previsto: linha.mes_9_previsto,
          mes_10_previsto: linha.mes_10_previsto,
          mes_11_previsto: linha.mes_11_previsto,
          mes_12_previsto: linha.mes_12_previsto,
          total_previsto: linha.total_previsto,
        }

        if (linha.id) {
          await updateLinhaOrcamentaria(linha.id, linhaData)
        } else {
          await createLinhaOrcamentaria(linhaData)
        }
      }

      onSuccess()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o orçamento.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const categoriasDespesa = categorias.filter((c) => c.tipo === "Despesa")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">{orcamento ? "Editar Orçamento" : "Novo Orçamento"}</h1>
          <p className="text-muted-foreground">
            {orcamento ? "Atualize o planejamento orçamentário" : "Crie um novo planejamento orçamentário"}
          </p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Orçamento</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Orçamento 2024 - Projeto Educação"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ano_fiscal">Ano Fiscal</Label>
                <Input
                  id="ano_fiscal"
                  type="number"
                  min="2020"
                  max="2030"
                  value={formData.ano_fiscal}
                  onChange={(e) => handleInputChange("ano_fiscal", Number.parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projeto_id">Projeto</Label>
                <Select value={formData.projeto_id} onValueChange={(value) => handleInputChange("projeto_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {projetos.map((projeto) => (
                      <SelectItem key={projeto.id} value={projeto.id}>
                        {projeto.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="centro_custo_id">Centro de Custo</Label>
                <Select
                  value={formData.centro_custo_id}
                  onValueChange={(value) => handleInputChange("centro_custo_id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o centro de custo" />
                  </SelectTrigger>
                  <SelectContent>
                    {centrosCusto.map((centro) => (
                      <SelectItem key={centro.id} value={centro.id}>
                        {centro.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <Label>Status</Label>
                <Badge className="ml-2">{formData.status}</Badge>
              </div>
              <div>
                <Label>Versão</Label>
                <Badge variant="outline" className="ml-2">
                  v{formData.versao}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Lines */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Linhas Orçamentárias</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addLinha}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Linha
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Categoria</TableHead>
                    {meses.map((mes, index) => (
                      <TableHead key={mes} className="w-24 text-center">
                        {mes.slice(0, 3)}
                      </TableHead>
                    ))}
                    <TableHead className="w-32 text-center">Total</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linhas.map((linha, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          value={linha.categoria_id}
                          onValueChange={(value) => updateLinha(index, "categoria_id", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriasDespesa.map((categoria) => (
                              <SelectItem key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      {meses.map((_, mesIndex) => {
                        const campo = `mes_${mesIndex + 1}_previsto` as keyof LinhaOrcamentariaForm
                        return (
                          <TableCell key={mesIndex}>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={linha[campo] || 0}
                              onChange={(e) => updateLinha(index, campo, Number.parseFloat(e.target.value) || 0)}
                              className="w-20 text-center"
                            />
                          </TableCell>
                        )
                      })}
                      <TableCell className="text-center font-medium">
                        R$ {linha.total_previsto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeLinha(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Total Row */}
                  <TableRow className="bg-muted/50 font-medium">
                    <TableCell>TOTAL</TableCell>
                    {meses.map((_, mesIndex) => (
                      <TableCell key={mesIndex} className="text-center">
                        R$ {getTotalMes(mesIndex + 1).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-bold">
                      R$ {getTotalGeral().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Orçamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total de Linhas</p>
                <p className="text-2xl font-bold">{linhas.length}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Média Mensal</p>
                <p className="text-2xl font-bold">
                  R$ {(getTotalGeral() / 12).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg bg-primary/5">
                <p className="text-sm text-muted-foreground">Total Anual</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {getTotalGeral().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || linhas.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Salvando..." : orcamento ? "Atualizar Orçamento" : "Criar Orçamento"}
          </Button>
        </div>
      </form>
    </div>
  )
}
