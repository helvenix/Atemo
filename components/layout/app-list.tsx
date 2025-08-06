"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; 
import { format } from 'date-fns';

// import { useTasks } from "@/components/task-context";
// import { useEvents } from "./event-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TimePicker } from "@/components/others/time-picker";

import { 
    Calendar as CalendarIcon, 
    CheckCheck, 
    CircleSmall, 
    Clock, 
    EyeOff, 
    PartyPopper, 
    PenLine, 
    Trash2
} from "lucide-react";


export function AppList(){
    return (
        <></>
    )
}