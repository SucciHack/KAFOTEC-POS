"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { Loader } from "lucide-react"
import ImageInput from "./imageUpload"

export type ProductFormInputs ={
  productName: string
  description: string
  price:number
  productImage:string
}

export function ProductForm() {
    const [isLoading, setIsLoading] = useState(false);
    const initialImage = "/placeholder.svg";
    const [imageUrl, setImageUrl] = useState(initialImage);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>()

  async function onSubmit(data:ProductFormInputs){
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    data.productImage = imageUrl
    data.price = Number(data.price)
    try {
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/api/v1/products`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            toast.success("product registered successfully")
        }
        reset()
        setImageUrl(initialImage)
    } catch (error) {
        console.log(error)
        toast.error("Failed to register product")
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
      <div className="px-6">
        <div className="space-y-2">
          <Label htmlFor="supplierName">Product Name</Label>
          <Input id="productName" {...register("productName", { required: "Supplier name is required" })} />
          {errors.productName && <p className="text-sm text-red-500">{errors.productName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description", { required: "description info is required" })} />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price", {required:true})}
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>
      </div>
        <ImageInput
          title="Product Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="productImage"
        />

      <div className="flex justify-center">
      
        {
            isLoading ? (<Button type="submit" className="px-20 md:w-auto">
                <Loader className="animate-spin"/> Registering product...
             </Button>):(<Button type="submit" className="px-20 md:w-auto">
                Submit
            </Button>)
        }
      </div>
    </form>
  )
}

