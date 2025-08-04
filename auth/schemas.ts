import { z } from 'zod'

export const signInSchema = z.object({
    email: z.email().min(1, { message: "email required" }),
    password: z.string().min(1, { message: "Password required" }),
})

export const signUpSchema = z.object({
    name: z
        .string()
        .min(1, {message: "name required"})
        .max(15, {message: "Maximum 15 characters"}),
    email: z
        .email({message: "Invalid email address"})
        .min(1, { message: "email required" }),
    password: z
        .string()
        .min(1, { message: "Password required" })
        .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm password required" })
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});