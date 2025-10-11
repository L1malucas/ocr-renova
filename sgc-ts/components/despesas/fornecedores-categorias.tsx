"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Tag, Plus, Edit, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FornecedoresCategorias() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newFornecedor, setNewFornecedor] = useState({
    nome: "MOCK",
    cnpj: "MOCK",
    email: "MOCK",
    telefone: "MOCK",
    categoria: "MOCK",
  })
  const [newCategoria, setNewCategoria] = useState({
    nome: "MOCK",
    descricao: "MOCK",
    contaContabil: "MOCK",
  })
  const { toast } = useToast()

  // Dados reais viriam de hooks ou props
  const fornecedores: any[] = []
  const categorias: any[] = []

  const handleAddFornecedor = () => {
    toast({
      title: "Fornecedor Cadastrado",
      description: `MOCK foi cadastrado com sucesso.`,
    })
    setNewFornecedor({ nome: "MOCK", cnpj: "MOCK", email: "MOCK", telefone: "MOCK", categoria: "MOCK" })
  }

  const handleAddCategoria = () => {
    toast({
      title: "Categoria Criada",
      description: `MOCK foi criada com sucesso.`,
    })
    setNewCategoria({ nome: "MOCK", descricao: "MOCK", contaContabil: "MOCK" })
  }

  const filteredFornecedores = fornecedores.filter(
    (f) =>
      f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.cnpj.includes(searchTerm) ||
      f.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCategorias = categorias.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Fornecedores e Categorias</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="fornecedores" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fornecedores">
            <Building className="h-4 w-4 mr-2" />
            Fornecedores ({fornecedores.length})
          </TabsTrigger>
          <TabsTrigger value="categorias">
            <Tag className="h-4 w-4 mr-2" />
            Categorias ({categorias.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fornecedores" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Fornecedores Cadastrados</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Fornecedor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Fornecedor</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome/Razão Social</Label>
                    <Input
                      id="nome"
                      value={newFornecedor.nome}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, nome: e.target.value })}
                      placeholder="Nome do fornecedor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={newFornecedor.cnpj}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, cnpj: e.target.value })}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newFornecedor.email}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, email: e.target.value })}
                      placeholder="contato@fornecedor.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={newFornecedor.telefone}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, telefone: e.target.value })}
                      placeholder="(11) 9999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select
                      value={newFornecedor.categoria}
                      onValueChange={(value) => setNewFornecedor({ ...newFornecedor, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((cat) => (
                          <SelectItem key={cat.id} value={cat.nome}>
                            {cat.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddFornecedor} className="w-full">
                    Cadastrar Fornecedor
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredFornecedores.map((fornecedor) => (
              <Card key={fornecedor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">MOCK</h4>
                        <Badge variant="secondary">MOCK</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">CNPJ:</span> MOCK
                        </div>
                        <div>
                          <span className="font-medium">E-mail:</span> MOCK
                        </div>
                        <div>
                          <span className="font-medium">Telefone:</span> MOCK
                        </div>
                        <div>
                          <span className="font-medium">Última compra:</span>{" "}
                          MOCK
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm font-medium text-green-600">
                          Total gasto: R$ 0,00
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categorias" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Categorias de Despesa</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Criar Nova Categoria</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nomeCategoria">Nome da Categoria</Label>
                    <Input
                      id="nomeCategoria"
                      value={newCategoria.nome}
                      onChange={(e) => setNewCategoria({ ...newCategoria, nome: e.target.value })}
                      placeholder="Ex: Material de Limpeza"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descricaoCategoria">Descrição</Label>
                    <Input
                      id="descricaoCategoria"
                      value={newCategoria.descricao}
                      onChange={(e) => setNewCategoria({ ...newCategoria, descricao: e.target.value })}
                      placeholder="Descrição da categoria"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contaContabil">Conta Contábil</Label>
                    <Input
                      id="contaContabil"
                      value={newCategoria.contaContabil}
                      onChange={(e) => setNewCategoria({ ...newCategoria, contaContabil: e.target.value })}
                      placeholder="Ex: 6.1.1.005"
                    />
                  </div>
                  <Button onClick={handleAddCategoria} className="w-full">
                    Criar Categoria
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredCategorias.map((categoria) => (
              <Card key={categoria.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">MOCK</h4>
                        <Badge variant="outline">MOCK</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">MOCK</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-green-600">
                            Total gasto: R$ 0,00
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-600">
                            0 fornecedores
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Tag, Plus, Edit, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FornecedoresCategorias() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newFornecedor, setNewFornecedor] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    categoria: "",
  })
  const [newCategoria, setNewCategoria] = useState({
    nome: "",
    descricao: "",
    contaContabil: "",
  })
  const { toast } = useToast()

  const fornecedores = [
    {
      id: "1",
      nome: "Papelaria Central Ltda",
      cnpj: "12.345.678/0001-90",
      email: "contato@papelaria.com",
      telefone: "(11) 3456-7890",
      categoria: "Material de Escritório",
      totalGasto: 15420.5,
      ultimaCompra: "2024-01-15",
    },
    {
      id: "2",
      nome: "TechSolutions Consultoria",
      cnpj: "98.765.432/0001-10",
      email: "comercial@techsolutions.com",
      telefone: "(11) 9876-5432",
      categoria: "Consultoria",
      totalGasto: 45000.0,
      ultimaCompra: "2024-01-10",
    },
    {
      id: "3",
      nome: "Posto Combustível ABC",
      cnpj: "11.222.333/0001-44",
      email: "vendas@postoabc.com",
      telefone: "(11) 1234-5678",
      categoria: "Combustível",
      totalGasto: 8750.3,
      ultimaCompra: "2024-01-18",
    },
  ]

  const categorias = [
    {
      id: "1",
      nome: "Material de Escritório",
      descricao: "Materiais para uso administrativo",
      contaContabil: "6.1.1.001",
      totalGasto: 25430.8,
      quantidadeFornecedores: 5,
    },
    {
      id: "2",
      nome: "Consultoria",
      descricao: "Serviços de consultoria especializada",
      contaContabil: "6.1.2.001",
      totalGasto: 67500.0,
      quantidadeFornecedores: 3,
    },
    {
      id: "3",
      nome: "Combustível",
      descricao: "Combustível para veículos",
      contaContabil: "6.1.3.001",
      totalGasto: 12340.5,
      quantidadeFornecedores: 2,
    },
    {
      id: "4",
      nome: "Manutenção",
      descricao: "Serviços de manutenção predial",
      contaContabil: "6.1.4.001",
      totalGasto: 18900.0,
      quantidadeFornecedores: 4,
    },
  ]

  const handleAddFornecedor = () => {
    if (newFornecedor.nome && newFornecedor.cnpj) {
      toast({
        title: "Fornecedor Cadastrado",
        description: `${newFornecedor.nome} foi cadastrado com sucesso.`,
      })
      setNewFornecedor({ nome: "", cnpj: "", email: "", telefone: "", categoria: "" })
    }
  }

  const handleAddCategoria = () => {
    if (newCategoria.nome && newCategoria.contaContabil) {
      toast({
        title: "Categoria Criada",
        description: `Categoria "${newCategoria.nome}" foi criada com sucesso.`,
      })
      setNewCategoria({ nome: "", descricao: "", contaContabil: "" })
    }
  }

  const filteredFornecedores = fornecedores.filter(
    (f) =>
      f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.cnpj.includes(searchTerm) ||
      f.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCategorias = categorias.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Fornecedores e Categorias</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="fornecedores" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fornecedores">
            <Building className="h-4 w-4 mr-2" />
            Fornecedores ({fornecedores.length})
          </TabsTrigger>
          <TabsTrigger value="categorias">
            <Tag className="h-4 w-4 mr-2" />
            Categorias ({categorias.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fornecedores" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Fornecedores Cadastrados</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Fornecedor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Fornecedor</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome/Razão Social</Label>
                    <Input
                      id="nome"
                      value={newFornecedor.nome}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, nome: e.target.value })}
                      placeholder="Nome do fornecedor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={newFornecedor.cnpj}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, cnpj: e.target.value })}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newFornecedor.email}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, email: e.target.value })}
                      placeholder="contato@fornecedor.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={newFornecedor.telefone}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, telefone: e.target.value })}
                      placeholder="(11) 9999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select
                      value={newFornecedor.categoria}
                      onValueChange={(value) => setNewFornecedor({ ...newFornecedor, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((cat) => (
                          <SelectItem key={cat.id} value={cat.nome}>
                            {cat.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddFornecedor} className="w-full">
                    Cadastrar Fornecedor
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredFornecedores.map((fornecedor) => (
              <Card key={fornecedor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{fornecedor.nome}</h4>
                        <Badge variant="secondary">{fornecedor.categoria}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">CNPJ:</span> {fornecedor.cnpj}
                        </div>
                        <div>
                          <span className="font-medium">E-mail:</span> {fornecedor.email}
                        </div>
                        <div>
                          <span className="font-medium">Telefone:</span> {fornecedor.telefone}
                        </div>
                        <div>
                          <span className="font-medium">Última compra:</span>{" "}
                          {new Date(fornecedor.ultimaCompra).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm font-medium text-green-600">
                          Total gasto: R$ {fornecedor.totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categorias" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Categorias de Despesa</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Criar Nova Categoria</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nomeCategoria">Nome da Categoria</Label>
                    <Input
                      id="nomeCategoria"
                      value={newCategoria.nome}
                      onChange={(e) => setNewCategoria({ ...newCategoria, nome: e.target.value })}
                      placeholder="Ex: Material de Limpeza"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descricaoCategoria">Descrição</Label>
                    <Input
                      id="descricaoCategoria"
                      value={newCategoria.descricao}
                      onChange={(e) => setNewCategoria({ ...newCategoria, descricao: e.target.value })}
                      placeholder="Descrição da categoria"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contaContabil">Conta Contábil</Label>
                    <Input
                      id="contaContabil"
                      value={newCategoria.contaContabil}
                      onChange={(e) => setNewCategoria({ ...newCategoria, contaContabil: e.target.value })}
                      placeholder="Ex: 6.1.1.005"
                    />
                  </div>
                  <Button onClick={handleAddCategoria} className="w-full">
                    Criar Categoria
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredCategorias.map((categoria) => (
              <Card key={categoria.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{categoria.nome}</h4>
                        <Badge variant="outline">{categoria.contaContabil}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{categoria.descricao}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-green-600">
                            Total gasto: R$ {categoria.totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-600">
                            {categoria.quantidadeFornecedores} fornecedores
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
// CÓDIGO ORIGINAL COMENTADO
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Tag, Plus, Edit, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FornecedoresCategorias() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newFornecedor, setNewFornecedor] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    categoria: "",
  })
  const [newCategoria, setNewCategoria] = useState({
    nome: "",
    descricao: "",
    contaContabil: "",
  })
  const { toast } = useToast()

  const fornecedores = [
    {
      id: "1",
      nome: "Papelaria Central Ltda",
      cnpj: "12.345.678/0001-90",
      email: "contato@papelaria.com",
      telefone: "(11) 3456-7890",
      categoria: "Material de Escritório",
      totalGasto: 15420.5,
      ultimaCompra: "2024-01-15",
    },
    {
      id: "2",
      nome: "TechSolutions Consultoria",
      cnpj: "98.765.432/0001-10",
      email: "comercial@techsolutions.com",
      telefone: "(11) 9876-5432",
      categoria: "Consultoria",
      totalGasto: 45000.0,
      ultimaCompra: "2024-01-10",
    },
    {
      id: "3",
      nome: "Posto Combustível ABC",
      cnpj: "11.222.333/0001-44",
      email: "vendas@postoabc.com",
      telefone: "(11) 1234-5678",
      categoria: "Combustível",
      totalGasto: 8750.3,
      ultimaCompra: "2024-01-18",
    },
  ]

  const categorias = [
    {
      id: "1",
      nome: "Material de Escritório",
      descricao: "Materiais para uso administrativo",
      contaContabil: "6.1.1.001",
      totalGasto: 25430.8,
      quantidadeFornecedores: 5,
    },
    {
      id: "2",
      nome: "Consultoria",
      descricao: "Serviços de consultoria especializada",
      contaContabil: "6.1.2.001",
      totalGasto: 67500.0,
      quantidadeFornecedores: 3,
    },
    {
      id: "3",
      nome: "Combustível",
      descricao: "Combustível para veículos",
      contaContabil: "6.1.3.001",
      totalGasto: 12340.5,
      quantidadeFornecedores: 2,
    },
    {
      id: "4",
      nome: "Manutenção",
      descricao: "Serviços de manutenção predial",
      contaContabil: "6.1.4.001",
      totalGasto: 18900.0,
      quantidadeFornecedores: 4,
    },
  ]

  const handleAddFornecedor = () => {
    if (newFornecedor.nome && newFornecedor.cnpj) {
      toast({
        title: "Fornecedor Cadastrado",
        description: `${newFornecedor.nome} foi cadastrado com sucesso.`,
      })
      setNewFornecedor({ nome: "", cnpj: "", email: "", telefone: "", categoria: "" })
    }
  }

  const handleAddCategoria = () => {
    if (newCategoria.nome && newCategoria.contaContabil) {
      toast({
        title: "Categoria Criada",
        description: `Categoria "${newCategoria.nome}" foi criada com sucesso.`,
      })
      setNewCategoria({ nome: "", descricao: "", contaContabil: "" })
    }
  }

  const filteredFornecedores = fornecedores.filter(
    (f) =>
      f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.cnpj.includes(searchTerm) ||
      f.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCategorias = categorias.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Fornecedores e Categorias</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="fornecedores" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fornecedores">
            <Building className="h-4 w-4 mr-2" />
            Fornecedores ({fornecedores.length})
          </TabsTrigger>
          <TabsTrigger value="categorias">
            <Tag className="h-4 w-4 mr-2" />
            Categorias ({categorias.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fornecedores" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Fornecedores Cadastrados</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Fornecedor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Fornecedor</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome/Razão Social</Label>
                    <Input
                      id="nome"
                      value={newFornecedor.nome}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, nome: e.target.value })}
                      placeholder="Nome do fornecedor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={newFornecedor.cnpj}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, cnpj: e.target.value })}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newFornecedor.email}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, email: e.target.value })}
                      placeholder="contato@fornecedor.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={newFornecedor.telefone}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, telefone: e.target.value })}
                      placeholder="(11) 9999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select
                      value={newFornecedor.categoria}
                      onValueChange={(value) => setNewFornecedor({ ...newFornecedor, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((cat) => (
                          <SelectItem key={cat.id} value={cat.nome}>
                            {cat.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddFornecedor} className="w-full">
                    Cadastrar Fornecedor
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredFornecedores.map((fornecedor) => (
              <Card key={fornecedor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{fornecedor.nome}</h4>
                        <Badge variant="secondary">{fornecedor.categoria}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">CNPJ:</span> {fornecedor.cnpj}
                        </div>
                        <div>
                          <span className="font-medium">E-mail:</span> {fornecedor.email}
                        </div>
                        <div>
                          <span className="font-medium">Telefone:</span> {fornecedor.telefone}
                        </div>
                        <div>
                          <span className="font-medium">Última compra:</span>{" "}
                          {new Date(fornecedor.ultimaCompra).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm font-medium text-green-600">
                          Total gasto: R$ {fornecedor.totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categorias" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Categorias de Despesa</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Criar Nova Categoria</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nomeCategoria">Nome da Categoria</Label>
                    <Input
                      id="nomeCategoria"
                      value={newCategoria.nome}
                      onChange={(e) => setNewCategoria({ ...newCategoria, nome: e.target.value })}
                      placeholder="Ex: Material de Limpeza"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descricaoCategoria">Descrição</Label>
                    <Input
                      id="descricaoCategoria"
                      value={newCategoria.descricao}
                      onChange={(e) => setNewCategoria({ ...newCategoria, descricao: e.target.value })}
                      placeholder="Descrição da categoria"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contaContabil">Conta Contábil</Label>
                    <Input
                      id="contaContabil"
                      value={newCategoria.contaContabil}
                      onChange={(e) => setNewCategoria({ ...newCategoria, contaContabil: e.target.value })}
                      placeholder="Ex: 6.1.1.005"
                    />
                  </div>
                  <Button onClick={handleAddCategoria} className="w-full">
                    Criar Categoria
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredCategorias.map((categoria) => (
              <Card key={categoria.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{categoria.nome}</h4>
                        <Badge variant="outline">{categoria.contaContabil}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{categoria.descricao}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-green-600">
                            Total gasto: R$ {categoria.totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-600">
                            {categoria.quantidadeFornecedores} fornecedores
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
*/