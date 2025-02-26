'use client'
import { NewProps, useStore } from '@/store/store'
import { MinusCircle, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ProductCard({product}:{product:NewProps}) {
    const {handleAddCart,Items,handleReduceCart,handleDelete} = useStore((state)=> state)
    const existingProduct = Items.find((item) => item.productId === product.productId);
    const quantity = existingProduct ? existingProduct.qty : 0;
    function handleClick(product:NewProps){
        handleAddCart(product)
    }
    function handleRemoveOrder(id:string){
        handleReduceCart(id)
        if(quantity === 1){
            handleDelete(id)
        }
    }


  return (
    <div className='bg-white min-h-[300px] rounded-lg overflow-hidden border border-gray-600/20 cardFont'>
        <div className='flex justify-center items-center py-8 bg-blue-100/70'>
            <Image src={product.productImage} alt='' width={150} height={150} className='w-[100px]' />
        </div>
        <div>
            <div className='px-3 space-y-2 mt-2'>
            <p className='font-semibold'>{product.productName}</p>
            <p className='font-bold line-clamp-1 mb-3'>{product.description}</p>
        </div>
        <div className="flex justify-between p-3 mt-2">
            <p className='text-lg'>${product.price}</p>
            <div className="flex gap-3">
                <button onClick={()=>handleRemoveOrder(product.productId)}><MinusCircle/></button>
                <p>{quantity}</p>
                <button onClick={()=>handleClick(product)}><PlusCircle className='bg-green-500 rounded-full  text-white'/></button>
            </div>
        </div>
        </div>
    </div>
  )
}
