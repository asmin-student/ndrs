"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"
import { AlertTriangle, Droplets, Mountain, Flame, CloudRain } from "lucide-react"

// Fix for Leaflet icon issues in Next.js
const createIcon = (color: string) => {
  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

// Disaster data
const disasters = [
  {
    id: "alert-001",
    title: "Severe Flooding",
    type: "Flood",
    location: "Bardiya District",
    coordinates: [28.3102, 81.4279],
    severity: "Critical",
    radius: 15000,
    color: "#ef4444",
    icon: <Droplets className="h-4 w-4 mr-1" />,
    markerColor: "red"
  },
  {
    id: "alert-002",
    title: "Landslide Warning",
    type: "Landslide",
    location: "Sindhupalchok",
    coordinates: [27.9512, 85.6846],
    severity: "High",
    radius: 8000,
    color: "#f97316",
    icon: <Mountain className="h-4 w-4 mr-1" />,
    markerColor: "orange"
  },
  {
    id: "alert-003",
    title: "Drought Conditions",
    type: "Drought",
    location: "Kailali District",
    coordinates: [28.8319, 80.8986],
    severity: "Medium",
    radius: 20000,
    color: "#eab308",
    icon: <CloudRain className="h-4 w-4 mr-1" />,
    markerColor: "yellow"
  },
  {
    id: "alert-004",
    title: "Potential Avalanche",
    type: "Avalanche",
    location: "Solukhumbu",
    coordinates: [27.7909, 86.7140],
    severity: "Medium",
    radius: 5000,
    color: "#eab308",
    icon: <Mountain className="h-4 w-4 mr-1" />,
    markerColor: "yellow"
  },
  {
    id: "alert-005",
    title: "Heavy Rainfall Expected",
    type: "Rainfall",
    location: "Eastern Nepal",
    coordinates: [26.6799, 87.2775],
    severity: "Medium",
    radius: 25000,
    color: "#eab308",
    icon: <CloudRain className="h-4 w-4 mr-1" />,
    markerColor: "yellow"
  }
]

// Map center for Nepal
const NEPAL_CENTER = [28.3949, 84.1240]
const DEFAULT_ZOOM = 7

// Component to handle map view changes
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  
  return null
}

interface DisasterMapProps {
  selectedAlert?: string | null
}

export default function DisasterMap({ selectedAlert }: DisasterMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(NEPAL_CENTER)
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM)
  
  useEffect(() => {
    if (selectedAlert) {
      const disaster = disasters.find(d => d.id === selectedAlert)
      if (disaster) {
        setMapCenter(disaster.coordinates as [number, number])
        setMapZoom(10)
      }
    } else {
      setMapCenter(NEPAL_CENTER)
      setMapZoom(DEFAULT_ZOOM)
    }
  }, [selectedAlert])
  
  return (
    <div className="h-full w-full relative z-10">
      <MapContainer
        center={NEPAL_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={mapCenter} zoom={mapZoom} />
        
        {disasters.map((disaster) => (
          <div key={disaster.id}>
            <Marker 
              position={disaster.coordinates as [number, number]} 
              icon={createIcon(disaster.markerColor)}
            >
              <Popup>
                <div className="p-1">
                  <div className="font-bold flex items-center">
                    {disaster.icon}
                    {disaster.title}
                  </div>
                  <div className="text-sm mt-1">
                    <p><strong>Type:</strong> {disaster.type}</p>
                    <p><strong>Location:</strong> {disaster.location}</p>
                    <p><strong>Severity:</strong> {disaster.severity}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
            
            <Circle
              center={disaster.coordinates as [number, number]}
              radius={disaster.radius}
              pathOptions={{ 
                fillColor: disaster.color, 
                fillOpacity: 0.2, 
                color: disaster.color, 
                weight: 1 
              }}
            />
          </div>
        ))}
      </MapContainer>
    </div>
  )
}