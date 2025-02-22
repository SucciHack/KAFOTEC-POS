import OrdersHeader from '@/components/order-header'
import OrdersTable from '@/components/order-table'
import React from 'react'

export default function page() {
  return (
    <div>
      <OrdersHeader/>
      <OrdersTable/>
    </div>
  )
}
