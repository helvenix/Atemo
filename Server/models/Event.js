import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date },
    recurrenceRule: { type: String },
    dismissalType: { type: String, enum: ['once', 'persistent'], default: 'persistent' },
    dismissedUntil: { type: Date }
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);
