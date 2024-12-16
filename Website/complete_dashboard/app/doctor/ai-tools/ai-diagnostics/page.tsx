'use client'

import { useState } from 'react'

export default function AIDiagnostics() {
  const [symptoms, setSymptoms] = useState('')
  const [diagnosis, setDiagnosis] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the symptoms to an AI model
    // For this example, we'll use a mock response
    setDiagnosis(`Based on the symptoms "${symptoms}", the AI suggests the following potential diagnoses:
    1. Common Cold
    2. Seasonal Allergies
    3. Viral Infection
    
    Please note that this is a preliminary assessment and further examination may be required.`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI-Assisted Diagnostics</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
            Patient Symptoms
          </label>
          <textarea
            id="symptoms"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter patient symptoms..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate Diagnosis
        </button>
      </form>
      {diagnosis && (
        <div className="mt-4 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">AI-Generated Diagnosis:</h2>
          <p className="whitespace-pre-line">{diagnosis}</p>
        </div>
      )}
    </div>
  )
}

