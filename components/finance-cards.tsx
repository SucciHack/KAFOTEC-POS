"use client"

import { fetchExpense, getOrders } from "@/actions/action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Loader from "./loader"

export function FinanceCards() {
  const [overallIncome, setOverallIncome] = useState(0)
  const [overallExpenses, setOverallExpenses] = useState(0)
  const [overallProfit, setOverallProfit] = useState(0)
  const [timePeriodIncome, setTimePeriodIncome] = useState(0)
  const [timePeriodExpenses, setTimePeriodExpenses] = useState(0)
  const [timePeriodProfit, setTimePeriodProfit] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [timePeriod, setTimePeriod] = useState("today")
  const [noSales, setNoSales] = useState(false)

  // Fetch overall totals when the component mounts
  useEffect(() => {
    async function fetchOverallTotals() {
      try {
        const orders = await getOrders("all")
        const expensesData = await fetchExpense("all")

        let totalIncome = 0
        let totalExpenses = 0

        // Calculate total expenses
        totalExpenses = expensesData.reduce((acc, expense) => acc + expense.amount, 0)

        // Calculate total income
        orders.forEach((order) => {
          totalIncome += order.total
        })

        const totalProfit = totalIncome - totalExpenses

        setOverallIncome(totalIncome)
        setOverallExpenses(totalExpenses)
        setOverallProfit(totalProfit)
      } catch (error) {
        console.error("Failed to fetch overall totals:", error)
      }
    }

    fetchOverallTotals()
  }, [])

  // Fetch totals based on the selected time period
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const orders = await getOrders(timePeriod)
        const expensesData = await fetchExpense(timePeriod)

        let totalIncome = 0
        let totalExpenses = 0

        // Calculate total expenses
        totalExpenses = expensesData.reduce((acc, expense) => acc + expense.amount, 0)

        // Calculate total income
        orders.forEach((order) => {
          totalIncome += order.total
        })

        const totalProfit = totalIncome - totalExpenses

        setTimePeriodIncome(totalIncome)
        setTimePeriodExpenses(totalExpenses)
        setTimePeriodProfit(totalProfit)
        setNoSales(orders.length === 0)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [timePeriod])

  const isOverallLoss = overallExpenses > overallIncome
  const isTimePeriodLoss = timePeriodExpenses > timePeriodIncome

  if (isLoading) {
    return <div><Loader/></div>
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 px-6">
        <Link href="/dashboard/orders">
          <Card className="border-shadow-sm text-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Income</CardTitle>
              <DollarSign className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">UGX    {overallIncome.toLocaleString()}</div>
            </CardContent>
          </Card>
        </Link>
        <Card className="border-shadow-sm text-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">UGX    {overallExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className={isOverallLoss ? "bg-red-100 dark:bg-red-900 text-red-500" : "bg-green-100 dark:bg-green-900"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isOverallLoss ? "Loss" : "Profit"}</CardTitle>
            {isOverallLoss ? (
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            ) : (
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold UGX    {isOverallLoss ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
            >
              UGX    {Math.abs(overallProfit).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center">
      <div className="col-span-3 px-6 py-8">
      <h1 className="text-2xl font-bold text-blue-500">Select Time Period</h1>
      </div>
      <div className="col-span-3 px-12 py-8 max-w-lg">
        <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value)}>
          <SelectTrigger className="p-2 border rounded">
            <SelectValue placeholder="Select Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today{`'`}s Orders</SelectItem>
            <SelectItem value="yesterday">Yesterday{`'`}s Orders</SelectItem>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="lastyear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 px-6">
        {noSales ? (
          <div className="col-span-3 text-center text-xl font-bold text-red-600/20">
            No sales were made on this day.
          </div>
        ) : (
          <>
            <Link href="/dashboard/orders">
              <Card className="bg-blue-200 text-black">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                  <DollarSign className="h-4 w-4 text-black" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">UGX    {timePeriodIncome.toLocaleString()}</div>
                </CardContent>
              </Card>
            </Link>
            <Card className="bg-blue-200 text-black">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <CreditCard className="h-4 w-4 text-black" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">UGX    {timePeriodExpenses.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card className={isTimePeriodLoss ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{isTimePeriodLoss ? "Loss" : "Profit"}</CardTitle>
                {isTimePeriodLoss ? (
                  <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                )}
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold UGX    {isTimePeriodLoss ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                >
                  UGX    {Math.abs(timePeriodProfit).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  )
}