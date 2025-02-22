import { getOrders } from "@/actions/action"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// const getStatusStyles = (status: Order["status"]) => {
//   switch (status) {
//     case "completed":
//       return "bg-emerald-100 text-emerald-700"
//     case "in progress":
//       return "bg-[#FFD600] text-black"
//     case "pending":
//       return "bg-gray-900 text-white"
//     default:
//       return ""
//   }
// }
const orders = await getOrders()
console.log(orders)
export default function OrdersTable() {

  return (
      <div className="rounded-md border min-h-[300px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b">
              <TableHead className="font-medium">OrderItems</TableHead>
              <TableHead className="font-medium">Quantity</TableHead>
              <TableHead className="font-medium">Subtotal</TableHead>
              <TableHead className="font-medium">Tax</TableHead>
              <TableHead className="font-medium">Total Price</TableHead>
              <TableHead className="font-medium">Creation date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} className="border-0">
                <TableCell className="border-b-[1px] border-gray-600/20">
                    {
                        order.orderItems.map((orderItem)=>{
                            return(
                                <div key={orderItem.id}>
                                    <p className="py-1">{orderItem.productName}</p>
                                </div>
                            )
                        })
                    }
                </TableCell>
                <TableCell className="border-b-[1px] border-gray-600/20">
                    {
                        order.orderItems.map((orderItem)=>{
                            return(
                                <div key={orderItem.id}>
                                    <p className="py-1">{orderItem.qty}</p>
                                </div>
                            )
                        })
                    }
                </TableCell>
                <TableCell className="border-b-[1px] border-gray-600/20">{order.subtotal.toLocaleString()}</TableCell>
                <TableCell className="border-b-[1px] border-gray-600/20">{order.tax.toLocaleString()}</TableCell>
                <TableCell className="border-b-[1px] border-gray-600/200">{order.total.toLocaleString()}</TableCell>
                <TableCell className="border-b-[1px] border-gray-600/200">{new Date(order.createdAt).toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
}

