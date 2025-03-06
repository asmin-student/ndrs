"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const router = useRouter()
  const [showTerms, setShowTerms] = useState(true)
  const [accepted, setAccepted] = useState(false)

  const handleAccept = () => {
    setShowTerms(false)
  }

  const handleDecline = () => {
    router.push("/")
  }

  return (
    <div className="container max-w-2xl mx-auto py-16 px-4">
      <div className="flex justify-center mb-8">
        <Shield className="h-12 w-12 text-primary" />
      </div>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Terms of Use</DialogTitle>
            <DialogDescription>
              Please read and accept our terms before registering
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[400px] overflow-y-auto py-4">
            <h3 className="font-semibold mb-2">1. Incident Reporting Guidelines</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Users must provide accurate and timely information when reporting incidents. False reports or misuse of the system may result in account termination.
            </p>

            <h3 className="font-semibold mb-2">2. Resource Management</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Users involved in resource management must maintain accurate records and follow proper allocation procedures.
            </p>

            <h3 className="font-semibold mb-2">3. Emergency Response Coordination</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Users must follow established protocols for emergency response coordination and maintain clear communication.
            </p>

            <h3 className="font-semibold mb-2">4. Data Privacy</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Users must respect data privacy guidelines and not share sensitive information outside authorized channels.
            </p>

            <h3 className="font-semibold mb-2">5. Account Security</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Users are responsible for maintaining the security of their accounts and must report any unauthorized access.
            </p>
          </div>

          <div className="flex items-center space-x-2 py-4">
            <Checkbox 
              id="terms" 
              checked={accepted} 
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the terms and conditions
            </label>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleDecline}>
              Decline
            </Button>
            <Button onClick={handleAccept} disabled={!accepted}>
              Accept & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!showTerms && (
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              {/* Registration form will be added here */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Create a password"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Confirm your password"
                  />
                </div>
                <Button className="w-full">Create Account</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Login
              </a>
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}