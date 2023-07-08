"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Login Page',
  description: '...',
}

const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async(e: any) => {
    try {
      e.preventDefault()
      setLoading(true);
     const response = await axios.post('/api/users/login',user)
     if (response?.data?.status== 200) {
      toast.success(response?.data?.message)
     console.log('Login Success',response)
     router.push('/profile')
     } else {
      toast.error(response?.data?.message)
     console.log('Login Failed',response)
     }
     
    } catch (error: any) {
      console.log(error?.message, 'login failed')
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (user?.email.length > 0 && user?.password.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster/>
      <h1 className="mb-4">Login</h1>
      <form onSubmit={onLogin}>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">Email</label>
          <input type="email"
            id="email"
            value={user?.email}
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password">Password</label>
          <input type="password"
            id="password"
            value={user?.password}
            placeholder="password"
            onChange={(p) => setUser({ ...user, password: p.target.value })}
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />
        </div>
        <div className="flex flex-col mb-4 gap-2">
          {loading ? <span>Processing...</span> : <button className="p-2 bg-blue-600 rounded-md text-white" disabled={disabled}>Login</button>}
          <Link href={'/signup'} className="self-center">Visit SignUp Page</Link>
        </div>
      </form>
    </div>
  )
}

export default Login