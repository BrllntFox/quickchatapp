"use client"
import React from 'react'
import { TextGenerateEffect } from '../shared/TextGenerateEffect'
import { AuthSession } from '@/lib/auth/utils'
import { redirect, usePathname, useRouter } from 'next/navigation'

const ChatHero = () => {
 
  return (
    <div className="w-full flex justify-start md:justify-center">
     <TextGenerateEffect words={"dontknow"} />
  </div>   
  )
}

export default ChatHero