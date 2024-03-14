"use client";
import {

  DropdownMenuItem,

} from "@/components/ui/dropdown-menu";
import { Chat } from "@/lib/db/schema/chats";
import { TruncatedString, calculateDaysDifference } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export function History({ chats }: { chats: Chat[] }) {
    const router = useRouter() 
  console.log(chats)
  return (
    <>
      {/* {chats
          .reverse()
          .map((chat) => {
            {}
           return
            (
              <DropdownMenuItem
                key={chat.id}
                className="flex flex-col items-start gap-1"
                onSelect={()=>  
                  {clearMessList();    
                  router.replace(`/chat?id=${chat.sessionId.replace(/^"|"$/g, '')}`)}
                }
              >
                <p className="self-start font-light text-sm">
                  {calculateDaysDifference(chat.createdAt) > 0
                    ? `${calculateDaysDifference(chat.createdAt)} days ago`
                    : "Today"}
                </p>
                <div className="flex items-start justify-start">
                  {TruncatedString({ text: chat.message.trim(), limit: 60 })}
                </div>
              </DropdownMenuItem>
            ) : null;
          })} */}
          history
    </>
  );
}
