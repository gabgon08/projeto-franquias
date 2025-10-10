import React from 'react'
import { ConfigProvider } from 'antd'

const ThemeProvider = ({ children }) => {
  const primaryColorCode = '#ffffff'

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
