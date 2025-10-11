"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateContrato, useUpdateContrato } from "@/hooks/use-contratos"
import { ContratoDto } from "@/models/contrato.model"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  numero: z.string().min(1, "O número é obrigatório."),
  objeto: z.string().min(3, "O objeto é obrigatório."),
  valor: z.number().positive("O valor deve ser positivo."),
  dataInicio: z.string().min(1, "A data de início é obrigatória."),
  dataFim: z.string().min(1, "A data de fim é obrigatória."),
  // Adicionar outros campos do DTO aqui
})

type FormValues = z.infer<typeof formSchema>

interface ContratoFormProps {
  contratoToEdit?: ContratoDto | null
  onSuccess: () => void
}

export function ContratoForm({ contratoToEdit, onSuccess }: ContratoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateContrato()
  const updateMutation = useUpdateContrato()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numero: "",
      objeto: "",
      valor: 0,
      dataInicio: new Date().toISOString().split("T")[0],
      dataFim: new Date().toISOString().split("T")[0],
    },
  })

  useEffect(() => {
    if (contratoToEdit) {
      form.reset({
        ...contratoToEdit,
        dataInicio: new Date(contratoToEdit.dataInicio).toISOString().split("T")[0],
        dataFim: new Date(contratoToEdit.dataFim).toISOString().split("T")[0],
      })
    }
  }, [contratoToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = contratoToEdit ? updateMutation : createMutation
    const action = contratoToEdit ? "update" : "create"

    const dataToSubmit = {
      ...values,
      dataInicio: new Date(values.dataInicio).toISOString(),
      dataFim: new Date(values.dataFim).toISOString(),
      // Hardcoded values for required fields not in the form
      organizacaoSocialId: 'org-id-placeholder',
      unidadeId: 'unidade-id-placeholder',
    }

    mutation.mutate(
      action === "update"
        ? { id: contratoToEdit!.id, data: dataToSubmit }
        : dataToSubmit,
      {
        onSuccess: () => {
          toast({ title: `Contrato ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar contrato", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Informações do Contrato</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="numero" render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Contrato</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="objeto" render={({ field }) => (
              <FormItem>
                <FormLabel>Objeto</FormLabel>
                <FormControl><Textarea {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-3 gap-4">
              <FormField control={form.control} name="valor" render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl><Input type="number" step="0.01" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dataInicio" render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Início</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dataFim" render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Fim</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Contrato"}</Button>
        </div>
      </form>
    </Form>
  )
}
