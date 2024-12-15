'use client'

import { useState } from 'react'

type Employee = {
  id: number
  name: string
  role: string
  department: string
  shift: string
  efficiency: number
}

const mockEmployees: Employee[] = [
  { id: 1, name: 'John Doe', role: 'Nurse', department: 'Emergency', shift: 'Morning', efficiency: 85 },
  { id: 2, name: 'Jane Smith', role: 'Doctor', department: 'Cardiology', shift: 'Evening', efficiency: 92 },
  { id: 3, name: 'Mike Johnson', role: 'Technician', department: 'Radiology', shift: 'Night', efficiency: 78 },
]

export default function WorkforceOptimization() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)

  const handleEfficiencyChange = (id: number, newEfficiency: number) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === id ? { ...employee, efficiency: newEfficiency } : employee
      )
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Workforce Optimization</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Department</th>
            <th className="p-2 text-left">Shift</th>
            <th className="p-2 text-left">Efficiency</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} className={employee.efficiency < 80 ? 'bg-red-100' : ''}>
              <td className="p-2">{employee.name}</td>
              <td className="p-2">{employee.role}</td>
              <td className="p-2">{employee.department}</td>
              <td className="p-2">{employee.shift}</td>
              <td className="p-2">{employee.efficiency}%</td>
              <td className="p-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={employee.efficiency}
                  onChange={(e) => handleEfficiencyChange(employee.id, parseInt(e.target.value))}
                  className="w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

