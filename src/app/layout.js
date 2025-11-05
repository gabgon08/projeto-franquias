import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from '../components/Header'
import { LayoutTheme } from "./../theme/index.jsx";
import { ConfigProvider } from "antd";
import '@ant-design/v5-patch-for-react-19';
import { Toaster } from "react-hot-toast";

const quickFont = Quicksand({ subsets: ['latin'], weight: '500' })

export const metadata = {
  title: "SGF",
  description: "Sistema de Gerenciamento de Franquias",
};

export default function RootLayout({ children }) {
  return (
    <ConfigProvider>
      <html lang="pt-BR">
        <body className={quickFont.className}>
          <Header />
          <Toaster />
          <LayoutTheme>
            {children}
          </LayoutTheme>
        </body>
      </html>
    </ConfigProvider>
  );
}
