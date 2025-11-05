import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
    try {
        const id = parseInt(params.id)

        const funcionario = await prisma.funcionario.findUnique({
            where: { id },
            include: {
                franquia: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
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

export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);

        const existeFuncionario = await prisma.funcionario.findUnique({
            where: { id }
        })

        if (!existeFuncionario) {
            return NextResponse.json(
                { error: 'Funcionário não encontrado' },
                { status: 404 }
            )
        }

        await prisma.funcionario.delete({
            where: { id }
        })

        return NextResponse.json({
            apagado: existeFuncionario,
            message: 'Funcionário deletado com sucesso'
        })

    } catch (error) {
        console.error('Erro ao deletar funcionário', error)
        return NextResponse.json(
            { error: 'Erro interno de servidor' },
            { status: 500 }
        )
    }

}

export async function PUT(request, { params }) {
    try {
        const id = parseInt(params.id)
        const data = await request.json()

        const { nome, email, cargo, salario, franquiaId } = data

        const funcionarioExiste = await prisma.funcionario.findUnique({
            where: { id }
        })

        if (!funcionarioExiste) {
            return NextResponse.json(
                { error: 'Funcionário não encontrado' },
                { status: 404 }
            )
        }

        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json(
                { error: 'Você precisa enviar algum dado' },
                { status: 400 }
            )
        }

        if (franquiaId) {
            const franquia = await prisma.franquia.findUnique({
                where: { id: parseInt(franquiaId) }
            })

            if (!franquia) {
                return NextResponse.json(
                    { error: 'Franquia não encontrada, verifique o id para adicionar o funcionário' },
                    { status: 404 }
                )
            }
        }

        if (email) {
            const emailExiste = await prisma.funcionario.findFirst({
                where: {
                    email,
                    id: { not: id }
                }
            })

            if (emailExiste) {
                return NextResponse.json(
                    { error: 'Email já está em uso!' },
                    { status: 400 }
                )
            }
        }

        const funcionario = await prisma.funcionario.update({
            where: { id },
            data: {
                nome: nome ?? funcionarioExiste.nome,
                email: email ?? funcionarioExiste.email,
                cargo: cargo ?? funcionarioExiste.cargo,
                salario: salario ? parseFloat(salario) : funcionarioExiste.salario,
                franquiaId: franquiaId ? parseInt(franquiaId) : funcionarioExiste.franquiaId
            }
        })

        return NextResponse.json({
            funcionario: funcionario,
            message: 'Funcionário atualizado com sucesso!'
        })

    } catch (error) {
        console.error('Erro ao atualizar funcionário', error)
        return NextResponse.json(
            { error: 'Erro interno de servidor', error },
            { status: 500 }
        )
    }
}