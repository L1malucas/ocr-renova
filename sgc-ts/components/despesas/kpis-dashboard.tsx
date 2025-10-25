"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, AlertTriangle, Bell, TrendingUp } from "lucide-react"

interface KPIsDashboardProps {
  onFilterClick: (filter: string) => void
  activeFilter: string
}

export function KPIsDashboard({ onFilterClick, activeFilter }: KPIsDashboardProps) {
  // Dados reais viriam de hooks ou props, por enquanto, placeholders
  const kpisData = [
    {
      id: "rascunhos",
      title: "Rascunhos",
      value: "0",
      description: "MOCK",
      icon: FileText,
      color: "bg-slate-500",
      trend: "MOCK",
    },
    {
      id: "aprovacao",
      title: "Em Aprovação",
      value: "0",
      description: "MOCK",
      icon: Clock,
      color: "bg-amber-500",
      trend: "MOCK",
    },
    {
      id: "aprovadas",
      title: "Aprovadas",
      value: "0",
      description: "MOCK",
      icon: CheckCircle,
      color: "bg-emerald-500",
      trend: "MOCK",
    },
    {
      id: "vencidas",
      title: "Vencidas",
      value: "0",
      description: "MOCK",
      icon: AlertTriangle,
      color: "bg-red-500",
      trend: "MOCK",
    },
  ]

  const alertasData: any[] = [] // Alertas viriam de um hook específico

  return (
    <div className="space-y-6">
      {/* Alertas Orçamentários para Despesas */}
      {alertasData.length > 0 && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <Bell className="h-5 w-5" />
                Alertas Orçamentários - Impacto em Despesas
              </CardTitle>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Ver Orçamento
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertasData.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-3 border-l-4 rounded-r ${
                    alerta.tipo === "critical" ? "border-red-500 bg-red-50" : "border-amber-500 bg-amber-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle
                          className={`h-4 w-4 ${alerta.tipo === "critical" ? "text-red-600" : "text-amber-600"}`}
                        />
                        <p className="font-medium text-sm">{alerta.message}</p>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{alerta.impacto}</p>
                      <Badge variant="outline" className="text-xs">
                        {alerta.acao}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPIs Dashboard Original */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpisData.map((kpi) => {
          const Icon = kpi.icon
          const isActive = activeFilter === kpi.id

          return (
            <Card
              key={kpi.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                isActive ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200"
              }`}
              onClick={() => onFilterClick(kpi.id)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {kpi.trend}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, AlertTriangle, Bell, TrendingUp } from "lucide-react"

interface KPIsDashboardProps {
  onFilterClick: (filter: string) => void
  activeFilter: string
}

export function KPIsDashboard({ onFilterClick, activeFilter }: KPIsDashboardProps) {
  const kpis = [
    {
      id: "rascunhos",
      title: "Rascunhos",
      value: "8",
      description: "Despesas salvas",
      icon: FileText,
      color: "bg-slate-500",
      trend: "+2 hoje",
    },
    {
      id: "aprovacao",
      title: "Em Aprovação",
      value: "15",
      description: "Aguardando ação",
      icon: Clock,
      color: "bg-amber-500",
      trend: "3 urgentes",
    },
    {
      id: "aprovadas",
      title: "Aprovadas",
      value: "23",
      description: "Aguardando pagamento",
      icon: CheckCircle,
      color: "bg-emerald-500",
      trend: "R$ 45.230",
    },
    {
      id: "vencidas",
      title: "Vencidas",
      value: "4",
      description: "Prazo expirado",
      icon: AlertTriangle,
      color: "bg-red-500",
      trend: "R$ 8.450",
    },
  ]

  const alertasOrcamentarios = [
    {
      id: 1,
      message: "Categoria 'Pessoal e Encargos' atingiu 88% do orçamento mensal",
      tipo: "warning",
      impacto: "Novas despesas desta categoria podem exceder o limite",
      acao: "Revisar orçamento",
    },
    {
      id: 2,
      message: "Projeto 'Capacitação Jovens Tech' com execução crítica (92%)",
      tipo: "critical",
      impacto: "Despesas deste projeto devem ser aprovadas com cautela",
      acao: "Verificar saldo",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Alertas Orçamentários para Despesas */
//       {alertasOrcamentarios.length > 0 && (
//         <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="flex items-center gap-2 text-orange-900">
//                 <Bell className="h-5 w-5" />
//                 Alertas Orçamentários - Impacto em Despesas
//               </CardTitle>
//               <Button variant="outline" size="sm">
//                 <TrendingUp className="h-4 w-4 mr-2" />
//                 Ver Orçamento
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {alertasOrcamentarios.map((alerta) => (
//                 <div
//                   key={alerta.id}
//                   className={`p-3 border-l-4 rounded-r ${
//                     alerta.tipo === "critical" ? "border-red-500 bg-red-50" : "border-amber-500 bg-amber-50"
//                   }`}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <AlertTriangle
//                           className={`h-4 w-4 ${alerta.tipo === "critical" ? "text-red-600" : "text-amber-600"}`}
//                         />
//                         <p className="font-medium text-sm">{alerta.message}</p>
//                       </div>
//                       <p className="text-xs text-gray-600 mb-1">{alerta.impacto}</p>
//                       <Badge variant="outline" className="text-xs">
//                         {alerta.acao}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* KPIs Dashboard Original */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {kpis.map((kpi) => {
//           const Icon = kpi.icon
//           const isActive = activeFilter === kpi.id

//           return (
//             <Card
//               key={kpi.id}
//               className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
//                 isActive ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200"
//               }`}
//               onClick={() => onFilterClick(kpi.id)}
//             >
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
//                 <div className={`p-2 rounded-lg ${kpi.color}`}>
//                   <Icon className="h-4 w-4 text-white" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
//                 <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
//                 <Badge variant="secondary" className="mt-2 text-xs">
//                   {kpi.trend}
//                 </Badge>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
// */