import React from 'react'
import { ConfigProvider } from 'antd'

const ThemeProvider = ({ children }) => {
  const primaryColorCode = '#000000'

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
