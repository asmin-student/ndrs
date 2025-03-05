"use client"

import { useState } from "react"
import { Metadata } from "next"
import { AlertTriangle, Info, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DisasterMap from "@/components/DisasterMap"

export const metadata: Metadata = {
  title: "Alerts | Nepal Disaster Response System",
  description: "View active disaster alerts and warnings across Nepal",
}

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disaster Alerts</h1>
          <p className="text-muted-foreground">
            View active disaster alerts and warnings across Nepal
          </p>
        </div>
      </div>

      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Critical Alert</AlertTitle>
        <AlertDescription>
          Severe flooding reported in Bardiya District. Evacuation orders in effect for low-lying areas.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Disaster Map</CardTitle>
              <CardDescription>
                Interactive map showing active disaster zones and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full rounded-md border overflow-hidden">
                <DisasterMap selectedAlert={selectedAlert} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="active" className="mb-6">
            <TabsList className="w-full">
              <TabsTrigger value="active" className="flex-1">Active Alerts</TabsTrigger>
              <TabsTrigger value="warnings" className="flex-1">Warnings</TabsTrigger>
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4 space-y-4">
              <AlertCard
                id="alert-001"
                title="Severe Flooding"
                location="Bardiya District"
                severity="Critical"
                date="2023-09-15"
                description="Heavy rainfall has caused severe flooding in Bardiya District. Multiple villages affected with reports of infrastructure damage."
                onSelect={() => setSelectedAlert("alert-001")}
                isSelected={selectedAlert === "alert-001"}
              />
              <AlertCard
                id="alert-002"
                title="Landslide Warning"
                location="Sindhupalchok"
                severity="High"
                date="2023-09-14"
                description="Continuous rainfall has increased the risk of landslides in Sindhupalchok area. Residents advised to be vigilant and prepare for possible evacuation."
                onSelect={() => setSelectedAlert("alert-002")}
                isSelected={selectedAlert === "alert-002"}
              />
              <AlertCard
                id="alert-003"
                title="Drought Conditions"
                location="Kailali District"
                severity="Medium"
                date="2023-09-10"
                description="Persistent drought conditions affecting agricultural activities in Kailali. Water conservation measures recommended."
                onSelect={() => setSelectedAlert("alert-003")}
                isSelected={selectedAlert === "alert-003"}
              />
            </TabsContent>
            <TabsContent value="warnings" className="mt-4 space-y-4">
              <AlertCard
                id="alert-004"
                title="Potential Avalanche"
                location="Solukhumbu"
                severity="Medium"
                date="2023-09-13"
                description="Increased risk of avalanches in higher elevations of Solukhumbu. Trekkers and climbers advised to exercise caution."
                onSelect={() => setSelectedAlert("alert-004")}
                isSelected={selectedAlert === "alert-004"}
              />
              <AlertCard
                id="alert-005"
                title="Heavy Rainfall Expected"
                location="Eastern Nepal"
                severity="Medium"
                date="2023-09-12"
                description="Meteorological forecast predicts heavy rainfall in Eastern Nepal over the next 48 hours. Flash flood risk in low-lying areas."
                onSelect={() => setSelectedAlert("alert-005")}
                isSelected={selectedAlert === "alert-005"}
              />
            </TabsContent>
            <TabsContent value="all" className="mt-4 space-y-4">
              <AlertCard
                id="alert-001"
                title="Severe Flooding"
                location="Bardiya District"
                severity="Critical"
                date="2023-09-15"
                description="Heavy rainfall has caused severe flooding in Bardiya District. Multiple villages affected with reports of infrastructure damage."
                onSelect={() => setSelectedAlert("alert-001")}
                isSelected={selectedAlert === "alert-001"}
              />
              <AlertCard
                id="alert-002"
                title="Landslide Warning"
                location="Sindhupalchok"
                severity="High"
                date="2023-09-14"
                description="Continuous rainfall has increased the risk of landslides in Sindhupalchok area. Residents advised to be vigilant and prepare for possible evacuation."
                onSelect={() => setSelectedAlert("alert-002")}
                isSelected={selectedAlert === "alert-002"}
              />
              <AlertCard
                id="alert-004"
                title="Potential Avalanche"
                location="Solukhumbu"
                severity="Medium"
                date="2023-09-13"
                description="Increased risk of avalanches in higher elevations of Solukhumbu. Trekkers and climbers advised to exercise caution."
                onSelect={() => setSelectedAlert("alert-004")}
                isSelected={selectedAlert === "alert-004"}
              />
              <AlertCard
                id="alert-005"
                title="Heavy Rainfall Expected"
                location="Eastern Nepal"
                severity="Medium"
                date="2023-09-12"
                description="Meteorological forecast predicts heavy rainfall in Eastern Nepal over the next 48 hours. Flash flood risk in low-lying areas."
                onSelect={() => setSelectedAlert("alert-005")}
                isSelected={selectedAlert === "alert-005"}
              />
              <AlertCard
                id="alert-003"
                title="Drought Conditions"
                location="Kailali District"
                severity="Medium"
                date="2023-09-10"
                description="Persistent drought conditions affecting agricultural activities in Kailali. Water conservation measures recommended."
                onSelect={() => setSelectedAlert("alert-003")}
                isSelected={selectedAlert === "alert-003"}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Emergency Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Flood Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Move to higher ground immediately</li>
                <li>Do not walk or drive through flood waters</li>
                <li>Stay away from power lines and electrical wires</li>
                <li>Be prepared to evacuate</li>
                <li>Follow instructions from local authorities</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Landslide Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Be alert for unusual sounds that might indicate moving debris</li>
                <li>If you are near a stream, be alert for sudden changes in water level</li>
                <li>Move away from the path of a landslide as quickly as possible</li>
                <li>Avoid river valleys and low-lying areas during heavy rainfall</li>
                <li>Contact local authorities if you notice signs of land movement</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Earthquake Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Drop, cover, and hold on during shaking</li>
                <li>Stay away from windows, outside walls, and anything that could fall</li>
                <li>If outdoors, stay in open areas away from buildings and power lines</li>
                <li>After shaking stops, check yourself and others for injuries</li>
                <li>Be prepared for aftershocks</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface AlertCardProps {
  id: string
  title: string
  location: string
  severity: "Low" | "Medium" | "High" | "Critical"
  date: string
  description: string
  onSelect: () => void
  isSelected: boolean
}

function AlertCard({ 
  id, 
  title, 
  location, 
  severity, 
  date, 
  description,
  onSelect,
  isSelected
}: AlertCardProps) {
  return (
    <Card className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`} onClick={onSelect}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant={
            severity === "Critical" ? "destructive" :
            severity === "High" ? "default" :
            severity === "Medium" ? "secondary" :
            "outline"
          }>
            {severity}
          </Badge>
        </div>
        <CardDescription className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" /> {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-muted-foreground">{date}</span>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Info className="h-3.5 w-3.5 mr-1" /> Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}