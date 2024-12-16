'use client'

import { useState } from 'react'

export default function CaseSummaryGenerator() {
  const [patientInfo, setPatientInfo] = useState('')
  const [summary, setSummary] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the patient info to an AI model for summarization
    // For this example, we'll use a mock response
    setSummary(`Case Summary:
    Patient: John Doe, 45 years old, male
    Chief Complaint: Persistent cough and fatigue for 2 weeks
    
    Key Points:
    1. Patient reports dry cough, worse at night
    2. Fatigue interfering with daily activities
    3. No fever or shortness of breath
    4. History of seasonal allergies
    
    Recent Lab Results:
    - CBC: Within normal limits
    - Chest X-ray: No significant findings
    
    Recommended Actions:
    1. Prescribe antihistamines for potential allergy-related symptoms
    2. Follow-up in 1 week if symptoms persist
    3. Consider pulmonary function tests if no improvement`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Case Summary Generator</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="patientInfo" className="block text-sm font-medium text-gray-700">
            Patient Information
          </label>
          <textarea
            id="patientInfo"
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={patientInfo}
            onChange={(e) => setPatientInfo(e.target.value)}
            placeholder="Enter patient information, symptoms, and relevant medical history..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate Summary
        </button>
      </form>
      {summary && (
        <div className="mt-4 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Generated Case Summary:</h2>
          <p className="whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  )
}

