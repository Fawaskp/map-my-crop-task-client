'use client'
import UseCreateModal from '@/components/admin/UserCreateModal'
import React, { useEffect, useState } from 'react'
import { adminAxiosInstance } from '@/utils/axiosUtils'

export default function Home() {

  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])

  const fetchUsers = () => {
    adminAxiosInstance.get('list-users/').then((res) => {
      setUsers(res.data)
      console.log(res.data);
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])


  return (
    <>
      <UseCreateModal isOpen={open} onClose={() => setOpen(false)} fetchUsers={fetchUsers} />
      <div className='max-w-6xl mx-auto' >

        <div className='mx-3 flex justify-between'>
          <h1 className='font-semibold text-xl md:text-3xl my-3'>Users</h1>
          <button onClick={() => setOpen(!open)} className='text-xl md:text-3xl px-2 font-bold rounded-full' title='Create new user'>
            +
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full overflow-scroll text-xs sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  email
                </th>
                <th scope="col" className="px-6 py-3">
                  isAdmin
                </th>
                <th scope="col" className="px-6 py-3">
                  No.POI
                </th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(({ id, username, is_superuser, email, num_pois }) => {
                  return (
                    <tr key={username} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {id}
                      </th>
                      <td className="px-6 py-4">{username}</td>
                      <td className="px-6 py-4">{email}</td>
                      <td className="px-6 py-4">
                        {
                          is_superuser ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                              <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z" />
                              <path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z" />
                            </svg>
                            :
                            <span className='font-bold text-red-500' >No</span>
                        }
                      </td>
                      <td className="px-6 py-4">{num_pois}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {
            users.length == 0 &&
            <h1 colSpan={4} className='font-bold border-white dark:border-gray-700 border-2 text-center w-full text-2xl p-3' >
              Not data to show
            </h1>
          }
        </div>
      </div>
    </>
  )
}
