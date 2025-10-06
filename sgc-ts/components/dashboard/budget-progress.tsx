"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface BudgetItem {
  categoria: string
  executado: number
  orcado: number
  percentual: number
}

const budgetData: BudgetItem[] = [
  { categoria: "Pessoal", executado: 85000, orcado: 120000, percentual: 71 },
  { categoria: "Administrativo", executado: 32000, orcado: 45000, percentual: 71 },
  { categoria: "Projetos", executado: 156000, orcado: 200000, percentual: 78 },
  { categoria: "Infraestrutura", executado: 28000, orcado: 35000, percentual: 80 },
]

export function BudgetProgress() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Execução Orçamentária</CardTitle>
        <CardDescription>Status do orçamento por categoria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgetData.map((item) => (
          <div key={item.categoria} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.categoria}</span>
              <span className="text-muted-foreground">
                {item.percentual}% (R$ {item.executado.toLocaleString("pt-BR")} / R${" "}
                {item.orcado.toLocaleString("pt-BR")})
              </span>
            </div>
            <Progress value={item.percentual} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
