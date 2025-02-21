'use client'
import React, { useRef, useState } from 'react'
import { EllipsisVertical, Loader, Mouse, Printer, Trash2, Truck } from 'lucide-react'
import { useStore } from '@/store/store'
import toast from 'react-hot-toast'

export default function OrderCard() {
  const {Items,handleDelete} = useStore((state)=>state)
  const [loading, setLoading] = useState(false)
  const productPrice = Items.map((item)=> Number(Number(item.price)*Number(item.qty)).toFixed(2))

  const Subtotal = productPrice.reduce((acc, curr) => acc + Number(curr), 0).toFixed(2);

  const printRef = useRef<HTMLDivElement>(null);

  function print() {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const date = new Date().toDateString()
  const orderData = {
    items:Items,
    subtotal: Number(Subtotal),
    tax: 0,
    total: Number(Subtotal),
  };
  console.log(orderData)
  async function createOrder(){
    try {
      setLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/orders`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(orderData)
      })
      if(response.status === 201){
        toast.success("order saved to database")
      }
      if(response.status === 500){
        toast.error("no order entered")
      }
    } catch (error) {
      console.log(error)
      toast.error("failed to create order")
    }finally{
      setLoading(false)
    }
  }

  return (
      <div className='border border-gray-500/20 rounded-lg overflow-hidden relative pb-20'>
      <div className='bg-[#DCF9ED] py-8 flex justify-between px-3 items-center'>
        <div>
            <p className=' font-bold'>Order Oe31b70H</p>
            <p className=' text-gray-500/70'>Date: {date}</p>
        </div>
        <div className='flex gap-2'>
            <button className='text-sm flex items-center justify-center gap-2 border border-gray-500/20 p-2 rounded-md'>
            <Truck size={20} className='font-thin'/>Track Order
            </button>
            <button className='text-sm flex items-center justify-center gap-2 border border-gray-500/20 p-2 rounded-md'>
                <EllipsisVertical size={15}/>
            </button>
        </div>
      </div>
      <div>
      <div ref={printRef}>
        <div className='py-12 px-2'>
            <p className='font-bold'>Order details</p>
            <div className="border-b-[1px] border-black/80">
                {
                  Items.length === 0? (
                    <div className='mb-6 flex justify-between text-gray-500/90'>
                    <p>No Item yet</p>
                    <p>$0</p>
                  </div>
                  ):(
                    Items.map((item, index)=>{
                      return(
                  <div key={item.productId} className='mb-6 flex justify-between text-gray-500/90'>
                    <p>{item.productName}</p>
                    <p className='flex gap-1 items-center justify-center'>${productPrice[index]}<button onClick={()=>handleDelete(item.productId)}><Trash2 size={20} className='text-red-800/50'/></button></p>
                  </div>
                      )
                    })
                  )
                }

            </div>
        </div>
      
      <div>
        <div className='px-2'>
            <div className="border-b-[1px] border-black/80">
                <div className='mb-6 flex justify-between text-gray-500/90'>
                    <p>Subtotal:</p>
                    <p>${Subtotal}</p>
                </div>
                <div className='mb-6 flex justify-between text-gray-500/90'>
                    <p>Tax:</p>
                    <p>$0.00</p>
                </div>
                <div className='mb-6 flex justify-between text-gray-500/90'>
                    <p>Total:</p>
                    <p>${Subtotal}</p>
                </div>
            </div>
        </div>
      </div>

    </div>
    </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full flex justify-center gap-3">
        <button onClick={print} className='text-sm flex items-center justify-center gap-2 border border-gray-500/20 p-2 rounded-md px-8'>
          <Printer size={20}/>  Print
        </button>
        {
          loading ? (
            <button type='submit' onClick={createOrder} className='text-sm flex items-center justify-center gap-2 border border-gray-500/20 p-2 rounded-md px-8 bg-[#469488] text-white'>
            <Loader size={20} className='animate-spin'/> Placing order...
          </button>
          ):(
            <button type='submit' onClick={createOrder} className='text-sm flex items-center justify-center gap-2 border border-gray-500/20 p-2 rounded-md px-8 bg-[#469488] text-white'>
            <Mouse size={20}/> Place Order
          </button>
          )
        }
      </div>
    </div>
  )
}
