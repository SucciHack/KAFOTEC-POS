import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
        try {
            const data = await request.json()
            const newProduct = await db.item.create({
            data
        })
        return NextResponse.json({
            data:newProduct,
            message:"new stock registered successfully",
            error:null
        },{
            status:201
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            error:"failed to register stock"
        },{
            status:500
        })
    }
}