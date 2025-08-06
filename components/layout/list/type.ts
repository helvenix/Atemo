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