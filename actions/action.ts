'use server'

import { deleteSession } from "@/lib/session";
import { db } from "@/prisma/db";
import { Order, orderItem } from "@prisma/client";
import { cache } from "react";

export interface OrderWithItems extends Order{
  orderItems:orderItem[]
}
export async function deleteSession1(){
    await deleteSession()
  }
  export async function getProducts(){
    try {
      const newProducts = await db.item.findMany()
  
      return {
        data: newProducts,
        message:"Fetched back raw materials successfully",
        status:200
      }
    } catch (error) {
      console.log("Failed to get back raw materials:", error)
    }
  }
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  export const getOrders = cache(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/orders`)
      const orders = await res.json()
      return orders.data as OrderWithItems[]
    } catch (error) {
      console.log(error)
      return []
    }
  })