'use client'

import React, { useState, useEffect } from 'react'
import common from './../../theme/common.module.css'
import { LayoutTheme } from './../../theme/index'
import { Table, Button, Modal, Form, message, Input, Space, Popconfirm, Tooltip, Select, theme, Layout } from 'antd'
import { PlusOutlined, ShopOutlined, EditOutlined, DeleteOutlined, SearchOutlined, FilterFilled } from '@ant-design/icons'
import countries from 'i18n-iso-countries'
import pt from 'i18n-iso-countries/langs/pt.json'

countries.registerLocale(pt)

function Franquias() {

    const [franquias, setFranquias] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [filtroNome, setFiltroNome] = useState('')
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const paises = Object.entries(countries.getNames('pt', { select: 'official' }))
    const { Option } = Select
    const { Content } = Layout
    const { token } = theme.useToken()

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
                messageApi.success(`Franquia ${editandoId ? 'atualizada' : 'criada'} com sucesso!`)
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
        const valoresUnicos = [...new Set(franquias.map((item) => item[key]))];
        const valoresOrdenados = valoresUnicos.sort((a, b) => a.localeCompare(b));
        return valoresOrdenados.map((value) => ({ text: value, value }));
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
            render: (text) => <strong>{text}</strong>,
            showSorterTooltip: { title: 'Clique para ordenar' },
            sorter: (a, b) => a.nome.localeCompare(b.nome),
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            sorter: (a, b) => a.pais.localeCompare(b.pais),
            filters: gerarFiltros('pais'),
            onFilter: (value, record) => record.pais === value,
            filterIcon: filtered => <FilterFilled style={{ color: filtered ? '#1677ff' : token.colorTableBg }} />,
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            align: 'center',
            showSorterTooltip: { title: 'Clique para ordenar' },
            sorter: (a, b) => a.cidade.localeCompare(b.cidade),
            filters: gerarFiltros('cidade'),
            onFilter: (value, record) => record.cidade === value,
            filterIcon: filtered => <FilterFilled style={{ color: filtered ? '#1677ff' : token.colorTableBg }} />,
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
        setEditandoId(null)
        form.resetFields()
    }

    const okModal = () => {
        form.submit()
    }

    const franquiasFiltradas = franquias.filter(franquia =>
        franquia.nome.toLowerCase().includes(filtroNome.toLowerCase())
    )

    return (
        <LayoutTheme>
            <Layout className={common.layout}>

                <Content className={common.container}>
                    {contextHolder}

                    <div
                        className={common.mediaTopBoxHeader}
                        style={{
                            backgroundColor: token.colorPrimary,
                            color: token.colorBgLayout
                        }}>

                        <ShopOutlined className={common.mediaTopBoxIcon} />

                        <h1>FRANQUIAS</h1>
                    </div>

                    <div className={common.topBox}>

                        <div className={common.topBoxIconTitleAdd}
                            style={{
                                backgroundColor: token.colorPrimary,
                                color: token.colorBgLayout
                            }}>

                            <ShopOutlined className={common.topBoxIcon} />

                            <h1 className={common.topBoxTitle}>FRANQUIAS</h1>

                            <Tooltip title='Adicionar franquia'>
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
                            dataSource={franquiasFiltradas}
                            loading={{
                                spinning: loading,
                                tip: 'Carregando franquias, aguarde...'
                            }}
                            rowKey='id'
                            size='middle'
                            pagination={{
                                size: 'middle',
                                position: ['bottomCenter'],
                                showSizeChanger: true,
                                locale: { items_per_page: 'por página' }
                            }} />
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
                                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                                <Input placeholder='Digite o nome' />
                            </Form.Item>

                            <Form.Item
                                name='cidade'
                                label='Cidade'
                                rules={[{ required: true, message: 'Campo obrigatório' }]}>
                                <Input placeholder='Digite a cidade' />
                            </Form.Item>

                            <Form.Item
                                name='pais'
                                label='País'
                                rules={[{ required: true, message: 'Campo obrigatório' }]}>

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
                                rules={[
                                    { required: true, message: 'Campo obrigatório' },
                                    {
                                        type: 'string',
                                        min: 5,
                                        max: 15,
                                        message: 'O número deve ter de 5 a 15 caracteres'
                                    }
                                ]}>
                                <Input placeholder='Digite o telefone' />
                            </Form.Item>

                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </LayoutTheme >
    )
}

export default Franquias
