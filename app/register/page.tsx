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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
  role: z.string({
    required_error: "Please select a role.",
  }),
  organization: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  employeeId: z.string().optional(),
  department: z.string().optional(),
  district: z.string().min(2, {
    message: "Please enter your district.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      organization: "",
      phone: "",
      employeeId: "",
      department: "",
      district: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)
      
      toast({
        title: "Account created successfully",
        description: "Your registration request has been submitted and will be reviewed by the admin.",
      })
      
      router.push("/login")
    }, 1500)
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="flex justify-center mb-8">
        <Shield className="h-12 w-12 text-primary" />
      </div>

      {step === 1 ? (
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Terms and Conditions</CardTitle>
            <CardDescription className="text-center">
              Please read and accept the terms before proceeding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <h3 className="font-semibold mb-2">1. Official Use</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                This system is for official disaster response coordination. Misuse may result in legal action.
              </p>

              <h3 className="font-semibold mb-2">2. Data Accuracy</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Users must provide accurate information and maintain up-to-date records.
              </p>

              <h3 className="font-semibold mb-2">3. Confidentiality</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Users must maintain confidentiality of sensitive information accessed through the system.
              </p>

              <h3 className="font-semibold mb-2">4. Responsibility</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Users are responsible for all actions performed under their account.
              </p>

              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  id="accept"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="accept" className="text-sm font-medium">
                  I accept the terms and conditions
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              disabled={!acceptedTerms}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">System Administrator</SelectItem>
                          <SelectItem value="district_officer">District Officer</SelectItem>
                          <SelectItem value="emergency_responder">Emergency Responder</SelectItem>
                          <SelectItem value="resource_manager">Resource Manager</SelectItem>
                          <SelectItem value="field_officer">Field Officer</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                          <SelectItem value="ngo_representative">NGO Representative</SelectItem>
                          <SelectItem value="public_user">Public User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the role that best describes your official capacity
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Official Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@gov.np" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization/Department</FormLabel>
                        <FormControl>
                          <Input placeholder="Your organization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee ID (if applicable)</FormLabel>
                        <FormControl>
                          <Input placeholder="Employee ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input placeholder="Your district" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Submit Registration"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}