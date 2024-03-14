import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type NewChatId, newChatIdSchema, newChats } from "@/lib/db/schema/newChats";

export const getNewChats = async () => {
  const rows = await db.select().from(newChats);
  const n = rows
  return { newChats: n };
};

export const getNewChatById = async (id: NewChatId) => {
  const { id: newChatId } = newChatIdSchema.parse({ id });
  const [row] = await db.select().from(newChats).where(eq(newChats.id, newChatId));
  if (row === undefined) return {};
  const n = row;
  return { newChat: n };
};


