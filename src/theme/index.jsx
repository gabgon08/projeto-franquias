import React from 'react'
import { ConfigProvider } from 'antd'

const MainTheme = ({ children }) => {
  const primaryColorCode = '#35725f'
  const secondaryColor = '#000000'

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

export default MainTheme

export const HeaderTheme = ({ children }) => {
  const primaryColorCode = '#000000'
  const secondaryColor = '#dffcf9'

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
