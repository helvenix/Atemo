import type { Metadata } from "next";
import { ThemeProvider } from '@/components/others/theme-provider'
import { Toaster } from "@/components/ui/sonner"

import "./globals.css";

export const metadata: Metadata = {
    title: "Atemo",
    description: "Daily Productivity, at the moment, at this moment",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="icon/icon.ico" />
            </head>
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="w-screen h-screen">
                        {children} 
                    </main>
                    <Toaster position="top-center"/>
                </ThemeProvider>
            </body>
        </html>
    );
}
