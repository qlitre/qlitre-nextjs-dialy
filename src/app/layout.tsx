import { Inter } from 'next/font/google';
import { Header } from 'components/shared/Header';
import {Footer} from 'components/shared/Footer';

import 'styles/reset.scss'
import 'styles/root.scss'
import 'styles/globals.scss'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
