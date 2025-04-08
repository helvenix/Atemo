import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const{ title, notes, start, deadline } = req.body;
        
        const task = new Task({
            userID: req.user.userId,
            title,
            notes,
            start,
            deadline
        });

        await task.save();
        res.status(201).json({message: "Task created successfully", task});
    } catch (e){
        res.status(500).json({message: e.message})
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userID: req.user.userId});
        res.status(200).json(tasks);
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.body;
        const task = await Task.findOne({_id: id, userID: req.user.userId});
        if(!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, notes, start, deadline, completedStatus } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userID: req.user.userId },
            { title, notes, start, deadline, completedStatus, updatedAt: Date.now() },
            { new: true }
        );

        if(!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({message: "Task updated successfully", task});
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

export const deleteTask = async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, userID: req.user.userId });
        if(!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({message: "Task deleted successfully"}); 
    } catch(e){
        res.status(500).json({message: e.message})
    }
}