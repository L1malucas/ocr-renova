"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateFornecedor, useUpdateFornecedor } from "@/hooks/use-fornecedores"
import { FornecedorDto, CriarFornecedorSchema } from "@/models/fornecedor.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarFornecedorSchema>

interface FornecedorFormProps {
  fornecedorToEdit?: FornecedorDto | null
  onSuccess: () => void
}

export function FornecedorForm({ fornecedorToEdit, onSuccess }: FornecedorFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateFornecedor()
  const updateMutation = useUpdateFornecedor()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarFornecedorSchema),
    defaultValues: fornecedorToEdit || {},
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
        {generateFormFields(CriarFornecedorSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Button>
        </div>
      </form>
    </Form>
  )
}

