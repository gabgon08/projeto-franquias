'use client'

import React from 'react'
import styles from './page.module.css'
import common from './../theme/common.module.css'
import { LayoutTheme } from './../theme/index'
import { Layout } from 'antd'

function Home() {

  const { Content } = Layout
  const { token } = theme.useToken()

  return (
    <LayoutTheme>
      <Layout className={common.layout}>
        <Content className={common.container}>

          <div className={styles.main}>
            <p>The Fate of Ophelia</p>
            <p>Actually Romantic</p>
            <p>Elizabeth Taylor</p>
          </div>

        </Content>
      </Layout>
    </LayoutTheme>
  )
}

export default Home
