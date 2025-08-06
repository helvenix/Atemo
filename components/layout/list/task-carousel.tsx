import { TaskFocusCard } from "./cards/task-focus-card";
import { TaskMinimalCard } from "./cards/task-minimal-card";

import { Task, CarouselProps } from "./type";

import { PartyPopper } from "lucide-react";

function computeMeta(task: Task, now: Date){
    const start = new Date(task.start).getTime()
    const deadline = new Date(task.deadline). getTime()

    const duration = Math.max(deadline - start, 1)
    const timeRemaining = Math.max(deadline - now.getTime(), 0)
    const timeRatio = timeRemaining / duration

    const secs  = Math.floor((timeRemaining / 1000) % 60);
    const mins  = Math.floor((timeRemaining / 60000) % 60);
    const hrs   = Math.floor(timeRemaining / 3600000);

    const hh = String(hrs).padStart(3, '0');
    const mm = String(mins).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');

    return {
        ...task,
        timeRemaining,
        timeRatio,
        urgent: hrs < 24 || timeRatio < 0.25,
        timeString: `${hh}:${mm}:${ss}`,
    }
}

export function TaskCarousel({ items, now, hovered, setHovered, focus }: CarouselProps<Task>){
    if(TaskCarousel.length === 0) return <div className="flex m-0 p-0 gap-x-2"><span>no tasks for now</span><PartyPopper className="size-5"/></div>

    const tasks = items
        .map(item => computeMeta(item, now))
        .sort((a, b) => {
            if(a.urgent !== b.urgent) return a.urgent ? -1 : 1
                return a.timeRemaining - b.timeRemaining
        })

    const containerProps = hovered ? 
    {
        className: "absolute w-full m-0 p-0 border border-l-0 border-r-0 border-border/24",
        style: {
            top: `calc(50% + ${Math.ceil(tasks.length/2 - 1) - focus} * 2.5rem + ${
                tasks.length % 2 === 0 ? "1.25rem" : "0rem"
            })`,
            transform: "translateY(-50%)",
        } as React.CSSProperties
    }
    : 
    {
        className: "w-full m-0 p-0 border border-l-0 border-r-0"
    };

    return (
        <div {...containerProps}>
            {tasks.map((task, index) =>
                (hovered && index === focus) ? (
                    <TaskFocusCard
                        key={task._id}
                        item={task}
                        timeRemaining={task.timeString}
                        timeRatio={task.timeRatio}
                        urgent={task.urgent}
                        setHovered={setHovered} 
                    />
                ) : (
                    <TaskMinimalCard 
                        key={task._id}
                        item={task}
                        timeRemaining={task.timeString}
                        urgent={task.urgent}
                        conceal={hovered}
                    />
                )
            )}
        </div>
    )
}