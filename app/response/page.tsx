import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import ResponseForm from "@/components/ResponseForm"

export const metadata: Metadata = {
  title: "Response | Nepal Disaster Response System",
  description: "Coordinate and track disaster response activities across Nepal",
}

export default function ResponsePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Response Operations</h1>
          <p className="text-muted-foreground">
            Coordinate and track disaster response activities across Nepal
          </p>
        </div>
        <Button asChild>
          <Link href="#add-response">Add Response Action</Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="mb-8">
        <TabsList>
          <TabsTrigger value="active">Active Operations</TabsTrigger>
          <TabsTrigger value="planned">Planned Operations</TabsTrigger>
          <TabsTrigger value="completed">Completed Operations</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResponseCard 
              id="RES-OP-2023-001"
              title="Bardiya Flood Relief"
              type="Relief Distribution"
              location="Bardiya District"
              incident="Flooding in Bardiya District"
              status="Active"
              progress={65}
              startDate="2023-08-16"
              endDate="2023-09-30"
              team="Nepal Red Cross"
            />
            <ResponseCard 
              id="RES-OP-2023-002"
              title="Sindhupalchok Evacuation"
              type="Evacuation"
              location="Sindhupalchok"
              incident="Landslide in Sindhupalchok"
              status="Active"
              progress={40}
              startDate="2023-07-29"
              endDate="2023-09-15"
              team="Nepal Army"
            />
            <ResponseCard 
              id="RES-OP-2023-003"
              title="Kailali Water Supply"
              type="Resource Distribution"
              location="Kailali District"
              incident="Drought in Kailali"
              status="Active"
              progress={25}
              startDate="2023-05-25"
              endDate="2023-10-15"
              team="Nepal Water Supply Corporation"
            />
          </div>
        </TabsContent>
        <TabsContent value="planned" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResponseCard 
              id="RES-OP-2023-004"
              title="Eastern Nepal Flood Preparedness"
              type="Preparedness"
              location="Eastern Nepal"
              incident="Heavy Rainfall Expected in Eastern Nepal"
              status="Planned"
              progress={10}
              startDate="2023-09-20"
              endDate="2023-10-10"
              team="Nepal Disaster Risk Reduction Center"
            />
            <ResponseCard 
              id="RES-OP-2023-005"
              title="Solukhumbu Avalanche Monitoring"
              type="Monitoring"
              location="Solukhumbu"
              incident="Potential Avalanche in Solukhumbu"
              status="Planned"
              progress={5}
              startDate="2023-09-18"
              endDate="2023-11-30"
              team="Department of Hydrology and Meteorology"
            />
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResponseCard 
              id="RES-OP-2023-006"
              title="Kathmandu Market Fire Response"
              type="Emergency Response"
              location="Kathmandu"
              incident="Fire in Kathmandu Market"
              status="Completed"
              progress={100}
              startDate="2023-09-05"
              endDate="2023-09-07"
              team="Kathmandu Metropolitan Fire Department"
            />
            <ResponseCard 
              id="RES-OP-2023-007"
              title="Dolakha Earthquake Relief"
              type="Relief Distribution"
              location="Dolakha"
              incident="Earthquake in Dolakha"
              status="Completed"
              progress={100}
              startDate="2023-06-12"
              endDate="2023-07-30"
              team="Nepal Red Cross"
            />
            <ResponseCard 
              id="RES-OP-2023-008"
              title="Solukhumbu Avalanche Rescue"
              type="Search and Rescue"
              location="Solukhumbu"
              incident="Avalanche in Solukhumbu"
              status="Completed"
              progress={100}
              startDate="2023-02-10"
              endDate="2023-02-20"
              team="Nepal Army Mountain Rescue"
            />
          </div>
        </TabsContent>
      </Tabs>

      <section id="add-response" className="py-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Add Response Action</h2>
        <ResponseForm />
      </section>
    </div>
  )
}

interface ResponseCardProps {
  id: string
  title: string
  type: string
  location: string
  incident: string
  status: "Active" | "Planned" | "Completed"
  progress: number
  startDate: string
  endDate: string
  team: string
}

function ResponseCard({ 
  id, 
  title, 
  type, 
  location, 
  incident,
  status,
  progress,
  startDate,
  endDate,
  team
}: ResponseCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={
            status === "Active" ? "default" :
            status === "Planned" ? "secondary" :
            "outline"
          }>
            {status}
          </Badge>
        </div>
        <CardDescription>{type} • {location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Related Incident</p>
            <p className="text-sm font-medium">{incident}</p>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Start Date</p>
              <p className="font-medium">{startDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">End Date</p>
              <p className="font-medium">{endDate}</p>
            </div>
          </div>
          
          <div className="text-sm">
            <p className="text-muted-foreground">Response Team</p>
            <p className="font-medium">{team}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/response/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}