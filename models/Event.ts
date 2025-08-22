import mongoose from 'mongoose';
const { Schema } = mongoose;

const EventSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: { type: String, required: true },
    notes: { type: String },
    start: { type: Date, required: true },
    end: { type: Date },
    recurrenceRule: { type: String, enum: ['once', 'daily', 'weekly', 'monthly'], default: 'once' },
    dismissed: { type: Boolean, default: false }, 
}, { timestamps: true })

export default mongoose.models.Event || mongoose.model('Event', EventSchema)