'use client'

import React from 'react'
import { ConfigProvider } from 'antd'

export function GreenTheme({ children }) {
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
          colorBgContainer: '#9fff51ff'
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
          Tooltip: {
            colorBgSpotlight: textBaseColor
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export function HeaderTheme({ children }) {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6e290f',
          colorText: '#fddcd0ff',
        },
        components: {
          Menu: {
            horizontalItemHoverBg: '#c9501ccf',
            itemColor: '#fddcd0ff',
            itemHoverColor: '#fddcd0ff',
            itemBg: '#f05e23',
            popupBg: '#f05e23',
          },
          Layout: {
            headerBg: '#f05e23',
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}