"use server";

import { revalidatePath } from "next/cache";
import {
  createNewChat,
  deleteNewChat,
  updateNewChat,
} from "@/lib/api/newChats/mutations";
import {
  NewChatId,
  NewNewChatParams,
  UpdateNewChatParams,
  newChatIdSchema,
  insertNewChatParams,
  updateNewChatParams,
} from "@/lib/db/schema/newChats";
import { getNewChatByUserId } from "../api/newChats/queries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateNewChats = () => revalidatePath("/chats");

export const createNewChatAction = async (input: NewNewChatParams) => {
  try {
    const payload = insertNewChatParams.parse(input);
    await createNewChat(payload);
    revalidateNewChats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateNewChatAction = async (input: UpdateNewChatParams) => {
  try {
    const payload = updateNewChatParams.parse(input);
    await updateNewChat(payload.id, payload);
    revalidateNewChats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteNewChatAction = async (input: NewChatId) => {
  try {
    const payload = newChatIdSchema.parse({ id: input });
    await deleteNewChat(payload.id);
    revalidateNewChats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const getNewChatsDataByUserId = async (userId:string) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const chatData = await getNewChatByUserId(userId);
    if (!chatData || typeof chatData.newChats === 'undefined') {
      throw new Error('Chat data is not available');
    }
    return chatData.newChats;
 } catch (error) {
    console.error('Error fetching chats:', error);
    return []; // Return an empty array as a fallback
 }
}