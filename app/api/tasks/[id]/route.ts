import { NextResponse as Response} from "next/server"
import { cookies } from "next/headers"

import connectDB from "@/db/mongoose"
import Task from "@/models/Task"
import { updateTaskSchema } from "@/validators/task"
import { getUserFromSession } from "@/auth/session"

export const runtime = "nodejs"

export async function GET({ params }: {params: { id: string }}){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try {
        const task = await Task.findOne({ _id: params.id, userId: user._id })
        if(!task) return Response.json({message: "Task not found"}, {status: 404})

        return Response.json({item: task}, {status: 200})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}

export async function PUT(req: Request, { params }: {params: { id: string }}){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try {
        const body = await req.json()
        const parsed = updateTaskSchema.safeParse(body)

        if(!parsed.success) return Response.json({message: "Invalid payload", errors: parsed.error.flatten()}, {status: 400})

        const { title, notes, start, deadline } = parsed.data

        const task = await Task.findOneAndUpdate(
            { _id: params.id, userId: user._id },
            { title, notes, start, deadline, updatedAt: Date.now() },
            { new: true }
        )

        if(!task) return Response.json({message: "Task not found"}, {status: 404})
        return Response.json({message: "Task updated successfully", task}, {status: 200})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}

export async function DELETE(req: Request, { params }: {params: { id: string }}){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try{
        const task = await Task.findOneAndDelete({ _id: params.id, userId: user._id})
        if(!task) return Response.json({message: "Task not found"}, {status: 404})

        return Response.json({message: "Task deleted successfully"}, {status: 200})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}