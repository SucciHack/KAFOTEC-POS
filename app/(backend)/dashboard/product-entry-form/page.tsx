import { ProductForm, } from '@/components/Form-inputs/product-form'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col max-w-3xl mx-auto mt-2'>
        <h2 className='text-2xl font-bold mb-6 px-6 text-center lg:text-start'>Raw Material Entry Form</h2>
      <ProductForm/>
    </div>
  )
}
