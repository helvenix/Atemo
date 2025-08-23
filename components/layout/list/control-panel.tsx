"use client"
import { useState } from "react";
import { cn } from "@/lib/utils"; 

import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { AddDialog } from "./add/add-dialog";

import { CircleSmall, FilePlus2 } from "lucide-react";

export function ControlPanel({shown, setShown}: { shown: string; setShown: React.Dispatch<React.SetStateAction<string>>}){
    const [dialog, setDialog] = useState(false)

    const handleShown = (value: string) => {
        if(shown === value) value = "all";
        setShown(value);
    }

    return(
        <SidebarHeader className="bg-background h-24">
            <SidebarMenu>
                <SidebarMenuItem className="flex w-full justify-center">
                    <div className="flex gap-0 absolute top-2">
                        <Button
                            variant="filter"
                            onClick={() => handleShown("tasks")}
                            className={cn(
                                "w-24 rounded-r-none border-b-0",
                                (shown === "tasks" || shown === "all") ? "border-accent" : ""
                            )}
                        >
                            tasks
                        </Button>
                        <Button
                            variant="filter"
                            onClick={() => handleShown("all")}
                            className={cn(
                                "w-8 rounded-none border-l-0 border-r-0 border-b-0",
                                (shown === "all") ? "border-accent" : ""
                            )}
                        >
                            <CircleSmall />
                        </Button>
                        <Button
                            variant="filter"
                            onClick={() => handleShown("events")}
                            className={cn(
                                "w-24 rounded-l-none border-b-0",
                                (shown === "events" || shown === "all") ? "border-accent" : ""
                            )}
                        >
                            events
                        </Button>
                    </div>
                    <Dialog open={dialog} onOpenChange={setDialog}>
                        <DialogTrigger asChild>
                            <Button
                                variant='filter'
                                className="flex gap-0 w-56 absolute top-11 border-accent h-6"
                            >
                                <FilePlus2 />
                            </Button>
                        </DialogTrigger>
                        <AddDialog setDialog={setDialog} />
                    </Dialog>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )

}