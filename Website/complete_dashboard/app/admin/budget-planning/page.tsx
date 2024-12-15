'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

type BudgetItem = {
  category: string
  amount: number
}

type ForecastData = {
  month: string
  revenue: number
  expenses: number
}

export default function BudgetPlanning() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { category: 'Staff Salaries', amount: 500000 },
    { category: 'Equipment', amount: 200000 },
    { category: 'Medications', amount: 150000 },
    { category: 'Facilities', amount: 100000 },
    { category: 'Other', amount: 50000 },
  ])

  const [newItem, setNewItem] = useState({ category: '', amount: 0 })

  const [forecastData] = useState<ForecastData[]>([
    { month: 'Jan', revenue: 1000000, expenses: 900000 },
    { month: 'Feb', revenue: 1100000, expenses: 950000 },
    { month: 'Mar', revenue: 1200000, expenses: 1000000 },
    { month: 'Apr', revenue: 1300000, expenses: 1100000 },
    { month: 'May', revenue: 1400000, expenses: 1200000 },
    { month: 'Jun', revenue: 1500000, expenses: 1300000 },
  ])

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    setBudgetItems([...budgetItems, newItem])
    setNewItem({ category: '', amount: 0 })
  }

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI-Driven Budget Planning</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetItems}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {budgetItems.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6-Month Financial Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Budget Item</CardTitle>
          <CardDescription>Enter a new budget category and amount</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newItem.amount}
                  onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <Button type="submit">Add Item</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">Total Budget: ${totalBudget.toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  )
}

