"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateDespesa, useUpdateDespesa } from "@/hooks/use-despesas"
import { DespesaDto } from "@/models/despesa.model"
import { useToast } from "@/components/ui/use-toast"
import { useCache } from "@/hooks/use-cache"
import { FornecedorDto } from "@/models/fornecedor.model"

// Schema de validação com Zod
const formSchema = z.object({
  descricao: z.string().min(3, "A descrição é obrigatória."),
  dataVencimento: z.string().min(1, "A data é obrigatória."),
  valor: z.number().positive("O valor deve ser positivo."),
  fornecedorId: z.string().min(1, "O fornecedor é obrigatório."),
  status: z.string().min(1, "O status é obrigatório."),
  // Adicione outros campos conforme o modelo CriarDespesaDto/AtualizarDespesaDto
})

type FormValues = z.infer<typeof formSchema>

interface DespesaFormProps {
  despesaToEdit?: DespesaDto | null
  onSuccess: () => void
}

export function DespesaFormAvancado({ despesaToEdit, onSuccess }: DespesaFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateDespesa()
  const updateMutation = useUpdateDespesa()
  const { getCacheItem } = useCache()

  const fornecedores = getCacheItem<FornecedorDto[]>("fornecedores") || []

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
      dataVencimento: new Date().toISOString().split("T")[0],
      valor: 0,
      fornecedorId: "",
      status: "Rascunho",
    },
  })

  useEffect(() => {
    if (despesaToEdit) {
      form.reset({
        ...despesaToEdit,
        dataVencimento: new Date(despesaToEdit.dataVencimento).toISOString().split("T")[0],
      })
    }
  }, [despesaToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = despesaToEdit ? updateMutation : createMutation
    const action = despesaToEdit ? "update" : "create"

    const dataToSubmit = {
      ...values,
      dataVencimento: new Date(values.dataVencimento).toISOString(),
    }

    mutation.mutate(
      action === "update"
        ? { id: despesaToEdit!.id, data: dataToSubmit }
        : dataToSubmit,
      {
        onSuccess: () => {
          toast({
            title: `Despesa ${action === 'update' ? 'atualizada' : 'criada'} com sucesso!`,
          })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({
            title: "Erro ao salvar despesa",
            description: error.message,
            variant: "destructive",
          })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Despesa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Compra de material de escritório" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dataVencimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Vencimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fornecedorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Selecione o fornecedor" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fornecedores.map(fornecedor => (
                          <SelectItem key={fornecedor.id} value={fornecedor.id}>
                            {fornecedor.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Rascunho">Rascunho</SelectItem>
                        <SelectItem value="Em Aprovação">Em Aprovação</SelectItem>
                        <SelectItem value="Aprovado">Aprovado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Despesa"}
          </Button>
        </div>
      </form>
    </Form>
  )
}


// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Separator } from "@/components/ui/separator"
// import { Upload, FileText, AlertCircle, CheckCircle, Camera, Scan } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// interface DespesaFormAvancadoProps {
//   onCancel: () => void
//   onSuccess: () => void
// }

// export function DespesaFormAvancado({ onCancel, onSuccess }: DespesaFormAvancadoProps) {
//   const [formData, setFormData] = useState({
//     fornecedor: "",
//     valor: "",
//     dataEmissao: "",
//     dataVencimento: "",
//     categoria: "",
//     projeto: "",
//     descricao: "",
//     observacoes: "",
//   })
//   const [anexos, setAnexos] = useState<string[]>([])
//   const [ocrData, setOcrData] = useState<any>(null)
//   const [verificacaoOrcamento, setVerificacaoOrcamento] = useState<any>(null)
//   const { toast } = useToast()

//   const projetos = [
//     { id: "1", nome: "Sede Administrativa", saldoDisponivel: 2500.0 },
//     { id: "2", nome: "Projeto Social ABC", saldoDisponivel: 15000.0 },
//     { id: "3", nome: "Modernização Sistemas", saldoDisponivel: 8750.0 },
//   ]

//   const categorias = ["Material de Escritório", "Consultoria", "Combustível", "Manutenção", "Alimentação", "Transporte"]

//   const fornecedores = [
//     "Papelaria Central Ltda",
//     "TechSolutions Consultoria",
//     "Posto Combustível ABC",
//     "Manutenção Predial Ltda",
//   ]

//   // Simula OCR quando um arquivo é "enviado"
//   const handleFileUpload = (tipo: string) => {
//     const mockOcrData = {
//       fornecedor: "Papelaria Central Ltda",
//       cnpj: "12.345.678/0001-90",
//       valor: "1350.00",
//       dataEmissao: "2024-01-15",
//       numeroNF: "000123456",
//     }

//     setOcrData(mockOcrData)
//     setFormData((prev) => ({
//       ...prev,
//       fornecedor: mockOcrData.fornecedor,
//       valor: mockOcrData.valor,
//       dataEmissao: mockOcrData.dataEmissao,
//     }))
//     setAnexos((prev) => [...prev, `${tipo}-documento.pdf`])

//     toast({
//       title: "Documento Processado",
//       description: "Dados extraídos automaticamente via OCR. Verifique as informações.",
//     })
//   }

//   // Verifica orçamento em tempo real
//   const verificarOrcamento = () => {
//     if (formData.projeto && formData.valor) {
//       const projeto = projetos.find((p) => p.nome === formData.projeto)
//       const valor = Number.parseFloat(formData.valor)

//       if (projeto) {
//         const saldoApos = projeto.saldoDisponivel - valor
//         const percentualUtilizado = ((projeto.saldoDisponivel - saldoApos) / projeto.saldoDisponivel) * 100

//         setVerificacaoOrcamento({
//           projetoNome: projeto.nome,
//           saldoAtual: projeto.saldoDisponivel,
//           saldoApos: saldoApos,
//           percentualUtilizado: percentualUtilizado,
//           status: saldoApos >= 0 ? "ok" : "excedido",
//         })
//       }
//     }
//   }

//   // Executa verificação quando projeto ou valor mudam
//   useState(() => {
//     verificarOrcamento()
//   }, [formData.projeto, formData.valor])

//   const handleSubmit = (acao: "rascunho" | "enviar") => {
//     if (acao === "enviar" && (!formData.fornecedor || !formData.valor || !formData.projeto)) {
//       toast({
//         title: "Campos Obrigatórios",
//         description: "Preencha todos os campos obrigatórios antes de enviar.",
//         variant: "destructive",
//       })
//       return
//     }

//     const mensagem = acao === "rascunho" ? "Despesa salva como rascunho" : "Despesa enviada para aprovação"

//     toast({
//       title: "Sucesso",
//       description: mensagem,
//     })
//     onSuccess()
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Nova Despesa</h2>
//         <Button variant="outline" onClick={onCancel}>
//           Cancelar
//         </Button>
//       </div>

//       {ocrData && (
//         <Card className="border-green-200 bg-green-50">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-green-800">
//               <CheckCircle className="h-5 w-5" />
//               Dados Extraídos Automaticamente
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//               <div>
//                 <span className="font-medium">Fornecedor:</span> {ocrData.fornecedor}
//               </div>
//               <div>
//                 <span className="font-medium">CNPJ:</span> {ocrData.cnpj}
//               </div>
//               <div>
//                 <span className="font-medium">Valor:</span> R$ {ocrData.valor}
//               </div>
//               <div>
//                 <span className="font-medium">Data:</span> {new Date(ocrData.dataEmissao).toLocaleDateString("pt-BR")}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Formulário Principal */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Upload de Anexos */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Anexos e Documentos</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <Button
//                   variant="outline"
//                   className="h-24 flex-col gap-2 bg-transparent"
//                   onClick={() => handleFileUpload("nf-e")}
//                 >
//                   <Upload className="h-6 w-6" />
//                   <span className="text-sm">Upload NF-e (XML)</span>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="h-24 flex-col gap-2 bg-transparent"
//                   onClick={() => handleFileUpload("recibo")}
//                 >
//                   <Camera className="h-6 w-6" />
//                   <span className="text-sm">Foto do Recibo</span>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="h-24 flex-col gap-2 bg-transparent"
//                   onClick={() => handleFileUpload("documento")}
//                 >
//                   <Scan className="h-6 w-6" />
//                   <span className="text-sm">Escanear Documento</span>
//                 </Button>
//               </div>

//               {anexos.length > 0 && (
//                 <div className="space-y-2">
//                   <Label>Arquivos Anexados:</Label>
//                   {anexos.map((anexo, index) => (
//                     <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
//                       <FileText className="h-4 w-4" />
//                       <span className="text-sm">{anexo}</span>
//                       <Badge variant="secondary">Processado</Badge>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Detalhes da Despesa */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Detalhes da Despesa</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="fornecedor">Fornecedor *</Label>
//                   <Select
//                     value={formData.fornecedor}
//                     onValueChange={(value) => setFormData({ ...formData, fornecedor: value })}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione o fornecedor" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {fornecedores.map((fornecedor) => (
//                         <SelectItem key={fornecedor} value={fornecedor}>
//                           {fornecedor}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="valor">Valor *</Label>
//                   <Input
//                     id="valor"
//                     type="number"
//                     step="0.01"
//                     value={formData.valor}
//                     onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
//                     placeholder="0,00"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="dataEmissao">Data de Emissão</Label>
//                   <Input
//                     id="dataEmissao"
//                     type="date"
//                     value={formData.dataEmissao}
//                     onChange={(e) => setFormData({ ...formData, dataEmissao: e.target.value })}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="dataVencimento">Data de Vencimento</Label>
//                   <Input
//                     id="dataVencimento"
//                     type="date"
//                     value={formData.dataVencimento}
//                     onChange={(e) => setFormData({ ...formData, dataVencimento: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <Separator />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="categoria">Categoria *</Label>
//                   <Select
//                     value={formData.categoria}
//                     onValueChange={(value) => setFormData({ ...formData, categoria: value })}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione a categoria" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categorias.map((categoria) => (
//                         <SelectItem key={categoria} value={categoria}>
//                           {categoria}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="projeto">Projeto / Centro de Custo *</Label>
//                   <Select
//                     value={formData.projeto}
//                     onValueChange={(value) => setFormData({ ...formData, projeto: value })}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione o projeto" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {projetos.map((projeto) => (
//                         <SelectItem key={projeto.id} value={projeto.nome}>
//                           {projeto.nome}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="descricao">Descrição</Label>
//                 <Textarea
//                   id="descricao"
//                   value={formData.descricao}
//                   onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
//                   placeholder="Descreva a despesa..."
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="observacoes">Observações</Label>
//                 <Textarea
//                   id="observacoes"
//                   value={formData.observacoes}
//                   onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
//                   placeholder="Observações adicionais..."
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar - Verificação Orçamentária */}
//         <div className="space-y-6">
//           {verificacaoOrcamento && (
//             <Card
//               className={`border-2 ${verificacaoOrcamento.status === "ok" ? "border-green-200" : "border-red-200"}`}
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   {verificacaoOrcamento.status === "ok" ? (
//                     <CheckCircle className="h-5 w-5 text-green-600" />
//                   ) : (
//                     <AlertCircle className="h-5 w-5 text-red-600" />
//                   )}
//                   Verificação Orçamentária
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <div className="text-sm font-medium text-gray-600">Projeto: {verificacaoOrcamento.projetoNome}</div>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Saldo Disponível:</span>
//                     <span className="font-medium">
//                       R$ {verificacaoOrcamento.saldoAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Após esta despesa:</span>
//                     <span
//                       className={`font-medium ${verificacaoOrcamento.status === "ok" ? "text-green-600" : "text-red-600"}`}
//                     >
//                       R$ {verificacaoOrcamento.saldoApos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Utilização:</span>
//                     <span className="font-medium">{verificacaoOrcamento.percentualUtilizado.toFixed(1)}%</span>
//                   </div>
//                   <Progress
//                     value={Math.min(verificacaoOrcamento.percentualUtilizado, 100)}
//                     className={`h-2 ${verificacaoOrcamento.status === "ok" ? "" : "bg-red-100"}`}
//                   />
//                 </div>

//                 {verificacaoOrcamento.status !== "ok" && (
//                   <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                     <div className="flex items-center gap-2 text-red-800 text-sm">
//                       <AlertCircle className="h-4 w-4" />
//                       <span className="font-medium">Orçamento Excedido</span>
//                     </div>
//                     <p className="text-red-700 text-xs mt-1">Esta despesa excede o orçamento disponível do projeto.</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           )}

//           {/* Trilha de Aprovação Prevista */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Trilha de Aprovação</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                     <span className="text-xs font-medium text-blue-600">1</span>
//                   </div>
//                   <div className="text-sm">
//                     <div className="font-medium">Maria Souza</div>
//                     <div className="text-gray-500">Gerente do Projeto</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
//                     <span className="text-xs font-medium text-gray-600">2</span>
//                   </div>
//                   <div className="text-sm">
//                     <div className="font-medium">Carlos Lima</div>
//                     <div className="text-gray-500">Diretor Financeiro</div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Botões de Ação */}
//       <div className="flex justify-end gap-4 pt-6 border-t">
//         <Button variant="outline" onClick={() => handleSubmit("rascunho")}>
//           Salvar Rascunho
//         </Button>
//         <Button onClick={() => handleSubmit("enviar")}>Salvar e Enviar para Aprovação</Button>
//       </div>
//     </div>
// */}