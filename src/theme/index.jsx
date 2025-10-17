import React from 'react'
import { ConfigProvider } from 'antd'
import { volcano } from '@ant-design/colors'

const MainTheme = ({ children }) => {
  const primaryColorCode = '#35725f'
  const textColor = '#22493dff'
  const headerBgColor = '#35725f'
  const headerTextColor = '#e2fffa'
  const tableBgColor = 'rgba(255, 255, 255, 0)'

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
          colorTextBase: textColor,
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
          colorTextBase: textColor
        },
        components: {
          Menu: {
            // activeBarHeight: 2
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}
