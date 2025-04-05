import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['task-suggestion', 'group-invite', 'friend-request', 'reminder'], required: true },
    message: { type: String },
    relatedGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    relatedTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    relatedEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    readStatus: { type: Boolean, default: false },
}, { timestamps: true });  

export default mongoose.model("Notification", NotificationSchema);