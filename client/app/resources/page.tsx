import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import ResourceForm from "@/components/ResourceForm"

export const metadata: Metadata = {
  title: "Resources | Nepal Disaster Response System",
  description: "Track and manage disaster response resources across Nepal",
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Management</h1>
          <p className="text-muted-foreground">
            Track and manage disaster response resources across Nepal
          </p>
        </div>
        <Button asChild>
          <Link href="#add-resource">Add Resource</Link>
        </Button>
      </div>

      <Tabs defaultValue="available" className="mb-8">
        <TabsList>
          <TabsTrigger value="available">Available Resources</TabsTrigger>
          <TabsTrigger value="deployed">Deployed Resources</TabsTrigger>
          <TabsTrigger value="requested">Requested Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard 
              id="RES-2023-001"
              name="Emergency Food Supplies"
              type="Food"
              location="Kathmandu Central Warehouse"
              quantity={1500}
              unit="Packages"
              status="Available"
              lastUpdated="2023-09-15"
            />
            <ResourceCard 
              id="RES-2023-002"
              name="Medical Kits"
              type="Medical"
              location="Pokhara Regional Hospital"
              quantity={250}
              unit="Kits"
              status="Available"
              lastUpdated="2023-09-10"
            />
            <ResourceCard 
              id="RES-2023-003"
              name="Tents"
              type="Shelter"
              location="Nepalgunj Distribution Center"
              quantity={120}
              unit="Units"
              status="Available"
              lastUpdated="2023-09-05"
            />
            <ResourceCard 
              id="RES-2023-004"
              name="Water Purification Tablets"
              type="Water"
              location="Biratnagar Supply Hub"
              quantity={5000}
              unit="Tablets"
              status="Available"
              lastUpdated="2023-09-12"
            />
            <ResourceCard 
              id="RES-2023-005"
              name="Blankets"
              type="Shelter"
              location="Kathmandu Central Warehouse"
              quantity={800}
              unit="Units"
              status="Available"
              lastUpdated="2023-09-08"
            />
            <ResourceCard 
              id="RES-2023-006"
              name="Rescue Equipment"
              type="Equipment"
              location="Kathmandu Emergency Response Center"
              quantity={15}
              unit="Sets"
              status="Available"
              lastUpdated="2023-09-01"
            />
          </div>
        </TabsContent>
        <TabsContent value="deployed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard 
              id="RES-2023-007"
              name="Emergency Food Supplies"
              type="Food"
              location="Bardiya District"
              quantity={500}
              unit="Packages"
              status="Deployed"
              lastUpdated="2023-08-20"
              deployedTo="Flooding in Bardiya District"
            />
            <ResourceCard 
              id="RES-2023-008"
              name="Medical Kits"
              type="Medical"
              location="Sindhupalchok"
              quantity={100}
              unit="Kits"
              status="Deployed"
              lastUpdated="2023-08-15"
              deployedTo="Landslide in Sindhupalchok"
            />
            <ResourceCard 
              id="RES-2023-009"
              name="Tents"
              type="Shelter"
              location="Dolakha"
              quantity={50}
              unit="Units"
              status="Deployed"
              lastUpdated="2023-07-10"
              deployedTo="Earthquake in Dolakha"
            />
          </div>
        </TabsContent>
        <TabsContent value="requested" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard 
              id="RES-2023-010"
              name="Water Purification Systems"
              type="Water"
              location="Requested for Kailali"
              quantity={10}
              unit="Systems"
              status="Requested"
              lastUpdated="2023-09-14"
              requestedFor="Drought in Kailali"
              fulfillmentStatus={30}
            />
            <ResourceCard 
              id="RES-2023-011"
              name="Emergency Food Supplies"
              type="Food"
              location="Requested for Bardiya"
              quantity={1000}
              unit="Packages"
              status="Requested"
              lastUpdated="2023-09-13"
              requestedFor="Flooding in Bardiya District"
              fulfillmentStatus={60}
            />
            <ResourceCard 
              id="RES-2023-012"
              name="Medical Personnel"
              type="Personnel"
              location="Requested for Sindhupalchok"
              quantity={20}
              unit="Staff"
              status="Requested"
              lastUpdated="2023-09-10"
              requestedFor="Landslide in Sindhupalchok"
              fulfillmentStatus={10}
            />
          </div>
        </TabsContent>
      </Tabs>

      <section id="add-resource" className="py-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Add New Resource</h2>
        <ResourceForm />
      </section>
    </div>
  )
}

interface ResourceCardProps {
  id: string
  name: string
  type: string
  location: string
  quantity: number
  unit: string
  status: "Available" | "Deployed" | "Requested"
  lastUpdated: string
  deployedTo?: string
  requestedFor?: string
  fulfillmentStatus?: number
}

function ResourceCard({ 
  id, 
  name, 
  type, 
  location, 
  quantity, 
  unit, 
  status, 
  lastUpdated,
  deployedTo,
  requestedFor,
  fulfillmentStatus
}: ResourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Available" 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
              : status === "Deployed"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
          }`}>
            {status}
          </div>
        </div>
        <CardDescription>{type} • {location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">ID</p>
            <p className="font-medium">{id}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Quantity</p>
            <p className="font-medium">{quantity} {unit}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Updated</p>
            <p className="font-medium">{lastUpdated}</p>
          </div>
        </div>
        
        {deployedTo && (
          <div className="mt-2 text-sm">
            <p className="text-muted-foreground">Deployed To:</p>
            <p className="font-medium">{deployedTo}</p>
          </div>
        )}
        
        {requestedFor && (
          <div className="mt-2 text-sm">
            <p className="text-muted-foreground">Requested For:</p>
            <p className="font-medium">{requestedFor}</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Fulfillment Status</span>
                <span>{fulfillmentStatus}%</span>
              </div>
              <Progress value={fulfillmentStatus} className="h-2" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/resources/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}