import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IncidentForm from "@/components/IncidentForm"

export const metadata: Metadata = {
  title: "Incidents | Nepal Disaster Response System",
  description: "Report and track disaster incidents across Nepal",
}

export default function IncidentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disaster Incidents</h1>
          <p className="text-muted-foreground">
            Report and track disaster incidents across Nepal
          </p>
        </div>
        <Button asChild>
          <Link href="#report-incident">Report New Incident</Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Incidents</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="my-reports">My Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample incident cards */}
            <IncidentCard 
              id="INC-2023-001"
              title="Flooding in Bardiya District"
              type="Flood"
              location="Bardiya, Nepal"
              date="2023-08-15"
              status="Active"
              severity="High"
            />
            <IncidentCard 
              id="INC-2023-002"
              title="Landslide in Sindhupalchok"
              type="Landslide"
              location="Sindhupalchok, Nepal"
              date="2023-07-28"
              status="Active"
              severity="Critical"
            />
            <IncidentCard 
              id="INC-2023-003"
              title="Fire in Kathmandu Market"
              type="Fire"
              location="Kathmandu, Nepal"
              date="2023-09-05"
              status="Resolved"
              severity="Medium"
            />
            <IncidentCard 
              id="INC-2023-004"
              title="Earthquake in Dolakha"
              type="Earthquake"
              location="Dolakha, Nepal"
              date="2023-06-12"
              status="Resolved"
              severity="High"
            />
            <IncidentCard 
              id="INC-2023-005"
              title="Drought in Kailali"
              type="Drought"
              location="Kailali, Nepal"
              date="2023-05-20"
              status="Active"
              severity="Medium"
            />
            <IncidentCard 
              id="INC-2023-006"
              title="Avalanche in Solukhumbu"
              type="Avalanche"
              location="Solukhumbu, Nepal"
              date="2023-02-10"
              status="Resolved"
              severity="High"
            />
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IncidentCard 
              id="INC-2023-001"
              title="Flooding in Bardiya District"
              type="Flood"
              location="Bardiya, Nepal"
              date="2023-08-15"
              status="Active"
              severity="High"
            />
            <IncidentCard 
              id="INC-2023-002"
              title="Landslide in Sindhupalchok"
              type="Landslide"
              location="Sindhupalchok, Nepal"
              date="2023-07-28"
              status="Active"
              severity="Critical"
            />
            <IncidentCard 
              id="INC-2023-005"
              title="Drought in Kailali"
              type="Drought"
              location="Kailali, Nepal"
              date="2023-05-20"
              status="Active"
              severity="Medium"
            />
          </div>
        </TabsContent>
        <TabsContent value="resolved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IncidentCard 
              id="INC-2023-003"
              title="Fire in Kathmandu Market"
              type="Fire"
              location="Kathmandu, Nepal"
              date="2023-09-05"
              status="Resolved"
              severity="Medium"
            />
            <IncidentCard 
              id="INC-2023-004"
              title="Earthquake in Dolakha"
              type="Earthquake"
              location="Dolakha, Nepal"
              date="2023-06-12"
              status="Resolved"
              severity="High"
            />
            <IncidentCard 
              id="INC-2023-006"
              title="Avalanche in Solukhumbu"
              type="Avalanche"
              location="Solukhumbu, Nepal"
              date="2023-02-10"
              status="Resolved"
              severity="High"
            />
          </div>
        </TabsContent>
        <TabsContent value="my-reports" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">Please log in to view your reported incidents</p>
            <Button asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <section id="report-incident" className="py-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Report a New Incident</h2>
        <IncidentForm />
      </section>
    </div>
  )
}

interface IncidentCardProps {
  id: string
  title: string
  type: string
  location: string
  date: string
  status: "Active" | "Resolved"
  severity: "Low" | "Medium" | "High" | "Critical"
}

function IncidentCard({ id, title, type, location, date, status, severity }: IncidentCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Active" 
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          }`}>
            {status}
          </div>
        </div>
        <CardDescription>{type} • {location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">ID</p>
            <p className="font-medium">{id}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date</p>
            <p className="font-medium">{date}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Severity</p>
            <p className={`font-medium ${
              severity === "Critical" ? "text-red-600 dark:text-red-400" :
              severity === "High" ? "text-orange-600 dark:text-orange-400" :
              severity === "Medium" ? "text-yellow-600 dark:text-yellow-400" :
              "text-green-600 dark:text-green-400"
            }`}>
              {severity}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/incidents/${id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}