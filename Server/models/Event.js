import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date },
    recurrenceRule: { type: String },
    reminderDismissed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);
