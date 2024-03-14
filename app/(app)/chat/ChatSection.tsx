"use client";
import ChatBox from "@/components/chat/ChatBox";
import InputField from "@/components/chat/InputField";
import UserButton from "@/components/chat/UserButton";
import { History } from "@/components/chat/History";
import { useOptimisticChats } from "@/components/chat/useOptimisticChats";
import { Chat } from "@/lib/db/schema/chats";
import { ScrollShadow } from "@nextui-org/react";
import React from "react";
import { AuthSession, Session } from "@/lib/auth/utils";

const ChatSection = ({
  userId,
  userImage,
  chats,
  children,
  session,
}: {
  userId?: string;
  userImage: string;
  chats: Chat[];
  children: React.ReactNode;
  session: AuthSession["session"];
}) => {
  const { optimisticChats, addOptimisticChat } = useOptimisticChats(chats);
  return (
    <div className="relative h-[85vh] pt-8 md:pt-0 md:h-full basis-2/3 flex flex-col items-center mx-auto gap-8 w-full">
      <div className="h-[70vh] w-10/12 overflow-auto md:mx-20 flex flex-col-reverse bottom-0  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] rounded-lg ">
        <ScrollShadow hideScrollBar>
          <ChatBox user_image={userImage} optimisticChats={optimisticChats} />
        </ScrollShadow>
      </div>
      <div className=" flex flex-grow flex-row items-center gap-3 justify-center static w-10/12 bottom-[10px] h-[15vh]">
        {children}
       
        <InputField userId={userId} addOptimisticChat={addOptimisticChat} />
      </div>
    </div>
  );
};

export default ChatSection;
