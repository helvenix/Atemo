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

interface Task {
    _id: string;
    id: number;
    title: string;
    start: string;
    deadline: string;
    notes: string;
    completed: boolean;
    createdAt: string;
    __v: number;
    completionDate: string;
}

const tasks: Task[] = [
    {
        _id: "67d64029adcc1811c223d988",
        id: 26,
        title: "Lab 2 DDAK",
        start: "2025-03-14T17:00:00.000Z",
        deadline: "2025-03-18T16:55:00.000Z",
        notes: "",
        completed: true,
        createdAt: "2025-03-16T03:06:17.570Z",
        __v: 0,
        completionDate: "2025-03-18T10:38:52.784Z"
    },
    {
        _id: "67d64029adcc1811c2be3988",
        id: 27,
        title: "Lab 3 DDAK",
        start: "2025-03-14T17:00:00.000Z",
        deadline: "2025-03-18T16:55:00.000Z",
        notes: "",
        completed: true,
        createdAt: "2025-03-16T03:06:17.570Z",
        __v: 0,
        completionDate: "2025-03-18T10:38:52.784Z"
    },
    {
        _id: "67d64090adcc1811c2be398b",
        id: 28,
        title: "Worksheet 07 MatDis 2",
        start: "2025-03-15T14:20:00.000Z",
        deadline: "2025-03-20T14:20:00.000Z",
        notes: "",
        completed: true,
        createdAt: "2025-03-16T03:08:00.165Z",
        __v: 0,
        completionDate: "2025-03-19T17:58:59.959Z"
    },
    {
        _id: "67d64141adcc1811c2be398e",
        id: 29,
        title: "Tugas Individu 2 PPSI",
        start: "2025-03-14T04:25:00.000Z",
        deadline: "2025-03-25T16:55:00.000Z",
        notes: "",
        completed: true,
        createdAt: "2025-03-16T03:10:57.800Z",
        __v: 0,
        completionDate: "2025-03-25T12:05:28.276Z"
    },
    {
        _id: "67e29c90cdadda589c449e31",
        id: 30,
        title: "Worksheet 8 MatDis 2",
        start: "2025-03-22T03:01:00.000Z",
        deadline: "2025-03-26T14:30:00.000Z",
        notes: "",
        completed: true,
        createdAt: "2025-03-25T12:07:44.733Z",
        __v: 0,
        completionDate: "2025-03-26T13:46:19.363Z"
    }
]

interface CardProps {
    task: Task;
    className?: string;
    style?: React.CSSProperties;
}

function FocusCard({ task, className, style } : CardProps){
    return (
        <Card className={cn(
            className,
            "relative h-30 p-2 shadow-xs bg-background w-full border-l-0 border-r-0 border-primary rounded-none"
        )}
            style={style}
        >
            <CardHeader className="w-full text-sm absolute p-0">
                {task.title}
            </CardHeader>
            <CardDescription>
                <Clock className="absolute size-3 top-7.5" /> <span className="absolute top-7 left-6 text-[0.6rem]/4">March 30, 2025 | 23:59</span>
            </CardDescription>
            <Progress className="absolute h-1 w-48 top-12.5 left-0 rounded-l-none" value={24} />
            <CardDescription>
                <ScrollArea className="h-12 w-50 pr-1 absolute top-7 text-xs">
                    It's completed at {task.completionDate}, which start at {task.start} and end at {task.deadline}
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

function MinimalCard({task, className, style}: CardProps){
    return (
        <Card className={cn(
            className,
            "relative h-10 p-2 shadow-xs bg-background w-full border-r-0 border-l-0 rounded-none"
        )}
            style={style}
        >
            <CardHeader className="w-full text-sm absolute p-0">
                {task.title}
            </CardHeader>
            <CardContent className="absolute right-2 p-0 top-2 bottom-2 flex items-center">
                <span className="absolute top-0 right-1 text-affirmative">024:23:40</span>
            </CardContent>
        </Card>
    )
}

interface CarouselProps {
    tasks: Task[];
    hovered: boolean;
    focus: number;
}

function TasksCarousel({tasks, hovered, focus}: CarouselProps){
    if(hovered){
        return(
            <div className="absolute w-full m-0 p-0" style={{top: `calc(50% + ${Math.ceil(tasks.length/2 - 1) - focus} * 2.5rem)`, transform: "translateY(-50%)"}}>
                {tasks.map((task, index) =>
                    index === focus ?
                        <FocusCard 
                            key={task._id} 
                            task={task} 
                        /> 
                        :
                        <MinimalCard 
                            key={task._id} 
                            task={task} 
                            className="opacity-24"
                        />
                )}
            </div>
        )
    }
    return(
        <div className="w-full m-0 p-0">
            {tasks.map((task) => {
                return (
                    <MinimalCard key={task._id} task={task}/>
                )
            })}
        </div>
    )
}

export function AppList(){
    const [shown, setShown] = useState("all")
    const [sizes, setSizes] = useState([24, 24])
    const [hovered, setHovered] = useState(false)
    const [focus, setFocus] = useState(Math.ceil(tasks.length/2 - 1))

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
                    <ResizablePanel 
                        defaultSize={50} 
                        minSize={sizes[0]} 
                        className={cn("relative flex items-center justify-center", (shown === "all" || shown === "tasks") ? "" : "hidden")}
                        onMouseOver={()=> {
                            setHovered(true)
                        }}
                        onMouseLeave={()=> {
                            setHovered(false)
                            setFocus(Math.ceil(tasks.length/2 - 1))
                        }}
                        onWheel={(e) => {
                            setFocus(Math.min(Math.max(0, focus + Math.round(e.deltaY * 0.006)), tasks.length -1))
                        }}
                    >
                        <TasksCarousel tasks={tasks} hovered={hovered} focus={focus} />
                    </ResizablePanel>
                    <ResizableHandle 
                        withHandle 
                        onDoubleClick={() => {
                            setSizes([50,50])
                            setTimeout(() => {setSizes([24,24])}, 1)
                        }}
                        className={`${shown === "all" ? "" : "hidden"} p-0.5`} 
                    />
                    <ResizablePanel defaultSize={50} minSize={sizes[1]} className={cn("flex items-center justify-center", (shown === "all" || shown === "events") ? "" : "hidden")}>
                        {"Events Panel (TBA)"}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </SidebarContent>
        </Sidebar>
    )
}