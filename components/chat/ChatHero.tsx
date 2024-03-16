"use client"
import React from 'react'
import { TextGenerateEffect } from '../shared/TextGenerateEffect'
import { AuthSession } from '@/lib/auth/utils'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const ChatHero = ({type}:{type?:string}) => {
 const  isHome = type === 'home'
  return (
    <div className={cn("w-full flex md:justify-center", isHome?"justify-center":"justify-start")}>
     <TextGenerateEffect words={"dontknow"} className="md:text-3xl md:font-bold"/>
  </div>   
  )
}

export default ChatHero