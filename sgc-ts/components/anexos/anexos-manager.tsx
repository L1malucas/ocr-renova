"use client"

import { useState } from "react"
import { useGetAnexosByRecurso, useCreateAnexo, useDeleteAnexo, useDownloadAnexo } from "@/hooks/use-anexos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Download, Trash2, Paperclip } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AnexosManagerProps {
  recurso: string
  recursoId: string
}

export function AnexosManager({ recurso, recursoId }: AnexosManagerProps) {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)

  const { data, isLoading, isError } = useGetAnexosByRecurso(recurso, recursoId, { pageNumber: 1, pageSize: 100 })
  const createAnexoMutation = useCreateAnexo()
  const deleteAnexoMutation = useDeleteAnexo()
  const downloadAnexo = useDownloadAnexo()

  const anexos = data?.data ?? []

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) {
      toast({ title: "Nenhum arquivo selecionado", variant: "destructive" })
      return
    }

    createAnexoMutation.mutate(
      {
        arquivo: file,
        tipoProprietario: recurso,
        proprietarioId: recursoId,
        descricao: file.name,
      },
      {
        onSuccess: () => {
          toast({ title: "Upload realizado com sucesso!" })
          setFile(null)
        },
        onError: (error: any) => {
          toast({ title: "Erro no upload", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload de Arquivo</CardTitle>
          <CardDescription>Selecione um arquivo para anexar a este item.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Input type="file" onChange={handleFileChange} className="flex-1" />
          <Button onClick={handleUpload} disabled={!file || createAnexoMutation.isLoading}>
            <Upload className="mr-2 h-4 w-4" />
            {createAnexoMutation.isLoading ? "Enviando..." : "Enviar"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Arquivos Anexados</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Carregando anexos...</p>}
          {isError && <p className="text-red-500">Erro ao carregar anexos.</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Arquivo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anexos.map(anexo => (
                <TableRow key={anexo.id}>
                  <TableCell className="flex items-center gap-2 font-medium">
                    <Paperclip className="h-4 w-4" />
                    {anexo.nomeArquivo}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => downloadAnexo(anexo.id)}><Download className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteAnexoMutation.mutate(anexo.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
