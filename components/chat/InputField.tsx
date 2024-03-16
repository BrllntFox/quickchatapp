"use client";
import { Button, Input } from "@nextui-org/react";
import React, {  useEffect, useState, useTransition } from "react";
import {PaperPlaneIcon} from "@radix-ui/react-icons"
import { Chat, insertChatParams } from "@/lib/db/schema/chats";
import { useFormStatus } from "react-dom";
import { useOptimisticChats } from "./useOptimisticChats";
import { nanoid } from "nanoid";
import { createChat } from "@/lib/api/chats/mutations";
import { usePathname, useRouter } from "next/navigation";
import { createChatAction } from "@/lib/actions/chats";
import { sendMes } from "@/lib/actions/gpt.actions";
import { createNewChatAction } from "@/lib/actions/newChats";


export default function InputField({userId,addOptimisticChat}:{userId?:string,addOptimisticChat:any}) {
  const [value, setValue] = useState(""); 
  const [sessionId, setSessionId] = useState("") 
  const [isLoading,setIsLoading] = useState(false)
  // const {pending} = useFormStatus()
  const [pending,startMutation] = useTransition()
 
  const router = useRouter()
  const pathName = usePathname()
   useEffect(()=>{ 
      const session_id = (nanoid())
      router.push(pathName+"?s_id="+ session_id)
      setSessionId(session_id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleSubmit = async (data: FormData) => {
    setIsLoading(true)
    const payload = Object.fromEntries(data.entries());
    const eventParsed = await insertChatParams.safeParseAsync({userId:userId,sessionId:sessionId,role:"user",...payload});
    if (!eventParsed.success) {
    console.log(eventParsed.error)
      return;
    }
    const values = eventParsed.data
  const pendingChat:Chat ={
      id:"",
     ...values
    }
    console.log(pendingChat)
    try {
      startMutation(async()=>{addOptimisticChat(pendingChat)
        const gptChat = await sendMes(values.message)
        const gptMessage =  {
          userId:userId as string,
          sessionId:sessionId,
          role:"chatIDK",
          message:gptChat?.data || "I don't know'"
        }
          await createNewChatAction(values)
          await createNewChatAction(gptMessage)
        
      })
    } catch (err) {console.log(err);}
 
    setIsLoading(false)
    setValue("")
    };

  return (
    <form action={handleSubmit} className=" w-full flex flex-row justify-between bottom-[10px]">
      <Input
        name="message"
        label="Ask chat here"
        labelPlacement="inside"
        value={value}
        onValueChange={setValue}
        // isInvalid={value === undefined||value.length>100}
        endContent={
          <Button
            size="md"
            variant="shadow"
            type="submit"
            isDisabled={pending}       
          >
            <PaperPlaneIcon />
          </Button>
        }
      />
    </form>
  );
}
