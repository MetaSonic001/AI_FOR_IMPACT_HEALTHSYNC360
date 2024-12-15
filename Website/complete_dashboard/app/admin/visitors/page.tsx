'use client'

import { useState } from 'react'

type Visitor = {
  id: number
  name: string
  visitingPatient: string
  checkInTime: string
  checkOutTime: string | null
}

const mockVisitors: Visitor[] = [
  { id: 1, name: 'Alice Brown', visitingPatient: 'John Doe', checkInTime: '09:30', checkOutTime: null },
  { id: 2, name: 'Bob Wilson', visitingPatient: 'Jane Smith', checkInTime: '10:15', checkOutTime: '11:00' },
  { id: 3, name: 'Carol Davis', visitingPatient: 'Mike Johnson', checkInTime: '11:45', checkOutTime: null },
]

export default function VisitorManagement() {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors)
  const [newVisitor, setNewVisitor] = useState({ name: '', visitingPatient: '' })

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    const checkInTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
    setVisitors([...visitors, { ...newVisitor, id: visitors.length + 1, checkInTime, checkOutTime: null }])
    setNewVisitor({ name: '', visitingPatient: '' })
  }

  const handleCheckOut = (id: number) => {
    const now = new Date()
    const checkOutTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
    setVisitors(prevVisitors =>
      prevVisitors.map(visitor =>
        visitor.id === id ? { ...visitor, checkOutTime } : visitor
      )
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Visitor Management</h1>
      <form onSubmit={handleCheckIn} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Visitor Name"
            value={newVisitor.name}
            onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
            className="flex-grow px-2 py-1 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Visiting Patient"
            value={newVisitor.visitingPatient}
            onChange={(e) => setNewVisitor({ ...newVisitor, visitingPatient: e.target.value })}
            className="flex-grow px-2 py-1 border rounded"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Check In
          </button>
        </div>
      </form>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Visitor Name</th>
            <th className="p-2 text-left">Visiting Patient</th>
            <th className="p-2 text-left">Check-In Time</th>
            <th className="p-2 text-left">Check-Out Time</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map(visitor => (
            <tr key={visitor.id}>
              <td className="p-2">{visitor.name}</td>
              <td className="p-2">{visitor.visitingPatient}</td>
              <td className="p-2">{visitor.checkInTime}</td>
              <td className="p-2">{visitor.checkOutTime || 'Not checked out'}</td>
              <td className="p-2">
                {!visitor.checkOutTime && (
                  <button
                    onClick={() => handleCheckOut(visitor.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Check Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

