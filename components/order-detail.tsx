"use client"

import { useState, useRef } from "react"
import { Calendar, CreditCard, Download, Edit, MoreVertical, Printer, ShoppingCart, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { OrderWithItems } from "@/actions/action"
import Loader from "./loader"

export default function OrderDetails({ order }: { order: OrderWithItems }) {
  const [isLoading, setIsLoading] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    setIsLoading(true)
    if (printRef.current) {
      const printContents = printRef.current.innerHTML
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
    }
    setTimeout(() => setIsLoading(false), 1000)
  }
  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Receipt Id:{order.receiptId}</span>
              <span>•</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-white bg-green-500 capitalize">
              Complete
            </Badge>
            <Button variant="outline" size="icon" onClick={handlePrint} disabled={isLoading}>
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Order
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div ref={printRef}>
        <div className="grid md:grid-cols-3 gap-6 py-3">
          {/* Order Info */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Order Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Ordered on {new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm bg-green-500 px-3 rounded-full text-white">Paid</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Reference:</span>
                  <span className="text-sm">Paid</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Total Paid</span>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Items */}
        <Card className="mb-6 mt-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-muted font-medium text-sm">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-right">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              {/* Items */}
              {order.orderItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-12 gap-2 px-4 py-3 ${index % 2 === 0 ? "bg-muted/50" : ""}`}
                >
                  <div className="col-span-5">
                    <div>{item.productName}</div>
                    <div className="text-sm text-muted-foreground">SKU: {item.orderId}</div>
                  </div>
                  <div className="col-span-2 text-right self-center">{item.qty}</div>
                  <div className="col-span-2 text-right self-center">UGX: {item.price.toFixed(2)}</div>
                  <div className="col-span-3 text-right self-center font-medium">UGX: {item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>UGX: {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>UGX: {order.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>UGX: {order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}