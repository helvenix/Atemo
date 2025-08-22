import { NextResponse as Response } from "next/server"
import { cookies } from "next/headers"

import connectDB from "@/db/mongoose"
import Event from "@/models/Event"
import { updateEventSchema } from "@/validators/event"
import { getUserFromSession } from "@/auth/session"

export const runtime = "nodejs"

export async function GET({ params }: {params: { id: string }}){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try{
        const event = await Event.findOne({ _id: params.id, userId: user._id })
        if(!event) return Response.json({message: "Event not found"}, {status: 404})

        return Response.json({event}, {status: 200})
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
        const parsed = updateEventSchema.safeParse(body)

        if(!parsed.success) return Response.json({message: "Invalid payload", errors: parsed.error.flatten()}, {status: 400})
        
        const { title, notes, start, end, recurrenceRule } = parsed.data

        const event = await Event.findOneAndUpdate(
            { _id: params.id, userId: user._id },
            { title, notes, start, end, recurrenceRule, updatedAt: Date.now() },
            { new: true }
        )

        if(!event) return Response.json({message: "Event not found"}, {status: 404})
        return Response.json({message: "Event updated successfully", event}, {status: 200})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}

export async function DELETE({ params }: {params: { id: string }}){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try{
        const event = await Event.findOneAndDelete({ _id: params.id, userId: user._id })
        if(!event) return Response.json({message: "Event not found"}, {status: 404})

        return Response.json({message: "Event deleted successfully"}, {status: 200})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}