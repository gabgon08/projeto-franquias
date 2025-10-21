'use client'

import React, { useState, useEffect } from 'react'
import styles from './funcionarios.module.css'
import common from './../../theme/common.module.css'
import { GreenTheme } from './../../theme/index'
import { Table, Button, Modal, Form, message, Input, Typography, InputNumber, Select, Space, Popconfirm, Tooltip, theme, Flex, Layout } from 'antd'
import { PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

function Funcionarios() {

    const { Title } = Typography
    const { Content } = Layout
    const [funcionarios, setFuncionarios] = useState([])
    const [franquias, setFranquias] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const { token } = theme.useToken()

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

    const gerarFiltros = (key) => {
        const uniqueValues = [...new Set(funcionarios.map((item) => item[key]))];
        return uniqueValues.map((value) => ({ text: value, value }));
    };

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

    const colunas = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            sorter: (a, b) => a.nome.localeCompare(b.nome),
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: 'Cargo',
            dataIndex: 'cargo',
            key: 'cargo',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            sorter: (a, b) => a.cargo.localeCompare(b.cargo),
            filters: gerarFiltros('cargo'),
            onFilter: (value, record) => record.cargo === value
        },
        {
            title: 'Salário',
            dataIndex: 'salario',
            key: 'salario',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            render: (valor) =>
                valor.toLocaleString('en', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'USD',
                }),
            sorter: (a, b) => a.salario - b.salario,
        },
        {
            title: 'Franquia',
            dataIndex: ['franquia', 'nome'],
            key: 'franquia',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            render: (nome) => nome || 'Sem franquia',
            sorter: (a, b) => a.franquia.nome.localeCompare(b.franquia.nome),
        },
        {
            title: 'Ações',
            key: 'acoes',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip
                        title='Editar funcionário'>
                        <Button
                            icon={<EditOutlined />}
                            variant='solid'
                            color='primary'
                            shape='circle'
                            onClick={() => editar(record)}
                            size="default"
                        />
                    </Tooltip>

                    <Popconfirm
                        title="Confirma remover?"
                        onConfirm={() => removerFuncionario(record.id)}
                        okText="Sim"
                        cancelText="Não"
                        okButtonProps={{ shape: 'round' }}
                        cancelButtonProps={{ shape: 'round' }}
                    >
                        <Tooltip
                            title='Deletar funcionário'>
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
            <Layout className={common.layout}
                style={{ backgroundColor: token.colorBgContainer }}>

                <Content className={common.container}>
                    {contextHolder}

                    <div className={common.topBox}>

                        <div className={common.topBoxIconTitle}
                            style={{
                                backgroundColor: token.colorPrimary,
                                color: token.colorBgContainer
                            }}>

                            <UserOutlined className={common.topBoxIcon} />

                            <Title
                                level={3}
                                className={common.topBoxTitle}
                                style={{ color: token.colorBgContainer }}
                            >FUNCIONÁRIOS
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

                    <div
                        className={common.containerTable}
                        style={{ backgroundColor: token.colorTableBg }}>

                        <Table
                            columns={colunas}
                            dataSource={funcionarios}
                            loading={{
                                spinning: loading,
                                tip: 'Carregando funcionários, aguarde...'
                            }}
                            rowKey='id'
                            pagination={{
                                pageSize: 10,
                                position: ['bottomCenter']
                            }}
                        />

                    </div>

                    <Modal
                        title={editandoId ? 'Editar Funcionário' : 'Novo Funcionário'}
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
                            layout="vertical"
                            onFinish={salvarFuncionario}
                        >
                            <Form.Item
                                name="nome"
                                label="Nome"
                                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    { required: true, message: 'Campo obrigatório' },
                                    { type: 'email', message: 'Email inválido' }
                                ]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="cargo"
                                label="Cargo"
                                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="salario"
                                label="Salário"
                                rules={[{ required: true, message: 'Campo obrigatório' }]}>

                                <InputNumber
                                    style={{ width: '100%' }}
                                    prefix="$"
                                    min={0}
                                    precision={2}
                                    decimalSeparator="."
                                    step={100}
                                />
                            </Form.Item>

                            <Form.Item
                                name="franquiaId"
                                label="Franquia"
                                rules={[{ required: true, message: 'Campo obrigatório' }]}>

                                <Select
                                    placeholder="Selecione uma franquia"
                                    showSearch
                                    optionFilterProp="children">

                                    {franquias.map(franquia => (
                                        <Select.Option key={franquia.id} value={franquia.id}>
                                            {franquia.nome} - {franquia.cidade}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </GreenTheme >
    )
}

export default Funcionarios