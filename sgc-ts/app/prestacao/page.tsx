"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Clock, Download, Upload, FileText, Send, Eye, AlertTriangle } from "lucide-react"

export default function PrestacaoPage() {
  const [etapaAtual, setEtapaAtual] = useState(3)
  const [enviando, setEnviando] = useState(false)

  const etapas = [
    { id: 1, nome: "Dados do Projeto", status: "completed" },
    { id: 2, nome: "Execução Financeira", status: "completed" },
    { id: 3, nome: "Documentação", status: "current" },
    { id: 4, nome: "Validação Final", status: "pending" },
    { id: 5, nome: "Envio STR/SAPIO", status: "pending" },
  ]

  const documentos = [
    { nome: "Demonstrativo Orçamentário (DO)", status: "completed", arquivo: "DO_SALIC123456.pdf" },
    { nome: "Demonstrativo de Execução (DE)", status: "completed", arquivo: "DE_SALIC123456.pdf" },
    { nome: "Relação de Pagamentos (RP)", status: "completed", arquivo: "RP_SALIC123456.pdf" },
    { nome: "Extratos Bancários", status: "completed", arquivo: "extratos_completos.pdf" },
    { nome: "Comprovante GRU", status: "completed", arquivo: "GRU_123456.pdf" },
    { nome: "CPB - Certificado de Produto Brasileiro", status: "pending", arquivo: null },
    { nome: "Material de Divulgação", status: "completed", arquivo: "divulgacao.zip" },
    { nome: "Relatório de Atividades", status: "completed", arquivo: "relatorio_final.pdf" },
  ]

  const validacoes = [
    { item: "Pagamentos via conta de movimentação", status: "ok", detalhes: "100% dos pagamentos válidos" },
    { item: "Documentos fiscais com SALIC", status: "ok", detalhes: "Todas as notas identificadas" },
    { item: "Hiato máximo de 30 dias", status: "warning", detalhes: "2 documentos com hiato > 25 dias" },
    { item: "Contrapartida comprovada", status: "ok", detalhes: "R$ 50.000,00 comprovados" },
    { item: "Logomarca ANCINE aplicada", status: "ok", detalhes: "Verificação automática aprovada" },
    { item: "Orçamento dentro do limite", status: "ok", detalhes: "98% do orçamento executado" },
  ]

  const handleEnviarPrestacao = () => {
    setEnviando(true)
    // Simular envio
    setTimeout(() => {
      setEnviando(false)
      setEtapaAtual(5)
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "ok":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />
      default:
        return <AlertCircle className="h-5 w-5 text-red-600" />
    }
  }

  const progressoGeral = (etapas.filter((e) => e.status === "completed").length / etapas.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Prestação de Contas Final</h1>
        <p className="text-gray-600 mt-2">Projeto SALIC 123456 - "Documentário sobre Cinema Brasileiro"</p>
      </div>

      {/* Progresso Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso da Prestação</CardTitle>
          <CardDescription>Acompanhe o andamento da sua prestação de contas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progresso geral</span>
              <span>{Math.round(progressoGeral)}% concluído</span>
            </div>
            <Progress value={progressoGeral} className="h-2" />

            <div className="grid gap-2 mt-4">
              {etapas.map((etapa) => (
                <div key={etapa.id} className="flex items-center space-x-3">
                  {getStatusIcon(etapa.status)}
                  <span className={`text-sm ${etapa.status === "current" ? "font-semibold" : ""}`}>{etapa.nome}</span>
                  {etapa.status === "current" && <Badge className="bg-blue-100 text-blue-800">Em andamento</Badge>}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Documentos Obrigatórios */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Obrigatórios</CardTitle>
            <CardDescription>Conforme Manual de Prestação de Contas v2.2</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentos.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <p className="font-medium text-sm">{doc.nome}</p>
                      {doc.arquivo && <p className="text-xs text-gray-600">{doc.arquivo}</p>}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {doc.status === "completed" && (
                      <>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {doc.status === "pending" && (
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Validações de Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Validações de Compliance</CardTitle>
            <CardDescription>Verificações automáticas conforme regulamentação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {validacoes.map((validacao, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {getStatusIcon(validacao.status)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{validacao.item}</p>
                    <p className="text-xs text-gray-600">{validacao.detalhes}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações de Envio */}
      <Card>
        <CardHeader>
          <CardTitle>Envio da Prestação</CardTitle>
          <CardDescription>Envie sua prestação de contas para os sistemas STR e SAPIO</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Após o envio, você terá 180 dias para responder eventuais diligências da ANCINE. Certifique-se de que
              todos os documentos estão corretos.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-4">
            <Button onClick={handleEnviarPrestacao} disabled={enviando || etapaAtual < 4} className="flex-1">
              {enviando ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-pulse" />
                  Enviando para STR/SAPIO...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Prestação Final
                </>
              )}
            </Button>

            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Gerar Relatório
            </Button>
          </div>

          {etapaAtual === 5 && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Prestação de contas enviada com sucesso! Protocolo: PC-2024-001234
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
