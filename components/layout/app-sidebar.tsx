import {
    Sidebar,
} from "@/components/ui/sidebar"

import { Header } from "@/components/layout/sidebar/sidebar-header"
import { Content } from "@/components/layout/sidebar/sidebar-content";
import { Footer } from "@/components/layout/sidebar/sidebar-footer"

export function AppSidebar(){
    return (
        <Sidebar>
            <Header />
            <Content />
            <Footer />
        </Sidebar>
    )
}