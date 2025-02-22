"use client"

import { useState } from "react"
import { Search, Filter, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function OrdersHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  return (
    <header className="flex h-16 items-center justify-between bg-[#F8F8F8] px-6">
      {!showSearch && <h1 className="text-xl font-bold">Orders</h1>}

      <div className="flex flex-1 items-center gap-6 mx-4">
        {showSearch ? (
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input placeholder="Search orders..." className="pl-10 bg-white" autoFocus />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)} className="text-gray-600">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <button className="flex items-center gap-2 text-sm text-gray-600" onClick={() => setShowSearch(true)}>
              <Search className="h-4 w-4" />
              Search
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-gray-600">
                  <Filter className="h-4 w-4" />
                  {selectedMonth ? selectedMonth : "Filters"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Month</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {months.map((month) => (
                  <DropdownMenuItem key={month} onSelect={() => setSelectedMonth(month)}>
                    <Check className={`mr-2 h-4 w-4 ${selectedMonth === month ? "opacity-100" : "opacity-0"}`} />
                    <span>{month}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      <Link href="/dashboard">
        <Button className="bg-[#FFD600] font-medium text-black hover:bg-[#FFD600]/90">CREATE ORDER +</Button>
      </Link>
    </header>
  )
}

