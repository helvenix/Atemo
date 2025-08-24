import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupAction,
    SidebarMenuAction,
    SidebarMenuBadge,
} from "@/components/ui/sidebar"
import {ScrollArea} from '@/components/ui/scroll-area'
import Link from "next/link";
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"  

import {
    User, 
    Plus,
    House,
    Bell,
    ChevronDown,
    CirclePlus,
    Users,
    UserPlus,
    MoreHorizontal,
    Scroll,
    Calendar,
} from "lucide-react"

function GroupMenuItem({imageUrl, name} : {imageUrl: string; name: string}){
    return (
        <SidebarMenuItem>
            <SidebarMenuButton size="lg">
                <Avatar >
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback><Users className="size-4"/></AvatarFallback>
                </Avatar>
                <span>{name}</span>
            </SidebarMenuButton>

            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer mt-1 mr-3">
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
    )
}

function FriendMenuItem({imageUrl, name}: {imageUrl: string; name: string}){
    return (
        <SidebarMenuItem>
            <SidebarMenuButton size="lg">
                <Avatar >
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback><User className="size-4"/></AvatarFallback>
                </Avatar>
                <span>{name}</span>
            </SidebarMenuButton>

            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer mt-1 mr-3">
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
    )
}

export function Content(){
    return (
        <SidebarContent>
            <ScrollArea className="h-full">
                {/* Main Menu */}
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
                                <SidebarMenuBadge className="mr-3 text-primary bg-primary/10">24</SidebarMenuBadge>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Calendar /> <span>Calendar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Scroll /> <span>Logs</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Groups Menu */}
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
                                    <GroupMenuItem imageUrl="" name="Group 1"/>
                                    <GroupMenuItem imageUrl="" name="Group 2"/>
                                    <GroupMenuItem imageUrl="" name="Group 3"/>
                                    <GroupMenuItem imageUrl="" name="Group 4"/>
                                    
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="text-primary hover:text-primary pl-6 gap-x-4 cursor-pointer">
                                            <CirclePlus /> <span>Add Group</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>

                {/* Friends Menu */}
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
                                    <FriendMenuItem imageUrl="" name="Friend 1"/>
                                    <FriendMenuItem imageUrl="" name="Friend 2"/>
                                    <FriendMenuItem imageUrl="" name="Friend 3"/>
                                    <FriendMenuItem imageUrl="" name="Friend 4"/>
                                    <FriendMenuItem imageUrl="" name="Friend 5"/>
                                    <FriendMenuItem imageUrl="" name="Friend 6"/>
                                    <FriendMenuItem imageUrl="" name="Friend 7"/>
                                    <FriendMenuItem imageUrl="" name="Friend 8"/>
                                    <FriendMenuItem imageUrl="" name="Friend 9"/>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="text-primary hover:text-primary pl-6 gap-x-4 cursor-pointer">
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
    )
}