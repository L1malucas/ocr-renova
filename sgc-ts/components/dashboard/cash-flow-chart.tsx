"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { mes: "Jan", receitas: 45000, despesas: 32000 },
  { mes: "Fev", receitas: 52000, despesas: 38000 },
  { mes: "Mar", receitas: 48000, despesas: 35000 },
  { mes: "Abr", receitas: 61000, despesas: 42000 },
  { mes: "Mai", receitas: 55000, despesas: 39000 },
  { mes: "Jun", receitas: 67000, despesas: 45000 },
]

export function CashFlowChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Fluxo de Caixa</CardTitle>
        <CardDescription>Receitas vs Despesas nos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="mes" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
              labelStyle={{ color: "#374151" }}
            />
            <Legend />
            <Bar dataKey="receitas" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} name="Receitas" />
            <Bar dataKey="despesas" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} name="Despesas" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
