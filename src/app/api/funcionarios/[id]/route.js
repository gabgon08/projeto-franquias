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
// DELETE
export async function DELETE(request, { params }) {
    try {
        //capturar o id pelo params
        const id = parseInt(params.id);

        // Verificar se existe funcionario
        const existeFuncionario = await prisma.funcionario.findUnique({
            where: { id }
        })

        // Verifico e dou uma mensagem de erro
        if (!existeFuncionario) {
            return NextResponse.json(
                { error: 'Funcionário não encontrado' },
                { status: 404 }
            )
        }

        // Realiza o delete
        await prisma.funcionario.delete({
            where: { id }
        })

        // Resposta com o funcionario que foi apagado.
        return NextResponse.json({
            apagado: existeFuncionario,
            msg: 'Funcionário apagada com sucesso'
        })

    } catch (error) {
        console.error('Erro ao deletar funcionário', error)
        return NextResponse.json(
            { error: 'Erro interno de servidor' },
            { status: 500 }
        )
    }

}