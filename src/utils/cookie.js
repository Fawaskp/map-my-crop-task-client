"use server"
import { cookies } from 'next/headers'

export async function getToken(name) {
  const cookieStore = cookies()
  const token = cookieStore.get(name)
  return ''+token?.value
}