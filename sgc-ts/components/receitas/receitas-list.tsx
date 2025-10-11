"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { useGetReceitas, useDeleteReceita } from "@/hooks/use-receitas"
import { ReceitaDto } from "@/models/receita.model"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ReceitasListProps {
  onCreateNew: () => void
  onEdit: (receita: ReceitaDto) => void
}

export function ReceitasList({ onCreateNew, onEdit }: ReceitasListProps) {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Busca os dados usando o hook
  const { data, isLoading, isError, error } = useGetReceitas({ pageNumber: page, pageSize: 10 /*, searchTerm: searchTerm */ })
  const deleteMutation = useDeleteReceita()

  const receitas = data?.data ?? []
  const meta = data?.meta

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, {
        onSuccess: () => setDeletingId(null),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Receitas</h1>
          <p className="text-muted-foreground">Registre e acompanhe todas as entradas financeiras</p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Receita
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por referência..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Referência</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">Carregando...</TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-red-600">
                    Erro ao carregar receitas: {error.message}
                  </TableCell>
                </TableRow>
              )}
              {receitas.map((receita) => (
                <TableRow key={receita.id}>
                  <TableCell>{new Date(receita.data).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="font-medium">{receita.referencia}</TableCell>
                  <TableCell>{receita.fonteId}</TableCell>
                  <TableCell>
                    {receita.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </TableCell>
                  <TableCell><Badge variant="secondary">{receita.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(receita)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeletingId(receita.id)} disabled={deleteMutation.isLoading}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginação */}
      {meta && (
        <div className="flex justify-end items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Página {meta.currentPage} de {meta.totalPages}
          </span>
          <Button onClick={() => setPage(p => p - 1)} disabled={!meta.hasPreviousPage}>Anterior</Button>
          <Button onClick={() => setPage(p => p + 1)} disabled={!meta.hasNextPage}>Próxima</Button>
        </div>
      )}

      {/* Confirmação de Exclusão */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isLoading}>
              {deleteMutation.isLoading ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// /*
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Plus, Search, Eye, Edit, Trash2, Paperclip, Bell, TrendingUp, AlertTriangle } from "lucide-react"
// import { useReceitas } from "@/hooks/use-receitas"
// import type { Recebimento } from "@/lib/types"
// import { ReceitaDrawer } from "./receita-drawer"

// interface ReceitasListProps {
//   onCreateNew: () => void
// }

// export function ReceitasList({ onCreateNew }: ReceitasListProps) {
//   const { recebimentos, loading } = useReceitas()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<string>("all")
//   const [selectedReceita, setSelectedReceita] = useState<Recebimento | null>(null)
//   const [drawerOpen, setDrawerOpen] = useState(false)

//   const filteredRecebimentos = recebimentos.filter((recebimento) => {
//     const matchesSearch =
//       recebimento.referencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       recebimento.observacoes?.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || recebimento.status === statusFilter
//     return matchesSearch && matchesStatus
//   })

//   const alertasOrcamentarios = [
//     {
//       id: 1,
//       message: "Meta de receitas do mês está 25% abaixo do planejado",
//       tipo: "warning",
//       impacto: "Pode afetar execução de projetos dependentes",
//       acao: "Verificar cronograma de recebimentos",
//       valor_atual: "R$ 75.000",
//       valor_meta: "R$ 100.000",
//     },
//     {
//       id: 2,
//       message: "Contrato BNDES com recebimento em atraso (5 dias)",
//       tipo: "critical",
//       impacto: "Fluxo de caixa comprometido para Projeto Capacitação",
//       acao: "Contatar financiador",
//       prazo: "5 dias de atraso",
//     },
//   ]

//   const getStatusBadge = (status: string) => {
//     const variants = {
//       Pendente: "secondary",
//       Confirmado: "default",
//       Conciliado: "default",
//       Estornado: "destructive",
//     } as const

//     const colors = {
//       Pendente: "bg-yellow-100 text-yellow-800",
//       Confirmado: "bg-blue-100 text-blue-800",
//       Conciliado: "bg-green-100 text-green-800",
//       Estornado: "bg-red-100 text-red-800",
//     } as const

//     return (
//       <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
//         {status}
//       </Badge>
//     )
//   }

//   const handleViewDetails = (receita: Recebimento) => {
//     setSelectedReceita(receita)
//     setDrawerOpen(true)
//   }

//   if (loading) {
//     return <div className="flex items-center justify-center p-8">Carregando receitas...</div>
//   }

//   return (
//     <div className="space-y-6">
//       {/* Alertas Orçamentários para Receitas */}
//       {alertasOrcamentarios.length > 0 && (
//         <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="flex items-center gap-2 text-blue-900">
//                 <Bell className="h-5 w-5" />
//                 Alertas Orçamentários - Impacto em Receitas
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
//                       <p className="text-xs text-gray-600 mb-2">{alerta.impacto}</p>
//                       <div className="flex items-center gap-4 text-xs text-gray-500">
//                         <Badge variant="outline" className="text-xs">
//                           {alerta.acao}
//                         </Badge>
//                         {alerta.valor_atual && (
//                           <span>
//                             Atual: {alerta.valor_atual} / Meta: {alerta.valor_meta}
//                           </span>
//                         )}
//                         {alerta.prazo && <span className="text-red-600 font-medium">{alerta.prazo}</span>}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-balance">Gestão de Receitas</h1>
//           <p className="text-muted-foreground">Registre e acompanhe todas as entradas financeiras</p>
//         </div>
//         <Button onClick={onCreateNew} className="gap-2">
//           <Plus className="h-4 w-4" />
//           Nova Receita
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Filtros</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Buscar por referência ou observações..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Todos os Status</SelectItem>
//                 <SelectItem value="Pendente">Pendente</SelectItem>
//                 <SelectItem value="Confirmado">Confirmado</SelectItem>
//                 <SelectItem value="Conciliado">Conciliado</SelectItem>
//                 <SelectItem value="Estornado">Estornado</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table */}
//       <Card>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Data</TableHead>
//                 <TableHead>Referência</TableHead>
//                 <TableHead>Fonte</TableHead>
//                 <TableHead>Valor Líquido</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Anexos</TableHead>
//                 <TableHead className="text-right">Ações</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredRecebimentos.map((recebimento) => (
//                 <TableRow key={recebimento.id} className="cursor-pointer hover:bg-muted/50">
//                   <TableCell>{recebimento.data.toLocaleDateString("pt-BR")}</TableCell>
//                   <TableCell className="font-medium">{recebimento.referencia}</TableCell>
//                   <TableCell>{recebimento.fonte_id}</TableCell>
//                   <TableCell>
//                     R$ {recebimento.valor_liquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
//                   </TableCell>
//                   <TableCell>{getStatusBadge(recebimento.status)}</TableCell>
//                   <TableCell>
//                     <Paperclip className="h-4 w-4 text-muted-foreground" />
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       <Button variant="ghost" size="sm" onClick={() => handleViewDetails(recebimento)}>
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="sm">
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="sm">
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Drawer for details */}
//       <ReceitaDrawer receita={selectedReceita} open={drawerOpen} onOpenChange={setDrawerOpen} />
//     </div>
//   )
// }
// */