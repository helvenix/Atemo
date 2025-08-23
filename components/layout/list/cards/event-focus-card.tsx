"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { format } from 'date-fns';
import axios from 'axios';

import { useEvents } from "@/components/provider/event-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/others/time-picker";
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { 
    RadioGroup, 
    RadioGroupItem 
} from "@/components/ui/radio-group"

import { Event, FocusCardProps, eventSchema } from "../type";

import { 
    Calendar as CalendarIcon, 
    Clock, 
    EyeOff, 
    PenLine, 
    Trash2 
} from "lucide-react";


function Timer({ urgent, timeRemaining } : Pick<FocusCardProps<Event>, "urgent" | "timeRemaining">){
    return (
        <span className={cn(
            "absolute top-0 right-1 font-[RobotoMono]",
            (urgent ? "text-destructive" : "text-affirmative")
        )}>
            {timeRemaining}
        </span>
    )
}

function EditHandler({ item, setHovered } : Pick<FocusCardProps<Event>, "item" | "setHovered">){
    const { updateEvent } = useEvents()
    const [ popoverSide, setPopoverSide ] = useState<"top" | "right">("right")
    
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 944){
                setPopoverSide("top");
            }else{
                setPopoverSide("right")
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [setPopoverSide])

    type EventFormValues = z.infer<typeof eventSchema>;

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            _id: item._id,
            title: item.title,
            notes: item.notes,
            start: new Date(item.start),
            end: item.end ? new Date(item.end) : undefined,
            recurrenceRule: item.recurrenceRule
        },
    });

    const handleEdit = async (event: EventFormValues) => {
        try{
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/events/${event._id}`,
                event,
                { withCredentials: true }
            )
            updateEvent(res.data.event)
            toast.success("Event has been successfully dismissed");
        }catch(e: any){
            toast.error("An error occurred", {
                description: e?.response?.data?.message || "Please try again later.",
            });
        }
    }

    return (
        <TooltipProvider delayDuration={12000}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Dialog>
                        <DialogTrigger>
                            <PenLine className="absolute bottom-0 right-8 size-6 p-1 text-muted-foreground hover:text-affirmative cursor-pointer"/> 
                        </DialogTrigger>
                        <DialogContent className="rounded-xs p-8 w-104" onCloseAutoFocus={() => setHovered(false)}>
                            <DialogHeader>
                                <DialogTitle>Edit Event</DialogTitle>
                            </DialogHeader>
                            <div className="w-88 rounded-xs">
                                <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>
                                                <Input className="h-12 border-0 border-b-2 focus-visible:border-affirmative focus-visible:ring-0 rounded-xs" placeholder="title" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-destructive"/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>
                                                <Textarea className="h-24 border-0 border-b-2 focus-visible:border-affirmative focus-visible:ring-0 rounded-xs max-h-48" placeholder="notes (optional)" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-destructive"/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="recurrenceRule"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col space-y-2">
                                            <FormLabel className="text-left w-full">Recurrence</FormLabel>
                                            <FormControl className="w-full flex justify-center">
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex space-x-2"
                                                >
                                                <FormItem className="flex items-center">
                                                    <FormControl>
                                                    <RadioGroupItem value="once" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal pl-1 cursor-pointer">once</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center">
                                                    <FormControl>
                                                    <RadioGroupItem value="daily" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal pl-1 cursor-pointer">daily</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center">
                                                    <FormControl>
                                                    <RadioGroupItem value="weekly" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal pl-1 cursor-pointer">weekly</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center">
                                                    <FormControl>
                                                    <RadioGroupItem value="monthly" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal pl-1 cursor-pointer">monthly</FormLabel>
                                                </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="start"
                                        render={({ field }) => (
                                            <FormItem className="flex">
                                            <FormLabel className="text-left w-18 cursor-pointer">start</FormLabel>
                                            <Popover>
                                                <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-70 justify-start text-left font-normal rounded-xs cursor-pointer",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "PPP HH:mm:ss")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                </FormControl>
                                                <PopoverContent className="w-70 p-auto rounded-xs" side={popoverSide}>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    autoFocus
                                                />
                                                <div className="p-3 border-t border-border">
                                                    <TimePicker
                                                        setDate={field.onChange}
                                                        date={field.value}
                                                    />
                                                </div>
                                                </PopoverContent>
                                            </Popover>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="end"
                                        render={({ field }) => (
                                            <FormItem className="flex">
                                            <FormLabel className="text-left w-18 cursor-pointer">end</FormLabel>
                                            <Popover>
                                                <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-70 justify-start text-left font-normal rounded-xs cursor-pointer",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "PPP HH:mm:ss")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                </FormControl>
                                                <PopoverContent className="w-70 p-auto rounded-xs" side={window.innerWidth < 976 ? "top" : "right"}>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    autoFocus
                                                />
                                                <div className="p-3 border-t border-border">
                                                    <TimePicker
                                                        setDate={field.onChange}
                                                        date={field.value}
                                                    />
                                                </div>
                                                </PopoverContent>
                                            </Popover>
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className="cursor-pointer rounded-xs" type="button" variant="secondary">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button 
                                                className="cursor-pointer rounded-xs w-18" 
                                                type="submit" variant="default"
                                            >
                                                Save
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                                </Form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </TooltipTrigger>
                <TooltipContent side="left"><span>edit</span></TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function DismissHandler({ item, urgent, setHovered }: Pick<FocusCardProps<Event>, "item" | "urgent" | "setHovered">){
    const { updateEvent } = useEvents()

    const handleDismiss = async (event: Event) => {
        try{
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/events/${event._id}/dismiss`,
                { withCredentials: true }
            )
            updateEvent(res.data.event);
            toast.success("Event has been successfully dismissed");
        }catch(e: any){
            toast.error("An error occurred", {
                description: e?.response?.data?.message || "Please try again later.",
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CardContent className={cn(
                    "absolute duration-240 cursor-pointer p-0 top-8 bottom-10 -right-2 w-18 h-10 border border-r-0 rounded-full rounded-r-none flex items-center justify-center",
                    urgent ? "hover:bg-destructive border-destructive/36" : "hover:bg-accent border-accent/36"
                )}>
                    <EyeOff className="size-4" />
                </CardContent>
            </DialogTrigger>
            <DialogContent className="rounded-xs p-8 w-104 space-y-2" onCloseAutoFocus={() => setHovered(false)}>
                <DialogHeader>
                    <DialogTitle>Dismiss event?</DialogTitle>
                    <DialogDescription></DialogDescription>
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
                            type="button" variant="default"
                            onClick={() => handleDismiss(item)}
                        >
                            Dismiss event
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function DeleteHandler({ item, setHovered } : Pick<FocusCardProps<Event>, "item" | "setHovered">){
    const { removeEvent } = useEvents()

    const handleDelete = async (event: Event) => {
        try{
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/events/${event._id}`,
                { withCredentials: true }
            )
            removeEvent(event._id)
            toast.success("Event has been successfully deleted");
        }catch(e: any){
            toast.error("An error occurred", {
                description: e?.response?.data?.message || "Please try again later.",
            });
        }
    }

    return (
        <TooltipProvider delayDuration={12000}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Dialog>
                        <DialogTrigger>
                            <Trash2 className="absolute bottom-0 right-0 size-6 p-1 text-muted-foreground hover:text-destructive cursor-pointer"/> 
                        </DialogTrigger>
                        <DialogContent className="w-96 rounded-xs" onCloseAutoFocus={() => setHovered(false)}>
                            <DialogHeader>
                                <DialogTitle>Delete Event?</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete {item.title}?<br/>This action cannot be undone.
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
                                        onClick={() => handleDelete(item)}
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
    )
}

export function EventFocusCard({item, timeRemaining, timeRatio, urgent, setHovered} : FocusCardProps<Event>){
    return (
        <Card className="relative h-30 p-2 shadow-xs bg-background w-full border-l-0 border-r-0 border-primary rounded-none">
            <CardHeader className="w-full text-sm absolute p-0">
                <span className="w-42 truncate">{item.title}</span>
            </CardHeader>
            <CardDescription>
                <Clock className="absolute size-3 top-7.5" /> <span className="absolute top-7 left-6 text-[0.6rem]/4">{format(new Date(item.start), "MMMM dd | HH:mm")} {item.end ? format(new Date(item.end), "- MMMM dd | HH:mm") : ""} </span>
            </CardDescription>
            <Progress className="absolute h-1 w-48 top-12.5 left-0 rounded-l-none" childClass={urgent ? "bg-destructive" : "bg-affirmative"} value={timeRatio*100} />
            <CardDescription>
                <ScrollArea className="h-12 w-50 pr-1 absolute top-7 text-xs">
                    {item.notes}
                </ScrollArea>
            </CardDescription>
            <CardContent className="absolute right-2 p-0 top-2 bottom-2 flex items-center">
                <Timer urgent={urgent} timeRemaining={timeRemaining} />
                <EditHandler item={item} setHovered={setHovered} />
                <DeleteHandler item={item} setHovered={setHovered} />
                <DismissHandler item={item} urgent={urgent} setHovered={setHovered}/>
            </CardContent>
        </Card>
    )
}