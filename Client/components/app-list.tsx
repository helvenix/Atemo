"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; 
import { format } from 'date-fns';
import { useTasks } from "@/components/task-context";

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
    CardHeader,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
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
  
  

import { CheckCheck, CircleSmall, Clock, PartyPopper, PenLine, Trash2 } from "lucide-react";

type Task = {
    _id: string;
    userID: string;
    title: string;
    notes?: string;
    start: string;
    deadline: string;
    completedStatus?: boolean;
    completionDate?: string;
};

interface CardProps {
    task: Task;
    className?: string;
    style?: React.CSSProperties;
    timeRemaining: string;
    timeRatio: number;
    urgent: boolean;
}

function FocusCard({ task, className, style, timeRemaining, timeRatio, urgent } : CardProps){
    const { removeTask } = useTasks()
    const handleDelete = async (task: Task) => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`, {
                method: "DELETE",
                credentials: 'include'
            });
            if(res.ok){
                removeTask(task._id)
                toast.success("Task has been successfully deleted");
            }else{
                toast.error("An error occurred", {
                    description: "Please try again later.",
                });
            }
        }catch(e){
            toast.error("An error occurred", {
                description: "Please try again later.",
            });
        }
    }

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
                <Clock className="absolute size-3 top-7.5" /> <span className="absolute top-7 left-6 text-[0.6rem]/4">{format(new Date(task.deadline), "MMMM dd, yyyy | HH:mm")}</span>
            </CardDescription>
            <Progress className="absolute h-1 w-48 top-12.5 left-0 rounded-l-none" childClass={urgent ? "bg-destructive" : "bg-affirmative"} value={timeRatio*100} />
            <CardDescription>
                <ScrollArea className="h-12 w-50 pr-1 absolute top-7 text-xs">
                    {task.notes}
                </ScrollArea>
            </CardDescription>
            <CardContent className="absolute right-2 p-0 top-2 bottom-2 flex items-center">
                <span className={cn(
                    "absolute top-0 right-1",
                    (urgent ? "text-destructive" : "text-affirmative")
                )}>{timeRemaining}</span>
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
                            <Dialog>
                                <DialogTrigger>
                                    <Trash2 className="absolute bottom-0 right-0 size-6 p-1 text-muted-foreground hover:text-destructive cursor-pointer"/> 
                                </DialogTrigger>
                                <DialogContent className="w-96 rounded-xs">
                                    <DialogHeader>
                                        <DialogTitle>Delete Task?</DialogTitle>
                                        <DialogDescription>
                                        Are you sure you want to delete {task.title}?<br/> This action cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className="cursor-pointer rounded-xs" type="button" variant="secondary">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button 
                                                className="cursor-pointer rounded-xs" 
                                                type="button" variant="destructive"
                                                onClick={() => handleDelete(task)}
                                            >
                                                Delete
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
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

function MinimalCard({task, className, style, timeRemaining, urgent}: CardProps){
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
                <span className={cn(
                    "absolute top-0 right-1",
                    (urgent ? "text-destructive" : "text-affirmative")
                )}>{timeRemaining}</span>
            </CardContent>
        </Card>
    )
}

interface CarouselProps {
    tasks: Task[];
    hovered: boolean;
    focus: number;
    now: Date;
}

function TasksCarousel({tasks, hovered, focus, now}: CarouselProps){
    if(tasks.length === 0) return <div className="flex m-0 p-0 gap-x-2"><span>no tasks for now</span><PartyPopper className="size-5"/></div>
    if(hovered){
        return(
            <div className="absolute w-full m-0 p-0" style={{top: `calc(50% + ${Math.ceil(tasks.length/2 - 1) - focus} * 2.5rem + ${tasks.length % 2 == 0 ? "1.25rem" : "0rem"})`, transform: "translateY(-50%)"}}>
                {tasks.map((task, index) => {
                    const start = new Date(task.start)
                    const deadline = new Date(task.deadline)
                    const duration = Math.max(deadline.getTime() - start.getTime(), 1)

                    const timeNumberRemaining = Math.max(deadline.getTime() - now.getTime(), 0) 
                    const timeRatio = timeNumberRemaining/duration

                    const seconds = Math.floor((timeNumberRemaining / 1000) % 60);
                    const minutes = Math.floor((timeNumberRemaining / (1000 * 60)) % 60);
                    const hours = Math.floor(timeNumberRemaining / (1000 * 60 * 60));

                    const formattedHours = String(hours).padStart(3, '0');
                    const formattedMinutes = String(minutes).padStart(2, '0');
                    const formattedSeconds = String(seconds).padStart(2, '0');

                    const timeStringRemaining = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
                    return index === focus ?
                        <FocusCard 
                            key={task._id} 
                            task={task} 
                            timeRemaining={timeStringRemaining}
                            timeRatio={timeRatio}
                            urgent={(hours < 24 || timeRatio < 0.25) ? true : false}
                        /> 
                        :
                        <MinimalCard 
                            key={task._id} 
                            task={task} 
                            className="opacity-24"
                            timeRemaining={timeStringRemaining}
                            timeRatio={timeRatio}
                            urgent={(hours < 24 || timeRatio < 0.25) ? true : false}
                        />
                })}
            </div>
        )
    }
    return(
        <div className="w-full m-0 p-0">
            {tasks.map((task) => {
                const start = new Date(task.start)
                const deadline = new Date(task.deadline)
                const duration = Math.max(deadline.getTime() - start.getTime(), 1)
                
                const timeNumberRemaining = Math.max(deadline.getTime() - now.getTime(), 0) 
                const timeRatio = timeNumberRemaining/duration

                const seconds = Math.floor((timeNumberRemaining / 1000) % 60);
                const minutes = Math.floor((timeNumberRemaining / (1000 * 60)) % 60);
                const hours = Math.floor(timeNumberRemaining / (1000 * 60 * 60));

                const formattedHours = String(hours).padStart(3, '0');
                const formattedMinutes = String(minutes).padStart(2, '0');
                const formattedSeconds = String(seconds).padStart(2, '0');

                const timeStringRemaining = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

                return (
                    <MinimalCard 
                        key={task._id} 
                        task={task} 
                        timeRemaining={timeStringRemaining} 
                        timeRatio={timeRatio}
                        urgent={(hours < 24 || timeRatio < 0.25) ? true : false}
                    />
                )
            })}
        </div>
    )
}

export function AppList(){
    const { tasks, setTasks } = useTasks()
    const [shown, setShown] = useState("all")
    const [sizes, setSizes] = useState([24, 24])
    const [hovered, setHovered] = useState(false)
    const [focus, setFocus] = useState(0)
    const [now, setNow] = useState(new Date())

    const fetchTasks = async() => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/`, {
                method: "GET",
                credentials: 'include'
            })
            const data = await res.json();
            if(res.ok){
                setTasks(data)
            }else{
                setTasks([])
            }
        } catch(e){
            toast.error("An error occurred", {
                description: "Task can't be fetched.",
            });
        }
    }

    useEffect(() => {
        fetchTasks()

        const countdownInterval = setInterval(() => {
            setNow(new Date())
        }, 1000)

        return () => clearInterval(countdownInterval);
    }, [])

    useEffect(() => {
        if(tasks.length > 0){
            setFocus(Math.ceil(tasks.length/2 - 1))
        }else{
            setFocus(0)
        }
    }, [tasks])

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
                        <TasksCarousel tasks={tasks} hovered={hovered} focus={focus} now={now} />
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