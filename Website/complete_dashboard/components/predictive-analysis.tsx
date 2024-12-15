"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Mon",
    admissions: 120,
    discharges: 110,
  },
  {
    name: "Tue",
    admissions: 132,
    discharges: 125,
  },
  {
    name: "Wed",
    admissions: 145,
    discharges: 138,
  },
  {
    name: "Thu",
    admissions: 155,
    discharges: 148,
  },
  {
    name: "Fri",
    admissions: 165,
    discharges: 160,
  },
  {
    name: "Sat",
    admissions: 140,
    discharges: 145,
  },
  {
    name: "Sun",
    admissions: 130,
    discharges: 135,
  },
]

export function PredictiveAnalysis() {
  return (
    <div className="space-y-4">
      <div className="text-xl font-bold">Predicted Patient Flow (Next 7 Days)</div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar dataKey="admissions" fill="#8884d8" radius={[4, 4, 0, 0]} name="Predicted Admissions" />
          <Bar dataKey="discharges" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Predicted Discharges" />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-sm text-muted-foreground">
        Based on historical data and current trends, we predict a slight increase in patient admissions over the next week. 
        Ensure adequate staffing and resources are allocated, particularly for Thursday and Friday.
      </div>
    </div>
  )
}

