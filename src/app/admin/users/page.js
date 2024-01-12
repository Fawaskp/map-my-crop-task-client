'use client'
import UseCreateModal from '@/UserCreateModal'
import React, { useEffect, useState } from 'react'
import { adminAxiosInstance } from '../../../utils/axiosUtils'

export default function Home() {

  const [open, setOpen] = useState(false)


  const [users, setUsers] = useState([])

  const fetchUsers = () => {
    adminAxiosInstance.get('list-users/').then((res) => {
      setUsers(res.data)
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])


  return (
    <>
      <UseCreateModal isOpen={open} onClose={() => setOpen(false)} fetchUsers={fetchUsers} />
      <div className="max-w-6xl mx-auto relative overflow-x-auto">
        <div style={{ position: 'sticky', top: 0 }}>
          <div className='flex justify-between'>
            <h1 className='font-semibold text-3xl my-3'>Users</h1>
            <button onClick={() => setOpen(!open)} className='text-3xl px-2 font-bold rounded-full' title='Create new user'>
              +
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                No.POI
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(({ id, username, email, num_pois }) => {
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
    </>
  )
}
