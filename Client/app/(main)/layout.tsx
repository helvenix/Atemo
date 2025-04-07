import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppList } from "@/components/app-list"
import Auth from "@/components/auth";
import { UserProvider } from "@/components/user-context";

import "../globals.css";

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <UserProvider>
            <Auth>
                <SidebarProvider>
                    <AppSidebar />
                        <main className="w-screen h-screen">
                            {children}
                        </main>
                    <AppList />
                </SidebarProvider>
            </Auth>
        </UserProvider>
    );
}
