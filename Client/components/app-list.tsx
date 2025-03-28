"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; 

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
    SidebarSeparator,
} from "@/components/ui/sidebar"
import {
    ToggleGroup,
    ToggleGroupItem
} from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import { CircleSmall } from "lucide-react";

export function AppList(){
    const [shown, setShown] = useState("all")

    const handleShown = (value: string) => {
        if(shown === value) value = "all";
        setShown(value);
    }

    return (
        <Sidebar side="right" >
            <SidebarHeader className="bg-background h-24"> 
                <SidebarMenu>
                    <SidebarMenuItem className="flex w-full justify-center">
                        <div className="flex gap-0 absolute top-5">
                            <Button
                                variant="filter"
                                onClick={() => handleShown("tasks")}
                                className={cn(
                                    "w-24 rounded-r-none",
                                    (shown === "tasks" || shown === "all") ? "border-affirmative" : ""
                                )}
                            >
                                Tasks
                            </Button>
                            <Button
                                variant="filter"
                                onClick={() => handleShown("all")}
                                className={cn(
                                    "w-8 rounded-none",
                                    (shown === "all") ? "border-affirmative" : ""
                                )}
                            >
                                <CircleSmall />
                            </Button>
                            <Button
                                variant="filter"
                                onClick={() => handleShown("events")}
                                className={cn(
                                    "w-24 rounded-l-none",
                                    (shown === "events" || shown === "all") ? "border-affirmative" : ""
                                )}
                            >
                                events
                            </Button>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent className="bg-background">
                <ResizablePanelGroup
                    direction="vertical"
                    className="h-full w-full"
                >
                    <ResizablePanel defaultSize={50} minSize={20} className="flex items-center justify-center">
                        Tasks
                    </ResizablePanel>
                    <ResizableHandle withHandle/>
                    <ResizablePanel defaultSize={50} minSize={20} className="flex items-center justify-center">
                        Events
                    </ResizablePanel>
                </ResizablePanelGroup>
            </SidebarContent>
        </Sidebar>
    )
}