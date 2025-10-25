import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {

        // BUSCAR OS DADOS DO BANCO

        // Busca as franquias e seus funcionários
        const franquias = await prisma.franquia.findMany({
            include: {
                funcionarios: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Busca os funcionários e suas franquias
        const funcionarios = await prisma.funcionario.findMany({
            include: {
                franquia: {
                    select: { id: true, nome: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // CALCULAR OS TOTAIS BÁSICOS

        const totalFuncionarios = funcionarios.length

        let somaSalarios = 0

        funcionarios.forEach(funcionario => {
            somaSalarios += funcionario.salario
        })

        const salarioMedio = totalFuncionarios > 0 ? somaSalarios / totalFuncionarios : 0

        // AGRUPAR POR CATEGORIAS

        // Franquias por cidade
        const cidades = []

        franquias.forEach(franquia => {
            const existe = cidades.find(c => c.cidade === franquia.cidade)

            if (existe) {
                existe.total++
            } else {
                cidades.push({ cidade: franquia.cidade, total: 1 })
            }
        })

        cidades.sort((a, b) => b.total - a.total)

        // Franquias por país
        const paises = []

        franquias.forEach(franquia => {
            const existe = paises.find(p => p.pais === franquia.pais)

            if (existe) {
                existe.total++
            } else {
                paises.push({ pais: franquia.pais, total: 1 })
            }
        })

        paises.sort((a, b) => b.total - a.total)

        // Funcionários por cargo
        const cargos = []

        funcionarios.forEach(funcionario => {
            const existe = cargos.find(c => c.cargo === funcionario.cargo)
            if (existe) {
                existe.total++
            } else {
                cargos.push({ cargo: funcionario.cargo, total: 1 })
            }
        })

        cargos.sort((a, b) => b.total - a.total)

        // Faixas salariais
        let ate2k = 0, de2a4k = 0, de4a6k = 0, de6a8k = 0, acima8k = 0

        funcionarios.forEach(funcionario => {
            if (funcionario.salario <= 2000) ate2k++
            else if (funcionario.salario <= 4000) de2a4k++
            else if (funcionario.salario <= 6000) de4a6k++
            else if (funcionario.salario <= 8000) de6a8k++
            else acima8k++
        })

        const faixasSalariais = [
            { faixa: 'Até $2,000', quantidade: ate2k },
            { faixa: '$2,001 - $4,000', quantidade: de2a4k },
            { faixa: '$4,001 - $6,000', quantidade: de4a6k },
            { faixa: '$6,001 - $8,000', quantidade: de6a8k },
            { faixa: 'Acima de $8,000', quantidade: acima8k }
        ]

        // RANKINGS E LISTAS

        const todasFranquias = []

        franquias.forEach(franquia => {

            let folha = 0

            franquia.funcionarios.forEach(funcionario => {
                folha += funcionario.salario
            })

            todasFranquias.push({
                id: franquia.id,
                nome: franquia.nome,
                cidade: franquia.cidade,
                pais: franquia.pais,
                totalFuncionarios: franquia.funcionarios.length,
                folhaSalarial: Math.round(folha * 100) / 100
            })
        })

        todasFranquias.sort((a, b) => b.totalFuncionarios - a.totalFuncionarios)

        const top5 = todasFranquias.slice(0, 5)

        const ultimas5Franquias = franquias.slice(0, 5).map(franquia => ({
            id: franquia.id,
            nome: franquia.nome,
            cidade: franquia.cidade,
            pais: franquia.pais,
            totalFuncionarios: franquia.funcionarios.length,
            createdAt: franquia.createdAt
        }))

        const ultimos5Funcionarios = funcionarios.slice(0, 5).map(funcionario => ({
            id: funcionario.id,
            nome: funcionario.nome,
            cargo: funcionario.cargo,
            salario: funcionario.salario,
            franquia: funcionario.franquia?.nome || 'Sem franquia',
            createdAt: funcionario.createdAt
        }))

        // IDENTIFICAR ALERTAS/PROBLEMAS

        const franquiasSemFuncionarios = []

        franquias.forEach(franquia => {
            if (franquia.funcionarios.length === 0) {
                franquiasSemFuncionarios.push({
                    id: franquia.id,
                    nome: franquia.nome,
                    cidade: franquia.cidade,
                    pais: franquia.pais,
                    createdAt: franquia.createdAt
                })
            }
        })

        const funcionariosSemFranquia = []

        funcionarios.forEach(funcionario => {
            if (!funcionario.franquia || funcionario.franquia.length === 0) {
                funcionariosSemFranquia.push({
                    id: funcionario.id,
                    nome: funcionario.nome,
                    cargo: funcionario.cargo,
                    salario: funcionario.salario,
                    createdAt: funcionario.createdAt
                })
            }
        })

        // RESPOSTA FINAL
        const dashboard = {
            totalFranquias: franquias.length,
            totalFuncionarios: totalFuncionarios,
            salarioMedio: Math.round(salarioMedio * 100) / 100,
            folhaTotal: Math.round(somaSalarios * 100) / 100,
            franquiasPorCidade: cidades,
            franquiasPorPais: paises,
            funcionariosPorCargo: cargos,
            faixasSalariais: faixasSalariais,
            topFranquias: top5,
            ultimasFranquias: ultimas5Franquias,
            ultimosFuncionarios: ultimos5Funcionarios,
            franquiasSemFuncionarios: franquiasSemFuncionarios,
            funcionariosSemFranquia: funcionariosSemFranquia
        }

        return NextResponse.json(dashboard)

    } catch (error) {
        console.error('Erro ao buscar dados do dashboard: ', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}