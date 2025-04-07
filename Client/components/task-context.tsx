"use client";
import React, { createContext, useContext, useState } from "react";

// Define the Task type (adjust based on your Task model)
type Task = {
    _id: string;
    userID: string;
    title: string;
    notes?: string;
    start: string;
    deadline: string;
    completedStatus?: boolean;
    completionDate?: string;
};

// Define the context type
type TaskContextType = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    removeTask: (taskId: string) => void;
};

// Create the context with an undefined default
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create a provider component
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Function to add a task
    const addTask = (task: Task) => {
        setTasks((prevTasks) => [task, ...prevTasks]);
    };

    // Function to update a task
    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
    };

    // Function to remove a task
    const removeTask = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

// Create a custom hook to use the TaskContext
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};
