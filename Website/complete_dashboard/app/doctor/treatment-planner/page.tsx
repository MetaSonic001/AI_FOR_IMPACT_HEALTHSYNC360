'use client'

import { useState } from 'react'

type TreatmentPlan = {
  id: number
  treatment: string
  expectedRecoveryTime: string
  estimatedCost: number
  effectiveness: number
}

export default function PredictiveTreatmentPlanner() {
  const [patientData, setPatientData] = useState('')
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would call an AI model to generate treatment plans
    const mockTreatmentPlans: TreatmentPlan[] = [
      { id: 1, treatment: 'Medication A + Physical Therapy', expectedRecoveryTime: '4-6 weeks', estimatedCost: 2000, effectiveness: 0.85 },
      { id: 2, treatment: 'Surgery + Rehabilitation', expectedRecoveryTime: '2-3 months', estimatedCost: 10000, effectiveness: 0.95 },
      { id: 3, treatment: 'Alternative Therapy + Lifestyle Changes', expectedRecoveryTime: '2-4 months', estimatedCost: 1500, effectiveness: 0.75 },
    ]
    setTreatmentPlans(mockTreatmentPlans)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Predictive Treatment Planner</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="patientData" className="block text-sm font-medium text-gray-700">
            Patient Data (diagnosis, medical history, preferences)
          </label>
          <textarea
            id="patientData"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={patientData}
            onChange={(e) => setPatientData(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate Treatment Plans
        </button>
      </form>
      {treatmentPlans.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Recommended Treatment Plans:</h2>
          {treatmentPlans.map((plan) => (
            <div key={plan.id} className="mb-4 p-4 bg-white rounded shadow">
              <h3 className="font-semibold">{plan.treatment}</h3>
              <p>Expected Recovery Time: {plan.expectedRecoveryTime}</p>
              <p>Estimated Cost: ${plan.estimatedCost}</p>
              <p>Effectiveness: {(plan.effectiveness * 100).toFixed(1)}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

