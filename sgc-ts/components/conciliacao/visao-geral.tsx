"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Building2, TrendingUp, Clock, CheckCircle, AlertTriangle, Play } from "lucide-react"

const mockConciliacaoData = [
  { mes: "Abr", automatica: 85, manual: 10, pendente: 5 },
  { mes: "Mai", automatica: 78, manual: 15, pendente: 7 },
  { mes: "Jun", automatica: 82, manual: 12, pendente: 6 },
  { mes: "Jul", automatica: 88, manual: 8, pendente: 4 },
  { mes: "Ago", automatica: 90, manual: 7, pendente: 3 },
  { mes: "Set", automatica: 75, manual: 20, pendente: 5 },
]

const mockContasBancarias = [
  {
    id: 1,
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "67890-1",
    status: "Conciliação de Setembro em dia",
    saldoExtrato: 125430.5,
    saldoSistema: 125430.5,
    statusColor: "green",
  },
  {
    id: 2,
    banco: "Caixa Econômica",
    agencia: "0987",
    conta: "54321-0",
    status: "Agosto pendente",
    saldoExtrato: 89750.25,
    saldoSistema: 89650.25,
    statusColor: "orange",
  },
  {
    id: 3,
    banco: "Itaú",
    agencia: "5678",
    conta: "12345-9",
    status: "Conciliação de Setembro em dia",
    saldoExtrato: 45230.75,
    saldoSistema: 45230.75,
    statusColor: "green",
  },
]

const mockAtividadeRecente = [
  {
    id: 1,
    acao: "Extrato de Setembro (Banco do Brasil) importado",
    usuario: "João Silva",
    tempo: "2 horas atrás",
    tipo: "import",
  },
  {
    id: 2,
    acao: "15 movimentos conciliados para a conta Caixa",
    usuario: "Maria Souza",
    tempo: "4 horas atrás",
    tipo: "conciliacao",
  },
  {
    id: 3,
    acao: "Regra automática criada para IOF",
    usuario: "Carlos Santos",
    tempo: "1 dia atrás",
    tipo: "regra",
  },
]

export function VisaoGeral() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Gráfico de Status da Conciliação */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Status da Conciliação - Últimos 6 Meses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockConciliacaoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="automatica" stackId="a" fill="#10b981" name="Automática" radius={[0, 0, 0, 0]} />
                <Bar dataKey="manual" stackId="a" fill="#3b82f6" name="Manual" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pendente" stackId="a" fill="#f59e0b" name="Pendente" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Contas Bancárias */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Contas Bancárias a Conciliar</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockContasBancarias.map((conta) => (
            <Card key={conta.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{conta.banco}</h4>
                      <p className="text-sm text-slate-600">
                        Ag: {conta.agencia} | Conta: {conta.conta}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={conta.statusColor === "green" ? "default" : "secondary"}
                    className={
                      conta.statusColor === "green" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                    }
                  >
                    {conta.statusColor === "green" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {conta.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Saldo Extrato:</span>
                    <span className="font-medium">{formatCurrency(conta.saldoExtrato)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Saldo Sistema:</span>
                    <span className="font-medium">{formatCurrency(conta.saldoSistema)}</span>
                  </div>
                  {conta.saldoExtrato !== conta.saldoSistema && (
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">Diferença:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(Math.abs(conta.saldoExtrato - conta.saldoSistema))}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => console.log(`[v0] Iniciando conciliação para ${conta.banco}`)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar Conciliação
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Atividade Recente */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-slate-800">Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAtividadeRecente.map((atividade) => (
              <div
                key={atividade.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    atividade.tipo === "import"
                      ? "bg-blue-100"
                      : atividade.tipo === "conciliacao"
                        ? "bg-green-100"
                        : "bg-purple-100"
                  }`}
                >
                  {atividade.tipo === "import" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                  {atividade.tipo === "conciliacao" && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {atividade.tipo === "regra" && <AlertTriangle className="h-4 w-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{atividade.acao}</p>
                  <p className="text-xs text-slate-600">
                    por {atividade.usuario} • {atividade.tempo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
