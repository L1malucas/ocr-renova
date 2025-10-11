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
        onError: (error) => {
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
