// import { db } from "@/prisma/db";
import { db } from "@/prisma/db";
import { NewProps } from "@/store/store";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const data= await request.json()
        const {items,subtotal,tax,total} = data
        const newOrder = await db.order.create({
            data:{
                subtotal,
                tax,
                total
            }
        })
        const itemsWithOrderId=items.map((i:NewProps)=>{
            return{
                productName:i.productName,
                description:i.description,
                price:i.price,
                qty:i.qty,
                orderId:newOrder.id
            }
        })
        await db.orderItem.createMany({
            data:itemsWithOrderId
        })
        return NextResponse.json({
            data:newOrder,
            message:"order created successfully",
            error:null
        },{
            status:201
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            error:"failed to create order"
        },{
            status:500
        })
    }
}

export async function GET() {
    try {
        const orders = await db.order.findMany({
            include:{
                orderItems: true
            }
        })
        return NextResponse.json({
            data:orders,
            message:"fetched successfuly",
            error:null
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            message:"something went wrong"
        })
    }
    
}