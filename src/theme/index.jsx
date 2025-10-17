import React from 'react'
import { ConfigProvider } from 'antd'

const MainTheme = ({ children }) => {
  const primaryColorCode = '#35725f'
  const secondaryColor = '#22493dff'

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
          colorTextBase: secondaryColor,
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default MainTheme

export const HeaderTheme = ({ children }) => {
  const primaryColorCode = '#6e290f'
  const secondaryColor = '#ffffffff'

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
          colorTextBase: secondaryColor
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
