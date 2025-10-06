import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

export function AccountsSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contas a Receber</CardTitle>
          <TrendingUp className="h-4 w-4 text-chart-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-chart-2">R$ 87.500</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <Calendar className="h-3 w-3" />
            Próximos 30 dias
          </p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Vencidas</span>
              <span className="text-destructive">R$ 12.500</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Próximos 7 dias</span>
              <span className="text-chart-4">R$ 25.000</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Próximos 30 dias</span>
              <span className="text-muted-foreground">R$ 50.000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contas a Pagar</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">R$ 45.200</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <Calendar className="h-3 w-3" />
            Próximos 30 dias
          </p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Vencidas</span>
              <span className="text-destructive font-medium">R$ 8.200</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Próximos 7 dias</span>
              <span className="text-chart-4">R$ 15.000</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Próximos 30 dias</span>
              <span className="text-muted-foreground">R$ 22.000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
