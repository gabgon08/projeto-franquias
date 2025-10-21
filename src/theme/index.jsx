'use client'

import React from 'react'
import { ConfigProvider } from 'antd'

const colors = {
  green: {
    1: '#0c2713',
    2: '#4b7556',
    3: '#255933',
    4: '#4ca865',
    5: '#cfeed5',
    6: '#dcfce3',
    7: '#ecfcef',
  }
}
export function GreenTheme({ children }) {

  return (
    <ConfigProvider

      theme={{
        token: {
          colorPrimary: colors.green[3],
          colorText: colors.green[1],
          colorBgContainer: colors.green[6],
          colorTableBg: colors.green[7],
        },
        components: {
          Table: {
            colorBgContainer: colors.green[7],
            headerBg: colors.green[3],
            headerColor: colors.green[6],
            rowHoverBg: colors.green[5],
            headerSortActiveBg: colors.green[4],
            headerSortHoverBg: colors.green[2],
            cellFontSize: 15,
            headerBorderRadius: 15,
          },
          Tooltip: {
            colorBgSpotlight: colors.green[3]
          },
          Button: {
            primaryShadow: 0,
            primaryColor: colors.green[7],
            dangerColor: colors.green[7]
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
          colorPrimary: colors.green[3],
          colorText: colors.green[7],
        },
        components: {
          Menu: {
            horizontalItemHoverBg: colors.green[2],
            horizontalItemSelectedBg: colors.green[6],
            itemColor: colors.green[7],
            itemHoverColor: colors.green[7],
            itemBg: colors.green[1],
            popupBg: colors.green[3],
          },
          Layout: {
            headerBg: colors.green[1],
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}