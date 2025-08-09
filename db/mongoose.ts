import mongoose from "mongoose";

declare global {
    var _mongoose: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    } | undefined;
}

const MONGO_URI = process.env.MONGO_URI!
if(!MONGO_URI){
    throw new Error("Missing MONGO_URI environment variable")
}

let cached = global._mongoose || (global._mongoose = { conn: null, promise: null})

const connectDB = async () => {
    if(cached.conn) return cached.conn

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_URI)
    }

    cached.conn = await cached.promise
    return cached.conn
} 

export default connectDB

