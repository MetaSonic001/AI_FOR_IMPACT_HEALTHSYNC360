'use client'

import { useState } from 'react'

export default function ClinicalDecisionSupport() {
  const [caseDetails, setCaseDetails] = useState('')
  const [recommendation, setRecommendation] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the case details to an AI model for analysis
    // For this example, we'll use a mock response
    setRecommendation(`Clinical Decision Support Recommendation:
    
    Based on the provided case details, the system recommends the following:
    
    1. Diagnosis: Suspected Community-Acquired Pneumonia
    
    2. Recommended Actions:
       a. Order chest X-ray to confirm diagnosis
       b. Initiate empiric antibiotic therapy with Amoxicillin 500mg TID for 7 days
       c. Monitor patient's respiratory status and oxygen saturation
    
    3. Additional Tests:
       a. Complete Blood Count (CBC)
       b. C-Reactive Protein (CRP) level
       c. Blood cultures if fever persists
    
    4. Follow-up:
       Schedule a follow-up appointment in 3-5 days to assess treatment response
    
    5. Patient Education:
       Provide information on pneumonia self-care and when to seek immediate medical attention
    
    Please note that this is a decision support tool. Clinical judgment should always be exercised.`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clinical Decision Support System</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="caseDetails" className="block text-sm font-medium text-gray-700">
            Case Details
          </label>
          <textarea
            id="caseDetails"
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
            placeholder="Enter detailed case information, including patient history, symptoms, and test results..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Recommendation
        </button>
      </form>
      {recommendation && (
        <div className="mt-4 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">AI-Generated Recommendation:</h2>
          <p className="whitespace-pre-line">{recommendation}</p>
        </div>
      )}
    </div>
  )
}

