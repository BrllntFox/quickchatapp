import ChatBox from "@/components/chat/ChatBox";
import ChatHero from "@/components/chat/ChatHero";
import InputField from "@/components/chat/InputField";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { ScrollShadow } from "@nextui-org/react";

import React from "react";
import { getChatMessageByUser, getChatDataByUserId } from "@/lib/actions/chats";
import UserButton from "@/components/chat/UserButton";
import { History } from "@/components/chat/History";
import { getUserByKindeId } from "@/lib/api/users/queries";
import { getChatByUser } from "@/lib/api/chats/queries";
import { useOptimisticChats } from "@/components/chat/useOptimisticChats";
import ChatSection from "./ChatSection";
import ClientLogout from "@/components/shared/ClientLogout";
import { getUserDataByKindeId } from "@/lib/actions/users";

const ChatPage = async () => {
  const { session } = await getUserAuth();
  const user_image = session?.user.picture ||'';
  const kindeId = session?.user.id ||""
  const user = await getUserDataByKindeId(kindeId);
  const userId =user.id
  const chats = await getChatDataByUserId(userId);
  
  return (
    <div className="flex flex-col md:flex-row h-[90vh] md:h-full w-full items-center justify-center">
      <div
        className="basis-1/3 flex justify-between md:flex-grow md:flex-col items-center md:mx-auto pt-4 md:pt-0 md:justify-center
       w-10/12 md:w-full h-[10vh] md:h-[100vh] "
      >
        <ChatHero />
      </div>
      <ChatSection
        userId={userId}
        userImage={user_image}
        chats={chats}
        session={session}
      >
        <UserButton session={session} chats={chats}>
          <ClientLogout />
        </UserButton>
      </ChatSection>

      {/* <div className="h-[10vh] md:h-[0vh] md:hidden"> */}
    </div>
  );
};

export default ChatPage;
