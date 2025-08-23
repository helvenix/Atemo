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

import { ControlPanel } from "./list/control-panel";
import { TaskSection } from "./list/task-section";
import { EventSection } from "./list/event-section";

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

    return (
        <Sidebar side="right">
            <ControlPanel shown={shown} setShown={setShown} />

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