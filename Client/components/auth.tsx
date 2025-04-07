"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useUser } from "./user-context";

export default function Auth({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>){
    const router = useRouter();
    const { setUser } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile(){
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                    credentials: 'include'
                });
                if(res.ok){
                    const data = await res.json();
                    setUser(data);
                    setLoading(false)
                }else{
                    router.push('/login');
                }
            }catch (e){
                router.push('/login');
            }
        } 
        fetchProfile();
    }, [router, setUser]);

    if(loading) return <div className="text-xl w-full h-full flex justify-center items-center">Loading...</div>

    return <>{children}</>

}