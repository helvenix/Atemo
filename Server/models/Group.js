import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    GroupPicture: { type: String },
    description: { type: String },
    users: [
        {
            userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            role: { type: String, enum: ["admin", "member"], default: "member" }
        }
    ]
}, { timestamps: true })

export default mongoose.model("Group", GroupSchema);