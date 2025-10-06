import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle, FileText } from "lucide-react"

interface PendingTask {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  type: "approval" | "reconciliation" | "review" | "other"
  count?: number
}

const pendingTasks: PendingTask[] = [
  {
    id: "1",
    title: "Despesas para Aprovar",
    description: "Aguardando sua aprovação",
    priority: "high",
    type: "approval",
    count: 3,
  },
  {
    id: "2",
    title: "Conciliação Bancária",
    description: "Transações não conciliadas",
    priority: "medium",
    type: "reconciliation",
    count: 5,
  },
  {
    id: "3",
    title: "Relatórios Pendentes",
    description: "Relatórios mensais em atraso",
    priority: "medium",
    type: "review",
    count: 2,
  },
  {
    id: "4",
    title: "Documentos em Análise",
    description: "Comprovantes para validação",
    priority: "low",
    type: "other",
    count: 1,
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "approval":
      return CheckCircle
    case "reconciliation":
      return Clock
    case "review":
      return FileText
    default:
      return AlertTriangle
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "default"
    case "low":
      return "secondary"
    default:
      return "default"
  }
}

export function PendingTasks() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Minhas Tarefas Pendentes</CardTitle>
        <CardDescription>Ações que requerem sua atenção</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingTasks.map((task) => {
          const Icon = getIcon(task.type)
          return (
            <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{task.title}</h4>
                    {task.count && <Badge variant={getPriorityColor(task.priority) as any}>{task.count}</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver Detalhes
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
