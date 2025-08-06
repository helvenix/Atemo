"use client";
import React, { createContext, useContext, useState } from "react";

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

type TaskContextType = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    removeTask: (taskId: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
    };

    const removeTask = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};
