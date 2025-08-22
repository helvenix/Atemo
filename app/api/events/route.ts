import { NextResponse as Response } from "next/server"
import { cookies } from "next/headers"

import connectDB from "@/db/mongoose"
import Event from "@/models/Event"
import { createEventSchema } from "@/validators/event"
import { getUserFromSession } from "@/auth/session"

export const runtime = "nodejs"

export async function GET(){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try{
        const events = await Event.find({ userId: user._id })
        return Response.json(events, {status: 200})
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
        const parsed = createEventSchema.safeParse(body)

        if(!parsed.success) return Response.json({message: "Invalid payload", errors: parsed.error.flatten()}, {status: 400})

        const { title, notes, start, end, recurrenceRule } = parsed.data;

        const event = new Event({
            userId: user._id,
            title,
            notes,
            start,
            end,
            recurrenceRule
        })

        await event.save()
        return Response.json({message: "Event created successfully", event}, {status: 201})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}