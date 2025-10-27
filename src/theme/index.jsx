'use client'

import React from 'react'
import { ConfigProvider } from 'antd'

const colors = {
  green: {
    1: '#0c2713',
    2: '#255933',
    3: '#4b7556',
    4: '#4ca865',
    5: '#cfeed5',
    6: '#dcfce3',
    7: '#ecfcef',
  },
  steel: {
    1: '#1b3246',
    2: '#2b445e',
    3: '#38678f',
    4: '#699bc4',
    5: '#b2cce1',
    6: '#bbcfdf',
    7: '#e5edf6',
  },
  brown: {
    1: '#1D1404',
    2: '#48320C',
    6: '#E9E0D0',
    7: '#F4EFE7'
  }
}
export function LayoutTheme({ children }) {

  return (
    <ConfigProvider

      theme={{
        token: {
          colorPrimary: colors.steel[1],
          colorText: colors.steel[1],
          colorBgContainer: colors.steel[7],
          colorTableBg: colors.steel[7],
          colorBgLayout: colors.steel[6],
          iconColor: colors.steel[3],
          statisticTitleColor: colors.steel[7]
        },
        components: {
          Table: {
            colorBgContainer: colors.steel[7],
            headerBg: colors.steel[2],
            headerColor: colors.steel[7],
            headerSortActiveBg: colors.steel[4],
            headerSortHoverBg: colors.steel[3],
            rowHoverBg: colors.steel[5],
            cellFontSize: 15,
            headerBorderRadius: 15,
          },
          Tooltip: {
            colorBgSpotlight: colors.steel[1]
          },
          Button: {
            primaryShadow: 0,
            primaryColor: colors.steel[7],
            dangerColor: colors.steel[7]
          },
          Modal: {
            contentBg: colors.steel[7],
            headerBg: colors.steel[7],
            titleFontSize: 20,
          },
          Layout: {
            headerBg: 'transparent'
          },
          Card: {
            bodyPadding: 0
          },
          Statistic: {
            titleFontSize: 17,
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
          colorPrimary: colors.brown[2],
          colorText: colors.brown[7],
        },
        components: {
          Menu: {
            horizontalItemHoverBg: colors.brown[2],
            horizontalItemSelectedBg: colors.brown[6],
            itemColor: colors.brown[7],
            itemHoverColor: colors.brown[7],
            itemBg: colors.brown[1],
            popupBg: colors.brown[1],
          },
          Layout: {
            headerBg: colors.brown[1],
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}