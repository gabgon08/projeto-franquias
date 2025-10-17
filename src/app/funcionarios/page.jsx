'use client'

import React, { useState, useEffect } from 'react'
import styles from './funcionarios.module.css'
import MainTheme from '@/theme'
import { Table, Button, Modal, Form, message, Input, Typography, InputNumber, Select, Space, Popconfirm } from 'antd'
import { PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

function Funcionarios() {

    const { Title, Paragraph } = Typography
    const [funcionarios, setFuncionarios] = useState([])
    const [franquias, setFranquias] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()


    async function carregarFuncionarios() {
        try {
            setLoading(true)
            const response = await fetch('/api/funcionarios')
            const data = await response.json()
            setFuncionarios(data);
        } catch (error) {
            messageApi.error('Erro ao carregar funcionários')
        } finally {
            setLoading(false)
        }
    }

    async function carregarFranquias() {
        try {
            const response = await fetch('/api/franquias')
            const data = await response.json()
            setFranquias(data)

        } catch (error) {
            messageApi.error('Erro ao carregar franquias')
        }
    }

    useEffect(() => {
        carregarFuncionarios()
        carregarFranquias()
    }, [])

    //Table do antd


    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'id'
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'id'
        },
        {
            title: 'Cargo',
            dataIndex: 'cargo',
            key: 'id'
        },
        {
            title: 'Salário',
            dataIndex: 'salario',
            key: 'id',
            render: (valor) =>
                valor.toLocaleString('en', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'USD',
                }),
        },
        {
            title: 'Franquia',
            dataIndex: ['franquia', 'nome'],
            key: 'id'
        }
    ]

    return (
        <MainTheme>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Title
                        level={2}
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        FUNCIONÁRIOS
                    </Title>

                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        className={styles.addButton}
                    >
                        Adicionar
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={funcionarios}
                    rowKey='id'
                />
            </div>
        </MainTheme>
    )
}

export default Funcionarios