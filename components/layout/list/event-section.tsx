"use client"
import { useState, useEffect, useMemo } from 'react'
import { useEvents } from '@/components/provider/event-context'
import { useFilterSort } from '@/components/layout/list/controls/filter-sort-state'
import { applyEventFiltersAndSort } from '@/components/layout/list/controls/filter-sort-utils'
import { cn } from '@/lib/utils'

import { EventCarousel } from './event-carousel'
import { ResizablePanel } from "@/components/ui/resizable"

export function EventSection({ now, size, shown }: { now: Date; size:number; shown:string }){
    const { events } = useEvents()
    const { completionStatus, dueDate, sortField, sortDirection } = useFilterSort();
    const [hovered, setHovered] = useState(false)
    const [focus, setFocus] = useState(0)

    const filteredSorted = useMemo(() =>
        applyEventFiltersAndSort(events, { completionStatus, dueDate, sortField, sortDirection }, now),
        [events, JSON.stringify(completionStatus), JSON.stringify(dueDate), sortField, sortDirection, now.toISOString()]
    )

    useEffect(() => {
        if(filteredSorted.length > 0){
            setFocus(Math.ceil(filteredSorted.length/2 - 1))
        }else{
            setFocus(0)
        }
    }, [filteredSorted])

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
                setFocus(Math.ceil(filteredSorted.length/2 - 1))
            }}
            onWheel={(e) => {
                setFocus(Math.min(Math.max(0, focus + Math.round(e.deltaY * 0.006)), filteredSorted.length -1))
            }}
        >
            <EventCarousel 
                items={filteredSorted}
                now={now}
                hovered={hovered}
                setHovered={setHovered}
                focus={focus}
            />
        </ResizablePanel>
    )
}