"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Link, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { useConciliacao } from "@/hooks/use-conciliacao"
import { useToast } from "@/hooks/use-toast"
import type { MovimentoBancario, MovimentoFinanceiro } from "@/lib/types"

export function MatchingPanel() {
  const [contaId, setContaId] = useState("")
  const [executingMatching, setExecutingMatching] = useState(false)
  const { movimentosBancarios, movimentosFinanceiros, executarMatchingAutomatico, conciliarManual } = useConciliacao()
  const { toast } = useToast()

  const movimentosPendentes = {
    bancarios: movimentosBancarios.filter((m) => m.status === "pendente" && (!contaId || m.contaId === contaId)),
    financeiros: movimentosFinanceiros.filter((m) => m.status === "pendente" && (!contaId || m.contaId === contaId)),
  }

  const handleMatchingAutomatico = async () => {
    if (!contaId) {
      toast({
        title: "Erro",
        description: "Selecione uma conta bancária",
        variant: "destructive",
      })
      return
    }

    setExecutingMatching(true)
    try {
      const result = await executarMatchingAutomatico(contaId)
      toast({
        title: "Matching Concluído",
        description: `${result.matchesEncontrados} movimentos conciliados automaticamente`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao executar matching automático",
        variant: "destructive",
      })
    } finally {
      setExecutingMatching(false)
    }
  }

  const handleMatchingManual = async (movBancario: MovimentoBancario, movFinanceiro: MovimentoFinanceiro) => {
    try {
      await conciliarManual(movBancario.id!, movFinanceiro.id!)
      toast({
        title: "Sucesso",
        description: "Movimentos conciliados manualmente",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro na conciliação manual",
        variant: "destructive",
      })
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Matching Automático
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Conta Bancária</label>
            <Select value={contaId} onValueChange={setContaId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conta-1">Banco do Brasil - CC 12345-6</SelectItem>
                <SelectItem value="conta-2">Caixa Econômica - CC 98765-4</SelectItem>
                <SelectItem value="conta-3">Itaú - CC 11111-1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{movimentosPendentes.bancarios.length}</div>
              <div className="text-sm text-orange-700">Movimentos Bancários</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{movimentosPendentes.financeiros.length}</div>
              <div className="text-sm text-blue-700">Movimentos Financeiros</div>
            </div>
          </div>

          <Button onClick={handleMatchingAutomatico} disabled={!contaId || executingMatching} className="w-full">
            {executingMatching ? "Executando..." : "Executar Matching Automático"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Movimentos Bancários Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {movimentosPendentes.bancarios.map((movimento) => (
                <div key={movimento.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{movimento.descricao}</div>
                      <div className="text-xs text-gray-500">{formatDate(movimento.data)}</div>
                    </div>
                    <Badge variant={movimento.tipo === "entrada" ? "default" : "destructive"}>
                      {formatCurrency(movimento.valor)}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">Doc: {movimento.numeroDocumento}</div>
                </div>
              ))}
              {movimentosPendentes.bancarios.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p>Todos os movimentos foram conciliados</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Movimentos Financeiros Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {movimentosPendentes.financeiros.map((movimento) => (
                <div key={movimento.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{movimento.descricao}</div>
                      <div className="text-xs text-gray-500">{formatDate(movimento.data)}</div>
                    </div>
                    <Badge variant={movimento.tipo === "entrada" ? "default" : "destructive"}>
                      {formatCurrency(movimento.valor)}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">Origem: {movimento.origem}</div>
                </div>
              ))}
              {movimentosPendentes.financeiros.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p>Todos os movimentos foram conciliados</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {movimentosPendentes.bancarios.length > 0 && movimentosPendentes.financeiros.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Conciliação Manual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Conciliação Manual</p>
                  <p>
                    Selecione um movimento bancário e um movimento financeiro correspondente para fazer a conciliação
                    manual.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
