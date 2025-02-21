import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { createSession } from "@/lib/session";

export async function POST(request:NextRequest) {
    try {
        const data = await request.json()
        const {email,password}= data
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })
        if(!existingUser){
            return NextResponse.json({
                data:null,
                error:"wrong credentials"
            },{
                status:409
            })
        }

        const isCorrectPassword = await bcrypt.compare(password,existingUser.password)
        if(!isCorrectPassword){
            return NextResponse.json({
                data:null,
                error:"wrong credentials"
        },{
            status:403
        })

    }
    await createSession(existingUser)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password:removedPassword, ...others} = existingUser
        return NextResponse.json({
            data:others,
            error:null
        },{
            status:200
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