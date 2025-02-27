'use client'
import { getOrders } from "@/actions/action";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orderItem, Order as PrismaOrder } from "@prisma/client";
import Link from "next/link";


export interface Order extends PrismaOrder {
  orderItems: orderItem[];
}
import { useEffect, useState } from "react";
import Loader from "./loader";


export default function OrdersTable() {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function fetchOrders() {
      const fetchedOrders = await getOrders("all");
      const ordersWithReceiptId = fetchedOrders.map(order => ({
        ...order,
      }));
      setOrders(ordersWithReceiptId);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      {orders.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="font-medium">OrderId</TableHead>
                <TableHead className="font-medium">Subtotal</TableHead>
                <TableHead className="font-medium">Tax</TableHead>
                <TableHead className="font-medium">Total Price</TableHead>
                <TableHead className="font-medium">Creation date</TableHead>
                <TableHead className="font-medium">View Order Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="border-b-[1px] border-gray-600/20 font-bold">
                  {order.receiptId}
                  </TableCell>
                  <TableCell className="border-b-[1px] border-gray-600/20">{order.subtotal.toLocaleString()}</TableCell>
                  <TableCell className="border-b-[1px] border-gray-600/20">{order.tax.toLocaleString()}</TableCell>
                  <TableCell className="border-b-[1px] border-gray-600/200">{order.total.toLocaleString()}</TableCell>
                  <TableCell className="border-b-[1px] border-gray-600/200">{new Date(order.createdAt).toDateString()}</TableCell>
                  <TableCell className="border-b-[1px] border-gray-600/200"><Link href={`/dashboard/order-details/${order.id}`}className="underline text-black rounded-md">View Details</Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-4xl text-gray-700/40 mt-16 ml-28">No Orders Yet</p>
      )}
    </>
  );
}