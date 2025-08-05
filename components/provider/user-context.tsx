"use client"
import React, { createContext, useContext, useState } from "react";

export type User = {
    _id: string;
    uid: number;
    name: string;
    email: string;
    avatarUrl?: string;
}

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) => {
    const [user, setUser] = useState<User | null>(initialUser);
  
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
  
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};