'use client'

import { useState } from 'react'

type Specialist = {
  id: number
  name: string
  specialty: string
  availability: 'Available' | 'Busy' | 'Offline'
}

type CollaborationRequest = {
  id: number
  patientName: string
  requestingDoctor: string
  specialty: string
  status: 'Pending' | 'Accepted' | 'Completed'
}

const mockSpecialists: Specialist[] = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', availability: 'Available' },
  { id: 2, name: 'Dr. Michael Lee', specialty: 'Neurology', availability: 'Busy' },
  { id: 3, name: 'Dr. Emily Chen', specialty: 'Oncology', availability: 'Available' },
  { id: 4, name: 'Dr. David Brown', specialty: 'Orthopedics', availability: 'Offline' },
]

export default function CollaborationHub() {
  const [specialists] = useState<Specialist[]>(mockSpecialists)
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([])
  const [newRequest, setNewRequest] = useState({
    patientName: '',
    specialty: '',
  })

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const newCollaborationRequest: CollaborationRequest = {
      id: collaborationRequests.length + 1,
      patientName: newRequest.patientName,
      requestingDoctor: 'Dr. Current User',
      specialty: newRequest.specialty,
      status: 'Pending',
    }
    setCollaborationRequests([...collaborationRequests, newCollaborationRequest])
    setNewRequest({ patientName: '', specialty: '' })
  }

  const handleUpdateStatus = (id: number, newStatus: CollaborationRequest['status']) => {
    setCollaborationRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Specialist Collaboration Hub</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Available Specialists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialists.map(specialist => (
            <div key={specialist.id} className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">{specialist.name}</h3>
              <p>{specialist.specialty}</p>
              <p className={`
                ${specialist.availability === 'Available' ? 'text-green-500' : ''}
                ${specialist.availability === 'Busy' ? 'text-yellow-500' : ''}
                ${specialist.availability === 'Offline' ? 'text-red-500' : ''}
              `}>
                {specialist.availability}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Request Collaboration</h2>
        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              id="patientName"
              value={newRequest.patientName}
              onChange={(e) => setNewRequest({ ...newRequest, patientName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
              Required Specialty
            </label>
            <input
              type="text"
              id="specialty"
              value={newRequest.specialty}
              onChange={(e) => setNewRequest({ ...newRequest, specialty: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Request
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Collaboration Requests</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Patient</th>
              <th className="p-2 text-left">Requesting Doctor</th>
              <th className="p-2 text-left">Specialty</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collaborationRequests.map(request => (
              <tr key={request.id}>
                <td className="p-2">{request.patientName}</td>
                <td className="p-2">{request.requestingDoctor}</td>
                <td className="p-2">{request.specialty}</td>
                <td className="p-2">{request.status}</td>
                <td className="p-2">
                  <select
                    value={request.status}
                    onChange={(e) => handleUpdateStatus(request.id, e.target.value as CollaborationRequest['status'])}
                    className="p-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

