import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
    try {
        const{ title, notes, start, end, recurrenceRule } = req.body;
        
        const event = new Event({
            userID: req.user.userId,
            title,
            notes,
            start,
            end,
            recurrenceRule
        });

        await event.save();
        res.status(201).json({message: "Event created successfully", event});
    } catch (e){
        res.status(500).json({message: e.message})
    }
}

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({userID: req.user.userId});
        res.status(200).json(events);
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

export const getEventById = async (req, res) => {
    try {
        const { id } = req.body;
        const event = await Event.findOne({_id: id, userID: req.user.userId});
        if(!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { title, notes, start, end, reccurenceRule, reminderDismissed } = req.body;

        const event = await Event.findOneAndUpdate(
            { _id: req.params.id, userID: req.user.userId },
            { title, notes, start, end, reccurenceRule, reminderDismissed, updatedAt: Date.now() },
            { new: true }
        );

        if(!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json({message: "Event updated successfully", event});
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

export const deleteEvent = async (req, res) => {
    try{
        const event = await Event.findOneAndDelete({ _id: req.params.id, userID: req.user.userId });
        if(!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json({message: "Event deleted successfully"}); 
    } catch(e){
        res.status(500).json({message: e.message})
    }
}