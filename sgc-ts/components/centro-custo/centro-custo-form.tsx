"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import *s z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateCentroCusto, useUpdateCentroCusto } from "@/hooks/use-centro-custo"
import { CentroCustoDto } from "@/models/centro-custo.model"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  codigo: z.string().min(1, "O código é obrigatório."),
})

type FormValues = z.infer<typeof formSchema>

interface CentroCustoFormProps {
  centroCustoToEdit?: CentroCustoDto | null
  onSuccess: () => void
}

export function CentroCustoForm({ centroCustoToEdit, onSuccess }: CentroCustoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateCentroCusto()
  const updateMutation = useUpdateCentroCusto()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { nome: "", codigo: "" },
  })

  useEffect(() => {
    if (centroCustoToEdit) {
      form.reset(centroCustoToEdit)
    }
  }, [centroCustoToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = centroCustoToEdit ? updateMutation : createMutation
    const action = centroCustoToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: centroCustoToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Centro de Custo ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar Centro de Custo", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FormField control={form.control} name="nome" render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Centro de Custo</FormLabel>
            <FormControl><Input placeholder="Nome do Centro de Custo" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="codigo" render={({ field }) => (
          <FormItem>
            <FormLabel>Código</FormLabel>
            <FormControl><Input placeholder="Código do Centro de Custo" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Button>
        </div>
      </form>
    </Form>
  )
}
