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
import { useCreateReceita, useUpdateReceita } from "@/hooks/use-receitas"
import { ReceitaDto } from "@/models/receita.model"
import { useToast } from "@/components/ui/use-toast"

// Schema de validação com Zod
const formSchema = z.object({
  referencia: z.string().min(3, "A referência é obrigatória."),
  data: z.string().min(1, "A data é obrigatória."),
  valor: z.number().positive("O valor deve ser positivo."),
  fonteId: z.string().min(1, "A fonte é obrigatória."),
  status: z.string().min(1, "O status é obrigatório."),
  observacoes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ReceitaFormProps {
  receitaToEdit?: ReceitaDto | null
  onSuccess: () => void
}

export function ReceitaForm({ receitaToEdit, onSuccess }: ReceitaFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateReceita()
  const updateMutation = useUpdateReceita()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referencia: "",
      data: new Date().toISOString().split("T")[0],
      valor: 0,
      fonteId: "",
      status: "Pendente",
      observacoes: "",
    },
  })

  // Preenche o formulário se estiver no modo de edição
  useEffect(() => {
    if (receitaToEdit) {
      form.reset({
        ...receitaToEdit,
        data: new Date(receitaToEdit.data).toISOString().split("T")[0],
      })
    }
  }, [receitaToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = receitaToEdit ? updateMutation : createMutation
    const action = receitaToEdit ? "update" : "create"

    const dataToSubmit = {
      ...values,
      // Garante que a data esteja no formato correto para a API, se necessário
      data: new Date(values.data).toISOString(),
    }

    mutation.mutate(
      action === "update"
        ? { id: receitaToEdit!.id, data: dataToSubmit }
        : dataToSubmit,
      {
        onSuccess: () => {
          toast({
            title: `Receita ${action === 'update' ? 'atualizada' : 'criada'} com sucesso!`,
          })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({
            title: "Erro ao salvar receita",
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
            <CardTitle>Informações da Receita</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="referencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referência</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Doação Anual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
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
                name="fonteId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fonte do Recurso</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                         <SelectTrigger><SelectValue placeholder="Selecione a fonte" /></SelectTrigger>
                       </FormControl>
                       <SelectContent>
                         {/* TODO: Popular com dados reais */}
                         <SelectItem value="fonte1">Fonte A</SelectItem>
                         <SelectItem value="fonte2">Fonte B</SelectItem>
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
                         <SelectItem value="Pendente">Pendente</SelectItem>
                         <SelectItem value="Confirmado">Confirmado</SelectItem>
                         <SelectItem value="Conciliado">Conciliado</SelectItem>
                       </SelectContent>
                     </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detalhes adicionais..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Receita"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

// /*
// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Plus, Trash2, Upload, X } from "lucide-react"
// import { useReceitas } from "@/hooks/use-receitas"
// import type { Recebimento } from "@/lib/types"
// import { useToast } from "@/hooks/use-toast"

// interface ReceitaFormProps {
//   onCancel: () => void
//   onSuccess: () => void
//   receita?: Recebimento
// }

// interface RateioItem {
//   projeto_id: string
//   centro_custo_id: string
//   percentual: number
//   valor: number
// }

// export function ReceitaForm({ onCancel, onSuccess, receita }: ReceitaFormProps) {
//   const { createRecebimento, updateRecebimento, fontesRecurso } = useReceitas()
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)

//   // Form state
//   const [formData, setFormData] = useState({
//     data: receita?.data ? receita.data.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
//     valor_bruto: receita?.valor_bruto || 0,
//     valor_liquido: receita?.valor_liquido || 0,
//     fonte_id: receita?.fonte_id || "",
//     conta_bancaria_id: receita?.conta_bancaria_id || "",
//     categoria_id: receita?.categoria_id || "",
//     referencia: receita?.referencia || "",
//     observacoes: receita?.observacoes || "",
//     status: receita?.status || ("Pendente" as const),
//   })

//   const [rateios, setRateios] = useState<RateioItem[]>([
//     { projeto_id: "", centro_custo_id: "", percentual: 100, valor: formData.valor_liquido },
//   ])

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))

//     // Update rateio values when valor_liquido changes
//     if (field === "valor_liquido") {
//       setRateios((prev) =>
//         prev.map((rateio) => ({
//           ...rateio,
//           valor: (value * rateio.percentual) / 100,
//         })),
//       )
//     }
//   }

//   const addRateio = () => {
//     setRateios((prev) => [...prev, { projeto_id: "", centro_custo_id: "", percentual: 0, valor: 0 }])
//   }

//   const removeRateio = (index: number) => {
//     setRateios((prev) => prev.filter((_, i) => i !== index))
//   }

//   const updateRateio = (index: number, field: keyof RateioItem, value: any) => {
//     setRateios((prev) =>
//       prev.map((rateio, i) => {
//         if (i === index) {
//           const updated = { ...rateio, [field]: value }
//           if (field === "percentual") {
//             updated.valor = (formData.valor_liquido * value) / 100
//           }
//           return updated
//         }
//         return rateio
//       }),
//     )
//   }

//   const totalPercentual = rateios.reduce((sum, rateio) => sum + rateio.percentual, 0)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (totalPercentual !== 100) {
//       toast({
//         title: "Erro no rateio",
//         description: "A soma dos percentuais deve ser 100%",
//         variant: "destructive",
//       })
//       return
//     }

//     setLoading(true)
//     try {
//       const recebimentoData = {
//         ...formData,
//         data: new Date(formData.data),
//         valor_bruto: Number(formData.valor_bruto),
//         valor_liquido: Number(formData.valor_liquido),
//       }

//       if (receita) {
//         await updateRecebimento(receita.id, recebimentoData)
//         toast({
//           title: "Receita atualizada",
//           description: "A receita foi atualizada com sucesso.",
//         })
//       } else {
//         await createRecebimento(recebimentoData as any)
//         toast({
//           title: "Receita criada",
//           description: "A receita foi criada com sucesso.",
//         })
//       }

//       onSuccess()
//     } catch (error) {
//       toast({
//         title: "Erro",
//         description: "Ocorreu um erro ao salvar a receita.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-balance">{receita ? "Editar Receita" : "Nova Receita"}</h1>
//           <p className="text-muted-foreground">
//             {receita ? "Atualize os dados da receita" : "Registre uma nova entrada financeira"}
//           </p>
//         </div>
//         <Button variant="outline" onClick={onCancel}>
//           <X className="h-4 w-4 mr-2" />
//           Cancelar
//         </Button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Information */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Informações Básicas</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="data">Data do Recebimento</Label>
//                 <Input
//                   id="data"
//                   type="date"
//                   value={formData.data}
//                   onChange={(e) => handleInputChange("data", e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="referencia">Referência</Label>
//                 <Input
//                   id="referencia"
//                   placeholder="Ex: Doação João Silva - Janeiro/2024"
//                   value={formData.referencia}
//                   onChange={(e) => handleInputChange("referencia", e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="valor_bruto">Valor Bruto</Label>
//                 <Input
//                   id="valor_bruto"
//                   type="number"
//                   step="0.01"
//                   placeholder="0,00"
//                   value={formData.valor_bruto}
//                   onChange={(e) => handleInputChange("valor_bruto", Number.parseFloat(e.target.value) || 0)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="valor_liquido">Valor Líquido</Label>
//                 <Input
//                   id="valor_liquido"
//                   type="number"
//                   step="0.01"
//                   placeholder="0,00"
//                   value={formData.valor_liquido}
//                   onChange={(e) => handleInputChange("valor_liquido", Number.parseFloat(e.target.value) || 0)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fonte_id">Fonte de Recurso</Label>
//                 <Select value={formData.fonte_id} onValueChange={(value) => handleInputChange("fonte_id", value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Selecione a fonte" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {fontesRecurso.map((fonte) => (
//                       <SelectItem key={fonte.id} value={fonte.id}>
//                         {fonte.nome} ({fonte.tipo})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="status">Status</Label>
//                 <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Pendente">Pendente</SelectItem>
//                     <SelectItem value="Confirmado">Confirmado</SelectItem>
//                     <SelectItem value="Conciliado">Conciliado</SelectItem>
//                     <SelectItem value="Estornado">Estornado</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="observacoes">Observações</Label>
//               <Textarea
//                 id="observacoes"
//                 placeholder="Informações adicionais sobre a receita..."
//                 value={formData.observacoes}
//                 onChange={(e) => handleInputChange("observacoes", e.target.value)}
//                 rows={3}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Rateio Section */}
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Rateio por Projeto</CardTitle>
//               <Button type="button" variant="outline" size="sm" onClick={addRateio}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Adicionar Rateio
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {rateios.map((rateio, index) => (
//               <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
//                 <div className="flex-1 space-y-2">
//                   <Label>Projeto</Label>
//                   <Select value={rateio.projeto_id} onValueChange={(value) => updateRateio(index, "projeto_id", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione o projeto" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="proj1">Projeto Educação</SelectItem>
//                       <SelectItem value="proj2">Projeto Saúde</SelectItem>
//                       <SelectItem value="proj3">Projeto Social</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="w-24 space-y-2">
//                   <Label>%</Label>
//                   <Input
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={rateio.percentual}
//                     onChange={(e) => updateRateio(index, "percentual", Number.parseFloat(e.target.value) || 0)}
//                   />
//                 </div>
//                 <div className="w-32 space-y-2">
//                   <Label>Valor</Label>
//                   <Input type="number" step="0.01" value={rateio.valor.toFixed(2)} readOnly className="bg-muted" />
//                 </div>
//                 {rateios.length > 1 && (
//                   <Button type="button" variant="ghost" size="sm" onClick={() => removeRateio(index)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 )}
//               </div>
//             ))}

//             <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
//               <span className="font-medium">Total:</span>
//               <div className="flex gap-4">
//                 <Badge variant={totalPercentual === 100 ? "default" : "destructive"}>{totalPercentual}%</Badge>
//                 <span className="font-medium">R$ {rateios.reduce((sum, r) => sum + r.valor, 0).toFixed(2)}</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Attachments */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Anexos</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
//               <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
//               <p className="text-sm text-muted-foreground mb-2">
//                 Arraste e solte os arquivos aqui ou clique para selecionar
//               </p>
//               <p className="text-xs text-muted-foreground">Formatos aceitos: PDF, JPG, PNG (máx. 10MB cada)</p>
//               <Button type="button" variant="outline" className="mt-4 bg-transparent">
//                 Selecionar Arquivos
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Actions */}
//         <div className="flex justify-end gap-4">
//           <Button type="button" variant="outline" onClick={onCancel}>
//             Cancelar
//           </Button>
//           <Button type="submit" disabled={loading || totalPercentual !== 100}>
//             {loading ? "Salvando..." : receita ? "Atualizar Receita" : "Criar Receita"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }
// */