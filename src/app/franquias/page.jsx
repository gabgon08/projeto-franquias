'use client'

import React, { useState, useEffect } from 'react'
import common from './../../theme/common.module.css'
import styles from './franquias.module.css'
import MainTheme from '@/theme'
import { Table, Button, Modal, Form, message, Input, Space, Typography, Popconfirm } from 'antd'
import { PlusOutlined, ShopOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

function Franquias() {

    const [franquias, setFranquias] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const { Title } = Typography

    async function carregarFranquias() {

        try {
            setLoading(true)
            const response = await fetch('/api/franquias')
            const data = await response.json()
            setFranquias(data)

        } catch (error) {
            messageApi.error('Erro ao carregar franquias')
        } finally {
            setLoading(false)
        }

    }

    async function salvarFranquia(values) {
        try {
            const url = editandoId ? `/api/franquias/${editandoId}` : '/api/franquias'

            const response = await fetch(url, {
                method: editandoId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            if (response.ok) {
                messageApi.success(`Franquia ${editandoId ? 'atualizada' : 'criada'} criada com sucesso!`)
                setModalVisible(false)
                form.resetFields()
                setEditandoId(null)
                carregarFranquias()
            } else {
                messageApi.error('Erro ao salvar franquia')
            }
        } catch (error) {
            messageApi.error('Erro ao salvar franquia')
        }
    }

    async function removerFranquia(id) {
        try {
            const response = await fetch(`/api/franquias/${id}`, { method: 'DELETE' })
            if (response.ok) {
                messageApi.success('Franquia removida!')
                carregarFranquias()
            } else {
                messageApi.error('Erro ao remover franquia')
            }
        } catch (error) {
            messageApi.error('Erro ao remover franquia')
        }
    }

    function editar(franquia) {
        setEditandoId(franquia.id)
        form.setFieldsValue(franquia)
        setModalVisible(true)
    }

    useEffect(() => {
        carregarFranquias()
    }, [])

    const gerarFiltros = (key) => {
        const uniqueValues = [...new Set(franquias.map((item) => item[key]))];
        return uniqueValues.map((value) => ({ text: value, value }));
    };

    const colunas = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.nome.localeCompare(b.nome)
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            sorter: (a, b) => a.cidade.localeCompare(b.cidade),
            filters: gerarFiltros('cidade'),
            onFilter: (value, record) => record.cidade === value
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
            sorter: (a, b) => a.pais.localeCompare(b.pais),
            filters: gerarFiltros('pais'),
            onFilter: (value, record) => record.pais === value
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
        },
        {
            title: 'Funcionários',
            dataIndex: ['_count', 'funcionarios'],
            key: 'funcionarios_count',
            render: (count) => count || 0,
            sorter: (a, b) => a._count.funcionarios - b._count.funcionarios,
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        variant='solid'
                        color='primary'
                        shape='circle'
                        onClick={() => editar(record)}
                        size="default" />

                    <Popconfirm
                        title="Confirma remover?"
                        onConfirm={() => removerFranquia(record.id)}
                        okText="Sim"
                        cancelText="Não"
                        okButtonProps={{ shape: 'round' }}
                        cancelButtonProps={{ shape: 'round' }}
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

    const showModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
        form.resetFields()
    }

    const okModal = () => {
        form.submit()
    }


    return (
        <MainTheme>
            <div className={common.container}>
                {contextHolder}
                <div className={common.top}>
                    <div className={common.topTitleBox}>
                        <ShopOutlined className={common.topTitleIcon} />
                        <Title
                            level={3}
                            className={common.topTitleText}
                        >
                            FRANQUIAS
                        </Title>
                    </div>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        className={common.addButton}
                        shape='round'
                        size='large'
                        onClick={showModal}
                    >Adicionar
                    </Button>
                </div>

                <div className={common.containerTable}>
                    <Table
                        columns={colunas}
                        dataSource={franquias}
                        loading={{
                            spinning: loading,
                            tip: 'Carregando franquias, aguarde...'
                        }}
                        rowKey='id'
                        pagination={{ pageSize: 6 }}
                    />
                </div>

                <Modal
                    title={editandoId ? 'Editar franquia' : 'Nova Franquia'}
                    open={modalVisible}
                    onCancel={closeModal}
                    onOk={okModal}
                    okText="Salvar"
                    cancelText="Cancelar"
                    okButtonProps={{ shape: 'round' }}
                    cancelButtonProps={{ shape: 'round' }}
                >

                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={salvarFranquia}
                    >
                        <Form.Item
                            name='nome'
                            label='Nome'
                            rules={[{ required: true, message: 'Digite o nome' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name='cidade'
                            label='Cidade'
                            rules={[{ required: true, message: 'Digite a cidade' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name='pais'
                            label='País'
                            rules={[{ required: true, message: 'Digite o país' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name='telefone'
                            label='Telefone'
                            rules={[{ required: true, message: 'Digite o telefone' }]}>
                            <Input />
                        </Form.Item>

                    </Form>
                </Modal>

            </div>
        </MainTheme >
    )
}

export default Franquias
