"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Shield, Clock } from "lucide-react"
import { useUsuarios } from "@/hooks/use-usuarios"

export function AuditoriaLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroAcao, setFiltroAcao] = useState("all")
  const [filtroEntidade, setFiltroEntidade] = useState("all")
  const { logs, usuarios } = useUsuarios()

  const logsFiltrados = logs.filter((log) => {
    const matchSearch =
      log.detalhes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.acao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchAcao = filtroAcao === "all" || log.acao === filtroAcao
    const matchEntidade = filtroEntidade === "all" || log.entidade === filtroEntidade

    return matchSearch && matchAcao && matchEntidade
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  const getUsuarioNome = (usuarioId: string) => {
    const usuario = usuarios.find((u) => u.id === usuarioId)
    return usuario?.nome || "Sistema"
  }

  const getAcaoColor = (acao: string) => {
    if (acao.includes("criar")) return "bg-green-100 text-green-800"
    if (acao.includes("atualizar") || acao.includes("editar")) return "bg-blue-100 text-blue-800"
    if (acao.includes("excluir") || acao.includes("desativar")) return "bg-red-100 text-red-800"
    if (acao.includes("aprovar")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  const acoes = [...new Set(logs.map((log) => log.acao))].sort()
  const entidades = [...new Set(logs.map((log) => log.entidade))].sort()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Logs de Auditoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar nos logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <Select value={filtroAcao} onValueChange={setFiltroAcao}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por ação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as ações</SelectItem>
              {acoes.map((acao) => (
                <SelectItem key={acao} value={acao}>
                  {acao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filtroEntidade} onValueChange={setFiltroEntidade}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por entidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as entidades</SelectItem>
              {entidades.map((entidade) => (
                <SelectItem key={entidade} value={entidade}>
                  {entidade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Entidade</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logsFiltrados.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      {formatDate(log.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell>{getUsuarioNome(log.usuarioId)}</TableCell>
                  <TableCell>
                    <Badge className={getAcaoColor(log.acao)}>{log.acao}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.entidade}</Badge>
                  </TableCell>
                  <TableCell className="max-w-md truncate">{log.detalhes}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {logsFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-2" />
            <p>Nenhum log encontrado</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
