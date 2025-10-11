"use client"

import { useGetContratoById } from "@/hooks/use-contratos"
import { AditivosManager } from "@/components/aditivos/aditivos-manager"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import { ContratoDto } from "@/models/contrato.model"

interface ContratoDetailViewProps {
  contratoId: string
  onBack: () => void
  onEdit: (contrato: ContratoDto) => void
}

export function ContratoDetailView({ contratoId, onBack, onEdit }: ContratoDetailViewProps) {
  const { data, isLoading, isError, error } = useGetContratoById(contratoId)

  if (isLoading) {
    return <div>Carregando detalhes do contrato...</div>
  }

  if (isError || !data?.data) {
    return <div className="text-red-600">Erro ao carregar contrato: {error instanceof Error ? error.message : "Erro desconhecido"}</div>
  }

  const contrato = data.data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a Lista
        </Button>
        <Button onClick={() => onEdit(contrato)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar Contrato
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contrato: {contrato.numero}</CardTitle>
          <CardDescription>{contrato.objeto}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div><strong>Valor:</strong> {contrato.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
          <div><strong>Data Início:</strong> {new Date(contrato.dataInicio).toLocaleDateString("pt-BR")}</div>
          <div><strong>Data Fim:</strong> {new Date(contrato.dataFim).toLocaleDateString("pt-BR")}</div>
          {/* Adicionar mais detalhes do contrato aqui */}
        </CardContent>
      </Card>

      <AditivosManager contratoId={contratoId} />
    </div>
  )
}
