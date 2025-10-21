'use client'

import React, { useState, useEffect } from 'react'
import common from './../../theme/common.module.css'
import styles from './franquias.module.css'
import { GreenTheme } from './../../theme/index'
import { Table, Button, Modal, Form, message, Input, Space, Typography, Popconfirm, Tooltip, Select, theme, Layout } from 'antd'
import { PlusOutlined, ShopOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import countries from 'i18n-iso-countries'
import pt from 'i18n-iso-countries/langs/pt.json'
countries.registerLocale(pt)

function Franquias() {

    const [franquias, setFranquias] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const { Title } = Typography
    const { Option } = Select
    const { Content } = Layout
    const { token } = theme.useToken()
    const paises = Object.entries(countries.getNames('pt', { select: 'official' }))

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

    const gerarFiltros = (key) => {
        const uniqueValues = [...new Set(franquias.map((item) => item[key]))];
        return uniqueValues.map((value) => ({ text: value, value }));
    }

    useEffect(() => {
        carregarFranquias()
    }, [])

    const colunas = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            sorter: (a, b) => a.nome.localeCompare(b.nome)
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            sorter: (a, b) => a.cidade.localeCompare(b.cidade),
            filters: gerarFiltros('cidade'),
            onFilter: (value, record) => record.cidade === value
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            sorter: (a, b) => a.pais.localeCompare(b.pais),
            filters: gerarFiltros('pais'),
            onFilter: (value, record) => record.pais === value
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
            align: 'center',
        },
        {
            title: 'Funcionários',
            dataIndex: ['_count', 'funcionarios'],
            key: 'funcionarios_count',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            render: (count) => count || 0,
            sorter: (a, b) => a._count.funcionarios - b._count.funcionarios,
        },
        {
            title: 'Ações',
            key: 'acoes',
            align: 'center',
            render: (_, record) => (
                <Space>

                    <Tooltip
                        title='Editar franquia'>
                        <Button
                            icon={<EditOutlined />}
                            variant='solid'
                            color='primary'
                            shape='circle'
                            onClick={() => editar(record)}
                            size="default" />
                    </Tooltip>

                    <Popconfirm
                        title="Confirma remover?"
                        onConfirm={() => removerFranquia(record.id)}
                        okText="Sim"
                        cancelText="Não"
                        okButtonProps={{ shape: 'round' }}
                        cancelButtonProps={{ shape: 'round' }}>
                        <Tooltip
                            title='Deletar franquia'>
                            <Button
                                icon={<DeleteOutlined />}
                                danger
                                color='danger'
                                shape='circle'
                                variant='solid'
                                size="default"
                            />
                        </Tooltip>
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
        <GreenTheme>
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

                <Table
                    className={common.containerTable}
                    columns={colunas}
                    dataSource={franquias}
                    loading={{
                        spinning: loading,
                        tip: 'Carregando franquias, aguarde...'
                    }}
                    rowKey='id'
                    pagination={{
                        pageSize: 10,
                        position: ['bottomCenter']
                    }}
                />

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

                            <Select
                                showSearch
                                placeholder='Selecione um país'
                                optionFilterProp='children'
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {paises.map(([code, name]) => (
                                    <Option key={code} value={name}>{name}</Option>
                                ))}

                            </Select>
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
        </GreenTheme >
    )
}

export default Franquias
