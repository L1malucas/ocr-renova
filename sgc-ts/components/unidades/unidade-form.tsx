"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateUnidade, useUpdateUnidade } from "@/hooks/use-unidades"
import { UnidadeDto } from "@/models/unidade.model"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  codigo: z.string().min(1, "O código é obrigatório."),
  organizacaoSocialId: z.string().min(1, "A Organização Social é obrigatória."),
})

type FormValues = z.infer<typeof formSchema>

interface UnidadeFormProps {
  unidadeToEdit?: UnidadeDto | null
  onSuccess: () => void
}

export function UnidadeForm({ unidadeToEdit, onSuccess }: UnidadeFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateUnidade()
  const updateMutation = useUpdateUnidade()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { nome: "", codigo: "", organizacaoSocialId: "" },
  })

  useEffect(() => {
    if (unidadeToEdit) {
      form.reset(unidadeToEdit)
    }
  }, [unidadeToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = unidadeToEdit ? updateMutation : createMutation
    const action = unidadeToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: unidadeToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Unidade ${action === 'update' ? 'atualizada' : 'criada'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar unidade", description: error.message, variant: "destructive" })
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
            <FormLabel>Nome da Unidade</FormLabel>
            <FormControl><Input placeholder="Nome da unidade" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="codigo" render={({ field }) => (
          <FormItem>
            <FormLabel>Código</FormLabel>
            <FormControl><Input placeholder="Código da unidade" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="organizacaoSocialId" render={({ field }) => (
          <FormItem>
            <FormLabel>Organização Social</FormLabel>
            <FormControl><Input placeholder="ID da Organização Social" {...field} /></FormControl>
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
