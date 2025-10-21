'use client'

import React from 'react'
import { ConfigProvider } from 'antd'

export function GreenTheme({ children }) {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#255933',
          colorText: '#0c2713',
          colorBgContainer: '#dcfce3',
        },
        components: {
          Table: {
            colorBgContainer: '#dcfce3',
            // headerBg: '#35725f',
            // headerColor: '#e2fffa',
            // rowHoverBg: '#35725f2a',
            // rowExpandedBg: '#35725f2a',
            // headerSortActiveBg: '#f05e23',
            // headerSortHoverBg: '#35725fc4',
            // cellFontSize: 15
          },
          Tooltip: {
            colorBgSpotlight: '#1c3b32ff'
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