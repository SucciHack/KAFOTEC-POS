import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
    const data = await request.json()
    const expense = await db.expense.create({
        data,include:{
            order:true
        }
    })
    return NextResponse.json({
        data:expense,
        message:"Expense created successfully",
        error:null
    },{
        status:201
    })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            message:null,
            error:"Failed to create expense"
        },{
            status:500
        })
        
    }
}

export async function GET() {
    const expenses = await db.expense.findMany({
        include:{
            order:true
        }
    })
    return NextResponse.json({
        data:expenses,
        message:"Fetched expenses successfully",
        error:null
    },{
        status:200
    })
}