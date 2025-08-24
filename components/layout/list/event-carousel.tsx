import { EventFocusCard } from "./cards/event-focus-card";
import { EventMinimalCard } from "./cards/event-minimal-card";

import { Event, CarouselProps } from "./type";

import { PartyPopper } from "lucide-react";

function computeMeta(event: Event, now: Date){
    const start = new Date(event.start).getTime()

    const timeRemaining = Math.max(start - now.getTime(), 0)
    const timeRatio = timeRemaining / (24*60*60*1000)

    const hrs   = Math.floor(timeRemaining / 3600000);
    const mins  = Math.floor((timeRemaining / 60000) % 60);
    const secs  = Math.floor((timeRemaining / 1000) % 60);

    const hh = String(hrs).padStart(3, '0');
    const mm = String(mins).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');

    return {
        ...event,
        timeRemaining,
        timeRatio,
        urgent: hrs < 6,
        timeString: `${hh}:${mm}:${ss}`,
    }
}

export function EventCarousel({ items, now, hovered, setHovered, focus }: CarouselProps<Event>){
    if(items.length === 0) return <div className="flex m-0 p-0 gap-x-2"><span>no events for now</span><PartyPopper className="size-5"/></div>

    const events = items
        .map(item => computeMeta(item, now))
        .sort((a, b) => {
            if(a.urgent !== b.urgent) return a.urgent ? -1 : 1
                return a.timeRemaining - b.timeRemaining
        })

    const containerProps = hovered ? 
    {
        className: "absolute w-full m-0 p-0 border border-l-0 border-r-0 border-border/24",
        style: {
            top: `calc(50% + ${Math.ceil(events.length/2 - 1) - focus} * 2.5rem + ${
                events.length % 2 === 0 ? "1.25rem" : "0rem"
            })`,
            transform: "translateY(-50%)",
        } as React.CSSProperties
    }
    : 
    {
        className: "w-full m-0 p-0 border border-primary/36 border-l-0 border-r-0"
    }

    return (
        <div {...containerProps}>
            {events.map((event, index) => 
                (hovered && index === focus) ? (
                    <EventFocusCard 
                        key={event._id}
                        item={event}
                        timeRemaining={event.timeString}
                        timeRatio={event.timeRatio}
                        urgent={event.urgent}
                        setHovered={setHovered} 
                    />
                ) : (
                    <EventMinimalCard 
                        key={event._id}
                        item={event}
                        timeRemaining={event.timeString}
                        urgent={event.urgent}
                        conceal={hovered}
                    />
                )
            )}
        </div>
    )
}