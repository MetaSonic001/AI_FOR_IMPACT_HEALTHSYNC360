'use client'

import { useState } from 'react'

type Diagnosis = {
  condition: string
  confidence: number
  suggestedTests: string[]
}

export default function IntegratedDiagnosticAssistant() {
  const [patientData, setPatientData] = useState('')
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would call an AI model
    const mockDiagnoses: Diagnosis[] = [
      { condition: 'Hypertension', confidence: 0.85, suggestedTests: ['Blood Pressure Monitoring', 'ECG'] },
      { condition: 'Type 2 Diabetes', confidence: 0.70, suggestedTests: ['HbA1c Test', 'Fasting Blood Glucose'] },
      { condition: 'Chronic Kidney Disease', confidence: 0.60, suggestedTests: ['eGFR Test', 'Urine Albumin Test'] },
    ]
    setDiagnoses(mockDiagnoses)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integrated Diagnostic Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="patientData" className="block text-sm font-medium text-gray-700">
            Patient Data (symptoms, medical history, lab results)
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
          Generate Diagnoses
        </button>
      </form>
      {diagnoses.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Potential Diagnoses:</h2>
          {diagnoses.map((diagnosis, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded shadow">
              <h3 className="font-semibold">{diagnosis.condition}</h3>
              <p>Confidence: {(diagnosis.confidence * 100).toFixed(1)}%</p>
              <p>Suggested Tests:</p>
              <ul className="list-disc pl-5">
                {diagnosis.suggestedTests.map((test, testIndex) => (
                  <li key={testIndex}>{test}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

