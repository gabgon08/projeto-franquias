import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Listar todos os funcionários
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