import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Buscar funcionário específico
export async function GET(request, { params }) {
    try {
        const id = parseInt(params.id)

        const funcionario = await prisma.funcionario.findUnique({
            where: { id },
            include: {
                franquia: true
            }
        })

        if (!funcionario) {
            return NextResponse.json(
                { error: 'Funcionário não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(funcionario)
    } catch (error) {
        console.error('Erro ao buscar funcionário:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}