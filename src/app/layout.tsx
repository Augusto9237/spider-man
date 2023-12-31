import "./globals.scss"
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Spide-Verse',
  description: 'Criando um carrosel parallax do Aranhaverso com React, Next.js e Framer Motion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body >
        <header>
          <Image
            className="menu"
            src="/icons/menu.svg"
            alt='Opções de menu'
            width={36}
            height={25}
          />

          <Link href='/' className="logo">
            <Image
              src="/spider-logo.svg"
              alt='Spiderman'
              width={260}
              height={70}
            />
          </Link>

          <Image
            className="login"
            src="/icons/user.svg"
            alt='Login'
            width={36}
            height={25}
          />
        </header>
        {children}</body>
    </html>
  )
}
