import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    groupPicture: { type: String },
    description: { type: String },
    users: [
        {
            userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            role: { type: String, enum: ["superadmin", "admin", "member"], default: "member" }
        }
    ]
}, { timestamps: true })

export default mongoose.model("Group", GroupSchema);