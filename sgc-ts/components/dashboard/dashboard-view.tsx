"use client"

import { StatsCard } from "./stats-card"
import { CashFlowChart } from "./cash-flow-chart"
import { BudgetProgress } from "./budget-progress"
import { RevenueDistribution } from "./revenue-distribution"
import { PendingTasks } from "./pending-tasks"
import { AccountsSummary } from "./accounts-summary"
import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react"

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Dashboard Financeiro</h1>
        <p className="text-muted-foreground">Visão geral da saúde financeira da organização</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Saldo Total"
          value="R$ 342.500"
          change="+12.5% em relação ao mês anterior"
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Receitas do Mês"
          value="R$ 67.000"
          change="+8.2% vs mês anterior"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard
          title="Despesas do Mês"
          value="R$ 45.000"
          change="-3.1% vs mês anterior"
          changeType="positive"
          icon={TrendingDown}
        />
        <StatsCard
          title="Execução Orçamentária"
          value="74.5%"
          change="Meta: 75% até o final do mês"
          changeType="neutral"
          icon={PieChart}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-7">
        <CashFlowChart />
        <BudgetProgress />
      </div>

      {/* Second Row */}
      <div className="grid gap-4 md:grid-cols-7">
        <RevenueDistribution />
        <PendingTasks />
      </div>

      {/* Accounts Summary */}
      <AccountsSummary />
    </div>
  )
}
