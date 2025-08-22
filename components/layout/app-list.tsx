"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; 
import axios from "axios";

import { useTasks } from "../provider/task-context";
import { useEvents } from "../provider/event-context";

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
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { toast } from "sonner";

import { TaskSection } from "./list/task-section";
import { EventSection } from "./list/event-section";

import { CircleSmall } from "lucide-react";

export function AppList(){
    const { setTasks } = useTasks()
    const { setEvents } = useEvents()
    const [now, setNow] = useState(new Date())
    const [sizes, setSizes] = useState([24, 24])
    const [shown, setShown] = useState("all")

    const fetchTasks = async() => {
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/`,
                { withCredentials: true }
            )
            setTasks(res.data)
        } catch(e: any){
            toast.error("An error occurred", {
                description: e?.response?.data?.message || "Task can't be fetched.",
            });
        }
    }

    const fetchEvents = async() => {
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/`,
                { withCredentials: true }
            )
            setEvents(res.data)
        } catch(e: any){
            toast.error("An error occurred", {
                description: e?.response?.data?.message || "Event can't be fetched.",
            });
        }
    }

    useEffect(() => {
        fetchTasks()
        fetchEvents()

        const countdownInterval = setInterval(() => {
            setNow(new Date())
        }, 1000)

        return () => clearInterval(countdownInterval);
    }, [])

    const handleShown = (value: string) => {
        if(shown === value) value = "all";
        setShown(value);
    }

    return (
        <Sidebar side="right">
            <SidebarHeader className="bg-background h-24">
                <SidebarMenu>
                    <SidebarMenuItem className="flex w-full justify-center">
                        <div className="flex gap-0 absolute top-5">
                            <Button
                                variant="filter"
                                onClick={() => handleShown("tasks")}
                                className={cn(
                                    "w-24 rounded-r-none",
                                    (shown === "tasks" || shown === "all") ? "border-accent" : ""
                                )}
                            >
                                tasks
                            </Button>
                            <Button
                                variant="filter"
                                onClick={() => handleShown("all")}
                                className={cn(
                                    "w-8 rounded-none border-l-0 border-r-0",
                                    (shown === "all") ? "border-accent" : ""
                                )}
                            >
                                <CircleSmall />
                            </Button>
                            <Button
                                variant="filter"
                                onClick={() => handleShown("events")}
                                className={cn(
                                    "w-24 rounded-l-none",
                                    (shown === "events" || shown === "all") ? "border-accent" : ""
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
                <ResizablePanelGroup direction="vertical" className="h-full w-full">
                    <TaskSection 
                        now={now}
                        size={sizes[0]}
                        shown={shown}
                    />

                    <ResizableHandle 
                        withHandle 
                        onDoubleClick={() => {
                            setSizes([50,50])
                            setTimeout(() => {setSizes([24,24])}, 1)
                        }}
                        className={`${shown === "all" ? "" : "hidden"} p-0.4 bg-sidebar-border`} 
                    />

                    <EventSection 
                        now={now}
                        size={sizes[1]}
                        shown={shown}
                    />
                </ResizablePanelGroup>
            </SidebarContent>
        </Sidebar>
    )
}