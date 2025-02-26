"use client"

import { fetchExpense, getOrders } from "@/actions/action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function FinanceCards() {
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [profit, setProfit] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const orders = await getOrders()
        const expensesData = await fetchExpense()

        let totalIncome = 0
        let totalExpenses = 0

        // Calculate total expenses
        totalExpenses = expensesData.reduce((acc, expense) => acc + expense.amount, 0)

        // Calculate total income
        orders.forEach((order) => {
          totalIncome += order.total
        })

        const totalProfit = totalIncome - totalExpenses

        setIncome(totalIncome)
        setExpenses(totalExpenses)
        setProfit(totalProfit)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const isLoss = expenses > income

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 px-6">
      <Link href="/dashboard/orders">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">${income.toLocaleString()}</div>
            </CardContent>
        </Card>
      </Link>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${expenses.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card className={isLoss ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{isLoss ? "Loss" : "Profit"}</CardTitle>
          {isLoss ? (
            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
          ) : (
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          )}
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${isLoss ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
          >
            ${Math.abs(profit).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}