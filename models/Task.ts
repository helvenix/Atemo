import mongoose from 'mongoose';
const { Schema } = mongoose;

const TaskSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    notes: { type: String },
    start: { type: Date, required: true },
    deadline: { type: Date, required: true },
    completedStatus: { type: Boolean, default: false },
    completionDate: { type: Date }
}, { timestamps: true })

export default mongoose.models.Task || mongoose.model('Task', TaskSchema)