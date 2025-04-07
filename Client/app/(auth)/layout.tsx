import React from "react";

import "../globals.css";

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <main className="w-screen h-screen">
            {children}
        </main>
    );
}
