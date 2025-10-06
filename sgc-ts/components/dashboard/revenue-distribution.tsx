"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Doações PF", value: 35, amount: 125000 },
  { name: "Doações PJ", value: 28, amount: 98000 },
  { name: "Convênios", value: 25, amount: 87500 },
  { name: "Contratos", value: 12, amount: 42000 },
]

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"]

export function RevenueDistribution() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Receitas por Fonte</CardTitle>
        <CardDescription>Distribuição das receitas por tipo de fonte</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props: any) => [
                `${value}% (R$ ${props.payload.amount.toLocaleString("pt-BR")})`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
