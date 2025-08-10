"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; 

import { SidebarMenuItem } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Plus, Rows2 } from "lucide-react";

export function AppListControls({ shown, setShown }: { shown: string; setShown: React.Dispatch<React.SetStateAction<string>>}){
    
    const handleShown = (value: string) => {
        if(shown === value) value = "all";
        setShown(value);
    }

    return (
        <SidebarMenuItem className="flex w-full justify-center">
            <div className="flex gap-0 absolute top-2">
                {/* Add Task */}
                <TooltipProvider>
                    <Button
                        variant="filter"
                        onClick={() => {}}
                        className={cn(
                            "w-4 border-r-0 cursor-pointer",
                            (shown === "tasks" || shown === "all") ? "border-accent" : "!text-muted-foreground"
                        )}
                    >
                        <Plus className="size-3"/>
                    </Button>
                </TooltipProvider>
                {/* Tasks Toggle */}
                <Button
                    variant="filter"
                    onClick={() => handleShown("tasks")}
                    className={cn(
                        "w-15 rounded-r-none",
                        (shown === "tasks" || shown === "all") ? "border-accent" : "!text-muted-foreground"
                    )}
                >
                    tasks
                </Button>
                {/* Both Toggle */}
                <Button
                    variant="filter"
                    onClick={() => handleShown("all")}
                    className={cn(
                        "w-8 rounded-none border-l-0 border-r-0",
                        (shown === "all") ? "border-accent" : "!text-muted-foreground"
                    )}
                >
                    <Rows2 className="size-4"/>
                </Button>
                {/* Events Toggle */}
                <Button
                    variant="filter"
                    onClick={() => handleShown("events")}
                    className={cn(
                        "w-15 rounded-l-none",
                        (shown === "events" || shown === "all") ? "border-accent" : "!text-muted-foreground"
                    )}
                >
                    events
                </Button>
                {/* Add Event */}
                <Button
                    variant="filter"
                    onClick={() => {}}
                    className={cn(
                        "w-4 border-l-0 cursor-pointer",
                        (shown === "events" || shown === "all") ? "border-accent" : "!text-muted-foreground"
                    )}
                >
                    <Plus className="size-3"/>
                </Button>

            </div>
        </SidebarMenuItem>
    )
}