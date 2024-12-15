"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const mockPatientData = [
  { id: 1, name: "John Doe", age: 45, riskScore: 0.8, condition: "Sepsis" },
  { id: 2, name: "Jane Smith", age: 62, riskScore: 0.6, condition: "Cardiac Arrest" },
  { id: 3, name: "Mike Johnson", age: 55, riskScore: 0.4, condition: "Respiratory Failure" },
]

const mockVitalsData = [
  { time: '00:00', heartRate: 72, bloodPressure: 120, oxygenSaturation: 98 },
  { time: '04:00', heartRate: 75, bloodPressure: 122, oxygenSaturation: 97 },
  { time: '08:00', heartRate: 80, bloodPressure: 126, oxygenSaturation: 96 },
  { time: '12:00', heartRate: 78, bloodPressure: 124, oxygenSaturation: 97 },
  { time: '16:00', heartRate: 76, bloodPressure: 121, oxygenSaturation: 98 },
  { time: '20:00', heartRate: 74, bloodPressure: 119, oxygenSaturation: 99 },
]

export default function EarlyDetection() {
  const [selectedPatient, setSelectedPatient] = useState<{ id: number; name: string; age: number; riskScore: number; condition: string } | null>(null)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">AI-Powered Early Detection</h2>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Patient Risk Analysis</CardTitle>
              <CardDescription>AI-powered early detection of critical conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Potential Condition</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPatientData.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.riskScore.toFixed(2)}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>
                        <Button onClick={() => setSelectedPatient(patient)}>View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis">
          {selectedPatient ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedPatient.name} - Detailed Analysis</CardTitle>
                <CardDescription>Risk Score: {selectedPatient.riskScore.toFixed(2)} - Potential Condition: {selectedPatient.condition}</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTitle>High Risk Detected</AlertTitle>
                  <AlertDescription>
                    This patient shows signs of {selectedPatient.condition}. Immediate attention is recommended.
                  </AlertDescription>
                </Alert>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Vitals Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockVitalsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
                      <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" name="Blood Pressure" />
                      <Line type="monotone" dataKey="oxygenSaturation" stroke="#ffc658" name="Oxygen Saturation" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <p className="text-center py-8">Select a patient from the Risk Overview to view detailed analysis.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

