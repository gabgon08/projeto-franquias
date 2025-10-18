'use client'

import { Menu } from "antd"
import { HomeOutlined, UserOutlined, ShopOutlined, DashboardOutlined } from '@ant-design/icons'
import { usePathname } from "next/navigation"
import Link from 'next/link'
import styles from './Header.module.css'
import { HeaderTheme } from "../theme/index"
import Title from "antd/es/typography/Title"


export default function Header() {
    const pathname = usePathname()
    const menuItems = [
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
            <header className={styles.header}>
                <div className={styles.container}>

                    <Link href='/' className={styles.headerLink}>
                        <Title
                            level={2}
                            className={styles.headerTitle}>
                            Sistema de Franquias
                        </Title>
                    </Link>

                    <Menu
                        mode="horizontal"
                        selectedKeys={[pathname]}
                        items={menuItems}
                        className={styles.headerMenu}
                    />

                </div>
            </header>
        </HeaderTheme>
    )
}