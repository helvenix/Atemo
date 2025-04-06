import type { Metadata } from "next";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppList } from "@/components/app-list"
import { Toaster } from "@/components/ui/sonner"

import "../globals.css";

export const metadata: Metadata = {
    title: "Atemo",
    description: "Daily Productivity Web App",
};

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="icon/icon.ico" />
            </head>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SidebarProvider>
                        <AppSidebar />
                            <main className="w-screen h-screen">
                                {children}
                            </main>
                            <Toaster 
                                position="top-center"
                            />
                        <AppList />
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
