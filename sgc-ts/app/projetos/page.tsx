"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, FileText, Calendar, DollarSign, Edit, Eye, AlertCircle } from "lucide-react"

const mockProjects = [
  {
    id: "1",
    salic: "2024001234",
    title: "Documentário sobre Cultura Popular Brasileira",
    modalidade: "Fomento Direto",
    status: "Em Execução",
    dataAprovacao: "2024-01-15",
    prazoFinal: "2024-12-31",
    valorAprovado: 150000,
    valorExecutado: 75000,
    fonteRecurso: "Fomento Direto",
    proponente: "João Silva Produções LTDA",
    cnpj: "12.345.678/0001-90",
  },
  {
    id: "2",
    salic: "2024005678",
    title: "Festival de Cinema Independente",
    modalidade: "FSA",
    status: "Prestação de Contas",
    dataAprovacao: "2024-02-20",
    prazoFinal: "2024-10-15",
    valorAprovado: 300000,
    valorExecutado: 280000,
    fonteRecurso: "FSA",
    proponente: "Associação Cultural Cine Arte",
    cnpj: "98.765.432/0001-10",
  },
]

function NewProjectForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="salic">Número SALIC *</Label>
          <Input id="salic" placeholder="Ex: 2024001234" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="modalidade">Modalidade *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fomento-direto">Fomento Direto</SelectItem>
              <SelectItem value="fsa">FSA</SelectItem>
              <SelectItem value="fomento-indireto">Fomento Indireto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="titulo">Título do Projeto *</Label>
        <Input id="titulo" placeholder="Digite o título completo do projeto" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="proponente">Proponente *</Label>
        <Input id="proponente" placeholder="Nome da empresa ou pessoa física" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ/CPF *</Label>
          <Input id="cnpj" placeholder="00.000.000/0000-00" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="valor">Valor Aprovado *</Label>
          <Input id="valor" type="number" placeholder="150000" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="data-aprovacao">Data de Aprovação *</Label>
          <Input id="data-aprovacao" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prazo-final">Prazo Final *</Label>
          <Input id="prazo-final" type="date" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fonte">Fonte de Recurso *</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a fonte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fomento-direto">Fomento Direto</SelectItem>
            <SelectItem value="fsa">FSA</SelectItem>
            <SelectItem value="fomento-indireto">Fomento Indireto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea id="observacoes" placeholder="Informações adicionais sobre o projeto" />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Cadastrar Projeto</Button>
      </div>
    </form>
  )
}

function ProjectDetails({ project }: { project: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Projeto</CardTitle>
          <CardDescription>Dados básicos cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Número SALIC</Label>
              <p className="text-sm text-muted-foreground">{project.salic}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Badge variant={project.status === "Em Execução" ? "default" : "secondary"}>{project.status}</Badge>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Título</Label>
            <p className="text-sm text-muted-foreground">{project.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Proponente</Label>
              <p className="text-sm text-muted-foreground">{project.proponente}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">CNPJ</Label>
              <p className="text-sm text-muted-foreground">{project.cnpj}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Modalidade</Label>
              <p className="text-sm text-muted-foreground">{project.modalidade}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Fonte de Recurso</Label>
              <p className="text-sm text-muted-foreground">{project.fonteRecurso}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Data de Aprovação</Label>
              <p className="text-sm text-muted-foreground">{project.dataAprovacao}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Valor Aprovado</Label>
              <p className="text-sm text-muted-foreground">R$ {project.valorAprovado.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Valor Executado</Label>
              <p className="text-sm text-muted-foreground">R$ {project.valorExecutado.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Prazo Final</Label>
              <p className="text-sm text-muted-foreground">{project.prazoFinal}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Alterações</CardTitle>
          <CardDescription>Registro de comunicações e modificações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border-l-2 border-primary pl-4">
              <p className="text-sm font-medium">Projeto cadastrado no sistema</p>
              <p className="text-xs text-muted-foreground">15/01/2024 - Sistema SIGA-PC</p>
            </div>
            <div className="border-l-2 border-muted pl-4">
              <p className="text-sm font-medium">Primeira execução financeira registrada</p>
              <p className="text-xs text-muted-foreground">20/02/2024 - João Silva</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Projects() {
  const [projects] = useState(mockProjects)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Projetos</h1>
            <p className="text-muted-foreground">Cadastre e gerencie seus projetos culturais</p>
          </div>
          <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Projeto</DialogTitle>
                <DialogDescription>Preencha as informações básicas do projeto aprovado pela ANCINE</DialogDescription>
              </DialogHeader>
              <NewProjectForm onClose={() => setIsNewProjectOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Projetos</TabsTrigger>
          <TabsTrigger value="details">Detalhes do Projeto</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge variant="outline">SALIC {project.salic}</Badge>
                      </div>
                      <CardDescription>{project.proponente}</CardDescription>
                    </div>
                    <Badge variant={project.status === "Em Execução" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Modalidade</p>
                        <p className="text-muted-foreground">{project.modalidade}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Prazo Final</p>
                        <p className="text-muted-foreground">{project.prazoFinal}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Valor Aprovado</p>
                        <p className="text-muted-foreground">R$ {project.valorAprovado.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Executado</p>
                        <p className="text-muted-foreground">
                          {Math.round((project.valorExecutado / project.valorAprovado) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          {selectedProject ? (
            <ProjectDetails project={selectedProject} />
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Selecione um projeto para ver os detalhes</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}
