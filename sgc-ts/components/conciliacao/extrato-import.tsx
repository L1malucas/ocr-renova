"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { useConciliacao } from "@/hooks/use-conciliacao"
import { useToast } from "@/hooks/use-toast"

export function ExtratoImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [contaId, setContaId] = useState("")
  const [importing, setImporting] = useState(false)
  const { importarExtrato } = useConciliacao()
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleImport = async () => {
    if (!selectedFile || !contaId) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo e uma conta bancária",
        variant: "destructive",
      })
      return
    }

    setImporting(true)
    try {
      const result = await importarExtrato(selectedFile, contaId)
      toast({
        title: "Sucesso",
        description: `${result.movimentos} movimentos importados com sucesso`,
      })
      setSelectedFile(null)
      setContaId("")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao importar extrato",
        variant: "destructive",
      })
    } finally {
      setImporting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Importar Extrato Bancário
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Conta Bancária</label>
          <Select value={contaId} onValueChange={setContaId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a conta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conta-1">Banco do Brasil - CC 12345-6</SelectItem>
              <SelectItem value="conta-2">Caixa Econômica - CC 98765-4</SelectItem>
              <SelectItem value="conta-3">Itaú - CC 11111-1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Arquivo do Extrato (CSV)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input type="file" accept=".csv,.txt" onChange={handleFileSelect} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Clique para selecionar ou arraste o arquivo aqui</p>
              <p className="text-xs text-gray-500 mt-1">Formatos aceitos: CSV, TXT</p>
            </label>
          </div>

          {selectedFile && (
            <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              {selectedFile.name}
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Formato esperado do arquivo:</p>
              <p>Data;Descrição;Valor;Documento</p>
              <p className="text-xs mt-1">Exemplo: 2024-01-15;Transferência PIX;-150,00;DOC123</p>
            </div>
          </div>
        </div>

        <Button onClick={handleImport} disabled={!selectedFile || !contaId || importing} className="w-full">
          {importing ? "Importando..." : "Importar Extrato"}
        </Button>
      </CardContent>
    </Card>
  )
}
