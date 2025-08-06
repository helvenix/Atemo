"use client";
import React, { createContext, useContext, useState } from "react";

type Event = {
    _id: string;
    userId: string;
    title: string;
    notes?: string;
    start: string; 
    end?: string; 
    recurrenceRule: string;
    dismissed: boolean;
};

type EventContextType = {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    addEvent: (event: Event) => void;
    updateEvent: (updatedEvent: Event) => void;
    removeEvent: (eventId: string) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (event: Event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    const updateEvent = (updatedEvent: Event) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
        );
    };

    const removeEvent = (eventId: string) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    };

    return (
        <EventContext.Provider value={{ events, setEvents, addEvent, updateEvent, removeEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvents must be used within an EventProvider");
    }
    return context;
};
