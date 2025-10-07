import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectStatusBadgeProps {
  status: string
  className?: string
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Em Execução":
        return "default"
      case "Prestação de Contas":
        return "secondary"
      case "Aprovado":
        return "default"
      case "Reprovado":
        return "destructive"
      case "Diligência":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Execução":
        return "bg-blue-100 text-blue-800"
      case "Prestação de Contas":
        return "bg-yellow-100 text-yellow-800"
      case "Aprovado":
        return "bg-green-100 text-green-800"
      case "Reprovado":
        return "bg-red-100 text-red-800"
      case "Diligência":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Badge variant={getStatusVariant(status)} className={cn(getStatusColor(status), className)}>
      {status}
    </Badge>
  )
}
