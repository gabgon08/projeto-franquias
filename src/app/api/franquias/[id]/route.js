import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { message } from "antd";

const prisma = new PrismaClient()

// GET - Listar franquia específica
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



// PUT - Atualizar franquia
export async function PUT(request, { params }) {
    try {
        const id = parseInt(params.id)
        const data = await request.json()

        const { nome, cidade, endereco, telefone } = data

        // Ou Object.keys(data).length === 0
        if (!data?.nome && !data?.cidade && !data?.endereco && !data?.telefone) {
            return NextResponse.json(
                { error: 'Voce precisa enviar algum dado' },
                { status: 400 }
            )
        }

        // Verificar se a franquia existe
        const franquiaExiste = await prisma.franquia.findUnique({
            where: { id }
        })

        if (!franquiaExiste) {
            return NextResponse.json(
                { error: 'Franquia não encontrada' },
                { status: 404 }
            )
        }

        const franquia = await prisma.franquia.update({
            where: { id },
            data: {
                nome: nome ?? franquiaExiste.nome,
                cidade: cidade ?? franquiaExiste.cidade,
                endereco: endereco ?? franquiaExiste.endereco,
                telefone: telefone ?? franquiaExiste.telefone
            }
        })

        // Retorna a resposta
        return NextResponse.json({
            franquia: franquia,
            msg: 'Franquia atualizada com sucesso!'
        })

    } catch (error) {
        console.error('Erro ao atualizar franquia:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}

// DELETE - Deletar franquia
export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id)

        // Verificar se a franquia existe
        const franquia = await prisma.franquia.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { funcionarios: true }
                }
            }
        })

        if (!franquia) {
            return NextResponse.json(
                { error: 'Franquia não encontrada' },
                { status: 404 }
            )
        }

        // Verificar se tem funcionários vinculados
        if (franquia._count.funcionarios > 0) {
            return NextResponse.json(
                { error: 'Não é possível deletar franquia com funcionários vinculados' },
                { status: 400 }
            )
        }

        await prisma.franquia.delete({
            where: { id }
        })

        return NextResponse.json({
            apagado: franquia,
            message: 'Franquia deletada com sucesso'
        })

    } catch (error) {
        console.error('Erro ao deletar franquia:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}