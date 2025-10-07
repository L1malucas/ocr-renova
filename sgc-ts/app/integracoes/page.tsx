"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Upload,
  ExternalLink,
  RefreshCw,
  FileText,
  Building2,
  Globe,
} from "lucide-react"

export default function IntegracoesPage() {
  const [syncStatus, setSyncStatus] = useState({
    govbr: "connected",
    str: "connected",
    sapio: "connected",
    bb: "connected",
    protocolo: "pending",
  })

  const integracoes = [
    {
      id: "govbr",
      nome: "Gov.BR",
      descricao: "Autenticação única do governo federal",
      status: syncStatus.govbr,
      ultimaSync: "2024-01-15 14:30",
      icon: Globe,
      funcionalidades: ["Login único", "Validação de CPF/CNPJ", "Dados cadastrais"],
    },
    {
      id: "str",
      nome: "STR - Sistema de Transferência de Recursos",
      descricao: "Envio de prestações de contas",
      status: syncStatus.str,
      ultimaSync: "2024-01-15 12:15",
      icon: Upload,
      funcionalidades: ["Upload DO/DE/RP", "Protocolo digital", "Acompanhamento"],
    },
    {
      id: "sapio",
      nome: "SAPIO - Sistema de Apoio às Leis de Incentivo",
      descricao: "Gestão de projetos incentivados",
      status: syncStatus.sapio,
      ultimaSync: "2024-01-15 11:45",
      icon: FileText,
      funcionalidades: ["Dados do projeto", "Orçamento aprovado", "Alterações"],
    },
    {
      id: "bb",
      nome: "Banco do Brasil - API",
      descricao: "Integração bancária para extratos",
      status: syncStatus.bb,
      ultimaSync: "2024-01-15 09:00",
      icon: Building2,
      funcionalidades: ["Extratos automáticos", "Conciliação", "Saldos"],
    },
    {
      id: "protocolo",
      nome: "Protocolo Digital ANCINE",
      descricao: "Sistema de protocolo digital",
      status: syncStatus.protocolo,
      ultimaSync: "Nunca",
      icon: ExternalLink,
      funcionalidades: ["Envio de documentos", "Diligências", "Recursos"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Conectado</Badge>
      case "error":
        return <Badge variant="destructive">Erro</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const handleSync = (integracaoId: string) => {
    setSyncStatus((prev) => ({ ...prev, [integracaoId]: "pending" }))

    // Simular sincronização
    setTimeout(() => {
      setSyncStatus((prev) => ({ ...prev, [integracaoId]: "connected" }))
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrações Governamentais</h1>
        <p className="text-gray-600 mt-2">Gerencie as integrações com sistemas do governo federal</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Todas as integrações seguem os protocolos de segurança do governo federal. Dados são transmitidos via HTTPS
          com certificação digital.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="status" className="space-y-6">
        <TabsList>
          <TabsTrigger value="status">Status das Integrações</TabsTrigger>
          <TabsTrigger value="configuracao">Configuração</TabsTrigger>
          <TabsTrigger value="logs">Logs de Sincronização</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integracoes.map((integracao) => {
              const Icon = integracao.icon
              return (
                <Card key={integracao.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className="h-8 w-8 text-blue-600" />
                      {getStatusIcon(integracao.status)}
                    </div>
                    <CardTitle className="text-lg">{integracao.nome}</CardTitle>
                    <CardDescription>{integracao.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      {getStatusBadge(integracao.status)}
                    </div>

                    <div>
                      <span className="text-sm text-gray-600">Última sincronização:</span>
                      <p className="text-sm font-medium">{integracao.ultimaSync}</p>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600 block mb-2">Funcionalidades:</span>
                      <div className="flex flex-wrap gap-1">
                        {integracao.funcionalidades.map((func, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {func}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleSync(integracao.id)}
                      disabled={integracao.status === "pending"}
                      className="w-full"
                      size="sm"
                    >
                      {integracao.status === "pending" ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Sincronizando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sincronizar
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="configuracao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Integração</CardTitle>
              <CardDescription>Configure os parâmetros de conexão com os sistemas governamentais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Gov.BR</h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Client ID:</span>
                      <span className="font-mono">gov-br-****-****</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ambiente:</span>
                      <Badge>Produção</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">STR/SAPIO</h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Endpoint:</span>
                      <span className="font-mono">https://str.ancine.gov.br/api</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Certificado:</span>
                      <Badge className="bg-green-100 text-green-800">Válido até 2025</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Banco do Brasil</h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>API Key:</span>
                      <span className="font-mono">bb-api-****-****</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate Limit:</span>
                      <span>1000 req/hora</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Baixar Certificados
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Sincronização</CardTitle>
              <CardDescription>Histórico de sincronizações e eventos das integrações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "15/01/2024 14:30", system: "Gov.BR", action: "Autenticação realizada", status: "success" },
                  {
                    time: "15/01/2024 12:15",
                    system: "STR",
                    action: "Upload DO/DE/RP - Projeto SALIC 123456",
                    status: "success",
                  },
                  {
                    time: "15/01/2024 11:45",
                    system: "SAPIO",
                    action: "Sincronização de dados do projeto",
                    status: "success",
                  },
                  {
                    time: "15/01/2024 09:00",
                    system: "Banco do Brasil",
                    action: "Download de extratos",
                    status: "success",
                  },
                  {
                    time: "14/01/2024 16:20",
                    system: "Protocolo Digital",
                    action: "Tentativa de conexão",
                    status: "error",
                  },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {log.status === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{log.action}</p>
                        <p className="text-xs text-gray-600">
                          {log.system} • {log.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant={log.status === "success" ? "default" : "destructive"}>
                      {log.status === "success" ? "Sucesso" : "Erro"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
