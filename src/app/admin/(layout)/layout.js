'use client'
import AdminNavbar from '@/components/AdminNavbar'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body style={{ minHeight: '100vh' }} className={inter.className}>
        <AdminNavbar />
        <ToastContainer autoClose={2000} position='top-center' />
        <div className='pt-24' >
          {children}
        </div>
      </body>
    </html>
  )
}


