"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import { format } from 'date-fns';
import axios from 'axios';

import { useTasks } from "@/components/provider/task-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea"
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

import { createTaskSchema } from "../type";

import { Calendar as CalendarIcon } from "lucide-react";

export function AddTask({setDialog} : {setDialog: React.Dispatch<React.SetStateAction<boolean>>}){
    const { addTask } = useTasks()

    type TaskFormValue = z.infer<typeof createTaskSchema>

    const form = useForm<TaskFormValue>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            notes: ""
        }
    })

    const handleAdd = async (task: TaskFormValue) => {
        try{
            setDialog(false)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks/`, 
                task,
                { withCredentials: true }
            )
            addTask(res.data.task);
            toast.success("Task has been succesfully added");
        }catch(e: any){
            toast.error("An error occurred", {
                description: e?.response?.data?.message || "Please try again later.",
            });
        }
    }

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

    return (
        <div className="flex justify-center">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input className="h-12 border-0 border-b-2 focus-visible:border-primary focus-visible:ring-0 rounded-xs" placeholder="title" {...field} />
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
                            <Textarea className="h-24 border-0 border-b-2 focus-visible:border-primary focus-visible:ring-0 rounded-xs max-h-48" placeholder="notes (optional)" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive"/>
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
                    name="deadline"
                    render={({ field }) => (
                        <FormItem className="flex">
                        <FormLabel className="text-left w-18 cursor-pointer">deadline</FormLabel>
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
                        <Button variant="overlay" className="fixed -bottom-36 w-content left-[50%] translate-x-[-50%] cursor-default opacity-60">
                            click anywhere to close
                        </Button>
                    </DialogClose>
                    <Button type="submit" className="w-full h-12 cursor-pointer rounded-xs">
                        create task
                    </Button>
                </DialogFooter>
            </form>
            </Form>
        </div>
    )
}