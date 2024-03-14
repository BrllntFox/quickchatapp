import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  NewChatId, 
  NewNewChatParams,
  UpdateNewChatParams, 
  updateNewChatSchema,
  insertNewChatSchema, 
  newChats,
  newChatIdSchema 
} from "@/lib/db/schema/newChats";

export const createNewChat = async (newChat: NewNewChatParams) => {
  const newNewChat = insertNewChatSchema.parse(newChat);
  try {
    const [n] =  await db.insert(newChats).values(newNewChat).returning();
    return { newChat: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateNewChat = async (id: NewChatId, newChat: UpdateNewChatParams) => {
  const { id: newChatId } = newChatIdSchema.parse({ id });
  const newNewChat = updateNewChatSchema.parse(newChat);
  try {
    const [n] =  await db
     .update(newChats)
     .set({...newNewChat, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(eq(newChats.id, newChatId!))
     .returning();
    return { newChat: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteNewChat = async (id: NewChatId) => {
  const { id: newChatId } = newChatIdSchema.parse({ id });
  try {
    const [n] =  await db.delete(newChats).where(eq(newChats.id, newChatId!))
    .returning();
    return { newChat: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

