"use client"
import * as React from "react"
import { useTheme } from "next-themes"

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter
} from "@/components/ui/sidebar"
import Link from "next/link"
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "./ui/dropdown-menu"
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"


import {
    User, 
    ChevronsUpDown,
    LogOut,
    MessageSquareWarning,
    SunMoon,
    Check
} from "lucide-react"

  export function AppSidebar() {
    const {theme, setTheme} = useTheme()

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="mt-3">
                        <Link href="/" className="text-2xl w-full ml-3 cursor-pointer">Atemo</Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="h-12 relative cursor-pointer">
                                    <Avatar className="absolute top-2 left-3 rounded-md">
                                        <AvatarImage src="other/0088.jpg" />
                                        <AvatarFallback>H</AvatarFallback>
                                    </Avatar>
                                    <h1 className="absolute text-xl top-1 left-15">Helven</h1>
                                    <h2 className="absolute text-xs top-6.5 left-15">helvenmarcia@gmail.com</h2>
                                    <ChevronsUpDown className="absolute right-3"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" className="w-60">
                                <DropdownMenuLabel className="relative h-12">
                                    <Avatar className="absolute top-2 left-3">
                                        <AvatarImage src="other/0088.jpg" />
                                        <AvatarFallback>H</AvatarFallback>
                                    </Avatar>
                                    <h1 className="absolute text-xl top-1 left-15">Helven</h1>
                                    <h2 className="absolute text-xs top-6.5 left-15">helvenmarcia@gmail.com</h2>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User />
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none">
                                        <SunMoon className="text-muted-foreground size-4"/>
                                        <span>Appearance</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                                Light
                                                {theme === "light" && (
                                                    <Check className="absolute right-2"/>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                Dark
                                                {theme === "dark" && (
                                                    <Check className="absolute right-2"/>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                                System
                                                {theme === "system" && (
                                                    <Check className="absolute right-2"/>
                                                )}
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem>
                                    <MessageSquareWarning />
                                    <span>Send Feedback</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
  }
  