'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Brain, Calendar, FileText, Lightbulb, Network, Users, Workflow } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DoctorDashboard() {
  const [patientCount, setPatientCount] = useState(0)
  const [appointmentCount, setAppointmentCount] = useState(0)
  const [pendingTestsCount, setPendingTestsCount] = useState(0)

  useEffect(() => {
    // Simulating data fetching
    setPatientCount(150)
    setAppointmentCount(8)
    setPendingTestsCount(5)
  }, [])

  const features = [
    { name: 'Patient EHR', icon: FileText, href: '/doctor/ehr' },
    { name: 'Appointment Schedule', icon: Calendar, href: '/doctor/appointments' },
    { name: 'Case Summary Generator', icon: FileText, href: '/doctor/case-summary' },
    { name: 'Clinical Decision Support', icon: Brain, href: '/doctor/clinical-decision' },
    { name: 'Patient Insights', icon: Users, href: '/doctor/patient-insights' },
    { name: 'Integrated Diagnostic Assistant', icon: Activity, href: '/doctor/integrated-diagnostic-assistant' },
    { name: 'Dynamic Workflow Management', icon: Workflow, href: '/doctor/dynamic-workflow' },
    { name: 'Specialist Collaboration Hub', icon: Network, href: '/doctor/collaboration-hub' },
    { name: 'Predictive Treatment Planner', icon: Lightbulb, href: '/doctor/treatment-planner' },
    { name: 'Risk Management Dashboard', icon: AlertTriangle, href: '/doctor/risk-management' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Test Results</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTestsCount}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {features.map((feature) => (
          <Link key={feature.name} href={feature.href}>
            <Button variant="outline" className="w-full h-full">
              <feature.icon className="mr-2 h-4 w-4" />
              {feature.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

