import HeaderComp from '@/components/backend/header'
import SidebarComp from '@/components/backend/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getSession } from '@/lib/dal'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function layout({children}:{children:ReactNode}) {
    const session = await getSession()
    if(!session){
        return null
    }
    if(session.role !== "ADMIN"){
      return(redirect("/"))
    }
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen  overflow-hidden bg-[#F6FDFA]">
      <div>
        <SidebarComp/>
      </div>

     <div className="w-full flex-grow flex-1  ">
      <div className="w-[80%]  ">
      <HeaderComp/>
      </div>
         <div className="py-[5rem]">
         {children}
         </div>
    </div>
     </div>
    </SidebarProvider>
  )
}
