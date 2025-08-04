"use client"
import { useTheme } from "next-themes"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"
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
} from "@/components/ui/dropdown-menu"
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { toast } from "sonner"

import {
    User, 
    ChevronsUpDown,
    LogOut,
    MessageSquareWarning,
    SunMoon,
    Copy,
    Check
} from "lucide-react"

export function Footer(){
    const { theme, setTheme } = useTheme();

    const handleLogout = async () => {
        // try {
        //     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
        //         method: 'POST',
        //         credentials: 'include'
        //     });
        //     setUser(null);
        //     router.push("/login")
        // } catch(e){
        //     toast.error("An error occurred", {
        //         description: "Please try again later.",
        //     });
        // }
        toast.success("logout");
    }

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="h-12 relative cursor-pointer">
                                <Avatar className="absolute top-2 left-4 rounded-md">
                                    {/* <AvatarImage src={user?.profilePicture} /> */}
                                    <AvatarFallback><User className="size-4"/></AvatarFallback>
                                </Avatar>
                                <h1 className="absolute w-45 text-md top-1 left-16 truncate">{/* user?.name */}Testing</h1>
                                <h2 className="absolute text-xs text-muted-foreground top-6.5 left-16">UID : {/*String(user?.uid).padStart(4, "0")*/}0000</h2>
                                <ChevronsUpDown className="absolute right-5"/>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="right" className="w-60 mb-4">
                            <DropdownMenuLabel className="relative h-12">
                                <Avatar className="absolute top-2 left-3">
                                    {/* <AvatarImage src={user?.profilePicture} /> */}
                                    <AvatarFallback><User className="size-4"/></AvatarFallback>
                                </Avatar>
                                <h1 className="absolute w-42 text-md top-1 left-15 truncate">{/* user?.name */}Testing</h1>
                                <h2 className="absolute text-xs text-muted-foreground top-6.5 left-15">UID : {/*String(user?.uid).padStart(4, "0")*/}0000</h2>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User />
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>{
                                navigator.clipboard.writeText('0000');
                                toast.success("UID successfully copied to clipboard");
                            }}>
                                <Copy />
                                <span>Copy UID</span>
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
                            <DropdownMenuItem onClick={handleLogout} variant="destructive">
                                <LogOut />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}