import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getNewChats } from "@/lib/api/newChats/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const newChats = sqliteTable('new_chats', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  userId: text("user_id").notNull(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  message: text("message").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for newChats - used to validate API requests
const baseSchema = createSelectSchema(newChats).omit(timestamps)

export const insertNewChatSchema = createInsertSchema(newChats).omit(timestamps);
export const insertNewChatParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateNewChatSchema = baseSchema;
export const updateNewChatParams = baseSchema.extend({})
export const newChatIdSchema = baseSchema.pick({ id: true });

// Types for newChats - used to type API request params and within Components
export type NewChat = typeof newChats.$inferSelect;
export type NewNewChat = z.infer<typeof insertNewChatSchema>;
export type NewNewChatParams = z.infer<typeof insertNewChatParams>;
export type UpdateNewChatParams = z.infer<typeof updateNewChatParams>;
export type NewChatId = z.infer<typeof newChatIdSchema>["id"];
    
// this type infers the return from getNewChats() - meaning it will include any joins
export type CompleteNewChat = Awaited<ReturnType<typeof getNewChats>>["newChats"][number];

