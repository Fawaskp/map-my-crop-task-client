'use client'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body style={{ minHeight: '100vh' }} className={inter.className+' dark:text-white dark:bg-black'}>
        <AdminNavbar/>
        <div className='pt-24' >
          {children}
        </div>
        <ToastContainer autoClose={2000} position='top-center' />
      </body>
    </html>
  )
}


