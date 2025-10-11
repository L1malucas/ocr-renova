"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateFornecedor, useUpdateFornecedor } from "@/hooks/use-fornecedores"
import { FornecedorDto } from "@/models/fornecedor.model"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  documento: z.string().min(11, "O documento (CNPJ/CPF) é obrigatório."),
  contato: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface FornecedorFormProps {
  fornecedorToEdit?: FornecedorDto | null
  onSuccess: () => void
}

export function FornecedorForm({ fornecedorToEdit, onSuccess }: FornecedorFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateFornecedor()
  const updateMutation = useUpdateFornecedor()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { nome: "", documento: "", contato: "" },
  })

  useEffect(() => {
    if (fornecedorToEdit) {
      form.reset(fornecedorToEdit)
    }
  }, [fornecedorToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = fornecedorToEdit ? updateMutation : createMutation
    const action = fornecedorToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: fornecedorToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Fornecedor ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar fornecedor", description: error.message, variant: "destructive" })
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
            <FormLabel>Nome / Razão Social</FormLabel>
            <FormControl><Input placeholder="Nome do fornecedor" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="documento" render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ / CPF</FormLabel>
            <FormControl><Input placeholder="00.000.000/0000-00" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contato" render={({ field }) => (
          <FormItem>
            <FormLabel>Contato (Telefone ou E-mail)</FormLabel>
            <FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl>
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
