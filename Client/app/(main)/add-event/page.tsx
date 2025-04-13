"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEvents } from "@/components/event-context";

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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { TimePicker } from "@/components/time-picker";

import { Calendar as CalendarIcon } from "lucide-react";

const eventSchema = z.object({
    title: z
        .string()
        .min(1, {message: "title required"})
        .max(24, {message: "Maximum 24 characters"}),
    notes: z
        .string(),
    start: z
        .date({
            required_error: "Starting time required"
        }),
    deadline: z
        .date({
            required_error: "Deadline time required"
        })
})

type EventFormValues = z.infer<typeof eventSchema>;

export default function AddPage() {
    const { addEvent } = useEvents();
    const router = useRouter();
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            notes: "",
        },
    });

    async function onSubmit(event: EventFormValues) { 
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event),
                credentials: 'include'
            });
            if(res.ok){
                const data = await res.json();
                addEvent(data.event)
                toast.success("Event has been successfully added");
                router.push("/");
            }else{
                toast.error("An error occurred", {
                    description: "Please try again later.",
                });
            }
        } catch (e){
            toast.error("An error occurred", {
                description: "Please try again later.",
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
    <div className="flex flex-col h-full w-full items-center justify-center bg-background">
        <h2 className="text-3xl font-bold text-center">Create Event</h2>
        <div className="w-96 p-4 rounded-xs">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                initialFocus
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
                                initialFocus
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
                <Button type="submit" className="w-full h-12 cursor-pointer rounded-xs">
                    create event
                </Button>
            </form>
            </Form>
        </div>
    </div>
  );
}
