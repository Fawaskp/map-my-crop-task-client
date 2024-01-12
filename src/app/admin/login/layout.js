'use client'
import { Inter } from 'next/font/google'
import { useRouter, usePathname } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        {children}
        <ToastContainer position='top-center' />
      </body>
    </html>
  )
}


