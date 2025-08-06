"use client"
import { useState, useEffect } from 'react'
import { useEvents } from '@/components/provider/event-context'
import { cn } from '@/lib/utils'
import axios from 'axios'

import { EventCarousel } from './event-carousel'
import {
    ResizablePanel,
} from "@/components/ui/resizable"
import { toast } from 'sonner'

export function EventSection({ now, size, shown }: { now: Date; size:number; shown:string }){
    const { events, setEvents  } = useEvents()
    const [hovered, setHovered] = useState(false)
    const [focus, setFocus] = useState(0)

    const fetchEvents = async() => {
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/`,
                { withCredentials: true }
            )
            setEvents(res.data)
        } catch(e: any){
            toast.error("An error occurred", {
                description: e?.response?.data?.message || "Event can't be fetched.",
            });
        }
    }

    useEffect(() => {
        if(events.length > 0){
            setFocus(Math.ceil(events.filter(event => event.dismissed === false).length/2 - 1))
        }else{
            setFocus(0)
        }
    }, [events])

    return (
        <ResizablePanel
            defaultSize={50}
            minSize={size}
            className={cn(
                "relative flex items-center justify-center", 
                (shown === "all" || shown === "events") ? "" : "hidden"
            )}
            onMouseOver={()=> {
                setHovered(true)
            }}
            onMouseLeave={()=> {
                setHovered(false)
                setFocus(Math.ceil(events.filter(event => event.dismissed === false).length/2 - 1))
            }}
            onWheel={(e) => {
                setFocus(Math.min(Math.max(0, focus + Math.round(e.deltaY * 0.006)), events.filter(event => event.dismissed === false).length -1))
            }}
        >
            <EventCarousel 
                items={events}
                now={now}
                hovered={hovered}
                setHovered={setHovered}
                focus={focus}
            />
        </ResizablePanel>
    )
}