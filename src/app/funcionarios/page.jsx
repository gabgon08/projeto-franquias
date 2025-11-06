'use client'

import React, { useState, useEffect } from 'react'
import common from './../../theme/common.module.css'
import { LayoutTheme } from './../../theme/index'
import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Popconfirm, Tooltip, theme, Layout, Empty } from 'antd'
import { PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined, FilterFilled, SearchOutlined } from '@ant-design/icons'
import toast from 'sonner'

function Funcionarios() {

    const { Content } = Layout
    const [funcionarios, setFuncionarios] = useState([])
    const [franquias, setFranquias] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [filtroNome, setFiltroNome] = useState('')
    const [form] = Form.useForm()
    const { token } = theme.useToken()

    async function carregarFuncionarios() {
        try {
            setLoading(true)
            const response = await fetch('/api/funcionarios')
            const data = await response.json()
            setFuncionarios(data);
        } catch (error) {
            toast.error('Erro ao carregar funcionários')
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
            toast.error('Erro ao carregar franquias')
        }
    }

    async function salvarFuncionario(values) {
        try {
            const url = editandoId ? `/api/funcionarios/${editandoId}` : '/api/funcionarios'
            const response = await fetch(url, {
                method: editandoId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            if (response.ok) {
                toast.success(`Funcionário ${editandoId ? 'atualizado' : 'criado'} com sucesso!`)
                setModalVisible(false)
                form.resetFields()
                setEditandoId(null)
                carregarFuncionarios()
            } else {
                toast.error('Erro ao salvar funcionário')
            }
        } catch (error) {
            toast.error('Erro ao salvar funcionário')
        }
    }

    async function removerFuncionario(id) {
        try {
            const response = await fetch(`/api/funcionarios/${id}`, { method: 'DELETE' })
            if (response.ok) {
                toast.success('Funcionário removido!')
                carregarFuncionarios()
            } else {
                toast.error('Erro ao remover funcionário')
            }
        } catch (error) {
            toast.error('Erro ao remover funcionário')
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

    const gerarFiltros = (key) => {
        const valoresUnicos = [...new Set(funcionarios.map((item) => item[key]))];
        const valoresOrdenados = valoresUnicos.sort((a, b) => a.localeCompare(b));
        return valoresOrdenados.map((value) => ({ text: value, value }));
    }

    const gerarFiltrosFranquias = (valores) => {
        const valoresUnicos = [...new Set(valores)]
        const valoresOrdenados = valoresUnicos.sort((a, b) => a.localeCompare(b))
        return valoresOrdenados.map(v => ({ text: v, value: v }))
    }

    useEffect(() => {
        carregarFuncionarios()
        carregarFranquias()
    }, [])

    const colunas = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            align: 'center',
            render: (text) => <strong>{text}</strong>,
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
            onFilter: (value, record) => record.cargo === value,
            filterIcon: filtered => <FilterFilled style={{ color: filtered ? '#1677ff' : token.colorTableBg }} />,
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
            filters: gerarFiltrosFranquias(funcionarios.map(f => f.franquia?.nome).filter(Boolean)),
            onFilter: (value, record) => record.franquia?.nome === value,
            filterIcon: filtered => <FilterFilled style={{ color: filtered ? '#1677ff' : token.colorTableBg }} />,
        },
        {
            title: 'Ações',
            key: 'acoes',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip
                        title='Editar funcionário'
                        placement='left'>
                        <Button
                            icon={<EditOutlined />}
                            variant='solid'
                            color='primary'
                            shape='circle'
                            size="default"
                            onClick={() => editar(record)} />
                    </Tooltip>

                    <Popconfirm
                        title="Confirma a remoção?"
                        onConfirm={() => removerFuncionario(record.id)}
                        okText="Sim"
                        cancelText="Não"
                        okButtonProps={{ shape: 'round' }}
                        cancelButtonProps={{ shape: 'round' }}>
                        <Tooltip
                            title='Deletar funcionário'
                            placement='right'>
                            <Button
                                icon={<DeleteOutlined />}
                                danger
                                color='danger'
                                shape='circle'
                                variant='solid'
                                size="default" />
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
        setEditandoId(null)
        form.resetFields()
    }

    const okModal = () => {
        form.submit()
    }

    const funcionariosFiltrados = funcionarios.filter(funcionario =>
        funcionario.nome.toLowerCase().includes(filtroNome.toLowerCase())
    )

    return (
        <LayoutTheme>
            <Layout className={common.layout}>

                <Content className={common.container}>

                    <div
                        className={common.mediaTopBoxHeader}
                        style={{
                            backgroundColor: token.colorPrimary,
                            color: token.colorBgLayout
                        }}>

                        <UserOutlined className={common.mediaTopBoxIcon} />

                        <h1>FUNCIONÁRIOS</h1>
                    </div>

                    <div className={common.topBox}>

                        <div className={common.topBoxIconTitleAdd}
                            style={{
                                backgroundColor: token.colorPrimary,
                                color: token.colorBgLayout
                            }}>

                            <UserOutlined className={common.topBoxIcon} />

                            <h1 className={common.topBoxTitle}>FUNCIONÁRIOS</h1>

                            <Tooltip title='Adicionar funcionário'>
                                <Button
                                    type='default'
                                    icon={<PlusOutlined />}
                                    shape='round'
                                    size='middle'
                                    onClick={showModal}
                                    className={common.addButton}
                                    style={{
                                        backgroundColor: token.colorBgLayout,
                                        borderColor: token.colorBgLayout
                                    }}

                                >
                                </Button>
                            </Tooltip>

                        </div>

                        <Input
                            className={common.inputSearch}
                            placeholder='Pesquisar por nome'
                            suffix={<SearchOutlined className={common.inputSearchIcon} style={{ backgroundColor: token.colorPrimary, color: token.colorBgBase }} />}
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                            allowClear
                            size='large'
                        />

                    </div>

                    <div
                        className={common.containerTable}
                        style={{ backgroundColor: token.colorTableBg }}>

                        <Table
                            columns={colunas}
                            dataSource={funcionariosFiltrados}
                            loading={{
                                spinning: loading,
                                tip: 'Carregando funcionários, aguarde...'
                            }}
                            rowKey='id'
                            size='middle'
                            pagination={{
                                size: 'middle',
                                position: ['bottomCenter'],
                                showSizeChanger: true,
                                locale: { items_per_page: 'por página' }
                            }}
                            locale={{ emptyText: <Empty description='Nenhum funcionário encontrado' image='https://img.icons8.com/bbcfdf/fluency-systems-regular/96/nothing-found.png' /> }}
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
                                <Input placeholder='Digite o nome' />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    { required: true, message: 'Campo obrigatório' },
                                    { type: 'email', message: 'Email inválido' }
                                ]}>
                                <Input placeholder='Digite o e-mail' />
                            </Form.Item>

                            <Form.Item
                                name="cargo"
                                label="Cargo"
                                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                                <Input placeholder='Digite o cargo' />
                            </Form.Item>

                            <Form.Item
                                name="salario"
                                label="Salário"
                                rules={[
                                    { required: true, message: 'Campo obrigatório' },
                                ]}>

                                <InputNumber
                                    placeholder='Digite o salário (mínimo: $100.0)'
                                    style={{ width: '100%' }}
                                    prefix="$"
                                    min={100}
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
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={franquias
                                        .slice()
                                        .sort((a, b) => a.nome.localeCompare(b.nome))
                                        .map((franquia) => ({
                                            value: franquia.id,
                                            label: `${franquia.nome} - ${franquia.cidade}`,
                                        }))}
                                />

                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </LayoutTheme >
    )
}

export default Funcionarios