import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(request, { params }) {
    try {
        const id = parseInt(params.id)
        const franquia = await prisma.franquia.findUnique({
            where: { id },
            include: {
                funcionarios: true,
                _count: {
                    select: { funcionarios: true }
                }
            }
        })

        if (!franquia) {
            return NextResponse.json(
                { error: 'Franquia não encontrada!' },
                { status: 400 }
            )
        }

        return NextResponse.json(franquia)

    } catch (error) {
        console.log('Erro ao buscar franquias: ', error)
        return NextResponse.json(
            { error: 'Erro interno de servidor' },
            { status: 500 }
        )

    }
}