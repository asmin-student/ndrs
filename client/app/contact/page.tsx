"use client"

import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"

// Singha Durbar coordinates
const OFFICE_LOCATION = [27.6994, 85.3209]

const markerIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input placeholder="Your name" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="Message subject" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Your message" 
                  className="min-h-[150px]"
                />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p>Singha Durbar</p>
                  <p>Kathmandu, Nepal</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>+977-1-4200000</p>
                  <p>Emergency: 112</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>info@nepaldrs.gov.np</p>
                  <p>support@nepaldrs.gov.np</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Hours</h3>
                  <p>24/7 Emergency Response</p>
                  <p>Office: Sun-Fri 9:00-17:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="h-[400px] rounded-lg overflow-hidden border">
            <MapContainer 
              center={OFFICE_LOCATION} 
              zoom={16} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={OFFICE_LOCATION} icon={markerIcon}>
                <Popup>
                  Nepal Disaster Response System<br />
                  Singha Durbar, Kathmandu
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}