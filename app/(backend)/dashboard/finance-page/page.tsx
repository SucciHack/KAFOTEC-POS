
import { FinanceCards } from '@/components/finance-cards'
import { FinanceChart } from '@/components/finance-chart'
import React from 'react'

export default function page() {
  return (
    <div className='overflow-hidden'>
      <FinanceCards/>
      <FinanceChart/>
    </div>
  )
}
