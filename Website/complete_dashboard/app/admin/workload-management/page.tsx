"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'

const mockShifts = [
  { id: 1, name: "John Doe", role: "Nurse", startTime: "07:00", endTime: "15:00", status: "Active" },
  { id: 2, name: "Jane Smith", role: "Doctor", startTime: "08:00", endTime: "16:00", status: "Active" },
  { id: 3, name: "Mike Johnson", role: "Technician", startTime: "15:00", endTime: "23:00", status: "Upcoming" },
]

export default function WorkloadManagement() {
  const [shifts, setShifts] = useState(mockShifts)

  interface Shift {
    id: number;
    name: string;
    role: string;
    startTime: string;
    endTime: string;
    status: string;
  }

  const handleEndShift = (id: number): void => {
    setShifts(shifts.map((shift: Shift) => 
      shift.id === id ? { ...shift, status: "Ended" } : shift
    ))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Workload Management</h2>
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Shifts</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
          <TabsTrigger value="handover">Shift Handover</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Shifts</CardTitle>
              <CardDescription>View and manage ongoing shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.filter(shift => shift.status === "Active").map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>{shift.name}</TableCell>
                      <TableCell>{shift.role}</TableCell>
                      <TableCell>{shift.startTime}</TableCell>
                      <TableCell>{shift.endTime}</TableCell>
                      <TableCell>{shift.status}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEndShift(shift.id)}>End Shift</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Shifts</CardTitle>
              <CardDescription>View and manage upcoming shifts</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add table for upcoming shifts */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="handover">
          <Card>
            <CardHeader>
              <CardTitle>Shift Handover</CardTitle>
              <CardDescription>Manage shift handovers and transfer responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Start Handover</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Shift Handover</DialogTitle>
                    <DialogDescription>
                      Provide details for the incoming staff member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="outgoing">Outgoing Staff</Label>
                      <Input id="outgoing" defaultValue="John Doe" disabled />
                    </div>
                    <div>
                      <Label htmlFor="incoming">Incoming Staff</Label>
                      <Input id="incoming" placeholder="Enter name" />
                    </div>
                    <div>
                      <Label htmlFor="notes">Handover Notes</Label>
                      <Textarea id="notes" placeholder="Enter important information for the next shift" />
                    </div>
                    <Button>Complete Handover</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

