"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from 'react'

const mockEmergencies = [
  { id: 1, type: "Cardiac Arrest", location: "Room 302", status: "In Progress", eta: "2 min" },
  { id: 2, type: "Severe Trauma", location: "ER Bay 1", status: "Pending", eta: "5 min" },
  { id: 3, type: "Stroke", location: "ICU", status: "Resolved", eta: "-" },
]

export default function EmergencyResponse() {
  const [activeEmergencies, setActiveEmergencies] = useState(mockEmergencies)

  interface Emergency {
    id: number;
    type: string;
    location: string;
    status: string;
    eta: string;
  }

  const handleResolve = (id: number): void => {
    setActiveEmergencies(activeEmergencies.map((emergency: Emergency) => 
      emergency.id === id ? { ...emergency, status: "Resolved", eta: "-" } : emergency
    ))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Emergency Response Optimization</h2>
      
      <Alert variant="destructive">
        <AlertTitle>Active Emergency</AlertTitle>
        <AlertDescription>
          Cardiac Arrest reported in Room 302. ETA for response team: 2 minutes.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Active Emergencies</CardTitle>
          <CardDescription>Real-time tracking of emergency situations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emergency Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeEmergencies.map((emergency) => (
                <TableRow key={emergency.id}>
                  <TableCell>{emergency.type}</TableCell>
                  <TableCell>{emergency.location}</TableCell>
                  <TableCell>
                    <Badge variant={emergency.status === "Resolved" ? "secondary" : "destructive"}>
                      {emergency.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{emergency.eta}</TableCell>
                  <TableCell>
                    {emergency.status !== "Resolved" && (
                      <Button onClick={() => handleResolve(emergency.id)}>Resolve</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Response Map</CardTitle>
          <CardDescription>Real-time tracking of ambulances and emergency personnel</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Google Maps integration */}
          <div className="bg-gray-200 h-[400px] flex items-center justify-center">
            <p>Google Maps Integration Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

