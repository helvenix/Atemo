const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['task-suggestion', 'group-invite', 'friend-request', 'reminder'], required: true },
    message: { type: String },
    relatedGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    relatedTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    relatedTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    readStatus: { type: boolean, default: false },
}, { timestamps: true });  