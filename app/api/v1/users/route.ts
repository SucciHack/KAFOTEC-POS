import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(request:NextRequest) {
    try {
        const data = await request.json()
        console.log("data from the from",data)
        const {email, password,phone,fullName} = data
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser){
            return NextResponse.json({
                data:null,
                message:"wrong credentials"
            },{
                status:409
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword,
                phone,
                fullName
            }
        })
        console.log("this is new user",newUser)
        return NextResponse.json({
            data:newUser,
            message:"created",
            error:null
        },{
            status:201
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data:null,
            error:"something went wrong"
        },{
            status:500
        })
    }
}