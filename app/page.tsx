import Link from "next/link"
import { AlertCircle, ArrowRight, Map, Package, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Nepal Disaster Response System
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A comprehensive platform for disaster management, resource coordination, and emergency response in Nepal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/incidents">
                Report Incident
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/alerts">View Alerts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <AlertCircle className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Incident Reporting</CardTitle>
              <CardDescription>
                Report and track disaster incidents across Nepal in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our system allows for quick reporting of incidents with location data, severity assessment, and immediate notification to relevant authorities.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/incidents">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Package className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Resource Management</CardTitle>
              <CardDescription>
                Track and allocate resources efficiently during disaster response.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Manage inventory of critical supplies, coordinate distribution, and ensure resources reach affected areas promptly.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/resources">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Map className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Disaster Mapping</CardTitle>
              <CardDescription>
                Visualize disaster zones and response activities on interactive maps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Interactive maps show affected areas, resource distribution points, evacuation routes, and real-time updates from the field.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/alerts">View Map</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-muted rounded-lg my-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Disaster Response Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">250+</span>
              <span className="text-muted-foreground mt-2">Incidents Managed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">1,500+</span>
              <span className="text-muted-foreground mt-2">Resources Deployed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">75</span>
              <span className="text-muted-foreground mt-2">Districts Covered</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">10,000+</span>
              <span className="text-muted-foreground mt-2">People Assisted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold">Join the Disaster Response Network</h2>
          <p className="text-muted-foreground">
            Be part of Nepal's coordinated disaster response effort. Register as a volunteer, resource provider, or emergency responder.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Register Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}