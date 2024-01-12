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
      <body style={{minHeight: '100vh'}} className={inter.className}>
        <div className='p-4 flex justify-center fixed w-full bg-white dark:bg-black z-20' >
          <button
            onClick={() => router.push('/admin')}
            type="submit"
            className={`w-2/5 py-4 mx-2 dark:text-white border-b-2 ${pathname == '/admin' ? 'border-main-orange' : 'border-gray-500'} hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300`}
            style={{ fontWeight: "bold" }}
          >
            Home
          </button>
          <button
            onClick={() => router.push('/admin/users')}
            type="submit"
            className={`w-2/5 py-4 mx-2 dark:text-white border-b-2 ${pathname == '/admin/users' ? 'border-main-orange' : 'border-gray-500'} hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300`}
            style={{ fontWeight: "bold" }}
          >
            Users
          </button>
        </div>

        <ToastContainer position='top-center' />

        <div className='pt-32' >
          {children}
        </div>
      </body>
    </html>
  )
}


