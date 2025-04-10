"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useAuth } from "@/contexts/auth-context"

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

const forgotPasswordSchema = z.object({
  contact: z.string().min(1, {
    message: "Please enter your email or phone number.",
  }),
  otp: z.string().length(6, {
    message: "Please enter the complete OTP.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showOTPInput, setShowOTPInput] = useState(false)
  const { login: authLogin } = useAuth()
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      contact: "",
      otp: "",
    },
  })

  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true)
      await authLogin(values.email, values.password)
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      
      router.push("/")
    } catch (error: any) {
      console.error('Login error:', error)
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  function onForgotPasswordSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    if (!showOTPInput) {
      // Send OTP
      setShowOTPInput(true)
      toast({
        title: "OTP Sent",
        description: "Please check your email/phone for the OTP.",
      })
    } else {
      // Verify OTP and reset password
      toast({
        title: "OTP Verified",
        description: "You can now reset your password.",
      })
      // Redirect to reset password page or show reset password form
    }
  }

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <div className="flex justify-center mb-8">
        <Shield className="h-12 w-12 text-primary" />
      </div>
      
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {showForgotPassword ? "Reset Password" : "Login"}
          </CardTitle>
          <CardDescription className="text-center">
            {showForgotPassword 
              ? "Enter your email or phone number to receive an OTP" 
              : "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showForgotPassword ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...forgotPasswordForm}>
              <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                <FormField
                  control={forgotPasswordForm.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter email or phone number" 
                          {...field} 
                          disabled={showOTPInput}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showOTPInput && (
                  <FormField
                    control={forgotPasswordForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter OTP</FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={field.onChange}
                            render={({ slots }) => (
                              <InputOTPGroup className="gap-2">
                                {slots.map((slot, index) => (
                                  <InputOTPSlot key={index} index={index} {...slot} />
                                ))}
                              </InputOTPGroup>
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <Button type="submit" className="w-full">
                  {!showOTPInput ? "Send OTP" : "Verify OTP"}
                </Button>
              </form>
            </Form>
          )}
          
          <div className="mt-4 text-center text-sm">
            <Button 
              variant="link" 
              className="text-primary hover:underline"
              onClick={() => {
                setShowForgotPassword(!showForgotPassword)
                setShowOTPInput(false)
              }}
            >
              {showForgotPassword ? "Back to Login" : "Forgot password?"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}