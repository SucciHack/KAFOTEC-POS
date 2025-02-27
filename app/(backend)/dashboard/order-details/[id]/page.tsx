import { getOrders, OrderWithItems } from '@/actions/action';
import OrderDetails from '@/components/order-detail'
import React from 'react'

export default async function page({params}:{params:Promise<{id:string}>}) {
  const {id} = await params;

  const orders = await getOrders("all")||[];
  const order = orders.find((order)=> order.id === id)
  return (
    <div>
      <OrderDetails order = {order as OrderWithItems}/>
    </div>
  )
}
