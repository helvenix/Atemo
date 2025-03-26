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
    SidebarFooter,
    SidebarGroupAction,
    SidebarMenuAction,
    SidebarMenuBadge,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {ScrollArea} from '@/components/ui/scroll-area'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"  


import {
    User, 
    ChevronsUpDown,
    LogOut,
    MessageSquareWarning,
    SunMoon,
    Check,
    Plus,
    House,
    Calendar,
    Bell,
    ChevronDown,
    ClockAlert,
    ClockArrowUp,
    Clock,
    CirclePlus,
    CircleCheck,
    Users,
    UserPlus,
    CalendarDays,
    Calendar1,
    CalendarSync,
    MoreVertical,
    MoreHorizontal
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
            <SidebarContent>
                <ScrollArea className="h-full">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/">
                                            <House /> <span>Home</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/notifications">
                                            <Bell /> <span>Notifications</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <SidebarMenuBadge className="mr-1 text-affirmative bg-affirmative/10">24</SidebarMenuBadge>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/">
                                            <CalendarDays /> <span>Calendar</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild className="cursor-pointer">
                                <CollapsibleTrigger>
                                    My Tasks
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"></ChevronDown>
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <SidebarGroupAction className="mr-8">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild className="cursor-pointer w-full h-full flex items-center justify-center">
                                            <Plus className="size-4"/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span>Add Task</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </SidebarGroupAction>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Clock /> <span>All Tasks</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <ClockAlert /> <span>Today</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <ClockArrowUp /> <span>Upcoming</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <CircleCheck /> <span>Completed</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="text-affirmative hover:text-affirmative">
                                                <CirclePlus /> <span>Add Task</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild className="cursor-pointer">
                                <CollapsibleTrigger>
                                    My Events
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"></ChevronDown>
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <SidebarGroupAction className="mr-8">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild className="cursor-pointer w-full h-full flex items-center justify-center">
                                            <Plus className="size-4"/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span>Add Event</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </SidebarGroupAction>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Calendar /> <span>All Events</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Calendar1 /> <span>One-Time</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <CalendarSync /> <span>Recurring</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="text-affirmative hover:text-affirmative">
                                                <CirclePlus /> <span>Add Event</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild className="cursor-pointer">
                                <CollapsibleTrigger>
                                    Groups
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"></ChevronDown>
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <SidebarGroupAction className="mr-8">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild className="cursor-pointer w-full h-full flex items-center justify-center">
                                            <Plus className="size-4"/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span>Add Group</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </SidebarGroupAction>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton size="lg">
                                                <Avatar >
                                                    <AvatarImage src={undefined} />
                                                    <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                </Avatar>
                                                <span>Group 1</span>
                                            </SidebarMenuButton>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="cursor-pointer mt-1 mr-1">
                                                    <SidebarMenuAction>
                                                        <MoreHorizontal/>
                                                    </SidebarMenuAction>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="right" className="p-2">
                                                    <DropdownMenuItem>
                                                        <span>View Group Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <span>Group Settings</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <span>Leave Group</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem variant="destructive">
                                                        <span>Delete Group</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton size="lg">
                                                <Avatar >
                                                    <AvatarImage src="other/0137.jpg" />
                                                    <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                </Avatar>
                                                <span>Group 2</span>
                                            </SidebarMenuButton>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="cursor-pointer mt-1 mr-1">
                                                    <SidebarMenuAction>
                                                        <MoreHorizontal/>
                                                    </SidebarMenuAction>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="right" className="p-2">
                                                    <DropdownMenuItem>
                                                        <span>View Group Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <span>Group Settings</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <span>Leave Group</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem variant="destructive">
                                                        <span>Delete Group</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="text-affirmative hover:text-affirmative">
                                                <CirclePlus /> <span>Add Group</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild className="cursor-pointer">
                                <CollapsibleTrigger>
                                    Friends
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"></ChevronDown>
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <SidebarGroupAction className="mr-8">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild className="cursor-pointer w-full h-full flex items-center justify-center">
                                            <Plus className="size-4"/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span>Add Friend</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </SidebarGroupAction>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton size="lg">
                                                <Avatar >
                                                    <AvatarImage src="other/0131.png" />
                                                    <AvatarFallback><User className="size-4"/></AvatarFallback>
                                                </Avatar>
                                                <span>Friend 1</span>
                                            </SidebarMenuButton>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="cursor-pointer mt-1 mr-1">
                                                    <SidebarMenuAction>
                                                        <MoreHorizontal/>
                                                    </SidebarMenuAction>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="right" className="p-2">
                                                    <DropdownMenuItem>
                                                        <span>View Profile</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSub>
                                                        <DropdownMenuSubTrigger className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none">
                                                            <span>Invite to Group</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
                                                                <DropdownMenuItem>
                                                                    <Avatar >
                                                                        <AvatarImage src={undefined} />
                                                                        <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                                    </Avatar>
                                                                    <span>Group 1</span>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Avatar >
                                                                        <AvatarImage src="other/0137.jpg" />
                                                                        <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                                    </Avatar>
                                                                    <span>Group 2</span>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <span>Remove Friend</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton size="lg">
                                                <Avatar >
                                                    <AvatarImage src="other/0008.png" />
                                                    <AvatarFallback><User className="size-4"/></AvatarFallback>
                                                </Avatar>
                                                <span>Friend 2</span>
                                            </SidebarMenuButton>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="cursor-pointer mt-1 mr-1">
                                                    <SidebarMenuAction>
                                                        <MoreHorizontal/>
                                                    </SidebarMenuAction>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="right" className="p-2">
                                                    <DropdownMenuItem>
                                                        <span>View Profile</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSub>
                                                        <DropdownMenuSubTrigger className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none">
                                                            <span>Invite to Group</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
                                                                <DropdownMenuItem>
                                                                    <Avatar >
                                                                        <AvatarImage src={undefined} />
                                                                        <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                                    </Avatar>
                                                                    <span>Group 1</span>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Avatar >
                                                                        <AvatarImage src="other/0137.jpg" />
                                                                        <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                                    </Avatar>
                                                                    <span>Group 2</span>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <span>Remove Friend</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton size="lg">
                                                <Avatar >
                                                    <AvatarImage src={undefined} />
                                                    <AvatarFallback><User className="size-4"/></AvatarFallback>
                                                </Avatar>
                                                <span>Friend 3</span>
                                            </SidebarMenuButton>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="cursor-pointer mt-1 mr-1">
                                                    <SidebarMenuAction>
                                                        <MoreHorizontal/>
                                                    </SidebarMenuAction>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="right" className="p-2">
                                                    <DropdownMenuItem>
                                                        <span>View Profile</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSub>
                                                        <DropdownMenuSubTrigger className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none">
                                                            <span>Invite to Group</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
                                                                <DropdownMenuItem>
                                                                    <Avatar >
                                                                        <AvatarImage src={undefined} />
                                                                        <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                                    </Avatar>
                                                                    <span>Group 1</span>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Avatar >
                                                                        <AvatarImage src="other/0137.jpg" />
                                                                        <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                                    </Avatar>
                                                                    <span>Group 2</span>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <span>Remove Friend</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton size="lg">
                                                <Avatar >
                                                    <AvatarImage src="other/0135.jpg" />
                                                    <AvatarFallback><User className="size-4"/></AvatarFallback>
                                                </Avatar>
                                                <span>Friend 4</span>
                                            </SidebarMenuButton>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="cursor-pointer mt-1 mr-1">
                                                    <SidebarMenuAction>
                                                        <MoreHorizontal/>
                                                    </SidebarMenuAction>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="right" className="p-2">
                                                    <DropdownMenuItem>
                                                        <span>View Profile</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSub>
                                                        <DropdownMenuSubTrigger className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none">
                                                            <span>Invite to Group</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
                                                                <DropdownMenuItem>
                                                                    <Avatar >
                                                                        <AvatarImage src={undefined} />
                                                                        <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                                    </Avatar>
                                                                    <span>Group 1</span>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Avatar >
                                                                        <AvatarImage src="other/0137.jpg" />
                                                                        <AvatarFallback><Users className="size-4"/></AvatarFallback>
                                                                    </Avatar>
                                                                    <span>Group 2</span>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <span>Remove Friend</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="text-affirmative hover:text-affirmative">
                                                <UserPlus /> <span>Add Friend</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                </ScrollArea>
            </SidebarContent>
            <SidebarFooter className="mb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="h-12 relative cursor-pointer">
                                    <Avatar className="absolute top-2 left-3 rounded-md">
                                        <AvatarImage src="other/0088.jpg" />
                                        <AvatarFallback><User className="size-4"/></AvatarFallback>
                                    </Avatar>
                                    <h1 className="absolute text-lg top-1 left-15">Helven</h1>
                                    <h2 className="absolute text-xs top-6.5 left-15">helvenmarcia@gmail.com</h2>
                                    <ChevronsUpDown className="absolute right-3"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" className="w-60 mb-4">
                                <DropdownMenuLabel className="relative h-12">
                                    <Avatar className="absolute top-2 left-3">
                                        <AvatarImage src="other/0088.jpg" />
                                        <AvatarFallback><User className="size-4"/></AvatarFallback>
                                    </Avatar>
                                    <h1 className="absolute text-lg top-1 left-15">Helven</h1>
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
                                    <LogOut className="text-destructive"/>
                                    <span className="text-destructive">Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}