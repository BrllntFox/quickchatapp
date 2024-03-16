"use client"
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {  useSearchParams  } from "next/navigation";
import { Chat } from "@/lib/db/schema/chats";

const replaceNewlinesWithBreaks = (text: string | null) => {
  return text?.split("\\n").map((line, i) => (
    <span key={i}>
      {line}
      {i !== text.length - 1 && <br />}
    </span>
  ));
};

const ChatBox = ({ user_image, optimisticChats }: { user_image: string,optimisticChats: Chat[]}) => {
  const sessionId = useSearchParams().get("s_id")
  const chatss= optimisticChats
  // Function to scroll to the bottom of the chat box
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chatss]);
  const idkava =
    "https://res.cloudinary.com/dlepfxwjj/image/upload/v1708783540/ava2d_h0vix0.png";

  return (
    <div>
      <div className=" w-full flex flex-col h-full  ">
        <div className="relative flex-grow overflow-y-auto max-h-full"> 
        <div>    
          {chatss.map((chat) => {if (chat.sessionId===sessionId) return (
            <div
              key={chat.id + "_user"}
              className={cn(
                `${
                  chat.role === "user"
                    ? "flex flex-row-reverse "
                    : chat.role === "chatIDK"
                    ? "flex flex-row "
                    : ""
                }, mx-2 gap-2 items-center`
              )}
            >
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={chat.role === "chatIDK" ? idkava : user_image}
                  alt="@shadcn"
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <Card
                key={chat.id + "chat"}
                className={cn(
                  `${
                    chat.role === "user"
                      ? "self-start border-blue-500 "
                      : chat.role === "chatIDK"
                      ? "self-end  border-green-500 "
                      : ""
                  }`,
                  "p-3 m-3 min-w-6/12 w-8/12 border-solid border-2"
                )}
              >
                {/* {replaceNewlinesWithBreaks(mess.content)} */}
                { replaceNewlinesWithBreaks(chat.message)}
              </Card>
            </div>
          )
          return null
                }
          )}
          </div>     
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
