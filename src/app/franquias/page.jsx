'use client'

import React, { useState, useEffect } from 'react'
import styles from './franquias.module.css'
import MainTheme from '@/theme'
import { Table, Button, Modal, Form, message, Input, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

function Franquias() {

    const [franquias, setFranquias] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const { Title, Paragraph } = Typography

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

    async function salvarFranquia(values) {
        try {
            const response = await fetch('/api/franquias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            if (response.ok) {
                messageApi.success('Franquia criada com sucesso!')
                setModalVisible(false)
                form.resetFields()
                carregarFranquias()
            } else {
                messageApi.error('Erro ao salvar franquia')
            }
        } catch (error) {
            messageApi.error('Erro ao salvar franquia')
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
            title: 'País',
            dataIndex: 'pais',
            key: 'id'
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'id'
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
            <div className={styles.container}>
                {contextHolder}
                <div className={styles.top}>
                    <Title
                        level={2}
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        FRANQUIAS
                    </Title>

                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={showModal}
                        className={styles.addButton}
                    >
                        Adicionar
                    </Button>

                </div>
                <div className={styles.tableContainer}>
                    <Table
                        columns={colunas}
                        dataSource={franquias}
                        loading={{
                            spinning: loading,
                            tip: 'Carregando franquias, aguarde...'
                        }}
                        rowKey='id'
                        pagination={{ pageSize: 10 }}
                    />

                </div>

                <Modal
                    title='Nova Franquia'
                    open={modalVisible}
                    onCancel={closeModal}
                    onOk={okModal}
                >

                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={salvarFranquia}
                        className={styles.modalForm}
                    >
                        <Form.Item name='nome' label='Nome' rules={[{ required: true, message: 'Digite o nome' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='cidade' label='Cidade' rules={[{ required: true, message: 'Digite a cidade' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='pais' label='País' rules={[{ required: true, message: 'Digite o país' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='telefone' label='Telefone' rules={[{ required: true, message: 'Digite o telefone' }]}>
                            <Input />
                        </Form.Item>

                    </Form>
                </Modal>

            </div>
        </MainTheme >
    )
}

export default Franquias
