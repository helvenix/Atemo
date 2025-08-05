"use server"

import { z } from "zod"
import bcrypt from 'bcryptjs'

import { cookies } from "next/headers"
import { createUserSession, removeUserFromSession } from '@/auth/session'

// import { getOAuthClient } from "@/auth/oauth"

import { signInSchema, signUpSchema } from "@/auth/schemas"

import User from '@/models/User'
import connectDB from '@/db/mongoose'

export async function signUp(unsafeData: z.infer<typeof signUpSchema>){
    await connectDB()

    const { success, data } = signUpSchema.safeParse(unsafeData)
    if(!success) throw new Error("Unable to sign up")
    
    const existUser = await User.findOne({ email: data.email })
    if(existUser) throw new Error("User already exists")
    
    const uid = await User.countDocuments()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)

    const user = new User({
        uid: uid,
        name: data.name,
        email: data.email,
        password: hashedPassword,
    })
    
    await createUserSession({
        _id: user._id.toString(),
        uid: user.uid,
        name: user.name,
        email: user.email
    }, await cookies())

    await user.save()
    return {
        id: user._id.toString(),
        uid: user.uid,
        name: user.name,
    }
}

export async function signIn(unsafeData: z.infer<typeof signInSchema>){
    await connectDB()

    const { success, data } = signInSchema.safeParse(unsafeData)
    if(!success) throw new Error("Unable to sign in")

    const user = await User.findOne({ email: data.email })
    if(!user) throw new Error("Email aren't registered")

    const isMatch = await bcrypt.compare(data.password, user.password)
    if(!isMatch) throw new Error("Invalid credentials")

    await createUserSession({
        _id: user._id.toString(),
        uid: user.uid,
        name: user.name,
        email: user.email
    }, await cookies())

    return {
        id: user._id.toString(),
        uid: user.uid,
        name: user.name,
    }
}

export async function logOut(){
    await removeUserFromSession(await cookies())
}

// export async function oAuthSignin(provider: string){
//     await connectDB()

//     const oAuthClient = getOAuthClient(provider)
//     redirect(oAuthClient.createAuthUrl(await cookies())) 
// }