import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    notes: { type: String },
    start: { type: Date, required: true },
    deadline: { type: Date, required: true },
    completedStatus: { type: Boolean, default: false },
    completionDate: { type: Date }
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);