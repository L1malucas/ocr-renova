"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, UserCheck, UserX, Edit } from "lucide-react"
import { useUsuarios } from "@/hooks/use-usuarios"
import type { Usuario } from "@/lib/types"

interface UsuariosListProps {
  onEditUsuario: (usuario: Usuario) => void
  onNovoUsuario: () => void
}

export function UsuariosList({ onEditUsuario, onNovoUsuario }: UsuariosListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { usuarios, alterarStatusUsuario } = useUsuarios()

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.papel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (date: Date | null) => {
    if (!date) return "Nunca"
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getPapelColor = (papel: string) => {
    switch (papel) {
      case "administrador":
        return "bg-red-100 text-red-800"
      case "gestor":
        return "bg-blue-100 text-blue-800"
      case "analista":
        return "bg-green-100 text-green-800"
      case "aprovador":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAlterarStatus = async (id: string, status: "ativo" | "inativo") => {
    try {
      await alterarStatusUsuario(id, status)
    } catch (error) {
      console.error("Erro ao alterar status:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Usuários do Sistema</CardTitle>
          <Button onClick={onNovoUsuario}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosFiltrados.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <Badge className={getPapelColor(usuario.papel)}>{usuario.papel}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={usuario.status === "ativo" ? "default" : "secondary"}>{usuario.status}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(usuario.ultimoLogin)}</TableCell>
                  <TableCell>{formatDate(usuario.dataCriacao)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditUsuario(usuario)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        {usuario.status === "ativo" ? (
                          <DropdownMenuItem
                            onClick={() => handleAlterarStatus(usuario.id!, "inativo")}
                            className="text-red-600"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Desativar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleAlterarStatus(usuario.id!, "ativo")}
                            className="text-green-600"
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Ativar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {usuariosFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum usuário encontrado</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
