"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, FileText, Download, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import type { Despesa } from "@/lib/types"
import { useDespesas } from "@/hooks/use-despesas"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface DespesaDrawerProps {
  despesa: Despesa | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DespesaDrawer({ despesa, open, onOpenChange }: DespesaDrawerProps) {
  const { aprovarDespesa, rejeitarDespesa } = useDespesas()
  const { toast } = useToast()
  const [showApprovalForm, setShowApprovalForm] = useState(false)
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null)
  const [observacoes, setObservacoes] = useState("")

  if (!despesa) return null

  const getStatusBadge = (status: string) => {
    const config = {
      Rascunho: { color: "bg-gray-100 text-gray-800", icon: Edit },
      "Em Aprovação": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      Aprovado: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      Rejeitado: { color: "bg-red-100 text-red-800", icon: XCircle },
      Pago: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
    }

    const { color, icon: Icon } = config[status as keyof typeof config] || config.Rascunho

    return (
      <Badge className={color}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const handleApprovalAction = (action: "approve" | "reject") => {
    setApprovalAction(action)
    setShowApprovalForm(true)
  }

  const handleSubmitApproval = async () => {
    try {
      if (approvalAction === "approve") {
        await aprovarDespesa(despesa.id, observacoes)
        toast({
          title: "Despesa aprovada",
          description: "A despesa foi aprovada com sucesso.",
        })
      } else if (approvalAction === "reject") {
        await rejeitarDespesa(despesa.id, observacoes)
        toast({
          title: "Despesa rejeitada",
          description: "A despesa foi rejeitada.",
        })
      }
      setShowApprovalForm(false)
      setObservacoes("")
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a aprovação.",
        variant: "destructive",
      })
    }
  }

  const canApprove = despesa.status_aprovacao === "Em Aprovação"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Detalhes da Despesa</SheetTitle>
          <SheetDescription>Informações completas sobre a despesa</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status and Actions */}
          <div className="flex items-center justify-between">
            {getStatusBadge(despesa.status_aprovacao)}
            <div className="flex gap-2">
              {canApprove && (
                <>
                  <Button variant="default" size="sm" onClick={() => handleApprovalAction("approve")}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Aprovar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleApprovalAction("reject")}>
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Approval Form */}
          {showApprovalForm && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-3">
                {approvalAction === "approve" ? "Aprovar Despesa" : "Rejeitar Despesa"}
              </h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="observacoes">
                    {approvalAction === "approve" ? "Observações (opcional)" : "Motivo da rejeição *"}
                  </Label>
                  <Textarea
                    id="observacoes"
                    placeholder={
                      approvalAction === "approve"
                        ? "Observações sobre a aprovação..."
                        : "Descreva o motivo da rejeição..."
                    }
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSubmitApproval}
                    disabled={approvalAction === "reject" && !observacoes.trim()}
                  >
                    Confirmar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowApprovalForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Informações Básicas</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Tipo:</span>
                <p className="font-medium">{despesa.tipo}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Documento:</span>
                <p className="font-medium">{despesa.numero_documento}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Emissão:</span>
                <p className="font-medium">{despesa.data_emissao.toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Vencimento:</span>
                <p className="font-medium">{despesa.data_vencimento.toLocaleDateString("pt-BR")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Valor Bruto:</span>
                <p className="font-medium">
                  R$ {despesa.valor_bruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Valor Líquido:</span>
                <p className="font-medium text-destructive">
                  R$ {despesa.valor_liquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div>
              <span className="text-muted-foreground text-sm">Fornecedor:</span>
              <p className="font-medium">{despesa.fornecedor_id}</p>
            </div>

            <div>
              <span className="text-muted-foreground text-sm">Descrição:</span>
              <p className="text-sm mt-1">{despesa.descricao}</p>
            </div>

            {despesa.observacoes && (
              <div>
                <span className="text-muted-foreground text-sm">Observações:</span>
                <p className="text-sm mt-1">{despesa.observacoes}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Project and Budget Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Projeto e Orçamento</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Projeto:</span>
                <p className="font-medium">{despesa.projeto_id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Centro de Custo:</span>
                <p className="font-medium">{despesa.centro_custo_id}</p>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm">Saldo Orçamentário:</span>
                <span className="font-medium text-chart-2">R$ 25.000,00</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">Após esta despesa:</span>
                <span className="font-medium">
                  R$ {(25000 - despesa.valor_liquido).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Attachments */}
          <div className="space-y-4">
            <h3 className="font-semibold">Anexos</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">nota_fiscal.pdf</p>
                    <p className="text-xs text-muted-foreground">1.2 MB</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Audit Trail */}
          <div className="space-y-4">
            <h3 className="font-semibold">Histórico</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Criado por:</span>
                <span className="font-medium">{despesa.created_by}</span>
              </div>
              <div className="flex justify-between">
                <span>Data de criação:</span>
                <span className="font-medium">
                  {despesa.created_at.toLocaleDateString("pt-BR")} às {despesa.created_at.toLocaleTimeString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Última atualização:</span>
                <span className="font-medium">
                  {despesa.updated_at.toLocaleDateString("pt-BR")} às {despesa.updated_at.toLocaleTimeString("pt-BR")}
                </span>
              </div>
              {despesa.aprovado_em && (
                <div className="flex justify-between">
                  <span>Aprovado em:</span>
                  <span className="font-medium text-chart-2">{despesa.aprovado_em.toLocaleDateString("pt-BR")}</span>
                </div>
              )}
              {despesa.aprovado_por && (
                <div className="flex justify-between">
                  <span>Aprovado por:</span>
                  <span className="font-medium">{despesa.aprovado_por}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
