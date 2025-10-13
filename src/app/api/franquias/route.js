import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

//GET ALL
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
        console.error('Erro ao buscar franquias: ', error)
        return NextResponse.json(
            { error: 'Erro interno de servidor' },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { nome, cidade, endereco, telefone } = data

        if (!nome || !cidade || !endereco || !telefone) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios: nome, cidade, endereco, telefone' },
                { status: 400 }
            )
        }

        const franquia = await prisma.franquia.create({
            data: {
                nome,
                cidade,
                endereco,
                telefone
            }
        })

        return NextResponse.json(franquia, { status: 201 })

    } catch (error) {
        console.error('Erro ao criar franquia: ', error)
        return NextResponse.json(
            { error: 'Erro interno de servidor' },
            { status: 500 }
        )
    }
}