'use client'

import React, { useState, useEffect } from 'react'
import styles from './funcionarios.module.css'
import common from './../../theme/common.module.css'
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

    async function salvarFuncionario(values) {
        try {
            const url = editandoId ? `/api/funcionarios/${editandoId}` : '/api/funcionarios'
            const response = await fetch(url, {
                method: editandoId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            if (response.ok) {
                messageApi.success(`Funcionário ${editandoId ? 'atualizado' : 'criado'} com sucesso!`)
                setModalVisible(false)
                form.resetFields()
                setEditandoId(null)
                carregarFuncionarios()
            } else {
                messageApi.error('Erro ao salvar funcionário')
            }
        } catch (error) {
            messageApi.error('Erro ao salvar funcionário')
        }
    }

    async function removerFuncionario(id) {
        try {
            const response = await fetch(`/api/funcionarios/${id}`, { method: 'DELETE' })
            if (response.ok) {
                messageApi.success('Funcionário removido!')
                carregarFuncionarios()
            } else {
                messageApi.error('Erro ao remover funcionário')
            }
        } catch (error) {
            messageApi.error('Erro ao remover funcionário')
        }
    }

    function editar(funcionario) {
        setEditandoId(funcionario.id)
        form.setFieldsValue({
            nome: funcionario.nome,
            email: funcionario.email,
            cargo: funcionario.cargo,
            salario: funcionario.salario,
            franquiaId: funcionario.franquiaId
        })
        setModalVisible(true)
    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Cargo',
            dataIndex: 'cargo',
            key: 'cargo'
        },
        {
            title: 'Salário',
            dataIndex: 'salario',
            key: 'salario',
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
            key: 'franquia',
            render: (nome) =>
                nome || 'Sem franquia'
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        variant='solid'
                        color='current'
                        shape='circle'
                        onClick={() => editar(record)}
                        size="default"
                    />
                    <Popconfirm
                        title="Confirma remover?"
                        onConfirm={() => removerFuncionario(record.id)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            color='danger'
                            shape='circle'
                            variant='solid'
                            size="default"
                        />
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    return (
        <MainTheme>
            <div className={common.container}>
                <div className={common.top}>
                    <div className={common.topTitle}>
                        <UserOutlined className={common.topTitleIcon} />

                        <Title
                            level={3}
                            style={{
                                fontWeight: 'bold',
                                color: '#e2fffa'
                            }}
                        >FUNCIONÁRIOS
                        </Title>
                    </div>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        className={styles.addButton}
                        size='large'
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