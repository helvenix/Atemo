"use client"
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Auth({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>){
    const router = useRouter();
    
    useEffect(() => {
        async function fetchProfile(){
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                    credentials: 'include'
                });
                if(res.ok){
                    const data = await res.json();
                }else{
                    router.push('/login');
                }
            }catch (e){
                router.push('/login');
            }
        } 
        fetchProfile();
    }, [router]);

    return <>{children}</>
}