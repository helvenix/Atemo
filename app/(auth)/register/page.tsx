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

import { signUpSchema } from "@/auth/schemas"
import { signUp } from '@/auth/action'

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    async function onSubmit(data: SignUpFormValues) { 
        try{
            const user = await signUp(data)

            toast.success("Sign up successful", {
                description: `Welcome ${user.name}`
            });
            router.push("/");
        } catch (e){
            toast.error("An error occurred", {
                description: `${e instanceof Error ? e.message : "Sign up failed"}`,
            });
        }
    }

  return (
    <div className="flex flex-col h-full w-full items-center justify-center bg-background">
        <h2 className="text-3xl font-bold text-center">Sign up to Atemo</h2>
        <div className="w-96 p-4 rounded-xs">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input className="h-12 border-0 border-b-2 focus-visible:border-primary focus-visible:ring-0 rounded-xs" placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive"/>
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input className="h-12 border-0 border-b-2 focus-visible:border-primary focus-visible:ring-0 rounded-xs" type="password" placeholder="Confirm password" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive"/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full h-12 cursor-pointer rounded-xs">
                    sign up
                </Button>
            </form>
            </Form>
        </div>
        <div className="w-full flex justify-center">
            <Button variant='link' className="m-0 p-0">
                <Link href='\login'>Already have an account? Log In</Link>
            </Button>
        </div>
    </div>
  );
}
