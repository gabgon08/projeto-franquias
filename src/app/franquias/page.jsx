'use client'

import React, { useState, useEffect } from 'react'
import styles from './franquias.module.css'
import { Table } from 'antd'

function Franquias() {

    const [franquias, setFranquias] = useState([])

    const [loading, setLoading] = useState(true)

    async function carregarFranquias(params) {
        console.log('BUSCAR FRANQUIAS')

        try {
            const response = await fetch('/api/franquias')
            const data = await response.json()
            setFranquias(data)

        } catch (error) {
            console.error('Erro ao carregar franquias', error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        carregarFranquias()
    }, [])

    const colunas = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'id'
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'id'
        },
        {
            title: 'Endereço',
            dataIndex: 'endereco',
            key: 'id'
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'id'
        }
    ]

    return (
        <div className={styles.container}>
            <h1>FRANQUIAS</h1>
            <div className={styles.tableContainer}>
                <Table
                    columns={colunas} // montada anteriormente
                    dataSource={franquias} // que vem da API
                    loading={{
                        spinning: loading,
                        tip: 'Carregando franquias, aguarde...'
                    }} // Controla o preenchimento da tabela
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </div>
    )
}

export default Franquias
