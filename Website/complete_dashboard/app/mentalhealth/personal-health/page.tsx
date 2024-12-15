"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const mockHealthData = [
  { date: '2023-06-01', steps: 8000, heartRate: 72, sleepHours: 7 },
  { date: '2023-06-02', steps: 10000, heartRate: 70, sleepHours: 7.5 },
  { date: '2023-06-03', steps: 7500, heartRate: 73, sleepHours: 6.5 },
  { date: '2023-06-04', steps: 9000, heartRate: 71, sleepHours: 8 },
  { date: '2023-06-05', steps: 11000, heartRate: 69, sleepHours: 7 },
  { date: '2023-06-06', steps: 8500, heartRate: 72, sleepHours: 7.5 },
  { date: '2023-06-07', steps: 9500, heartRate: 70, sleepHours: 8 },
]

export default function PersonalHealth() {
  const [selectedMetric, setSelectedMetric] = useState('steps')


  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Personal Health Tracking</h2>
      
      <Alert>
        <AlertTitle>Wellness Reminder</AlertTitle>
        <AlertDescription>
          Don&apos;t forget to take a short walk and stay hydrated during your shift!
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Health Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Daily Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockHealthData[mockHealthData.length - 1].steps}</div>
                <Progress value={(mockHealthData[mockHealthData.length - 1].steps / 10000) * 100} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Heart Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockHealthData[mockHealthData.length - 1].heartRate} bpm</div>
                <Progress value={((mockHealthData[mockHealthData.length - 1].heartRate - 60) / (100 - 60)) * 100} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sleep Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockHealthData[mockHealthData.length - 1].sleepHours} hours</div>
                <Progress value={(mockHealthData[mockHealthData.length - 1].sleepHours / 8) * 100} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
              <CardDescription>Track your health metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-x-4 mb-4">
                <button 
                  className={`px-3 py-1 rounded ${selectedMetric === 'steps' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                  onClick={() => setSelectedMetric('steps')}
                >
                  Steps
                </button>
                <button 
                  className={`px-3 py-1 rounded ${selectedMetric === 'heartRate' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                  onClick={() => setSelectedMetric('heartRate')}
                >
                  Heart Rate
                </button>
                <button 
                  className={`px-3 py-1 rounded ${selectedMetric === 'sleepHours' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                  onClick={() => setSelectedMetric('sleepHours')}
                >
                  Sleep Hours
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

