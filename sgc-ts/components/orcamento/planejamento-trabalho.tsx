"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LinhaOrcamentaria {
  id: string
  categoria: string
  descricao: string
  unidade: string
  quantidade: number
  valorUnitario: number
  valorTotal: number
  distribuicaoMensal: number[]
}

interface Meta {
  id: string
  titulo: string
  acoes: Acao[]
}

interface Acao {
  id: string
  titulo: string
  linhas: LinhaOrcamentaria[]
}

const categoriasDespesa = [
  "Recursos Humanos",
  "Material de Consumo",
  "Material Permanente",
  "Serviços de Terceiros",
  "Diárias e Passagens",
  "Outros Custos Diretos",
]

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

export function PlanejamentoTrabalho() {
  const [contratoSelecionado, setContratoSelecionado] = useState("")
  const [valorContrato, setValorContrato] = useState(500000)
  const [metas, setMetas] = useState<Meta[]>([
    {
      id: "1",
      titulo: "Capacitar 100 jovens em tecnologia",
      acoes: [
        {
          id: "1.1",
          titulo: "Realizar oficinas de programação",
          linhas: [],
        },
      ],
    },
  ])
  const { toast } = useToast()

  const calcularTotalPlanejado = () => {
    return metas.reduce(
      (totalMetas, meta) =>
        totalMetas +
        meta.acoes.reduce(
          (totalAcoes, acao) =>
            totalAcoes + acao.linhas.reduce((totalLinhas, linha) => totalLinhas + linha.valorTotal, 0),
          0,
        ),
      0,
    )
  }

  const adicionarMeta = () => {
    const novaMeta: Meta = {
      id: (metas.length + 1).toString(),
      titulo: "",
      acoes: [],
    }
    setMetas([...metas, novaMeta])
  }

  const adicionarAcao = (metaId: string) => {
    setMetas(
      metas.map((meta) => {
        if (meta.id === metaId) {
          const novaAcao: Acao = {
            id: `${metaId}.${meta.acoes.length + 1}`,
            titulo: "",
            linhas: [],
          }
          return { ...meta, acoes: [...meta.acoes, novaAcao] }
        }
        return meta
      }),
    )
  }

  const adicionarLinha = (metaId: string, acaoId: string) => {
    const novaLinha: LinhaOrcamentaria = {
      id: `${acaoId}.${Date.now()}`,
      categoria: "",
      descricao: "",
      unidade: "",
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
      distribuicaoMensal: new Array(12).fill(0),
    }

    setMetas(
      metas.map((meta) => {
        if (meta.id === metaId) {
          return {
            ...meta,
            acoes: meta.acoes.map((acao) => {
              if (acao.id === acaoId) {
                return { ...acao, linhas: [...acao.linhas, novaLinha] }
              }
              return acao
            }),
          }
        }
        return meta
      }),
    )
  }

  const atualizarLinha = (metaId: string, acaoId: string, linhaId: string, campo: string, valor: any) => {
    setMetas(
      metas.map((meta) => {
        if (meta.id === metaId) {
          return {
            ...meta,
            acoes: meta.acoes.map((acao) => {
              if (acao.id === acaoId) {
                return {
                  ...acao,
                  linhas: acao.linhas.map((linha) => {
                    if (linha.id === linhaId) {
                      const linhaAtualizada = { ...linha, [campo]: valor }

                      // Recalcular valor total se quantidade ou valor unitário mudaram
                      if (campo === "quantidade" || campo === "valorUnitario") {
                        linhaAtualizada.valorTotal = linhaAtualizada.quantidade * linhaAtualizada.valorUnitario
                        // Redistribuir igualmente pelos meses se não há distribuição manual
                        const somaDistribuicao = linhaAtualizada.distribuicaoMensal.reduce((a, b) => a + b, 0)
                        if (somaDistribuicao === 0) {
                          const valorMensal = linhaAtualizada.valorTotal / 12
                          linhaAtualizada.distribuicaoMensal = new Array(12).fill(valorMensal)
                        }
                      }

                      return linhaAtualizada
                    }
                    return linha
                  }),
                }
              }
              return acao
            }),
          }
        }
        return meta
      }),
    )
  }

  const atualizarDistribuicaoMensal = (
    metaId: string,
    acaoId: string,
    linhaId: string,
    mesIndex: number,
    valor: number,
  ) => {
    setMetas(
      metas.map((meta) => {
        if (meta.id === metaId) {
          return {
            ...meta,
            acoes: meta.acoes.map((acao) => {
              if (acao.id === acaoId) {
                return {
                  ...acao,
                  linhas: acao.linhas.map((linha) => {
                    if (linha.id === linhaId) {
                      const novaDistribuicao = [...linha.distribuicaoMensal]
                      novaDistribuicao[mesIndex] = valor
                      return { ...linha, distribuicaoMensal: novaDistribuicao }
                    }
                    return linha
                  }),
                }
              }
              return acao
            }),
          }
        }
        return meta
      }),
    )
  }

  const validarDistribuicao = (linha: LinhaOrcamentaria) => {
    const somaDistribuicao = linha.distribuicaoMensal.reduce((a, b) => a + b, 0)
    return Math.abs(somaDistribuicao - linha.valorTotal) < 0.01
  }

  const salvarRascunho = () => {
    toast({
      title: "Rascunho salvo!",
      description: "O plano de trabalho foi salvo como rascunho.",
    })
  }

  const enviarAprovacao = () => {
    toast({
      title: "Enviado para aprovação!",
      description: "O plano de trabalho foi enviado para o fluxo de aprovação.",
    })
  }

  const totalPlanejado = calcularTotalPlanejado()
  const saldoPlanejar = valorContrato - totalPlanejado

  return (
    <div className="space-y-6">
      {/* Seleção de Contexto */}
      <Card>
        <CardHeader>
          <CardTitle>Novo Plano de Trabalho</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Contrato/Convênio</Label>
              <Select value={contratoSelecionado} onValueChange={setContratoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Convênio Fundação ABC - Educação</SelectItem>
                  <SelectItem value="2">Projeto Instituto XYZ - Saúde</SelectItem>
                  <SelectItem value="3">Edital Governo - Meio Ambiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Valor do Contrato</Label>
              <Input value={`R$ ${valorContrato.toLocaleString()}`} disabled className="bg-gray-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barra de Totais Fixo */}
      <Card className="sticky top-4 z-10 bg-white shadow-lg">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Valor Total do Contrato</p>
              <p className="text-xl font-bold text-blue-600">R$ {valorContrato.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Planejado</p>
              <p className="text-xl font-bold text-emerald-600">R$ {totalPlanejado.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Saldo a Planejar</p>
              <p className={`text-xl font-bold ${saldoPlanejar < 0 ? "text-red-600" : "text-gray-800"}`}>
                R$ {saldoPlanejar.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface de Planejamento Hierárquico */}
      <div className="space-y-6">
        {metas.map((meta, metaIndex) => (
          <Card key={meta.id} className="border-l-4 border-l-blue-500">
            <CardHeader className="bg-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label>Meta/Objetivo Estratégico {meta.id}</Label>
                  <Input
                    value={meta.titulo}
                    onChange={(e) => {
                      const novasMetas = [...metas]
                      novasMetas[metaIndex].titulo = e.target.value
                      setMetas(novasMetas)
                    }}
                    placeholder="Ex: Capacitar 100 jovens em tecnologia"
                    className="mt-1"
                  />
                </div>
                <Button variant="outline" size="sm" onClick={() => adicionarAcao(meta.id)} className="ml-4">
                  <Plus className="h-4 w-4 mr-1" />
                  Ação
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {meta.acoes.map((acao, acaoIndex) => (
                <div key={acao.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <Label>Ação {acao.id}</Label>
                      <Input
                        value={acao.titulo}
                        onChange={(e) => {
                          const novasMetas = [...metas]
                          novasMetas[metaIndex].acoes[acaoIndex].titulo = e.target.value
                          setMetas(novasMetas)
                        }}
                        placeholder="Ex: Realizar oficinas de programação"
                        className="mt-1"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adicionarLinha(meta.id, acao.id)}
                      className="ml-4"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Item de Despesa
                    </Button>
                  </div>

                  {/* Grid de Linhas Orçamentárias */}
                  <div className="space-y-3">
                    {acao.linhas.map((linha) => (
                      <div key={linha.id} className="bg-white border rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-3">
                          <div>
                            <Label className="text-xs">Categoria</Label>
                            <Select
                              value={linha.categoria}
                              onValueChange={(value) => atualizarLinha(meta.id, acao.id, linha.id, "categoria", value)}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categoriasDespesa.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-xs">Descrição</Label>
                            <Input
                              value={linha.descricao}
                              onChange={(e) => atualizarLinha(meta.id, acao.id, linha.id, "descricao", e.target.value)}
                              placeholder="Descrição detalhada"
                              className="h-8"
                            />
                          </div>

                          <div>
                            <Label className="text-xs">Unid.</Label>
                            <Input
                              value={linha.unidade}
                              onChange={(e) => atualizarLinha(meta.id, acao.id, linha.id, "unidade", e.target.value)}
                              placeholder="Ex: mês, un"
                              className="h-8"
                            />
                          </div>

                          <div>
                            <Label className="text-xs">Qtd.</Label>
                            <Input
                              type="number"
                              value={linha.quantidade}
                              onChange={(e) =>
                                atualizarLinha(
                                  meta.id,
                                  acao.id,
                                  linha.id,
                                  "quantidade",
                                  Number.parseFloat(e.target.value) || 0,
                                )
                              }
                              className="h-8"
                            />
                          </div>

                          <div>
                            <Label className="text-xs">Valor Unit.</Label>
                            <Input
                              type="number"
                              value={linha.valorUnitario}
                              onChange={(e) =>
                                atualizarLinha(
                                  meta.id,
                                  acao.id,
                                  linha.id,
                                  "valorUnitario",
                                  Number.parseFloat(e.target.value) || 0,
                                )
                              }
                              className="h-8"
                            />
                          </div>

                          <div>
                            <Label className="text-xs">Valor Total</Label>
                            <div className="flex items-center gap-1">
                              <Input
                                value={`R$ ${linha.valorTotal.toLocaleString()}`}
                                disabled
                                className="h-8 bg-gray-100"
                              />
                              {!validarDistribuicao(linha) && (
                                <Badge variant="destructive" className="text-xs">
                                  !
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Distribuição Mensal */}
                        <div>
                          <Label className="text-xs mb-2 block">Distribuição Mensal</Label>
                          <div className="grid grid-cols-12 gap-1">
                            {meses.map((mes, index) => (
                              <div key={mes}>
                                <Label className="text-xs text-center block">{mes}</Label>
                                <Input
                                  type="number"
                                  value={linha.distribuicaoMensal[index]}
                                  onChange={(e) =>
                                    atualizarDistribuicaoMensal(
                                      meta.id,
                                      acao.id,
                                      linha.id,
                                      index,
                                      Number.parseFloat(e.target.value) || 0,
                                    )
                                  }
                                  className="h-8 text-xs"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Soma: R$ {linha.distribuicaoMensal.reduce((a, b) => a + b, 0).toLocaleString()}
                            {!validarDistribuicao(linha) && (
                              <span className="text-red-500 ml-2">⚠ Não confere com o valor total</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <Button onClick={adicionarMeta} variant="outline" className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Nova Meta
        </Button>
      </div>

      {/* Ações do Workflow */}
      <Card>
        <CardContent className="py-4">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={salvarRascunho}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button onClick={enviarAprovacao} className="bg-emerald-600 hover:bg-emerald-700">
              <Send className="h-4 w-4 mr-2" />
              Enviar para Aprovação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
