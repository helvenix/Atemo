import { NextResponse as Response } from "next/server"
import { cookies } from "next/headers"

import connectDB from "@/db/mongoose"
import Event from "@/models/Event"
import { getUserFromSession } from "@/auth/session"

import { addDays, addWeeks, addMonths } from 'date-fns'

export const runtime = "nodejs"

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }){
    await connectDB()

    const user = await getUserFromSession(await cookies())
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401})

    try{
        const { id } = await context.params

        const event = await Event.findOne({ _id: id, userId: user._id })
        if(!event) return Response.json({message: "Event not found"}, {status: 404})

        if(event.recurrenceRule === 'once'){
            event.dismissed = true;
        }else{
            const start = new Date(event.start)
            const end = event.end ? new Date(event.end) : null

            let newStart
            let newEnd

            switch(event.recurrenceRule){
                case 'daily':
                    newStart = addDays(start, 1)
                    newEnd = end ? addDays(end, 1) : null
                    break
                case 'weekly':
                    newStart = addWeeks(start, 1)
                    newEnd = end ? addWeeks(end, 1) : null
                    break
                case 'monthly':
                    newStart = addMonths(start, 1)
                    newEnd = end ? addMonths(end, 1) : null
                    break
                default:
                    return Response.json({message: "Unidentified recurrence rule"}, {status: 400})
            }

            event.start = newStart
            event.end = newEnd
        }

        await event.save()
        return Response.json({message: "Event dismissed successfully", event}, {status: 200})
    }catch(e: any){
        return Response.json({message: e.message || "Server error"}, {status: 500})
    }
}