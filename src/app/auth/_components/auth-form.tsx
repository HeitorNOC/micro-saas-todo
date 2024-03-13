'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"

const registerFormSchema = z.object({
    email: z.string().email({ message: "Email inválido" })
})

export function AuthForm() {
    type RegisterFormData = z.infer<typeof registerFormSchema>

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    })

    async function handleSubmitLoginForm(data: RegisterFormData) {
        try {
            console.log(data)
            await signIn('email', { email: data.email, redirect: false })
            toast({
                title: 'Magic Link Sent',
                description: 'Check your email for the magic link to login'
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error ocurred. Please try again'
            })
        }

    }

    return (
        <Card className="mx-auto max-w-md">
            <CardHeader className="text-center space-y-1">
                <CardTitle className="text-3xl font-bold">Login</CardTitle>
                <CardDescription>Enter your email to sign in or create an account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form action="" onSubmit={handleSubmit(handleSubmitLoginForm)}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" required type="email" {...register('email')} />
                        {errors.email && (
                            <p style={{ color: '#f75a68' }}>{errors.email.message}</p>
                        )}
                    </div>
                    <Button className="w-full mt-2">Send Magic Link</Button>
                </form>
            </CardContent>
        </Card>
    )
}

