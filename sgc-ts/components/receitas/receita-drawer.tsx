"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Edit, Trash2, FileText, Download, Eye } from "lucide-react"
import type { Recebimento } from "@/lib/types"

interface ReceitaDrawerProps {
  receita: Recebimento | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReceitaDrawer({ receita, open, onOpenChange }: ReceitaDrawerProps) {
  if (!receita) return null

  const getStatusBadge = (status: string) => {
    const colors = {
      Pendente: "bg-yellow-100 text-yellow-800",
      Confirmado: "bg-blue-100 text-blue-800",
      Conciliado: "bg-green-100 text-green-800",
      Estornado: "bg-red-100 text-red-800",
    } as const

    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Detalhes da Receita</SheetTitle>
          <SheetDescription>Informações completas sobre o recebimento</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status and Actions */}
          <div className="flex items-center justify-between">
            {getStatusBadge(receita.status)}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Informações Básicas</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Data:</span>
                <p className="font-medium">{receita.data.toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Referência:</span>
                <p className="font-medium">{receita.referencia}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Valor Bruto:</span>
                <p className="font-medium">
                  R$ {receita.valor_bruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Valor Líquido:</span>
                <p className="font-medium text-chart-2">
                  R$ {receita.valor_liquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div>
              <span className="text-muted-foreground text-sm">Fonte de Recurso:</span>
              <p className="font-medium">{receita.fonte_id}</p>
            </div>

            {receita.observacoes && (
              <div>
                <span className="text-muted-foreground text-sm">Observações:</span>
                <p className="text-sm mt-1">{receita.observacoes}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Rateio Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Rateio por Projeto</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Projeto Educação</p>
                  <p className="text-sm text-muted-foreground">Centro de Custo: Administrativo</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">100%</p>
                  <p className="text-sm text-muted-foreground">
                    R$ {receita.valor_liquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
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
                    <p className="text-sm font-medium">comprovante_doacao.pdf</p>
                    <p className="text-xs text-muted-foreground">245 KB</p>
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
                <span className="font-medium">{receita.created_by}</span>
              </div>
              <div className="flex justify-between">
                <span>Data de criação:</span>
                <span className="font-medium">
                  {receita.created_at.toLocaleDateString("pt-BR")} às {receita.created_at.toLocaleTimeString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Última atualização:</span>
                <span className="font-medium">
                  {receita.updated_at.toLocaleDateString("pt-BR")} às {receita.updated_at.toLocaleTimeString("pt-BR")}
                </span>
              </div>
              {receita.conciliado_em && (
                <div className="flex justify-between">
                  <span>Conciliado em:</span>
                  <span className="font-medium text-chart-2">{receita.conciliado_em.toLocaleDateString("pt-BR")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
