import { ReactNode } from "react"
import { Inter } from "next/font/google"
import NavBar from "./NavBar"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })
type MainLayoutProps = {
  children: ReactNode
  pageTitle: string
}

export default function MainLayout({ children, pageTitle }: MainLayoutProps) {
  return (
    <main className={`${inter.className}`}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NavBar />
      <div className="flex min-h-screen flex-col items-center justify-start p-24 pt-12">{children}</div>
    </main>
  )
}
