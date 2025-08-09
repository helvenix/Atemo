import { NextResponse as Response} from "next/server"
import { cookies } from "next/headers"

import connectDB from "@/db/mongoose"
import Task from "@/models/Task"
import { createTaskSchema } from "@/validators/task"
import { getUserFromSession } from "@/auth/session"

export const runtime = "nodejs"

export async function GET(){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try{
        const tasks = await Task.find({ userId: user._id })
        return Response.json(tasks, {status: 200})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}

export async function POST(req: Request){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try{
        const body = await req.json()
        const parsed = createTaskSchema.safeParse(body)

        if(!parsed.success) return Response.json({message: "Invalid payload", errors: parsed.error.flatten()}, {status: 400})

        const { title, notes, start, deadline } = parsed.data;

        const task = new Task({
            userId: user._id,
            title,
            notes,
            start,
            deadline
        })

        await task.save()
        return Response.json({message: "Task created successfully", task}, {status: 201})
    } catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}