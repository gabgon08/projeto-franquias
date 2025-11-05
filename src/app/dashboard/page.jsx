'use client'

import { useState, useEffect } from 'react'
import { Card, Row, Col, Table, Statistic, Spin, Alert, Layout, theme, Select, Space } from 'antd'
import { DashboardOutlined, ShopOutlined, UserOutlined, DollarOutlined, WalletOutlined, WarningOutlined } from '@ant-design/icons'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { LayoutTheme } from '../../theme/index'
import styles from './dashboard.module.css'
import common from '../../theme/common.module.css'
import toast from 'react-hot-toast'

export default function DashboardPage() {

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState(null)
    const { Header, Content } = Layout
    const { token } = theme.useToken()

    const [tipoRanking, setTipoRanking] = useState('funcionarios')

    const dataSource =
        tipoRanking === 'funcionarios'
            ? dashboardData?.topFranquiasFuncionarios
            : dashboardData?.topFranquiasFolha

    const dashColors = {
        blue: '#417fb4',
        green: '#419C14',
        orange: '#E17E13',
        magenta: '#D32A87',
        graphColors: ['#29620D', '#31750F', '#398912', '#419C14', '#49B017', '#52C41A']
    }

    async function carregarDashboard() {
        try {
            setLoading(true)
            const response = await fetch('/api/dashboard')

            if (!response.ok) {
                throw new Error('Erro ao carregar dashboard')
            }

            const data = await response.json()
            setDashboardData(data)

        } catch (error) {
            console.error('Erro ao carregar dashboard:', error)
            toast.error('Erro ao carregar dados do dashboard')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarDashboard()
    }, [])

    // Tabela: Top 5 Franquias
    const columnsTopFranquias = [
        {
            title: 'Franquia',
            dataIndex: 'nome',
            key: 'nome',
            align: 'center',
            render: (text) => <strong>{text}</strong>
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
            align: 'center',
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            align: 'center',
        },
        {
            title: 'Funcionários',
            dataIndex: 'totalFuncionarios',
            key: 'totalFuncionarios',
            align: 'center'
        },
        {
            title: 'Folha Salarial',
            dataIndex: 'folhaSalarial',
            key: 'folhaSalarial',
            align: 'center',
            render: (valor) =>
                valor.toLocaleString('en', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'USD',
                }),
        }
    ]

    // Tabela: Últimas Franquias
    const columnsUltimasFranquias = [
        {
            title: 'Franquia',
            dataIndex: 'nome',
            key: 'nome',
            align: 'center',
            render: (text) => <strong>{text}</strong>
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
            align: 'center',
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            align: 'center',
        },
        {
            title: 'Data',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (date) => new Date(date).toLocaleDateString('pt-BR')
        }
    ]

    // Tabela: Últimos Funcionários
    const columnsUltimosFuncionarios = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            align: 'center',
            render: (text) => <strong>{text}</strong>
        },
        {
            title: 'Cargo',
            dataIndex: 'cargo',
            key: 'cargo',
            align: 'center',
        },
        {
            title: 'Salário',
            dataIndex: 'salario',
            key: 'salario',
            align: 'center',
            render: (valor) =>
                valor.toLocaleString('en', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'USD',
                }),
        },
        {
            title: 'Franquia',
            dataIndex: 'franquia',
            key: 'franquia',
            align: 'center',
        },
        {
            title: 'Data',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (date) => new Date(date).toLocaleDateString('pt-BR')
        }

    ]

    // Tabela: Franquias sem funcionários
    const columnsFranquiasSemFuncionarios = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            align: 'center',
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
            align: 'center'
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            align: 'center',
        },
        {
            title: 'Data Cadastro',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (date) => new Date(date).toLocaleDateString('pt-BR')
        }
    ]

    // LOADING E ERROS
    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <Spin size="large" />
                    <p>Carregando dashboard...</p>
                </div>
            </div>
        )
    }

    if (!dashboardData) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <p>Erro ao carregar dados do dashboard</p>
                </div>
            </div>
        )
    }

    return (
        <LayoutTheme>
            <Layout className={common.layout}>

                <Header className={styles.header}>
                    <div
                        className={styles.headerContainer}
                        style={{
                            backgroundColor: token.colorPrimary,
                            color: token.colorBgLayout
                        }}>

                        <DashboardOutlined className={styles.containerIcon} />
                        <h1 className={styles.containerTitle}>
                            DASHBOARD - BUSINESS INTELLIGENCE
                        </h1>
                    </div>

                    {/* Cards Totais */}
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={12} md={6}>
                            <Card className={styles.statCard} style={{ borderColor: dashColors.blue }}>
                                <Statistic
                                    title={<span style={{ color: token.statisticTitleColor }}>Total de Franquias</span>}
                                    value={dashboardData.totalFranquias}
                                    prefix={<ShopOutlined style={{ color: dashColors.blue }} />}
                                    valueStyle={{ color: dashColors.blue }}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={12} md={6}>
                            <Card className={styles.statCard} style={{ borderColor: dashColors.green }}>
                                <Statistic
                                    title={<span style={{ color: token.statisticTitleColor }}>Total de Funcionários</span>}
                                    value={dashboardData.totalFuncionarios}
                                    prefix={<UserOutlined style={{ color: dashColors.green }} />}
                                    valueStyle={{ color: dashColors.green }}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={12} md={6}>
                            <Card className={styles.statCard} style={{ borderColor: dashColors.orange }}>
                                <Statistic
                                    title={<span style={{ color: token.statisticTitleColor }}>Salário Médio</span>}
                                    value={dashboardData.salarioMedio}
                                    prefix={<DollarOutlined style={{ color: dashColors.orange }} />}
                                    precision={2}
                                    valueStyle={{ color: dashColors.orange }}
                                    formatter={(valor) =>
                                        valor.toLocaleString('en', {
                                            maximumFractionDigits: 0,
                                            style: 'currency',
                                            currency: 'USD'
                                        })}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={12} md={6}>
                            <Card className={styles.statCard} style={{ borderColor: dashColors.magenta }}>
                                <Statistic
                                    title={<span style={{ color: token.statisticTitleColor }}>Folha Salarial Total</span>}
                                    value={dashboardData.folhaTotal}
                                    prefix={<WalletOutlined style={{ color: dashColors.magenta }} />}
                                    precision={2}
                                    valueStyle={{ color: dashColors.magenta }}
                                    formatter={(valor) =>
                                        valor.toLocaleString('en', {
                                            maximumFractionDigits: 0,
                                            style: 'currency',
                                            currency: 'USD'
                                        })}
                                />
                            </Card>
                        </Col>
                    </Row>

                </Header>

                <Content className={styles.container}>

                    {/* GRÁFICOS - PRIMEIRA LINHA */}
                    <Row gutter={[16, 16]}>

                        {/*Franquias por País*/}
                        <Col xs={24} sm={24} lg={12}>
                            <Card title="📍 Franquias por País" className={styles.chartCard}>
                                <ResponsiveContainer width="95%" height={300}>
                                    <BarChart data={dashboardData.franquiasPorPais}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="pais" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="total" fill="#417fb4" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>

                        {/* Franquias por Cidade */}
                        <Col xs={24} sm={24} lg={12}>
                            <Card title="📍 Franquias por Cidade" className={styles.chartCard}>
                                <ResponsiveContainer width="95%" height={300}>
                                    <BarChart data={dashboardData.franquiasPorCidade}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="cidade" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="total" fill="#417fb4" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>


                    </Row>

                    {/* GRÁFICOS - SEGUNDA LINHA */}
                    <Row gutter={[16, 16]}>

                        {/* Funcionários por Cargo */}
                        <Col xs={24} sm={12} lg={8}>
                            <Card title="👥 Funcionários por Cargo" className={styles.chartCard}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={dashboardData.funcionariosPorCargo}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            dataKey="total"
                                            nameKey='cargo'
                                            label={({ cargo, total }) => `${cargo}: ${total}`}
                                        >
                                            {dashboardData.funcionariosPorCargo.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={dashColors.graphColors[index % dashColors.graphColors.length]} />
                                            ))}
                                            <Tooltip
                                                formatter={(a) => `${a}`} />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>

                        {/* Distribuição por Faixa Salarial */}
                        <Col xs={24} sm={12} lg={16}>
                            <Card title="💰 Distribuição por Faixa Salarial" className={styles.chartCard}>
                                <ResponsiveContainer width="95%" height={300}>
                                    <BarChart data={dashboardData.faixasSalariais}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="faixa" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="quantidade" fill={dashColors.orange} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>

                    </Row>

                    {/* TABELAS - RANKINGS E RECENTES */}
                    <div className={styles.tableDiv}>

                        <Row gutter={[16, 16]} className={styles.tablesRow}>

                            {/* Últimas Franquias */}
                            <Col xs={24} lg={12}>
                                <Card title="🆕 Últimas Franquias Cadastradas" className={styles.tableCard}>
                                    <Table
                                        dataSource={dashboardData.ultimasFranquias}
                                        columns={columnsUltimasFranquias}
                                        rowKey="id"
                                        pagination={false}
                                        size="small"
                                    />
                                </Card>
                            </Col>

                            {/* Últimos Funcionários */}
                            <Col xs={24} lg={12}>
                                <Card title="🆕 Últimos Funcionários Cadastrados" className={styles.tableCard}>
                                    <Table
                                        dataSource={dashboardData.ultimosFuncionarios}
                                        columns={columnsUltimosFuncionarios}
                                        rowKey="id"
                                        pagination={false}
                                        size="small"
                                    />
                                </Card>
                            </Col>

                        </Row>

                        <Row gutter={[16, 16]} className={styles.tablesRow}>

                            {/* Top 5 Franquias */}
                            <Col xs={24} lg={24}>
                                <Card
                                    title={
                                        <Space
                                            className={styles.tableSpaceTop5}>

                                            <span>🏆 Top 5 Franquias</span>
                                            <Select
                                                style={{ width: 170 }}
                                                value={tipoRanking}
                                                variant='filled'
                                                onChange={setTipoRanking}
                                                options={[
                                                    { value: 'funcionarios', label: 'Nº de Funcionários' },
                                                    { value: 'folha', label: 'Folha Salarial' },
                                                ]}
                                            />
                                        </Space>
                                    }
                                    className={styles.tableCardTop5}
                                >
                                    <Table
                                        dataSource={dataSource}
                                        columns={columnsTopFranquias}
                                        rowKey="id"
                                        pagination={false}
                                        size="small"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    {/* ALERTAS */}
                    {(dashboardData.franquiasSemFuncionarios.length > 0 || dashboardData.funcionariosSemFranquia.length > 0) && (
                        <Row gutter={[16, 16]} className={styles.tablesRow}>

                            {/* Franquias sem Funcionários */}
                            {dashboardData.franquiasSemFuncionarios.length > 0 && (
                                <Col xs={24} lg={12}>
                                    <Card
                                        title={
                                            <span>
                                                <WarningOutlined style={{ color: dashColors.orange, marginRight: 8 }} />
                                                Franquias sem Funcionários ({dashboardData.franquiasSemFuncionarios.length})
                                            </span>
                                        }
                                        className={styles.alertsCard}
                                    >
                                        <Alert
                                            message="Atenção!"
                                            description="Estas franquias não possuem funcionários cadastrados"
                                            type="warning"
                                            showIcon
                                            style={{ marginBottom: 16 }}
                                        />
                                        <Table
                                            dataSource={dashboardData.franquiasSemFuncionarios}
                                            columns={columnsFranquiasSemFuncionarios}
                                            rowKey="id"
                                            pagination={false}
                                            size="small"
                                        />
                                    </Card>
                                </Col>
                            )}

                        </Row>
                    )}

                </Content>
            </Layout>
        </LayoutTheme >
    )
}