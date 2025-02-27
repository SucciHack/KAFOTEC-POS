"use client"

import { fetchExpense, getOrders } from "@/actions/action"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

import { useEffect, useState } from "react"

export function FinanceChart() {
  const [formattedExpenseData, setFormattedExpenseData] = useState<{ name: string; income: number; expenses: number }[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const expenseData = await fetchExpense("last30days")
        const orders = await getOrders("last30days")
        const formattedData = expenseData.map((expense) => ({
          name: new Date(expense.createdAt).toLocaleString('default', { month: 'short' }),
          income: orders.map((order)=> order.total).reduce((acc, total) => acc + total, 0),
          expenses: expense.amount
        }))
        setFormattedExpenseData(formattedData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <ResponsiveContainer width="80%" height={350} className="mt-10">
      <BarChart data={formattedExpenseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          axisLine={true}
          tickFormatter={(value) => `UGX${value}`}
        />
        <Tooltip 
          cursor={{fill: 'transparent'}}
          contentStyle={{
            background: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
        />
        <Legend />
        <Bar 
          dataKey="income" 
          fill="#4EA54A" 
          radius={[4, 4, 0, 0]} 
          barSize={20}
        />
        <Bar 
          dataKey="expenses" 
          fill="#DD2C2A" 
          radius={[4, 4, 0, 0]} 
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
