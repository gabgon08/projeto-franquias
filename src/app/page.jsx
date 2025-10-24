'use client'

import React from 'react'
import { Card, Row, Col, Layout, theme } from 'antd'
import { UserOutlined, ShopFilled, DashboardFilled } from '@ant-design/icons'
import Link from 'next/link'
import styles from './page.module.css'
import common from './../theme/common.module.css'
import { LayoutTheme } from './../theme/index'

export default function Home() {

  const { Header, Content } = Layout
  const { Meta } = Card
  const { token } = theme.useToken()

  return (
    <LayoutTheme>
      <Layout className={common.layout}>
        <Header className={styles.header}>
          <h1 className={styles.title}>Sistema de Franquias</h1>
          <p className={styles.subtitle}>Gerencie suas franquias e funcionários</p>
        </Header>

        <Content className={common.container}>
          <div className={styles.cardsContainer}>
            <Row gutter={[32, 32]} justify="center" align='middle'>

              <Col xs={24} sm={12} lg={8}>
                <Link href="/franquias">
                  <Card
                    className={styles.card}
                    cover={<ShopFilled style={{ color: token.iconColor }} className={styles.cardCover} />}
                    hoverable
                  >
                    <Meta
                      title="Franquias"
                      description="Gerenciar franquias da empresa"
                      className={styles.cardMeta} />

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
                    <Meta
                      title="Funcionários"
                      description="Gerenciar funcionários das franquias"
                      className={styles.cardMeta} />

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
                    <Meta
                      title="Dashboard"
                      description="Relatórios e indicadores (BI)"
                      className={styles.cardMeta} />

                  </Card>
                </Link>
              </Col>

            </Row>
          </div>

        </Content>
      </Layout>
    </LayoutTheme>
  )
}