"use client";

import React, { createContext, useContext, useState } from "react";

// Define the Event type based on your Event model
export type EventType = {
    _id: string;
    userID: string;
    title: string;
    notes?: string;
    start: string; // ISO string or Date string representation
    end?: string;  // Optional end time
    recurrenceRule: string;
    dismissed: boolean;
};

// Define the context type
type EventContextType = {
    events: EventType[];
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
    addEvent: (event: EventType) => void;
    updateEvent: (event: EventType) => void;
    removeEvent: (id: string) => void;
};

// Create the context with an initial default of undefined.
const EventContext = createContext<EventContextType | undefined>(undefined);

// Create the provider component.
export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [events, setEvents] = useState<EventType[]>([]);

    // Add a new event to the state
    const addEvent = (event: EventType) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    // Update an existing event in the state
    const updateEvent = (updatedEvent: EventType) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event._id === updatedEvent._id ? updatedEvent : event
            )
        );
    };

    // Remove an event from the state
    const removeEvent = (id: string) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    };

    return (
        <EventContext.Provider
            value={{ events, setEvents, addEvent, updateEvent, removeEvent }}
        >
            {children}
        </EventContext.Provider>
    );
};

// Custom hook to use the Event context
export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvents must be used within an EventProvider");
    }
    return context;
};
