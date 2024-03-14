
import {  type CompleteChat } from "@/lib/db/schema/chats";
import { useOptimistic } from "react";

export const useOptimisticChats = (
  chats: CompleteChat[],
) => {
  const [optimisticChats, addOptimisticChat] = useOptimistic(
    chats,
    (
      currentState: CompleteChat[],
      newChat: CompleteChat
    ): CompleteChat[] => {
      return [newChat,...currentState]
      }
  )

  return { addOptimisticChat, optimisticChats };
}