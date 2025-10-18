import React from 'react'
import { ConfigProvider } from 'antd'

const MainTheme = ({ children }) => {
  // cores principais
  const primaryColorCode = '#35725f'
  const textBaseColor = '#1c3b32ff'

  // cores da tabela
  const headerTextColor = '#e2fffa'
  const tableBgColor = '#e8f6f4'
  const tableRowHoverBg = '#35725f2a';
  const tableRowExpandedBg = '#35725f2a';
  const tableHeaderSortActiveBg = '#f05e23';
  const tableHeaderSortHoverBg = '#35725fc4'

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
            headerBg: primaryColorCode,
            headerColor: headerTextColor,
            rowHoverBg: tableRowHoverBg,
            rowExpandedBg: tableRowExpandedBg,
            headerSortActiveBg: tableHeaderSortActiveBg,
            headerSortHoverBg: tableHeaderSortHoverBg
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