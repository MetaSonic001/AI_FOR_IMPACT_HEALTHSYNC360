"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from 'react'

const mockMedications = [
  { id: 1, name: "Ibuprofen", quantity: 500, expirationDate: "2024-12-31" },
  { id: 2, name: "Amoxicillin", quantity: 200, expirationDate: "2023-10-15" },
  { id: 3, name: "Lisinopril", quantity: 100, expirationDate: "2025-06-30" },
  { id: 4, name: "Metformin", quantity: 300, expirationDate: "2024-08-31" },
]

export default function MedicationManagement() {
  const [medications, setMedications] = useState(mockMedications)
  const [newMedication, setNewMedication] = useState({ name: '', quantity: '', expirationDate: '' })

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.quantity && newMedication.expirationDate) {
      setMedications([...medications, { ...newMedication, id: Date.now(), quantity: Number(newMedication.quantity) }])
      setNewMedication({ name: '', quantity: '', expirationDate: '' })
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Medication Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
          <CardDescription>Overview of medication stock levels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((med) => (
                <TableRow key={med.id}>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.quantity}</TableCell>
                  <TableCell>{med.expirationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Add New Medication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Medication Name"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={newMedication.quantity}
              onChange={(e) => setNewMedication({ ...newMedication, quantity: e.target.value })}
            />
            <Input
              type="date"
              value={newMedication.expirationDate}
              onChange={(e) => setNewMedication({ ...newMedication, expirationDate: e.target.value })}
            />
            <Button onClick={handleAddMedication}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <Alert>
        <AlertTitle>Low Stock Alert</AlertTitle>
        <AlertDescription>
          Amoxicillin is running low. Current stock: 200 units.
        </AlertDescription>
      </Alert>
    </div>
  )
}
