import { NextResponse as Response} from "next/server"
import { cookies } from "next/headers"

import connectDB from "@/db/mongoose"
import Task from "@/models/Task"
import { getUserFromSession } from "@/auth/session"

export const runtime = "nodejs"

export async function PUT({ params }: {params: { id: string }}){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try{
        const task = await Task.findOneAndUpdate(
            { _id: params.id, userId: user._id },
            { completedStatus: true, completionDate: new Date(), updatedAt: new Date() },
            { new: true }
        )

        if(!task) return Response.json({message: "Task not found"}, {status: 404})
        return Response.json({message: "Task marked as done successfully", task}, {status: 200})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}