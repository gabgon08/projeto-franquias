import React from 'react'
import { ConfigProvider } from 'antd'

const MainTheme = ({ children }) => {
  const primaryColorCode = '#35725f'
  const textBaseColor = '#1c3b32ff'
  const headerBgColor = '#35725f'
  const headerTextColor = '#e2fffa'
  const tableBgColor = 'rgba(255, 255, 255, 0)'

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
          colorTextBase: textBaseColor,
        },
        components: {
          Table: {
            colorBgContainer: tableBgColor,
            headerBg: headerBgColor,
            headerColor: headerTextColor,
            rowHoverBg: '#35725f2a',
            rowExpandedBg: '#35725f2a'
          },
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default MainTheme

export const HeaderTheme = ({ children }) => {
  const primaryColorCode = '#6e290f'
  const textColor = '#ffffffff'
  const menuItemHoverBgColor = '#c94f1c'

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
        },
        components: {
          Menu: {
            horizontalItemHoverBg: menuItemHoverBgColor,
            itemColor: textColor,
            itemHoverColor: textColor,
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}