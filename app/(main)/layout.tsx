import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
// import Auth from "@/components/auth";
// import { UserProvider } from "@/components/user-context";
// import { TaskProvider } from "@/components/task-context";
// import { EventProvider } from "@/components/event-context";

import "../globals.css";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        // <UserProvider>
        //     <TaskProvider>
        //         <EventProvider>
        //             <Auth>
                        <SidebarProvider>
                            <AppSidebar />
                            <main className="w-screen h-screen">
                                {children}
                            </main>
                        </SidebarProvider>
        //             </Auth>
        //         </EventProvider>
        //     </TaskProvider>
        // </UserProvider>
    );
}
