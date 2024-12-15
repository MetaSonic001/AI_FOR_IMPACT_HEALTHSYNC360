'use client'

import { useState } from 'react'

type Claim = {
  id: number
  patientName: string
  service: string
  amount: number
  status: 'Pending' | 'Approved' | 'Rejected'
}

const mockClaims: Claim[] = [
  { id: 1, patientName: 'John Doe', service: 'Consultation', amount: 150, status: 'Pending' },
  { id: 2, patientName: 'Jane Smith', service: 'X-Ray', amount: 250, status: 'Approved' },
  { id: 3, patientName: 'Mike Johnson', service: 'Blood Test', amount: 100, status: 'Rejected' },
]

export default function BillingAndClaims() {
  const [claims, setClaims] = useState<Claim[]>(mockClaims)

  const handleStatusChange = (id: number, newStatus: Claim['status']) => {
    setClaims(prevClaims =>
      prevClaims.map(claim =>
        claim.id === id ? { ...claim, status: newStatus } : claim
      )
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Billing and Claims Management</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Patient Name</th>
            <th className="p-2 text-left">Service</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map(claim => (
            <tr key={claim.id} className={
              claim.status === 'Approved' ? 'bg-green-100' :
              claim.status === 'Rejected' ? 'bg-red-100' :
              ''
            }>
              <td className="p-2">{claim.patientName}</td>
              <td className="p-2">{claim.service}</td>
              <td className="p-2">${claim.amount}</td>
              <td className="p-2">{claim.status}</td>
              <td className="p-2">
                <select
                  value={claim.status}
                  onChange={(e) => handleStatusChange(claim.id, e.target.value as Claim['status'])}
                  className="p-1 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

