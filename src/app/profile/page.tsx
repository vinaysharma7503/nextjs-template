"use client";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
    const router = useRouter();
    const [user,setUser] = useState<any>(null)
    const onLogout = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            toast.success(response?.data?.message)
            setTimeout(() => {
                router.push('/login')
            }, 500);
        } catch (error: any) {
            console.log(error?.message, 'logout failed')
            toast.error(error?.message)
        }
    }

    const getUserProfile = async()=>{
        try {
            const response = await axios.get('/api/users/profile')
            setUser(response?.data?.data?.user)
        } catch (error:any) {
            toast.error(error?.message)
        }
    }
    useEffect(() => {
      getUserProfile()
    }, [])
    
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <Toaster />
            Profile Page
            <button onClick={onLogout} className="p-2 bg-blue-600 rounded-md text-white">Logout</button>
            <div className='flex flex-col justify-center items-center gap-2'>
                <span>Name: {user?.username}</span>
                <span>Email: {user?.email}</span>
            </div>
        </div>
    )
}

export default Profile