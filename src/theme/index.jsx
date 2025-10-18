import React from 'react'
import { ConfigProvider } from 'antd'
import { yellow } from '@ant-design/colors'

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
            headerSortHoverBg: tableHeaderSortHoverBg,
            cellFontSize: 15
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
  const orangeLight = '#f05e23'
  const orangeDark = 'rgba(201, 80, 28, 0.81)'
  const textColor = '#ffffffff'

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
          colorText: primaryColorCode
        },
        components: {
          Menu: {
            horizontalItemHoverBg: orangeDark,
            itemColor: textColor,
            itemHoverColor: textColor,
            itemBg: orangeLight,
            popupBg: orangeLight
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}