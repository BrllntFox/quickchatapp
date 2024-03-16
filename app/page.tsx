import ChatHero from "@/components/chat/ChatHero";
import {  getUserAuth } from "@/lib/auth/utils";


import React from "react";

import SignIn from "@/components/auth/SignIn";
import { redirect } from "next/navigation";

const ChatPage = async ({ params }: { params: { id: string } }) => {
  const { session } = await getUserAuth();
  if (session) {
    redirect("/chat");
  }
  return (
    <div className="flex flex-col h-[90vh] md:h-[100vh] w-full items-center justify-center gap-1">
      <ChatHero type="home"/>
      <SignIn type="home"/>
    </div>
  );
};

export default ChatPage;
