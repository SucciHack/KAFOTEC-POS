'use server'

import { deleteSession } from "@/lib/session";
import { db } from "@/prisma/db";
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