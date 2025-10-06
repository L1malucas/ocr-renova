"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, FileText, Calculator, CreditCard, CheckCircle, Users, BarChart3, Shield, LogIn } from "lucide-react"

export default function HomePage() {
  const [loginType, setLoginType] = useState<"producer" | "analyst">("producer")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">SIGA-PC</h1>
                  <p className="text-sm text-muted-foreground">Sistema de Gestão de Prestação de Contas</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              ANCINE - Ministério da Cultura
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Login Section */}
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                Acesso ao Sistema
              </CardTitle>
              <CardDescription>Faça login para acessar o sistema de prestação de contas</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={loginType} onValueChange={(value) => setLoginType(value as "producer" | "analyst")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="producer">Proponente</TabsTrigger>
                  <TabsTrigger value="analyst">Analista</TabsTrigger>
                </TabsList>

                <TabsContent value="producer" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF/CNPJ</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" />
                  </div>
                  <Button className="w-full">Entrar como Proponente</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Entrar com Gov.BR
                  </Button>
                </TabsContent>

                <TabsContent value="analyst" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input id="matricula" placeholder="Matrícula ANCINE" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-analyst">Senha</Label>
                    <Input id="password-analyst" type="password" />
                  </div>
                  <Button className="w-full">Entrar como Analista</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* System Overview */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Sistema Integrado de Prestação de Contas</h2>
              <p className="text-muted-foreground">
                Plataforma oficial para gestão e acompanhamento da prestação de contas de projetos culturais apoiados
                pela ANCINE.
              </p>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Gestão de Projetos</h3>
                    <p className="text-sm text-muted-foreground">Cadastro e acompanhamento</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Orçamento (DO)</h3>
                    <p className="text-sm text-muted-foreground">Demonstrativo Orçamentário</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Execução (DE/RP)</h3>
                    <p className="text-sm text-muted-foreground">Financeiro e Pagamentos</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Compliance</h3>
                    <p className="text-sm text-muted-foreground">Validação e Auditoria</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Contrapartida</h3>
                    <p className="text-sm text-muted-foreground">Gestão de Contrapartidas</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Análise</h3>
                    <p className="text-sm text-muted-foreground">Relatórios e Deliberação</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Status Indicators */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Status do Sistema
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Integração Gov.BR</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Ativo
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Banco do Brasil API</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Conectado
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">STR/SAPIO</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Operacional
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Sistema desenvolvido em conformidade com o Manual de Prestação de Contas v2.2 (27/06/2022)</p>
          <p className="mt-1">ANCINE - Agência Nacional do Cinema | Ministério da Cultura</p>
        </div>
      </div>
    </div>
  )
}
