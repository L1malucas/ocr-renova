"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AnexosManager } from "@/components/anexos/anexos-manager"
import { CheckCircle, AlertTriangle, Upload, Eye, Download, Film, ImageIcon, Link, FileText } from "lucide-react"

// Mock data for deliverables - Mantendo por enquanto
const mockDeliverables = [
  {
    id: "ent-1", // ID único para ser usado como recursoId
    tipo: "CPB",
    descricao: "Cópia de Preservação Brasileira",
    obrigatorio: true,
    status: "Entregue",
    dataEntrega: "2024-03-15",
  },
  {
    id: "ent-2",
    tipo: "Material de Divulgação",
    descricao: "Cartaz e trailer do documentário",
    obrigatorio: true,
    status: "Entregue",
    dataEntrega: "2024-03-10",
  },
  {
    id: "ent-3",
    tipo: "Relatório de Atividades",
    descricao: "Relatório final de produção",
    obrigatorio: true,
    status: "Pendente",
    dataEntrega: null,
  },
]

// Componentes internos mantidos por enquanto
function MediaRepository() { /* ... */ }
function LogomarcaVerification() { /* ... */ }

export default function Objeto() {
  const [deliverables] = useState(mockDeliverables)
  const [isAnexosOpen, setIsAnexosOpen] = useState(false)
  const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null)

  const handleManageAnexos = (deliverable: any) => {
    setSelectedDeliverable(deliverable)
    setIsAnexosOpen(true)
  }

  const totalDeliverables = deliverables.length
  const entregues = deliverables.filter((d) => d.status === "Entregue").length
  const obrigatoriosPendentes = deliverables.filter((d) => d.obrigatorio && d.status === "Pendente").length
  const percentualConclusao = totalDeliverables > 0 ? (entregues / totalDeliverables) * 100 : 0

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cumprimento do Objeto</h1>
            <p className="text-muted-foreground">Gerencie as entregas obrigatórias do projeto</p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Nova Entrega
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* ... cards ... */}
      </div>

      {obrigatoriosPendentes > 0 && (
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Atenção:</strong> Existem {obrigatoriosPendentes} entregas obrigatórias pendentes.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="checklist" className="space-y-4">
        <TabsList>
          <TabsTrigger value="checklist">Checklist de Entregas</TabsTrigger>
          <TabsTrigger value="repository">Repositório de Mídia</TabsTrigger>
          <TabsTrigger value="logomarca">Verificação de Logomarca</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist">
          <Card>
            <CardHeader>
              <CardTitle>Checklist de Entregas Obrigatórias</CardTitle>
              <CardDescription>Itens necessários para cumprimento do objeto do projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliverables.map((deliverable) => (
                  <div key={deliverable.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{deliverable.tipo}</h3>
                          {deliverable.obrigatorio && <Badge variant="destructive">Obrigatório</Badge>}
                          <Badge variant={deliverable.status === "Entregue" ? "default" : "secondary"}>
                            {deliverable.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{deliverable.descricao}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleManageAnexos(deliverable)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {deliverable.status === "Entregue" ? "Visualizar Anexos" : "Enviar Anexos"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repository">
          <MediaRepository />
        </TabsContent>

        <TabsContent value="logomarca">
          <LogomarcaVerification />
        </TabsContent>
      </Tabs>

      {/* Dialog para Gerenciador de Anexos */}
      <Dialog open={isAnexosOpen} onOpenChange={setIsAnexosOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Anexos para: {selectedDeliverable?.tipo}</DialogTitle>
          </DialogHeader>
          {selectedDeliverable && (
            <AnexosManager 
              recurso="entregas" // O nome do recurso na API (ex: 'despesas', 'contratos')
              recursoId={selectedDeliverable.id} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

// /*
// // CÓDIGO ORIGINAL COMENTADO
// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Progress } from "@/components/ui/progress"
// import { CheckCircle, AlertTriangle, Upload, Eye, Download, Film, ImageIcon, Link, FileText } from "lucide-react"

// // Mock data for deliverables
// const mockDeliverables = [
//   {
//     id: "1",
//     tipo: "CPB",
//     descricao: "Cópia de Preservação Brasileira",
//     obrigatorio: true,
//     status: "Entregue",
//     dataEntrega: "2024-03-15",
//     arquivo: "documentario_cpb.mov",
//     observacoes: "Arquivo entregue à Cinemateca Brasileira",
//   },
//   {
//     id: "2",
//     tipo: "Material de Divulgação",
//     descricao: "Cartaz e trailer do documentário",
//     obrigatorio: true,
//     status: "Entregue",
//     dataEntrega: "2024-03-10",
//     arquivo: "kit_divulgacao.zip",
//     observacoes: "Logomarca ANCINE aplicada conforme manual",
//   },
//   {
//     id: "3",
//     tipo: "Relatório de Atividades",
//     descricao: "Relatório final de produção",
//     obrigatorio: true,
//     status: "Pendente",
//     dataEntrega: null,
//     arquivo: null,
//     observacoes: "Aguardando finalização da pós-produção",
//   },
//   {
//     id: "4",
//     tipo: "Prova de Exibição",
//     descricao: "Comprovantes de exibição pública",
//     obrigatorio: false,
//     status: "Entregue",
//     dataEntrega: "2024-03-20",
//     arquivo: "comprovantes_exibicao.pdf",
//     observacoes: "3 sessões realizadas conforme cronograma",
//   },
// ]

// function MediaRepository() {
//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Repositório de Mídia</CardTitle>
//           <CardDescription>Armazenamento seguro com links protegidos para análise</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 gap-4">
//             <Card className="p-4">
//               <div className="flex items-center space-x-3">
//                 <Film className="h-8 w-8 text-blue-600" />
//                 <div>
//                   <h3 className="font-semibold">Material Final</h3>
//                   <p className="text-sm text-muted-foreground">Obra finalizada para análise</p>
//                   <Button variant="outline" size="sm" className="mt-2 bg-transparent">
//                     <Link className="mr-2 h-4 w-4" />
//                     Gerar Link Protegido
//                   </Button>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-4">
//               <div className="flex items-center space-x-3">
//                 <ImageIcon className="h-8 w-8 text-green-600" />
//                 <div>
//                   <h3 className="font-semibold">Material de Divulgação</h3>
//                   <p className="text-sm text-muted-foreground">Peças publicitárias e promocionais</p>
//                   <Button variant="outline" size="sm" className="mt-2 bg-transparent">
//                     <Link className="mr-2 h-4 w-4" />
//                     Gerar Link Protegido
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           <Alert className="mt-4">
//             <CheckCircle className="h-4 w-4" />
//             <AlertDescription>
//               <strong>Links Seguros:</strong> Os links gerados são protegidos e têm validade de 30 dias para análise da
//               ANCINE. Não há limite de visualizações durante este período.
//             </AlertDescription>
//           </Alert>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// function LogomarcaVerification() {
//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Verificação de Logomarca</CardTitle>
//           <CardDescription>Validação automática da aplicação da logomarca ANCINE</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 border rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <CheckCircle className="h-5 w-5 text-green-600" />
//                 <div>
//                   <p className="font-medium">Cartaz Principal</p>
//                   <p className="text-sm text-muted-foreground">Logomarca ANCINE detectada e validada</p>
//                 </div>
//               </div>
//               <Badge variant="default">Aprovado</Badge>
//             </div>

//             <div className="flex items-center justify-between p-3 border rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <CheckCircle className="h-5 w-5 text-green-600" />
//                 <div>
//                   <p className="font-medium">Trailer</p>
//                   <p className="text-sm text-muted-foreground">Logomarca presente nos créditos finais</p>
//                 </div>
//               </div>
//               <Badge variant="default">Aprovado</Badge>
//             </div>

//             <div className="flex items-center justify-between p-3 border rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <AlertTriangle className="h-5 w-5 text-yellow-600" />
//                 <div>
//                   <p className="font-medium">Material Online</p>
//                   <p className="text-sm text-muted-foreground">Verificação em andamento</p>
//                 </div>
//               </div>
//               <Badge variant="secondary">Analisando</Badge>
//             </div>
//           </div>

//           <div className="mt-6 p-4 bg-muted rounded-lg">
//             <h3 className="font-semibold mb-2">Manual de Aplicação de Logomarca</h3>
//             <p className="text-sm text-muted-foreground mb-3">
//               Consulte o manual oficial para aplicação correta da logomarca ANCINE em todos os materiais do projeto.
//             </p>
//             <Button variant="outline" size="sm">
//               <Download className="mr-2 h-4 w-4" />
//               Baixar Manual
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default function Objeto() {
//   const [deliverables, setDeliverables] = useState(mockDeliverables)
//   const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null)

//   const totalDeliverables = deliverables.length
//   const entregues = deliverables.filter((d) => d.status === "Entregue").length
//   const obrigatoriosPendentes = deliverables.filter((d) => d.obrigatorio && d.status === "Pendente").length
//   const percentualConclusao = (entregues / totalDeliverables) * 100

//   return (
//     <>
//       <div className="mb-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Cumprimento do Objeto</h1>
//             <p className="text-muted-foreground">Gerencie as entregas obrigatórias do projeto</p>
//           </div>
//           <Button>
//             <Upload className="mr-2 h-4 w-4" />
//             Nova Entrega
//           </Button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total de Entregas</CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalDeliverables}</div>
//             <p className="text-xs text-muted-foreground">Itens cadastrados</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Entregues</CardTitle>
//             <CheckCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{entregues}</div>
//             <p className="text-xs text-muted-foreground">Concluídas</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
//             <AlertTriangle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-yellow-600">{obrigatoriosPendentes}</div>
//             <p className="text-xs text-muted-foreground">Obrigatórias</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Progresso</CardTitle>
//             <CheckCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{percentualConclusao.toFixed(0)}%</div>
//             <Progress value={percentualConclusao} className="mt-2" />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Alerts */}
//       {obrigatoriosPendentes > 0 && (
//         <Alert className="mb-6">
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription>
//             <strong>Atenção:</strong> Existem {obrigatoriosPendentes} entregas obrigatórias pendentes. Complete todas
//             as entregas para finalizar a prestação de contas.
//           </AlertDescription>
//         </Alert>
//       )}

//       <Tabs defaultValue="checklist" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="checklist">Checklist de Entregas</TabsTrigger>
//           <TabsTrigger value="repository">Repositório de Mídia</TabsTrigger>
//           <TabsTrigger value="logomarca">Verificação de Logomarca</TabsTrigger>
//         </TabsList>

//         <TabsContent value="checklist">
//           <Card>
//             <CardHeader>
//               <CardTitle>Checklist de Entregas Obrigatórias</CardTitle>
//               <CardDescription>Itens necessários para cumprimento do objeto do projeto</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {deliverables.map((deliverable) => (
//                   <div key={deliverable.id} className="border rounded-lg p-4">
//                     <div className="flex items-start justify-between">
//                       <div className="space-y-2 flex-1">
//                         <div className="flex items-center space-x-2">
//                           <h3 className="font-semibold">{deliverable.tipo}</h3>
//                           {deliverable.obrigatorio && <Badge variant="destructive">Obrigatório</Badge>}
//                           <Badge
//                             variant={
//                               deliverable.status === "Entregue"
//                                 ? "default"
//                                 : deliverable.status === "Pendente"
//                                   ? "secondary"
//                                   : "destructive"
//                             }
//                           >
//                             {deliverable.status}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-muted-foreground">{deliverable.descricao}</p>
//                         {deliverable.dataEntrega && (
//                           <p className="text-xs text-muted-foreground">Entregue em: {deliverable.dataEntrega}</p>
//                         )}
//                         <p className="text-xs text-muted-foreground">{deliverable.observacoes}</p>
//                       </div>
//                       <div className="flex space-x-2">
//                         {deliverable.status === "Entregue" ? (
//                           <>
//                             <Button variant="outline" size="sm">
//                               <Eye className="mr-2 h-4 w-4" />
//                               Visualizar
//                             </Button>
//                             <Button variant="outline" size="sm">
//                               <Download className="mr-2 h-4 w-4" />
//                               Baixar
//                             </Button>
//                           </>
//                         ) : (
//                           <Button size="sm">
//                             <Upload className="mr-2 h-4 w-4" />
//                             Enviar
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="repository">
//           <MediaRepository />
//         </TabsContent>

//         <TabsContent value="logomarca">
//           <LogomarcaVerification />
//         </TabsContent>
//       </Tabs>
//     </>
//   )
// }
// */