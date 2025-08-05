import React from "react";

import { getUserFromSession } from "@/auth/session";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import { UserProvider, User } from "@/components/provider/user-context";
// import { TaskProvider } from "@/components/task-context";
// import { EventProvider } from "@/components/event-context";

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

import "../globals.css";

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const session = await getUserFromSession(await cookies())
    if(!session) redirect("/login")

    const initialUser: User = {
        _id: session._id,
        uid: session.uid,
        name: session.name,
        email: session.email,
        avatarUrl: session.avatarUrl ?? "",
    }

    return (
        <UserProvider initialUser={initialUser}>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-screen h-screen">
                    {children}
                </main>
            </SidebarProvider>
        </UserProvider>
    );
}
