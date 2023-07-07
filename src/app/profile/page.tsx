"use client";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios';

const Profile = () => {
    const router = useRouter();
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
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <Toaster />
            Profile Page
            <button onClick={onLogout} className="p-2 bg-blue-600 rounded-md text-white">Logout</button>
        </div>
    )
}

export default Profile