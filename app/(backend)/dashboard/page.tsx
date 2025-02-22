import { getProducts } from '@/actions/action'
import OrderCard from '@/components/order-card'
import ProductCard from '@/components/product-card'
import React from 'react'

export default async function page() {
  

  const products = await getProducts()
  return (
    <div className='text-black lg:flex grid grid-cols-1'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 gap-3 lg:w-[70%]'>
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
      <div className='lg:w-[25%] p-6 md:pr-2 lg:fixed top-20 right-1'>
        <OrderCard/>
      </div>
    </div>
  )
}
