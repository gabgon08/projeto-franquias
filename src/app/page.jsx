'use client'

import React from 'react'
import { Card, Row, Col, Layout, theme, Collapse } from 'antd'
import { UserOutlined, ShopFilled, DashboardFilled } from '@ant-design/icons'
import Link from 'next/link'
import styles from './page.module.css'
import { LayoutTheme } from './../theme/index'

export default function Home() {

  const { Header, Content, Footer } = Layout
  const { Meta } = Card
  const { token } = theme.useToken()

  const text = 'O Sistema de Gerenciamento de Franquias foi desenvolvido para simplificar o controle de unidades e colaboradores em diferentes partes do mundo. De forma prática e intuitiva, permite cadastrar, editar e acompanhar franquias e funcionários, além de visualizar estatísticas importantes através de um painel informativo.'

  const itens = [{
    label: <span className={styles.footerCollapseLabel}>SOBRE</span>,
    children: text,
    showArrow: false
  }]

  return (
    <LayoutTheme>
      <Layout className={styles.layout}>

        <Header className={styles.header}>
          <h1 className={styles.title}>Sistema de Gerenciamento de Franquias</h1>
          <p className={styles.subtitle}>Gerencie suas franquias e funcionários</p>
        </Header>

        <Content className={styles.content}>
          <Row gutter={[32, 32]} className={styles.row}>

            <Col xs={24} sm={12} lg={8}>
              <Link href="/franquias">
                <Card
                  className={styles.card}
                  cover={<ShopFilled style={{ color: token.iconColor }} className={styles.cardCover} />}
                  hoverable
                >
                  <h1 className={styles.cardTitle}>Franquias</h1>
                  <p className={styles.cardSubtitle}>Gerenciar franquias da empresa</p>
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Link href="/funcionarios">
                <Card
                  className={styles.card}
                  cover={<UserOutlined style={{ color: token.iconColor }} className={styles.cardCover} />}
                  hoverable
                >
                  <h1 className={styles.cardTitle}>Funcionários</h1>
                  <p className={styles.cardSubtitle}>Gerenciar funcionários das franquias</p>
                </Card>
              </Link>
            </Col>


            <Col xs={24} sm={12} lg={8}>
              <Link href="/dashboard">
                <Card
                  className={styles.card}
                  cover={<DashboardFilled style={{ color: token.iconColor }} className={styles.cardCover} />}
                  hoverable
                >
                  <h1 className={styles.cardTitle}>Dashboard</h1>
                  <p className={styles.cardSubtitle}>Relatórios e indicadores (BI)</p>
                </Card>
              </Link>
            </Col>

          </Row>

        </Content>

        <Footer className={styles.footer}>
          <Collapse
            className={styles.footerCollapse}
            items={itens}
            ghost
          />
        </Footer>

      </Layout>
    </LayoutTheme>
  )
}