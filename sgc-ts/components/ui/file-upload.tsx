'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface FileUploadProps {
  onFileChange: (file: File | null) => void
  accept: string
  maxSize?: number
}

export function FileUpload({ onFileChange, accept, maxSize = 5 }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        setError(`O arquivo excede o tamanho máximo de ${maxSize}MB.`)
        setSelectedFile(null)
        onFileChange(null)
      } else {
        setError(null)
        setSelectedFile(file)
        onFileChange(file)
      }
    } else {
      setSelectedFile(null)
      onFileChange(null)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    onFileChange(null)
    const input = document.getElementById('file-upload') as HTMLInputElement
    if (input) {
      input.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">Anexo</Label>
      <div className="flex items-center gap-2">
        <Input id="file-upload" type="file" accept={accept} onChange={handleFileChange} className="flex-1" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {selectedFile && (
        <div className="flex items-center justify-between p-2 border rounded-md bg-muted">
          <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
          <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Tipos de arquivo permitidos: {accept}. Tamanho máximo: {maxSize}MB.
      </p>
    </div>
  )
}