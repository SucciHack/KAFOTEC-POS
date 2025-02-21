import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { db } from "@/prisma/db";

export type AuthProps = {
    fullName:string
    email:string
    phone:string
    role:string
}
export const getSession = cache(async()=>{
    const cookieStore = await cookies()
    const cookie = cookieStore.get("session")?.value
    const session = await decrypt(cookie)
    if(!session){
        return null
    }
    const id = session.userId as string
    try {
        const user = await db.user.findUnique({
            where:{
                id
            },
            select:{
              fullName:true,
              email:true,
              phone:true,
              role:true
            }
        })
        return user as AuthProps
    } catch (error) {
        console.log(error)
    }
})