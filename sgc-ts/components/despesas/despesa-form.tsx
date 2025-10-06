"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, FileText, AlertTriangle, CheckCircle } from "lucide-react"
import { useDespesas } from "@/hooks/use-despesas"
import type { Despesa } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface DespesaFormProps {
  onCancel: () => void
  onSuccess: () => void
  despesa?: Despesa
}

export function DespesaForm({ onCancel, onSuccess, despesa }: DespesaFormProps) {
  const { createDespesa, updateDespesa, fornecedores, workflows } = useDespesas()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    tipo: despesa?.tipo || ("NF-e" as const),
    numero_documento: despesa?.numero_documento || "",
    data_emissao: despesa?.data_emissao
      ? despesa.data_emissao.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    data_vencimento: despesa?.data_vencimento
      ? despesa.data_vencimento.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    fornecedor_id: despesa?.fornecedor_id || "",
    valor_bruto: despesa?.valor_bruto || 0,
    valor_liquido: despesa?.valor_liquido || 0,
    centro_custo_id: despesa?.centro_custo_id || "",
    projeto_id: despesa?.projeto_id || "",
    categoria_id: despesa?.categoria_id || "",
    descricao: despesa?.descricao || "",
    observacoes: despesa?.observacoes || "",
    status_aprovacao: despesa?.status_aprovacao || ("Rascunho" as const),
    status_pagamento: despesa?.status_pagamento || ("Pendente" as const),
  })

  const [xmlFile, setXmlFile] = useState<File | null>(null)
  const [attachments, setAttachments] = useState<File[]>([])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleXmlUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.name.endsWith(".xml")) {
      setXmlFile(file)
      // Simulate XML parsing
      toast({
        title: "XML processado",
        description: "Dados extraídos automaticamente do XML da NF-e",
      })
      // In a real app, you would parse the XML and populate form fields
      handleInputChange("numero_documento", "NF-001234")
      handleInputChange("valor_bruto", 1500.0)
      handleInputChange("valor_liquido", 1425.0)
    }
  }

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const getWorkflowSuggestion = () => {
    const valor = formData.valor_liquido
    if (valor > 10000) {
      return {
        workflow: "Aprovação Diretoria",
        description: "Valores acima de R$ 10.000 requerem aprovação da diretoria",
        color: "bg-red-100 text-red-800",
      }
    } else if (valor > 5000) {
      return {
        workflow: "Aprovação Gestor + Financeiro",
        description: "Valores entre R$ 5.000 e R$ 10.000 requerem dupla aprovação",
        color: "bg-yellow-100 text-yellow-800",
      }
    } else {
      return {
        workflow: "Aprovação Gestor",
        description: "Aprovação padrão do gestor do projeto",
        color: "bg-green-100 text-green-800",
      }
    }
  }

  const checkOrcamento = () => {
    // Simulate budget check
    const saldoDisponivel = 25000
    const percentualUtilizado = (formData.valor_liquido / saldoDisponivel) * 100

    if (percentualUtilizado > 100) {
      return {
        status: "error",
        message: "Saldo insuficiente no orçamento",
        saldo: saldoDisponivel,
      }
    } else if (percentualUtilizado > 80) {
      return {
        status: "warning",
        message: "Atenção: Orçamento próximo do limite",
        saldo: saldoDisponivel,
      }
    } else {
      return {
        status: "success",
        message: "Saldo disponível no orçamento",
        saldo: saldoDisponivel,
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (attachments.length === 0 && !xmlFile) {
      toast({
        title: "Anexo obrigatório",
        description: "É necessário anexar pelo menos um comprovante",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const despesaData = {
        ...formData,
        data_emissao: new Date(formData.data_emissao),
        data_vencimento: new Date(formData.data_vencimento),
        valor_bruto: Number(formData.valor_bruto),
        valor_liquido: Number(formData.valor_liquido),
      }

      if (despesa) {
        await updateDespesa(despesa.id, despesaData)
        toast({
          title: "Despesa atualizada",
          description: "A despesa foi atualizada com sucesso.",
        })
      } else {
        await createDespesa(despesaData as any)
        toast({
          title: "Despesa criada",
          description: "A despesa foi criada com sucesso.",
        })
      }

      onSuccess()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a despesa.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const workflowSuggestion = getWorkflowSuggestion()
  const orcamentoCheck = checkOrcamento()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">{despesa ? "Editar Despesa" : "Nova Despesa"}</h1>
          <p className="text-muted-foreground">
            {despesa ? "Atualize os dados da despesa" : "Registre uma nova despesa para aprovação"}
          </p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* XML Upload for NF-e */}
        {formData.tipo === "NF-e" && (
          <Card>
            <CardHeader>
              <CardTitle>Upload XML da NF-e</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Faça upload do XML da NF-e para preenchimento automático
                </p>
                <input type="file" accept=".xml" onChange={handleXmlUpload} className="hidden" id="xml-upload" />
                <Button type="button" variant="outline" asChild>
                  <label htmlFor="xml-upload" className="cursor-pointer">
                    Selecionar XML
                  </label>
                </Button>
                {xmlFile && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">{xmlFile.name}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Despesa</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NF-e">Nota Fiscal Eletrônica</SelectItem>
                    <SelectItem value="Reembolso">Reembolso</SelectItem>
                    <SelectItem value="Adiantamento">Adiantamento</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero_documento">Número do Documento</Label>
                <Input
                  id="numero_documento"
                  placeholder="Ex: NF-001234"
                  value={formData.numero_documento}
                  onChange={(e) => handleInputChange("numero_documento", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fornecedor_id">Fornecedor</Label>
                <Select
                  value={formData.fornecedor_id}
                  onValueChange={(value) => handleInputChange("fornecedor_id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {fornecedores.map((fornecedor) => (
                      <SelectItem key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.razao_social}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data_emissao">Data de Emissão</Label>
                <Input
                  id="data_emissao"
                  type="date"
                  value={formData.data_emissao}
                  onChange={(e) => handleInputChange("data_emissao", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_vencimento">Data de Vencimento</Label>
                <Input
                  id="data_vencimento"
                  type="date"
                  value={formData.data_vencimento}
                  onChange={(e) => handleInputChange("data_vencimento", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor_bruto">Valor Bruto</Label>
                <Input
                  id="valor_bruto"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.valor_bruto}
                  onChange={(e) => handleInputChange("valor_bruto", Number.parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor_liquido">Valor Líquido</Label>
                <Input
                  id="valor_liquido"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.valor_liquido}
                  onChange={(e) => handleInputChange("valor_liquido", Number.parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                placeholder="Descrição da despesa"
                value={formData.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Informações adicionais..."
                value={formData.observacoes}
                onChange={(e) => handleInputChange("observacoes", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Budget Check */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <strong>Verificação Orçamentária:</strong> {orcamentoCheck.message}
              </div>
              <Badge
                className={
                  orcamentoCheck.status === "error"
                    ? "bg-red-100 text-red-800"
                    : orcamentoCheck.status === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }
              >
                Saldo: R$ {orcamentoCheck.saldo.toLocaleString("pt-BR")}
              </Badge>
            </div>
          </AlertDescription>
        </Alert>

        {/* Workflow Suggestion */}
        <Card>
          <CardHeader>
            <CardTitle>Workflow de Aprovação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{workflowSuggestion.workflow}</p>
                <p className="text-sm text-muted-foreground">{workflowSuggestion.description}</p>
              </div>
              <Badge className={workflowSuggestion.color}>Sugerido</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card>
          <CardHeader>
            <CardTitle>Anexos *</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Arraste e solte os arquivos aqui ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">Formatos aceitos: PDF, JPG, PNG (máx. 10MB cada)</p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleAttachmentUpload}
                className="hidden"
                id="attachment-upload"
              />
              <Button type="button" variant="outline" className="mt-4 bg-transparent" asChild>
                <label htmlFor="attachment-upload" className="cursor-pointer">
                  Selecionar Arquivos
                </label>
              </Button>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Arquivos Anexados:</h4>
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || orcamentoCheck.status === "error"}>
            {loading ? "Salvando..." : despesa ? "Atualizar Despesa" : "Criar Despesa"}
          </Button>
        </div>
      </form>
    </div>
  )
}
