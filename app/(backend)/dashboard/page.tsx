import { getProducts } from '@/actions/action'
import OrderCard from '@/components/order-card'
import ProductCard from '@/components/product-card'
import React from 'react'

export default async function page() {
  

  const products = await getProducts()
  return (
    <div className='text-black flex'>
      <div className='grid grid-cols-4 px-6 gap-3 w-[70%]'>
        {
          products?.data.map((product,i)=>{
            const prod={
              productId:product.id,
              productName:product.productName,
              description:product.description,
              productImage:product.productImage,
              price:product.price,
              qty:1
            }
            return <ProductCard key={i} product={prod}/>
          })
        }
      </div>
      <div className='w-[25%] pr-2 md:fixed top-20 right-1'>
        <OrderCard/>
      </div>
    </div>
  )
}
