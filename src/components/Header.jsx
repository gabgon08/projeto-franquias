'use client'

import { Flex, Layout, Menu } from "antd"
import { HomeOutlined, UserOutlined, ShopOutlined, DashboardOutlined } from '@ant-design/icons'
import { usePathname } from "next/navigation"
import Link from 'next/link'
import styles from './Header.module.css'
import { HeaderTheme } from "../theme/index"
import Title from "antd/es/typography/Title"


const { Header } = Layout;

const App = () => {
    const pathname = usePathname()
    const itens = [
        {
            label: <Link href='/'>Home</Link>,
            key: '/',
            icon: <HomeOutlined />
        },
        {
            label: <Link href='/franquias'>Franquias</Link>,
            key: '/franquias',
            icon: <ShopOutlined />
        },
        {
            label: <Link href='/funcionarios'>Funcionários</Link>,
            key: '/funcionarios',
            icon: <UserOutlined />
        },
        {
            label: <Link href='/dashboard'>Dashboard</Link>,
            key: '/dashboard',
            icon: <DashboardOutlined />
        }
    ]

    return (
        <HeaderTheme>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <Flex className={styles.flexContainer}>

                        <Link href='/' className={styles.flexLink}>

                            <Title
                                level={2}
                                className={styles.flexTitle}
                            >
                                Sistema de Franquias
                            </Title>

                        </Link>

                        <Menu
                            mode="horizontal"
                            selectedKeys={[pathname]}
                            items={itens}
                            className={styles.flexMenu}
                        />

                    </Flex>
                </Header>
            </Layout >
        </HeaderTheme >
    )
}

export default App