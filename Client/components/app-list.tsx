"use client"
import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils"; 

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress";
  


import { CheckCheck, CircleSmall, Clock, PenLine, Trash2 } from "lucide-react";

function FocusCard(){
    return (
        <Card className="relative h-30 p-2 shadow-xs bg-background w-full border-l-0 border-r-0 rounded-none">
            <CardHeader className="w-full text-sm absolute p-0">
                Kuis 4 MPKT
            </CardHeader>
            <CardDescription>
                <Clock className="absolute size-3 top-7.5" /> <span className="absolute top-7 left-6 text-[0.6rem]/4">March 30, 2025 | 23:59</span>
            </CardDescription>
            <Progress className="absolute h-1 w-48 top-12.5 left-0 rounded-l-none" value={24} />
            <CardDescription>
                <ScrollArea className="h-12 w-50 pr-1 absolute top-7 text-xs">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit reprehenderit sapiente suscipit ullam magnam animi impedit labore, optio fugit voluptatum id aspernatur quam at. Quisquam eveniet ut hic veritatis culpa cupiditate nisi possimus eum id voluptatum. Temporibus adipisci nesciunt molestiae eius eaque sit at, voluptates et aperiam. Unde, molestiae fuga?
                </ScrollArea>
            </CardDescription>
            <CardContent className="absolute right-2 p-0 top-2 bottom-2 flex items-center">
                <span className="absolute top-0 right-1 text-affirmative">024:23:40</span>
                <TooltipProvider delayDuration={12000}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PenLine className="absolute bottom-0 right-8 size-6 p-1 text-muted-foreground hover:text-affirmative cursor-pointer"/> 
                        </TooltipTrigger>
                        <TooltipContent side="left"><span>edit</span></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={12000}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Trash2 className="absolute bottom-0 right-0 size-6 p-1 text-muted-foreground hover:text-destructive cursor-pointer"/> 
                        </TooltipTrigger>
                        <TooltipContent side="left"><span>delete</span></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardContent>
            <CardContent className="absolute duration-240 cursor-pointer p-0 top-10 bottom-10 right-0 w-18 border border-r-0 rounded-full rounded-r-none hover:bg-affirmative flex items-center justify-center">
                <CheckCheck className="size-4" />
            </CardContent>
        </Card>
    )
}

function MinimalCard(){
    return (
        <Card className="relative h-10 p-2 shadow-xs bg-background w-full border-l-0 border-r-0 rounded-none">
            <CardHeader className="w-full text-sm absolute p-0">
                Kuis 4 MPKT
            </CardHeader>
            <CardContent className="absolute right-2 p-0 top-2 bottom-2 flex items-center">
                <span className="absolute top-0 right-1 text-affirmative">024:23:40</span>
            </CardContent>
        </Card>
    )
}

export function AppList(){
    const [shown, setShown] = useState("all")
    const [sizes, setSizes] = useState([24, 24])
    const [button, setButton] = useState("opened")

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
                                tasks
                            </Button>
                            <Button
                                variant="filter"
                                onClick={() => handleShown("all")}
                                className={cn(
                                    "w-8 rounded-none border-l-0 border-r-0",
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
                    <ResizablePanel defaultSize={50} minSize={sizes[0]} className={cn("flex items-center justify-center", (shown === "all" || shown === "tasks") ? "" : "hidden")}>
                        <MinimalCard />
                        <MinimalCard />
                        <FocusCard />
                        <MinimalCard />
                        <MinimalCard />
                    </ResizablePanel>
                    <ResizableHandle 
                        withHandle 
                        onDoubleClick={() => {
                            setSizes([50,50])
                            setTimeout(() => {setSizes([24,24])}, 1)
                        }}
                        className={`${shown === "all" ? "" : "hidden"}`} 
                    />
                    <ResizablePanel defaultSize={50} minSize={sizes[1]} className={cn("flex items-center justify-center", (shown === "all" || shown === "events") ? "" : "hidden")}>
                        Events
                    </ResizablePanel>
                </ResizablePanelGroup>
            </SidebarContent>
        </Sidebar>
    )
}