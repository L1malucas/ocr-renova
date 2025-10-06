"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, XCircle, Shield, Clock } from "lucide-react"

interface ValidationRule {
  id: string
  category: string
  rule: string
  status: "passed" | "failed" | "warning" | "pending"
  message: string
  reference?: string
}

interface ComplianceValidatorProps {
  projectId: string
  validationType: "payment" | "budget" | "contrapartida" | "objeto" | "full"
}

export function ComplianceValidator({ projectId, validationType }: ComplianceValidatorProps) {
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [validationProgress, setValidationProgress] = useState(0)

  // Mock validation rules based on the manual
  const mockRules: ValidationRule[] = [
    {
      id: "1",
      category: "Pagamentos",
      rule: "Hiato máximo de 30 dias entre débito e emissão",
      status: "passed",
      message: "Todos os pagamentos respeitam o prazo de 30 dias",
      reference: "Manual p.9, p.23",
    },
    {
      id: "2",
      category: "Pagamentos",
      rule: "Documentos fiscais contêm identificação do projeto",
      status: "passed",
      message: "Título e SALIC identificados em todos os documentos",
      reference: "Manual p.27",
    },
    {
      id: "3",
      category: "Pagamentos",
      rule: "Pagamentos via conta de movimentação",
      status: "warning",
      message: "1 pagamento via reembolso - verificar se está nas hipóteses permitidas",
      reference: "Manual p.23-24",
    },
    {
      id: "4",
      category: "Orçamento",
      rule: "Remanejamento não excede 20% do orçamento global",
      status: "passed",
      message: "Alterações representam 3,3% do orçamento total",
      reference: "Manual p.9",
    },
    {
      id: "5",
      category: "Contrapartida",
      rule: "Vedação de contrapartida não financeira da proponente",
      status: "failed",
      message: "Contrapartida de sócio da proponente identificada",
      reference: "Manual p.64-66",
    },
    {
      id: "6",
      category: "Bancário",
      rule: "Contas abertas no Banco do Brasil pela ANCINE",
      status: "passed",
      message: "Todas as contas são BB e foram abertas pela ANCINE",
      reference: "Manual p.22-23",
    },
    {
      id: "7",
      category: "Bancário",
      rule: "Vedação de saque em espécie/cheque",
      status: "passed",
      message: "Apenas transferências eletrônicas e PIX identificados",
      reference: "Manual p.23-25",
    },
    {
      id: "8",
      category: "Objeto",
      rule: "Entrega de CPB à Cinemateca",
      status: "passed",
      message: "CPB entregue conforme comprovante anexado",
      reference: "Manual p.19-21",
    },
  ]

  useEffect(() => {
    // Simulate validation process
    setIsValidating(true)
    setValidationProgress(0)

    const interval = setInterval(() => {
      setValidationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsValidating(false)
          setValidationRules(mockRules)
          return 100
        }
        return prev + 12.5
      })
    }, 300)

    return () => clearInterval(interval)
  }, [projectId, validationType])

  const getStatusIcon = (status: ValidationRule["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: ValidationRule["status"]) => {
    switch (status) {
      case "passed":
        return <Badge variant="default">Aprovado</Badge>
      case "failed":
        return <Badge variant="destructive">Reprovado</Badge>
      case "warning":
        return <Badge variant="secondary">Atenção</Badge>
      case "pending":
        return <Badge variant="outline">Pendente</Badge>
    }
  }

  const passedRules = validationRules.filter((r) => r.status === "passed").length
  const failedRules = validationRules.filter((r) => r.status === "failed").length
  const warningRules = validationRules.filter((r) => r.status === "warning").length

  if (isValidating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Validação de Compliance
          </CardTitle>
          <CardDescription>Verificando conformidade com o Manual de Prestação de Contas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso da validação</span>
                <span>{validationProgress.toFixed(0)}%</span>
              </div>
              <Progress value={validationProgress} />
            </div>
            <p className="text-sm text-muted-foreground">
              Executando {mockRules.length} verificações de conformidade...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Resultado da Validação de Compliance
          </CardTitle>
          <CardDescription>Conformidade com o Manual de Prestação de Contas v2.2</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{passedRules}</div>
              <p className="text-sm text-muted-foreground">Aprovadas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{warningRules}</div>
              <p className="text-sm text-muted-foreground">Atenção</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{failedRules}</div>
              <p className="text-sm text-muted-foreground">Reprovadas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Issues Alert */}
      {failedRules > 0 && (
        <Alert>
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Não Conformidades Críticas:</strong> {failedRules} regra(s) não atendida(s). Corrija os problemas
            antes de submeter a prestação de contas.
          </AlertDescription>
        </Alert>
      )}

      {/* Validation Results */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento das Validações</CardTitle>
          <CardDescription>Verificações realizadas com base no Manual v2.2 (27/06/2022)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {validationRules.map((rule) => (
              <div key={rule.id} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex items-start space-x-3 flex-1">
                  {getStatusIcon(rule.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium">{rule.rule}</p>
                      <Badge variant="outline" className="text-xs">
                        {rule.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.message}</p>
                    {rule.reference && (
                      <p className="text-xs text-muted-foreground mt-1">Referência: {rule.reference}</p>
                    )}
                  </div>
                </div>
                {getStatusBadge(rule.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
