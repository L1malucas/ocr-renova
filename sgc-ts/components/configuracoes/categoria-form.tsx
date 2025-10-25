"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateCategoria, useUpdateCategoria } from "@/hooks/use-categorias"
import { CategoriaDto, CriarCategoriaSchema } from "@/models/categoria.model"
import { TipoCategoria } from "@/services/categorias.service"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarCategoriaSchema>

interface CategoriaFormProps {
  tipo: TipoCategoria
  categoriaToEdit?: CategoriaDto | null
  onSuccess: () => void
}

export function CategoriaForm({ tipo, categoriaToEdit, onSuccess }: CategoriaFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateCategoria()
  const updateMutation = useUpdateCategoria()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarCategoriaSchema),
    defaultValues: categoriaToEdit || {},
  })

  useEffect(() => {
    if (categoriaToEdit) {
      form.reset(categoriaToEdit)
    }
  }, [categoriaToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = categoriaToEdit ? updateMutation : createMutation
    const action = categoriaToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { tipo, id: categoriaToEdit!.id, data: values }
        : { tipo, data: values },
      {
        onSuccess: () => {
          toast({ title: `Categoria ${action === 'update' ? 'atualizada' : 'criada'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar categoria", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarCategoriaSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Button>
        </div>
      </form>
    </Form>
  )
}
