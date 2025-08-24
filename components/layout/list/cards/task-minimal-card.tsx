import { cn } from "@/lib/utils"

import { 
    Card, 
    CardContent, 
    CardHeader 
} from "@/components/ui/card"

import { Task, MinimalCardProps } from "../type";

export function TaskMinimalCard({ item, timeRemaining, urgent, conceal }: MinimalCardProps<Task>){
    return (
        <Card className={cn(
            "relative h-10 p-2 shadow-xs bg-background w-full border-primary/36 border-r-0 border-l-0 rounded-none",
            conceal ? "opacity-24" : undefined
        )}
        >
            <CardHeader className="w-full text-sm absolute p-0">
                <span className="w-42 truncate">{item.title}</span>
            </CardHeader>
            <CardContent className="absolute right-2 p-0 top-2 bottom-2 flex items-center">
                <span className={cn(
                    "absolute top-0 right-1 font-[RobotoMono]",
                    (urgent ? "text-destructive" : "text-primary")
                )}>{timeRemaining}</span>
            </CardContent>
        </Card>
    )
}