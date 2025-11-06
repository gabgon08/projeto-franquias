import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from '../components/Header'
import { LayoutTheme } from "./../theme/index.jsx";
import { ConfigProvider } from "antd";
import '@ant-design/v5-patch-for-react-19';
import { Toaster } from "sonner";
import ptBR from 'antd/locale/pt_BR'

const quickFont = Quicksand({ subsets: ['latin'], weight: '500' })

export const metadata = {
  title: "SGF",
  description: "Sistema de Gerenciamento de Franquias",
};

export default function RootLayout({ children }) {
  return (
    <ConfigProvider locale={ptBR}>
      <html lang="pt-BR">
        <body className={quickFont.className}>
          <Header />
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              style: {
                justifyContent: 'center',
                fontSize: '1rem',
                padding: '8px',
                borderRadius: '2rem',
                opacity: '0.98',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }
            }}
          />
          <LayoutTheme>
            {children}
          </LayoutTheme>
        </body>
      </html>
    </ConfigProvider>
  );
}
