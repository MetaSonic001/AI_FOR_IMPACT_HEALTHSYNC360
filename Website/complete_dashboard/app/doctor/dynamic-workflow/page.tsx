'use client'

import { useState, useEffect } from 'react'

type Appointment = {
  id: number
  patientName: string
  time: string
  priority: 'Low' | 'Medium' | 'High' | 'Emergency'
  type: 'In-person' | 'Teleconsultation' | 'Surgery'
}

export default function DynamicWorkflowManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Mock data generation
    const mockAppointments: Appointment[] = [
      { id: 1, patientName: 'John Doe', time: '09:00', priority: 'Medium', type: 'In-person' },
      { id: 2, patientName: 'Jane Smith', time: '10:00', priority: 'High', type: 'Teleconsultation' },
      { id: 3, patientName: 'Bob Johnson', time: '11:00', priority: 'Low', type: 'In-person' },
      { id: 4, patientName: 'Alice Brown', time: '13:00', priority: 'Emergency', type: 'Surgery' },
    ]
    setAppointments(mockAppointments)

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handlePriorityChange = (id: number, newPriority: Appointment['priority']) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === id ? { ...appointment, priority: newPriority } : appointment
      )
    )
  }

  const sortedAppointments = [...appointments].sort((a, b) => {
    const priorityOrder = { Emergency: 0, High: 1, Medium: 2, Low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dynamic Workflow Management</h1>
      <p className="mb-4">Current Time: {currentTime.toLocaleTimeString()}</p>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAppointments.map(appointment => (
            <tr key={appointment.id} className={
              appointment.priority === 'Emergency' ? 'bg-red-100' :
              appointment.priority === 'High' ? 'bg-yellow-100' :
              appointment.priority === 'Medium' ? 'bg-blue-100' :
              'bg-green-100'
            }>
              <td className="p-2">{appointment.time}</td>
              <td className="p-2">{appointment.patientName}</td>
              <td className="p-2">{appointment.type}</td>
              <td className="p-2">{appointment.priority}</td>
              <td className="p-2">
                <select
                  value={appointment.priority}
                  onChange={(e) => handlePriorityChange(appointment.id, e.target.value as Appointment['priority'])}
                  className="p-1 border rounded"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

