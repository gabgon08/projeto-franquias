import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '../components/Header'
import { LayoutTheme } from "./../theme/index.jsx";
import { ConfigProvider } from "antd";
import '@ant-design/v5-patch-for-react-19';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SGF",
  description: "Sistema de Gerenciamento de Franquias",
};

export default function RootLayout({ children }) {
  return (
    <ConfigProvider>
      <html lang="pt-BR">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Header />
          <LayoutTheme>
            {children}
          </LayoutTheme>
        </body>
      </html>
    </ConfigProvider>
  );
}
