"use client"

import { fetchExpense, getOrders } from "@/actions/action"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { useEffect, useState } from "react"

export function FinanceChart() {
  const [formattedExpenseData, setFormattedExpenseData] = useState<{ name: string; income: number; expenses: number }[]>([
    { name: 'Jan', income: 0, expenses: 0 },
    { name: 'Feb', income: 0, expenses: 0 },
    { name: 'Mar', income: 0, expenses: 0 },
    { name: 'Apr', income: 0, expenses: 0 },
    { name: 'May', income: 0, expenses: 0 },
    { name: 'Jun', income: 0, expenses: 0 },
    { name: 'Jul', income: 0, expenses: 0 },
    { name: 'Aug', income: 0, expenses: 0 },
    { name: 'Sep', income: 0, expenses: 0 },
    { name: 'Oct', income: 0, expenses: 0 },
    { name: 'Nov', income: 0, expenses: 0 },
    { name: 'Dec', income: 0, expenses: 0 },
  ])

  useEffect(() => {
    async function fetchData() {
      try {
        const expenseData = await fetchExpense("last30days")
        const orders = await getOrders("last30days")

        const expensesByMonth = expenseData.reduce((acc, expense) => {
          const month = new Date(expense.createdAt).toLocaleString('default', { month: 'short' })
          if (!acc[month]) acc[month] = 0
          acc[month] += expense.amount
          return acc
        }, {} as Record<string, number>)

        const incomeByMonth = orders.reduce((acc, order) => {
          const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' })
          if (!acc[month]) acc[month] = 0
          acc[month] += order.total
          return acc
        }, {} as Record<string, number>)

        const updatedData = formattedExpenseData.map((data) => ({
          ...data,
          income: incomeByMonth[data.name] || 0,
          expenses: expensesByMonth[data.name] || 0,
        }))

        setFormattedExpenseData(updatedData)
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