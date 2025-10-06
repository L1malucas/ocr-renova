"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AgendamentoPagamentos() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const { toast } = useToast()

  const despesasAprovadas = [
    {
      id: "1",
      fornecedor: "Papelaria Central Ltda",
      descricao: "Material de escritório",
      valor: 1350.0,
      vencimento: "2024-01-20",
      contaDebito: "Despesas Administrativas",
      status: "agendado",
      projeto: "Sede Administrativa",
    },
    {
      id: "2",
      fornecedor: "Posto Combustível ABC",
      descricao: "Combustível veículos",
      valor: 450.0,
      vencimento: "2024-01-22",
      contaDebito: "Despesas Operacionais",
      status: "pendente",
      projeto: "Projeto Social ABC",
    },
    {
      id: "3",
      fornecedor: "TechSolutions Consultoria",
      descricao: "Consultoria em TI",
      valor: 8500.0,
      vencimento: "2024-01-18",
      contaDebito: "Investimentos",
      status: "pendente",
      projeto: "Modernização Sistemas",
    },
    {
      id: "4",
      fornecedor: "Energia Elétrica S.A.",
      descricao: "Conta de energia",
      valor: 2300.0,
      vencimento: "2024-01-25",
      contaDebito: "Despesas Operacionais",
      status: "pago",
      projeto: "Sede Administrativa",
    },
  ]

  const getVencimentosPorDia = () => {
    const vencimentos: { [key: string]: number } = {}
    despesasAprovadas.forEach((despesa) => {
      const data = despesa.vencimento
      vencimentos[data] = (vencimentos[data] || 0) + despesa.valor
    })
    return vencimentos
  }

  const getDespesasDoDia = (data: Date) => {
    const dataStr = data.toISOString().split("T")[0]
    return despesasAprovadas.filter((d) => d.vencimento === dataStr)
  }

  const handleSelectionChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId])
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    }
  }

  const handleAgendarLote = () => {
    const total = selectedItems.reduce((sum, id) => {
      const despesa = despesasAprovadas.find((d) => d.id === id)
      return sum + (despesa?.valor || 0)
    }, 0)

    toast({
      title: "Pagamentos Agendados",
      description: `${selectedItems.length} pagamentos agendados. Total: R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
    })
    setSelectedItems([])
  }

  const handleMarcarPago = (id: string) => {
    const despesa = despesasAprovadas.find((d) => d.id === id)
    toast({
      title: "Pagamento Confirmado",
      description: `Pagamento de R$ ${despesa?.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} para ${despesa?.fornecedor} foi confirmado.`,
    })
  }

  const vencimentosPorDia = getVencimentosPorDia()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Agendamento de Pagamentos</h2>
        <div className="flex gap-2">
          <Button variant={viewMode === "calendar" ? "default" : "outline"} onClick={() => setViewMode("calendar")}>
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendário
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
            Lista
          </Button>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calendário de Vencimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasPayments: (date) => {
                    const dateStr = date.toISOString().split("T")[0]
                    return vencimentosPorDia[dateStr] > 0
                  },
                }}
                modifiersStyles={{
                  hasPayments: {
                    backgroundColor: "#3b82f6",
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Vencimentos do Dia
                {selectedDate && (
                  <span className="text-sm font-normal text-gray-500 block">
                    {selectedDate.toLocaleDateString("pt-BR")}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate && (
                <div className="space-y-3">
                  {getDespesasDoDia(selectedDate).map((despesa) => (
                    <div key={despesa.id} className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{despesa.fornecedor}</div>
                      <div className="text-xs text-gray-600">{despesa.descricao}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-green-600">
                          R$ {despesa.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                        <Badge variant={despesa.status === "pago" ? "default" : "secondary"}>
                          {despesa.status === "pago" ? "Pago" : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {getDespesasDoDia(selectedDate).length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">Nenhum vencimento nesta data</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Pagamentos</CardTitle>
              {selectedItems.length > 0 && (
                <div className="flex gap-2">
                  <Button onClick={handleAgendarLote}>Agendar Selecionados ({selectedItems.length})</Button>
                  <Button variant="outline" onClick={() => setSelectedItems([])}>
                    Limpar Seleção
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {despesasAprovadas.map((despesa) => (
                <div key={despesa.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={selectedItems.includes(despesa.id)}
                    onCheckedChange={(checked) => handleSelectionChange(despesa.id, checked as boolean)}
                    disabled={despesa.status === "pago"}
                  />

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <div className="font-medium">{despesa.fornecedor}</div>
                      <div className="text-sm text-gray-600">{despesa.descricao}</div>
                    </div>

                    <div className="text-center">
                      <div className="font-bold text-green-600">
                        R$ {despesa.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm">{new Date(despesa.vencimento).toLocaleDateString("pt-BR")}</div>
                    </div>

                    <div className="text-center">
                      <Badge
                        variant={
                          despesa.status === "pago"
                            ? "default"
                            : despesa.status === "agendado"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {despesa.status === "pago" ? "Pago" : despesa.status === "agendado" ? "Agendado" : "Pendente"}
                      </Badge>
                    </div>

                    <div className="text-center">
                      {despesa.status === "pendente" && (
                        <Button size="sm" onClick={() => handleMarcarPago(despesa.id)}>
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Marcar como Pago
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
