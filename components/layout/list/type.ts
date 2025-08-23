import { z } from "zod";

export interface Task {
    _id: string;
    userId: string;
    title: string;
    notes?: string;
    start: string;
    deadline: string;
    completedStatus?: boolean
}

export interface Event {
    _id: string;
    userId: string;
    title: string;
    notes?: string;
    start: string;
    end?: string;
    recurrenceRule: string;
    dismissed?: boolean;
}

export interface CarouselMeta {
    remaining: number;
    ratio: number;
    urgent: boolean;
    timeString: string;
}

export interface CarouselProps<T> {
    items: T[];
    now: Date;
    hovered: boolean;
    setHovered: React.Dispatch<React.SetStateAction<boolean>>;
    focus: number;
    // setFocus: (idx: number) => void;
}

export interface FocusCardProps<T>{
    item: T;
    timeRemaining: string;
    timeRatio: number;
    urgent: boolean;
    setHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MinimalCardProps<T>{
    item: T;
    timeRemaining: string;
    urgent: boolean;
    conceal: boolean;
}

export const taskSchema = z.object({
    _id: z.string(),
    title: z
        .string()
        .min(1, {message: "title required"})
        .max(24, {message: "Maximum 24 characters"}),
    notes: z
        .string(),
    start: z
        .date({
            error: "Starting time required"
        }),
    deadline: z
        .date({
            error: "Deadline time required"
        })
})

export const createTaskSchema = taskSchema.omit({ _id: true})

export const eventSchema = z.object({
    _id: z.string(),
    title: z
        .string()
        .min(1, {message: "title required"})
        .max(24, {message: "Maximum 24 characters"}),
    notes: z
        .string(),
    start: z
        .date({
            error: "Starting time required"
        }),
    end: z
        .date().optional(),
    recurrenceRule: z
        .string()
})

export const createEventSchema = eventSchema.omit({ _id: true})
