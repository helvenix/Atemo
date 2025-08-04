import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

export function Header(){
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem className="mt-3">
                    <Link href="/" className="text-2xl w-full ml-3 cursor-pointer">Atemo</Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}