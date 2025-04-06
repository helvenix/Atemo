import type { Metadata } from "next";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider"

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
                    <main className="w-full">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
