'use server'

import { deleteSession } from "@/lib/session";
import { db } from "@/prisma/db";
import { Order, orderItem } from "@prisma/client";

export interface OrderWithItems extends Order{
  orderItems:orderItem[]
}
export async function deleteSession1(){
    await deleteSession()
  }
  export async function getProducts(){
    try {
      const newProducts = await db.item.findMany()
  await new Promise(resolve => setTimeout(resolve, 3 * 1000));
      return {
        data: newProducts,
        message:"Fetched back raw materials successfully",
        status:200
      }
    } catch (error) {
      console.log("Failed to get back raw materials:", error)
    }
  }
export async function getOrders(timePeriod: string) {
  const now = new Date();
  let startDate: Date;

  switch (timePeriod) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "yesterday":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      break;
    case "last7days":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      break;
    case "last30days":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
      break;
    case "lastyear":
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  }

  return await db.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: now,
      },
    },
    include: {
      orderItems: true,
    },
  });
}

export async function fetchExpense(timePeriod: string) {
  const now = new Date();
  let startDate: Date;

  switch (timePeriod) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "yesterday":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      break;
    case "last7days":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      break;
    case "last30days":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
      break;
    case "lastyear":
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  }

  return await db.expense.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: now,
      },
    },
    include: {
      order: true,
    },
  });
}