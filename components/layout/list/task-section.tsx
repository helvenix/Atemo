"use client"
import { useState, useEffect, useMemo } from 'react'
import { useTasks } from '@/components/provider/task-context'

import { useFilterSort } from '@/components/layout/list/controls/filter-sort-state'
import { applyTaskFiltersAndSort } from '@/components/layout/list/controls/filter-sort-utils'

import { cn } from '@/lib/utils'

import { TaskCarousel } from './task-carousel'
import { ResizablePanel } from "@/components/ui/resizable"

export function TaskSection({ now, size, shown }: { now: Date; size:number; shown:string }){
    const { tasks } = useTasks()
    const { completionStatus, dueDate, sortField, sortDirection } = useFilterSort();
    const [hovered, setHovered] = useState(false)
    const [focus, setFocus] = useState(0)

    const filteredSorted = useMemo(() =>
        applyTaskFiltersAndSort(tasks, { completionStatus, dueDate, sortField, sortDirection }, now),
        [tasks, JSON.stringify(completionStatus), JSON.stringify(dueDate), sortField, sortDirection, now.toISOString()]
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
                (shown === "all" || shown === "tasks") ? "" : "hidden"
            )}
            onMouseOver={() => {
                setHovered(true)
            }}
            onMouseLeave={() => {
                setHovered(false)
                setFocus(Math.ceil(filteredSorted.length/2 - 1))
            }}
            onWheel={(e) => {
                setFocus(Math.min(Math.max(0, focus + Math.round(e.deltaY * 0.006)), filteredSorted.length -1))
            }}
        >
            <TaskCarousel 
                items={filteredSorted}
                now={now}
                hovered={hovered}
                setHovered={setHovered}
                focus={focus}
            />
        </ResizablePanel>
    )
}