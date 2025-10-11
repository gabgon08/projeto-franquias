import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const franquias = await prisma.franquia.findMany({
            include: {
                funcionarios: true,
                _count: {
                    select: { funcionarios: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (franquias.length === false) {
            return NextResponse.json(
                { error: 'Nenhuma franquia encontrada' },
                { status: 404 }
            )
        }

        return NextResponse.json(franquias)

    } catch (error) {
        console.log('Erro ao buscar franquias: ', error)
        return NextResponse.json(
            { error: 'Erro interno de servidor' },
            { status: 500 }
        )
    }
}