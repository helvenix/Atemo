"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link"

const loginSchema = z.object({
    email: z.email().min(1, { message: "email required" }),
    password: z.string().min(1, { message: "Password required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(user: LoginFormValues) { 
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
                credentials: 'include',
            });
            const data = await res.json();
            if(res.ok){
                toast.success("Log in successful", {
                    description: `Welcome ${data.user.name}`
                });
                router.push("/");
            }else{
                toast.error("Invalid credentials", {
                    description: "Username or password is incorrect.",
                });
            }
        } catch (e){
            toast.error("An error occurred", {
                description: "Please try again later.",
            });
        }
    }

  return (
    <div className="flex flex-col h-full w-full items-center justify-center bg-background">
        <h2 className="text-3xl font-bold text-center">Log in to Atemo</h2>
        <div className="w-96 p-4 rounded-xs">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input className="h-12 border-0 border-b-2 focus-visible:border-primary focus-visible:ring-0 rounded-xs" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input className="h-12 border-0 border-b-2 focus-visible:border-primary focus-visible:ring-0 rounded-xs" type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive"/>
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end -mt-4">
                    <Button variant='link' size='sm' className="m-0 p-0">
                        <Link href='\forget' className="text-sm">Forgot password?</Link>
                    </Button>
                </div>
                <Button type="submit" className="w-full h-12 cursor-pointer rounded-xs">
                    log in
                </Button>
            </form>
            </Form>
        </div>
        <div className="w-full flex justify-center">
            <Button variant='link' className="m-0 p-0">
                <Link href='\register'>Don't have an account? Sign Up</Link>
            </Button>
        </div>
    </div>
  );
}
