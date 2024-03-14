"use server";

import { revalidatePath } from "next/cache";
import {
  createChat,
  deleteChat,
  updateChat,
} from "@/lib/api/chats/mutations";
import {
  ChatId,
  NewChatParams,
  UpdateChatParams,
  chatIdSchema,
  insertChatParams,
  updateChatParams,
} from "@/lib/db/schema/chats";
import { getChatByUser } from "../api/chats/queries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateChats = () => revalidatePath("/chat");

export const createChatAction = async (input: NewChatParams) => {
  try {
    const payload = insertChatParams.parse(input);
    await createChat(payload);
    revalidateChats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateChatAction = async (input: UpdateChatParams) => {
  try {
    const payload = updateChatParams.parse(input);
    await updateChat(payload.id, payload);
    revalidateChats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteChatAction = async (input: ChatId) => {
  try {
    const payload = chatIdSchema.parse({ id: input });
    await deleteChat(payload.id);
    revalidateChats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const getChatMessageByUser = async (user_id:string) => {
  try {
    const {chats} = await getChatByUser(user_id)
    revalidateChats()
    return {chats}
  } catch (e) {
    return handleErrors(e)
  }
}

export const getChatDataByUserId= async(userId:string)=> {
  try {
     if (!userId) {
       throw new Error('User ID is required');
     }
     const chatData = await getChatByUser(userId);
     if (!chatData || typeof chatData.chats === 'undefined') {
       throw new Error('Chat data is not available');
     }
     return chatData.chats;
  } catch (error) {
     console.error('Error fetching chats:', error);
     return []; // Return an empty array as a fallback
  }
 }