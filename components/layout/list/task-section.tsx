"use client"
import { useState, useEffect } from 'react'
import { useTasks } from '@/components/provider/task-context'
import { cn } from '@/lib/utils'
import axios from 'axios'

import { TaskCarousel } from './task-carousel'
import {
    ResizablePanel,
} from "@/components/ui/resizable"

export function TaskSection({ now, size, shown }: { now: Date; size:number; shown:string }){
    const { tasks } = useTasks()
    const [hovered, setHovered] = useState(false)
    const [focus, setFocus] = useState(0)

    useEffect(() => {
        if(tasks.length > 0){
            setFocus(Math.ceil(tasks.filter(task => task.completedStatus === false).length/2 - 1))
        }else{
            setFocus(0)
        }
    }, [tasks])

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
                setFocus(Math.ceil(tasks.filter(task => task.completedStatus === false).length/2 - 1))
            }}
            onWheel={(e) => {
                setFocus(Math.min(Math.max(0, focus + Math.round(e.deltaY * 0.006)), tasks.filter(task => task.completedStatus === false).length -1))
            }}
        >
            <TaskCarousel 
                items={tasks}
                now={now}
                hovered={hovered}
                setHovered={setHovered}
                focus={focus}
            />
        </ResizablePanel>
    )
}