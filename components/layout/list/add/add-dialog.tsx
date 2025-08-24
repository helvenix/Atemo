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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { AddTask } from './add-task'
import { AddEvent } from "./add-event"
import { useState } from "react"

import { ChevronRight } from "lucide-react"

export function AddDialog({setDialog} : {setDialog: React.Dispatch<React.SetStateAction<boolean>>}){
    const [object, setObject] = useState<"Task" | "Event">("Task")

    return (
        <DialogContent className="rounded-xs p-8 w-screen">
            <DialogHeader>
                <DialogTitle className="flex justify-center">
                    Add
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="cursor-pointer flex translate-x-1 border-transparent hover:border-primary border-b-2 box-content px-1 data-[state=open]:border-primary">
                                <span>{object}</span>
                                <ChevronRight className="translate-x-1 size-4"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right">
                            <DropdownMenuItem onClick={() => setObject("Task")}>Task</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setObject("Event")}>Event</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </DialogTitle>
            </DialogHeader>

            { object === "Task" && (
                <AddTask setDialog={setDialog}/>
            )}
            { object === "Event" && (
                <AddEvent setDialog={setDialog}/>
            )}
        </DialogContent>
    )
}