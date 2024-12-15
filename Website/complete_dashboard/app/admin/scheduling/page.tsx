'use client'

import { useState } from 'react'

type Employee = {
  id: number
  name: string
  role: string
  availability: string[]
}

type Shift = {
  id: number
  day: string
  startTime: string
  endTime: string
  assignedTo: number | null
}

const mockEmployees: Employee[] = [
  { id: 1, name: 'Alice Johnson', role: 'Nurse', availability: ['Monday', 'Tuesday', 'Wednesday'] },
  { id: 2, name: 'Bob Smith', role: 'Doctor', availability: ['Thursday', 'Friday', 'Saturday'] },
  { id: 3, name: 'Carol Williams', role: 'Nurse', availability: ['Wednesday', 'Thursday', 'Friday'] },
]

const mockShifts: Shift[] = [
  { id: 1, day: 'Monday', startTime: '08:00', endTime: '16:00', assignedTo: null },
  { id: 2, day: 'Tuesday', startTime: '16:00', endTime: '00:00', assignedTo: null },
  { id: 3, day: 'Wednesday', startTime: '00:00', endTime: '08:00', assignedTo: null },
  { id: 4, day: 'Thursday', startTime: '08:00', endTime: '16:00', assignedTo: null },
  { id: 5, day: 'Friday', startTime: '16:00', endTime: '00:00', assignedTo: null },
]

export default function SchedulingAssistant() {
  const [employees] = useState<Employee[]>(mockEmployees)
  const [shifts, setShifts] = useState<Shift[]>(mockShifts)

  const handleAssignShift = (shiftId: number, employeeId: number | null) => {
    setShifts(prevShifts =>
      prevShifts.map(shift =>
        shift.id === shiftId ? { ...shift, assignedTo: employeeId } : shift
      )
    )
  }

  const getEmployeeName = (employeeId: number | null) => {
    if (employeeId === null) return 'Unassigned'
    const employee = employees.find(e => e.id === employeeId)
    return employee ? employee.name : 'Unknown'
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI-Powered Scheduling Assistant</h1>
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Day</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Assigned To</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map(shift => (
            <tr key={shift.id} className={shift.assignedTo ? 'bg-green-100' : 'bg-yellow-100'}>
              <td className="p-2">{shift.day}</td>
              <td className="p-2">{shift.startTime} - {shift.endTime}</td>
              <td className="p-2">{getEmployeeName(shift.assignedTo)}</td>
              <td className="p-2">
                <select
                  value={shift.assignedTo || ''}
                  onChange={(e) => handleAssignShift(shift.id, e.target.value ? Number(e.target.value) : null)}
                  className="p-1 border rounded"
                >
                  <option value="">Unassigned</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} ({employee.role})
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-bold mb-2">Employee Availability</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id} className="mb-2">
            <strong>{employee.name}</strong> ({employee.role}): {employee.availability.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
}

