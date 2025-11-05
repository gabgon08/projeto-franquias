import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const funcionarios = await prisma.funcionario.findMany({
            include: {
                franquia: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(funcionarios)
    } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const data = await request.json()

        const { nome, email, cargo, salario, franquiaId } = data

        if (!nome || !email || !cargo || !salario || !franquiaId) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            )
        }

        const franquia = await prisma.franquia.findUnique({
            where: { id: parseInt(franquiaId) }
        })

        if (!franquia) {
            return NextResponse.json(
                { error: 'Franquia não encontrada' },
                { status: 404 }
            )
        }

        const emailExiste = await prisma.funcionario.findUnique({
            where: { email }
        })

        if (emailExiste) {
            return NextResponse.json(
                { error: 'Email já está em uso' },
                { status: 400 }
            )
        }

        const funcionario = await prisma.funcionario.create({
            data: {
                nome,
                email,
                cargo,
                salario: parseFloat(salario),
                franquiaId: parseInt(franquiaId)
            },
            include: {
                franquia: true
            }
        })

        return NextResponse.json(funcionario, { status: 201 })
    } catch (error) {
        console.error('Erro ao criar funcionário:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}